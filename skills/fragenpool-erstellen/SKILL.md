---
name: fragenpool-erstellen
description: Erstellt Fragen für Lernpakete nach dem Lernpaket-Kompass – je Lernziel, Falschantworten aus typischen Schülerfehlern, erklärendes Feedback. Für Kurz-Checks, Selbstüberprüfung und Selbsttest.
---

# Fragenpool erstellen (Phase 5, nach Prototyp und Drehbuch)

Du schreibst die Fragen eines Lernpakets: Kurz-Checks, Fragenpool für die Selbstüberprüfung, Übungs-, Vorab- und Selbsttest-Fragen. Gute Fragen sind der Teil des Pakets, der am meisten Wirkung hat (Abrufen festigt Wissen, P5; erklärendes Feedback, P6), und zugleich der, bei dem fachliche Fehler am meisten schaden. Deshalb prüft die Lehrkraft jede Frage.

**Lies vor dem Start:** `referenz/fragenformat.md` (Format und Mengen). Aus `referenz/prinzipien.md` brauchst du nur P5, P6 und P8.

**Rückfragen zum Anklicken:** Hat eine Frage an die Lehrkraft absehbare Antworten (Klasse, Dauer, Einsatzform, Ja/Nein, Wahl zwischen deinen Vorschlägen, nächster Schritt), stellst du sie mit dem Werkzeug für Rückfragen mit Antwortknöpfen, sofern deine Umgebung eines anbietet: zwei bis vier Optionen, dein Vorschlag zuerst, eine eigene Antwort bleibt immer möglich. Mehrere solche Fragen bündelst du in einem Aufruf. Frei schreiben lässt du die Lehrkraft nur, wo sie Inhalte liefert (Thema, typische Schülerfehler, fachliche Korrekturen, Rückmeldung zum Prototyp). Gibt es kein solches Werkzeug, nummerierst du die Optionen, damit eine Zahl als Antwort genügt.

## Was du brauchst (sonst nachfragen)

1. Die Lernziele („Ich kann …“) – aus `lernziele-ueberpruefung.md`, falls vorhanden.
2. **Typische Fehler und Fehlvorstellungen** der Schüler zu jedem Lernziel. Ohne sie keine guten Falschantworten. Fehlen sie, frage danach und biete Vorschläge an, die die Lehrkraft bestätigt oder verwirft.
3. Die Leitsituation (für Fragen mit Berufsbezug) und die Stationen aus dem Drehbuch (welche Frage in welchen Kurz-Check gehört).

## Mengen

| Einsatz | Menge |
|---|---|
| Kurz-Check (`check`) | 2–3 je Station (die Vorab-Frage wird im Kurz-Check von selbst als Erstes aufgelöst; ohne Vorab-Frage 2–4), mindestens eine je Lernziel der Station; ab Station 3 eine Frage zu früheren Stationen |
| Selbstüberprüfung (`selbstueberpruefung`) | mindestens 4 je Lernziel im Pool (pro Versuch werden 2 je Lernziel gezogen) |
| Übung (`uebung`) | eine je Übung, wenn die Übung keine eigene Interaktion hat |
| Vorab-Frage (`vorab`) | eine je Station, vor der Szene. Sie ist zugleich die Leitfrage und zielt auf den Kern der Station: Vorab-Fragen helfen vor allem bei genau dem, wonach gefragt wurde. Schwer zu erraten (Zahl, Text, Zuordnen oder Mehrfachauswahl, keine Einfachauswahl und kein Hotspot), nicht zusätzlich im Kurz-Check, möglichst nicht in der Selbstüberprüfung; Fragetext neutral, ohne „Was vermutest du?“; mit `erklaerung`, weil sie im Kurz-Check aufgelöst wird |
| Selbsttest | 5 aus allen Lernzielen, für die Rückseite des Merkblatts (dürfen Fragen der Selbstüberprüfung sein) |

Eine Frage darf mehrere Einsätze haben, aber Kurz-Check und Selbstüberprüfung sollten sich nur wenig überschneiden.

## Regeln für gute Fragen

- **Jede Frage prüft genau ein Lernziel** und passt zu dessen Verb: „berechnen“ → Zahleneingabe, „zuordnen“ → Zuordnen, „erkennen“ → Bildfrage oder Hotspot, „begründen/auswählen“ → Multiple Choice mit Begründungen als Optionen.
- **Fragetypen mischen:** Einfachauswahl, Mehrfachauswahl, Zuordnen, Zahl, Text, Hotspot (jede Frage kann ein Bild tragen). Mindestens drei verschiedene Typen im Pool.
- **Falschantworten aus echten Fehlern**, nie ausgedacht oder albern. Jede Falschantwort steht für eine Fehlvorstellung und bekommt ein eigenes `feedback`, das sie anspricht und einen nächsten Schritt nennt („Du hast … Die kleinste Stelle steht rechts.“).
- **Keine Ratehilfen:** Die richtige Antwort ist nicht die längste oder genaueste, keine grammatischen Hinweise, kein „alle oben genannten“ oder „keine davon“, keine doppelten Verneinungen, keine Fangfragen.
- **Mehrere richtige Antworten** sind erwünscht, wo es fachlich passt (echtes Nachdenken statt Ausschlussverfahren).
- **Eingabefelder:** alle richtigen Schreibweisen in `akzeptiert`, bei Zahlen eine sinnvolle `toleranz`; typische Fehlergebnisse in `typisch` mit Feedback.
- **Fragen der Selbstüberprüfung** verlangen auch Anwendung in neuen Situationen, nicht nur Wiedererkennen von Formulierungen aus den Stationen.
- **`erklaerung`** sagt, warum die richtige Antwort richtig ist, in ein bis zwei Sätzen, ohne Lob ohne Inhalt.
- Sprache wie im Paket („du“ bzw. „Sie“), kurz, ohne Lehrbuchton. Erfundene Firmen und Personen.

## Ablauf

1. Für jedes Lernziel eine kurze Liste: typische Fehler → welche Fragen sie aufgreifen.
2. Fragen schreiben, zunächst für ein Lernziel, und der Lehrkraft zeigen. Fragen nach Rückmeldung zum Stil, dann die übrigen.
3. **Prüftabelle für die Lehrkraft** (Markdown), damit sie jede Frage fachlich abnehmen kann:

   | ID | LZ | Einsatz | Typ | Frage | Richtig | Falschantworten → Fehlvorstellung | geprüft |
   |---|---|---|---|---|---|---|---|

4. Selbstkontrolle vor der Übergabe: Mengen erfüllt? Jede Falschantwort mit Feedback? Jede Frage mit `erklaerung`? Hotspots mit genau einem richtigen Bereich und `label`? Rechnungen nachgerechnet (bei Zahlen selbst nachrechnen, am besten mit Code)?
5. Übergabe als JavaScript-Liste im Format aus `referenz/fragenformat.md` (Datei `fragen.js` bzw. direkt für `js/inhalt.js`) **und** die Prüftabelle.

## Grenzen

- Du kennzeichnest Fragen, bei denen du fachlich unsicher bist, in der Prüftabelle („bitte prüfen: …“).
- Fragen-IDs nach dem ersten Einsatz nicht mehr ändern; sie verbinden die Auswertung mit der Frage. Eine inhaltlich geänderte Frage bekommt eine neue ID.

**Nächster Schritt:** „Mit Drehbuch und Fragenpool baue ich jetzt den Rest des Pakets (Skill `lernpaket-bauen`).“

Stand: Lernpaket-Kompass 4.0
