---
name: lernpaket-bauen
description: Baut ein SCORM-1.2-Lernpaket für die ByCS-Lernplattform mit der Kompass-Vorlage – erst den Prototyp aus dem Konzept, nach Drehbuch und Fragenpool den Rest. Simulation mit Szenen zum Anfassen.
---

# Lernpaket bauen (Phase 4: Prototyp, Phase 5: Ausbau)

Du baust ein SCORM-1.2-Paket (ZIP), das die Lehrkraft in die ByCS-Lernplattform hochlädt. Gebaut wird in zwei Schritten: zuerst der **Prototyp** (eine Station, zwei Fragen) direkt aus dem Konzept, damit die Lehrkraft früh sieht, ob die Idee trägt; nach Drehbuch und Fragenpool der **Ausbau**.

Grundlage ist die **Kompass-Vorlage** in `vorlage/`: Sie enthält die Engine, die Aufbau, Bedienung und Datenübergabe bereits umsetzt. Du schreibst nur die Quellen in `quelle/`: den Inhalt mit den Szenen (`quelle/paket.js`) und die Fragen (`quelle/fragen.md`, Markdown); `paket.py bauen` setzt daraus `js/inhalt.js` zusammen. **Das Wichtigste ist das Konzept aus der Planung** (`konzept.md`, P12). Form A und B: Trägt ein Arbeitsgegenstand das ganze Paket, baust du im **Simulationsmodus** (`simulation`: Lektion links in Kapiteln und Schritten, Gegenstand rechts, bleibt erhalten); sonst ist jede Station eine eigene Szene. Form C: zusätzlich das Spiel als Interaktion der Übungen. Form D: Spielmodus, in dem das Spiel die Grundlagen selbst vermittelt (SQL-Island-Prinzip, `referenz/szenen.md`). Nie ein Text mit Quiz darunter. Fehlt das Konzept, holst du die Phasen „Zielen“ und „Erfinden“ aus `lernpaket-planen` nach, bevor du baust.

**Lies vor dem Start:** `referenz/fragenformat.md` (Quellen, Fragen als Markdown, Inhaltsformat, Szenen, Baukasten) und `referenz/szenen.md` (Textbudget, Welt, echt in der Funktion). Sieh dir **ein** Beispiel an, das zur Form im Konzept passt: Simulationsmodus `beispiele/simulation-handelsregister.js` („Partner-Check“) · Stationen mit eigenen Szenen `vorlage/quelle/paket.js` („Bits & Bytes“, eigenes Gerät) und als Ausschnitt mit simuliertem Rechner `beispiele/wirtschaft-handelsregister.js` · Spielmodus `beispiele/spiel-stempel-drauf.js` oder `beispiele/spiel-firmendex.js`. Die Fragen der Beispiele stehen jeweils daneben in `….fragen.md`, die der Vorlage in `vorlage/quelle/fragen.md`. Nur bei Bedarf: `referenz/gestaltung.md` (Abschnitte „Simulation und Szene zuerst“ und „Orientierung“), `referenz/technik.md` vor dem ZIP.

**Rückfragen zum Anklicken:** Hat eine Frage an die Lehrkraft absehbare Antworten (Klasse, Dauer, Einsatzform, Ja/Nein, Wahl zwischen deinen Vorschlägen, nächster Schritt), stellst du sie mit dem Werkzeug für Rückfragen mit Antwortknöpfen, sofern deine Umgebung eines anbietet: zwei bis vier Optionen, dein Vorschlag zuerst, eine eigene Antwort bleibt immer möglich. Mehrere solche Fragen bündelst du in einem Aufruf. Frei schreiben lässt du die Lehrkraft nur, wo sie Inhalte liefert (Thema, typische Schülerfehler, fachliche Korrekturen, Rückmeldung zum Prototyp). Gibt es kein solches Werkzeug, nummerierst du die Optionen, damit eine Zahl als Antwort genügt.

`<skill>` steht unten für den Ordner, in dem diese SKILL.md liegt.

## Was die Vorlage schon kann (nicht neu bauen)

- **Rahmen:** eine Kopfzeile mit Titel und den Teilen samt Fortschritt; Stationen als Punkte im Kopf der Station; Fußleiste mit „Weiter“. Hervorgehoben ist je Ansicht höchstens ein Knopf, und „Weiter“ erst, wenn die Aufgabe erledigt ist. So ist die Szene auf 1366 × 768 ganz zu sehen.
- **Start:** Szene mit Leitsituation, Lernpfad mit den vier Teilen und den Lernzielen als Etiketten, ein Knopf, Abkürzung „Ich kenne mich schon aus“.
- **Station als Bühne:** Lernziel als Satz, Vorab-Frage vor der Szene (richtig → darf überspringen; sonst bleibt sie als Leitfrage stehen), Auftrag als Sprechblase, Szene groß in der Mitte, Notiz daneben (Live-Erklärungen, „Neu hier“, Kurz erklärt, Steckbrief), Vorführung „Zeig’s mir“ mit Frage zum Selbsterklären, Kurz-Check („zählt nicht“), der zuerst die Vorab-Frage auflöst und einmal je Lernziel mit der Einschätzung endet.
- **Modi:** Simulationsmodus (`simulation`: Schritte haken sich am Gegenstand ab, Wiedereinstieg durch Nachspielen der Lösungen), Spielmodus (`spielwelt`: Stationen = Level, Zwischenbilanz je Level), Spielrahmen mit Missionskarte (`spiel`).
- **Üben:** drei gestufte Tipps, Reflexion mit Musterantwort, Aufträge zum Mitdenken.
- **Selbstüberprüfung** (zählt nicht): Teil A Handlungsaufgabe, Teil B gezogen und gemischt (2 je Lernziel), ab 80 % „sitzt das Thema“, beliebig oft.
- **Abschluss:** Auswertung je Lernziel neben der eigenen Einschätzung, Empfehlung, Merkblatt zum Ergänzen mit PDF und Selbsttest, Ergebnis-PDF.
- **Tafelbild** (`js/tafel.js`): Präsentationsmodus für den Mittelteil des Inputs, Knopf in der Kopfzeile, Aufruf über `index.html#tafel`; speichert nichts.
- **Technik:** eigene Welt (`welt`), Baukasten `js/baukasten.js`, Glossar, SCORM 1.2 (Ergebnis als Information, Status „completed“, objectives, interactions, suspend_data, Name), läuft ohne Lernplattform, Tablet und Tastatur.

**`js/engine.js`, `js/baukasten.js`, `js/tafel.js`, `index.html` und alle Dateien in `css/` nicht verändern.** Sie sorgen dafür, dass alle Pakete gleich aussehen und sich gleich bedienen. Fehlt eine Funktion, löse sie in `quelle/paket.js` (z. B. als Interaktion) und notiere den Wunsch für die Pflege der Vorlage.

## Ablauf

### 0. Voraussetzungen prüfen

- **Für den Prototyp:** Lernziele (`lernziele-ueberpruefung.md`) und Konzept mit dem Kurzplan für Station 1 (`konzept.md`). Fehlen sie, schlage vor, zuerst `lernpaket-planen` zu nutzen.
- **Für den Ausbau:** Drehbuch (`drehbuch.md`) und Fragenpool. Fehlen sie, schlage vor, zuerst `lernpaket-planen` bzw. `fragenpool-erstellen` zu nutzen. Bei kleinen Lücken fragst du gezielt nach.

### 1. Paket anlegen

```bash
python3 <skill>/scripts/paket.py neu <arbeitsordner>/<name> --id <präfix>-<name> --titel "Titel"
```

Das legt das Paket mit dem Ordner `quelle/` an (`paket.js`, `fragen.md`) und setzt die `version` in `quelle/paket.js` auf `'1.0'`; stelle sie für den Prototyp auf `'0.1'`, für die erste Fassung im Unterricht auf `'1.0'`. Sie steht klein in der Kopfzeile und auf den Ausdrucken. (Die Versionsnummer des Kompass selbst steht in der `index.html` und hat damit nichts zu tun.)

Nach jeder Änderung in `quelle/` baust du `js/inhalt.js` neu (das ZIP in Schritt 6 tut es selbst):

```bash
python3 <skill>/scripts/paket.py bauen <paketordner>
```

Ein Fehler in `fragen.md` bricht den Build mit Zeilenangabe ab. `js/inhalt.js` änderst du nie von Hand.

Das Präfix steht für das Projekt oder Fach und kommt aus dem Steckbrief (z. B. `ping-` für die IT-Pakete, `bwl-` oder `deutsch-`). Ist keins festgelegt, frag die Lehrkraft; alle Pakete eines Projekts nutzen dasselbe Präfix.

### 2. Prototyp: eine Station, zwei Fragen

Ersetze den Beispielinhalt in `quelle/paket.js` und `quelle/fragen.md` durch: Titel, **Welt** (`welt.thema`, `kulisse`, `symbol`), **Figur mit Aussehen**, Leitsituation, ggf. Spielrahmen, alle Lernziele, **Station 1 vollständig** mit Vorab-Frage und zwei Kurz-Check-Fragen. **Im Simulationsmodus** stattdessen: den Gegenstand mit allen Befehlen, die `loesen` braucht, und Kapitel 1 mit allen Schritten (`pruefe`, `loesen`). **Im Spielmodus**: Spielwelt mit Level 1 vollständig spielbar (geführter erster Fall, alle Fälle, Folgen, Erfolgskriterium) und dessen Zwischenbilanz. Sonst baue Station 1 in dieser Reihenfolge:

1. **Szene** aus dem Kurzplan mit dem Baukasten (`api.kit`) oder einem eigenen Gerät: Was sehen die Lernenden, was bewegen sie, woran erkennt das Paket den Erfolg, wie reagiert die Szene auf Fehler? Etwa 380 px hoch, damit sie ganz zu sehen ist.
2. **Vorführung** (`demo`) an einem anderen Fall, 2–4 Schritte, mit `selbsterklaerung` an einem entscheidenden Schritt; `zuruecksetzen` stellt danach die Aufgabe her.
3. **Live-Erklärungen** (`api.erklaere`) und Reaktionen der Figur (`api.sage`) an den Stellen, an denen sie gebraucht werden.
4. Erst dann die wenigen Sätze: Auftrag (1–2 Sätze), „Kurz erklärt“ (höchstens etwa 40 Wörter), Steckbrief. Die übrigen Teile dürfen noch fehlen; die rote Box „Hinweis für Autor:innen“ zeigt dann, was noch fehlt – das ist im Prototyp normal.

Teste (Schritt 5; im Prototyp sind rote Punkte zu Selbstüberprüfung und Datenübergabe und der Hinweis aufs fehlende Tafelbild erwartbar, alles andere muss grün sein), baue das ZIP (Schritt 6) und gib es der Lehrkraft mit der Bitte, es auszuprobieren: `index.html` im entpackten Ordner per Doppelklick im Browser öffnen oder das ZIP in einen Testkurs laden. Frage nach Rückmeldung in normaler Sprache: Was ist unklar, zu lang, zu schwer, sieht falsch aus? Macht die Szene Lust, etwas auszuprobieren? Trägt der Gegenstand auch die anderen Lernziele?

**Nächster Schritt nach dem Prototyp:** Überzeugt er, folgen Drehbuch (`lernpaket-planen`, Teil 2) und Fragenpool (`fragenpool-erstellen`), dann der Ausbau. Überzeugt die Form nicht, zurück zum Konzept – das kostet jetzt eine Stunde, später Tage.

### 3. Ausbau

Mit Drehbuch und Fragenpool alle Stationen, Übungen, die Selbstüberprüfung (Teil A als Interaktion, Teil B aus dem Pool), Merkblatt, Selbsttest, die Vorab-Fragen aller Stationen und das Tafelbild ergänzen. Der Fragenpool kommt als `quelle/fragen.md` aus `fragenpool-erstellen` und wird unverändert übernommen; Korrekturen an Fragen machst du dort, nicht im gebauten `js/inhalt.js`.

Beim Schreiben der Texte:

- **Im Spielmodus** (`spielwelt`, Format in `referenz/fragenformat.md`): Spielmechanik = Lernziel, erster Fall jedes Levels geführt, Fehler mit Folge und Erklärung, Erfolgskriterium je Level, `api.level()` beim Schaffen, kleiner Spielstand über `api.speicher()`. Üben und Teil A der Selbstüberprüfung nutzen dieselbe Mechanik mit neuen Fällen (dort ohne Rückmeldung und Hilfen). `loesen()` läuft ohne Animation sofort durch. Spielbühne höchstens etwa 600 px hoch.
- **Im Simulationsmodus** (`simulation`, Format in `referenz/fragenformat.md`): der Gegenstand als Funktion mit Zustand und Befehlen (dieselbe Funktion für Entdecken, Üben, Teil A der Selbstüberprüfung und Tafelbild, jeweils mit anderen Fällen); nach jeder Änderung `api.geaendert()`. Je Kapitel 2–6 Schritte, eine Handlung mit einem neuen Gedanken je Schritt, höchstens etwa 60 Wörter; der erste Schritt mit Neuem als `zeigen: true` mit Frage zum Selbsterklären. `pruefe` am Zustand (jeder richtige Weg zählt, vorher nicht erfüllt), `loesen` vollständig und ohne Animation – es dient auch dem Wiedereinstieg.
- **Sonst ist jede Station eine Szene** (P12). Ohne Szene nur in begründeten Ausnahmen (`ohneInteraktion: 'Begründung'`, mit der Lehrkraft abgesprochen). Ideen für jedes Fach: `referenz/szenen.md`.
- **Echt in der Funktion, sparsam im Aussehen:** Dokumente, Portale, Geräte und Gespräche verhalten sich wie im Beruf, mit erfundenen Daten; gezeigt wird nur, was zur Aufgabe gehört. Echte Webseiten nicht kopieren, sondern als Übungsversion nachbauen (eigene Adresse, Hinweis „Übungsversion“, echter Name im Steckbrief). Keine Deko im Arbeitsbereich der Szene.
- Jede Station und Übung beginnt mit einem **Auftrag aus der Leitsituation** in der Sprechblase der Figur („Frau Maier bittet dich …“), nicht mit „Aufgabe 3“.
- **Textbudget:** Auftrag 1–2 Sätze, „Kurz erklärt“ höchstens etwa 40 Wörter, zusammen höchstens etwa 90 Wörter je Station. Ausführliches in `vertiefung` oder `steckbrief`. Erklärungen lieber passend zur Handlung über `api.erklaere()`.
- Lösungsbeispiel als **Vorführung in der Szene** (`demo`) mit Begründung je Schritt (`warum`) und einer Frage zum Selbsterklären (`selbsterklaerung`) an einem entscheidenden Schritt.
- **Vorab-Frage je Station** (`vorab`): eine Frage zum Kern der Station, schwer zu erraten (Zahl, Text, Zuordnen oder Mehrfachauswahl). Sie ist die Leitfrage und wird im Kurz-Check von selbst aufgelöst – also nicht zusätzlich in `check` eintragen und kein Feld `leitfrage` setzen. Den Fragetext neutral formulieren; „Was vermutest du?“ steht schon darüber.
- **Kurz-Check:** 2–3 Fragen in `check`. Die Einschätzung je Lernziel fügt die Engine selbst ein.
- Übungen wo möglich ebenfalls als Szene, in einer **anderen** Situation als die Stationen; Tipps in drei Stufen (Denkanstoß, Teillösung, Lösung mit Begründung); nur eine Frage, wenn eine Szene keinen Mehrwert hat.
- In einigen Stationen oder Übungen ein Auftrag zum Mitdenken (`mitdenken`): skizzieren, zusammenfassen, jemandem erklären – mit Muster.
- **Startseite:** Leitsituation höchstens etwa 40 Wörter (der einzige Fließtext dort), jedes Lernziel mit Etikett `kurz` (höchstens vier Wörter). Alles andere gehört an die Stationen.
- Glossar (`glossar`) mit allen Fachbegriffen; die neuen Begriffe einer Station mit `vorab: '<Stations-id>'` – sie erscheinen dort als „Neu hier“ neben der Szene. Kurze Sätze, geläufige Wörter, eine Information pro Satz.
- Kein Ton als einzige Quelle: Ton oder Video nur mit Untertiteln (`<track>`) oder Transkript.
- Hervorhebungen sparsam (`<b>`), Farben nur über Variablen (`var(--accent)` ist für den nächsten Schritt reserviert).
- **Selbstüberprüfung** (`selbstueberpruefung`): Teil A in neuer Situation, keine Rückmeldung während der Bearbeitung; Prüfpunkte je Lernziel in `auswerten()`. Optional `danach`: ein Satz, was folgt, wenn das Thema sitzt (z. B. der Kompetenznachweis in der Lernplattform).

### 3a. Tafelbild: zwei bis vier Szenen

Erst wenn die Stationen stehen, deren Szenen das Tafelbild zeigt. Es gehört zu jedem Paket (Soll) und ersetzt im Input der Lehrkraft nur den Mittelteil (Erklären und Beispiel); Einstieg, Üben und Sicherung laufen auf ihren Folien. Format und Regeln: `referenz/fragenformat.md`, Abschnitt „Tafelbild“; Beispiele in `vorlage/quelle/paket.js` und in `beispiele/`.

- Szenen aus dem Drehbuch-Abschnitt „Tafelbild“ als `tafel.szenen`. Dieselben Bausteine oder denselben Gegenstand wie in der Station wiederverwenden (gleiche Optik = Wiedererkennung), aber größer und **ohne erklärenden Text**; nur Beschriftungen im Bild, Zahlen, Symbole.
- Werkzeuge über `api.werkzeug()` mit kurzem Text und Tastenkürzel. Für die Vorhersage: Ergebnisse als Schalter zum Aufdecken anlegen statt sofort anzuzeigen.
- Zu jeder Szene `station` (ID) und eine `erklaerung` (2–4 kurze Sätze) für Schüler, die das Tafelbild selbst öffnen.
- **Hinweise für die Notizen der Folien** aus `vorlagen-lehrkraft/tafelbild-notizen.md` füllen: ab wo das Tafelbild übernimmt, je Szene Klicks und Tasten, Vorhersage-Frage, erwartete Fehlvorstellung, Kernaussage, Rückweg zur Folie. **Alle Zahlen darin mit Code gegen das Paket nachrechnen.** Die Datei kommt nicht ins ZIP (im Repository: `packages/<name>/lehrer/tafelbild-notizen.md`). Einen eigenen Ablaufplan gibt es nicht: Den Ablauf des Inputs hält die Lehrkraft in den Notizen ihrer Folien fest.
- Beim Test (Schritt 5) prüft das Skript das Tafelbild mit. Sieh dir die Screenshots `tafel-<n>.png` an: Ist aus der letzten Reihe lesbar, was gemeint ist? Steht nirgends ein erklärender Satz?

### 4. Szenen schreiben

Vertrag, Regeln und alle Bausteine stehen in `referenz/fragenformat.md` („Interaktionen“ und „Baukasten“). Kurz:

- `function (box, api) { …; return { demo, zuruecksetzen, loesen, auswerten } }` – `loesen()` ist **Pflicht** (setzt die Musterlösung, der automatische Test braucht es), `demo` und `zuruecksetzen` gehören zu jeder Station, `auswerten()` nur in Teil A.
- **Erst im Baukasten suchen** (`api.kit.computer`, `browser`, `mail`, `formular`, `dokument`, `dialog`, `szene`, `sortieren`, `reihenfolge`, `regler`), dann eigene Geräte oder SVG-Grafiken oben in `quelle/paket.js` oder in einer eigenen Datei in `quelle/` bauen (wie `routerGeraet` im Beispiel). Eigener Stil dafür als `<style>` in derselben Datei.
- Bedienung mit `<button>`-Elementen (Tastatur), **Antippen statt nur Ziehen**, große Ziele (mind. 40 px). **In der Szene keine Knöpfe mit der Klasse `primaer`:** Die Akzentfarbe gehört dem einen nächsten Schritt, den die Engine hervorhebt.
- Grafiken als Inline-SVG, Beschriftungen im Bild; keine externen Dateien, Schriften, Bibliotheken oder CDNs; keine `alert/confirm/prompt`.
- Rückmeldung nach jedem Versuch mit Begründung (`api.meldung`) oder als Reaktion der Figur (`api.sage`), Erfolg mit `api.erledigt('…')`.
- Während der Vorführung zählt nichts: Rückmeldungen und `erledigt` sind dann stumm, `api.demo()` ist `true`.

### 5. Testen

```bash
python3 <skill>/scripts/pruefe_paket.py <paketordner> --bilder <ordner-fuer-screenshots>
```

Das Skript prüft Manifest (kein masteryscore), externe Verweise, JavaScript-Syntax, die Quellen (`fragen.md` lesbar, Erklärung und Feedback vorhanden, offene Prüfnotizen, `js/inhalt.js` auf dem Stand von `quelle/`) und Inhalt (Mengen, Feedback, IDs). Im Browser auf 1366 × 768 **löst es alle Stationen, Übungen und die Selbstüberprüfung mit der Musterlösung** und prüft: Szene ganz zu sehen (auch die Unterkante), höchstens ein hervorgehobener Knopf, „Weiter“ erst nach der Aufgabe, Datenübergabe (Ergebnis als Information, Status „completed“, nie bestanden oder nicht bestanden), Wiedereinstieg, Konsolenfehler, Tablet- und Handy-Breite, Tafelbild.

- Alle roten Punkte beheben. Gelbe Hinweise beheben oder der Lehrkraft begründen.
- **Sieh dir die Screenshots selbst an** (Fünf-Sekunden-Test: Sieht man sofort, was man anfassen kann? Ist klar, was zu tun ist? Ist nichts abgeschnitten? Steht im Arbeitsbereich nur, was zur Aufgabe gehört?).
- Die Punkte unter **Interaktivität** (Szene in jeder Station, Vorführung, Szene ganz sichtbar, Textbudget) behandelst du wie Muss-Punkte: Gelb nur mit Begründung gegenüber der Lehrkraft.
- Ist Playwright nicht installiert, versuche `pip install playwright && playwright install chromium`; klappt das nicht, sag der Lehrkraft, dass der Browser-Test fehlt, und bitte sie, das Paket einmal komplett durchzuspielen.
- Rechnungen, Musterlösungen und Zuordnungen fachlich gegenprüfen (bei Zahlen mit Code nachrechnen).

### 6. ZIP bauen und übergeben

```bash
python3 <skill>/scripts/paket.py zip <paketordner>
```

Das baut zuerst `js/inhalt.js` aus `quelle/`, aktualisiert die Dateiliste im Manifest, übernimmt Titel, ID und Version aus `js/inhalt.js`, entfernt einen alten masteryscore und legt `<name>_scorm12.zip` neben den Ordner. Der Ordner `quelle/` kommt nicht ins ZIP. Gib der Lehrkraft das ZIP und diese Hinweise:

1. In der ByCS-Lernplattform im Kurs eine Aktivität **„Lernpaket“** (SCORM) anlegen und das ZIP hochladen.
2. Empfohlene Einstellungen: Versuche unbegrenzt, Bewertungsmethode „Höchste Bewertung“, Anzeige in neuem Fenster oder mindestens 1000 px breit. Wird der Aktivitätsabschluss genutzt: an den Status „Abgeschlossen“ binden, nicht an „Bestanden“ – das Paket meldet nie bestanden. Die Punktzahl der Selbstüberprüfung ist als Information gedacht, nicht als Note.
3. Vor dem ersten Einsatz einmal mit einem Schülertestkonto durchspielen (kommen Punktzahl und „abgeschlossen“ an?).
4. Danach: Review durch eine Kollegin oder einen Kollegen (Skill `lernpaket-pruefen`) und **Kurztest mit drei bis fünf Schülern** mit dem Beobachtungsbogen `vorlagen-lehrkraft/erprobung.md` – der gehört zu jedem Paket.
5. Tafelbild: Im Input an der passenden Stelle `index.html#tafel` öffnen (als Link aus den Folien; F = Vollbild). Die Hinweise aus `tafelbild-notizen.md` in die Notizen der Folien übernehmen und einmal am echten Board ausprobieren.

Wenn in einem Repository mit mehreren Paketen gearbeitet wird (z. B. PING): Paketordner (mit `quelle/`) nach `packages/<name>/src/`, Steckbrief nach `packages/<name>/README.md`, Planung nach `packages/<name>/planung/`, Hinweise zum Tafelbild und Beobachtungsbogen nach `packages/<name>/lehrer/`; ZIPs nicht einchecken (`./build.sh` baut sie).

## Änderungen an bestehenden Paketen

Version in `quelle/paket.js` erhöhen (bei Paketen ohne `quelle/` in `js/inhalt.js`), Änderung im Steckbrief notieren, Fragen-IDs beibehalten (geänderte Frage = neue ID), danach Schritte 5 und 6.

**Ältere Pakete auf die aktuelle Vorlage heben:** `js/engine.js`, `js/baukasten.js`, `js/tafel.js`, `css/` und `index.html` aus `vorlage/` übernehmen; `inhalt.js` bleibt. Die alten Namen `nachweis`, `bestehen` und `einsatz: ['nachweis']` werden weiter gelesen (die Inhaltsprüfung nennt sie als Hinweis); umbenennen in `selbstueberpruefung`, `bereit` und `einsatz: ['selbstueberpruefung']`. `leitfrage` an Stationen mit Vorab-Frage entfernen, Kurz-Checks auf 2–3 Fragen kürzen, zwei bis vier Tafelbild-Szenen ergänzen. Danach Schritte 5 und 6; `paket.py zip` entfernt den masteryscore.

**Auf Quellen umstellen** (für Pakete, die weiter gepflegt werden): Ordner `quelle/` anlegen, `js/inhalt.js` nach `quelle/paket.js` verschieben, die Fragen aus `fragen: [...]` nach `quelle/fragen.md` übertragen (Format in `referenz/fragenformat.md`; Fragen, deren Grafik per Code entsteht, bleiben in `paket.js`), Text dabei von HTML auf Markdown umstellen (`<b>` → `**…**`, `<code>` → `` `…` ``). Fragen-IDs bleiben gleich. Dann `paket.py bauen` und Schritt 5.

## Grenzen

Fachliche Richtigkeit verantwortet die Lehrkraft; markiere Unsicheres ausdrücklich. Keine echten Schülerdaten, keine echten Firmennamen, keine Tracking- oder Fremddienste.

Stand: Lernpaket-Kompass 4.0
