# Anleitung: Lernpakete bauen mit dem Skill-Set

Diese Anleitung richtet sich an Lehrkräfte, die ein Lernpaket für ihren Unterricht bauen möchten und bisher wenig oder gar nicht mit KI-Werkzeugen über einfache Chats hinaus gearbeitet haben. Programmierkenntnisse brauchst du nicht.

## Worum es geht

Ein **Lernpaket** ist eine interaktive Lerneinheit zu einem Thema, die im Browser läuft: Die Schüler bedienen darin zum Beispiel ein nachgebautes Gerät oder prüfen ein Dokument und bekommen erklärende Rückmeldung. Am Ende steht eine ZIP-Datei, die du in deine Lernplattform hochlädst. Die Beispiele hier beziehen sich auf die ByCS-Lernplattform; das Paket läuft aber in jeder Lernplattform, die das Format SCORM 1.2 versteht, etwa in Moodle.

Der [Leitfaden](leitfaden-lernpakete.md) beschreibt, wie gute Lernpakete aussehen: 13 Prinzipien, von denen sieben Pflicht sind, eine feste Paketstruktur und eine Checkliste. Der Skill **`lernpaket-kompass`** ist eine Arbeitsanweisung für die KI Claude, die genau diesen Leitfaden umsetzt und dich Schritt für Schritt durch dein Lernpaket führt. Du musst den Leitfaden also nicht auswendig kennen: Claude stellt wenige Fragen, wendet die Prinzipien an und baut das Paket in einem einheitlichen Design.

Gebaut wird früh: Schon nach dem Konzept bekommst du eine erste Station zum Ausprobieren. Erst wenn die überzeugt, entsteht der Rest.

| Schritt | Du bringst ein | Du bekommst |
|---|---|---|
| 1 Planen | Thema, Klasse, drei typische Schülerfehler, Wahl der Simulation | Steckbrief, Lernziele, Konzept |
| 2 Prototyp | Rückmeldung nach dem Ausprobieren | eine Station mit zwei Fragen |
| 3 Drehbuch und Fragen | weitere typische Fehler, Prüfung der Fragen | Drehbuch, Fragenpool mit Feedback |
| 4 Ausbau | – | ZIP-Datei für die Lernplattform, mit Tafelbild |
| 5 Prüfen und erproben | Review, Kurztest mit drei bis fünf Schülern | Prüfbericht mit Ampel |
| 6 Auswerten | Bericht aus der Lernplattform (ohne Namen) | Auswertung und Änderungsvorschläge |

Am Ende jedes Schritts schlägt Claude den nächsten vor; ein „Ja, weiter“ genügt. Du kannst aber auch mitten einsteigen, z. B. nur ein vorhandenes Paket prüfen lassen.

**Wichtig:** Die KI kann fachliche Fehler machen. Jede Musterlösung und jede Frage prüfst du selbst. Schülerdaten gibst du nur ohne Namen weiter. Die Lernziele entscheidest du.

**Selbstüberprüfung statt Nachweis:** Jedes Paket endet mit einer Selbstüberprüfung. Sie zählt nicht, die Schüler können sie beliebig oft wiederholen, und ab 80 % sagt das Paket „das Thema sitzt“. Ob jemand ein Thema nachweislich beherrscht, entscheidet erst der Kompetenznachweis außerhalb des Pakets, z. B. beaufsichtigt in der Lernplattform.

## Einrichten (einmalig, etwa 10 Minuten)

### 1. Claude vorbereiten

Du brauchst ein Claude-Konto (claude.ai). Skills funktionieren in allen Tarifen, setzen aber voraus, dass Claude Code ausführen und Dateien erstellen darf.

- **Eigenes Konto:** In den Einstellungen (Settings) unter *Capabilities* die Code-Ausführung und Dateierstellung einschalten (in neueren Versionen „Create and edit files“).
- **Team- oder Schulkonto:** Das ist meist schon eingeschaltet. Falls nicht, hilft die Person, die das Konto verwaltet.

Die Menünamen können sich je nach Version und Sprache leicht unterscheiden. Die aktuelle Beschreibung steht in der [Hilfe von Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude).

### 2. Den Skill herunterladen

Lade die Datei **`skill_lernpaket-kompass.zip`** herunter, z. B. aus den [Releases](https://github.com/dennismarcbusch/lernpaket-kompass/releases) oder von der [Downloadseite](https://dennismarcbusch.github.io/lernpaket-kompass/).

**Nicht entpacken und nicht umbenennen.** Daneben liegen die fünf Schritte auch als einzelne Skills (`skill_lernpaket-planen.zip` usw.). Die brauchst du nicht; lade entweder den Gesamt-Skill oder die Einzel-Skills hoch, nicht beides.

### 3. Hochladen

So geht es:

1. In Claude **Customize → Skills** öffnen.
2. Auf **+** und dann **Create skill → Upload a skill** klicken.
3. Die ZIP-Datei auswählen.
4. Den Skill einschalten (Schalter rechts).

Danach steht `lernpaket-kompass` in deiner Skill-Liste. In Team-Konten kann die Verwaltung den Skill auch für alle bereitstellen; dann entfällt dieser Schritt.

### 4. Ein Projekt je Lernpaket (empfohlen)

Lege in Claude für jedes Lernpaket ein **Projekt** an (z. B. „Lernpaket Dreisatz“). Steckbrief, Drehbuch, Fragen und Pakete bleiben dann zusammen, und du kannst an mehreren Tagen weiterarbeiten.

## Arbeiten mit dem Skill-Set

Du schreibst in normaler Sprache. Wenn du „Lernpaket-Kompass“ dazuschreibst, nutzt Claude den Skill sicher; meist erkennt Claude ihn aber auch so.

### Schritt 1: Planen

> Ich möchte ein Lernpaket planen: Dreisatz für die Berufsintegrationsklasse, etwa 90 Minuten. Nutze den Lernpaket-Kompass.

Claude stellt dir wenige Fragen, höchstens zwei Runden: Was können die Schüler bisher nicht? Welche Fehler machen sie typischerweise? Mit welchen Dokumenten, Programmen oder Geräten arbeiten Fachleute bei diesem Thema? Für alles andere setzt Claude den üblichen Standard ein und zeigt ihn dir im Steckbrief; ändere, was nicht passt.

Dann schlägt Claude **Lernziele** vor („Ich kann …“) und hält fest, woran man das Können am Ende erkennt. Korrigiere, was nicht passt.

Erst danach kommt die **kreative Phase**: Claude schlägt dir eine **Simulation** vor – einen Arbeitsgegenstand aus dem Beruf, der das ganze Paket trägt, zum Beispiel ein nachgebautes Registerportal, eine Buchungsmaske oder ein Gerät, das sich zerlegen lässt. Bei abstrakten Inhalten wird es eine interaktive Illustration. Zu jedem Vorschlag siehst du eine Skizze des Bildschirms und warum die Lernplattform das allein nicht könnte. Ein Spiel schlägt Claude vor, wenn es zum Üben passt oder du es dir ausdrücklich wünschst; dann lernen die Schüler die Grundlagen im Spiel selbst, wie in SQL Island.

Am Ende hast du Steckbrief, Lernziel-Tabelle und Konzept.

### Schritt 2: Prototyp

> Bau den Prototyp.

Claude baut eine erste Station als Szene (bei einer durchgehenden Simulation: Kapitel 1 mit allen Schritten am Gegenstand; bei einem Spiel: Level 1, spielbar) in der Welt deines Pakets und gibt dir eine ZIP-Datei. Mit „Zeig’s mir“ führt das Paket das Lösungsbeispiel in der Szene vor. **So probierst du sie aus:** ZIP herunterladen, entpacken (Rechtsklick → „Alle extrahieren“), im entpackten Ordner `index.html` doppelklicken. Das Paket öffnet sich im Browser. Ein roter Kasten „Hinweis für Autor:innen“ zeigt im Prototyp, was noch fehlt; das ist normal.

Gib Rückmeldung wie einer Kollegin:

> Der Text in Station 1 ist zu lang. Das Beispiel sollte mit Euro statt Kilogramm rechnen. Auf dem Tablet ist der Knopf zu klein.

Trägt die Idee nicht, sag es jetzt: Ein neues Konzept kostet an dieser Stelle eine Stunde, später Tage.

### Schritt 3: Drehbuch und Fragen

> Der Prototyp passt. Schreib jetzt das Drehbuch.

Jetzt fragt Claude nach allen typischen Fehlern deiner Schüler. **Nimm dir dafür Zeit** – daraus entstehen gute Falschantworten und gutes Feedback. Du bekommst das Drehbuch für alle Stationen, danach den Fragenpool: eine gut lesbare Textdatei (`fragen.md`) mit allen Fragen, Antworten und Rückmeldungen, dazu eine Tabelle für den schnellen Überblick. **Geh jede Frage durch**: Stimmt die richtige Antwort? Sind die Falschantworten typische Fehler deiner Schüler? Ist das Feedback verständlich? Schreib Änderungen einfach hin („Frage F7: Option c ist zu leicht zu erkennen“).

### Schritt 4: Ausbau

> Bau jetzt das ganze Paket.

Claude testet das Paket automatisch (alle Aufgaben mit der Musterlösung lösbar, Szene ganz im Bild, Datenübergabe, Tablet-Ansicht) und gibt dir das fertige ZIP.

### Tafelbild für deinen Input

Zu jedem Paket gehören zwei bis vier **Tafelbild-Szenen**: dieselben Bilder wie im Paket, aber groß, ohne erklärenden Text und Schritt für Schritt. Sie sind ein Baustein für deinen Input. Der läuft auf deinen Folien; das Tafelbild kann den **Mittelteil** ersetzen, also Erklären und Beispiel. Einstieg, Üben und Sicherung bleiben auf den Folien. Ob du an dieser Stelle die Folie oder das Tafelbild nimmst, entscheidest du.

**So startest du das Tafelbild:** in den Folien einen Link auf `index.html#tafel` im entpackten Paketordner setzen (oder im Paket oben auf **Tafelbild** klicken und mit **E** die Erklärungen ausblenden). **F** schaltet auf Vollbild, die Pfeiltasten oder ein Presenter wechseln die Szenen, **Esc** führt zurück. Die Schüler finden dasselbe Tafelbild im Paket, dort mit Erklärungen. Es speichert nichts.

Einen eigenen Ablaufplan gibt es nicht mehr: Der Ablauf deines Inputs steht in den Notizen deiner Folien. Dafür bekommst du von Claude die Datei `tafelbild-notizen.md` mit allem, was du dort für den Mittelteil eintragen kannst: ab wo das Tafelbild übernimmt, Klicks und Tasten je Szene, eine Vorhersage-Frage an die Klasse, die erwartete Fehlvorstellung, die Kernaussage und der Rückweg zur Folie.

### Schritt 5: Prüfen und erproben

> Prüfe das Paket.

Du bekommst einen Prüfbericht mit Ampel und den drei wichtigsten Änderungen. Danach:

1. Eine zweite Lehrkraft schaut das Paket mit dem Prüfbericht an (Review).
2. **Drei bis fünf Schüler probieren es aus** – das gehört zu jedem Paket. Der Beobachtungsbogen (`erprobung.md`) hilft: Wo bleiben sie hängen, was überspringen sie, was suchen sie? Ohne Namen notieren.
3. Änderungen gibst du wieder an Claude („Ändere Station 2 so, dass …“).

### In die ByCS-Lernplattform hochladen

1. Im Kurs die Bearbeitung einschalten, **Aktivität hinzufügen → Lernpaket** wählen.
2. Die ZIP-Datei hochladen (nicht entpacken).
3. Empfohlene Einstellungen: Anzahl der Versuche **unbegrenzt**, Bewertungsmethode **„Höchste Bewertung“**, Anzeige **in neuem Fenster** (oder mindestens 1000 Pixel breit). Nutzt du den Aktivitätsabschluss, binde ihn an den Status **„Abgeschlossen“**, nicht an „Bestanden“: Das Paket meldet nie bestanden oder nicht bestanden.
4. Einmal mit einem Schülertestkonto durchspielen: Kommen Punktzahl und „abgeschlossen“ an?

Die Punktzahl der Selbstüberprüfung ist als Information gedacht, für die Schüler und für dich. Sie ist keine Note.

### Schritt 6: Nach dem Einsatz auswerten

1. In der Aktivität unter **Berichte** den Bericht mit den Interaktionen (Antworten je Frage) als CSV oder Excel herunterladen. **Namensspalten vorher löschen**, wenn möglich.
2. Die Datei an Claude geben:

> Werte diesen Export mit dem Lernpaket-Kompass aus. Das Paket ist im Projekt.

Du siehst, welche Fragen im ersten Versuch zu schwer oder zu leicht sind, bei welchem Lernziel die Klasse hängt und welche Falschantwort besonders oft gewählt wurde. Über die Änderungen entscheidest du; Claude setzt sie im Schritt Bauen um.

## Was in deiner Verantwortung bleibt

- **Fachliche Richtigkeit** aller Inhalte, Musterlösungen und Fragen.
- **Datenschutz:** keine Schülernamen an die KI; Exporte ohne Namen.
- **Entscheidungen** über Lernziele und Einsatz im Unterricht.
- **Review und Kurztest mit drei bis fünf Schülern** vor dem ersten Einsatz.

## Häufige Probleme

| Problem | Lösung |
|---|---|
| Claude nutzt den Skill nicht | „Lernpaket-Kompass“ in die Nachricht schreiben. Prüfen, ob er unter *Customize → Skills* eingeschaltet ist. |
| Hochladen des Skills klappt nicht | Die ZIP-Datei unverändert hochladen (nicht entpacken, nicht umbenennen). Bei Team-Konten kann das Hochladen gesperrt sein – die Verwaltung fragen. |
| Roter Kasten „Hinweis für Autor:innen“ im Paket | Im Prototyp normal. Im fertigen Paket Claude bitten: „Behebe die Hinweise im roten Kasten.“ |
| Claude schreibt, der Browser-Test fehle | Das Paket einmal selbst vollständig durchspielen, inklusive Selbstüberprüfung. |
| Das Paket zeigt in der Lernplattform eine leere Seite | Anzeige auf „Neues Fenster“ stellen; prüfen, ob die ZIP-Datei unverändert hochgeladen wurde. |
| Die Punktzahl kommt nicht an | Bewertungsmethode „Höchste Bewertung“ prüfen; die Selbstüberprüfung bis zum Ende abgeben (Knopf „Abgeben“). |
| Die Aktivität wird nie als erledigt angezeigt | Der Aktivitätsabschluss wartet vermutlich auf „Bestanden“. Auf den Status „Abgeschlossen“ umstellen. |
| Ein älteres Paket zeigt noch „Nachweis“ und „bestanden“ | Es stammt aus einer Vorlage vor Kompass 4.0. Claude bitten: „Heb das Paket auf die aktuelle Vorlage.“ |

## Begriffe

| Begriff | Bedeutung |
|---|---|
| Lernpaket | interaktive Lerneinheit als ZIP-Datei für eine Lernplattform |
| SCORM 1.2 | Standardformat für Lernpakete; regelt, wie Paket und Lernplattform Fortschritt und Punkte austauschen |
| Skill | Arbeitsanweisung mit Vorlagen und Werkzeugen, die du in Claude hochlädst |
| Station | ein Lernschritt im Paket |
| Szene | der Gegenstand einer Station, mit dem die Schüler arbeiten (Gerät, Dokument, Gespräch …) |
| Prototyp | erste Fassung mit nur einer Station, zum Ausprobieren der Idee |
| Drehbuch | Plan für alle Stationen: was die Schüler jeweils tun und sehen |
| Fragenpool | alle Fragen des Pakets mit richtigen Antworten, typischen Falschantworten und Rückmeldung |
| Selbstüberprüfung | Fragen am Ende des Pakets, die nicht zählen |
| Kompetenznachweis | Prüfung außerhalb des Pakets, mit der jemand ein Thema nachweist |
| Tafelbild | Ansicht des Pakets für den Beamer |

## Ohne Claude oder mit anderen Werkzeugen

Das Format der Skills (Ordner mit einer Datei `SKILL.md`) ist offen; auch andere KI-Werkzeuge können solche Skills lesen. Planen und Fragen erstellen klappt notfalls in jedem Chatbot: Lade dazu `prinzipien.md` (zwei Seiten) und die Vorlagen aus dem Skill-Ordner hoch und bitte darum, danach zu arbeiten. Für Bauen und Prüfen braucht das Werkzeug die Möglichkeit, Programme auszuführen.

**Für Fortgeschrittene (Claude Code):** `skills/baue-skills.sh` ausführen und dann entweder den Gesamt-Skill `dist/build/lernpaket-kompass/` oder die fünf Einzel-Skill-Ordner aus `skills/` nach `~/.claude/skills/` kopieren (bzw. im Repository unter `.claude/skills/` ablegen).
