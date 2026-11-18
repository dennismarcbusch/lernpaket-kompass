#!/usr/bin/env python3
"""Erzeugt die Auszüge aus dem Leitfaden für die Skills.

  python3 skills/leitfaden_sync.py

Der Leitfaden wird nur im Repository gepflegt: docs/leitfaden-lernpakete.md ist die Quelle
und wird direkt bearbeitet. Dieses Skript erzeugt daraus die Referenzdateien in
skills/_gemeinsam/ neu (prozess-und-struktur.md, gestaltung.md, technik.md, checkliste.md).
prinzipien.md, belege.md, szenen.md und fragenformat.md werden von Hand gepflegt.
skills/baue-skills.sh ruft dieses Skript am Anfang selbst auf.

Bis zum 12. Nov. 2026 wurde der Leitfaden als Dokument außerhalb des Repositorys gepflegt
und mit --export übernommen. Diesen Weg gibt es nicht mehr.
"""
import os, re

HIER = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HIER)
MD = os.path.join(REPO, 'docs', 'leitfaden-lernpakete.md')
G = os.path.join(HIER, '_gemeinsam')
QUELLE = 'Quelle: Lernpaket-Kompass – Leitfaden für interaktive Lernpakete, docs/leitfaden-lernpakete.md im Repository lernpaket-kompass.\n\n'


def referenz_erzeugen():
    md = open(MD, encoding='utf-8').read()

    def teil(start, ende):
        a = md.index('## ' + start)
        return md[a:md.index('## ' + ende, a + 3)].strip()
    c1 = teil('Teil C1', 'Teil C2')
    # Die Skills enthalten keine Bilder: aus dem Ablaufdiagramm wird eine Textzeile (der Alternativtext).
    c1, n = re.subn(r'!\[Ablaufdiagramm: (.*?)\]\(bilder/entwicklungsprozess\.svg\)\n\nDurchgezogene Pfeile[^\n]*', r'Ablauf: \1.', c1)
    assert n == 1, 'Ablaufdiagramm in Teil C1 nicht gefunden'
    dateien = {
        'prozess-und-struktur.md': ('# Entwicklungsprozess und Paketstruktur', [c1, teil('Teil C2', 'Teil C3')]),
        'gestaltung.md': ('# Gestaltungsregeln, SeGeL und klassischer Unterricht', [teil('Teil C3', 'Teil C4'), teil('Teil C4', 'Teil C5')]),
        'technik.md': ('# Technische Mindeststandards', [teil('Teil C5', 'Teil C6')]),
        'checkliste.md': ('# Qualitätscheckliste', [teil('Teil C6', 'Teil C7')]),
    }
    for name, (titel, teile) in dateien.items():
        open(os.path.join(G, name), 'w', encoding='utf-8').write(titel + '\n\n' + QUELLE + '\n\n'.join(teile) + '\n')
        print('skills/_gemeinsam/' + name + ' erzeugt.')


if __name__ == '__main__':
    referenz_erzeugen()
