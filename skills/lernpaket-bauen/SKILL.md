---
name: lernpaket-bauen
description: Baut ein SCORM-1.2-Lernpaket für die ByCS-Lernplattform aus Drehbuch und Fragenpool mit der Kompass-Vorlage – Szenen zum Anfassen, eigene Welt, Nachweis ab 80 %. Erst Prototyp, dann Ausbau.
---

# Lernpaket bauen (Phase 4 des Leitfadens)

Du baust aus Drehbuch und Fragenpool ein fertiges SCORM-1.2-Paket (ZIP), das die Lehrkraft in die ByCS-Lernplattform hochlädt. Grundlage ist die **Kompass-Vorlage** in `vorlage/`: Sie enthält die Engine, die die technischen und didaktischen Muss-Bausteine bereits umsetzt. Du schreibst nur den Inhalt (`js/inhalt.js`) und die Szenen. **Das Wichtigste ist die Szene:** Jede Station ist etwas zum Anfassen (Leitfaden P14), nicht ein Text mit Quiz darunter.

**Lies vor dem Start:** `referenz/fragenformat.md` (Inhaltsformat, Szenen, Baukasten), `referenz/szenen.md` (Szenen-Katalog, Textbudget, Welt), `referenz/gestaltung.md` (v. a. „Orientierung“ und „Aufgaben“), `referenz/technik.md`. Sieh dir zwei Beispiele an: `vorlage/js/inhalt.js` („Bits & Bytes“, Welt technik, eigenes Gerät) und `beispiele/wirtschaft-handelsregister.js` (Welt wirtschaft: simulierter Rechner, Portal, Dokument, Gespräch, Spielrahmen).

**Rückfragen zum Anklicken:** Hat eine Frage an die Lehrkraft absehbare Antworten (Klasse, Dauer, Einsatzform, Ja/Nein, Wahl zwischen deinen Vorschlägen, nächster Schritt), stellst du sie mit dem Werkzeug für Rückfragen mit Antwortknöpfen, sofern deine Umgebung eines anbietet: zwei bis vier Optionen, dein Vorschlag zuerst, eine eigene Antwort bleibt immer möglich. Mehrere solche Fragen bündelst du in einem Aufruf. Frei schreiben lässt du die Lehrkraft nur, wo sie Inhalte liefert (Thema, typische Schülerfehler, fachliche Korrekturen, Rückmeldung zum Prototyp). Gibt es kein solches Werkzeug, nummerierst du die Optionen, damit eine Zahl als Antwort genügt.

`<skill>` steht unten für den Ordner, in dem diese SKILL.md liegt.

## Was die Vorlage schon kann (nicht neu bauen)

Eigene Welt je Paket (`welt`: Farben, Kulisse im Kopf und auf der Startseite, Symbol) mit illustrierten Figuren · Start mit Szene, Leitsituation, Ablauf, Lernzielen, Selbsteinschätzung und „Wichtige Begriffe vorab“ · optionaler Spielrahmen mit Missionskarte (`spiel`) · Glossar unter jeder Station · Stationen als **Bühne**: Auftrag als Sprechblase der Figur, Szene groß in der Mitte, Notiz daneben (Kurz erklärt, Live-Erklärungen, Steckbrief), Vorführung „Zeig’s mir“ mit Frage zum Selbsterklären, Kurz-Check („zählt nicht“), der sich nach der Szene öffnet · Baukasten `js/baukasten.js` (Figuren, Kulissen, Gespräch, Rechner, Browser, Postfach, Formular, Dokument, Sortieren, Reihenfolge, Regler) · Aufträge zum Mitdenken mit Muster · freiwilliger Vorwissens-Check mit Überspring-Empfehlung · Übungen mit drei gestuften Tipps und Reflexion mit Musterantwort · Nachweis mit Teil A (Handlungsaufgabe) und Teil B (gezogen und gemischt, 2 je Lernziel), Bestehen ab 80 %, bestes Ergebnis zählt · Abschluss mit Auswertung je Lernziel, Empfehlung, Selbsteinschätzung nachher, Merkblatt zum Ergänzen mit PDF und Selbsttest, Ergebnis-PDF · genau ein Weiter-Knopf je Ansicht, Fortschrittsanzeige nach Teilen und Lernzielen · SCORM 1.2 (score, status, objectives je Lernziel, interactions je Frage, suspend_data, Name) · läuft ohne Lernplattform · Tablet und Tastatur.

**Optional: Tafelbild** (`js/tafel.js`, `css/tafel.css`) für einen freiwilligen Lehrer-Input: Präsentationsmodus mit Szenen, Werkzeugleiste, Tastatur und Presenter, zuschaltbaren Erklärungen, Stift, Verweis auf die Station, Knopf in der Kopfzeile, Karte auf der Startseite und Aufruf über `index.html#tafel`. Es speichert nichts. Ohne Feld `tafel` in `inhalt.js` passiert nichts – die Dateien bleiben trotzdem im Paket.

**`js/engine.js`, `js/baukasten.js`, `js/tafel.js` und alle Dateien in `css/` nicht verändern.** Sie sorgen dafür, dass alle Pakete gleich aussehen und sich gleich bedienen. Fehlt eine Funktion, löse sie in `inhalt.js` (z. B. als Interaktion) und notiere den Wunsch für die Pflege der Vorlage.

## Ablauf

### 0. Voraussetzungen prüfen

Drehbuch (`drehbuch.md`) und Fragenpool sollten vorliegen. Fehlen sie, schlage vor, zuerst `lernpaket-planen` bzw. `fragenpool-erstellen` zu nutzen. Bei kleinen Lücken fragst du gezielt nach.

### 1. Paket anlegen

```bash
python3 <skill>/scripts/paket.py neu <arbeitsordner>/<name> --id <präfix>-<name> --titel "Titel"
```

Setze in `js/inhalt.js` die `version`: `'0.1'` für den Prototyp, `'1.0'` für die erste Fassung im Unterricht. Sie steht klein in der Kopfzeile und auf den Ausdrucken, damit Lehrkraft und Schüler sehen, welche Fassung sie vor sich haben.

Das Präfix steht für das Projekt oder Fach und kommt aus dem Steckbrief (z. B. `ping-` für die IT-Pakete, `bwl-` oder `deutsch-`). Ist keins festgelegt, frag die Lehrkraft; alle Pakete eines Projekts nutzen dasselbe Präfix.

### 2. Prototyp: eine Station, zwei Fragen

Ersetze den Beispielinhalt in `js/inhalt.js` durch: Titel, **Welt** (`welt.thema`, `kulisse`, `symbol`), **Figur mit Aussehen**, Leitsituation, ggf. Spielrahmen, alle Lernziele, **Station 1 vollständig** und ihren Kurz-Check. Baue Station 1 in dieser Reihenfolge:

1. **Szene** aus dem Drehbuch mit dem Baukasten (`api.kit`) oder einem eigenen Gerät: Was sehen die Lernenden, was bewegen sie, woran erkennt das Paket den Erfolg, wie reagiert die Szene auf Fehler?
2. **Vorführung** (`demo`) an einem anderen Fall, 2–4 Schritte, mit `selbsterklaerung` an einem entscheidenden Schritt; `zuruecksetzen` stellt danach die Aufgabe her.
3. **Live-Erklärungen** (`api.erklaere`) und Reaktionen der Figur (`api.sage`) an den Stellen, an denen sie gebraucht werden.
4. Erst dann die wenigen Sätze: Auftrag (1–2 Sätze), Leitfrage, „Kurz erklärt“ (höchstens etwa 40 Wörter), Steckbrief. Die übrigen Teile dürfen noch fehlen; die rote Box „Hinweis für Autor:innen“ zeigt dann, was noch fehlt – das ist im Prototyp normal.

Teste (Schritt 5; im Prototyp sind rote Punkte zu Nachweis und Datenübergabe erwartbar, alles andere muss grün sein), baue das ZIP (Schritt 6) und gib es der Lehrkraft mit der Bitte, es auszuprobieren: `index.html` im entpackten Ordner per Doppelklick im Browser öffnen oder das ZIP in einen Testkurs laden. Frage nach Rückmeldung in normaler Sprache: Was ist unklar, zu lang, zu schwer, sieht falsch aus? Macht die Szene Lust, etwas auszuprobieren?

### 3. Ausbau

Nach der Rückmeldung alle Stationen, Übungen, den Nachweis (Teil A als Interaktion, Teil B aus dem Pool), Merkblatt, Selbsttest und Vorwissens-Check ergänzen.

Beim Schreiben der Texte:

- **Jede Station ist eine Szene** (P14). Ohne Szene nur in begründeten Ausnahmen (`ohneInteraktion: 'Begründung'`, mit der Lehrkraft abgesprochen). Ideen für jedes Fach: `referenz/szenen.md`.
- **Realistisch:** Dokumente, Portale, Geräte und Gespräche wie im Beruf, mit erfundenen Daten. Echte Webseiten nicht kopieren, sondern als Übungsversion nachbauen (eigene Adresse, Hinweis „Übungsversion“, echter Name im Steckbrief).
- Jede Station und Übung beginnt mit einem **Auftrag aus der Leitsituation** in der Sprechblase der Figur („Frau Maier bittet dich …“), nicht mit „Aufgabe 3“.
- **Textbudget:** Auftrag 1–2 Sätze, „Kurz erklärt“ höchstens etwa 40 Wörter, zusammen höchstens etwa 90 Wörter je Station. Ausführliches in `vertiefung` oder `steckbrief`. Erklärungen lieber passend zur Handlung über `api.erklaere()`.
- Lösungsbeispiel als **Vorführung in der Szene** (`demo`) mit Begründung je Schritt (`warum`) und einer Frage zum Selbsterklären (`selbsterklaerung`) an einem entscheidenden Schritt.
- Übungen wo möglich ebenfalls als Szene, in einer **anderen** Situation; nur eine Frage, wenn eine Szene keinen Mehrwert hat.
- In einigen Stationen oder Übungen ein Auftrag zum Mitdenken (`mitdenken`): skizzieren, zusammenfassen, jemandem erklären – mit Muster.
- Glossar (`glossar`) mit allen Fachbegriffen, die wichtigsten mit `vorab: true`. Kurze Sätze, geläufige Wörter, eine Information pro Satz – das hilft besonders Lernenden, die Deutsch lernen.
- Kein Ton als einzige Quelle: Ton oder Video nur mit Untertiteln (`<track>`) oder Transkript.
- Hervorhebungen sparsam (`<b>`), Farben nur über Variablen (`var(--accent)` ist für Handlungsaufforderungen reserviert).
- Übungen in **anderen** Situationen als die Stationen; Tipps in drei Stufen (Denkanstoß, Teillösung, Lösung mit Begründung).
- Nachweis Teil A: neue Situation, keine Rückmeldung während der Bearbeitung; Prüfpunkte je Lernziel in `auswerten()`.

### 3a. Tafelbild (nur wenn im Drehbuch ein Input geplant ist)

Erst wenn die Stationen stehen, deren Szenen das Tafelbild zeigt. Format und Regeln: `referenz/fragenformat.md`, Abschnitt „Tafelbild“; Beispiel in `vorlage/js/inhalt.js`.

- Szenen aus dem Drehbuch-Abschnitt „Input und Tafelbild“ als `tafel.szenen`. Für jede Szene dieselben Bausteine wie in der Station wiederverwenden (gleiche Optik = Wiedererkennung), aber größer und **ohne erklärenden Text**; nur Beschriftungen im Bild, Zahlen, Symbole.
- Werkzeuge über `api.werkzeug()` mit kurzem Text und Tastenkürzel. Für die Vorhersage: Ergebnisse als Schalter zum Aufdecken anlegen statt sofort anzuzeigen.
- Zu jeder Szene `station` (ID) und eine `erklaerung` (2–4 kurze Sätze) für Schüler, die das Tafelbild selbst öffnen.
- **Ablaufplan** für die Lehrkraft aus `vorlagen-lehrkraft/input-ablauf.md` füllen: je Szene Zeit, Klicks, Impulsfrage, erwartete Fehlvorstellung, Merksatz. **Alle Zahlen im Ablaufplan mit Code gegen das Paket nachrechnen.** Der Ablaufplan kommt nicht ins ZIP (im Repository: `packages/<name>/lehrer/input-ablauf.md`).
- Beim Test (Schritt 5) prüft das Skript das Tafelbild mit. Sieh dir die Screenshots `tafel-<n>.png` an: Ist aus der letzten Reihe lesbar, was gemeint ist? Steht nirgends ein erklärender Satz?

### 4. Szenen schreiben

Vertrag, Regeln und alle Bausteine stehen in `referenz/fragenformat.md` („Interaktionen“ und „Baukasten“). Kurz:

- `function (box, api) { …; return { demo, zuruecksetzen, loesen, auswerten } }` – `loesen()` ist **Pflicht** (setzt die Musterlösung, der automatische Test braucht es), `demo` und `zuruecksetzen` gehören zu jeder Station, `auswerten()` nur in Teil A.
- **Erst im Baukasten suchen** (`api.kit.computer`, `browser`, `mail`, `formular`, `dokument`, `dialog`, `szene`, `sortieren`, `reihenfolge`, `regler`), dann eigene Geräte oder SVG-Grafiken oben in `inhalt.js` bauen (wie `routerGeraet` im Beispiel). Eigener Stil dafür als `<style>` in `inhalt.js`.
- Bedienung mit `<button>`-Elementen (Tastatur), **Antippen statt nur Ziehen**, große Ziele (mind. 40 px), in der Szene keine Knöpfe mit der Klasse `primaer`.
- Grafiken als Inline-SVG, Beschriftungen im Bild; keine externen Dateien, Schriften, Bibliotheken oder CDNs; keine `alert/confirm/prompt`.
- Rückmeldung nach jedem Versuch mit Begründung (`api.meldung`) oder als Reaktion der Figur (`api.sage`), Erfolg mit `api.erledigt('…')`.
- Während der Vorführung zählt nichts: Rückmeldungen und `erledigt` sind dann stumm, `api.demo()` ist `true`.

### 5. Testen

```bash
python3 <skill>/scripts/pruefe_paket.py <paketordner> --bilder <ordner-fuer-screenshots>
```

Das Skript prüft Manifest, masteryscore 80, externe Verweise, JavaScript-Syntax, Inhalt (Mengen, Feedback, IDs), **löst alle Stationen, Übungen und den Nachweis mit der Musterlösung**, prüft die Datenübergabe an einen nachgebauten SCORM-Player, den Wiedereinstieg, Konsolenfehler, Tablet- und Handy-Breite und den einen Weiter-Knopf.

- Alle roten Punkte beheben. Gelbe Hinweise beheben oder der Lehrkraft begründen.
- **Sieh dir die Screenshots selbst an** (Fünf-Sekunden-Test: Sieht man sofort, was man anfassen kann? Ist klar, was zu tun ist und wo es weitergeht? Ist nichts abgeschnitten? Wirkt es wie ein Ort aus dem Beruf oder wie ein Arbeitsblatt?).
- Die Punkte unter **Interaktivität** (Szene in jeder Station, Vorführung, Szene ohne Scrollen sichtbar, Textbudget) behandelst du wie Muss-Punkte: Gelb nur mit Begründung gegenüber der Lehrkraft.
- Ist Playwright nicht installiert, versuche `pip install playwright && playwright install chromium`; klappt das nicht, sag der Lehrkraft, dass der Browser-Test fehlt, und bitte sie, das Paket einmal komplett durchzuspielen.
- Rechnungen, Musterlösungen und Zuordnungen fachlich gegenprüfen (bei Zahlen mit Code nachrechnen).

### 6. ZIP bauen und übergeben

```bash
python3 <skill>/scripts/paket.py zip <paketordner>
```

Das aktualisiert die Dateiliste im Manifest, übernimmt Titel, ID und Bestehensgrenze aus `inhalt.js` und legt `<name>_scorm12.zip` neben den Ordner. Gib der Lehrkraft das ZIP und diese Hinweise:

1. In der ByCS-Lernplattform im Kurs eine Aktivität **„Lernpaket“** (SCORM) anlegen und das ZIP hochladen.
2. Empfohlene Einstellungen: Bewertungsmethode „Höchste Bewertung“, Versuche unbegrenzt, Anzeige in neuem Fenster oder mindestens 1000 px breit.
3. Vor dem ersten Einsatz einmal mit einem Schülertestkonto durchspielen (Punktzahl kommt an?).
4. Danach: Review durch eine Kollegin oder einen Kollegen (Skill `lernpaket-pruefen`) und Test mit drei bis fünf Schülern.
5. Bei Paketen mit Tafelbild: Für den Input den entpackten Ordner öffnen und `index.html#tafel` aufrufen (F = Vollbild), den Ablaufplan mitgeben und einmal am echten Board ausprobieren.

Wenn in einem Repository mit mehreren Paketen gearbeitet wird (z. B. PING): Quellen nach `packages/<name>/src/`, Steckbrief nach `packages/<name>/README.md`, Planung nach `packages/<name>/planung/`, Ablaufplan für einen Input nach `packages/<name>/lehrer/`; ZIPs nicht einchecken (`./build.sh` baut sie).

## Änderungen an bestehenden Paketen

Version in `inhalt.js` erhöhen, Änderung im Steckbrief notieren, Fragen-IDs beibehalten (geänderte Frage = neue ID), danach Schritte 5 und 6.

## Grenzen

Fachliche Richtigkeit verantwortet die Lehrkraft; markiere Unsicheres ausdrücklich. Keine echten Schülerdaten, keine echten Firmennamen, keine Tracking- oder Fremddienste.
