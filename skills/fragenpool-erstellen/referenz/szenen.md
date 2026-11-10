# Simulation, Spiel und Szenen: Was bewegen die Lernenden?

Ergänzung zu P12 (Handeln am Gegenstand: Simulation zuerst, jede Station eine Szene, Spiel nur begründet). **Zuerst** kommt die Form für das ganze Paket, dann je Station die Szene, zuletzt der Text. Die Form wird gewählt, wenn die Lernziele stehen (Phase „Zielen“ vor „Erfinden“): Der Gegenstand muss die Lernziele tragen.

## Die Form wählen (Phase „Erfinden“)

Vorbild sind die PING-Pakete: Dort trägt **ein Arbeitsgegenstand** das ganze Paket – der Server im Terminal („Shell Yeah!“, „Get-Going!“), das PC-Gehäuse („Plug & Pray“), der Lageplan zweier Gebäude („Strukturierte Verkabelung“). Der Lernstoff steckt in den Regeln dieses Gegenstands: Die Grafikkarte lässt sich erst ausbauen, wenn das Stromkabel ab ist; `ping` geht erst, wenn die Route stimmt; ein Kabel über 90 m meldet der Plan als Fehler.

Prüfe die Formen **in dieser Reihenfolge** und nimm die erste, die passt:

| Form | Wann | Wie | Vorbilder |
|---|---|---|---|
| **A Simulation** (Standard) | Es gibt einen Gegenstand, mit dem Fachleute bei diesem Thema arbeiten: Werkzeug, Programm, Gerät, Plan, Dokument, Portal, Gespräch | Derselbe Gegenstand durch Entdecken, Üben und Selbstüberprüfung (dort ein neuer Fall: anderer Kunde, anderer Server). Er reagiert wie in echt, auch auf Fehler. | Werkzeug mit Tutorial: Terminal, PowerShell, Tabellenkalkulation, Buchungsmaske · Gegenstand zerlegen und bauen: PC, Maschine, Schaltung · Planspiel: Verkabelung, Raum- oder Ablaufplanung, Kalkulation · Fallbearbeitung: Dokumente, Portal, Kundengespräch |
| **B Interaktive Illustration** | Der Inhalt ist abstrakt und hat keinen Gegenstand, den man nachbauen könnte (Modelle, Schichten, Zahlensysteme, Prozesse im Inneren) | Ein bewegliches Modell: Lernende verändern eine Größe und sehen die Folge, schalten Schichten ein und aus, verfolgen einen Ablauf Schritt für Schritt | „Röntgenblick“ (Virtualisierung), Ausfall simulieren (Netzwerktopologien), Bits schalten (Vorlage „Bits & Bytes“) |
| **C Erst vermitteln, dann im Spiel üben** | A oder B klärt die Grundlagen, aber es gibt Regeln, Zuordnungen oder Abläufe, die viel Übung brauchen, bis sie sitzen | Entdecken mit A oder B; im Üben ein Spiel mit **derselben Regel** in vielen kurzen Fällen; Selbstüberprüfung wieder im Gegenstand (neuer Fall) | Erst im Registerportal recherchieren, dann im Sammelspiel Firmen der richtigen Abteilung zuordnen |
| **D Lernspiel durchgehend** | Nur, wenn A und B nicht sinnvoll sind oder die Lehrkraft ausdrücklich ein Spiel wünscht | Das Spiel vermittelt selbst (SQL-Island-Prinzip, siehe unten); Üben und Selbstüberprüfung mit derselben Mechanik in neuen Fällen | SQL Island; „Stempel drauf!“ |

Je Form gilt die **Plattform-Probe:** Könnte die Lernplattform das genauso (Test, H5P, Lückentext)? Dann ist es kein Kern eines Lernpakets.

### Vorschlag an die Lehrkraft

Claude **berät**: kurze Empfehlung mit Begründung, warum diese Form hier passt und die anderen weniger. Dann schlägt Claude **eine** Umsetzung vor, die zur ersten passenden Form gehört, und – wenn es eine sinnvolle gibt – eine Alternative (z. B. A pur oder A mit Spiel zum Üben). Je Vorschlag: der Arbeitsgegenstand (was sieht man, was bewegt man), ein Beispielzug („Du tippst `ip route` – der Server antwortet: Netzwerk nicht erreichbar“), die Tabelle **Lernstoff → Regel oder Reaktion des Gegenstands** (jeder Kerninhalt und jeder typische Fehler), die Plattform-Probe, der Aufwand und ein **Mockup** des wichtigsten Bildschirms (Gegenstand in der Mitte in einem typischen Zustand, Auftrag und Notiz daneben, Bedienelemente beschriftet; alle Vorschläge im selben Ausschnitt). Spielideen schlägt Claude nur für C oder D vor. Vorlage: `vorlagen/konzept.md`.

### Wenn ein Spiel: das SQL-Island-Prinzip

Ein Spiel ohne eingebaute Anleitung lehrt vor allem das Spiel. Deshalb vermittelt ein Lernspiel die Grundlagen **im Spiel selbst**, wie SQL Island: Jeder Spielschritt bringt genau ein neues Konzept, und zwar als Teil der Geschichte („Ich suche einen friedlichen Schmied – probiere `beruf LIKE '%schmied'`“).

- **Ein neues Konzept je Schritt**, in der Sprechblase der Figur, mit kurzem Hinweis auf die Schreibweise oder Regel.
- **Der erste Einsatz wird vorgemacht** (das Spiel führt den Zug selbst aus oder zeigt ihn), danach ist man selbst dran (P3).
- **Sofortige Folge im Spiel** und ein Satz, warum (P6); Neustart des Schritts statt Strafe.
- **Nachschlagen jederzeit:** Regelbuch, Befehlsübersicht oder Tabellen neben dem Spiel, ohne das Spiel zu verlassen (P9).
- **Der Lernstoff ist die Spielregel** (intrinsische Integration): Wer ihn nicht kann, kommt im Spiel nicht weiter – kein Quiz als Tor zum nächsten Level.
- Story und Spielwelt tragen den Inhalt, statt ihn zu schmücken; kein Zeitdruck, keine Ranglisten.

### Spiel-Genres (nur für C und D)

| Genre | Vorbild | Spielschleife | Passt zu | Beispiel |
|---|---|---|---|---|
| Abenteuer mit Befehlen | SQL Island | Mit dem Lernstoff selbst handeln, um weiterzukommen | Sprachen, Befehle, Formeln | Mit SQL-Abfragen von der Insel entkommen |
| Schalter-Simulator | „Papers, Please“ | Antrag kommt → mit Regelbuch prüfen → stempeln → Folgen sehen; jede Woche neue Regeln | Vorschriften, Formvorgaben, Prüfschemata | „Stempel drauf!“: am Registergericht Anmeldungen prüfen |
| Sammel- und Fangspiel | Pokémon | Wesen finden → mit dem richtigen Werkzeug fangen → im Dex eintragen | Einteilungen, Zuordnungen, Merkmale (gut zum Üben, Form C) | „Firmendex“: Firmlinge mit HRA- oder HRB-Ball fangen |
| Escape Room | Escape-Spiele | Rätsel im Raum → Hinweis kombinieren → Schloss öffnen | Abläufe, Rechenwege, Codes | Tresor öffnet sich mit der richtig berechneten Subnetzmaske |
| Detektivfall | Krimi-Rätsel | Spuren sammeln → Verdacht prüfen → Fall lösen | Analyse, Fehlersuche, Quellenarbeit | Gefälschte Rechnungen anhand der Pflichtangaben entlarven |
| Aufbau und Wirtschaft | Tycoon-Spiele | Entscheiden → Kennzahlen ändern sich → reagieren | Wirkungszusammenhänge, Kalkulation | Eigenen Laden führen, Preis und Absatz ausprobieren |
| Rollenspiel-Gespräch | Visual Novel | Figur sagt etwas → Antwort wählen → Ausgang ändert sich | Kommunikation, Beratung, Konflikte | Reklamationsgespräch, das je nach Antwort kippt |

Umsetzung in der Vorlage: A und B im **Simulationsmodus** `PAKET.simulation`, wenn ein Arbeitsgegenstand das ganze Paket trägt (Lektion links in Kapiteln und Schritten, Gegenstand rechts, bleibt erhalten), sonst als Stationen mit eigenen Szenen; C mit Szenen im Entdecken und dem Spiel als Interaktion der Übungen (eine Übung je Spielrunde oder eine Übung mit mehreren Runden); D im Spielmodus `PAKET.spielwelt`.

## Simulationsmodus (PAKET.simulation)

Für Form A und B mit einem durchgehenden Arbeitsgegenstand: `PAKET.simulation = { titel, start(box, api) }`. Die Stationen heißen Kapitel; jedes hat 2–6 Schritte mit `auftrag`, `pruefe(sim)` und `loesen(sim)`, je Schritt höchstens etwa 60 Wörter. Was die Lernenden tun, bleibt im Gegenstand stehen, auch über Kapitel hinweg; nach dem Neuladen spielt die Engine die erledigten Schritte nach. So entsteht ein Tutorial wie bei „Shell Yeah!“ oder „Get-Going!“, aber für jedes Fach: ein Portal, ein Formular, eine Kalkulation, eine Werkstatt. Wann lieber eigene Szenen je Station: wenn die Stationen verschiedene Gegenstände brauchen. Format: `fragenformat.md` („Simulationsmodus“), Beispiel: `beispiele/simulation-handelsregister.js`.

## Spielmodus (PAKET.spielwelt)

Nur für Form D, ein Spiel über alle Stationen: `PAKET.spielwelt = { titel, tab, start(box, api) }`. Die Engine stellt eine große Spielbühne unter „① Spielen“; die Stationen sind die Level (`id`, `titel`, `lz`, `check`, optional `mitdenken`). Das Spiel meldet `api.level(id)`, wenn ein Level geschafft ist; danach erscheinen dessen Kurz-Check und Mitdenken-Auftrag in der Zwischenbilanz. Üben und Teil A der Selbstüberprüfung nutzen dieselbe Spielmechanik in neuen Fällen (dort ohne Rückmeldung und ohne Hilfen). Die Spielbühne so auslegen, dass sie höchstens etwa 600 px hoch ist: Auf 1366 × 768 bleiben zwischen Kopfzeile und Fußleiste gut 600 px, und was darunter liegt (etwa die Knöpfe zum Entscheiden), sehen Lernende erst nach dem Scrollen. Format: `fragenformat.md` („Spielmodus“), Beispiele: `beispiele/spiel-stempel-drauf.js` und `beispiele/spiel-firmendex.js`.

## Szenen je Station

Gibt es weder Simulations- noch Spielmodus, wird für jede Station **zuerst** die Szene festgelegt, dann der Text. Bei Form A ist die Szene meist ein Ausschnitt oder Zustand desselben Arbeitsgegenstands. Dieser Katalog hilft, auch in Fächern ohne Technik eine Szene zu finden. Die Bausteine (rechte Spalte) stehen in `js/baukasten.js` (`api.kit`), Format in `fragenformat.md` („Interaktionen“ und „Baukasten“).

## Die vier Fragen zu jeder Szene

1. **Was sehen die Lernenden?** Ein Ort, ein Gerät, ein Dokument, eine Person – so, wie es im Beruf oder Alltag aussieht.
2. **Was bewegen sie?** Ein Verb: schalten, sortieren, markieren, ausfüllen, entscheiden, antworten, bauen, einstellen.
3. **Woran erkennt das Paket den Erfolg?** Ein prüfbarer Zustand (richtig sortiert, Zeile markiert, Wert eingestellt, Gespräch geschafft).
4. **Was passiert bei einem Fehler?** Die Szene reagiert so wie in echt: Der Server antwortet nicht, die Kundin fragt nach, der Stempel fehlt, die Ware kommt zurück. Dazu ein Satz, der die Fehlvorstellung anspricht.

## Muster mit Beispielen aus verschiedenen Fächern

| Muster | Was die Lernenden tun | Beispiele | Bausteine |
|---|---|---|---|
| Arbeitsplatz-Rechner | E-Mails lesen und beantworten, in einem Portal recherchieren, ein Formular ausfüllen | Handelsregister prüfen, Bestellung im Warenwirtschaftssystem, Krankmeldung erfassen, Bewerbung online | `computer`, `mail`, `browser`, `formular` |
| Dokument prüfen | Auf einem echt aussehenden Dokument die richtige Stelle antippen oder Fehler finden | Rechnung auf Pflichtangaben prüfen, HR-Auszug lesen, Lieferschein mit Bestellung vergleichen, Gesetzestext anwenden | `dokument` |
| Gespräch führen | Mit einer Figur sprechen und an Weggabelungen die passende Antwort wählen | Kundenberatung, Reklamation, Konfliktgespräch, Patientenaufnahme, Argumentation in Deutsch | `dialog`, `szene` |
| Sortieren | Karten antippen und dem passenden Fach zuordnen | Rechtsformen in HRA/HRB, Belege in Konten, Wörter in Wortarten, Lebensmittel nach Nährstoffen, Übungen nach Muskelgruppen | `sortieren` |
| Ablauf ordnen | Schritte in die richtige Reihenfolge bringen | Wareneingang, Erste Hilfe, Bewerbungsablauf, Aufwärmprogramm, Gesetzgebungsverfahren | `reihenfolge` |
| Ausprobieren mit Reglern | Eine Größe verändern und die Wirkung sofort sehen | Preis und Absatz, Zins und Laufzeit, Belastung und Puls, Spannung und Strom, Rabatt und Gewinn | `regler` + eigene Anzeige |
| Gerät bedienen | Ein nachgebautes Gerät einstellen | Router, Kasse, Messgerät, Waage, Pulsuhr | eigenes Gerät in `inhalt.js` (Beispiel: `routerGeraet`) |
| Bauen | Teile zu einem Ganzen zusammensetzen | PC, Netzwerk, Satzbau, Schaltung, Trainingsplan | `sortieren` (Fächer = Plätze) oder eigenes SVG |
| Fehlersuche | In einem Fall mit eingebauten Fehlern die Fehler finden | Fehlerhafte Rechnung, fehlerhafter Brief, falsch konfigurierter Router, falsche Dosierung (fiktiv) | `dokument`, `formular` |

## Spielrahmen (PAKET.spiel)

Die leichtere Spielform: Ein Spielrahmen verbindet einzelne Szenen-Stationen zu einer Mission. Er lohnt sich, wenn es eine natürliche Geschichte gibt (Partner prüfen, Kunden betreuen, einen Fall lösen, eine Insel verlassen wie bei SQL Island). Regeln:

- **Der Inhalt ist die Spielhandlung.** Bei SQL Island lernt man SQL, indem man mit SQL-Abfragen von der Insel entkommt. Ein Quiz mit Punkten danach ist kein Spielrahmen.
- **Jede Station ist ein Ort auf der Karte** (`mission.ort`, `mission.symbol`) und endet mit einem Story-Satz (`mission.ende`), der die Geschichte weiterbringt.
- **Fortschritt statt Rangliste:** Der Zähler zeigt geschaffte Orte (`spiel.zaehler`), keine Punkte im Vergleich mit anderen (P12).
- **Keine verführerischen Details:** Story, Figuren und Kulisse dienen dem Lernziel. Witzige Nebenhandlungen ohne Bezug zum Inhalt kosten Aufmerksamkeit (Sundararajan & Adesope 2020).

## Eigene Welt je Paket (PAKET.welt)

- **Thema** passend zum Fach: `wirtschaft`, `technik`, `sprache`, `natur`, `gesundheit`, `gestaltung`. Es setzt Farben und eine passende Kulisse.
- **Kulisse** für Kopf, Start und Szenen: `buero`, `lager`, `werkstatt`, `serverraum`, `laden`, `stadt`, `natur`, `klasse`.
- **Figuren** als Illustration (`figur.aussehen`): Ausbilderin, Kunde, Kollegin. Vielfältig besetzen (Hautton, Frisur, Kopftuch, Brille), nie reale Personen nachbilden.
- **Symbol** im Kopf (`welt.symbol`), z. B. ein Emoji, das zum Thema passt.

## Echt in der Funktion, sparsam im Aussehen

Eine Szene muss sich verhalten wie der echte Gegenstand: dieselben Felder, Abläufe und Folgen. Sie muss nicht aussehen wie ein Foto davon. Aufwendige Nachbildungen bringen kaum mehr als einfache; wichtig ist, dass das, worauf es ankommt, gut zu erkennen ist (Belege in `belege.md`).

- Zeigen, was zur Aufgabe gehört; weglassen, was im echten Programm nur stört (Werbung, Menüs ohne Funktion, zwanzig Felder, von denen drei gebraucht werden).
- Das Wichtige hervorheben: die Zeile im Dokument, das Feld im Formular, die Leuchte am Gerät.
- Kulisse und Figuren gehören in den Kopf, auf die Startseite und zum Auftrag (Sprechblase), nicht in den Arbeitsbereich der Szene.

## Textbudget

- Auftrag in der Sprechblase: ein bis zwei Sätze. Die Vorab-Frage ist die Leitfrage und zählt nicht zum Budget; eine eigene Leitfrage (ein Satz) nur an Stationen ohne Vorab-Frage.
- „Kurz erklärt“ in der Notiz: höchstens etwa 40 Wörter. Mehr gehört in den Steckbrief (zugeklappt) oder in die Szene.
- Erklärungen, die zur Handlung passen, kommen über `api.erklaere()` genau dann, wenn sie gebraucht werden.
- Zusammen höchstens etwa 90 Wörter je Station (Inhaltsprüfung der Engine); im Simulationsmodus höchstens etwa 60 Wörter je Schritt. Das Prüfskript misst zusätzlich den sichtbaren Text neben der Szene (Hinweis ab 160 Wörtern, einschließlich Titel, Ziel, Vorab-Frage und Begriffen).
- Die Szene ist auf 1366 × 768 ganz zu sehen: Station etwa 380 px hoch, Gegenstand im Simulationsmodus und Spielbühne etwa 600 px. Das Prüfskript misst die Unterkante gegen die Fußleiste.

## Erfundene Daten, echte Formen

Dokumente, Portale und Formulare sehen aus wie im Beruf, enthalten aber nur erfundene Firmen, Personen und Nummern. Echte Webseiten werden nicht kopiert, sondern als Übungsversion nachgebaut (eigene Adresse wie `registerportal.uebung`, Hinweis „Übungsversion“), und im Steckbrief steht, wie das echte Angebot heißt.
