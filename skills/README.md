# Das Skill-Set: Aufbau, Bauen und Pflege

Diese Seite richtet sich an alle, die am Lernpaket-Kompass selbst arbeiten möchten: den Skill ändern, die Vorlage verbessern oder eine neue Version veröffentlichen. Wer nur ein Lernpaket bauen will, braucht sie nicht und liest die [Anleitung](../docs/skill-set-anleitung.md).

## Was ein Skill ist

Ein Skill ist ein Ordner mit einer Datei `SKILL.md` und allem, was Claude für eine bestimmte Aufgabe braucht: Arbeitsanweisung, Vorlagen, Nachschlagetexte und Skripte. Man lädt ihn als ZIP-Datei in Claude hoch. Claude liest ihn, sobald eine Aufgabe dazu passt.

Der Kompass besteht aus fünf Einzel-Skills, einem je Arbeitsphase. Lehrkräfte laden nur den **Gesamt-Skill `lernpaket-kompass`** hoch. Er wird beim Bauen aus den fünf Einzel-Skills zusammengesetzt, erkennt, in welcher Phase die Lehrkraft steht, und liest jeweils nur die Anleitung dieser Phase.

| Skill | Phase im Leitfaden (Teil C1) | Ergebnis |
|---|---|---|
| [`lernpaket-planen`](lernpaket-planen/SKILL.md) | 1–3 Klären, Zielen, Erfinden; nach dem Prototyp 5 Entwerfen | Steckbrief, Lernziel-Tabelle, Konzept (Simulation, Spiel nur begründet); später das Drehbuch |
| [`fragenpool-erstellen`](fragenpool-erstellen/SKILL.md) | 5 Entwerfen | Fragen als Markdown-Datei (`quelle/fragen.md`), die die Lehrkraft direkt prüft |
| [`lernpaket-bauen`](lernpaket-bauen/SKILL.md) | 4 Prototyp bauen, 5 Ausbauen | Lernpaket als ZIP (SCORM 1.2) aus der Vorlage, erst als Prototyp |
| [`lernpaket-pruefen`](lernpaket-pruefen/SKILL.md) | 6 Erproben | Prüfbericht mit Ampel (Checkliste C6, Prüffragen zu den Pflichtprinzipien, automatischer Test im Browser) |
| [`lernpaket-auswerten`](lernpaket-auswerten/SKILL.md) | 7 Auswerten | Auswertung des Berichts aus der Lernplattform (ohne Namen) mit Änderungsvorschlägen |

Alle fünf greifen auf dieselben Nachschlagetexte zurück (`_gemeinsam/`), lesen aber nur, was ihre Phase braucht.

## Voraussetzungen

- `bash`, `zip` und Python 3 zum Bauen
- für den automatischen Test im Browser zusätzlich Playwright mit Chromium:

  ```bash
  pip install playwright && playwright install chromium
  ```

## Bauen und testen

Alle Befehle im Wurzelverzeichnis des Repositorys ausführen.

```bash
skills/baue-skills.sh
```

Das Skript prüft zuerst den Stand (überall dieselbe Versionsnummer, keine überholten Begriffe), kopiert die gemeinsamen Nachschlagetexte in jeden Skill und legt die ZIP-Dateien in `dist/` ab: `skill_lernpaket-kompass.zip` (Gesamt-Skill) und je eine Datei für die fünf Einzel-Skills. `dist/` wird nicht eingecheckt.

```bash
python3 skills/_gemeinsam/scripts/pruefe_paket.py skills/lernpaket-bauen/vorlage
```

Das Prüfskript öffnet das Beispielpaket der Vorlage in einem Browser, spielt es mit der Musterlösung durch und meldet jeden Prüfpunkt als grün, gelb oder rot. Es simuliert dabei eine Lernplattform und prüft auch, ob Fortschritt und Punktzahl richtig übergeben werden. Mit `--bilder <ordner>` legt es Bildschirmfotos ab. Dasselbe Skript prüft jedes andere Paket, als Ordner oder als ZIP, auch ältere:

```bash
python3 skills/_gemeinsam/scripts/pruefe_paket.py <paketordner-oder-zip>
```

## Aufbau

```
skills/
  _gemeinsam/              Quelle der gemeinsamen Nachschlagetexte (wird beim Bauen in jeden Skill kopiert)
    prinzipien.md          die 13 Prinzipien in Kurzform: „So geht's“ und Prüffrage
    belege.md              Begründung und Belege je Prinzip; Claude liest sie nur bei Rückfragen
    szenen.md              welche Form passt (Simulation, Illustration, Spiel), Katalog der Szenen, Paketwelt, Textbudget
    prozess-und-struktur.md, gestaltung.md, technik.md, checkliste.md
                           Auszüge aus dem Leitfaden (Teile C1–C6); werden erzeugt, nicht von Hand ändern
    fragenformat.md        wie Fragen und Paketinhalt geschrieben werden (quelle/fragen.md, quelle/paket.js)
    scripts/pruefe_paket.py  automatischer Test eines Pakets im Browser
    scripts/quellen.py     liest quelle/fragen.md und setzt daraus js/inhalt.js zusammen
  lernpaket-planen/, fragenpool-erstellen/, lernpaket-bauen/, lernpaket-pruefen/, lernpaket-auswerten/
                           die fünf Einzel-Skills; der Unterordner referenz/ ist eine Kopie von _gemeinsam/
  lernpaket-bauen/vorlage/ die Paketvorlage mit dem Beispielpaket „Bits & Bytes“
    index.html, js/engine.js, js/baukasten.js, js/tafel.js, css/   Technik, für alle Pakete gleich
    quelle/paket.js, quelle/fragen.md                               Inhalt des Beispielpakets
    js/inhalt.js                                                    wird aus quelle/ gebaut
    imsmanifest.xml                                                 Inhaltsverzeichnis für die Lernplattform
  lernpaket-bauen/scripts/paket.py   legt ein neues Paket an (neu), baut js/inhalt.js (bauen), packt das ZIP (zip)
  lernpaket-bauen/beispiele/         eine Simulation, zwei Spiele und eine einzelne Station zum Handelsregister;
                                     die Fragen dazu stehen jeweils in <name>.fragen.md
  lernpaket-bauen/vorlagen-lehrkraft/  Hinweise zum Tafelbild und Beobachtungsbogen für die Erprobung
  lernpaket-planen/vorlagen/         Steckbrief, Lernziel-Tabelle, Konzept, Drehbuch
  _gesamt/SKILL.md         Einstieg des Gesamt-Skills
  gesamt_bauen.py          setzt den Gesamt-Skill aus den Einzel-Skills zusammen
  leitfaden_sync.py        übernimmt Änderungen am Leitfaden in die Auszüge
  pruefe_stand.py          prüft Versionsnummer und überholte Begriffe
  baue-skills.sh           prüft, verteilt und packt (siehe oben)
```

## Regeln beim Ändern

- **Erzeugte Dateien nicht von Hand ändern.** Dazu gehören `skills/*/referenz/`, die Kopien von `pruefe_paket.py` und `quellen.py` in den Einzel-Skills, die vier Auszüge aus dem Leitfaden in `_gemeinsam/` und `js/inhalt.js` der Vorlage. Geändert wird die Quelle, danach läuft `skills/baue-skills.sh`.
- **Inhalt gehört in `quelle/`.** `quelle/paket.js` enthält Texte, Stationen und Szenen, `quelle/fragen.md` die Fragen als Markdown. `paket.py bauen` erzeugt daraus `js/inhalt.js`. Der Ordner `quelle/` kommt nicht ins ZIP. Ältere Pakete mit handgeschriebener `js/inhalt.js` und ohne `quelle/` bleiben gültig.
- **Die Technik ist für alle Pakete gleich.** `engine.js`, `baukasten.js`, `tafel.js`, `index.html` und die Dateien in `css/` werden nur in der Vorlage geändert, nie in einem einzelnen Paket.
- **Der Kern bleibt klein.** Sieben der 13 Prinzipien sind Pflicht. Eine neue Regel wird erst Pflicht, wenn sie mit Schülern erprobt ist. Was die Vorlage von selbst liefert, kommt ins Prüfskript, nicht in die Checkliste.
- **Keine personenbezogenen Daten von Schülern** im Repository, und keine ZIP-Dateien.

## Pflege

**Der Leitfaden wurde geändert.** Der Leitfaden wird als Dokument außerhalb des Repositorys gepflegt; `docs/leitfaden-lernpakete.md` ist dessen Export. Den Markdown-Export des Dokuments holen und übernehmen:

```bash
python3 skills/leitfaden_sync.py --export <export>
skills/baue-skills.sh
```

Der Export ersetzt `docs/leitfaden-lernpakete.md` vollständig und erzeugt die vier Auszüge in `_gemeinsam/` neu. Was nur in der Markdown-Datei geändert wurde, geht dabei verloren und muss vorher ins Dokument. Ohne `--export` werden nur die Auszüge neu erzeugt. `prinzipien.md`, `belege.md`, `szenen.md` und `fragenformat.md` sind von Hand geschrieben und müssen von Hand angepasst werden.

**Eine neue Version.** Die Zahl in `VERSION` ändern, dann:

```bash
python3 skills/pruefe_stand.py --setze
```

Das schreibt die Nummer in Leitfaden, Skills, Vorlage und README. Dort steht immer dieselbe Nummer.

**Die Vorlage wurde geändert.** Nach jeder Änderung an der Technik der Vorlage muss das Prüfskript komplett grün sein. Danach `paket.py zip` auf die Vorlage ausführen, damit das Manifest alle Dateien nennt:

```bash
python3 skills/_gemeinsam/scripts/pruefe_paket.py skills/lernpaket-bauen/vorlage
python3 skills/lernpaket-bauen/scripts/paket.py zip skills/lernpaket-bauen/vorlage
```

Nach Änderungen am Inhalt des Beispielpakets (`vorlage/quelle/`) neu bauen, sonst meldet `pruefe_stand.py` einen Fehler:

```bash
python3 skills/lernpaket-bauen/scripts/paket.py bauen skills/lernpaket-bauen/vorlage
```

Auch die Beispiele prüfen: in eine Kopie der Vorlage `<name>.js` als `quelle/paket.js` und `<name>.fragen.md` als `quelle/fragen.md` legen, bauen und das Prüfskript darauf laufen lassen.

**Veröffentlichen.** Einen Tag mit der Versionsnummer setzen und pushen, also `v` und der Inhalt von `VERSION`, zum Beispiel `v4.0`. Eine GitHub Action baut dann die ZIP-Dateien, hängt sie an ein Release und stellt sie auf die [Downloadseite](https://dennismarcbusch.github.io/lernpaket-kompass/). Voraussetzung in den Einstellungen des Repositorys: *Settings → Pages → Source: GitHub Actions*.

## Den Skill in Claude Code nutzen

Wer mit Claude Code arbeitet, baut die Skills und kopiert entweder den Gesamt-Skill `dist/build/lernpaket-kompass/` oder die fünf Einzel-Skill-Ordner aus `skills/` nach `~/.claude/skills/` (oder in ein Projekt unter `.claude/skills/`).

## Früherer Skill

Der ältere Skill `bycs-lernmodul` (HTML-Schnipsel für Textseiten, ohne SCORM; liegt im PING-Repository unter `tools/`) ist in `lernpaket-bauen` aufgegangen. Seine Farben und Bausteine stecken jetzt in `vorlage/css/stil.css`.
