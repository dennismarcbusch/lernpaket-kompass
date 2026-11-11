#!/usr/bin/env python3
"""Quellen eines Lernpakets (Ordner quelle/): Fragen als Markdown lesen und js/inhalt.js erzeugen.

  python3 quellen.py <fragen.md>              prüft die Datei, zeigt Mengen je Lernziel und Einsatz
  python3 quellen.py <fragen.md> --tabelle    dazu eine Übersicht aller Fragen als Markdown-Tabelle

Ein Paket mit Quellen hat den Ordner quelle/ mit
  paket.js           das Objekt window.PAKET (Texte, Stationen, Szenen …), ggf. weitere .js-Dateien
  fragen.md          die Fragen (Format: referenz/fragenformat.md, Abschnitt „Fragen in quelle/fragen.md“)
  bilder/*.svg       Grafiken für Bildfragen und Hotspots (optional)
  reihenfolge.txt    Reihenfolge der .js-Dateien (optional; sonst alphabetisch, paket.js zuletzt)
paket.py bauen erzeugt daraus js/inhalt.js; pruefe_paket.py prüft die Quellen mit diesem Modul.
Die Engine liest weiter window.PAKET – nur die Herkunft von js/inhalt.js ändert sich.
Nur Standardbibliothek. Die Datei liegt in skills/_gemeinsam/scripts/ und wird von
skills/baue-skills.sh in die Skills kopiert.
"""
import html, json, os, re, sys

TYPEN = ('mc', 'zuordnen', 'zahl', 'text', 'hotspot')
EINSAETZE = ('check', 'selbstueberpruefung', 'uebung', 'vorab')
PFEIL = re.compile(r'\s+(?:→|->)\s+')
SCHLUESSEL = {'tipp': 'hinweis', 'wenn falsch': 'feedbackFalsch', 'wenn richtig': 'feedbackRichtig',
              'mischen': 'mischen', 'mehrfach': 'mehrfach', 'prüfen': 'pruefen', 'pruefen': 'pruefen'}
ZAHL = r'-?\d+(?:[.,]\d+)?'
KOPF_JS = '/* Erzeugt von paket.py bauen aus quelle/ – hier nichts ändern, sondern in quelle/ (dann paket.py bauen). */\n'


class Fehler(Exception):
    pass


# ---------------------------------------------------------------- Markdown → HTML

def inline(t):
    """Markdown im Satz → HTML: **fett**, *kursiv*, `Code`, ~~durchgestrichen~~, 2^8^, H~2~O.
    Spitze Klammern und & werden als Text angezeigt (kein HTML im Inhalt)."""
    ablage = []

    def merke(s):
        ablage.append(s)
        return f'\x00{len(ablage) - 1}\x00'

    t = re.sub(r'(?<!\\)(`+)(.+?)(?<!`)\1(?!`)', lambda m: merke('<code>' + html.escape(m.group(2).strip(' ') or m.group(2), quote=False) + '</code>'), t)
    t = re.sub(r'\\(->|→|[\\`*_~^|=\-\[\]()#>!])', lambda m: merke(html.escape(m.group(1), quote=False)), t)
    t = html.escape(t, quote=False)
    t = re.sub(r'\*\*(?=\S)(.+?)(?<=\S)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'(?<![*\w])\*(?=[^\s*])(.+?)(?<=[^\s*])\*(?![*\w])', r'<i>\1</i>', t)
    t = re.sub(r'~~(?=\S)(.+?)(?<=\S)~~', r'<s>\1</s>', t)
    t = re.sub(r'\^([^\s^]+)\^', r'<sup>\1</sup>', t)
    t = re.sub(r'(?<!~)~([^\s~]+)~(?!~)', r'<sub>\1</sub>', t)
    return re.sub(r'\x00(\d+)\x00', lambda m: ablage[int(m.group(1))], t)


def absaetze(zeilen):
    """Zeilen eines Textes → Liste von Absätzen; jede Zeile mit \\ am Ende oder zwei Leerzeichen bricht um."""
    out, akt = [], []
    for z in zeilen + ['']:
        if not z.strip():
            if akt:
                out.append(akt)
            akt = []
        else:
            akt.append(z)
    return out


def absatz_html(zeilen):
    teile = []
    for i, z in enumerate(zeilen):
        umbruch = i < len(zeilen) - 1 and (z.endswith('\\') or z.endswith('  '))
        z = z[:-1] if z.endswith('\\') and umbruch else z
        teile.append(inline(z.strip()) + ('<br>' if umbruch else ''))
    return re.sub(r'<br> ', '<br>', ' '.join(teile))


def tabelle_html(zeilen, nr):
    zellen = [[c.strip() for c in re.split(r'(?<!\\)\|', z.strip().strip('|'))] for z in zeilen]
    if len(zellen) < 2 or not all(re.fullmatch(r':?-{3,}:?', c) for c in zellen[1]):
        raise Fehler(f'Zeile {nr}: Tabelle braucht eine Kopfzeile und darunter |---|---|.')
    kopf = ''.join(f'<th>{inline(c)}</th>' for c in zellen[0])
    rumpf = ''.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>' for r in zellen[2:])
    return f'<table class="tab"><thead><tr>{kopf}</tr></thead><tbody>{rumpf}</tbody></table>'


def bloecke_html(bloecke):
    """Blöcke des Fragetexts oder der Erklärung → HTML. Ein einzelner Absatz bleibt ohne <p>."""
    teile = []
    for b in bloecke:
        if b[0] == 'absatz':
            teile.append(('p', absatz_html(b[1])))
        elif b[0] == 'code':
            teile.append(('pre', '<pre><code>' + html.escape('\n'.join(b[1]), quote=False) + '</code></pre>'))
        elif b[0] == 'tabelle':
            teile.append(('table', tabelle_html(b[1], b[2])))
    if len(teile) == 1 and teile[0][0] == 'p':
        return teile[0][1]
    return ''.join(f'<p>{h}</p>' if art == 'p' else h for art, h in teile)


# ---------------------------------------------------------------- Lesen

def svg_lesen(basis, pfad, nr):
    if re.match(r'[a-z]+:', pfad) or os.path.isabs(pfad):
        raise Fehler(f'Zeile {nr}: Bild „{pfad}“ muss eine Datei im Ordner quelle/ sein (keine Adresse aus dem Netz).')
    voll = os.path.normpath(os.path.join(basis, pfad))
    if not voll.startswith(os.path.normpath(basis) + os.sep):
        raise Fehler(f'Zeile {nr}: Bild „{pfad}“ liegt außerhalb von quelle/.')
    if not pfad.lower().endswith('.svg'):
        raise Fehler(f'Zeile {nr}: Bild „{pfad}“: nur SVG-Dateien (sie werden ins Paket eingebettet).')
    if not os.path.isfile(voll):
        raise Fehler(f'Zeile {nr}: Bild „{pfad}“ gibt es nicht.')
    s = open(voll, encoding='utf-8').read()
    s = re.sub(r'<\?xml[^>]*\?>\s*|<!DOCTYPE[^>]*>\s*|<!--.*?-->\s*', '', s, flags=re.S).strip()
    if not s.startswith('<svg'):
        raise Fehler(f'Zeile {nr}: „{pfad}“ ist keine SVG-Datei.')
    return s


def mit_beschreibung(alt, svg):
    """Bildbeschreibung aus ![…](…) als aria-label an das SVG (für Screenreader)."""
    kopf = svg[:svg.find('>') + 1]
    if alt and 'aria-label' not in kopf:
        svg = svg.replace('<svg', f'<svg role="img" aria-label="{html.escape(alt)}"', 1)
    return svg


def zahl_lesen(s, nr=None):
    if nr is not None and re.fullmatch(r'-?\d{1,3}\.\d{3}', s):
        raise Fehler(f'Zeile {nr}: „{s}“ – Tausenderpunkt? Tausend als 1000 schreiben; Dezimalzahlen mit Komma (1,5).')
    return float(s.replace(',', '.')) if ('.' in s or ',' in s) else int(s)


def code_ohne_backticks(s):
    m = re.fullmatch(r'(`+)(.+?)\1', s.strip())
    return m.group(2).strip() if m else s.strip()


def kopf_lesen(text, nr):
    teile = [t.strip() for t in re.split(r'\s+[·|]\s+', text.strip())]
    if len(teile) != 4:
        raise Fehler(f'Zeile {nr}: Kopf „## {text.strip()}“ braucht vier Teile: ## ID · Lernziel · Typ · Einsatz '
                     '(z. B. ## F7 · LZ2 · mc · check, selbstueberpruefung).')
    fid, lz, typ, einsatz = teile
    if not re.fullmatch(r'[A-Za-z][A-Za-z0-9_-]*', fid):
        raise Fehler(f'Zeile {nr}: ID „{fid}“: Buchstabe am Anfang, dann Buchstaben, Ziffern, - oder _.')
    if not re.fullmatch(r'[A-Za-z][A-Za-z0-9_-]*', lz):
        raise Fehler(f'Zeile {nr}: Lernziel „{lz}“ sieht nicht wie eine Lernziel-ID aus (z. B. LZ2).')
    if typ not in TYPEN:
        raise Fehler(f'Zeile {nr}: Typ „{typ}“ gibt es nicht ({", ".join(TYPEN)}).')
    ein = [e.strip() for e in einsatz.split(',') if e.strip()]
    for e in ein:
        if e == 'nachweis':
            raise Fehler(f'Zeile {nr}: Einsatz „nachweis“ heißt seit Kompass 4.0 „selbstueberpruefung“.')
        if e not in EINSAETZE:
            raise Fehler(f'Zeile {nr}: Einsatz „{e}“ gibt es nicht ({", ".join(EINSAETZE)}).')
    if not ein:
        raise Fehler(f'Zeile {nr}: Einsatz fehlt ({", ".join(EINSAETZE)}).')
    return fid, lz, typ, ein


def abschnitte(text):
    """Teilt fragen.md an den Überschriften „## …“; Text davor und „# …“-Zeilen (Gruppen) zählen nicht."""
    zeilen = text.replace('\r\n', '\n').replace('\r', '\n').split('\n')
    out, akt, im_code = [], None, False
    for nr, z in enumerate(zeilen, 1):
        if z.lstrip().startswith('```'):
            im_code = not im_code
        if not im_code and z.startswith('## '):
            akt = {'kopf': z[3:], 'nr': nr, 'zeilen': []}
            out.append(akt)
        elif not im_code and re.match(r'#\s', z):
            akt = None  # Gruppenüberschrift: beendet die Frage davor, Text bis zur nächsten Frage zählt nicht
        elif akt is not None:
            akt['zeilen'].append((nr, z))
    return out


def frage_lesen(ab, basis):
    """Ein Abschnitt „## …“ → (Frage als dict, Liste der Prüfnotizen)."""
    fid, lz, typ, einsatz = kopf_lesen(ab['kopf'], ab['nr'])
    text, erkl, eintraege, gleich, felder, bild, notizen = [], [], [], [], {}, None, []
    antworten_begonnen = False
    zeilen = ab['zeilen']
    i = 0

    def text_block(b, nr):
        if antworten_begonnen:
            raise Fehler(f'Zeile {nr}: Text nach den Antworten. Gehört er zur Erklärung, beginnt jede Zeile mit „> “.')
        text.append(b)

    absatz = []

    def absatz_ende():
        if absatz:
            text_block(('absatz', [z for _, z in absatz]), absatz[0][0])
            absatz.clear()

    while i < len(zeilen):
        nr, z = zeilen[i]
        s = z.strip()
        if s.startswith('```'):
            absatz_ende()
            code, i = [], i + 1
            while i < len(zeilen) and not zeilen[i][1].strip().startswith('```'):
                code.append(zeilen[i][1])
                i += 1
            if i >= len(zeilen):
                raise Fehler(f'Zeile {nr}: Codeblock wird nicht mit ``` geschlossen.')
            text_block(('code', code), nr)
        elif not s:
            absatz_ende()
        elif s.startswith('>'):
            absatz_ende()
            antworten_begonnen = True
            erkl.append(re.sub(r'^>\s?', '', s))
        elif re.match(r'[-*]\s', z):
            absatz_ende()
            antworten_begonnen = True
            inhalt = z[2:].strip()
            while i + 1 < len(zeilen) and zeilen[i + 1][1].startswith(('  ', '\t')) and zeilen[i + 1][1].strip():
                i += 1
                inhalt += ' ' + zeilen[i][1].strip()
            eintraege.append((nr, inhalt))
        elif s.startswith('= ') or s == '=':
            absatz_ende()
            antworten_begonnen = True
            gleich.append((nr, s[1:].strip()))
        elif re.match(r'([A-Za-zÄÖÜäöü ]+):\s', s) and re.match(r'([A-Za-zÄÖÜäöü ]+):', s).group(1).lower() in SCHLUESSEL:
            absatz_ende()
            k, v = s.split(':', 1)
            feld = SCHLUESSEL[k.strip().lower()]
            if feld == 'pruefen':
                notizen.append((nr, v.strip()))
            else:
                if feld in felder:
                    raise Fehler(f'Zeile {nr}: „{k.strip()}:“ steht zweimal.')
                felder[feld] = (nr, v.strip())
        elif re.fullmatch(r'!\[([^\]]*)\]\(([^)\s]+)\)', s):
            absatz_ende()
            if antworten_begonnen:
                raise Fehler(f'Zeile {nr}: Das Bild gehört vor die Antworten (unter den Fragetext).')
            if bild:
                raise Fehler(f'Zeile {nr}: Eine Frage hat höchstens ein Bild.')
            m = re.fullmatch(r'!\[([^\]]*)\]\(([^)\s]+)\)', s)
            bild = (m.group(1), svg_lesen(basis, m.group(2), nr))
        elif s.startswith('|'):
            absatz_ende()
            tab = []
            while i < len(zeilen) and zeilen[i][1].strip().startswith('|'):
                tab.append(zeilen[i][1])
                i += 1
            i -= 1
            text_block(('tabelle', tab, nr), nr)
        else:
            if antworten_begonnen:
                raise Fehler(f'Zeile {nr}: Text nach den Antworten. Gehört er zur Erklärung, beginnt jede Zeile mit „> “.')
            absatz.append((nr, z))
        i += 1
    absatz_ende()

    if not text:
        raise Fehler(f'Zeile {ab["nr"]}: {fid}: Fragetext fehlt.')
    f = {'id': fid, 'lz': lz, 'einsatz': einsatz, 'typ': typ, 'frage': bloecke_html(text)}

    def feld_text(name):
        if name in felder:
            f[name] = inline(felder[name][1])

    def ja_nein(name):
        if name in felder:
            nr, v = felder[name]
            if v.lower() not in ('ja', 'nein'):
                raise Fehler(f'Zeile {nr}: „{name.capitalize()}:“ erwartet ja oder nein.')
            return v.lower() == 'ja'
        return None

    def nicht_erlaubt(*namen):
        for n in namen:
            if n in felder:
                raise Fehler(f'Zeile {felder[n][0]}: „{n}“ passt nicht zum Typ {typ}.')

    def mit_pfeil(nr, inhalt, pflicht):
        teile = PFEIL.split(inhalt, maxsplit=1)
        if len(teile) == 1 and pflicht:
            raise Fehler(f'Zeile {nr}: Nach der typischen Antwort folgt „→ Feedback“ (oder „->“).')
        return teile[0].strip(), (teile[1].strip() if len(teile) > 1 else '')

    if typ in ('mc', 'hotspot'):
        nicht_erlaubt('feedbackFalsch', 'feedbackRichtig')
        if gleich:
            raise Fehler(f'Zeile {gleich[0][0]}: „= …“ gibt es nur bei zahl und text.')
        liste = []
        for nr, inhalt in eintraege:
            m = re.match(r'\[([ xX])\]\s+(.*)$', inhalt)
            if not m:
                raise Fehler(f'Zeile {nr}: Antwort als „- [x] richtig“ oder „- [ ] falsch → Feedback“ schreiben.')
            richtig = m.group(1).lower() == 'x'
            t, fb = mit_pfeil(nr, m.group(2), False)
            liste.append((nr, richtig, t, fb))
        if typ == 'mc':
            if len(liste) < 2:
                raise Fehler(f'Zeile {ab["nr"]}: {fid}: mindestens zwei Antworten.')
            if not any(r for _, r, _, _ in liste):
                raise Fehler(f'Zeile {ab["nr"]}: {fid}: keine Antwort ist mit [x] als richtig markiert.')
            ops = []
            for nr, r, t, fb in liste:
                o = {'text': inline(t)}
                if r:
                    o['richtig'] = True
                if fb:
                    o['feedback'] = inline(fb)
                ops.append(o)
            f['optionen'] = ops
            if ja_nein('mischen') is False:
                f['mischen'] = False
            if ja_nein('mehrfach'):
                f['mehrfach'] = True
        else:
            nicht_erlaubt('mischen', 'mehrfach')
            if not bild:
                raise Fehler(f'Zeile {ab["nr"]}: {fid}: Hotspot braucht ein Bild: ![Beschreibung](bilder/datei.svg).')
            bereiche = []
            for nr, r, t, fb in liste:
                m = re.fullmatch(r'(.*?)\s*@\s*(' + ZAHL + r')\s*,\s*(' + ZAHL + r')\s*,\s*(' + ZAHL + r')(?:\s*,\s*(' + ZAHL + r'))?', t)
                if not m:
                    raise Fehler(f'Zeile {nr}: Bereich als „Beschriftung @ x, y, Breite, Höhe“ (Rechteck) oder „@ x, y, Radius“ (Kreis) angeben.')
                w = [zahl_lesen(x) for x in m.groups()[1:] if x is not None]
                b = dict(zip(('x', 'y', 'w', 'h'), w)) if len(w) == 4 else dict(zip(('cx', 'cy', 'r'), w))
                b['label'] = html.unescape(re.sub(r'<[^>]+>', '', inline(m.group(1).strip()))) if m.group(1).strip() else ''
                if r:
                    b['richtig'] = True
                b['feedback'] = inline(fb) if fb else ''
                bereiche.append(b)
            if sum(1 for b in bereiche if b.get('richtig')) != 1:
                raise Fehler(f'Zeile {ab["nr"]}: {fid}: Hotspot braucht genau einen richtigen Bereich ([x]).')
            f['svg'] = mit_beschreibung(*bild)
            f['bereiche'] = bereiche
            bild = None
    elif typ == 'zuordnen':
        nicht_erlaubt('mischen', 'mehrfach')
        if gleich:
            raise Fehler(f'Zeile {gleich[0][0]}: „= …“ gibt es nur bei zahl und text.')
        paare = []
        for nr, inhalt in eintraege:
            if ' = ' not in inhalt:
                raise Fehler(f'Zeile {nr}: Paar als „- links = rechts“ schreiben.')
            l, r = inhalt.split(' = ', 1)
            paare.append({'links': inline(l.strip()), 'rechts': inline(r.strip())})
        if len(paare) < 2:
            raise Fehler(f'Zeile {ab["nr"]}: {fid}: mindestens zwei Paare.')
        rechts = [p['rechts'] for p in paare]
        if len(set(rechts)) != len(rechts):
            raise Fehler(f'Zeile {ab["nr"]}: {fid}: Jede rechte Seite darf nur einmal vorkommen.')
        f['paare'] = paare
        feld_text('feedbackFalsch')
        feld_text('feedbackRichtig')
    else:  # zahl, text
        nicht_erlaubt('mischen', 'mehrfach', 'feedbackRichtig')
        if typ == 'zahl':
            if len(gleich) != 1:
                raise Fehler(f'Zeile {ab["nr"]}: {fid}: genau eine Zeile „= Wert“ (z. B. „= 129“ oder „= 2,5 ± 0,1 m“).')
            nr, s = gleich[0]
            m = re.fullmatch(r'(' + ZAHL + r')(?:\s*(?:±|\+-|\+/-)\s*(' + ZAHL + r'))?(?:\s+(.+))?', s)
            if not m:
                raise Fehler(f'Zeile {nr}: „= {s}“: Zahl ohne Tausenderpunkt, optional „± Toleranz“ und Einheit.')
            z = {'wert': zahl_lesen(m.group(1), nr)}
            if m.group(2):
                z['toleranz'] = zahl_lesen(m.group(2), nr)
            if m.group(3):
                z['einheit'] = m.group(3).strip()
            f['zahl'] = z
            typisch = []
            for nr, inhalt in eintraege:
                w, fb = mit_pfeil(nr, inhalt, True)
                if not re.fullmatch(ZAHL, w):
                    raise Fehler(f'Zeile {nr}: „{w}“ ist keine Zahl (typische Falschantwort bei Typ zahl).')
                typisch.append({'wert': zahl_lesen(w, nr), 'feedback': inline(fb)})
        else:
            if not gleich:
                raise Fehler(f'Zeile {ab["nr"]}: {fid}: mindestens eine Zeile „= richtige Antwort“ (je Schreibweise eine Zeile).')
            f['akzeptiert'] = [code_ohne_backticks(s) for _, s in gleich]
            typisch = []
            for nr, inhalt in eintraege:
                a, fb = mit_pfeil(nr, inhalt, True)
                typisch.append({'antwort': code_ohne_backticks(a), 'feedback': inline(fb)})
        if typisch:
            f['typisch'] = typisch
        feld_text('feedbackFalsch')
    if typ not in ('mc', 'hotspot') and any(re.match(r'\[[ xX]\]', e) for _, e in eintraege):
        raise Fehler(f'Zeile {eintraege[0][0]}: Kästchen [x]/[ ] gibt es nur bei mc und hotspot.')
    if bild:
        f['bild'] = mit_beschreibung(*bild)
    feld_text('hinweis')
    if erkl:
        f['erklaerung'] = bloecke_html([('absatz', a) for a in absaetze(erkl)])
    return f, notizen


def fragen_lesen(pfad):
    """fragen.md → (Liste der Fragen, Meldungen). Meldungen: (art, text) mit art 'fehler' | 'hinweis' | 'pruefen'."""
    basis = os.path.dirname(os.path.abspath(pfad))
    text = open(pfad, encoding='utf-8').read()
    fragen, meld, ids = [], [], {}
    abs_ = abschnitte(text)
    if not abs_:
        meld.append(('fehler', 'Keine Frage gefunden. Jede Frage beginnt mit „## ID · Lernziel · Typ · Einsatz“.'))
    for ab in abs_:
        try:
            f, notizen = frage_lesen(ab, basis)
        except Fehler as e:
            meld.append(('fehler', str(e)))
            continue
        if f['id'] in ids:
            meld.append(('fehler', f'Zeile {ab["nr"]}: ID {f["id"]} gibt es schon (Zeile {ids[f["id"]]}).'))
            continue
        ids[f['id']] = ab['nr']
        fragen.append(f)
        if 'erklaerung' not in f:
            meld.append(('hinweis', f'{f["id"]}: Erklärung fehlt (Zeile mit „> “: warum die richtige Antwort richtig ist).'))
        if f['typ'] == 'mc':
            for k, o in enumerate(f['optionen']):
                if not o.get('richtig') and not o.get('feedback'):
                    meld.append(('hinweis', f'{f["id"]}: Falschantwort {"abcdefghij"[k]} ohne Feedback („→ …“ zur Fehlvorstellung).'))
        for nr, n in notizen:
            meld.append(('pruefen', f'{f["id"]} (Zeile {nr}): {n}'))
    roh = re.sub(r'```.*?```|`[^`\n]*`', '', text, flags=re.S)
    for m in re.finditer(r'</?(b|i|em|strong|code|br|p|span|sup|sub|div|small|s)\b[^>]*>', roh):
        nr = text[:text.find(m.group(0))].count('\n') + 1
        meld.append(('hinweis', f'Zeile {nr}: „{m.group(0)}“ sieht aus wie HTML und erscheint im Paket als Text. Markdown nutzen: **fett**, *kursiv*, `Code`.'))
        break
    return fragen, meld


def als_js(fragen):
    """Fragen → JavaScript-Liste, eine Frage je Zeile (stabil, damit Änderungen im Diff lesbar bleiben)."""
    def j(x):
        return json.dumps(x, ensure_ascii=False, separators=(', ', ': ')).replace('</', '<\\/').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')
    return '[\n' + ',\n'.join('  ' + j(f) for f in fragen) + '\n]'


# ---------------------------------------------------------------- js/inhalt.js erzeugen

def js_dateien(q):
    rf = os.path.join(q, 'reihenfolge.txt')
    if os.path.isfile(rf):
        namen = [l.strip() for l in open(rf, encoding='utf-8') if l.strip() and not l.strip().startswith('#')]
        for n in namen:
            if not os.path.isfile(os.path.join(q, n)):
                raise Fehler(f'quelle/reihenfolge.txt nennt {n}, die Datei fehlt.')
        return namen
    namen = sorted(n for n in os.listdir(q) if n.endswith('.js'))
    if 'paket.js' in namen:
        namen.remove('paket.js')
        namen.append('paket.js')
    return namen


def inhalt_erzeugen(root):
    """Baut den Text von js/inhalt.js aus root/quelle/. Gibt (text, fragen, meldungen) zurück;
    bei Fehlern in fragen.md ist text None. Ohne Ordner quelle/ ist das Ergebnis (None, [], [])."""
    q = os.path.join(root, 'quelle')
    if not os.path.isdir(q):
        return None, [], []
    try:
        namen = js_dateien(q)
    except Fehler as e:
        return None, [], [('fehler', str(e))]
    if not namen:
        return None, [], [('fehler', 'quelle/ enthält keine .js-Datei (quelle/paket.js mit window.PAKET fehlt).')]
    teile = [KOPF_JS]
    for n in namen:
        s = open(os.path.join(q, n), encoding='utf-8').read().replace('\r\n', '\n')
        teile.append(f'\n/* ---------- quelle/{n} ---------- */\n' + s.rstrip('\n') + '\n')
    fragen, meld = [], []
    fm = os.path.join(q, 'fragen.md')
    if os.path.isfile(fm):
        fragen, meld = fragen_lesen(fm)
        if any(a == 'fehler' for a, _ in meld):
            return None, fragen, meld
        teile.append('\n/* ---------- quelle/fragen.md (erzeugt) ---------- */\n'
                     '(function (P, F) { P.fragen = (P.fragen || []).concat(F); })(window.PAKET, '
                     + als_js(fragen) + ');\n')
    return ''.join(teile), fragen, meld


# ---------------------------------------------------------------- Übersicht

def uebersicht(fragen, tabelle=False):
    zeilen, lz = [], {}
    for f in fragen:
        for e in f['einsatz']:
            lz.setdefault(f['lz'], {}).setdefault(e, 0)
            lz[f['lz']][e] += 1
    zeilen.append(f'{len(fragen)} Fragen. Je Lernziel und Einsatz:')
    for k in sorted(lz):
        zeilen.append(f'  {k}: ' + ', '.join(f'{e} {n}' for e, n in sorted(lz[k].items())))
    typen = {}
    for f in fragen:
        typen[f['typ']] = typen.get(f['typ'], 0) + 1
    zeilen.append('Typen: ' + ', '.join(f'{t} {n}' for t, n in sorted(typen.items())))
    if tabelle:
        def txt(h):
            return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', h or ''))).replace('|', '\\|').strip()
        zeilen += ['', '| ID | LZ | Einsatz | Typ | Frage | Richtig | Falschantworten → Fehlvorstellung |', '|---|---|---|---|---|---|---|']
        for f in fragen:
            if f['typ'] == 'mc':
                r = '; '.join(txt(o['text']) for o in f['optionen'] if o.get('richtig'))
                fa = '; '.join(f'{txt(o["text"])} → {txt(o.get("feedback", ""))}' for o in f['optionen'] if not o.get('richtig'))
            elif f['typ'] == 'zuordnen':
                r, fa = '; '.join(f'{txt(p["links"])} = {txt(p["rechts"])}' for p in f['paare']), txt(f.get('feedbackFalsch', ''))
            elif f['typ'] == 'zahl':
                z = f['zahl']
                r = f'{z["wert"]}' + (f' ± {z["toleranz"]}' if 'toleranz' in z else '') + (f' {z["einheit"]}' if 'einheit' in z else '')
                fa = '; '.join(f'{t["wert"]} → {txt(t["feedback"])}' for t in f.get('typisch', []))
            elif f['typ'] == 'text':
                r = '; '.join(f['akzeptiert'])
                fa = '; '.join(f'{t["antwort"]} → {txt(t["feedback"])}' for t in f.get('typisch', []))
            else:
                r = '; '.join(b['label'] for b in f['bereiche'] if b.get('richtig'))
                fa = '; '.join(f'{b["label"]} → {txt(b["feedback"])}' for b in f['bereiche'] if not b.get('richtig'))
            zeilen.append(f'| {f["id"]} | {f["lz"]} | {", ".join(f["einsatz"])} | {f["typ"]} | {txt(f["frage"])} | {r} | {fa} |')
    return '\n'.join(zeilen)


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if len(args) != 1:
        sys.exit(__doc__)
    fragen, meld = fragen_lesen(args[0])
    for art, t in meld:
        print({'fehler': 'FEHLER  ', 'hinweis': 'Hinweis ', 'pruefen': 'Prüfen  '}[art] + t)
    if fragen:
        print(uebersicht(fragen, '--tabelle' in sys.argv))
    sys.exit(1 if any(a == 'fehler' for a, _ in meld) else 0)


if __name__ == '__main__':
    main()
