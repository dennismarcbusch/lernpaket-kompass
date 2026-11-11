#!/usr/bin/env python3
"""Werkzeug zum Bauen von Lernpaketen aus der Kompass-Vorlage.

  python3 paket.py neu <zielordner> --id <präfix>-<name> --titel "Titel"
      Kopiert die Vorlage (Engine, Stil, Beispielinhalt mit Quellen, Manifest) in einen neuen Ordner,
      setzt Identifier und Titel im Manifest und die Paketversion auf 1.0 und baut js/inhalt.js.
      Danach quelle/paket.js und quelle/fragen.md mit den Inhalten füllen.

  python3 paket.py bauen <paketordner>
      Erzeugt js/inhalt.js aus dem Ordner quelle/: die .js-Dateien (alphabetisch, paket.js zuletzt,
      oder in der Reihenfolge aus quelle/reihenfolge.txt) und die Fragen aus quelle/fragen.md.
      Bricht mit Zeilenangabe ab, wenn fragen.md einen Fehler hat. Pakete ohne quelle/ bleiben,
      wie sie sind (dort ist js/inhalt.js selbst die Quelle).

  python3 paket.py zip <paketordner> [--aus <datei.zip>]
      Baut zuerst js/inhalt.js (wenn es quelle/ gibt), aktualisiert die Dateiliste im Manifest,
      gleicht Titel, Version und Identifier mit js/inhalt.js ab und packt das ZIP so, dass
      imsmanifest.xml im Wurzelverzeichnis liegt. Der Ordner quelle/ kommt nicht ins ZIP.
      Ein masteryscore gehört nicht ins Manifest (die Selbstüberprüfung zählt nicht; mit
      masteryscore würde die Lernplattform selbst „bestanden“ oder „nicht bestanden“ setzen);
      ein vorhandener Eintrag wird entfernt.
      Standardname: <name>_scorm12.zip neben dem Paketordner.
"""
import argparse, os, re, shutil, sys, zipfile
from xml.sax.saxutils import escape

HIER = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HIER)
import quellen  # noqa: E402  (liegt neben diesem Skript)

VORLAGE = os.path.join(HIER, '..', 'vorlage')
ID_MUSTER = re.compile(r'[a-z0-9]+-[a-z0-9]+(?:-[a-z0-9]+)*')  # <präfix>-<name>
NICHT_INS_ZIP = ('quelle/',)  # Quellen gehören ins Repository, nicht ins Paket


def bauen(root, still=False):
    """Erzeugt js/inhalt.js aus quelle/. Gibt False zurück, wenn es keine Quellen gibt."""
    text, fragen, meld = quellen.inhalt_erzeugen(root)
    for art, t in meld:
        if art == 'fehler' or not still:
            print({'fehler': 'FEHLER  ', 'hinweis': 'Hinweis ', 'pruefen': 'Prüfen  '}[art] + t)
    if text is None:
        if meld:
            sys.exit('js/inhalt.js nicht gebaut: Fehler in quelle/ beheben (siehe oben).')
        return False
    ziel = os.path.join(root, 'js', 'inhalt.js')
    os.makedirs(os.path.dirname(ziel), exist_ok=True)
    alt = open(ziel, encoding='utf-8').read() if os.path.isfile(ziel) else None
    if alt != text:
        with open(ziel, 'w', encoding='utf-8', newline='\n') as f:
            f.write(text)
    if not still:
        print(f'js/inhalt.js gebaut aus quelle/ ({len(fragen)} Fragen aus fragen.md)' + ('' if alt != text else ', unverändert') + '.')
    return True


def neu(a):
    if not ID_MUSTER.fullmatch(a.id):
        sys.exit('Die id muss "<präfix>-<name>" lauten, nur Kleinbuchstaben, Ziffern und Bindestriche, z. B. ping-dreisatz oder bwl-dreisatz.')
    if os.path.exists(a.ziel) and os.listdir(a.ziel):
        sys.exit(f'Der Ordner {a.ziel} existiert schon und ist nicht leer.')
    shutil.copytree(VORLAGE, a.ziel, dirs_exist_ok=True)
    m = os.path.join(a.ziel, 'imsmanifest.xml')
    t = open(m, encoding='utf-8').read()
    t = re.sub(r'identifier="[^"]*"', f'identifier="{a.id}"', t, count=1)
    t = re.sub(r'<title>[^<]*</title>', f'<title>{escape(a.titel)}</title>', t)
    open(m, 'w', encoding='utf-8').write(t)
    quelle = os.path.join(a.ziel, 'quelle', 'paket.js')
    i = quelle if os.path.isfile(quelle) else os.path.join(a.ziel, 'js', 'inhalt.js')
    s = open(i, encoding='utf-8').read()
    s = re.sub(r"id: '[^']*'", f"id: '{a.id}'", s, count=1)
    s = re.sub(r"titel: '[^']*'", "titel: " + repr(a.titel), s, count=1)
    s = re.sub(r"\bversion:\s*'[^']*'", "version: '1.0'", s, count=1)  # die Vorlage trägt die Kompass-Version, ein neues Paket beginnt bei 1.0
    open(i, 'w', encoding='utf-8').write(s)
    bauen(os.path.abspath(a.ziel), still=True)
    print(f'Neues Paket in {a.ziel} angelegt (id {a.id}). Als Nächstes quelle/paket.js und quelle/fragen.md mit den Inhalten füllen, dann paket.py bauen.')


def zippen(a):
    root = os.path.abspath(a.ordner)
    m = os.path.join(root, 'imsmanifest.xml')
    if not os.path.isfile(m):
        sys.exit('imsmanifest.xml fehlt im Paketordner.')
    bauen(root, still=True)
    t = open(m, encoding='utf-8').read()
    inhalt = os.path.join(root, 'js', 'inhalt.js')
    t = re.sub(r'\n?[ \t]*<adlcp:masteryscore>[^<]*</adlcp:masteryscore>', '', t)
    if os.path.isfile(inhalt):
        s = open(inhalt, encoding='utf-8').read()
        ti = re.search(r"titel:\s*'((?:[^'\\]|\\.)*)'", s)
        if ti:
            t = re.sub(r'<title>[^<]*</title>', f'<title>{escape(ti.group(1))}</title>', t)
        v = re.search(r"\bversion:\s*'(\d+\.\d+(?:\.\d+)?)'", s)
        if v:
            t = re.sub(r'(<manifest[^>]*?\sversion=")[^"]*"', r'\g<1>' + v.group(1) + '"', t, count=1)
        i = re.search(r"id:\s*'([a-z0-9]+-[a-z0-9-]+)'", s)
        if i:
            t = re.sub(r'(<manifest[^>]*?identifier=")[^"]*"', r'\g<1>' + i.group(1) + '"', t, count=1)
    dateien = []
    for d, _, fs in os.walk(root):
        for f in sorted(fs):
            rel = os.path.relpath(os.path.join(d, f), root).replace(os.sep, '/')
            if rel != 'imsmanifest.xml' and not f.startswith('.') and '__MACOSX' not in rel and not rel.startswith(NICHT_INS_ZIP):
                dateien.append(rel)
    dateien.sort(key=lambda x: (x != 'index.html', x))
    liste = '\n'.join(f'      <file href="{escape(x)}"/>' for x in dateien)
    t = re.sub(r'(<resource\s[^>]*>)(.*?)(\s*</resource>)', lambda mm: mm.group(1) + '\n' + liste + mm.group(3), t, count=1, flags=re.S)
    open(m, 'w', encoding='utf-8').write(t)
    ident = re.search(r'<manifest[^>]*identifier="([^"]+)"', t).group(1)
    name = ident.split('-', 1)[1] if ID_MUSTER.fullmatch(ident) else ident  # ZIP ohne Präfix: <name>_scorm12.zip
    aus = a.aus or os.path.join(os.path.dirname(root), f'{name}_scorm12.zip')
    if os.path.exists(aus):
        os.remove(aus)
    with zipfile.ZipFile(aus, 'w', zipfile.ZIP_DEFLATED) as z:
        z.write(m, 'imsmanifest.xml')
        for x in dateien:
            z.write(os.path.join(root, x), x)
    print(f'ZIP gebaut: {aus} ({os.path.getsize(aus) // 1024} KB, {len(dateien) + 1} Dateien).')


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest='cmd', required=True)
    n = sub.add_parser('neu'); n.add_argument('ziel'); n.add_argument('--id', required=True); n.add_argument('--titel', required=True)
    b = sub.add_parser('bauen'); b.add_argument('ordner')
    z = sub.add_parser('zip'); z.add_argument('ordner'); z.add_argument('--aus')
    a = ap.parse_args()
    if a.cmd == 'neu':
        neu(a)
    elif a.cmd == 'bauen':
        if not bauen(os.path.abspath(a.ordner)):
            print('Kein Ordner quelle/: js/inhalt.js ist selbst die Quelle, es gibt nichts zu bauen.')
    else:
        zippen(a)


if __name__ == '__main__':
    main()
