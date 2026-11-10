# Lernpaket-Kompass – Leitfaden für interaktive Lernpakete

Leitfaden (`docs/`) und Skill-Set für Claude (`skills/`) zum Bauen von SCORM-1.2-Lernpaketen, fächerübergreifend. Entstanden im Projekt PING (github.com/dennismarcbusch/PING), das die Vorlage weiter nutzt.

## Konventionen
- Der Gesamt-Skill `lernpaket-kompass` entsteht beim Bauen aus `skills/_gesamt/SKILL.md` und den fünf Einzel-Skills (`gesamt_bauen.py`) und wird nicht eingecheckt. Inhaltliche Änderungen gehören in die Einzel-Skills.
- `skills/*/referenz/` und die Kopien von `pruefe_paket.py` in den Skills sind generiert: nur `skills/_gemeinsam/` ändern, dann `skills/baue-skills.sh`.
- Der Leitfaden wird als Dokument gepflegt; Änderungen per `skills/leitfaden_sync.py --export <export>` übernehmen. Der Export ersetzt `docs/leitfaden-lernpakete.md` ganz: Was nur im Markdown geändert wurde, vorher ins Dokument übertragen.
- Eine Versionsnummer für alles (Datei `VERSION`): `skills/pruefe_stand.py --setze` trägt sie in Leitfaden, Skills und Vorlage ein; `baue-skills.sh` bricht ab, wenn der Stand nicht stimmt.
- Nach Änderungen an der Vorlage (`engine.js`, `baukasten.js`, `tafel.js`, `index.html`, Dateien in `css/`) muss `pruefe_paket.py skills/lernpaket-bauen/vorlage` komplett grün sein; danach `paket.py zip` auf die Vorlage, damit das Manifest alle Dateien listet.
- Jede Station der Vorlage und der Beispiele ist eine Szene zum Anfassen (P12) und auf 1366 × 768 ganz zu sehen; Textbudget und Interaktivitätsprüfung nicht aufweichen.
- Je Ansicht höchstens ein hervorgehobener Knopf (`primaer`); „Weiter“ erst nach erledigter Aufgabe. Eine Kopfzeile, keine zusätzlichen Leisten über der Szene.
- Der Kern bleibt klein (sieben Prinzipien, P3–P8 und P12). Eine neue Regel wird erst Muss, wenn sie mit Schülern erprobt ist; was die Vorlage von selbst liefert, kommt ins Prüfskript, nicht in die Checkliste.
- Das Paketende heißt Selbstüberprüfung und zählt nicht (Status `completed`, kein masteryscore); der Kompetenznachweis liegt außerhalb des Pakets.
- Das Tafelbild ersetzt nur den Mittelteil des Inputs (zwei bis vier Szenen); kein eigener Ablaufplan, kein Hinweis auf der Startseite.
- Die Startseite ist nur Überblick (Szene, Lernpfad mit Ziel-Etiketten, ein Knopf, keine Eingaben); Lernziel als Satz, Vorab-Frage, neue Begriffe und Einschätzung gehören an die Station. Startseitenprüfung im Prüfskript nicht aufweichen.
- Paket-IDs: `<präfix>-<name>`, Präfix frei je Projekt oder Fach.
- Skill-Beschreibungen höchstens 200 Zeichen, keine spitzen Klammern.
- Keine personenbezogenen Daten von Schülern; ZIPs nicht einchecken.
