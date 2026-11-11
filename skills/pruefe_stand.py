#!/usr/bin/env python3
"""Prüft, dass Leitfaden, Skill-Set und Vorlage denselben Stand haben.

  python3 skills/pruefe_stand.py            prüft und bricht mit Fehlercode ab, wenn etwas nicht stimmt
  python3 skills/pruefe_stand.py --setze    trägt die Nummer aus VERSION überall ein

1. Eine Versionsnummer für alles: Die Datei VERSION im Wurzelverzeichnis ist die Quelle. Dieselbe
   Nummer steht im Kopf des Leitfadens, am Ende jeder SKILL.md, in der Engine (LERNPAKET.version),
   im Tafelbild (TAFEL.version), in der index.html der Vorlage (generator) sowie in Beispielinhalt
   (quelle/paket.js) und Manifest der Vorlage. Das gebaute js/inhalt.js der Vorlage muss zu quelle/ passen
   (--setze baut es neu).
2. Keine überholten Begriffe: Nach einer Umbenennung bleiben leicht alte Wörter in Referenz,
   Vorlagen oder Beispielen stehen. Gesucht wird nach den Begriffen, die mit Kompass 4.0 ersetzt
   wurden. Zeilen, die ausdrücklich von früher sprechen („älter“, „früher“, „entfällt“ …), und der
   Abschnitt „Offene Punkte“ des Leitfadens (Änderungsgeschichte) sind ausgenommen.
Wird von skills/baue-skills.sh vor dem Bauen aufgerufen.
"""
import os, re, sys

HIER = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HIER)
SKILLS = ['lernpaket-planen', 'fragenpool-erstellen', 'lernpaket-bauen', 'lernpaket-pruefen', 'lernpaket-auswerten', '_gesamt']
VORLAGE = os.path.join('skills', 'lernpaket-bauen', 'vorlage')

# (Datei, Muster mit genau einer Gruppe für die Nummer, Beschreibung)
STELLEN = [(os.path.join('docs', 'leitfaden-lernpakete.md'), r'^Entwurf · Kompass ([\d.]+) · ', 'Kopf des Leitfadens')]
STELLEN += [(os.path.join('skills', s, 'SKILL.md'), r'^Stand: Lernpaket-Kompass ([\d.]+)\s*$', 'letzte Zeile der SKILL.md') for s in SKILLS]
STELLEN += [
    (os.path.join(VORLAGE, 'js', 'engine.js'), r"window\.LERNPAKET = \{\s*version: '([\d.]+)'", 'LERNPAKET.version'),
    (os.path.join(VORLAGE, 'js', 'tafel.js'), r"window\.TAFEL = \{\s*version: '([\d.]+)'", 'TAFEL.version'),
    (os.path.join(VORLAGE, 'index.html'), r'<meta name="generator" content="Lernpaket-Kompass ([\d.]+)">', 'generator in der index.html'),
    (os.path.join(VORLAGE, 'quelle', 'paket.js'), r"^  version: '([\d.]+)'", 'Version des Beispielinhalts (quelle/paket.js)'),
    (os.path.join(VORLAGE, 'imsmanifest.xml'), r'<manifest identifier="[^"]*" version="([\d.]+)"', 'Version im Manifest der Vorlage'),
    ('README.md', r'Aktueller Stand: \*\*Kompass ([\d.]+)\*\*', 'README'),
]

# Überholte Begriffe: (Muster, was stattdessen gilt)
ALT = [
    (r'\bP14\b', 'P14 ist in P12 aufgegangen'),
    (r'(vierzehn|14) Prinzipien', 'es sind 13 Prinzipien'),
    (r'Bestehensgrenze', 'die Selbstüberprüfung zählt nicht; Marke „bereit“'),
    (r'(?<![A-Za-zÄÖÜäöüß„])Nachweis(?![-a-zäöüß])', '„Selbstüberprüfung“ (im Paket) oder „Kompetenznachweis“ (außerhalb)'),
    (r'Kompetenznachweis \(bestanden ab', 'im Paket gibt es kein Bestehen'),
    (r'Lernziel-Nachweis-Tabelle|lernziele-nachweis', 'Lernziel-Tabelle, lernziele-ueberpruefung.md'),
    (r'input-ablauf|Ablaufplan-Vorlage', 'tafelbild-notizen.md; der Ablauf steht in den Notizen der Folien'),
    (r'freiwillige[rn]? (Lehrer-)?Input', 'das Tafelbild ersetzt den Mittelteil des Inputs'),
    (r'3–5 Fragen', 'Kurz-Check mit 2–3 Fragen und der Auflösung der Vorab-Frage'),
    (r'N<Versuch>', 'Kennung S<Versuch>_<Frage-ID>'),
    (r'masteryscore(?: im Manifest)? ?(=|:)? ?80', 'kein masteryscore'),
    (r"einsatz: \[[^\]]*'nachweis'", "einsatz 'selbstueberpruefung'"),
    (r'^\s*nachweis: \{', 'Feld selbstueberpruefung'),
    (r'^\s*bestehen: \d', 'Feld bereit'),
]
ERLAUBT = re.compile(r'älter|Älter|früher|Früher|damals|bisher|seit (Kompass )?4|vor Kompass 4|vor 4\.0|entf[äa]ll|überholt|weiter gelesen|umbenannt|statt Nachweis|aufgegangen|nicht mehr|nannten|Nachweis-Paket')
# Dateien, in denen nach überholten Begriffen gesucht wird (generierte Kopien und dieses Skript nicht)
SUCH_ENDUNGEN = ('.md', '.js', '.html', '.css', '.py', '.sh', '.xml', '.yml')
AUSNAHME_DATEIEN = {os.path.join('skills', 'pruefe_stand.py')}


def lies(rel):
    return open(os.path.join(REPO, rel), encoding='utf-8').read()


def version_pruefen(soll, setze):
    fehler = []
    for rel, muster, was in STELLEN:
        if not os.path.isfile(os.path.join(REPO, rel)):
            fehler.append(f'{rel}: Datei fehlt ({was})')
            continue
        t = lies(rel)
        m = re.search(muster, t, flags=re.M)
        if not m:
            if setze and was == 'letzte Zeile der SKILL.md':
                open(os.path.join(REPO, rel), 'w', encoding='utf-8').write(t.rstrip('\n') + f'\n\nStand: Lernpaket-Kompass {soll}\n')
                print(f'ergänzt  {rel}')
            else:
                fehler.append(f'{rel}: Versionsangabe nicht gefunden ({was})')
            continue
        if m.group(1) != soll:
            if setze:
                neu = t[:m.start(1)] + soll + t[m.end(1):]
                open(os.path.join(REPO, rel), 'w', encoding='utf-8').write(neu)
                print(f'gesetzt  {rel}: {m.group(1)} → {soll}')
            else:
                fehler.append(f'{rel}: {was} ist {m.group(1)}, VERSION ist {soll}')
    return fehler


def vorlage_gebaut(setze):
    """js/inhalt.js der Vorlage muss dem entsprechen, was paket.py bauen aus quelle/ erzeugt."""
    sys.path.insert(0, os.path.join(HIER, '_gemeinsam', 'scripts'))
    import quellen
    root = os.path.join(REPO, VORLAGE)
    text, _, meld = quellen.inhalt_erzeugen(root)
    if text is None:
        return [f'{VORLAGE}/quelle: ' + t for a, t in meld if a == 'fehler'] or [f'{VORLAGE}/quelle fehlt']
    ziel = os.path.join(root, 'js', 'inhalt.js')
    ist = open(ziel, encoding='utf-8').read() if os.path.isfile(ziel) else ''
    if ist == text:
        return []
    if setze:
        with open(ziel, 'w', encoding='utf-8', newline='\n') as f:
            f.write(text)
        print(f'gebaut   {VORLAGE}/js/inhalt.js aus quelle/')
        return []
    return [f'{VORLAGE}/js/inhalt.js passt nicht zu quelle/ – python3 skills/lernpaket-bauen/scripts/paket.py bauen {VORLAGE}']


def begriffe_pruefen():
    fehler = []
    for d, ordner, dateien in os.walk(REPO):
        rel_d = os.path.relpath(d, REPO)
        ordner[:] = [o for o in ordner if o not in ('.git', 'dist', 'node_modules', '__pycache__', 'schrift', 'referenz')]
        for f in sorted(dateien):
            rel = os.path.normpath(os.path.join(rel_d, f))
            if not f.endswith(SUCH_ENDUNGEN) or rel in AUSNAHME_DATEIEN:
                continue
            if rel.startswith(os.path.join('skills', '')) and not rel.startswith(os.path.join('skills', '_gemeinsam')) and os.sep + 'scripts' + os.sep in rel and f in ('pruefe_paket.py', 'quellen.py'):
                continue  # Kopie aus _gemeinsam
            geschichte = False
            for nr, zeile in enumerate(lies(rel).split('\n'), 1):
                if rel.endswith('leitfaden-lernpakete.md'):
                    if zeile.startswith('## '):
                        geschichte = zeile.startswith('## Offene Punkte')
                    if geschichte:
                        continue
                if ERLAUBT.search(zeile):
                    continue
                for muster, statt in ALT:
                    m = re.search(muster, zeile)
                    if m:
                        # Fachtexte der Beispiele dürfen das Wort „Nachweis“ im allgemeinen Sinn verwenden
                        if 'Nachweis' in m.group(0) and ('beispiele' in rel and re.search(r'(Ein|ein|keinen|einen|zuverlässigen|als) Nachweis', zeile)):
                            continue
                        fehler.append(f'{rel}:{nr}: „{m.group(0)}“ – {statt}')
    return fehler


def main():
    setze = '--setze' in sys.argv[1:]
    soll = lies('VERSION').strip()
    if not re.fullmatch(r'\d+\.\d+(\.\d+)?', soll):
        sys.exit(f'VERSION enthält keine Versionsnummer: {soll!r}')
    fehler = version_pruefen(soll, setze)
    fehler += vorlage_gebaut(setze)
    alt = begriffe_pruefen()
    if fehler:
        print(f'Versionsnummer (VERSION = {soll}):')
        for x in fehler:
            print('  ' + x)
    if alt:
        print('Überholte Begriffe:')
        for x in alt:
            print('  ' + x)
    if fehler or alt:
        sys.exit(1)
    print(f'Stand in Ordnung: Kompass {soll} in {len(STELLEN)} Stellen, keine überholten Begriffe.')


if __name__ == '__main__':
    main()
