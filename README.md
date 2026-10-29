# Lernpaket-Kompass

**Leitfaden für interaktive Lernpakete** – wissenschaftlich fundiert, praxisnah und für alle Fächer.

Der Lernpaket-Kompass hilft Lehrkräften, interaktive Lernpakete (SCORM 1.2, z. B. für die ByCS-Lernplattform) einheitlich und nach dem Stand der Lernforschung zu bauen, auch ohne Medienpädagogik-, Programmier- oder KI-Vorkenntnisse. Neue Pakete sind standardmäßig für selbstgesteuertes Lernen (SeGeL) geeignet und lassen sich trotzdem im klassischen Unterricht einsetzen, auf Wunsch mit interaktivem Tafelbild für einen kurzen Input.

| | |
|---|---|
| 📖 **Leitfaden** | [docs/leitfaden-lernpakete.md](docs/leitfaden-lernpakete.md) – Forschungslage (u. a. Kerres, Mayer, 4C/ID, Simulationen und Lernspiele), 14 Prinzipien mit Aufwand, Paketstruktur, Entwicklungsprozess, technische Standards und Qualitätscheckliste |
| 🧰 **Skill-Set für Claude** | [skills/](skills) – der Gesamt-Skill `lernpaket-kompass` führt durch alle fünf Phasen (Planen, Fragen erstellen, Bauen, Prüfen, Auswerten); dazu die fünf Phasen als Einzel-Skills, Paketvorlage und automatisches Prüfskript |
| 🚀 **Einstieg für Kolleginnen und Kollegen** | [docs/skill-set-anleitung.md](docs/skill-set-anleitung.md) – Einrichten in etwa 10 Minuten, Arbeitsschritte mit Beispiel-Prompts |
| 🎮 **Beispiele** | Zwei Spiele zum Handelsregister: [„Stempel drauf!“](skills/lernpaket-bauen/beispiele/spiel-stempel-drauf.js) (Schalter-Simulator am Registergericht) und [„Firmendex“](skills/lernpaket-bauen/beispiele/spiel-firmendex.js) (Sammelspiel); dazu die Vorlage „Bits & Bytes“ und eine [Szenen-Station](skills/lernpaket-bauen/beispiele/wirtschaft-handelsregister.js) |
| ⬇️ **Download** | `skill_lernpaket-kompass.zip` zum Hochladen in Claude unter [Releases](../../releases) und auf der [Downloadseite](https://dennismarcbusch.github.io/lernpaket-kompass/) |

## Das Skill-Set

Kolleginnen und Kollegen laden nur einen Skill hoch: **`lernpaket-kompass`**. Er erkennt, wo die Lehrkraft gerade steht, liest jeweils nur die Anleitung der aktuellen Phase und schlägt am Ende jeder Phase die nächste vor. Er wird beim Bauen automatisch aus den fünf Einzel-Skills zusammengesetzt, die es für Fortgeschrittene auch einzeln gibt:

| Skill | Phase | Ergebnis |
|---|---|---|
| `lernpaket-planen` | Klären, Erfinden, Zielen, Entwerfen | Steckbrief, drei Spielideen zur Wahl, Lernziel-Nachweis-Tabelle, Drehbuch |
| `fragenpool-erstellen` | Zielen, Entwerfen | Fragen mit erklärendem Feedback und Prüftabelle |
| `lernpaket-bauen` | Bauen | SCORM-1.2-ZIP aus der Kompass-Vorlage (erst Prototyp, dann Ausbau) |
| `lernpaket-pruefen` | Erproben | Prüfbericht mit Ampel (Checkliste, Prinzipien, Technik-Test) |
| `lernpaket-auswerten` | Auswerten | Auswertung des Berichtsexports (ohne Namen) mit Änderungsvorschlägen |

**Erst die Spielidee** (Prinzip P12): Nach einem kurzen Interview schlägt Claude drei Spielideen vor, in denen der Lernstoff die Spielregel ist – etwa einen Schalter-Simulator oder ein Sammelspiel. Was die Lernplattform mit Test oder H5P genauso könnte, ist kein Lernpaket. Die Lehrkraft wählt, die Vorlage hat dafür einen Spielmodus (ein Spiel über alle Stationen, Üben und Nachweis mit derselben Mechanik).

**Jede Station ist eine Szene zum Anfassen** (Prinzip P14): Die Schüler bedienen einen nachgebauten Rechner, prüfen ein Dokument, führen ein Gespräch, sortieren, stellen ein Gerät ein. Ein Baukasten liefert die Bausteine, jedes Paket bekommt eine eigene Welt (Farben, Kulisse, illustrierte Figuren), auf Wunsch mit Spielrahmen und Missionskarte. Das Lösungsbeispiel wird mit „Zeig’s mir“ in der Szene vorgeführt.

Jedes Paket aus der Vorlage bringt außerdem Selbsteinschätzung, Kurz-Checks, gestufte Tipps, Kompetenznachweis (bestanden ab 80 %), Auswertung je Lernziel, Merkblatt und die SCORM-Anbindung schon mit. Paket-IDs haben die Form `<präfix>-<name>`; das Präfix steht für Projekt oder Fach (z. B. `ping-` für die IT-Pakete).

## Woher es kommt

Der Kompass ist im Projekt [PING](https://github.com/dennismarcbusch/PING) entstanden, interaktiven SCORM-Paketen für die Fachinformatik an der Staatlichen Berufsschule Lichtenfels. Die PING-Pakete dienen im Leitfaden als Beispiele; der Kompass selbst ist fächerübergreifend gedacht.

## Aufbau des Repos

```
docs/
  leitfaden-lernpakete.md   der Leitfaden (Markdown-Fassung)
  skill-set-anleitung.md    Anleitung zum Skill-Set für Kolleginnen und Kollegen
skills/
  _gemeinsam/               gemeinsame Referenz (Prinzipien, Auszüge aus dem Leitfaden, Fragenformat, Prüfskript)
  lernpaket-*/, fragenpool-erstellen/   die fünf Einzel-Skills (Phasen)
  _gesamt/SKILL.md          Einstieg des Gesamt-Skills lernpaket-kompass
  gesamt_bauen.py           setzt den Gesamt-Skill aus den Einzel-Skills zusammen
  lernpaket-bauen/vorlage/  Kompass-Vorlage (Engine, Stil, Beispielinhalt, Manifest, optionales Tafelbild)
  baue-skills.sh            verteilt die Referenz und baut dist/skill_<name>.zip, auch den Gesamt-Skill
  leitfaden_sync.py         übernimmt Änderungen am Leitfaden in die Skill-Referenz
```

## Pflege

- **Leitfaden geändert?** `python3 skills/leitfaden_sync.py --export <markdown-export>` und danach `skills/baue-skills.sh` (Details in [skills/README.md](skills/README.md)).
- **Vorlage geändert?** `python3 skills/_gemeinsam/scripts/pruefe_paket.py skills/lernpaket-bauen/vorlage` muss komplett grün sein (Voraussetzung: `pip install playwright && playwright install chromium`).
- **Veröffentlichen:** neuen Tag setzen und pushen (z. B. `v1.1`). Die GitHub Action baut die Skill-ZIPs, hängt sie an ein Release und stellt sie auf GitHub Pages (Voraussetzung: *Settings → Pages → Source: GitHub Actions*).

ZIPs werden nicht eingecheckt (`dist/` ist ignoriert).

## Mitmachen

Fehler, Wünsche und Erfahrungen aus dem Einsatz gern als [Issue](../../issues).

## Lizenz

Noch nicht festgelegt, bis dahin gilt das Urheberrecht des Autors.
