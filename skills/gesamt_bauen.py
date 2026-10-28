#!/usr/bin/env python3
"""Baut den Gesamt-Skill lernpaket-kompass aus den fünf Einzel-Skills.

  python3 skills/gesamt_bauen.py <zielordner>

Erzeugt <zielordner>/lernpaket-kompass/ mit
  SKILL.md                 aus skills/_gesamt/SKILL.md (von Hand gepflegt)
  phasen/1-planen.md …     die SKILL.md der Einzel-Skills ohne YAML-Kopf, Skill-Namen als Phasen
  referenz/                gemeinsame Referenz aus skills/_gemeinsam/
  vorlagen/, vorlage/, vorlagen-lehrkraft/, scripts/   Dateien der Einzel-Skills (ohne Überschneidungen)
Wird von skills/baue-skills.sh aufgerufen; das Ergebnis wird nicht eingecheckt.
"""
import os, re, shutil, sys

HIER = os.path.dirname(os.path.abspath(__file__))
NAME = 'lernpaket-kompass'
PHASEN = [  # (Einzel-Skill, Datei, Phasenname)
    ('lernpaket-planen', '1-planen.md', 'Planen'),
    ('fragenpool-erstellen', '2-fragen.md', 'Fragen'),
    ('lernpaket-bauen', '3-bauen.md', 'Bauen'),
    ('lernpaket-pruefen', '4-pruefen.md', 'Prüfen'),
    ('lernpaket-auswerten', '5-auswerten.md', 'Auswerten'),
]
ORDNER = ['vorlagen', 'vorlage', 'vorlagen-lehrkraft', 'scripts']  # werden aus allen Skills zusammengeführt


def phase_text(skill):
    t = open(os.path.join(HIER, skill, 'SKILL.md'), encoding='utf-8').read()
    t = re.sub(r'\A---\n.*?\n---\n+', '', t, flags=re.S)
    t = re.sub(r'`<skill>` steht für den Ordner, in dem diese SKILL\.md liegt\.',
               '`<skill>` steht für den Ordner des Skills lernpaket-kompass (dort liegt die SKILL.md; `scripts/`, `vorlage/` usw. liegen direkt darin).', t)
    t = t.replace('zuerst `lernpaket-planen` bzw. `fragenpool-erstellen` zu nutzen', 'zuerst die Phasen „Planen“ bzw. „Fragen“ zu durchlaufen')
    for s, _, p in PHASEN:
        t = re.sub(rf'mit `{s}`', f'in der Phase „{p}“', t)
        t = re.sub(rf'(?:Skill )?`{s}`', f'Phase „{p}“', t)
    return t


def bauen(ziel):
    out = os.path.join(ziel, NAME)
    shutil.rmtree(out, ignore_errors=True)
    os.makedirs(os.path.join(out, 'phasen'))
    shutil.copy(os.path.join(HIER, '_gesamt', 'SKILL.md'), os.path.join(out, 'SKILL.md'))
    shutil.copytree(os.path.join(HIER, '_gemeinsam'), os.path.join(out, 'referenz'),
                    ignore=shutil.ignore_patterns('scripts', '__pycache__'))
    herkunft = {}
    for skill, datei, _ in PHASEN:
        open(os.path.join(out, 'phasen', datei), 'w', encoding='utf-8').write(phase_text(skill))
        for o in ORDNER:
            q = os.path.join(HIER, skill, o)
            if not os.path.isdir(q):
                continue
            for d, _, fs in os.walk(q):
                for f in fs:
                    if f.endswith('.pyc') or f == '.DS_Store':
                        continue
                    rel = os.path.relpath(os.path.join(d, f), os.path.join(HIER, skill))
                    a, b = os.path.join(d, f), os.path.join(out, rel)
                    if rel in herkunft:  # gleiche Datei in zwei Skills (z. B. pruefe_paket.py) muss gleich sein
                        if open(a, 'rb').read() != open(b, 'rb').read():
                            sys.exit(f'FEHLER: {rel} unterscheidet sich zwischen {herkunft[rel]} und {skill}')
                        continue
                    os.makedirs(os.path.dirname(b), exist_ok=True)
                    shutil.copy(a, b)
                    herkunft[rel] = skill
    # Jeder in den Phasen genannte Pfad muss existieren
    fehlt = set()
    for _, datei, _ in PHASEN:
        t = open(os.path.join(out, 'phasen', datei), encoding='utf-8').read()
        for p in re.findall(r'`(?:<skill>/)?((?:referenz|vorlagen|vorlage|vorlagen-lehrkraft|scripts)/[^`\s]*)`', t):
            if not os.path.exists(os.path.join(out, p.rstrip('/'))):
                fehlt.add(f'{datei}: {p}')
    if fehlt:
        sys.exit('FEHLER: Pfade fehlen im Gesamt-Skill:\n  ' + '\n  '.join(sorted(fehlt)))
    print(out)


if __name__ == '__main__':
    bauen(sys.argv[1])
