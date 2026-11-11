#!/usr/bin/env python3
"""Prüft ein SCORM-1.2-Lernpaket gegen die technischen Standards des Leitfadens (Teil C5/C6).

Aufruf:
    python3 pruefe_paket.py <ordner-oder-zip> [--bericht bericht.json] [--bilder ordner] [--ohne-browser]

1. Statische Prüfung (immer): Manifest im Wurzelverzeichnis, SCORM 1.2, kein masteryscore
   (die Selbstüberprüfung zählt nicht), Identifier im Format "<präfix>-<name>", alle Dateien
   vorhanden und im Manifest, keine externen Server, Größe, JavaScript-Syntax (wenn node
   installiert ist). Bei Paketen mit Ordner quelle/ zusätzlich die Quellen (mit quellen.py):
   quelle/fragen.md lesbar, Erklärung und Feedback vorhanden, kein HTML im Text, keine offenen
   Prüfnotizen, js/inhalt.js auf dem Stand von quelle/.
2. Browser-Prüfung (wenn Python-Playwright mit Chromium installiert ist): lädt das Paket in
   einem nachgebauten SCORM-1.2-Player auf 1366 × 768 (Bezugsgröße: Schullaptop), löst bei
   Paketen aus der Vorlage alle Stationen, Übungen und die Selbstüberprüfung mit der
   Musterlösung, prüft Datenübergabe (Ergebnis als Information, Status „completed“, nie
   bestanden/nicht bestanden), Wiedereinstieg, Konsolenfehler und die Darstellung auf
   schmalen Bildschirmen.
   Interaktivität: jede Station mit Szene zum Anfassen, Vorführung, Textbudget neben der
   Szene; die Szene ist auf 1366 × 768 ganz zu sehen (gemessen wird auch die Unterkante
   gegen die Fußleiste).
   Bedienung: je Ansicht höchstens ein hervorgehobener Knopf; „Weiter“ ist erst
   hervorgehoben, wenn die Aufgabe erledigt ist.
   Startseite als Überblick: ohne Scrollen (1366×768, 768×1024), höchstens etwa 40 Wörter
   Fließtext, keine Eingaben, genau ein hervorgehobener Knopf. Vorab-Fragen vor der Szene,
   Einschätzung einmal je Lernziel nach dem Kurz-Check, Abkürzung „Ich kenne mich schon
   aus“ markiert die richtigen Stationen als überspringbar.
   Tafelbild (PAKET.tafel): alle Szenen und Werkzeuge werden durchgeschaltet; es schreibt
   nichts an die Lernplattform.
   Simulationsmodus (PAKET.simulation): jeder Schritt über die Knöpfe der Lektion lösbar,
   kein Schritt schon vor dem Handeln erledigt, der Gegenstand bleibt zwischen Schritten
   und Kapiteln erhalten, nach dem Neuladen wird er genau so wiederhergestellt.
Ausgabe: Bericht als Text (Ampel je Punkt) und optional als JSON.
"""
import argparse, functools, http.server, json, os, re, shutil, subprocess, sys, tempfile, threading, zipfile
import xml.etree.ElementTree as ET

ERG = []  # (ampel, bereich, text)


def punkt(ok, bereich, text, gelb=False):
    ERG.append(('🟢' if ok else ('🟡' if gelb else '🔴'), bereich, text))


def entpacken(pfad):
    if os.path.isdir(pfad):
        return os.path.abspath(pfad), None
    tmp = tempfile.mkdtemp(prefix='paket_')
    with zipfile.ZipFile(pfad) as z:
        z.extractall(tmp)
    return tmp, tmp


def statisch(root):
    man = os.path.join(root, 'imsmanifest.xml')
    if not os.path.isfile(man):
        punkt(False, 'Format', 'imsmanifest.xml fehlt im Wurzelverzeichnis des Pakets.')
        return None
    punkt(True, 'Format', 'imsmanifest.xml liegt im Wurzelverzeichnis.')
    try:
        tree = ET.parse(man)
    except ET.ParseError as e:
        punkt(False, 'Format', f'imsmanifest.xml ist kein gültiges XML: {e}')
        return None
    r = tree.getroot()
    ns = {'c': 'http://www.imsproject.org/xsd/imscp_rootv1p1p2', 'a': 'http://www.adlnet.org/xsd/adlcp_rootv1p2'}
    sv = r.find('.//c:schemaversion', ns)
    punkt(sv is not None and sv.text.strip() == '1.2', 'Format', f'SCORM-Version: {sv.text.strip() if sv is not None else "fehlt"} (Soll: 1.2).')
    ident = r.get('identifier', '')
    id_ok = bool(re.fullmatch(r'[a-z0-9]+-[a-z0-9]+(?:-[a-z0-9]+)*', ident))
    punkt(id_ok, 'Format', f'Manifest-Identifier "{ident}" ' + ('hat das Format <präfix>-<name>.' if id_ok else 'sollte "<präfix>-<name>" lauten (Kleinbuchstaben, Ziffern, Bindestriche).'), gelb=True)
    ms = r.find('.//a:masteryscore', ns)
    msv = ms.text.strip() if ms is not None and ms.text else None
    # Mit masteryscore setzt die Lernplattform selbst „bestanden“/„nicht bestanden“ – die Selbstüberprüfung zählt aber nicht.
    kompass = os.path.isfile(os.path.join(root, 'js', 'engine.js'))
    punkt(msv is None, 'Datenübergabe', 'Kein masteryscore im Manifest (die Selbstüberprüfung zählt nicht).' if msv is None
          else f'masteryscore {msv} im Manifest: Damit setzt die Lernplattform selbst bestanden oder nicht bestanden. Entfernen (paket.py zip erledigt das).', gelb=not kompass)
    res = r.find('.//c:resource', ns)
    href = res.get('href') if res is not None else None
    punkt(bool(href) and os.path.isfile(os.path.join(root, href or '')), 'Format', f'Startdatei: {href or "fehlt"}.')
    gelistet = {f.get('href') for f in r.findall('.//c:file', ns)}
    vorhanden = set()
    for d, _, fs in os.walk(root):
        for f in fs:
            rel = os.path.relpath(os.path.join(d, f), root).replace(os.sep, '/')
            if rel != 'imsmanifest.xml' and not rel.startswith(('__MACOSX', 'quelle/')):  # quelle/ kommt nicht ins ZIP
                vorhanden.add(rel)
    fehlt = sorted(g for g in gelistet if g and g not in vorhanden)
    nicht = sorted(v for v in vorhanden if v not in gelistet)
    punkt(not fehlt, 'Format', 'Alle im Manifest genannten Dateien sind vorhanden.' if not fehlt else 'Im Manifest genannt, aber nicht vorhanden: ' + ', '.join(fehlt))
    punkt(not nicht, 'Format', 'Alle Dateien sind im Manifest aufgeführt.' if not nicht else 'Nicht im Manifest aufgeführt (Lernplattform lädt sie evtl. trotzdem): ' + ', '.join(nicht[:10]), gelb=True)
    groesse = sum(os.path.getsize(os.path.join(root, v)) for v in vorhanden)
    punkt(groesse < 512 * 1024 * 1024, 'Format', f'Größe: {groesse / 1024:.0f} KB (Grenze ByCS: 512 MB).')
    extern = []
    for v in vorhanden:
        if v.endswith(('.html', '.htm', '.js', '.css')):
            t = open(os.path.join(root, v), encoding='utf-8', errors='ignore').read()
            for m in re.finditer(r'''(?:src|href)\s*=\s*["'](https?:)?//[^"']+|url\(\s*["']?https?://|@import\s+["']?https?://|fetch\(\s*["']https?://''', t):
                extern.append(f'{v}: {m.group(0)[:70]}')
    punkt(not extern, 'Datenschutz', 'Keine Verweise auf externe Server.' if not extern else 'Externe Verweise gefunden: ' + '; '.join(extern[:5]))
    alles = ''.join(open(os.path.join(root, v), encoding='utf-8', errors='ignore').read() for v in vorhanden if v.endswith(('.html', '.js')))
    for feld, text in [('LMSInitialize', 'SCORM-Initialisierung'), ('cmi.core.score.raw', 'Punktzahl'), ('cmi.core.lesson_status', 'Status (abgeschlossen)'), ('cmi.suspend_data', 'Fortschritt (Wiedereinstieg)'), ('cmi.core.student_name', 'Name aus der Lernplattform')]:
        punkt(feld in alles, 'Datenübergabe', f'{text} ({feld}) ' + ('wird verwendet.' if feld in alles else 'fehlt im Code.'), gelb=feld == 'cmi.core.student_name')
    punkt('cmi.objectives' in alles, 'Datenübergabe', 'Ergebnisse je Lernziel (cmi.objectives) ' + ('werden übertragen.' if 'cmi.objectives' in alles else 'werden nicht übertragen (optional).'), gelb=True)
    punkt('cmi.interactions' in alles, 'Datenübergabe', 'Ergebnisse je Frage (cmi.interactions) ' + ('werden übertragen.' if 'cmi.interactions' in alles else 'werden nicht übertragen (optional, aber nötig für die Auswertung je Frage).'), gelb=True)
    medien = re.findall(r'<(audio|video)\b', alles, re.I)
    if medien:
        text_da = re.search(r'<track\b|transkript|untertitel', alles, re.I)
        punkt(bool(text_da), 'Barrierefreiheit', 'Ton/Video vorhanden ' + ('mit Hinweis auf Untertitel oder Transkript.' if text_da else 'ohne erkennbare Untertitel oder Transkript – Gesprochenes muss auch als Text verfügbar sein.'), gelb=True)
    for kw in ['alert(', 'confirm(', 'prompt(']:
        if re.search(r'(?<![\w.])' + re.escape(kw), alles):
            punkt(False, 'Bedienung', f'{kw[:-1]}-Dialog im Code gefunden; Dialoge blockieren in manchen Lernplattformen.', gelb=True)
    if shutil.which('node'):
        for v in sorted(vorhanden):
            if v.endswith('.js'):
                p = subprocess.run(['node', '--check', os.path.join(root, v)], capture_output=True, text=True)
                punkt(p.returncode == 0, 'Technik', f'JavaScript-Syntax {v}: ' + ('in Ordnung.' if p.returncode == 0 else p.stderr.strip().splitlines()[-1]))
    return href


def quellen_pruefen(root):
    """Pakete mit Ordner quelle/: fragen.md lesbar und vollständig, js/inhalt.js auf dem Stand der Quellen."""
    if not os.path.isdir(os.path.join(root, 'quelle')):
        return
    try:
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        import quellen
    except ImportError:
        punkt(False, 'Quellen', 'quellen.py fehlt neben diesem Skript – Quellen in quelle/ nicht geprüft (Skill-Set neu bauen).', gelb=True)
        return
    text, fragen, meld = quellen.inhalt_erzeugen(root)
    fehler = [t for a, t in meld if a == 'fehler']
    hinweise = [t for a, t in meld if a == 'hinweis']
    offen = [t for a, t in meld if a == 'pruefen']
    if os.path.isfile(os.path.join(root, 'quelle', 'fragen.md')):
        punkt(not fehler, 'Quellen', f'quelle/fragen.md gelesen: {len(fragen)} Fragen.' if not fehler else 'quelle/fragen.md hat Fehler: ' + ' | '.join(fehler[:5]))
        punkt(not hinweise, 'Quellen', 'Jede Frage mit Erklärung, jede Falschantwort mit Feedback, kein HTML im Text.' if not hinweise else 'Hinweise zu fragen.md: ' + ' | '.join(hinweise[:5]), gelb=True)
        punkt(not offen, 'Quellen', 'Keine offenen Prüfnotizen (Prüfen:) in fragen.md.' if not offen else f'{len(offen)} offene Prüfnotiz(en) – vor dem Einsatz klären und die Zeile „Prüfen:“ löschen: ' + ' | '.join(offen[:3]), gelb=True)
    elif fehler:
        punkt(False, 'Quellen', 'quelle/: ' + ' | '.join(fehler[:3]))
    if text is not None:
        ziel = os.path.join(root, 'js', 'inhalt.js')
        ist = open(ziel, encoding='utf-8').read().replace('\r\n', '\n') if os.path.isfile(ziel) else ''
        punkt(ist == text, 'Quellen', 'js/inhalt.js ist auf dem Stand von quelle/.' if ist == text
              else 'js/inhalt.js passt nicht zu quelle/ – paket.py bauen ausführen (Änderungen gehören in quelle/, nicht in js/inhalt.js).')


MOCK = r"""
(() => {
  const KEY = '__scorm_mock';
  let d = {}; try { d = JSON.parse(sessionStorage.getItem(KEY) || '{}'); } catch (e) {}
  d.calls = d.calls || []; d.v = d.v || {};
  const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} };
  const log = (f, a, r) => { d.calls.push([f, a, r]); if (d.calls.length > 4000) d.calls.shift(); save(); };
  if (!('cmi.core.student_name' in d.v)) d.v['cmi.core.student_name'] = 'Muster, Max';
  window.__scorm = d;
  window.API = {
    LMSInitialize: a => { log('LMSInitialize', a, 'true'); return 'true'; },
    LMSFinish: a => { log('LMSFinish', a, 'true'); return 'true'; },
    LMSGetValue: k => {
      let r = d.v[k];
      if (k === 'cmi.interactions._count') r = String(Object.keys(d.v).filter(x => /^cmi\.interactions\.\d+\.id$/.test(x)).length);
      if (k === 'cmi.objectives._count') r = String(Object.keys(d.v).filter(x => /^cmi\.objectives\.\d+\.id$/.test(x)).length);
      if (r === undefined) r = '';
      log('LMSGetValue', k, r); return r;
    },
    LMSSetValue: (k, v) => {
      let ok = true;
      if (k === 'cmi.suspend_data' && String(v).length > 4096) ok = false;
      if (k === 'cmi.core.lesson_status' && !['passed','completed','failed','incomplete','browsed','not attempted'].includes(v)) ok = false;
      if (k === 'cmi.core.score.raw' && (isNaN(+v) || +v < 0 || +v > 100)) ok = false;
      if (/^cmi\.interactions\.\d+\.id$/.test(k) && !/^[^\s]{1,255}$/.test(v)) ok = false;
      if (ok) d.v[k] = String(v);
      log('LMSSetValue', [k, String(v).slice(0, 120)], ok ? 'true' : 'false'); return ok ? 'true' : 'false';
    },
    LMSCommit: a => { log('LMSCommit', a, 'true'); return 'true'; },
    LMSGetLastError: () => '0', LMSGetErrorString: () => '', LMSGetDiagnostic: () => ''
  };
})();
"""


def server(root):
    class Leise(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    h = functools.partial(Leise, directory=root)
    s = http.server.ThreadingHTTPServer(('127.0.0.1', 0), h)
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s


def browser(root, href, bilder):
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        punkt(False, 'Test', 'Browser-Prüfung übersprungen: Python-Playwright ist nicht installiert (pip install playwright && playwright install chromium).', gelb=True)
        return
    srv = server(root)
    url = f'http://127.0.0.1:{srv.server_port}/{href}'
    fehler = []
    with sync_playwright() as pw:
        try:
            b = pw.chromium.launch()
        except Exception as e:
            punkt(False, 'Test', f'Browser-Prüfung übersprungen: Chromium startet nicht ({str(e).splitlines()[0]}).', gelb=True)
            return
        ctx = b.new_context(viewport={'width': 1366, 'height': 768})  # Bezugsgröße: Schullaptop
        ctx.add_init_script(MOCK)
        pg = ctx.new_page()
        pg.on('pageerror', lambda e: fehler.append(str(e)))
        pg.on('console', lambda m: fehler.append(_konsole(m)) if m.type == 'error' else None)
        pg.goto(url)
        pg.wait_for_timeout(600)
        calls = pg.evaluate('window.__scorm.calls.map(c => c[0])')
        punkt('LMSInitialize' in calls, 'Datenübergabe', 'Paket meldet sich beim (nachgebauten) SCORM-Player an.')
        vorlage = pg.evaluate('!!window.LERNPAKET')
        if bilder:
            os.makedirs(bilder, exist_ok=True)
        if not vorlage:
            punkt(False, 'Test', 'Paket stammt nicht aus der Kompass-Vorlage: nur Laden, Anmeldung und Darstellung geprüft. Aufgaben bitte von Hand durchspielen.', gelb=True)
            if bilder:
                pg.screenshot(path=os.path.join(bilder, 'start.png'), full_page=True)
            _schmal(ctx, url, bilder, None)
        else:
            _vorlage(pg, bilder)
            if pg.evaluate('!!(window.LERNPAKET && LERNPAKET.sim)'):
                _simulation(ctx, url, bilder)
            _startseite(ctx, url, bilder)
            _schmal(ctx, url, bilder, True)
            _tafel(ctx, url, bilder)
        echte = [f for f in fehler if 'favicon' not in f]
        punkt(not echte, 'Technik', 'Keine Fehler in der Browser-Konsole.' if not echte else 'Konsolenfehler: ' + ' | '.join(echte[:5]))
        b.close()
    srv.shutdown()


def _konsole(m):
    """Konsolenmeldung mit Adresse der Quelle (ein fehlendes favicon.ico meldet der Browser ohne Dateinamen im Text)."""
    try:
        ort = (m.location or {}).get('url', '')
    except Exception:
        ort = ''
    return m.text + (f' [{ort}]' if ort else '')


def _primaer(pg):
    return pg.evaluate("[...document.querySelectorAll('button.primaer')].filter(b => b.offsetParent !== null).length")


def _klick_weiter(pg):
    pg.click('#weiter')
    pg.wait_for_timeout(150)


def _vorlage(pg, bilder):
    pi = pg.evaluate('LERNPAKET.pruefeInhalt()')
    punkt(not pi['fehler'], 'Inhalt', 'Inhaltsprüfung der Vorlage: keine Fehler.' if not pi['fehler'] else 'Inhaltsfehler: ' + '; '.join(pi['fehler'][:8]))
    for h in pi['hinweise'][:12]:
        punkt(False, 'Inhalt', 'Hinweis: ' + h, gelb=True)
    kv = str(pg.evaluate('LERNPAKET.version') or '')
    neu = bool(re.match(r'\d+', kv)) and int(re.match(r'\d+', kv).group(0)) >= 4
    if not neu:
        punkt(False, 'Technik', f'Das Paket nutzt eine ältere Vorlage (Engine {kv or "ohne Version"}). Dieses Skript prüft nach Kompass 4: '
              'engine.js, tafel.js, stil.css, tafel.css und index.html aus der aktuellen Vorlage übernehmen.', gelb=True)
    su = 'pruefen' if neu else 'nachweis'
    ver = pg.evaluate("(() => { const v = document.getElementById('version'); if (!v) return null; const r = v.getBoundingClientRect(); return {text: v.textContent.trim(), sichtbar: r.width > 0 && r.height > 0 && r.top >= 0 && r.bottom <= innerHeight}; })()")
    punkt(bool(ver and ver['text'] and ver['sichtbar']), 'Bedienung',
          f'Versionsnummer „{ver["text"]}“ steht sichtbar in der Kopfzeile.' if ver and ver['text'] and ver['sichtbar'] else 'Keine sichtbare Versionsnummer in der Kopfzeile (PAKET.version setzen).')
    info = pg.evaluate('({st: PAKET.stationen.map(s => s.id), ue: (PAKET.uebungen||[]).map(u => u.id), a: !!((PAKET.selbstueberpruefung || PAKET.nachweis || {}).teilA), spiel: !!PAKET.spielwelt})')
    ansichten = []
    if bilder:
        pg.screenshot(path=os.path.join(bilder, '0-start.png'), full_page=True)
    start_knoepfe = _primaer(pg)
    ansichten.append(('Start', start_knoepfe))
    loese = """(() => { LERNPAKET.aktuelleTeile().forEach(t => {
        if (t.art === 'demo' && t.obj && t.obj.alle) t.obj.alle();
        if (t.art === 'interaktion' && t.obj && t.obj.loesen) t.obj.loesen();
        if (t.art === 'frage') { t.obj.loesungEinsetzen(); const b = t.obj.el.querySelector('button.pruefen'); if (b && !b.hidden) b.click(); }
      }); })()"""
    weiter_vorn = "(() => { const b = document.getElementById('weiter'); return !!(b && b.classList.contains('primaer')); })()"
    ohne_demo, ohne_buehne, viel_text, buehne_tief = [], [], [], []
    angeschnitten, verdeckt = [], []
    vorab_fehlt, ohne_einsch, einsch_zuviel = [], [], []
    weiter_frueh, weiter_fehlt = [], []
    for i, sid in enumerate(info['st']):
        pg.evaluate(f"LERNPAKET.zeige('entdecken', {i})")
        pg.wait_for_timeout(100)
        ansichten.append((f'Station {sid}', _primaer(pg)))
        # Vorab-Frage steht vor der Szene; für die weiteren Messungen „Weiß ich nicht – zur Szene“
        vk = pg.evaluate("LERNPAKET.aktuelleTeile().filter(t => t.art === 'vorab').length")
        if pg.evaluate(f"!!PAKET.stationen[{i}].vorab") and not info['spiel'] and not vk:
            vorab_fehlt.append(sid)
        if bilder and i == 0 and vk:
            pg.screenshot(path=os.path.join(bilder, '1-station-vorab.png'), full_page=False)
        pg.evaluate("LERNPAKET.aktuelleTeile().filter(t => t.art === 'vorab').forEach(t => t.obj.zurSzene())")
        pg.wait_for_timeout(80)
        pg.evaluate('window.scrollTo(0, 0)')
        m = pg.evaluate("""(() => {
            const teile = LERNPAKET.aktuelleTeile();
            const spiel = !!document.querySelector('.spielbuehne');
            const b = document.querySelector('.spielbuehne') || document.querySelector('.buehne');
            const r = b ? b.getBoundingClientRect() : null;
            const L = document.getElementById('leiste');
            const frei = L ? Math.min(L.getBoundingClientRect().top, innerHeight) : innerHeight;   // bis hierhin ist die Szene sichtbar
            // sichtbarer Text außerhalb der Bühne, ohne zugeklappte Bereiche, Kurz-Check und Navigation
            const st = document.querySelector('.station');
            let w = 0;
            if (st) {
              const c = st.cloneNode(true);
              c.querySelectorAll('.buehne, details:not([open]), details.check, .steuerung, .live, .pfad, .sim-punkte').forEach(x => x.remove());
              w = LERNPAKET.woerter(c.innerHTML);
            }
            return {spiel: spiel, demo: spiel || teile.some(t => t.art === 'demo'), buehne: !!b, oben: r ? Math.round(r.top) : null, unten: r ? Math.round(r.bottom) : null,
                    hoehe: r ? Math.round(r.height) : 0, frei: Math.round(frei), woerter: w, vh: innerHeight};
          })()""")
        if not m['buehne']:
            ohne_buehne.append(sid)
        else:
            if not m['demo']:
                ohne_demo.append(sid)
            if m['oben'] is None or m['oben'] > m['vh'] * 0.6 or m['hoehe'] < (450 if m['spiel'] else 260):
                buehne_tief.append(f"{sid} (oben {m['oben']} px, {m['hoehe']} px hoch)")
            elif m['unten'] > m['frei'] + 2:
                sichtbar = max(0, m['frei'] - m['oben']) / max(1, m['hoehe'])
                text = f"{sid} ({m['unten'] - m['frei']} px unter der Fußleiste, {round(sichtbar * 100)} % sichtbar)"
                (verdeckt if sichtbar < 0.75 and not m['spiel'] else angeschnitten).append(text)
        if m['woerter'] > 160:
            viel_text.append(f"{sid} ({m['woerter']} Wörter)")
        ansichten.append((f'Station {sid}, Szene offen', _primaer(pg)))
        if neu and not info['spiel'] and pg.evaluate(weiter_vorn):
            weiter_frueh.append(sid)
        if bilder and i == 0:
            pg.screenshot(path=os.path.join(bilder, '1-station.png'), full_page=False)
        pg.evaluate(loese)
        pg.wait_for_timeout(80)
        ansichten.append((f'Station {sid}, gelöst', _primaer(pg)))
        if neu and not info['spiel'] and not pg.evaluate(weiter_vorn):
            weiter_fehlt.append(sid)
        if not info['spiel'] and pg.evaluate(f"(PAKET.stationen[{i}].check || []).length > 0"):
            # Einschätzung einmal je Lernziel: an der letzten Station, die das Lernziel behandelt
            soll = pg.evaluate(f"LERNPAKET.einschaetzenBei ? LERNPAKET.einschaetzenBei({i}).length : (PAKET.stationen[{i}].lz || []).length")
            ist = pg.evaluate("(() => { const s = [...document.querySelectorAll('.einschaetzung .skala')]; s.forEach(x => { const l = x.querySelector('label:nth-child(2)'); if (l) l.click(); }); return s.length; })()")
            if ist < soll:
                ohne_einsch.append(sid)
            elif ist > soll:
                einsch_zuviel.append(sid)
    punkt(not ohne_buehne, 'Interaktivität', 'Jede Station hat eine Szene zum Anfassen.' if not ohne_buehne else 'Stationen ohne Szene zum Anfassen: ' + ', '.join(ohne_buehne))
    punkt(not ohne_demo, 'Interaktivität', 'Jede Szene hat eine Vorführung („Zeig’s mir“).' if not ohne_demo else 'Szene ohne Vorführung (demo): ' + ', '.join(ohne_demo), gelb=True)
    punkt(not buehne_tief, 'Interaktivität', 'Die Szene beginnt in der oberen Bildschirmhälfte und ist groß genug.' if not buehne_tief else 'Szene zu weit unten oder zu klein: ' + ', '.join(buehne_tief), gelb=True)
    if verdeckt:
        punkt(False, 'Interaktivität', 'Szene auf 1366 × 768 zu weniger als drei Vierteln sichtbar: ' + ', '.join(verdeckt) + ' – Text über der Szene kürzen oder die Szene flacher bauen.')
    punkt(not angeschnitten and not verdeckt, 'Interaktivität', 'Die Szene ist auf 1366 × 768 ganz zu sehen (Unterkante über der Fußleiste).' if not angeschnitten and not verdeckt
          else ('Szene auf 1366 × 768 unten angeschnitten: ' + ', '.join(angeschnitten) if angeschnitten else 'Szene auf 1366 × 768 nicht ganz zu sehen (siehe oben).'), gelb=True)
    punkt(not viel_text, 'Interaktivität', 'Textbudget eingehalten (sichtbarer Text neben der Szene).' if not viel_text else 'Viel sichtbarer Text neben der Szene: ' + ', '.join(viel_text) + ' – Ziel höchstens 160 Wörter.', gelb=True)
    punkt(not vorab_fehlt, 'Selbststeuerung', 'Vorab-Fragen erscheinen vor der Szene.' if not vorab_fehlt else 'Vorab-Frage gesetzt, aber nicht angezeigt: ' + ', '.join(vorab_fehlt))
    punkt(not ohne_einsch and not einsch_zuviel, 'Selbststeuerung', 'Die Einschätzung kommt einmal je Lernziel, nach dem Kurz-Check (ein Klick).' if not ohne_einsch and not einsch_zuviel
          else ('Keine Einschätzung nach dem Kurz-Check: ' + ', '.join(ohne_einsch) if ohne_einsch else 'Einschätzung mehrfach je Lernziel abgefragt: ' + ', '.join(einsch_zuviel)), gelb=True)
    z = pg.evaluate('LERNPAKET.zustand()')
    if 'ej' in z and info['st'] and not ohne_einsch and not info['spiel'] and pg.evaluate("PAKET.stationen.some(s => (s.check || []).length && (s.lz || []).length)"):
        punkt(bool(z['ej']), 'Selbststeuerung', 'Einschätzung wird gespeichert (für den Vergleich im Abschluss).' if z['ej'] else 'Einschätzung wird nicht gespeichert.')
    if neu and not info['spiel']:
        punkt(not weiter_frueh and not weiter_fehlt, 'Bedienung', '„Weiter“ ist erst hervorgehoben, wenn die Station erledigt ist.' if not weiter_frueh and not weiter_fehlt
              else ('„Weiter“ ist schon vor der Aufgabe hervorgehoben: ' + ', '.join(weiter_frueh) if weiter_frueh else '„Weiter“ ist nach dem Lösen nicht hervorgehoben: ' + ', '.join(weiter_fehlt)))
    # Abkürzung „Ich kenne mich schon aus“: alle Vorab-Fragen richtig → Stationen überspringbar
    if pg.evaluate("LERNPAKET.alleVorab ? LERNPAKET.alleVorab().length : 0"):
        pg.evaluate("LERNPAKET.zeige('abkuerzung')")
        pg.wait_for_timeout(80)
        ansichten.append(('Abkürzung', _primaer(pg)))
        pg.evaluate("LERNPAKET.aktuelleTeile().filter(t => t.art === 'abkuerzung').forEach(t => { t.obj.loesen(); t.obj.auswerten(); })")
        pg.wait_for_timeout(80)
        soll = pg.evaluate("PAKET.stationen.filter(s => LERNPAKET.vorabFragen(s).length).map(s => s.id)")
        ist = pg.evaluate('LERNPAKET.zustand().skip')
        punkt(sorted(ist) == sorted(soll), 'Selbststeuerung', f'Abkürzung „Ich kenne mich schon aus“: mit allen Vorab-Fragen richtig sind {len(ist)} von {len(soll)} Stationen überspringbar.' if sorted(ist) == sorted(soll) else f'Abkürzung markiert {ist} statt {soll}.')
    z = pg.evaluate('LERNPAKET.zustand()')
    offen = [s for s in info['st'] if not z['st'].get(s)]
    punkt(not offen, 'Lösbarkeit', 'Alle Stationen sind mit der Musterlösung lösbar.' if not offen else 'Mit der Musterlösung nicht abschließbar: ' + ', '.join(offen))
    ue_frueh = []
    for i, uid in enumerate(info['ue']):
        pg.evaluate(f"LERNPAKET.zeige('ueben', {i})")
        pg.wait_for_timeout(100)
        ansichten.append((f'Übung {uid}', _primaer(pg)))
        if neu and pg.evaluate(weiter_vorn):
            ue_frueh.append(uid)
        if bilder and i == 0:
            pg.screenshot(path=os.path.join(bilder, '2-uebung.png'), full_page=False)
        pg.evaluate(loese)
        pg.wait_for_timeout(60)
        ansichten.append((f'Übung {uid}, gelöst', _primaer(pg)))
    z = pg.evaluate('LERNPAKET.zustand()')
    offen = [u for u in info['ue'] if not z['ue'].get(u)]
    punkt(not offen, 'Lösbarkeit', 'Alle Übungen sind mit der Musterlösung lösbar.' if not offen else 'Mit der Musterlösung nicht lösbar: ' + ', '.join(offen))
    if neu and info['ue']:
        punkt(not ue_frueh, 'Bedienung', '„Weiter“ ist erst hervorgehoben, wenn die Übung gelöst ist.' if not ue_frueh else '„Weiter“ ist schon vor dem Lösen hervorgehoben: ' + ', '.join(ue_frueh))
    # Selbstüberprüfung mit Musterlösung (zählt nicht)
    pg.evaluate(f"LERNPAKET.zeige('{su}')")
    ansichten.append(('Selbstüberprüfung', _primaer(pg)))
    if bilder:
        pg.screenshot(path=os.path.join(bilder, '3-selbstueberpruefung.png'), full_page=False)
    _klick_weiter(pg)
    if info['a']:
        if bilder:
            pg.screenshot(path=os.path.join(bilder, '3-selbstueberpruefung-a.png'), full_page=True)
        pg.evaluate(loese)
        _klick_weiter(pg)
    pg.evaluate("LERNPAKET.aktuelleTeile().forEach(t => t.art === 'frage' && t.obj.loesungEinsetzen())")
    if bilder:
        pg.screenshot(path=os.path.join(bilder, '4-selbstueberpruefung-b.png'), full_page=True)
    _klick_weiter(pg)
    z = pg.evaluate('LERNPAKET.zustand()')
    punkt(z['best'] == 100, 'Lösbarkeit', f'Selbstüberprüfung mit Musterlösung: {z["best"]} % (Soll: 100 %).')
    v = pg.evaluate('window.__scorm.v')
    status = v.get('cmi.core.lesson_status')
    punkt(status == 'completed' and v.get('cmi.core.score.raw') == '100', 'Datenübergabe',
          f'Lernplattform erhält score.raw={v.get("cmi.core.score.raw")} (als Information) und lesson_status={status}' + (' – die Selbstüberprüfung zählt nicht.' if status == 'completed' else ' (Soll: completed – die Selbstüberprüfung zählt nicht).'))
    gewertet = pg.evaluate("window.__scorm.calls.filter(c => c[0] === 'LMSSetValue' && /(lesson_status|objectives\\.\\d+\\.status)$/.test(c[1][0]) && /^(passed|failed)/.test(c[1][1])).map(c => c[1][0] + '=' + c[1][1])")
    punkt(not gewertet, 'Datenübergabe', 'Das Paket meldet nie bestanden oder nicht bestanden (das entscheidet erst der Kompetenznachweis außerhalb des Pakets).' if not gewertet
          else 'Das Paket meldet bestanden/nicht bestanden: ' + ', '.join(sorted(set(gewertet))[:4]))
    nobj = len([k for k in v if re.match(r'cmi\.objectives\.\d+\.id$', k)])
    kennungen = [v[k] for k in v if re.match(r'cmi\.interactions\.\d+\.id$', k)]
    nint = len(kennungen)
    punkt(nobj > 0 and nint > 0, 'Datenübergabe', f'Übertragen: {nobj} Lernziele (objectives), {nint} Fragen und Prüfpunkte (interactions).')
    if kennungen:
        form = all(re.match(r'[SN]\d+_', x) for x in kennungen)
        punkt(form, 'Datenübergabe', 'Kennungen der Antworten haben die Form S<Versuch>_<Frage-ID> (so kann auswerten.py Erstversuche trennen).' if form
              else 'Kennungen der Antworten ohne Versuchsnummer: ' + ', '.join(kennungen[:3]), gelb=True)
    abgelehnt = pg.evaluate("window.__scorm.calls.filter(c => c[0] === 'LMSSetValue' && c[2] === 'false').map(c => c[1][0])")
    punkt(not abgelehnt, 'Datenübergabe', 'Alle SCORM-Werte wurden angenommen.' if not abgelehnt else 'Vom Player abgelehnt: ' + ', '.join(sorted(set(abgelehnt))[:6]))
    sd = len(v.get('cmi.suspend_data', ''))
    punkt(0 < sd < 3800, 'Datenübergabe', f'suspend_data: {sd} Zeichen (Grenze 4096).')
    if bilder:
        pg.screenshot(path=os.path.join(bilder, '5-abschluss.png'), full_page=True)
    ansichten.append(('Abschluss', _primaer(pg)))
    if neu:
        ab = pg.evaluate("({skalen: document.querySelectorAll('#haupt .skala').length, abgleich: document.querySelectorAll('#haupt .abgleich').length, ej: Object.keys(LERNPAKET.zustand().ej || {}).length})")
        gut = ab['skalen'] == 0 and (ab['abgleich'] > 0 or ab['ej'] == 0)
        punkt(gut, 'Selbststeuerung', 'Im Abschluss steht die eigene Einschätzung neben dem Ergebnis; es wird nichts ein zweites Mal abgefragt.' if gut
              else ('Im Abschluss wird die Einschätzung noch einmal abgefragt.' if ab['skalen'] else 'Im Abschluss fehlt der Vergleich von Einschätzung und Ergebnis.'), gelb=True)
    # zweiter Versuch ohne Antworten: bestes Ergebnis muss bleiben
    pg.evaluate(f"LERNPAKET.zeige('{su}')")
    _klick_weiter(pg)
    if info['a']:
        _klick_weiter(pg)
    _klick_weiter(pg)
    _klick_weiter(pg)
    z = pg.evaluate('LERNPAKET.zustand()')
    v = pg.evaluate('window.__scorm.v')
    punkt(z['n'] == 2 and z['best'] == 100 and v.get('cmi.core.score.raw') == '100' and v.get('cmi.core.lesson_status') == status, 'Datenübergabe', 'Zweiter, schlechterer Versuch: bestes Ergebnis bleibt erhalten.')
    # Wiedereinstieg
    pg.reload()
    pg.wait_for_timeout(500)
    z2 = pg.evaluate('LERNPAKET.zustand()')
    punkt(z2['n'] == 2 and len(z2['st']) == len(info['st']), 'Technik', 'Wiedereinstieg: Fortschritt ist nach dem Neuladen wieder da.')
    mehrfach = [f'{n} ({k})' for n, k in ansichten if k > 1]
    punkt(not mehrfach, 'Bedienung', 'Je Ansicht ist höchstens ein Knopf hervorgehoben (der nächste sinnvolle Schritt).' if not mehrfach else 'Mehr als ein hervorgehobener Knopf: ' + ', '.join(mehrfach))
    punkt(start_knoepfe == 1, 'Startseite', 'Die Startseite hat genau einen hervorgehobenen Knopf.' if start_knoepfe == 1 else f'Die Startseite hat {start_knoepfe} hervorgehobene Knöpfe (Soll: genau einen).')


SIM_ABBILD = """(() => { const b = LERNPAKET.sim.box(); if (!b) return '';
    const w = [...b.querySelectorAll('input,select,textarea')].map(e => (e.type === 'checkbox' || e.type === 'radio') ? String(e.checked) : e.value);
    return w.join('|') + ' # ' + b.innerText.replace(/\\s+/g, ' ').trim(); })()"""


def _sim_zur_lektion(pg, i):
    pg.evaluate(f"LERNPAKET.zeige('entdecken', {i})")
    pg.wait_for_timeout(100)
    pg.evaluate("LERNPAKET.aktuelleTeile().filter(t => t.art === 'vorab').forEach(t => t.obj.zurSzene())")
    pg.wait_for_timeout(80)


def _simulation(ctx, url, bilder):
    """Simulationsmodus: Schritte über die Bedienknöpfe lösen, Gegenstand bleibt erhalten, Wiedereinstieg."""
    pg = ctx.new_page()
    fehler = []
    pg.on('pageerror', lambda e: fehler.append(str(e)))
    pg.goto(url)
    pg.wait_for_timeout(500)
    info = pg.evaluate("PAKET.stationen.map(s => ({id: s.id, n: (s.schritte || []).length}))")
    ziel = (1, 1) if len(info) > 1 and info[1]['n'] > 1 else (len(info) - 1, 0)
    vorher_fertig, nicht_loesbar, neu_gebaut, zu_frueh, mehrere = [], [], [], [], []
    neu = pg.evaluate("parseInt(LERNPAKET.version, 10) >= 4")
    wieder = None
    for i, st in enumerate(info):
        _sim_zur_lektion(pg, i)
        pg.evaluate("LERNPAKET.sim.box().dataset.simtest = '1'")
        for k in range(st['n']):
            name = f"{st['id']} Schritt {k + 1}"
            if (i, k) == ziel and wieder is None:
                vor = pg.evaluate(SIM_ABBILD)
                pg.reload()
                pg.wait_for_timeout(500)
                _sim_zur_lektion(pg, i)
                pos = pg.evaluate('LERNPAKET.sim.position()')
                nach = pg.evaluate(SIM_ABBILD)
                wieder = (vor == nach and pos == {'i': i, 'k': k}, name, pos)
                if bilder:
                    pg.screenshot(path=os.path.join(bilder, '1-simulation-wiedereinstieg.png'), full_page=False)
                pg.evaluate("LERNPAKET.sim.box().dataset.simtest = '1'")
            if pg.evaluate(f"LERNPAKET.sim.pruefe({i}, {k})"):
                vorher_fertig.append(name)
            elif neu and pg.evaluate("(() => { const b = document.getElementById('weiter'); return !!(b && b.classList.contains('primaer')); })()"):
                zu_frueh.append(name)
            if _primaer(pg) > 1:
                mehrere.append(name)
            knopf = pg.evaluate("""(() => { const k = [...document.querySelectorAll('.sim-schritt .steuerung button')]
                .find(b => b.offsetParent !== null && (b.classList.contains('zeig') || b.textContent.trim() === 'Lösung zeigen'));
                if (!k) return false; k.click(); return true; })()""")
            pg.wait_for_timeout(120)
            erledigt = pg.evaluate(f"!!LERNPAKET.zustand().sd[{json.dumps(st['id'] + '.' + str(k))}]")
            if _primaer(pg) > 1:
                mehrere.append(name + ' (gelöst)')
            if not (knopf and erledigt and pg.evaluate(f"LERNPAKET.sim.pruefe({i}, {k})")):
                nicht_loesbar.append(name)
            _klick_weiter(pg)
            if pg.evaluate("!(LERNPAKET.sim.box() && LERNPAKET.sim.box().dataset.simtest)"):
                neu_gebaut.append(name)
                pg.evaluate("LERNPAKET.sim.box().dataset.simtest = '1'")
        # Kurz-Check lösen, damit das Kapitel abgeschlossen ist
        pg.evaluate("""LERNPAKET.aktuelleTeile().forEach(t => { if (t.art === 'frage') { t.obj.loesungEinsetzen(); const b = t.obj.el.querySelector('button.pruefen'); if (b && !b.hidden) b.click(); } })""")
        pg.wait_for_timeout(80)
        if i + 1 < len(info):
            pg.evaluate(f"LERNPAKET.zeige('entdecken', {i + 1})")
            pg.wait_for_timeout(100)
            if pg.evaluate("!(LERNPAKET.sim.box() && LERNPAKET.sim.box().dataset.simtest)"):
                neu_gebaut.append(f"Wechsel zu {info[i + 1]['id']}")
    punkt(not nicht_loesbar, 'Simulation', 'Jeder Schritt ist über „Zeig’s mir“ oder „Lösung zeigen“ lösbar.' if not nicht_loesbar
          else 'Schritt nicht lösbar (loesen erfüllt pruefe nicht): ' + ', '.join(nicht_loesbar[:6]))
    punkt(not vorher_fertig, 'Simulation', 'Kein Schritt ist schon vor dem Handeln erledigt.' if not vorher_fertig
          else 'Schon vor dem Handeln erledigt (pruefe zu weit gefasst oder Schritt doppelt): ' + ', '.join(vorher_fertig[:6]), gelb=True)
    punkt(not neu_gebaut, 'Simulation', 'Der Gegenstand bleibt zwischen Schritten und Kapiteln erhalten.' if not neu_gebaut
          else 'Gegenstand wird neu aufgebaut (Arbeit geht scheinbar verloren) bei: ' + ', '.join(neu_gebaut[:6]))
    if neu:
        punkt(not zu_frueh and not mehrere, 'Simulation', '„Nächster Schritt“ ist erst hervorgehoben, wenn der Schritt erledigt ist; je Schritt höchstens ein hervorgehobener Knopf.' if not zu_frueh and not mehrere
              else ('Schon vor dem Handeln hervorgehoben: ' + ', '.join(zu_frueh[:6]) if zu_frueh else 'Mehr als ein hervorgehobener Knopf: ' + ', '.join(mehrere[:6])))
    if wieder:
        punkt(wieder[0], 'Simulation', f'Wiedereinstieg: Nach dem Neuladen steht der Gegenstand bei {wieder[1]} wieder genau so da.' if wieder[0]
              else f'Wiedereinstieg bei {wieder[1]}: Gegenstand nach dem Neuladen anders als vorher (Position {wieder[2]}). loesen der früheren Schritte prüfen.')
    punkt(not fehler, 'Simulation', 'Keine Fehler beim Durchspielen der Simulation.' if not fehler else 'Fehler: ' + ' | '.join(fehler[:4]))
    pg.close()


def _startseite(ctx, url, bilder):
    """Startseite = Überblick: ohne Scrollen, wenig Fließtext, keine Eingaben (Leitfaden C2, Teil 0)."""
    zu_lang, eingaben, woerter = [], 0, 0
    for w, h, name in [(1366, 768, 'Laptop'), (768, 1024, 'Tablet')]:
        pg = ctx.new_page()
        pg.set_viewport_size({'width': w, 'height': h})
        pg.goto(url)
        pg.wait_for_timeout(400)
        m = pg.evaluate("""(() => {
            const H = document.getElementById('haupt'), L = document.getElementById('leiste');
            const k = [...H.children].filter(x => x.offsetParent !== null);
            const unten = k.length ? Math.max(...k.map(x => x.getBoundingClientRect().bottom)) : 0;
            const lr = L ? L.getBoundingClientRect() : {top: innerHeight, bottom: 0};
            const c = H.cloneNode(true);
            c.querySelectorAll('svg, button, .lernpfad, .weltkarte, .sr, .name, h2').forEach(x => x.remove());
            return {unten: Math.round(unten), oben: Math.round(lr.top), ende: Math.round(lr.bottom), vh: innerHeight,
                    eingaben: H.querySelectorAll('input, textarea, select').length, woerter: LERNPAKET.woerter(c.innerHTML)};
          })()""")
        if m['unten'] > m['oben'] + 2 or m['ende'] > m['vh']:
            zu_lang.append(f"{name} {w}×{h}: Inhalt bis {m['unten']} px, Leiste ab {m['oben']} px")
        eingaben, woerter = max(eingaben, m['eingaben']), max(woerter, m['woerter'])
        if bilder:
            pg.screenshot(path=os.path.join(bilder, f'0-start-{w}x{h}.png'), full_page=False)
        pg.close()
    punkt(not zu_lang, 'Startseite', 'Startseite passt ohne Scrollen auf Laptop (1366×768) und Tablet (768×1024).' if not zu_lang else 'Startseite braucht Scrollen: ' + '; '.join(zu_lang), gelb=True)
    punkt(woerter <= 45, 'Startseite', f'Wenig Fließtext auf der Startseite ({woerter} Wörter, Ziel höchstens etwa 40).' if woerter <= 45 else f'Zu viel Fließtext auf der Startseite: {woerter} Wörter (Ziel höchstens etwa 40). Leitsituation kürzen, Rest in Stationen.', gelb=True)
    punkt(not eingaben, 'Startseite', 'Keine Eingaben auf der Startseite (Einschätzung und Vorab-Fragen stehen an den Stationen).' if not eingaben else f'{eingaben} Eingabefelder auf der Startseite – Einschätzung und Vorwissens-Fragen gehören an die Stationen.', gelb=True)


def _schmal(ctx, url, bilder, vorlage):
    for w, h, name in [(768, 1024, 'Tablet'), (390, 844, 'Handy')]:
        pg = ctx.new_page()
        pg.set_viewport_size({'width': w, 'height': h})
        pg.goto(url)
        pg.wait_for_timeout(400)
        teile = ['start', 'entdecken', 'ueben', 'nachweis', 'abschluss'] if vorlage else ['start']  # 'nachweis': älterer Name, die Engine leitet auf die Selbstüberprüfung um
        zu_breit = []
        for t in teile:
            if vorlage:
                pg.evaluate(f"LERNPAKET.zeige('{t}', 0)")
                pg.wait_for_timeout(80)
            sw = pg.evaluate('document.documentElement.scrollWidth')
            if sw > w + 1:
                zu_breit.append(f'{t} ({sw}px)')
            if vorlage:
                sichtbar = pg.evaluate("(() => { const b = document.getElementById('weiter'); if (!b) return true; const r = b.getBoundingClientRect(); return r.bottom <= innerHeight && r.right <= innerWidth && r.width > 0; })()")
                if not sichtbar:
                    zu_breit.append(f'{t}: Weiter-Knopf nicht sichtbar')
        if bilder:
            pg.screenshot(path=os.path.join(bilder, f'schmal-{w}.png'), full_page=False)
        punkt(not zu_breit, 'Bedienung', f'{name} ({w}px): ' + (('kein seitliches Scrollen, Weiter-Knopf sichtbar.' if vorlage else 'kein seitliches Scrollen auf der Startseite.') if not zu_breit else 'Probleme: ' + ', '.join(zu_breit)), gelb=name == 'Handy')
        pg.close()


def _tafel(ctx, url, bilder):
    pg = ctx.new_page()
    pg.set_viewport_size({'width': 1600, 'height': 900})  # Beamer
    fehler = []
    pg.on('pageerror', lambda e: fehler.append(str(e)))
    pg.on('console', lambda m: fehler.append(_konsole(m)) if m.type == 'error' else None)
    pg.goto(url)
    pg.wait_for_timeout(500)
    if not pg.evaluate('!!(window.PAKET && PAKET.tafel)'):
        pg.close()
        return
    if not pg.evaluate('!!window.TAFEL'):
        punkt(False, 'Tafelbild', 'PAKET.tafel ist gesetzt, aber js/tafel.js ist nicht eingebunden.')
        pg.close()
        return
    schreib = "window.__scorm.calls.filter(c => c[0] === 'LMSSetValue').length"
    vor = pg.evaluate(schreib)
    zugang = pg.locator('.kopf .tafel-knopf').count() == 1 and pg.locator('.kopf .tafel-knopf').is_visible()
    punkt(zugang, 'Tafelbild', 'Zugang vorhanden: Knopf „Tafelbild“ in der Kopfzeile.' if zugang else 'Knopf „Tafelbild“ in der Kopfzeile fehlt.')
    frei = pg.locator('#haupt .tafel-hinweis').count() == 0
    punkt(frei, 'Startseite', 'Die Startseite bleibt ohne eigenen Hinweis aufs Tafelbild (es gehört zum Input der Lehrkraft).' if frei else 'Hinweis aufs Tafelbild auf der Startseite – seit Kompass 4 entfällt er (aktuelle tafel.js und engine.js übernehmen).', gelb=True)
    pg.evaluate('TAFEL.oeffnen({})')
    pg.wait_for_timeout(200)
    n = pg.evaluate('TAFEL.zustand().anzahl')
    leer, breit = [], []
    for i in range(n):
        pg.evaluate(f'TAFEL.szene({i})')
        pg.wait_for_timeout(150)
        if pg.evaluate("document.querySelector('.tafel-szene').children.length") == 0:
            leer.append(str(i + 1))
        if bilder:
            pg.screenshot(path=os.path.join(bilder, f'tafel-{i + 1}.png'))
        for k in range(pg.locator('.tafel-werkzeuge button').count()):
            b = pg.locator('.tafel-werkzeuge button').nth(k)
            if b.is_enabled():
                b.click()
                pg.wait_for_timeout(60)
        if pg.evaluate('document.documentElement.scrollWidth') > 1601:
            breit.append(str(i + 1))
    punkt(not leer, 'Tafelbild', f'{n} Szenen; alle zeichnen etwas, alle Werkzeuge einmal ausgelöst.' if not leer else 'Szenen ohne Inhalt: ' + ', '.join(leer))
    if n > 4:
        punkt(False, 'Tafelbild', f'{n} Szenen – das Tafelbild ersetzt nur den Mittelteil des Inputs (Erklären und Beispiel): zwei bis vier Szenen genügen.', gelb=True)
    pg.evaluate('TAFEL.szene(0)')
    pg.locator('.tafel').focus()
    pg.keyboard.press('ArrowRight')
    tasten = n < 2 or pg.evaluate('TAFEL.zustand().szene') == 1
    pg.keyboard.press('Escape')
    pg.wait_for_timeout(100)
    tasten = tasten and not pg.evaluate('TAFEL.zustand().offen')
    punkt(tasten, 'Tafelbild', 'Bedienung per Tastatur (Pfeiltaste, Esc) funktioniert.')
    nach = pg.evaluate(schreib)
    punkt(vor == nach, 'Datenübergabe', 'Tafelbild schreibt nichts an die Lernplattform.' if vor == nach else f'Tafelbild hat {nach - vor} SCORM-Werte geschrieben – es darf nichts speichern.')
    pg2 = ctx.new_page()
    pg2.set_viewport_size({'width': 768, 'height': 1024})
    pg2.goto(url + '#tafel')
    pg2.wait_for_timeout(500)
    z = pg2.evaluate('window.TAFEL && TAFEL.zustand()') or {}
    ok = bool(z.get('offen')) and z.get('praesentation') and not z.get('erklaerungen')
    punkt(ok, 'Tafelbild', 'index.html#tafel startet die Präsentation ohne Erklärungen.' if ok else 'index.html#tafel öffnet die Präsentation nicht richtig.')
    if pg2.evaluate('document.documentElement.scrollWidth') > 769:
        breit.append('Tablet')
    pg2.close()
    punkt(not breit, 'Tafelbild', 'Kein seitliches Scrollen (Beamer 1600 px, Tablet 768 px).' if not breit else 'Seitliches Scrollen in: ' + ', '.join(breit), gelb=True)
    echte = [f for f in fehler if 'favicon' not in f]
    punkt(not echte, 'Tafelbild', 'Keine Konsolenfehler beim Durchschalten.' if not echte else 'Konsolenfehler: ' + ' | '.join(echte[:5]))
    pg.close()


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('paket')
    ap.add_argument('--bericht')
    ap.add_argument('--bilder')
    ap.add_argument('--ohne-browser', action='store_true')
    a = ap.parse_args()
    root, tmp = entpacken(a.paket)
    href = statisch(root)
    quellen_pruefen(root)
    if href and not a.ohne_browser:
        browser(root, href, a.bilder)
    print(f'Prüfbericht für {a.paket}\n')
    for amp, ber, txt in ERG:
        print(f'{amp} [{ber}] {txt}')
    rot = sum(1 for e in ERG if e[0] == '🔴')
    gelb = sum(1 for e in ERG if e[0] == '🟡')
    print(f'\nErgebnis: {rot} rot, {gelb} gelb, {len(ERG) - rot - gelb} grün.')
    if a.bericht:
        json.dump([{'ampel': x, 'bereich': y, 'text': z} for x, y, z in ERG], open(a.bericht, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    if tmp:
        shutil.rmtree(tmp, ignore_errors=True)
    sys.exit(1 if rot else 0)


if __name__ == '__main__':
    main()
