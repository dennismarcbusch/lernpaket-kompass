# Format für Fragen und Paketinhalt (Kompass-Vorlage 2)

Alle Inhalte eines Pakets landen in `js/inhalt.js` als ein Objekt `window.PAKET`. Die Engine (`js/engine.js`) setzt daraus Start, Entdecken, Üben, Selbstüberprüfung und Abschluss zusammen und erfüllt dabei die technischen Punkte des Leitfadens automatisch. Die Beispieldatei in der Vorlage („Bits & Bytes“) zeigt jedes Feld im Einsatz.

## Quellen in `quelle/`

Geschrieben wird nicht in `js/inhalt.js`, sondern in den Quellen; `paket.py bauen` setzt `js/inhalt.js` daraus zusammen.

| Datei | Inhalt |
|---|---|
| `quelle/paket.js` | das Objekt `window.PAKET`: Texte, Lernziele, Stationen, Szenen, Übungen, Selbstüberprüfung, Merkblatt, Tafelbild |
| `quelle/fragen.md` | alle Fragen als Markdown (Format unten). So prüft die Lehrkraft die Fragen direkt in der Quelle, ohne JavaScript. |
| `quelle/bilder/*.svg` | Grafiken für Bildfragen und Hotspots (optional) |
| weitere `quelle/*.js` | eigene Geräte oder Gegenstände (z. B. `netz.js`); sie kommen vor `paket.js`. Andere Reihenfolge: `quelle/reihenfolge.txt` |

- **`js/inhalt.js` nie von Hand ändern**, wenn es `quelle/` gibt: Der nächste Build überschreibt es, und `pruefe_paket.py` meldet rot, wenn es nicht zu den Quellen passt. `paket.py zip` baut vorher selbst.
- **`quelle/` kommt nicht ins ZIP.** Die Quellen gehören ins Repository; im Paket steht nur das Gebaute.
- **Fragen mit Code** (z. B. ein Hotspot, dessen Grafik eine Funktion erzeugt) bleiben in `quelle/paket.js` unter `fragen: [...]`; der Build hängt die Fragen aus `fragen.md` an. Alles andere gehört in `fragen.md`.
- **Ältere Pakete ohne `quelle/`** laufen weiter: Dort ist `js/inhalt.js` selbst die Quelle, und `paket.py bauen` lässt es unverändert.
- Eine `fragen.md` lässt sich einzeln prüfen: `python3 <skill>/scripts/quellen.py quelle/fragen.md` (Fehler mit Zeilenangabe, Mengen je Lernziel und Einsatz; mit `--tabelle` eine Übersicht aller Fragen).

## Fragen in `quelle/fragen.md`

Jede Frage beginnt mit einer Überschrift `## ID · Lernziel · Typ · Einsatz` (statt `·` geht auch `|`). Darunter stehen der Fragetext, die Antworten und die Erklärung. Zeilen mit `# ` gliedern die Datei (z. B. `# LZ1 · Binär → dezimal`) und kommen nicht ins Paket; Text vor der ersten Frage auch nicht.

```markdown
## F7 · LZ2 · mc · check, selbstueberpruefung

Wie lautet **100** als 8-Bit-Binärzahl?

- [x] `01100100`
- [ ] `00100110` → Die Ziffern sind verdreht: Die 64 steht weiter links als die 4.
- [ ] `01100000` → Das ist 96: Der Rest 4 fehlt noch.

> 100 = 64 + 32 + 4 → 01100100.
```

| Teil | Schreibweise |
|---|---|
| Kopf | `## F7 · LZ2 · mc · check, selbstueberpruefung` – ID, Lernziel, Typ (`mc`, `zuordnen`, `zahl`, `text`, `hotspot`), Einsatz (`check`, `selbstueberpruefung`, `uebung`, `vorab`, mehrere mit Komma) |
| Fragetext | Absätze direkt unter dem Kopf; dazu Codeblöcke (```` ``` ````) und Tabellen (`\| … \|`). Listen gibt es im Fragetext nicht, weil `- ` eine Antwort beginnt. |
| Bild | `![Beschreibung](bilder/datei.svg)` unter dem Fragetext; nur SVG, wird eingebettet. Die Beschreibung liest der Screenreader vor. |
| Erklärung | Zeilen mit `> ` am Ende: warum die richtige Antwort richtig ist (P6). Pflicht. |
| Tipp | `Tipp: …` – erscheint nach einer falschen Antwort im Kurz-Check |
| Prüfnotiz | `Prüfen: …` – Frage an die Lehrkraft, kommt nicht ins Paket. `pruefe_paket.py` meldet offene Prüfnotizen gelb, bis die Zeile gelöscht ist. |

Antworten je Typ:

| Typ | Schreibweise |
|---|---|
| `mc` | `- [x] richtig` und `- [ ] falsch → Feedback zur Fehlvorstellung`; mehrere `[x]` → Mehrfachauswahl. Optional `Mischen: nein` (feste Reihenfolge) und `Mehrfach: ja` (Kästchen auch bei nur einer richtigen Antwort). |
| `zuordnen` | `- links = rechts` je Paar (3–5 sinnvoll); jede rechte Seite nur einmal. Optional `Wenn falsch: …` und `Wenn richtig: …`. |
| `zahl` | `= 129`, mit Toleranz und Einheit `= 2,5 ± 0,1 m` (Komma oder Punkt, ohne Tausenderpunkt). Typische Falschergebnisse: `- 13 → Feedback`. Optional `Wenn falsch: …`. |
| `text` | `= 00001100` – je richtige Schreibweise eine Zeile (Groß- und Kleinschreibung und doppelte Leerzeichen zählen nicht). Typische Falschantworten: `- 1100 → Feedback`. Befehle dürfen in Backticks stehen: `` = `ls -l` ``. Optional `Wenn falsch: …`. |
| `hotspot` | Bild ist Pflicht. Bereiche: `- [x] Router @ 120, 40, 60, 30` (Rechteck: x, y, Breite, Höhe in Koordinaten der SVG) oder `- [ ] Switch @ 300, 80, 25 → Feedback` (Kreis: x, y, Radius). Genau ein `[x]`; die Beschriftung vor `@` liest der Screenreader vor. |

Text in Markdown statt HTML: `**fett**`, `*kursiv*`, `` `Code` ``, `~~durchgestrichen~~`, `2^8^` (hochgestellt), `H~2~O` (tiefgestellt), Zeilenumbruch mit `\` am Zeilenende. Spitze Klammern und `&` erscheinen als Text (`a < b` schreibt man einfach so); HTML-Tags sind nicht vorgesehen und werden als Hinweis gemeldet. Soll ein Zeichen wörtlich stehen, kommt ein `\` davor, z. B. `\*` oder `\→` (ein Pfeil im Antworttext, der kein Feedback einleitet) oder `\=` (ein Gleichheitszeichen links in einem Paar). Ein Feedback beginnt mit `→` oder `->`.

Weitere Beispiele: `vorlage/quelle/fragen.md` (alle Typen außer Hotspot) und die Dateien `beispiele/*.fragen.md`.

## Frage als Objekt in `window.PAKET`

So steht eine Frage nach dem Build in `js/inhalt.js`; in dieser Form schreibt man nur Fragen mit Code (siehe oben) und Pakete ohne `quelle/`.

```js
{ id: 'F7', lz: 'LZ2', einsatz: ['check', 'selbstueberpruefung'], typ: 'mc',
  frage: 'Wie lautet <b>100</b> als 8-Bit-Binärzahl?',
  optionen: [
    { text: '<code>01100100</code>', richtig: true },
    { text: '<code>00100110</code>', feedback: 'Die Ziffern sind verdreht – die 64 steht weiter links als die 4.' },
    { text: '<code>01100000</code>', feedback: 'Das ist 96: Der Rest 4 fehlt noch.' }
  ],
  erklaerung: '100 = 64 + 32 + 4 → 01100100.' }
```

| Feld | Pflicht | Bedeutung |
|---|---|---|
| `id` | ja | eindeutig im Paket, z. B. `F7`. Wird als `S<Versuch>_F7` an die Lernplattform gemeldet und in der Auswertung genutzt. Nach dem ersten Einsatz nicht mehr umbenennen. |
| `lz` | ja | Lernziel, z. B. `LZ2` |
| `einsatz` | ja | Liste aus `check` (Kurz-Check), `selbstueberpruefung` (Pool für Teil B; älterer Name `nachweis` wird weiter gelesen), `uebung`, `vorab` (Vorab-Frage einer Station; früher `vorwissen`) |
| `typ` | ja | `mc`, `zuordnen`, `zahl`, `text`, `hotspot` (siehe unten) |
| `frage` | ja | Fragetext, HTML erlaubt |
| `erklaerung` | ja | Warum die richtige Antwort richtig ist (Feedback, P6) |
| `bild` | nein | Inline-SVG oder HTML über den Antworten (Bildfrage) |
| `hinweis` | nein | kurzer Tipp, der nach falscher Antwort im Kurz-Check erscheint |

## Fragetypen

- **`mc` – Multiple Choice / Bildfrage:** `optionen: [{text, richtig, feedback}]`. Sind mehrere Optionen richtig, wird automatisch Mehrfachauswahl („Kreuze alle richtigen an“) mit Teilpunkten. Jede Falschantwort bekommt ein `feedback`, das die zugrunde liegende Fehlvorstellung anspricht. Optionen werden gemischt (`mischen: false` schaltet das ab, z. B. bei „1 Bit, 2 Bit, 4 Bit“).
- **`zuordnen`:** `paare: [{links, rechts}]` (mindestens zwei, sinnvoll 3–5), optional `feedbackFalsch`. Rechte Seite wird gemischt angeboten.
- **`zahl`:** `zahl: {wert, toleranz, einheit}`; Komma und Punkt werden akzeptiert. `typisch: [{wert, feedback}]` für typische Fehlergebnisse.
- **`text`:** `akzeptiert: ['…']` mit allen richtigen Schreibweisen (Groß-/Kleinschreibung und doppelte Leerzeichen werden ignoriert). `typisch: [{antwort, feedback}]`.
- **`hotspot`:** `svg: '<svg viewBox="0 0 B H">…</svg>'` und `bereiche: [{x, y, w, h, label, richtig, feedback}]` (Rechteck) oder `{cx, cy, r, …}` (Kreis). Genau ein Bereich ist richtig; `label` wird vorgelesen (Barrierefreiheit).

## Paket

| Feld | Bedeutung |
|---|---|
| `id` | `<präfix>-<name>` (Präfix für Projekt oder Fach, z. B. `ping-`), gleich dem Identifier im Manifest |
| `titel`, `untertitel`, `dauer` | Anzeige |
| `version` | Pflicht, Form `'1.0'`. Steht klein in der Kopfzeile („v1.0“), in der Fußzeile und auf Ergebnis-PDF und Merkblatt; `paket.py zip` überträgt sie ins Manifest. Bei jeder Änderung erhöhen: Korrektur 1.0 → 1.1, neue Inhalte 2.0. |
| `bereit` | 80 (Leitfaden): Ab so viel Prozent in der Selbstüberprüfung „sitzt das Thema“. Die Selbstüberprüfung zählt nicht; begründet abweichbar. Älterer Name `bestehen` wird weiter gelesen |
| `welt` | Pflicht: `{thema, kulisse, symbol, farbe}` – eigene Welt des Pakets. `thema`: `wirtschaft`, `technik`, `sprache`, `natur`, `gesundheit`, `gestaltung` (setzt Farben und Standard-Kulisse); `kulisse`: `buero`, `lager`, `werkstatt`, `serverraum`, `laden`, `stadt`, `natur`, `klasse`; `symbol`: Emoji im Kopf; `farbe`: Akzentfarbe (Hex), nur wenn das Thema nicht passt |
| `figur` | `{name, rolle, aussehen}` der Story-Figur. `aussehen`: `{haut: 0–5, haare: 'schwarz'·'dunkelbraun'·'braun'·'rot'·'blond'·'grau'·'weiss' oder Hex, frisur: 'kurz'·'lang'·'zopf'·'dutt'·'locken'·'glatze'·'kopftuch', tuch (Farbe), kleidung (Farbe), krawatte (Farbe), brille, bart, ausdruck}` |
| `figuren` | optional weitere Personen: `{schluessel: {name, rolle, aussehen}}`; in Stationen über `figur: 'schluessel'` als Auftraggeber, in Szenen über `kit.szene(…).person('schluessel')` |
| `spiel` | optional: Spielrahmen `{titel, intro, ziel, zaehler: {name, symbol}}`; dann je Station `mission: {ort, symbol, ende}` (Ort auf der Karte, Story-Satz nach dem Lösen) |
| `simulation` | optional: **Simulationsmodus** `{titel, start(box, api)}` für Form A und B – ein Arbeitsgegenstand rechts, der über alle Kapitel erhalten bleibt, links die Lektion in Schritten (siehe „Simulationsmodus“ unten). Dann haben die Stationen `schritte` statt `interaktion`. |
| `spielwelt` | optional: **Spielmodus** `{titel, tab, start(box, api)}` – ein Spiel über alle Stationen (siehe „Spielmodus“ unten). Dann sind die Stationen Level: `{id, titel, lz, check (höchstens 3), mitdenken}` ohne eigene Szene. |
| `leitsituation` | Einstiegstext der Figur (HTML), höchstens etwa 40 Wörter: der einzige Fließtext auf der Startseite |
| `lernziele` | `[{id: 'LZ1', kurz, text: 'Ich kann …'}]` – drei bis acht. `kurz` (Pflicht, höchstens vier Wörter) steht als Etikett im Lernpfad der Startseite, `text` an jeder Station und im Abschluss |
| `vorwissen` | veraltet: Liste von Fragen-IDs. Wird nach Lernziel den Stationen zugeordnet, wenn diese kein `vorab` haben. Neu: `vorab` an der Station |
| `glossar` | `[{begriff, erklaerung, vorab}]` – alle Fachbegriffe, unter jeder Station und Übung aufklappbar. `vorab: 'S1'` stellt den Begriff an dieser Station als „Neu hier“ neben der Szene vor (Vortraining); `vorab: true` bedeutet Station 1 |
| `stationen` | `[{id, titel, lz: [...], figur, mission, auftrag, inhalt, interaktion (Pflicht), selbsterklaerung: {schritt, frage}, steckbrief, vertiefung, mitdenken: {auftrag, muster}, beruf, check: [Fragen-IDs], vorab: Fragen-ID}]`. `vorab` ist die Vorab-Frage am Stationsanfang („Was vermutest du?“, zählt nicht) und zugleich die **Leitfrage**: Sie bleibt über der Szene stehen, und der Kurz-Check löst sie als erste Frage auf. Sie zielt auf den Kern der Station, ist schwer zu erraten (Zahl, Text, Zuordnen, Mehrfachauswahl) und steht nicht zusätzlich in `check`. Richtig beantwortet, darf die Station übersprungen werden; alle Vorab-Fragen zusammen bilden die Abkürzung „Ich kenne mich schon aus“. Ein eigenes Feld `leitfrage` nur an Stationen ohne Vorab-Frage. `check`: 2–3 Fragen (ohne Vorab-Frage 2–4). `vorab: false` schaltet die Zuordnung aus `vorwissen` ab. `inhalt` steht als „Kurz erklärt“ in der Notiz neben der Szene (höchstens etwa 40 Wörter). Ohne Szene nur mit `ohneInteraktion: 'Begründung'`; dann wird `beispiel: {titel, aufgabe, schritte: [{tun, warum}]}` als Text gezeigt. |
| `uebungen` | `[{id, titel, lz, figur, auftrag, interaktion (wo möglich) oder frage (ID), tipps: [Denkanstoß, Teillösung, Lösung], mitdenken: {auftrag, muster}, reflexion: {frage, muster}, steckbrief}]` |
| `selbstueberpruefung` | `{dauer, gewichtA (Prozent, Standard 50), einleitung, danach, teilA: {titel, figur, auftrag, inhalt, interaktion}, teilB: {proLZ: 2}}`. Zählt nicht, beliebig oft wiederholbar. `danach` (optional): ein Satz, was folgt, wenn das Thema sitzt, z. B. der Kompetenznachweis in der Lernplattform. Älterer Name `nachweis` wird weiter gelesen |
| `merkblatt` | `[{lz, titel, zeilen: [{text mit ___, loesung}], fehler, beispiel, schema}]` |
| `selbsttest` | fünf Fragen-IDs für die Rückseite des Merkblatts |
| `tafel` | Tafelbild: zwei bis vier Szenen für den Mittelteil des Inputs (siehe „Tafelbild“ unten). Gehört zu jedem Paket (Soll); ohne dieses Feld meldet die Inhaltsprüfung einen Hinweis. |
| `fragen` | Fragenpool (siehe oben) |

## Zum Mitdenken anregen (generatives Lernen)

- **`selbsterklaerung: {schritt, frage}`** (an der Station) – an einem entscheidenden Schritt der Vorführung (`demo`, Nummer ab 1) wird dessen `warum` zunächst verborgen. Die Lernenden lesen die Frage („Warum rechnest du mit 72 weiter?“), überlegen und schreiben, dann klappen sie die Begründung auf. Jede Vorführung sollte eine solche Frage haben.
- **`mitdenken: {auftrag, muster}`** – kurzer Auftrag nach einer Station oder Übung: skizzieren, in eigenen Worten zusammenfassen, jemand anderem erklären. Die Musterlösung lässt sich zum Vergleich aufklappen. Einträge werden nicht gespeichert.

## Ton und Video

Die Vorlage nutzt keinen Ton. Wer Ton oder Video einbaut, liefert immer den Text mit (Untertitel per `<track>` oder ein Transkript direkt darunter) und vermittelt nichts nur über Ton.

## Interaktionen (Szenen zum Anfassen)

Jede Station ist eine Szene (Leitfaden P12). Die Szene steht groß in der Mitte (die „Bühne“), daneben eine schmale Notiz mit „Kurz erklärt“, Live-Erklärungen und Steckbrief. Szenen sind Funktionen in `quelle/paket.js` (oder einer eigenen Datei in `quelle/`):

```js
interaktion: function (box, api) {
  // box: die Bühne – hier wird die Szene gebaut, am besten mit dem Baukasten api.kit
  // api.erledigt('Text')        → Station/Übung gelöst (zeigt Erfolg, öffnet den Kurz-Check)
  // api.meldung('Text', art)    → Rückmeldung unter der Szene; art 'ok' | 'bad' | 'warn' | ''
  // api.erklaere('<p>…</p>')    → Erklärung in der Notiz, genau passend zur Handlung
  // api.sage('Text', ausdruck)  → die Auftrag-Figur reagiert in ihrer Sprechblase
  // api.demo()                  → true, solange die Vorführung läuft (dann zählt nichts)
  return {
    demo: [                      // Lösungsbeispiel als Vorführung in der Szene („Zeig's mir"), an einem ANDEREN Fall
      { text: 'Was ich jetzt tue', warum: 'Warum das richtig ist', tun: function () { /* bewegt die Szene */ } }
    ],
    zuruecksetzen: function () { /* nach der Vorführung: Szene in den Aufgabenzustand */ },
    loesen: function () { /* setzt die Musterlösung ein – Pflicht, für den automatischen Test */ },
    auswerten: function () { /* nur Selbstüberprüfung Teil A: [{lz: 'LZ1', text: 'Prüfpunkt', ok: true}] */ }
  };
}
```

Regeln:

- **Szene zuerst:** Zu jeder Station die vier Fragen aus `szenen.md` beantworten (Was sehen, was bewegen, woran Erfolg erkennen, was passiert bei Fehlern).
- **Sichtbar ohne Scrollen,** mindestens etwa 300 px hoch; Text neben der Szene knapp (Textbudget in `szenen.md`).
- **Vorführung statt Text-Beispiel:** `demo` mit 2–4 Schritten an einem anderen Fall; `selbsterklaerung` an einem entscheidenden Schritt.
- **Realistische Rückmeldung:** Fehler wirken sich aus wie in echt (der Server antwortet nicht, die Kundin fragt nach), dazu ein Satz zur Fehlvorstellung (`api.meldung`) oder eine Reaktion der Figur (`api.sage`).
- **Bedienung:** Antippen statt nur Ziehen (Tablet), per Tastatur bedienbar (`<button>`), Ziele mindestens 40 px. In der Szene keine Knöpfe mit der Klasse `primaer` – der eine hervorgehobene Knopf ist „Weiter“ unten.
- **Technik:** Beschriftungen direkt im Bild, Farben über CSS-Variablen (`var(--accent)`, `var(--ok)` usw.), keine externen Dateien, keine `alert/confirm/prompt`.
- **Selbstüberprüfung Teil A:** Die Szene läuft ohne Notiz; `meldung` und `erklaere` sind dort stumm (Rückmeldung erst nach dem Abgeben). Fehler wirken sich, wo möglich, realistisch aus; `sage` nur für neutrale Story-Sätze.

## Simulationsmodus (`PAKET.simulation`)

Für Form A und B (Simulation, interaktive Illustration, P12), wenn **ein** Arbeitsgegenstand das ganze Paket trägt: ein Registerportal, eine Konsole, ein Netzplan, ein Formular, eine Werkstatt. Vorbild sind Tutorials wie „Shell Yeah!“: links die Lektion, rechts der Gegenstand, der sich nie zurücksetzt. Die Stationen heißen für die Lernenden **Kapitel**, jedes Kapitel hat 2–6 **Schritte**. Im Entdecken steht links die Lektionskarte (Lernziel, „Neu hier“, Schrittpunkte, Auftrag der Figur, Kurz erklärt, Knöpfe), rechts die Bühne mit dem Gegenstand, auf großen Bildschirmen mitlaufend. Auf schmalen Bildschirmen folgt der Gegenstand direkt auf den Schritt; Kurz-Check und Mitdenken stehen darunter.

```js
simulation: { titel: 'Arbeitsplatz Einkauf · Registerportal und Prüfliste', start: function (box, api) {
  // box: leeres Element für den Gegenstand. Nach JEDER Änderung api.geaendert() melden.
  // api.kit, api.erklaere, api.meldung, api.sage wie in Szenen (stumm, während loesen nachgespielt wird)
  return partnerCheck(box, ['hartmann', 'ostwind'], api.geaendert);  // Objekt mit Zustand und Befehlen
} },
stationen: [ { id: 'K1', titel: 'Gibt es Hartmann Elektro wirklich?', lz: ['LZ1'], vorab: 'VA', check: ['C1', 'C2', 'C3'],
  schritte: [
    { zeigen: true, auftrag: 'Such die Firma im Registerportal.', erklaerung: 'Das Portal ist öffentlich …',
      frage: 'Warum darf jeder ins Register schauen?', warum: 'Wer Geschäfte macht, soll sich …',
      pruefe: function (sim) { return sim.gefunden('hartmann'); },
      loesen: function (sim) { sim.suchen('Hartmann'); } },
    { auftrag: 'Öffne den aktuellen Abdruck.', tipp: 'Rechts in der Trefferliste.', loesungText: 'Im Treffer auf „Aktueller Abdruck“ tippen.',
      pruefe: function (sim) { return sim.stand().offen === 'hartmann'; },
      loesen: function (sim) { sim.oeffne('hartmann'); } }
  ],
  mitdenken: { auftrag, muster } } ]
```

- **Ein Schritt = eine Handlung am Gegenstand** mit genau einem neuen Gedanken (SQL-Island-Prinzip ohne Spiel). `auftrag` (Sprechblase, 1–2 Sätze), optional `erklaerung` (Kurz erklärt, höchstens etwa 40 Wörter), `tipp` und `loesungText` (Satz, der nach „Lösung zeigen“ erscheint).
- **`pruefe(sim)`** erkennt den Erfolg am Zustand, nicht an einem bestimmten Klick: Jeder richtige Weg zählt (z. B. Suche mit „hartm“). Die Engine prüft nach jedem `api.geaendert()` und hakt den Schritt ab. Er darf vor dem Handeln nicht schon erfüllt sein.
- **`loesen(sim)`** führt den Schritt vollständig aus (auch nötige Wege, etwa erst suchen, dann öffnen) und muss `pruefe` erfüllen. Es dient für „Lösung zeigen“, für den automatischen Test und für den **Wiedereinstieg**: Nach dem Neuladen baut die Engine den Gegenstand neu und spielt `loesen` aller früheren Schritte still nach. Gespeichert werden nur die erledigten Schritte, nicht der Gegenstand.
- **`zeigen: true`** macht einen Schritt zur Vorführung („Zeig’s mir“): Die Figur macht ihn vor, `frage`/`warum` dienen als Frage zum Selbsterklären. Mindestens der erste Schritt eines Kapitels, in dem etwas Neues bedient wird.
- **Zustand gehört dem Gegenstand:** Was die Lernenden tun, bleibt stehen, auch über Kapitel hinweg. „↺ Schritt neu“ baut den Gegenstand bis vor diesen Schritt neu auf.
- **Kurz-Check** (erst die Auflösung der Vorab-Frage, dann 2–3 Fragen) öffnet sich, wenn alle Schritte des Kapitels erledigt sind, danach einmal je Lernziel die Einschätzung; die Vorab-Frage steht vor dem ersten Schritt und bleibt als Leitfrage stehen.
- **Üben und Selbstüberprüfung Teil A** bauen denselben Gegenstand mit **neuen Fällen** als `interaktion(box, api)` (Übung: `api.erledigt()`, Tipps; Selbstüberprüfung: `auswerten()` mit Prüfpunkten je Lernziel, keine Hilfen). Auch die Tafelbild-Szenen nutzen den Gegenstand (`zeichne`).
- Eigener Stil des Gegenstands als `<style>` mit Präfix (z. B. `.pc-…`) in `quelle/paket.js`, damit die Vorlage unverändert bleibt.
- Beispiel: `beispiele/simulation-handelsregister.js` („Partner-Check“: Registerportal und Prüfliste).

## Spielmodus (`PAKET.spielwelt`)

Nur für Form D (Lernspiel durchgehend, P12); ein Spiel nur zum Üben (Form C) ist dagegen die `interaktion` einer Übung. Die Engine zeigt unter „① <tab>“ eine große Spielbühne (`.spielbuehne`, mindestens 450 px hoch), darunter die Zwischenbilanz der geschafften Level und das Glossar.

```js
spielwelt: { titel: 'Stempel drauf!', tab: 'Am Schalter', start: function (box, api) {
  // box: leeres Element für das Spiel. Eigener Stil als <style> mit Präfix (z. B. .st-…)
  // api.level(id, text)  Level geschafft (= Station erledigt); Zwischenbilanz erscheint
  // api.geschafft(id)    schon geschafft?          api.levels()  [{id, titel, lz, geschafft}]
  // api.speicher(k[, v]) kleiner Spielstand in suspend_data (wenige Zeichen! Grenze 4096 für alles)
  // api.kit              Baukasten (figur, kulisse, dialog, mischen, wackeln …)
  return { loesen: function () { /* alle Level richtig durchspielen, für pruefe_paket.py */ } };
} },
stationen: [ { id: 'S1', titel: 'Woche 1 · …', lz: ['LZ1', 'LZ2'], check: ['C1', 'C3', 'C4'], mitdenken: { auftrag, muster } } ]
```

- **Lernstoff als Spielregel:** Die Spielmechanik prüft das Lernziel (richtiger Ball, richtiger Stempel). Fehler haben eine Folge im Spiel und eine Erklärung; danach geht es weiter oder das Level startet neu.
- **Lösungsbeispiel im Spiel:** Der erste Fall eines Levels wird geführt (Tutorial mit Hervorhebung), danach spielt man allein.
- **Das Spiel vermittelt selbst (SQL-Island-Prinzip):** Jeder Schritt bringt genau ein neues Konzept als Teil der Geschichte, mit kurzem Hinweis in der Sprechblase; Regelbuch oder Übersicht liegt zum Nachschlagen neben dem Spiel.
- **Spiel nur zum Üben (Form C):** kein Spielmodus, sondern die `interaktion` einer Übung (eine Übung je Runde oder eine Übung mit mehreren Runden, `api.erledigt()` am Ende); das Entdecken bleibt eine Simulation bzw. Illustration.
- **Üben und Selbstüberprüfung Teil A** nutzen dieselbe Mechanik als Funktion `interaktion(box, api)` mit neuen Fällen: in Übungen mit Rückmeldung und `api.erledigt()`, in der Selbstüberprüfung ohne Rückmeldung und Hilfen, `auswerten()` liefert Prüfpunkte je Lernziel.
- Die Musterlösung `loesen()` muss ohne Animationen sofort durchlaufen (der Test wartet nicht).
- Beispiele: `beispiele/spiel-stempel-drauf.js` (Schalter-Simulator) und `beispiele/spiel-firmendex.js` (Sammel- und Fangspiel mit Karte).

## Baukasten (`api.kit`, js/baukasten.js)

Fertige Bausteine für Szenen. Alle sind per Antippen und Tastatur bedienbar und übernehmen die Farben der Paketwelt. Beispiel mit Rechner, Portal, Dokument und Gespräch: `beispiele/wirtschaft-handelsregister.js`.

| Baustein | Aufruf (Kurzform) | Gibt zurück |
|---|---|---|
| Figur | `kit.figur('schluessel' oder aussehen, {ausdruck, rund})` | SVG-Text (Brustbild) |
| Kulisse | `kit.kulisse('buero')` | SVG-Text (Hintergrund) |
| Szene | `kit.szene(box, {kulisse, hoehe})` | `{ebene, person(key, {links, rechts, text, groesse}), ding(node, {links, oben})}`; Person: `sage(text, ausdruck)` |
| Gespräch | `kit.dialog(box, {figur, schritte: [{sagt} oder {frage, antworten: [{text, richtig, reaktion}]}], fertig(fehler)})` | `{loesen(), fehler()}` |
| Rechner | `kit.computer(box, {apps: [{id, name, symbol, start(fenster, os, daten)}], start})` | `os` mit `oeffne(id, daten)` |
| Browser | `kit.browser(fenster, {adresse, seiten: {'/': fn(seite, nav, daten)}, beiSeite})` | `{nav(pfad, daten), seite()}` |
| Postfach | `kit.mail(fenster, {mails: [{id, von, betreff, text, anhang: {name, oeffnen}}], offen: id, beiOeffnen})` | Element |
| Formular | `kit.formular(box, {titel, felder: [{id, label, typ: 'text'·'zahl'·'auswahl', optionen, richtig, hinweis}], knopf, beiSenden(werte, ok), ohneRueckmeldung})` | `{setze(werte), sende(), werte()}` |
| Dokument | `kit.dokument(box, {kopf, titel, zeilen: [{id, label, wert}], fuss, stempel, beiWahl(id)})` | `{markiere(id, 'markiert'·'richtig'·'falsch'), zeile(id)}` |
| Sortieren | `kit.sortieren(box, {karten: [{id, html, ziel}], faecher: [{id, titel, html}], beiFehler, beiRichtig, fertig})` | `{loesen(), lage(), richtig()}` |
| Reihenfolge | `kit.reihenfolge(box, {schritte: [html in richtiger Folge], beiFehler, fertig})` | `{loesen()}` |
| Regler | `kit.regler(box, {label, min, max, schritt, wert, einheit, format, beiAenderung(wert)})` | `{wert(), setze(v)}` |
| Helfer | `kit.el(tag, attrs, kinder)`, `kit.esc`, `kit.mischen`, `kit.wackeln(node)` | |

Eigene Geräte oder Grafiken (z. B. `routerGeraet` im Beispiel) stehen oben in `quelle/paket.js` oder in einer eigenen Datei in `quelle/` (z. B. `quelle/router.js`); ihr Stil darf dort als `<style>` ergänzt werden, nicht in `stil.css`.

## Tafelbild

Baustein für den Input der Lehrkraft (Leitfaden C2): Der Input läuft auf Folien; das Tafelbild ersetzt nur den Mittelteil, also Erklären und Beispiel. `js/tafel.js` zeigt die Szenen als Präsentation: groß, ohne erklärenden Text, Schritt für Schritt. Zwei bis vier Szenen gehören zu jedem Paket (Soll); sie entstehen aus den Szenen der Stationen.

```js
tafel: {
  titel: 'Bits & Bytes – Erklären und Beispiel',
  szenen: [
    { id: 'stellenwerte', titel: 'Stellenwerte', station: 'S1',
      erklaerung: '<p>Kurz, für Schüler zuschaltbar …</p>',
      zeichne: function (buehne, api) {
        // buehne: leeres <div> (Flex-Spalte, füllt den Bildschirm)
        // api.werkzeug({ icon, text, taste, typ: 'knopf'|'schalter'|'modus', gruppe, an, aktion(an, knopf) })
        //   → Knopf in der unteren Leiste mit Tastenkürzel; Rückgabe { setze(an), knopf }
        // api.praesentation → true, wenn ohne Erklärungen gestartet (index.html#tafel)
        return { aufraeumen: function () { /* Animationen stoppen */ } };
      } }
  ]
}
```

| Feld | Pflicht | Bedeutung |
|---|---|---|
| `titel` | nein | Anzeige im Tafelbild |
| `szenen[].titel` | ja | kurzer Name (2–3 Wörter); erscheint nur mit eingeschalteten Erklärungen |
| `szenen[].station` | ja | ID der Station, die das Thema vertieft – das Tafelbild zeigt nichts, was im Paket fehlt |
| `szenen[].erklaerung` | ja | 2–4 kurze Sätze für Schüler, die das Tafelbild selbst öffnen |
| `szenen[].zeichne` | ja | baut die Szene; nutzt dieselben Bausteine wie die Interaktionen der Stationen |

Regeln:

- **Kein erklärender Text auf der Bühne.** Erlaubt: Beschriftungen im Bild, Zahlen, Symbole. Die Lehrkraft erklärt mündlich; die Erklärung steht in `erklaerung`.
- **Zwei bis vier Szenen**, je Szene eine Kernaussage. Einstieg, Üben und Sicherung des Inputs laufen auf den Folien, nicht im Tafelbild.
- Jede Szene trägt das Muster **Vorhersagen → Klicken → Deuten**: Werkzeuge so anlegen, dass die Lehrkraft erst fragen und dann auslösen oder aufdecken kann (Schalter „Anzahl zeigen“, „Dezimal“ usw.).
- Groß zeichnen: Die Bühne ist so breit wie der Beamer; Schrift und Linien in der Szene größer als in der Station.
- Werkzeuge mit sprechendem Kurztext und Tastenkürzel; Kürzel `e`, `p`, `w`, `f`, Ziffern und Pfeiltasten sind vom Tafelbild belegt.
- Nichts speichern: keine SCORM-Aufrufe, kein `localStorage`.
- Zugang über den Knopf „Tafelbild“ in der Kopfzeile und über `index.html#tafel` (Link aus den Folien); auf der Startseite steht kein Hinweis.
- Einen eigenen Ablaufplan gibt es nicht: Was die Lehrkraft für die Notizen ihrer Folien braucht (ab wo das Tafelbild übernimmt, Klicks und Tasten, Vorhersage-Frage, erwartete Fehlvorstellung, Kernaussage, Rückweg), steht in `lehrer/tafelbild-notizen.md` (Vorlage im Skill `lernpaket-bauen`).
- Die Szene darf die Interaktion einer Übung oder den Gegenstand der Simulation wiederverwenden (Beispiele: `beispiele/simulation-handelsregister.js`, `beispiele/spiel-stempel-drauf.js`).

## Mengen (Richtwerte aus dem Leitfaden)

- Szene: in jeder Station (Pflicht), mit Vorführung (`demo`, 2–4 Schritte) und Selbsterklär-Frage.
- Text: höchstens etwa 90 Wörter in Auftrag und „Kurz erklärt“ je Station (die Vorab-Frage zählt nicht mit); im Simulationsmodus höchstens etwa 60 Wörter je Schritt, 2–6 Schritte je Kapitel.
- Kurz-Check: 2–3 Fragen je Station, dazu kommt von selbst die Auflösung der Vorab-Frage (ohne Vorab-Frage 2–4); mindestens eine Frage je Lernziel der Station; ab Station 3 eine Frage zu früheren Stationen (P10).
- Selbstüberprüfung Teil B: `proLZ` = 2 Fragen je Lernziel pro Versuch; im Pool mindestens 4 je Lernziel, damit Wiederholungen nicht dieselben Fragen ziehen.
- Teil A: Prüfpunkte so verteilen, dass jedes Lernziel zusammen mit Teil B mindestens zwei Prüfungen hat.
- Selbsttest: 5 Fragen, aus allen Lernzielen gemischt.
- Tafelbild: zwei bis vier Szenen.
- Einschätzung: nichts zu tun – die Engine fragt einmal je Lernziel, an der letzten Station, die das Lernziel behandelt.
