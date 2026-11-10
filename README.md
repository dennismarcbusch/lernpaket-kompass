# Lernpaket-Kompass

**Leitfaden für interaktive Lernpakete** – wissenschaftlich fundiert, praxisnah und für alle Fächer.

Der Lernpaket-Kompass hilft Lehrkräften, interaktive Lernpakete (SCORM 1.2, z. B. für die ByCS-Lernplattform) einheitlich und nach dem Stand der Lernforschung zu bauen, auch ohne Medienpädagogik-, Programmier- oder KI-Vorkenntnisse. Neue Pakete sind standardmäßig für selbstgesteuertes Lernen (SeGeL) geeignet und lassen sich trotzdem im klassischen Unterricht einsetzen; ein interaktives Tafelbild für den Mittelteil des Inputs gehört dazu.

Aktueller Stand: **Kompass 4.0** (Datei [`VERSION`](VERSION); eine Nummer für Leitfaden, Skill-Set und Vorlage).

| | |
|---|---|
| 📖 **Leitfaden** | [docs/leitfaden-lernpakete.md](docs/leitfaden-lernpakete.md) – Forschungslage (u. a. Kerres, Mayer, 4C/ID, Simulationen und Lernspiele), 13 Prinzipien (sieben davon Pflicht) mit Grundlage und Aufwand, Paketstruktur, Entwicklungsprozess, technische Standards und Qualitätscheckliste |
| 🧰 **Skill-Set für Claude** | [skills/](skills) – der Gesamt-Skill `lernpaket-kompass` führt durch den ganzen Weg (Planen, Prototyp, Drehbuch und Fragen, Ausbau, Prüfen, Auswerten); dazu fünf Einzel-Skills, Paketvorlage und automatisches Prüfskript |
| 🚀 **Einstieg für Kolleginnen und Kollegen** | [docs/skill-set-anleitung.md](docs/skill-set-anleitung.md) – Einrichten in etwa 10 Minuten, Arbeitsschritte mit Beispiel-Prompts |
| 🎮 **Beispiele** | Eine Simulation zum Handelsregister: [„Partner-Check“](skills/lernpaket-bauen/beispiele/simulation-handelsregister.js) (Registerportal und Prüfliste, Simulationsmodus). Zwei Spiele zum Handelsregister: [„Stempel drauf!“](skills/lernpaket-bauen/beispiele/spiel-stempel-drauf.js) (Schalter-Simulator am Registergericht) und [„Firmendex“](skills/lernpaket-bauen/beispiele/spiel-firmendex.js) (Sammelspiel); dazu die Vorlage „Bits & Bytes“ und eine [Szenen-Station](skills/lernpaket-bauen/beispiele/wirtschaft-handelsregister.js) |
| ⬇️ **Download** | `skill_lernpaket-kompass.zip` zum Hochladen in Claude unter [Releases](../../releases) und auf der [Downloadseite](https://dennismarcbusch.github.io/lernpaket-kompass/) |

## Das Skill-Set

Kolleginnen und Kollegen laden nur einen Skill hoch: **`lernpaket-kompass`**. Er erkennt, wo die Lehrkraft gerade steht, liest jeweils nur die Anleitung des aktuellen Schritts und schlägt am Ende den nächsten vor. Gebaut wird früh: Der Prototyp einer Station entsteht gleich nach dem Konzept, das Drehbuch erst danach. Er wird beim Bauen automatisch aus den fünf Einzel-Skills zusammengesetzt, die es für Fortgeschrittene auch einzeln gibt:

| Skill | Phase | Ergebnis |
|---|---|---|
| `lernpaket-planen` | Klären, Zielen, Erfinden; nach dem Prototyp: Entwerfen | Steckbrief, Lernziel-Tabelle, Konzept (Simulation, Spiel nur begründet); später Drehbuch |
| `fragenpool-erstellen` | Entwerfen | Fragen mit erklärendem Feedback und Prüftabelle |
| `lernpaket-bauen` | Prototyp bauen, Ausbauen | SCORM-1.2-ZIP aus der Kompass-Vorlage (erst Prototyp, dann Ausbau) |
| `lernpaket-pruefen` | Erproben | Prüfbericht mit Ampel (Checkliste, Prinzipien, Technik-Test); dazu der Kurztest mit Schülern |
| `lernpaket-auswerten` | Auswerten | Auswertung des Berichtsexports (ohne Namen) mit Änderungsvorschlägen |

**Handeln am Gegenstand** (Prinzip P12): Wenn die Lernziele stehen, schlägt Claude einen Arbeitsgegenstand vor, der das ganze Paket trägt – wie das Terminal in „Shell Yeah!“, das PC-Gehäuse in „Plug & Pray“ oder der Lageplan in „Strukturierte Verkabelung“. Bei abstrakten Inhalten wird es eine interaktive Illustration. Ein Spiel gibt es zum Üben, wo das Thema es hergibt, oder durchgehend, wenn keine Simulation sinnvoll ist oder die Lehrkraft es wünscht; dann vermittelt das Spiel die Grundlagen selbst, wie SQL Island. Was die Lernplattform mit Test oder H5P genauso könnte, ist kein Lernpaket.

**Jede Station ist eine Szene zum Anfassen:** Die Schüler bedienen einen nachgebauten Rechner, prüfen ein Dokument, führen ein Gespräch, sortieren, stellen ein Gerät ein. Ein Baukasten liefert die Bausteine, jedes Paket bekommt eine eigene Welt (Farben, Kulisse, illustrierte Figuren), auf Wunsch mit Spielrahmen und Missionskarte. Das Lösungsbeispiel wird mit „Zeig’s mir“ in der Szene vorgeführt. Die Szene ist auf einem Schullaptop (1366 × 768) ganz zu sehen, und hervorgehoben ist immer nur der nächste sinnvolle Schritt.

Jedes Paket aus der Vorlage bringt außerdem eine Startseite als Überblick (Szene, Lernpfad mit Ziel-Etiketten, ein Knopf), Vorab-Fragen mit Abkürzung für Lernende mit Vorwissen, Kurz-Checks, Einschätzung je Lernziel, gestufte Tipps, eine Selbstüberprüfung, die nicht zählt (ab 80 % „sitzt das Thema“; der Kompetenznachweis liegt außerhalb des Pakets), Auswertung je Lernziel, Merkblatt, Tafelbild und die SCORM-Anbindung schon mit. Paket-IDs haben die Form `<präfix>-<name>`; das Präfix steht für Projekt oder Fach (z. B. `ping-` für die IT-Pakete).

## Woher es kommt

Der Kompass ist im Projekt [PING](https://github.com/dennismarcbusch/PING) entstanden, interaktiven SCORM-Paketen für die Fachinformatik an der Staatlichen Berufsschule Lichtenfels. Die PING-Pakete dienen im Leitfaden als Beispiele; der Kompass selbst ist fächerübergreifend gedacht.

## Aufbau des Repos

```
VERSION                     Versionsnummer des Kompass (gilt für Leitfaden, Skill-Set und Vorlage)
docs/
  leitfaden-lernpakete.md   der Leitfaden (Markdown-Fassung)
  skill-set-anleitung.md    Anleitung zum Skill-Set für Kolleginnen und Kollegen
skills/
  _gemeinsam/               gemeinsame Referenz (Prinzipien kurz, Belege, Auszüge aus dem Leitfaden, Fragenformat, Prüfskript)
  lernpaket-*/, fragenpool-erstellen/   die fünf Einzel-Skills
  _gesamt/SKILL.md          Einstieg des Gesamt-Skills lernpaket-kompass
  gesamt_bauen.py           setzt den Gesamt-Skill aus den Einzel-Skills zusammen
  lernpaket-bauen/vorlage/  Kompass-Vorlage (Engine, Stil, Beispielinhalt, Manifest, Tafelbild)
  baue-skills.sh            verteilt die Referenz und baut dist/skill_<name>.zip, auch den Gesamt-Skill
  leitfaden_sync.py         übernimmt Änderungen am Leitfaden in die Skill-Referenz
  pruefe_stand.py           prüft, dass überall dieselbe Versionsnummer steht und keine überholten Begriffe übrig sind
```

## Pflege

- **Leitfaden geändert?** `python3 skills/leitfaden_sync.py --export <markdown-export>` und danach `skills/baue-skills.sh` (Details in [skills/README.md](skills/README.md)). Achtung: Der Export ersetzt `docs/leitfaden-lernpakete.md` ganz; was nur dort geändert wurde, muss vorher ins Dokument.
- **Neue Version?** Zahl in `VERSION` ändern, `python3 skills/pruefe_stand.py --setze` trägt sie überall ein; `skills/baue-skills.sh` prüft den Stand vor dem Bauen.
- **Vorlage geändert?** `python3 skills/_gemeinsam/scripts/pruefe_paket.py skills/lernpaket-bauen/vorlage` muss komplett grün sein (Voraussetzung: `pip install playwright && playwright install chromium`).
- **Veröffentlichen:** Tag mit der Versionsnummer setzen und pushen (`v` + Inhalt von `VERSION`, z. B. `v4.0`). Die GitHub Action baut die Skill-ZIPs, hängt sie an ein Release und stellt sie auf GitHub Pages (Voraussetzung: *Settings → Pages → Source: GitHub Actions*).

ZIPs werden nicht eingecheckt (`dist/` ist ignoriert).

## Mitmachen

Fehler, Wünsche und Erfahrungen aus dem Einsatz gern als [Issue](../../issues).

## Lizenz

Noch nicht festgelegt, bis dahin gilt das Urheberrecht des Autors.
