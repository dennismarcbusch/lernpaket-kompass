# Szenen-Katalog: Was bewegen die Lernenden?

Ergänzung zu P14 (Handeln am Gegenstand). Für jede Station wird **zuerst** die Szene festgelegt, dann der Text. Dieser Katalog hilft, auch in Fächern ohne Technik eine Szene zu finden. Die Bausteine (rechte Spalte) stehen in `js/baukasten.js` (`api.kit`), Format in `fragenformat.md` („Interaktionen“ und „Baukasten“).

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

## Spielrahmen (optional, PAKET.spiel)

Ein Spielrahmen verbindet die Stationen zu einer Mission. Er lohnt sich, wenn es eine natürliche Geschichte gibt (Partner prüfen, Kunden betreuen, einen Fall lösen, eine Insel verlassen wie bei SQL Island). Regeln:

- **Der Inhalt ist die Spielhandlung.** Bei SQL Island lernt man SQL, indem man mit SQL-Abfragen von der Insel entkommt. Ein Quiz mit Punkten danach ist kein Spielrahmen.
- **Jede Station ist ein Ort auf der Karte** (`mission.ort`, `mission.symbol`) und endet mit einem Story-Satz (`mission.ende`), der die Geschichte weiterbringt.
- **Fortschritt statt Rangliste:** Der Zähler zeigt geschaffte Orte (`spiel.zaehler`), keine Punkte im Vergleich mit anderen (P12).
- **Keine verführerischen Details:** Story, Figuren und Kulisse dienen dem Lernziel. Witzige Nebenhandlungen ohne Bezug zum Inhalt kosten Aufmerksamkeit (Sundararajan & Adesope 2020).

## Eigene Welt je Paket (PAKET.welt)

- **Thema** passend zum Fach: `wirtschaft`, `technik`, `sprache`, `natur`, `gesundheit`, `gestaltung`. Es setzt Farben und eine passende Kulisse.
- **Kulisse** für Kopf, Start und Szenen: `buero`, `lager`, `werkstatt`, `serverraum`, `laden`, `stadt`, `natur`, `klasse`.
- **Figuren** als Illustration (`figur.aussehen`): Ausbilderin, Kunde, Kollegin. Vielfältig besetzen (Hautton, Frisur, Kopftuch, Brille), nie reale Personen nachbilden.
- **Symbol** im Kopf (`welt.symbol`), z. B. ein Emoji, das zum Thema passt.

## Textbudget

- Auftrag in der Sprechblase: ein bis zwei Sätze. Leitfrage: ein Satz.
- „Kurz erklärt“ in der Notiz: höchstens etwa 40 Wörter. Mehr gehört in den Steckbrief (zugeklappt) oder in die Szene.
- Erklärungen, die zur Handlung passen, kommen über `api.erklaere()` genau dann, wenn sie gebraucht werden.
- Zusammen höchstens etwa 90 Wörter sichtbarer Text je Station (Inhaltsprüfung), neben der Szene höchstens etwa 160 Wörter (Prüfskript).

## Erfundene Daten, echte Formen

Dokumente, Portale und Formulare sehen aus wie im Beruf, enthalten aber nur erfundene Firmen, Personen und Nummern. Echte Webseiten werden nicht kopiert, sondern als Übungsversion nachgebaut (eigene Adresse wie `registerportal.uebung`, Hinweis „Übungsversion“), und im Steckbrief steht, wie das echte Angebot heißt.
