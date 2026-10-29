# Lernpaket-Kompass – Leitfaden für interaktive Lernpakete

Leitfaden (`docs/`) und Skill-Set für Claude (`skills/`) zum Bauen von SCORM-1.2-Lernpaketen, fächerübergreifend. Entstanden im Projekt PING (github.com/dennismarcbusch/PING), das die Vorlage weiter nutzt.

## Konventionen
- Der Gesamt-Skill `lernpaket-kompass` entsteht beim Bauen aus `skills/_gesamt/SKILL.md` und den fünf Einzel-Skills (`gesamt_bauen.py`) und wird nicht eingecheckt. Inhaltliche Änderungen gehören in die Einzel-Skills.
- `skills/*/referenz/` und die Kopien von `pruefe_paket.py` in den Skills sind generiert: nur `skills/_gemeinsam/` ändern, dann `skills/baue-skills.sh`.
- Der Leitfaden wird als Dokument gepflegt; Änderungen per `skills/leitfaden_sync.py --export <export>` übernehmen.
- Nach Änderungen an der Vorlage (`engine.js`, `baukasten.js`, `tafel.js`, Dateien in `css/`) muss `pruefe_paket.py skills/lernpaket-bauen/vorlage` komplett grün sein; danach `paket.py zip` auf die Vorlage, damit das Manifest alle Dateien listet.
- Jede Station der Vorlage und der Beispiele ist eine Szene zum Anfassen (P14); Textbudget und Interaktivitätsprüfung nicht aufweichen.
- Paket-IDs: `<präfix>-<name>`, Präfix frei je Projekt oder Fach.
- Skill-Beschreibungen höchstens 200 Zeichen, keine spitzen Klammern.
- Keine personenbezogenen Daten von Schülern; ZIPs nicht einchecken.
