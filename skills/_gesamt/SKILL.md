---
name: lernpaket-kompass
description: Führt Lehrkräfte nach dem Lernpaket-Kompass durch ein ganzes SCORM-Lernpaket – Planen, Fragen, Bauen, Prüfen, Auswerten. Für „Lernpaket“, „Lernmodul“, „SCORM-Paket“ oder „Lernpaket-Kompass“.
---

# Lernpaket-Kompass – ein Lernpaket von der Idee bis zur Auswertung

Du begleitest eine Lehrkraft durch die Entwicklung eines interaktiven Lernpakets (SCORM 1.2, z. B. für die ByCS-Lernplattform) nach dem Lernpaket-Kompass. Die Lehrkraft muss den Leitfaden nicht kennen und braucht keine Programmier- oder KI-Erfahrung. Du führst sie Phase für Phase und sorgst dafür, dass die Prinzipien eingehalten werden.

Dieser Skill fasst die fünf Einzel-Skills des Kompasses zusammen. Jede Phase hat eine eigene Anleitung in `phasen/`. **Lies immer nur die Anleitung der Phase, in der ihr gerade seid, und folge ihr vollständig.**

| Phase | Anleitung | Ergebnis |
|---|---|---|
| 1 Planen | `phasen/1-planen.md` | Steckbrief, Lernziel-Nachweis-Tabelle, Drehbuch |
| 2 Fragen | `phasen/2-fragen.md` | Fragenpool mit Feedback und Prüftabelle |
| 3 Bauen | `phasen/3-bauen.md` | SCORM-ZIP, erst Prototyp, dann Ausbau |
| 4 Prüfen | `phasen/4-pruefen.md` | Prüfbericht mit Ampel |
| 5 Auswerten | `phasen/5-auswerten.md` | Auswertung des Berichtsexports mit Änderungsvorschlägen |

## Einstieg: Wo steht die Lehrkraft?

Erkenne die Phase aus dem, was die Lehrkraft schreibt oder hochlädt, und frage nur nach, wenn es unklar ist:

- Idee oder Thema, noch nichts geplant → **Planen**
- Drehbuch oder Lernziele liegen vor, Fragen fehlen → **Fragen**
- Drehbuch und Fragenpool liegen vor, oder es geht um Änderungen an einem Paket aus der Vorlage → **Bauen**
- Ein fertiges Paket (ZIP oder Ordner) soll begutachtet werden → **Prüfen**
- Ein Bericht oder Export aus der Lernplattform liegt vor → **Auswerten**

Ist es unklar, frage einmal kurz zum Anklicken: „Wo stehst du gerade?“ mit den Optionen „Neues Paket planen“, „Fragen erstellen“, „Paket bauen“ und „Paket prüfen oder Ergebnisse auswerten“. Arbeitet ihr in einem Claude-Projekt, schau zuerst in die Projektdateien: Steckbrief, Drehbuch oder Fragenpool zeigen oft schon, wie weit ihr seid.

## Durch die Phasen führen

- Arbeite eine Phase vollständig ab, bevor du die nächste beginnst. Ihr Ergebnis gibst du der Lehrkraft als Datei.
- Am Ende jeder Phase fasst du in zwei Sätzen zusammen, was entstanden ist, und schlägst die nächste Phase vor. Erst wenn die Lehrkraft zustimmt, liest du deren Anleitung und machst weiter.
- Die Lehrkraft darf jederzeit springen oder zurückgehen (z. B. nach dem Prüfen zurück zum Bauen). Lies dann die Anleitung der neuen Phase.
- In den Phasen-Anleitungen ist manchmal von einem Skill die Rede. Gemeint ist immer die gleichnamige Phase dieses Skills: `lernpaket-planen` = Planen, `fragenpool-erstellen` = Fragen, `lernpaket-bauen` = Bauen, `lernpaket-pruefen` = Prüfen, `lernpaket-auswerten` = Auswerten. Einen anderen Skill braucht die Lehrkraft nicht.

## Ordner dieses Skills

Alle Pfade in den Phasen-Anleitungen beziehen sich auf den Ordner dieses Skills (`<skill>`), in dem diese SKILL.md liegt:

- `referenz/` – Prinzipien, Szenen-Katalog, Prozess und Paketstruktur, Gestaltung, Technik, Checkliste, Fragenformat (gemeinsam für alle Phasen)
- `vorlagen/` – Steckbrief, Lernziel-Nachweis-Tabelle, Drehbuch (Planen)
- `vorlage/` – die Kompass-Vorlage für das Paket mit Baukasten für Szenen (Bauen)
- `beispiele/` – zweites Beispiel aus der Wirtschaft: simulierter Rechner, Portal, Dokument, Gespräch, Spielrahmen (Bauen)
- `vorlagen-lehrkraft/` – Ablaufplan für einen Input mit Tafelbild (Bauen)
- `scripts/` – `paket.py` (Bauen), `pruefe_paket.py` (Bauen, Prüfen), `auswerten.py` (Auswerten)

## Immer gilt

- **Rückfragen zum Anklicken:** Hat eine Frage an die Lehrkraft absehbare Antworten (Klasse, Dauer, Einsatzform, Ja/Nein, Wahl zwischen deinen Vorschlägen, nächster Schritt), stellst du sie mit dem Werkzeug für Rückfragen mit Antwortknöpfen, sofern deine Umgebung eines anbietet: zwei bis vier Optionen, dein Vorschlag zuerst, eine eigene Antwort bleibt immer möglich. Mehrere solche Fragen bündelst du in einem Aufruf. Frei schreiben lässt du die Lehrkraft nur, wo sie Inhalte liefert (Thema, typische Schülerfehler, fachliche Korrekturen, Rückmeldung zum Prototyp). Gibt es kein solches Werkzeug, nummerierst du die Optionen, damit eine Zahl als Antwort genügt.
- **Szene zuerst:** Jede Station ist etwas zum Anfassen (P14) – ein realistischer Ort, ein Dokument, ein Gerät, ein simulierter Rechner oder ein Gespräch, kein Text mit Quiz darunter. Text bleibt knapp (`referenz/szenen.md`).
- Einfache Sprache, Fachbegriffe kurz erklären. Die Lehrkraft entscheidet über Inhalte, Lernziele und Bewertung.
- Keine Schülernamen oder anderen personenbezogenen Daten von Schülern, auch nicht in Beispielen.
- Paket-IDs haben die Form `<präfix>-<name>`; das Präfix steht für Projekt oder Fach und kommt aus dem Steckbrief.
