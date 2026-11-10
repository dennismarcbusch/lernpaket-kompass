# Skill-Set zum Lernpaket-Kompass

Der Gesamt-Skill `lernpaket-kompass` und fünf Einzel-Skills für Claude, die den [Lernpaket-Kompass](../docs/leitfaden-lernpakete.md) umsetzen. Kolleginnen und Kollegen laden nur den Gesamt-Skill hoch: Er enthält alle fünf Skills und führt durch den ganzen Weg. Die fünf Skills decken die sieben Phasen des Entwicklungsprozesses ab (Leitfaden Teil C1); alle greifen auf dieselbe Referenz zurück, lesen aber nur, was ihr Teil braucht. **Anleitung für Kolleginnen und Kollegen:** [docs/skill-set-anleitung.md](../docs/skill-set-anleitung.md).

| Skill | Phase | Ergebnis |
|---|---|---|
| [`lernpaket-planen`](lernpaket-planen/SKILL.md) | 1–3 Klären, Zielen, Erfinden; nach dem Prototyp 5 Entwerfen | Steckbrief, Lernziel-Tabelle, Konzept (Simulation, Spiel nur begründet); später Drehbuch |
| [`fragenpool-erstellen`](fragenpool-erstellen/SKILL.md) | 5 | Fragen im Vorlagenformat + Prüftabelle für die Lehrkraft |
| [`lernpaket-bauen`](lernpaket-bauen/SKILL.md) | 4 Prototyp bauen, 5 Ausbauen | SCORM-1.2-ZIP aus der Kompass-Vorlage (erst Prototyp) |
| [`lernpaket-pruefen`](lernpaket-pruefen/SKILL.md) | 6 Erproben | Prüfbericht mit Ampel (Checkliste C6, Prüffragen des Kerns, Technik- und Interaktivitätstest) |
| [`lernpaket-auswerten`](lernpaket-auswerten/SKILL.md) | 7 Auswerten | Auswertung des Berichtsexports (ohne Namen) mit Änderungsvorschlägen |

## Aufbau

```
skills/
  _gemeinsam/              Quelle der gemeinsamen Referenz (wird in jeden Skill kopiert)
    prinzipien.md          13 Prinzipien, Kurzfassung: So geht's und Prüffrage (Kern und Ausbau)
    belege.md              Warum und Belege je Prinzip; wird nur bei Rückfragen geladen
    szenen.md              Form wählen (Simulation, Illustration, Spiel; SQL-Island-Prinzip, Plattform-Probe), Simulations- und Spielmodus, Szenen-Katalog, Paketwelt, Textbudget (von Hand gepflegt)
    prozess-und-struktur.md, gestaltung.md, technik.md, checkliste.md   aus Leitfaden C1–C6 (erzeugt, nicht von Hand ändern)
    fragenformat.md        Format von js/inhalt.js (Fragen, Stationen, Szenen, Baukasten)
    scripts/pruefe_paket.py  automatischer Paket-Test (nachgebauter SCORM-Player, Playwright)
  lernpaket-*/ , fragenpool-erstellen/   die fünf Einzel-Skills; referenz/ ist eine Kopie, nicht von Hand ändern
  _gesamt/SKILL.md         Einstieg des Gesamt-Skills (der Weg in sieben Schritten, Ordnerübersicht)
  gesamt_bauen.py          setzt dist/build/lernpaket-kompass/ zusammen: SKILL.md, phasen/1-planen.md … (SKILL.md der
                           Einzel-Skills ohne Kopf, Skill-Namen als Phasen), referenz/, vorlagen/, vorlage/, scripts/
  lernpaket-bauen/vorlage/ Kompass-Vorlage: index.html, js/engine.js (Bühne, Welt, Spielrahmen, Simulations- und Spielmodus), js/baukasten.js (Szenen-
                           Bausteine), js/inhalt.js (Beispiel „Bits & Bytes“), css/ (stil, baukasten, Schriften mit Lizenz),
                           imsmanifest.xml, Tafelbild: js/tafel.js, css/tafel.css
  lernpaket-bauen/beispiele/ Simulation „Partner-Check“ im Simulationsmodus (simulation-handelsregister.js),
                           zwei Spiele zum Handelsregister im Spielmodus (spiel-stempel-drauf.js, spiel-firmendex.js) und eine
                           Szenen-Station aus der Wirtschaft (Rechner, Portal, Dokument, Gespräch, Spielrahmen)
  lernpaket-bauen/vorlagen-lehrkraft/  Hinweise zum Tafelbild für die Notizen der Folien, Beobachtungsbogen für die Erprobung (nicht im Paket)
  pruefe_stand.py          prüft Versionsnummer und überholte Begriffe (--setze trägt VERSION überall ein)
  baue-skills.sh           prüft den Stand, verteilt die Referenz und baut dist/skill_<name>.zip und dist/skill_lernpaket-kompass.zip
```

## Pflege

- **Leitfaden geändert?** Markdown-Export des Dokuments holen und `python3 skills/leitfaden_sync.py --export <export>` ausführen: Das ersetzt `docs/leitfaden-lernpakete.md` und erzeugt die Auszüge in `_gemeinsam/` (Prozess, Gestaltung, Technik, Checkliste) neu. Ohne `--export` werden nur die Auszüge aus dem Markdown neu erzeugt. `prinzipien.md`, `belege.md`, `szenen.md` und `fragenformat.md` von Hand nachziehen, dann `skills/baue-skills.sh`.
- **Neue Version?** `VERSION` ändern, dann `python3 skills/pruefe_stand.py --setze`. Leitfaden, Skills und Vorlage tragen immer dieselbe Nummer.
- **Vorlage geändert?** Nach jeder Änderung an `engine.js`, `baukasten.js`, `tafel.js`, `index.html` oder einer Datei in `css/`: `python3 skills/_gemeinsam/scripts/pruefe_paket.py skills/lernpaket-bauen/vorlage` muss komplett grün sein. Die Engine ist für alle Pakete gleich; paketspezifisches gehört in `inhalt.js`. Auch die Beispiele prüfen: in eine Kopie der Vorlage als `js/inhalt.js` legen und das Prüfskript darauf laufen lassen.
- **Veröffentlichen:** Der Release-Workflow baut die Skill-ZIPs mit und legt sie ins Release und auf die Pages-Seite.
- Der ältere Skill `bycs-lernmodul` (HTML-Schnipsel für Textseiten, ohne SCORM, liegt im PING-Repository unter `tools/`) ist in `lernpaket-bauen` aufgegangen: Design-Tokens und Komponenten stecken jetzt in `vorlage/css/stil.css`.

## Vorlage testen

```bash
python3 skills/_gemeinsam/scripts/pruefe_paket.py skills/lernpaket-bauen/vorlage --bilder /tmp/shots
python3 skills/_gemeinsam/scripts/pruefe_paket.py <paketordner-oder-zip>   # auch für ältere Pakete, z. B. aus PING
```

Voraussetzung für den Browser-Teil: `pip install playwright && playwright install chromium`.
