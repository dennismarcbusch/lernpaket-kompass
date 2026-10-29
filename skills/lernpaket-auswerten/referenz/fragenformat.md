# Format für Fragen und Paketinhalt (Kompass-Vorlage 2)

Alle Inhalte eines Pakets stehen in `js/inhalt.js` als ein Objekt `window.PAKET`. Die Engine (`js/engine.js`) setzt daraus Start, Entdecken, Üben, Nachweis und Abschluss zusammen und erfüllt dabei die technischen Muss-Punkte des Leitfadens automatisch. Die Beispieldatei in der Vorlage („Bits & Bytes“) zeigt jedes Feld im Einsatz.

## Frage

```js
{ id: 'F7', lz: 'LZ2', einsatz: ['check', 'nachweis'], typ: 'mc',
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
| `id` | ja | eindeutig im Paket, z. B. `F7`. Wird als `N<Versuch>_F7` an die Lernplattform gemeldet und in der Auswertung genutzt. Nach dem ersten Einsatz nicht mehr umbenennen. |
| `lz` | ja | Lernziel, z. B. `LZ2` |
| `einsatz` | ja | Liste aus `check` (Kurz-Check), `nachweis` (Pool für Teil B), `uebung`, `vorwissen` |
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
| `bestehen` | 80 (Leitfaden) |
| `welt` | Pflicht: `{thema, kulisse, symbol, farbe}` – eigene Welt des Pakets. `thema`: `wirtschaft`, `technik`, `sprache`, `natur`, `gesundheit`, `gestaltung` (setzt Farben und Standard-Kulisse); `kulisse`: `buero`, `lager`, `werkstatt`, `serverraum`, `laden`, `stadt`, `natur`, `klasse`; `symbol`: Emoji im Kopf; `farbe`: Akzentfarbe (Hex), nur wenn das Thema nicht passt |
| `figur` | `{name, rolle, aussehen}` der Story-Figur. `aussehen`: `{haut: 0–5, haare: 'schwarz'·'dunkelbraun'·'braun'·'rot'·'blond'·'grau'·'weiss' oder Hex, frisur: 'kurz'·'lang'·'zopf'·'dutt'·'locken'·'glatze'·'kopftuch', tuch (Farbe), kleidung (Farbe), krawatte (Farbe), brille, bart, ausdruck}` |
| `figuren` | optional weitere Personen: `{schluessel: {name, rolle, aussehen}}`; in Stationen über `figur: 'schluessel'` als Auftraggeber, in Szenen über `kit.szene(…).person('schluessel')` |
| `spiel` | optional: Spielrahmen `{titel, intro, ziel, zaehler: {name, symbol}}`; dann je Station `mission: {ort, symbol, ende}` (Ort auf der Karte, Story-Satz nach dem Lösen) |
| `spielwelt` | optional: **Spielmodus** `{titel, tab, start(box, api)}` – ein Spiel über alle Stationen (siehe „Spielmodus“ unten). Dann sind die Stationen Level: `{id, titel, lz, check (höchstens 3), mitdenken}` ohne eigene Szene. |
| `leitsituation` | Einstiegstext der Figur (HTML) |
| `lernziele` | `[{id: 'LZ1', kurz, text: 'Ich kann …'}]` – drei bis acht |
| `vorwissen` | Liste von Fragen-IDs für den freiwilligen Vorwissens-Check (eine je Lernziel) |
| `glossar` | `[{begriff, erklaerung, vorab}]` – alle Fachbegriffe; `vorab: true` stellt den Begriff schon auf der Startseite vor (Vortraining). Unter jeder Station und Übung aufklappbar. |
| `stationen` | `[{id, titel, lz: [...], figur, mission, auftrag, leitfrage, inhalt, interaktion (Pflicht), selbsterklaerung: {schritt, frage}, steckbrief, vertiefung, mitdenken: {auftrag, muster}, beruf, check: [Fragen-IDs]}]`. `inhalt` steht als „Kurz erklärt“ in der Notiz neben der Szene (höchstens etwa 40 Wörter). Ohne Szene nur mit `ohneInteraktion: 'Begründung'`; dann wird `beispiel: {titel, aufgabe, schritte: [{tun, warum}]}` als Text gezeigt. |
| `uebungen` | `[{id, titel, lz, figur, auftrag, interaktion (wo möglich) oder frage (ID), tipps: [Denkanstoß, Teillösung, Lösung], mitdenken: {auftrag, muster}, reflexion: {frage, muster}, steckbrief}]` |
| `nachweis` | `{dauer, gewichtA (Prozent, Standard 50), einleitung, teilA: {titel, figur, auftrag, inhalt, interaktion}, teilB: {proLZ: 2}}` |
| `merkblatt` | `[{lz, titel, zeilen: [{text mit ___, loesung}], fehler, beispiel, schema}]` |
| `selbsttest` | fünf Fragen-IDs für die Rückseite des Merkblatts |
| `tafel` | optional: Tafelbild für einen freiwilligen Lehrer-Input (siehe „Tafelbild“ unten). Ohne dieses Feld gibt es kein Tafelbild. |
| `fragen` | Fragenpool (siehe oben) |

## Zum Mitdenken anregen (generatives Lernen)

- **`selbsterklaerung: {schritt, frage}`** (an der Station) – an einem entscheidenden Schritt der Vorführung (`demo`, Nummer ab 1) wird dessen `warum` zunächst verborgen. Die Lernenden lesen die Frage („Warum rechnest du mit 72 weiter?“), überlegen und schreiben, dann klappen sie die Begründung auf. Jede Vorführung sollte eine solche Frage haben.
- **`mitdenken: {auftrag, muster}`** – kurzer Auftrag nach einer Station oder Übung: skizzieren, in eigenen Worten zusammenfassen, jemand anderem erklären. Die Musterlösung lässt sich zum Vergleich aufklappen. Einträge werden nicht gespeichert.

## Ton und Video

Die Vorlage nutzt keinen Ton. Wer Ton oder Video einbaut, liefert immer den Text mit (Untertitel per `<track>` oder ein Transkript direkt darunter) und vermittelt nichts nur über Ton.

## Interaktionen (Szenen zum Anfassen)

Jede Station ist eine Szene (Leitfaden P14). Die Szene steht groß in der Mitte (die „Bühne“), daneben eine schmale Notiz mit „Kurz erklärt“, Live-Erklärungen und Steckbrief. Szenen sind Funktionen in `inhalt.js`:

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
    auswerten: function () { /* nur Nachweis Teil A: [{lz: 'LZ1', text: 'Prüfpunkt', ok: true}] */ }
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
- **Nachweis Teil A:** Die Szene läuft ohne Notiz; `meldung` und `erklaere` sind dort stumm. Fehler wirken sich, wo möglich, realistisch aus; `sage` nur für neutrale Story-Sätze.

## Spielmodus (`PAKET.spielwelt`)

Ergebnis der Phase „Erfinden“, wenn die Wahl auf ein richtiges Spiel fällt (P12). Die Engine zeigt unter „① <tab>“ eine große Spielbühne (`.spielbuehne`, mindestens 450 px hoch), darunter die Zwischenbilanz der geschafften Level und das Glossar.

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
- **Üben und Nachweis Teil A** nutzen dieselbe Mechanik als Funktion `interaktion(box, api)` mit neuen Fällen: in Übungen mit Rückmeldung und `api.erledigt()`, im Nachweis ohne Rückmeldung und Hilfen, `auswerten()` liefert Prüfpunkte je Lernziel.
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

Eigene Geräte oder Grafiken (z. B. `routerGeraet` im Beispiel) stehen oben in `inhalt.js`; ihr Stil darf dort als `<style>` ergänzt werden, nicht in `stil.css`.

## Tafelbild (optional)

Für Pakete mit einem freiwilligen Lehrer-Input (Leitfaden C2). `js/tafel.js` zeigt die Szenen als Präsentation: groß, ohne erklärenden Text, Schritt für Schritt. Nicht jedes Paket braucht das – sinnvoll vor allem bei Simulationen, Abläufen und Vergleichen.

```js
tafel: {
  titel: 'Bits & Bytes – Überblick',
  dauer: '15 Minuten',
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
| `titel`, `dauer` | nein | Anzeige im Dialog und auf der Startseiten-Karte |
| `szenen[].titel` | ja | kurzer Name (2–3 Wörter); erscheint nur mit eingeschalteten Erklärungen |
| `szenen[].station` | ja | ID der Station, die das Thema vertieft – das Tafelbild zeigt nichts, was im Paket fehlt |
| `szenen[].erklaerung` | ja | 2–4 kurze Sätze für Schüler, die das Tafelbild selbst öffnen |
| `szenen[].zeichne` | ja | baut die Szene; nutzt dieselben Bausteine wie die Interaktionen der Stationen |

Regeln:

- **Kein erklärender Text auf der Bühne.** Erlaubt: Beschriftungen im Bild, Zahlen, Symbole. Die Lehrkraft erklärt mündlich; die Erklärung steht in `erklaerung`.
- **Höchstens etwa sechs Szenen** für 20 Minuten, je Szene eine Kernaussage. Die **letzte Szene sichert** (z. B. Vergleich mit aufdeckbaren Kennzahlen).
- Jede Szene trägt das Muster **Vorhersagen → Klicken → Deuten**: Werkzeuge so anlegen, dass die Lehrkraft erst fragen und dann auslösen oder aufdecken kann (Schalter „Anzahl zeigen“, „Dezimal“ usw.).
- Groß zeichnen: Die Bühne ist so breit wie der Beamer; Schrift und Linien in der Szene größer als in der Station.
- Werkzeuge mit sprechendem Kurztext und Tastenkürzel; Kürzel `e`, `p`, `w`, `f`, Ziffern und Pfeiltasten sind vom Tafelbild belegt.
- Nichts speichern: keine SCORM-Aufrufe, kein `localStorage`.
- Zum Tafelbild gehört ein **Ablaufplan** für die Lehrkraft (`lehrer/input-ablauf.md`, Vorlage im Skill `lernpaket-bauen`).

## Mengen (Richtwerte aus dem Leitfaden)

- Szene: in jeder Station (Pflicht), mit Vorführung (`demo`, 2–4 Schritte) und Selbsterklär-Frage.
- Text: höchstens etwa 90 Wörter in Auftrag, Leitfrage und „Kurz erklärt“ je Station.
- Kurz-Check: 3–5 Fragen je Station, mindestens eine je Lernziel der Station; ab Station 3 eine Frage zu früheren Stationen (P10).
- Nachweis Teil B: `proLZ` = 2 Fragen je Lernziel pro Versuch; im Pool mindestens 4 je Lernziel, damit Wiederholungen nicht dieselben Fragen ziehen.
- Teil A: Prüfpunkte so verteilen, dass jedes Lernziel zusammen mit Teil B mindestens zwei Prüfungen hat.
- Selbsttest: 5 Fragen, aus allen Lernzielen gemischt.
