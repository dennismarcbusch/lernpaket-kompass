---
name: lernpaket-pruefen
description: Prüft ein SCORM-Lernpaket gegen Checkliste und Prinzipien des Lernpaket-Kompasses – Technik-Test, Lösbarkeit, Didaktik, Bedienung, Barrierefreiheit. Ergebnis ist ein Prüfbericht mit Ampel.
---

# Lernpaket prüfen (Phase 6 des Leitfadens)

Du prüfst ein fertiges oder fast fertiges Lernpaket (ZIP oder Ordner) und schreibst einen Prüfbericht, mit dem die Lehrkraft und eine zweite Lehrkraft (Review) arbeiten können. Du prüfst Pakete aus der Kompass-Vorlage genauso wie ältere oder fremde SCORM-Pakete.

**Lies vor dem Start:** `referenz/checkliste.md` (Qualitätscheckliste, Teil C6) und `referenz/prinzipien.md` (Prüffragen). Nur bei Bedarf: `referenz/szenen.md` (Textbudget, echt in der Funktion), `referenz/gestaltung.md` (Abschnitt „Orientierung“), `referenz/technik.md`, `referenz/belege.md` (wenn die Lehrkraft fragt, warum eine Regel gilt).

**Rückfragen zum Anklicken:** Hat eine Frage an die Lehrkraft absehbare Antworten (Klasse, Dauer, Einsatzform, Ja/Nein, Wahl zwischen deinen Vorschlägen, nächster Schritt), stellst du sie mit dem Werkzeug für Rückfragen mit Antwortknöpfen, sofern deine Umgebung eines anbietet: zwei bis vier Optionen, dein Vorschlag zuerst, eine eigene Antwort bleibt immer möglich. Mehrere solche Fragen bündelst du in einem Aufruf. Frei schreiben lässt du die Lehrkraft nur, wo sie Inhalte liefert (Thema, typische Schülerfehler, fachliche Korrekturen, Rückmeldung zum Prototyp). Gibt es kein solches Werkzeug, nummerierst du die Optionen, damit eine Zahl als Antwort genügt.

`<skill>` steht für den Ordner, in dem diese SKILL.md liegt.

## Ablauf

### 1. Automatischer Test

```bash
python3 <skill>/scripts/pruefe_paket.py <paket.zip oder ordner> --bilder <ordner> --bericht technik.json
```

- Bei Paketen aus der Vorlage (erkennbar an `js/engine.js` bzw. `window.LERNPAKET`) spielt das Skript auf 1366 × 768 alle Stationen, Übungen und die Selbstüberprüfung mit der Musterlösung durch. Es prüft, was die Vorlage von selbst liefern soll: Szene ganz zu sehen, höchstens ein hervorgehobener Knopf, „Weiter“ erst nach der Aufgabe, Einschätzung einmal je Lernziel, Datenübergabe (Ergebnis als Information, Status „completed“, nie bestanden oder nicht bestanden, kein masteryscore), Wiedereinstieg, Tafelbild. **Den ersten Teil der Checkliste („Erfüllt die Vorlage von selbst“) prüfst du deshalb nicht von Hand; rote Punkte des Skripts dort übernimmst du in den Bericht.**
- Meldet das Skript eine ältere Vorlage (Engine vor 4.0): Das Paket ist nicht falsch gebaut, aber nicht auf dem Stand des Leitfadens. Nenne im Bericht den kurzen Weg (aktuelle Vorlage übernehmen, siehe `lernpaket-bauen`, „Ältere Pakete heben“) getrennt von inhaltlichen Befunden.
- Bei anderen Paketen prüft es Format, Datenübergabe im Code, Laden, Anmeldung, Darstellung und Konsolenfehler. Dann spielst du das Paket zusätzlich selbst durch (Playwright: Start, eine Station, eine Übung, Abschlusstest abgeben) oder bittest die Lehrkraft darum.
- Fehlt Playwright: `pip install playwright && playwright install chromium` versuchen; sonst `--ohne-browser` und im Bericht vermerken, was nicht getestet wurde.

### 2. Bildschirme ansehen

Sieh dir die Screenshots an und mache für jede Ansicht den **Fünf-Sekunden-Test**: Was ist hier zu tun? Achte auf: Szene ganz im Bild, im Arbeitsbereich nur, was zur Aufgabe gehört, Auftrag oben, Beschriftung im Bild statt Legende, Feedback an der Antwort, nichts abgeschnitten auf Tablet-Breite. Zähle auf dem Bildschirm der ersten Station, wie viele verschiedene Aufforderungen gleichzeitig zu sehen sind; mehr als drei (Auftrag, Vorab-Frage oder Szene, ein Knopf) nennst du als Befund.

### 3. Inhalt lesen

Lies die Quellen `quelle/paket.js` und `quelle/fragen.md` (bei Paketen ohne `quelle/`: `js/inhalt.js`, bei einem ZIP ebenfalls `js/inhalt.js`; dazu die Texte in `index.html`) und beantworte die Prüffragen des **Kerns** und die Muss-Punkte der Checkliste mit Befund und Fundstelle:

- **P12 (zuerst):** Ist die Form begründet (A Simulation, B interaktive Illustration, C Spiel nur zum Üben, D Lernspiel nur begründet)? Steckt der Lernstoff in den Regeln des Gegenstands bzw. des Spiels (wer den Stoff nicht kann, kommt nicht weiter, nicht erst in einem Quiz danach)? Bei einem Spiel: Vermittelt es die Grundlagen selbst? Besteht das Paket die Plattform-Probe – oder ließe es sich mit Test, H5P oder Lückentext genauso umsetzen? Dann ist es rot, auch wenn alles andere stimmt. Hat jede Station (jedes Level) eine Szene, in der die Lernenden etwas bewegen? Verhält sie sich wie im Beruf, und reagiert sie auf Fehler? Ein Arbeitsblatt mit Klick-Quiz ist rot. Nicht bemängeln: dass die Szene schlichter aussieht als das echte Programm.
- **P3:** Vorführung vor jedem neuen Aufgabentyp, mit Begründung je Schritt und Frage zum Selbsterklären, überspringbar?
- **P4:** Beginnt jede Station und Übung mit einem Auftrag? Hat jede Station eine Vorab-Frage zum Kern der Station (zugleich Leitfrage), die schwer zu erraten ist? Hat jede Übung drei gestufte Tipps?
- **P5:** Kurz-Check an jeder Station mit 2–3 Fragen, mindestens eine je Lernziel der Station?
- **P6:** Hat jede Falschantwort ein eigenes Feedback, das eine Fehlvorstellung anspricht? Stichprobe von mindestens zehn Fragen, bei kleinen Pools alle.
- **P7:** Textbudget eingehalten (Station etwa 90 Wörter, Simulationsschritt etwa 60, Startseite etwa 40)? Fachbegriffe dort eingeführt, wo sie gebraucht werden? Deko im Arbeitsbereich?
- **P8:** Lernziele in Schülersprache; jedes mit mindestens zwei Fragen oder Prüfpunkten in der Selbstüberprüfung; nichts geprüft, was nicht geübt wurde.

Danach kurz den **Ausbau** (Soll): durchgehende Leitsituation und wechselnde Situationen (P1, P2), Steckbriefe (P9), Wiederholungsfragen ab Station 3 und Selbsttest-Fragen (P10), Reflexionsfragen und Aufträge zum Mitdenken (P11), Merkblatt (P13), Glossar, eigene Welt. Offene Soll-Punkte sind Vorschläge, keine Mängel.

### 4. Barrierefreiheit (Stichprobe)

Mit Playwright: Lässt sich eine Station mit der Tabulatortaste und Enter bedienen? Haben Bilder bzw. SVGs eine Beschreibung (`aria-label`, `alt`)? Wird Information nur über Farbe oder nur über Ton vermittelt? Haben Ton und Video Untertitel oder ein Transkript? Bleibt die Darstellung bei 200 % Zoom nutzbar?

Sprache und Deutsch als Zweitsprache: Gibt es ein Glossar, werden neue Begriffe an der Station vorgestellt, an der sie gebraucht werden, sind die Sätze kurz? Lange Schachtelsätze und unerklärte Fachwörter nennst du mit Fundstelle.

### 4a. Tafelbild

Zwei bis vier Tafelbild-Szenen gehören zu jedem Paket (Soll); fehlen sie, steht das als Soll-Punkt im Bericht. Erkennbar an `tafel:` in `quelle/paket.js` bzw. `js/inhalt.js`. Das Skript schaltet alle Szenen und Werkzeuge durch, prüft Konsolenfehler, `index.html#tafel` und dass nichts an die Lernplattform geschrieben wird. Du prüfst zusätzlich anhand der Screenshots `tafel-<n>.png` und des Inhalts:

- **Textfrei:** Steht auf der Bühne ein erklärender Satz? Erlaubt sind Beschriftungen, Zahlen, Symbole.
- **Lesbar am Beamer:** Schrift und Linien groß genug für die letzte Reihe?
- **Inhalt ⊆ Paket:** Hat jede Szene eine `station`, die es gibt, und kommt dort dasselbe vor? Zeigt das Tafelbild etwas, das im Paket fehlt?
- **Vorhersage möglich:** Lassen sich Ergebnisse erst auslösen bzw. aufdecken, nachdem die Klasse geschätzt hat?
- **Umfang:** zwei bis vier Szenen (das Tafelbild ersetzt nur den Mittelteil des Inputs).
- **Hinweise für die Notizen der Folien** liegen bei (`lehrer/tafelbild-notizen.md`); Zahlen darin stichprobenartig mit Code gegen das Paket prüfen. Ein alter Ablaufplan (`input-ablauf.md`) ist überholt: Den Ablauf hält die Lehrkraft in den Notizen ihrer Folien fest.

Befunde zum Tafelbild sind Soll-Punkte, außer das Tafelbild schreibt Daten oder erzeugt Fehler – das ist rot.

### 5. Fachliche Punkte und Erprobung

Du darfst Auffälligkeiten melden (z. B. eine Rechnung, die nicht stimmt, eine veraltete Angabe), **hakst den Punkt „Fachlich geprüft“ aber nie selbst ab**. Das ist Aufgabe einer Fachlehrkraft. Rechnungen und Musterlösungen prüfst du mit Code nach.

Frage nach der **Erprobung mit drei bis fünf Schülern** (Muss): Liegt ein Beobachtungsbogen vor (ohne Namen)? Dann fasse zusammen, was mehrfach hakte, und prüfe, ob es geändert wurde. Fehlt die Erprobung, ist das der wichtigste offene Punkt im Bericht – wichtiger als jeder Soll-Punkt.

## Prüfbericht (Ergebnis)

Als Markdown-Datei `pruefbericht-<name>.md`:

1. **Kopf:** Paket, Version, Kompass-Version der Vorlage (steht in der `index.html` als `generator`), Datum, geprüfte Quelle, was nicht geprüft werden konnte.
2. **Gesamtampel:** 🔴 wenn das Skript Rot zeigt oder ein Punkt des Kerns nicht erfüllt ist, 🟡 wenn nur Soll-Punkte offen sind, die Erprobung noch fehlt oder Punkte des Kerns nicht prüfbar waren, 🟢 sonst.
3. **Die drei wichtigsten Änderungen** – konkret und mit Fundstelle („Station 2: Auftrag ergänzen, z. B. …“).
4. **Tabelle Kern** (Muss-Punkte der Checkliste): Punkt · Ampel · Befund · Fundstelle · Vorschlag.
5. **Tabelle Ausbau** (Soll), gleiche Spalten; nur Punkte, zu denen du etwas Konkretes vorschlagen kannst.
6. **Technik-Test:** Ergebnis des Skripts, zusammengefasst.
7. **Offen für Menschen:** fachliche Prüfung durch eine Fachlehrkraft, Review durch eine zweite Lehrkraft, Erprobung mit drei bis fünf Schülern, Test in der echten ByCS-Lernplattform (kommen Punktzahl und „abgeschlossen“ an?), Probelauf des Tafelbilds am echten Board.

Formuliere Befunde sachlich und als Vorschlag, nicht als Urteil über die Kollegin oder den Kollegen. Halte den Bericht kurz: lieber drei Änderungen, die gemacht werden, als zwanzig, die liegen bleiben.

**Nächster Schritt:** Änderungen mit `lernpaket-bauen` umsetzen und erneut prüfen.

Stand: Lernpaket-Kompass 4.0
