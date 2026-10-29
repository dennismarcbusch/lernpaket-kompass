# Anleitung: Lernpakete bauen mit dem Skill-Set

Diese Anleitung richtet sich an Kolleginnen und Kollegen, die ein Lernpaket für die ByCS-Lernplattform bauen möchten und bisher wenig oder gar nicht mit KI-Werkzeugen über einfache Chats hinaus gearbeitet haben. Programmierkenntnisse brauchst du nicht.

## Worum es geht

Der [Leitfaden](leitfaden-lernpakete.md) beschreibt, wie gute Lernpakete aussehen: 14 Prinzipien, eine feste Paketstruktur und eine Checkliste. Der Skill **`lernpaket-kompass`** ist eine Arbeitsanweisung für die KI Claude, die genau diesen Leitfaden umsetzt und dich in fünf Schritten durch dein Lernpaket führt. Du musst den Leitfaden also nicht auswendig kennen: Claude stellt die richtigen Fragen, wendet die Prinzipien an und baut das Paket in unserem einheitlichen Design.

| Schritt | Du bringst ein | Du bekommst |
|---|---|---|
| 1 Planen | Thema, Klasse, typische Schülerfehler | Steckbrief, Lernziele, Drehbuch |
| 2 Fragen | Prüfung der Fragen | Fragenpool mit Feedback |
| 3 Bauen | Rückmeldung zum Prototyp | ZIP-Datei für die Lernplattform |
| 4 Prüfen | Paket | Prüfbericht mit Ampel |
| 5 Auswerten | Bericht aus der Lernplattform (ohne Namen) | Auswertung und Änderungsvorschläge |

Am Ende jedes Schritts schlägt Claude den nächsten vor; ein „Ja, weiter“ genügt. Du kannst aber auch mitten einsteigen, z. B. nur ein vorhandenes Paket prüfen lassen.

**Wichtig:** Die KI kann fachliche Fehler machen. Jede Musterlösung und jede Frage prüfst du selbst. Schülerdaten gibst du nur ohne Namen weiter. Lernziele und Bewertung entscheidest du.

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

Claude stellt dir in mehreren Runden Fragen: Was können die Schüler bisher nicht? Welche Fehler machen sie typischerweise? Welche Situation aus Beruf oder Alltag passt? Mit welchen Dokumenten, Programmen oder Geräten arbeiten sie dort? Daraus entstehen die **Szenen**: In jeder Station bewegen die Schüler etwas, zum Beispiel ein Formular ausfüllen, ein Dokument prüfen, im nachgebauten Portal recherchieren oder ein Kundengespräch führen. Auf Wunsch gibt es einen **Spielrahmen** mit Missionskarte. **Nimm dir für die typischen Fehler Zeit** – daraus entstehen gute Falschantworten und gutes Feedback.

Danach schlägt Claude Lernziele vor („Ich kann …“) und legt fest, wie das Können im Nachweis geprüft wird. Korrigiere, was nicht passt. Am Ende bekommst du Steckbrief, Lernziel-Nachweis-Tabelle und Drehbuch.

### Schritt 2: Fragen

> Ja, weiter: Erstelle jetzt den Fragenpool zu den Lernzielen aus dem Drehbuch.

Du bekommst die Fragen zusätzlich als Tabelle. **Geh jede Frage durch**: Stimmt die richtige Antwort? Sind die Falschantworten typische Fehler deiner Schüler? Ist das Feedback verständlich? Schreib Änderungen einfach hin („Frage F7: Option c ist zu leicht zu erkennen“).

### Schritt 3: Prototyp und Ausbau

> Bau einen Prototyp mit Station 1.

Claude baut eine erste Station als Szene in der Welt deines Pakets (eigene Farben, Kulisse, Figuren) und gibt dir eine ZIP-Datei. Mit „Zeig’s mir“ führt das Paket das Lösungsbeispiel in der Szene vor. **So probierst du sie aus:** ZIP herunterladen, entpacken (Rechtsklick → „Alle extrahieren“), im entpackten Ordner `index.html` doppelklicken. Das Paket öffnet sich im Browser. Ein roter Kasten „Hinweis für Autor:innen“ zeigt im Prototyp, was noch fehlt; das ist normal.

Gib Rückmeldung wie einer Kollegin:

> Der Text in Station 1 ist zu lang. Das Beispiel sollte mit Euro statt Kilogramm rechnen. Auf dem Tablet ist der Knopf zu klein.

Wenn der Prototyp passt:

> Bau jetzt das ganze Paket.

Claude testet das Paket automatisch (alle Aufgaben mit der Musterlösung lösbar, Datenübergabe, Tablet-Ansicht) und gibt dir das fertige ZIP.

### Optional: Input mit Tafelbild

Lässt sich dein Thema gut gemeinsam vorführen (eine Simulation, ein Ablauf, ein Vergleich), kannst du zum Paket einen **freiwilligen Input** von etwa 20 Minuten anbieten. Sag das schon beim Planen:

> Ich möchte zum Paket auch einen freiwilligen Input mit Tafelbild anbieten.

Claude plant dann im Drehbuch ein paar Szenen und baut sie nach den Stationen als **Tafelbild** ins Paket: groß, ohne erklärenden Text, Schritt für Schritt. Du erklärst mündlich. Dazu bekommst du einen **Ablaufplan** mit Impulsfragen und erwarteten Schülerantworten.

**So startest du den Input:** Den entpackten Paketordner öffnen und in der Adresszeile des Browsers hinter `index.html` den Zusatz `#tafel` anhängen (oder im Paket oben auf **Tafelbild** klicken und mit **E** die Erklärungen ausblenden). **F** schaltet auf Vollbild, die Pfeiltasten oder ein Presenter wechseln die Szenen. Die Schüler finden dasselbe Tafelbild im Paket, dort mit Erklärungen. Das Tafelbild speichert nichts und zählt nicht für die Bewertung.

Nicht jedes Paket braucht einen Input – ohne Tafelbild funktioniert alles wie gewohnt.

### Schritt 4: Prüfen

> Prüfe das Paket.

Du bekommst einen Prüfbericht mit Ampel und den drei wichtigsten Änderungen. Danach:

1. Eine zweite Lehrkraft schaut das Paket mit dem Prüfbericht an (Review).
2. Drei bis fünf Schüler probieren es aus. Beobachte, wo sie hängen bleiben.
3. Änderungen gibst du wieder an Claude („Ändere Station 2 so, dass …“).

### Schritt 5: In die ByCS-Lernplattform hochladen

1. Im Kurs die Bearbeitung einschalten, **Aktivität hinzufügen → Lernpaket** wählen.
2. Die ZIP-Datei hochladen (nicht entpacken).
3. Empfohlene Einstellungen: Bewertungsmethode **„Höchste Bewertung“**, Anzahl der Versuche **unbegrenzt**, Anzeige **in neuem Fenster** (oder mindestens 1000 Pixel breit).
4. Einmal mit einem Schülertestkonto durchspielen: Kommt die Punktzahl in der Bewertungsübersicht an?

Bestanden ist ein Paket ab 80 %. Der Nachweis ist keine Prüfung im rechtlichen Sinne; die Schüler können ihn beliebig oft wiederholen, das beste Ergebnis zählt.

### Schritt 6: Nach dem Einsatz auswerten

1. In der Aktivität unter **Berichte** den Bericht mit den Interaktionen (Antworten je Frage) als CSV oder Excel herunterladen. **Namensspalten vorher löschen**, wenn möglich.
2. Die Datei an Claude geben:

> Werte diesen Export mit dem Lernpaket-Kompass aus. Das Paket ist im Projekt.

Du siehst, welche Fragen zu schwer oder zu leicht sind, bei welchem Lernziel die Klasse hängt und welche Falschantwort besonders oft gewählt wurde. Über die Änderungen entscheidest du; Claude setzt sie im Schritt Bauen um.

## Was in deiner Verantwortung bleibt

- **Fachliche Richtigkeit** aller Inhalte, Musterlösungen und Fragen.
- **Datenschutz:** keine Schülernamen an die KI; Exporte ohne Namen.
- **Entscheidungen** über Lernziele, Bewertung und Einsatz im Unterricht.
- **Review und Schülertest** vor dem ersten Einsatz.

## Häufige Probleme

| Problem | Lösung |
|---|---|
| Claude nutzt den Skill nicht | „Lernpaket-Kompass“ in die Nachricht schreiben. Prüfen, ob er unter *Customize → Skills* eingeschaltet ist. |
| Hochladen des Skills klappt nicht | Die ZIP-Datei unverändert hochladen (nicht entpacken, nicht umbenennen). Bei Team-Konten kann das Hochladen gesperrt sein – die Verwaltung fragen. |
| Roter Kasten „Hinweis für Autor:innen“ im Paket | Im Prototyp normal. Im fertigen Paket Claude bitten: „Behebe die Hinweise im roten Kasten.“ |
| Claude schreibt, der Browser-Test fehle | Das Paket einmal selbst vollständig durchspielen, inklusive Nachweis. |
| Das Paket zeigt in der Lernplattform eine leere Seite | Anzeige auf „Neues Fenster“ stellen; prüfen, ob die ZIP-Datei unverändert hochgeladen wurde. |
| Die Punktzahl kommt nicht an | Bewertungsmethode „Höchste Bewertung“ prüfen; den Nachweis bis zum Ende abgeben (Knopf „Abgeben“). |

## Ohne Claude oder mit anderen Werkzeugen

Das Format der Skills (Ordner mit einer Datei `SKILL.md`) ist offen; auch andere KI-Werkzeuge können solche Skills lesen. Planen und Fragen erstellen klappt notfalls in jedem Chatbot: Lade dazu `prinzipien.md` und die Vorlagen aus dem Skill-Ordner hoch und bitte darum, danach zu arbeiten. Für Bauen und Prüfen braucht das Werkzeug die Möglichkeit, Programme auszuführen.

**Für Fortgeschrittene (Claude Code):** `skills/baue-skills.sh` ausführen und dann entweder den Gesamt-Skill `dist/build/lernpaket-kompass/` oder die fünf Einzel-Skill-Ordner aus `skills/` nach `~/.claude/skills/` kopieren (bzw. im Repository unter `.claude/skills/` ablegen).
