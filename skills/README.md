# Skill-Set zum Lernpaket-Kompass

Der Gesamt-Skill `lernpaket-kompass` und fünf Einzel-Skills für Claude, die den [Lernpaket-Kompass](../docs/leitfaden-lernpakete.md) umsetzen. Kolleginnen und Kollegen laden nur den Gesamt-Skill hoch: Er enthält alle fünf Phasen und führt der Reihe nach hindurch. Jede Phase des Entwicklungsprozesses (Leitfaden Teil C1) hat einen Skill; alle greifen auf dieselbe Referenz zurück. **Anleitung für Kolleginnen und Kollegen:** [docs/skill-set-anleitung.md](../docs/skill-set-anleitung.md).

| Skill | Phase | Ergebnis |
|---|---|---|
| [`lernpaket-planen`](lernpaket-planen/SKILL.md) | 1–3 Klären, Zielen, Entwerfen | Steckbrief, Lernziel-Nachweis-Tabelle, Drehbuch |
| [`fragenpool-erstellen`](fragenpool-erstellen/SKILL.md) | 2–3 | Fragen im Vorlagenformat + Prüftabelle für die Lehrkraft |
| [`lernpaket-bauen`](lernpaket-bauen/SKILL.md) | 4 Bauen | SCORM-1.2-ZIP aus der Kompass-Vorlage (erst Prototyp) |
| [`lernpaket-pruefen`](lernpaket-pruefen/SKILL.md) | 5 Erproben | Prüfbericht mit Ampel (Checkliste C6, P1–P14, Technik- und Interaktivitätstest) |
| [`lernpaket-auswerten`](lernpaket-auswerten/SKILL.md) | 6 Auswerten | Auswertung des Berichtsexports (ohne Namen) mit Änderungsvorschlägen |

## Aufbau

```
skills/
  _gemeinsam/              Quelle der gemeinsamen Referenz (wird in jeden Skill kopiert)
    prinzipien.md          14 Prinzipien mit So geht's, Warum, Prüffrage, Belegen
    szenen.md              Szenen-Katalog für alle Fächer, Spielrahmen, Paketwelt, Textbudget (von Hand gepflegt)
    prozess-und-struktur.md, gestaltung.md, technik.md, checkliste.md   aus Leitfaden C1–C6
    fragenformat.md        Format von js/inhalt.js (Fragen, Stationen, Szenen, Baukasten)
    scripts/pruefe_paket.py  automatischer Paket-Test (nachgebauter SCORM-Player, Playwright)
  lernpaket-*/ , fragenpool-erstellen/   die fünf Einzel-Skills; referenz/ ist eine Kopie, nicht von Hand ändern
  _gesamt/SKILL.md         Einstieg des Gesamt-Skills (Phasenwahl, Führung durch die Phasen, Ordnerübersicht)
  gesamt_bauen.py          setzt dist/build/lernpaket-kompass/ zusammen: SKILL.md, phasen/1-planen.md … (SKILL.md der
                           Einzel-Skills ohne Kopf, Skill-Namen als Phasen), referenz/, vorlagen/, vorlage/, scripts/
  lernpaket-bauen/vorlage/ Kompass-Vorlage 2: index.html, js/engine.js (Bühne, Welt, Spielrahmen), js/baukasten.js (Szenen-
                           Bausteine), js/inhalt.js (Beispiel „Bits & Bytes“), css/ (stil, baukasten, Schriften mit Lizenz),
                           imsmanifest.xml, optionales Tafelbild: js/tafel.js, css/tafel.css
  lernpaket-bauen/beispiele/ zweites Beispiel aus der Wirtschaft (Rechner, Portal, Dokument, Gespräch, Spielrahmen)
  lernpaket-bauen/vorlagen-lehrkraft/  Ablaufplan für einen Input mit Tafelbild (nicht im Paket)
  baue-skills.sh           verteilt die Referenz und baut dist/skill_<name>.zip und dist/skill_lernpaket-kompass.zip
```

## Pflege

- **Leitfaden geändert?** Markdown-Export des Dokuments holen und `python3 skills/leitfaden_sync.py --export <export>` ausführen: Das aktualisiert `docs/leitfaden-lernpakete.md` und erzeugt die Auszüge in `_gemeinsam/` (Prozess, Gestaltung, Technik, Checkliste) neu. `prinzipien.md` und `fragenformat.md` von Hand nachziehen, dann `skills/baue-skills.sh`.
- **Vorlage geändert?** Nach jeder Änderung an `engine.js`, `baukasten.js`, `tafel.js` oder einer Datei in `css/`: `python3 skills/_gemeinsam/scripts/pruefe_paket.py skills/lernpaket-bauen/vorlage` muss komplett grün sein. Die Engine ist für alle Pakete gleich; paketspezifisches gehört in `inhalt.js`.
- **Veröffentlichen:** Der Release-Workflow baut die Skill-ZIPs mit und legt sie ins Release und auf die Pages-Seite.
- Der ältere Skill `bycs-lernmodul` (HTML-Schnipsel für Textseiten, ohne SCORM, liegt im PING-Repository unter `tools/`) ist in `lernpaket-bauen` aufgegangen: Design-Tokens und Komponenten stecken jetzt in `vorlage/css/stil.css`.

## Vorlage testen

```bash
python3 skills/_gemeinsam/scripts/pruefe_paket.py skills/lernpaket-bauen/vorlage --bilder /tmp/shots
python3 skills/_gemeinsam/scripts/pruefe_paket.py <paketordner-oder-zip>   # auch für ältere Pakete, z. B. aus PING
```

Voraussetzung für den Browser-Teil: `pip install playwright && playwright install chromium`.
