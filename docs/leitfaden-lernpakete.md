# Lernpaket-Kompass – Leitfaden für interaktive Lernpakete

Entwurf · Kompass 4.0 · Stand 12.11.2026 · Dennis Busch

## Zweck und Kurzfassung

Gute Lernpakete entstehen nicht durch mehr Technik, sondern durch wenige gut belegte Gestaltungsprinzipien, die konsequent umgesetzt werden. Dieser Leitfaden bündelt diese Prinzipien für Lernpakete in allen Fächern. Er ist im Projekt [PING](https://github.com/dennismarcbusch/PING) (IT-Lernpakete für Fachinformatiker) entstanden, dessen Pakete in den Beispielen auftauchen. Er richtet sich ausdrücklich auch an Kolleginnen und Kollegen, die bisher weder Software entwickelt noch KI über einfache Chatbots hinaus genutzt haben.

Der Leitfaden hat drei Teile: **A** fasst die Forschungslage zusammen, **B** wählt daraus die für uns relevanten Prinzipien aus und wägt sie gegen den Aufwand ab, **C** ist der eigentliche Leitfaden mit Prozess, Paketstruktur, Checklisten und dem Vorschlag für ein Skill-Set.

**Die elf Kernsätze**

1. **Ganze Aufgaben als Rückgrat (P1):** Jedes Paket baut auf einer authentischen beruflichen bzw. lebensweltlichen Handlungssituation auf, nicht auf einer Stoffsammlung.
2. **Vom Einfachen zum Komplexen, Hilfe wird schrittweise zurückgenommen (P2):** zeigen, begleitet üben, selbstständig können.
3. **Erst vormachen, dann nachmachen (P3):** Novizen brauchen Lösungsbeispiele; wer schon kann, darf sie überspringen.
4. **Entdecken ja, aber geführt (P4):** Freies Ausprobieren ohne Struktur schadet dem Lernen messbar.
5. **Abrufen statt Wiederlesen (P5, P13):** Unbewertete Kurz-Checks gehören an jede Station; am Ende ergänzen Lernende ein Merkblatt aus dem Gedächtnis.
6. **Feedback erklärt, statt nur zu bewerten (P6):** „Richtig/falsch“ plus Begründung und nächster Schritt; Lob allein bringt wenig.
7. **Bildschirme entrümpeln (P7, nach Mayer):** nur, was dem Lernziel dient; Text und Bild zusammen, Inhalte in kleine Schritte geteilt; die Szene ganz im Blick, und hervorgehoben ist immer nur der nächste sinnvolle Schritt.
8. **Selbststeuerung muss unterstützt werden (P8, P11):** Wahlfreiheit allein verbessert das Lernen nicht; Ziele, Fortschritt und Reflexion schon.
9. **Einfache Verzweigung statt „intelligenter“ Lernpfade (Teil B2):** Gestufte Tipps und Wiederholungsschleifen leisten fast alles, was wir brauchen.
10. **Früh bauen und mit Schülern erproben (Teil C1):** erst die Lernziele, dann der Gegenstand, dann sofort ein Prototyp; nach dem Einsatz die Daten aus der Lernplattform auswerten. Neue Regeln werden erst Pflicht, wenn sie sich im Unterricht bewährt haben.
11. **Handeln am Gegenstand statt lesen (P12):** Ein Arbeitsgegenstand trägt das Paket – Werkzeug, Gerät, Plan oder Dokument wie im Beruf (Simulation), bei abstrakten Inhalten ein bewegliches Modell. Echt ist seine Funktion, nicht jede Einzelheit seines Aussehens. Ein Spiel nur zum Üben oder, wenn keine Simulation sinnvoll ist, mit Anleitung im Spiel selbst. Was die Lernplattform mit Test oder H5P genauso könnte, ist kein Lernpaket. Jede Station ist eine Szene zum Anfassen – Dokument, Gerät, nachgebautes Portal, Gespräch. Der Text steht kurz daneben, das Beispiel wird in der Szene vorgeführt.

Wer wenig Zeit hat, liest diese elf Sätze, Teil B1 (Prinzipienübersicht: sieben bilden den verbindlichen Kern) und Teil C6 (Checkliste). Das Paket endet mit einer **Selbstüberprüfung**, die nicht zählt; der Kompetenznachweis liegt außerhalb des Pakets (Teil C2).

**Skill-Set:** Wer ein Paket bauen möchte, muss den Leitfaden nicht auswendig kennen. Ein einziger Skill für Claude, der Lernpaket-Kompass, führt durch Planung, Fragen, Bau, Prüfung und Auswertung und wendet die Prinzipien dabei automatisch an (Teil C7). Einrichtung und Beispiel-Prompts: [Anleitung zum Skill-Set](skill-set-anleitung.md).

## Teil A1: Was die Forschung sagt und wie verlässlich sie ist

Für die Gestaltung digitaler Lernangebote gibt es eine Handvoll gut untersuchter Ansätze. Sie beantworten unterschiedliche Fragen und ergänzen sich; am besten belegt sind die Regeln zur Bildschirmgestaltung (Mayer) und der Aufbau eines Kurses über ganze, realistische Aufgaben (4C/ID).

**Wie man die Zahlen in diesem Leitfaden liest.** Viele Studien geben an, wie viel besser eine Gruppe mit einer bestimmten Methode abschneidet als eine Vergleichsgruppe. Für diese sogenannte Effektstärke (abgekürzt *d* oder *g*) gibt es keine feste Skala: Dieselbe Zahl bedeutet je nach Art der Studie etwas anderes. In großen Feldstudien mit standardisierten Tests gelten schon Werte von 0,05 bis 0,2 als mittlerer und Werte ab 0,2 als großer Effekt (Kraft 2020). Kleine Studien und Tests, die die Forschenden selbst passend zum Stoff gebaut haben, liefern dagegen leicht 0,5 und mehr, im Mittel etwa doppelt so hohe Werte wie große Studien mit unabhängigen Tests (Cheung & Slavin 2016). Die meisten Zahlen in diesem Leitfaden stammen aus solchen kleineren Studien. Sie zeigen deshalb vor allem Richtung und Reihenfolge (wirkt, wirkt nicht, wirkt stärker als); im eigenen Unterricht ist mit deutlich kleineren Wirkungen zu rechnen. Die verbreitete Faustregel „erst ab 0,4 lohnt es sich“ (Hattie) ist damit überholt. Auch ein kleiner Effekt lohnt sich, wenn die Maßnahme wenig Aufwand macht. Drei Vorsichtsregeln:

- **Der Vergleich entscheidet.** Gegenüber herkömmlichem Unterricht sieht fast jedes digitale Angebot gut aus, gegenüber einem anderen guten Lernprogramm schrumpft der Vorteil. Beispiel: „Intelligente“ Lernsysteme erreichen 0,66 gegenüber Klassenunterricht, aber nur 0,28 gegenüber einfachen interaktiven Lernprogrammen (Kulik & Fletcher 2016, zit. n. [Kerres et al.](https://learninglab.uni-due.de/sites/default/files/KI-Bildung-Sammelband-V1.4_1.pdf)).
- **Große Zahlen aus kleinen Studien sind verdächtig.** Studien mit eindrucksvollen Ergebnissen werden eher veröffentlicht, und viele Zusammenfassungen korrigieren das nicht ([Ropovik et al. 2021](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8174709/)).
- **Frühe Zahlen sind Obergrenzen.** In einer Nachrechnung von Mayers eigenen Studien lag der mittlere Effekt bei 0,37 und nahm von Jahr zu Jahr etwas ab ([Cromley & Chen](https://par.nsf.gov/biblio/10637927)).

**Drei Arten von Aussagen.** Der Leitfaden nennt bei jedem Prinzip, worauf es beruht: *direkt belegt* (Studien mit vergleichbaren Lernenden und Aufgaben), *übertragen* (belegt für andere Gruppen, etwa Studierende, oder für andere Aufgaben; die Übertragung auf Berufsschulklassen ist plausibel, aber nicht geprüft) oder *eigene Entscheidung* (Erfahrung aus den bisherigen Paketen oder eine Festlegung, damit alle Pakete gleich funktionieren). Die Spalte „Grundlage“ in Teil B1 hält das fest. Mit Schülern erprobt ist bisher keine Fassung des Kompass (siehe „Offene Punkte“).

**Was digitales Lernen insgesamt bringt.** Michael Kerres fasst in seinem Lehrbuch *Mediendidaktik* (2024, Kap. 4) Jahrzehnte an Vergleichsstudien nüchtern zusammen: Digitales Lernen ist herkömmlichem Unterricht nicht unterlegen und im Mittel leicht überlegen. Ersetzt der Computer den Unterricht, liegt der Effekt bei *d* = 0,31, ergänzt er ihn, bei 0,42 (Tamim et al. 2011). Für Lernpakete sind vier Befunde besonders wichtig:

- Die Kombination mit Präsenzunterricht wirkt besser als reines Online-Lernen.
- Wer allein am Computer lernt, braucht im Schnitt deutlich weniger Zeit (rund ein Viertel bis ein Drittel), bricht aber auch häufiger ab.
- Der Erfolg hängt davon ab, ob Lernende ihr eigenes Lernen überwachen und steuern können.
- Der Reiz des Neuen verfliegt schnell. Wirkt ein Angebot vor allem unterhaltsam, strengen sich Lernende sogar weniger an.

Kerres' Fazit: Nicht das Digitale macht den Erfolg aus, sondern die didaktische Gestaltung.

**Hattie richtig einordnen.** John Hatties *Visible Learning* („Lernen sichtbar machen“) fasst inzwischen über 2.100 Forschungsübersichten zusammen und ordnet Einflussfaktoren in eine Rangliste ([Boulhrir 2025](https://jle.hse.ru/article/download/27821/23245)). Diese Rangliste ist umstritten, weil sehr unterschiedliche Studien zu einer Zahl verrechnet werden ([Johnson & Janzen 2023](https://ices.library.ubc.ca/index.php/criticaled/article/view/186745/185678)). Ein Beispiel: Für Feedback nannte Hattie früher Werte um 0,7; eine genauere Nachrechnung seines eigenen Teams kommt auf 0,48, mit großen Unterschieden je nach Art des Feedbacks ([Wisniewski, Zierer & Hattie 2020](https://opus.bibliothek.uni-augsburg.de/opus4/files/71009/fpsyg-10-03087.pdf)). Hattie taugt deshalb als Landkarte, nicht als Rangliste.

**Die wichtigsten Ansätze im Überblick**

| Ansatz | Worum es geht | Wie gut belegt | Was das für unsere Pakete heißt |
| --- | --- | --- | --- |
| Planungsablauf ADDIE | Ein Lernangebot entsteht in fünf Schritten: Analyse, Entwurf (Design), Entwicklung, Einsatz (Implementierung), Auswertung (Evaluation). | Bewährter Projektablauf, aber keine Lerntheorie; Schritt für Schritt abgearbeitet zu schwerfällig. | Die fünf Schritte nutzen, aber in kurzen Runden mit frühem Probelauf (Teil C1). |
| Lernen an ganzen Aufgaben (Merrill; 4C/ID nach van Merriënboer) | Gelernt wird an vollständigen, realistischen Aufgaben statt an zerstückeltem Stoff. Die Aufgaben werden schwieriger, die Hilfe wird weniger. Hintergrundwissen und Bedienhinweise werden getrennt angeboten. | 4C/ID: *d* = 0,79 über alle Studien, die meisten aus der Hochschule, wo das Modell auch am besten abschneidet ([Costa, Miranda & Melo 2022](https://repositorio.iscte-iul.pt/bitstream/10071/23015/1/article_81383.pdf)); in einer Studie an einer technischen Schule bessere Ergebnisse im Unterricht wie am Computer (Sarfo & Elen 2007, nach Kerres 2024); Merrill bisher vor allem über Befragungen gestützt ([Frick et al. 2010](https://bio.tedfrick.me/etrd/ETRD2010ImprovingCourseEvaluations.pdf)). | Jedes Paket hat eine durchgehende Handlungssituation; vereinfachtes 4C/ID als Planungsraster. |
| Meisterlehre fürs Denken (Cognitive Apprenticeship) | Wie bei einer Ausbilderin: vormachen und dabei laut denken, begleiten, Hilfe schrittweise zurücknehmen, Lernende erklären und reflektieren lassen. | Viele positive Erfahrungsberichte, wenige strenge Vergleichsstudien; Reflexion und Erklärenlassen werden in der Praxis oft vergessen ([Shah & Soosai Raj 2024](https://sigcse2024.sigcse.org/details/sigcse-ts-2024-Papers-1/144/A-Review-of-Cognitive-Apprenticeship-Methods-in-Computing-Education-Research)). | Ausbilderfigur in der Story, gestufte Tipps, Reflexionsfragen. |
| Bildschirmgestaltung nach Mayer (Multimedia-Lernen) | Wir verarbeiten Bilder und Worte über zwei Kanäle mit begrenzter Kapazität. Gute Gestaltung lässt Unnötiges weg, macht Schwieriges handhabbar und regt zum Mitdenken an. | Über 200 Experimente, 15 Gestaltungsregeln ([Mayer](https://edtechbooks.org/docx/10349)); in einer Nachrechnung dieser Studien im Mittel *g* = 0,37 (Cromley & Chen). Überwiegend kurze Laborversuche mit Studierenden. | Verbindliche Gestaltungsregeln (Teil C3). |
| Gestaltungsorientierte Mediendidaktik (Kerres) | Am Anfang steht ein Lernproblem, nicht die Technik. Die Methode muss zu Zielgruppe, Lernzielen und Rahmen passen. Jedes Lernangebot braucht Orientierung, Lernmaterial und Lernaufgaben; Tests sind optional. Programme, die sich automatisch anpassen („adaptive Systeme“), werden nüchtern bewertet. | Lehrbuch, das die Forschung bündelt (Kerres 2024). Adaptive Systeme: kein belastbarer Vorteil gegenüber gut gemachten interaktiven Programmen, aber hoher Aufwand ([Kerres et al.](https://learninglab.uni-due.de/sites/default/files/KI-Bildung-Sammelband-V1.4_1.pdf)). | Jedes Paket beginnt mit dem Lernproblem (Teil C1); einfache Verzweigungen (Tipps, Wiederholungen) statt KI-Lernpfaden. |
| Lernen sichtbar machen (Hattie) | Klare Ziele, erkennbare Erfolgskriterien, Rückmeldung; die Lehrkraft prüft die Wirkung des eigenen Unterrichts. | Riesige Datenbasis, Methode umstritten (siehe oben). | Lernziele sichtbar machen; Ergebnisse der Pakete auswerten. |

**Zu Kerres, genauer.** Das Lehrbuch *Mediendidaktik* von Michael Kerres (2024) ist das deutschsprachige Standardwerk zum Thema und Grundlage vieler Punkte in diesem Leitfaden. Vier Gedanken sind für uns zentral:

- **Erst das Lernproblem, dann das Medium.** „Bildungsangebote können nur Bildungsprobleme lösen.“ Wer ein Paket plant, klärt zuerst, was die Schüler bisher nicht können und warum. Ein Paket, das vor allem „digital“ sein soll, löst kein Problem.
- **Drei Bausteine sind Pflicht.** Ein Lernangebot braucht Orientierung (worum es geht, wie lange es dauert, was man danach kann), Lernmaterial und Lernaufgaben, die das Lernen tatsächlich auslösen. Austausch mit anderen und Tests sind je nach Ziel sinnvoll, aber kein Muss (sogenanntes 3-2-1-Modell). Wichtig: Lernaufgaben sind keine Testaufgaben, und das sollen die Lernenden auch erkennen.
- **Steuerung bewusst entscheiden.** Ob ein Paket einen festen Weg vorgibt oder freies Erkunden erlaubt, hängt vom Stoff und von den Lernenden ab (Kriterien in Teil C4). Eine harte Sperre („erst weiter, wenn alles richtig ist“) erleben Lernende schnell als Gängelung; besser ist ein Vorschlag, was als Nächstes sinnvoll ist.
- **Automatische Anpassung lohnt sich selten.** Damit sich ein Programm sinnvoll an den Lernstand anpasst, braucht es ein geprüftes Modell, wie Kompetenz wächst, laufende Tests und mehrere Varianten jedes Inhalts. Das ist teuer, und ständig eingestreute Testfragen stören beim Lernen. In einer Vergleichsstudie lernten Schüler mit der anpassenden Variante nicht mehr, waren aber weniger motiviert (Iterbeke et al. 2021). Einfache Anpassungen sind dagegen sinnvoll: Wer wenig Vorwissen hat, bekommt mehr Beispiele; wer es schon kann, darf überspringen.

**Zu Mayer, genauer.** Die Gestaltungsregeln helfen vor allem Lernenden mit wenig Vorwissen. Wer sich schon auskennt, profitiert weniger, manche Hilfen stören sogar (Expertise-Umkehr-Effekt; Kalyuga et al. 2003; Kalyuga 2007). Das Diagramm zeigt die Wirkung der einzelnen Regeln in Mayers eigenen Studien. Diese Werte stammen überwiegend aus kurzen Laborversuchen und sind deshalb eher als Obergrenze zu lesen.

*(Diagramm mit den Effektstärken der zwölf Mayer-Prinzipien nach Mayer 2017 und der Nachrechnung von Cromley & Chen: nur in der Dokumentfassung. Im Mittel g ≈ 0,37.)*

Für die Praxis heißt das: Die Reihenfolge zeigt, wo sich Aufwand am ehesten lohnt (Text und Bild zusammenbringen, Überflüssiges streichen). Im echten Unterricht sind kleinere Wirkungen realistisch. Am meisten zählen die Regeln, wenn das Material sein Tempo selbst vorgibt (Video, Animation); bestimmen Lernende das Tempo selbst wie in unseren Paketen, fällt der Vorteil kleiner aus (Noetel et al. 2022).

**Warum das wirkt: die Theorie der kognitiven Belastung.** Hinter Mayers Regeln und hinter den Lösungsbeispielen steht die *Cognitive Load Theory* (Sweller 1988). Ihr Kern: Das Arbeitsgedächtnis, in dem wir bewusst denken, kann nur wenige Dinge gleichzeitig bearbeiten (heute geht man von etwa vier sinnvollen Einheiten aus); das Langzeitgedächtnis ist dagegen fast unbegrenzt. Belastet wird das Arbeitsgedächtnis auf drei Arten:

- durch die Schwierigkeit des Stoffs selbst, weil viele Elemente zusammenspielen (*intrinsische* Belastung) – sie lässt sich nicht wegzaubern, nur gut portionieren;
- durch ungünstige Gestaltung, etwa das Hin-und-her-Springen zwischen Grafik und Legende (*extrinsische* Belastung) – sie kostet Kapazität und bringt nichts;
- durch die Anstrengung, die wirklich ins Lernen fließt, also in den Aufbau von Wissen im Langzeitgedächtnis (*lernbezogene* Belastung).

Die Grundregel lautet: unnötige Belastung durch die Gestaltung senken, damit Kapazität fürs Lernen frei wird. Mayer fasst dasselbe als drei Aufgaben der Gestaltung: überflüssige Verarbeitung vermeiden (Kohärenz, Signalisierung, Nähe), die notwendige Verarbeitung des schwierigen Stoffs steuern (Segmentierung, Vortraining) und tiefes Durchdenken anregen (*generative* Verarbeitung, z. B. sich selbst erklären, skizzieren, in eigenen Worten zusammenfassen; Fiorella & Mayer 2016). Der dritte Teil wird leicht vergessen, weil die meisten Regeln vom Weglassen handeln.

**Grenzen der Theorie.** Die drei Belastungsarten lassen sich kaum getrennt messen; meist fragt man die Lernenden nur, wie anstrengend sie eine Aufgabe fanden. Die „lernbezogene Belastung“ wurde kritisiert, weil sich mit ihr im Nachhinein fast jedes Ergebnis erklären lässt (de Jong 2010); Sweller hat die Theorie daraufhin überarbeitet (Sweller, van Merriënboer & Paas 2019). Und viele Befunde stammen aus kurzen Laborstudien. Als Begründung dafür, warum Lösungsbeispiele (P3) und aufgeräumte Bildschirme (P7) wirken, taugt die Theorie trotzdem gut.

**Faustregeln, keine Gesetze.** Die Prinzipien wirken nicht für alle gleich. Neben dem Vorwissen (siehe oben) kommt es auf die Lernenden an: Für Lernende mit Hörbeeinträchtigung gilt das Modalitätsprinzip (Erklärung gesprochen statt geschrieben) nicht, sie brauchen Text oder Untertitel. Für Lernende, die noch Deutsch lernen, können Untertitel hilfreich sein, obwohl das Redundanzprinzip davon abrät. Teil C3 zieht daraus Regeln für Ton, Untertitel und Fachbegriffe.

## Teil A2: Weitere Befunde, die sich direkt umsetzen lassen

Neben den großen Ansätzen gibt es eine Reihe gut untersuchter Einzelbefunde aus der Lernforschung. Für Lernpakete sind sie besonders nützlich, weil sie sich direkt in Aufgaben und Abläufe übersetzen lassen. Die Tabelle nennt jeweils, womit verglichen wurde, denn davon hängt die Zahl ab.

| Befund | Verglichen mit | Wirkung | Quelle | Was das für Pakete heißt |
| --- | --- | --- | --- | --- |
| Sich selbst abfragen (Übungstests, „Abrufen“) | Nochmal lesen | mittel bis groß, im Labor wie in der Klasse; Multiple Choice wirkt nicht schlechter als offene Fragen. Zusammen mit verteiltem Üben die einzige Lerntechnik, der eine große Übersicht „hohen Nutzen“ bescheinigt (Dunlosky et al. 2013) | [Adesope et al. 2017](https://education.wsu.edu/documents/2018/01/rethinking-use-tests.pdf/) | Kurz-Check an jeder Station, ohne Note |
| Wiederholung über mehrere Tage verteilt | Alles auf einmal | *g* = 0,74 | Latimier, Peyre & Ramus 2021 | Fragen aus früheren Stationen wieder aufgreifen; wirklich verteilen lässt sich nur über Tage, also mit Selbsttest-Fragen fürs Merkblatt oder einem Folgetest in der Lernplattform (P10) |
| Aufgabentypen gemischt üben | Erst alle Aufgaben einer Sorte, dann die nächste | *g* = 0,42; besonders bei leicht verwechselbaren Aufgaben | [Brunmair & Richter 2019](https://www.psychologie.uni-wuerzburg.de/fileadmin/06020400/2019/Brunmair_Richter_in_press__2019_META-ANALYSIS_OF_INTERLEAVED_LEARNING.pdf) | Übungen und Selbstüberprüfung mischen |
| Musterlösungen zuerst | Gleich selbst lösen | *g* = 0,48 (Mathematik) | [Barbieri et al. 2023](https://oaks.kent.edu/hcri/meta-analysis-worked-examples-effect-mathematics-performance) | Erst Musterlösung zeigen, dann selbst lösen; wer es schon kann, darf überspringen |
| Erst selbst an einem Problem versuchen, dann die Erklärung (Productive Failure) | Erst Erklärung, dann üben | *g* = 0,36 für Verständnis und Transfer, 0,37 bis 0,58, wenn die Methode vollständig umgesetzt ist; für jüngere Lernende und beim Einüben von Verfahren ist Erklären zuerst besser | Sinha & Kapur 2021 | Kein Widerspruch zu P3: Handgriffe und Verfahren zuerst vormachen. Wo ein Zusammenhang verstanden werden soll, darf die Szene zuerst erkundet werden; die Vorab-Frage leistet das im Kleinen |
| Freies Ausprobieren ohne Anleitung | Lehrkraft erklärt direkt | *d* = −0,38 (schlechter) | [Alfieri et al. 2011](https://www.fisme.science.uu.nl/publicaties/literatuur/2011_alfieri_discovery_learning.pdf) | Nie „probiert mal rum“ ohne Auftrag |
| Angeleitetes Entdecken (mit Leitfragen, Hilfen, Rückmeldung) | Andere Unterrichtsformen | *d* = 0,30 (besser) | ebd. | Entdecken ja, aber mit Auftrag und Rückmeldung |
| Lernende wählen Tempo, Reihenfolge, Inhalte frei | Programm gibt den Weg vor | *g* = 0,05 (praktisch kein Unterschied) | Karich, Burns & Maki 2014 ([Kurzreview](https://www.clearinghouse.edu.tum.de/wp-content/uploads/2017/07/CHU_KR_8_Karich_2014_Lernersteuerung-Software.pdf)) | Wahlfreiheit allein ist kein Qualitätsmerkmal |
| Hilfe nur auf Abruf | Hilfe, die das Programm von sich aus anbietet | Lernende rufen Hilfen oft gar nicht oder ungeschickt ab, gerade die mit wenig Vorwissen | Aleven et al. 2003 (Übersicht) | Tipps bleiben freiwillig, aber die Vorführung ist für Neulinge der hervorgehobene nächste Schritt, und Feedback nennt nach einem Fehler, was als Nächstes hilft |
| Lernende werden angeleitet, ihr Lernen zu planen, zu überwachen und zu reflektieren | Ohne Anleitung | im Mittel rund 0,7 an Schulen, 0,38 an Hochschulen. Untersucht wurden Trainingsprogramme über mehrere Wochen, keine einzelnen Hinweise im Material | Dignath & Büttner 2008; [Theobald 2021](https://doi.org/10.1016/j.cedpsych.2021.101976) | Planen, Überprüfen und Nachdenken aktiv anleiten; das Paket kann das stützen, die Lernbegleitung nicht ersetzen |
| Hilfen zur Selbstkontrolle (Lerntagebuch, Portfolio, Bewertungsraster) | Ohne | *d* = 0,42 auf die Leistung | [Dignath, van Ewijk, Perels & Fabriz 2023](https://doi.org/10.1007/s10648-023-09718-4) | Einschätzung je Lernziel nach dem Kurz-Check, im Abschluss neben dem Ergebnis; Fortschrittsanzeige. Übertragen: Eine Skala zum Antippen ist weniger als ein Lerntagebuch |
| Fragen vor dem Lernen beantworten, auch ohne die Antwort zu kennen (Vorab-Fragen, Pretesting) | Lernen ohne Vorab-Fragen | *g* = 0,54 für genau das, wonach gefragt wurde, 0,04 für den übrigen Stoff; Voraussetzung ist, dass die richtige Antwort danach gelernt wird | St. Hilaire, Chan & Ahn 2023; Pan & Carpenter 2023 (Übersicht) | Eine Vorab-Frage je Station zum Kern der Station; sie bleibt als Leitfrage stehen, und der Kurz-Check löst sie als Erstes auf |
| Das eigene Können erst einschätzen, nachdem man sich mit dem Stoff befasst hat (verzögerte Einschätzung) | Einschätzung sofort oder vor dem Lernen | deutlich treffsicherere Einschätzungen; Anfänger schätzen sich vorab oft falsch ein | Rhodes & Tauber 2011; Kruger & Dunning 1999 | Einschätzung nach dem Kurz-Check statt auf der Startseite, einmal je Lernziel |
| Überblick über Aufbau und Zusammenhänge vor dem Lernen (Advance Organizer) | Lernen ohne Überblick | klein, aber überwiegend positiv | Ausubel 1960; Luiten, Ames & Ackerson 1980 | Startseite als grafischer Lernpfad statt Textblöcke |
| Rückmeldung (Feedback) | Keine Rückmeldung | *d* = 0,48, stark abhängig vom Inhalt; Lob, Strafe und Belohnung wirken kaum | [Wisniewski et al. 2020](https://opus.bibliothek.uni-augsburg.de/opus4/files/71009/fpsyg-10-03087.pdf) | Rückmeldung erklärt den Fehler und zeigt den nächsten Schritt |
| Spielelemente (Gamification) | Ohne Spielelemente | *g* = 0,49 auf Wissen, 0,36 auf Motivation, 0,25 auf Verhalten; eine Rahmengeschichte und Zusammenarbeit verstärken | [Sailer & Homner 2020](https://opus.bibliothek.uni-augsburg.de/opus4/frontdoor/index/index/docId/109056) | Story ja, Punkte und Abzeichen nur sparsam |
| Umgedrehter Unterricht (Flipped Classroom: zu Hause erarbeiten, im Unterricht anwenden) | Herkömmlicher Unterricht | *g* ≈ 0,37 (Hochschule); in IT-Fächern eher geringer | [Zusammenfassung mehrerer Übersichten](https://dro.deakin.edu.au/articles/journal_contribution/On_the_use_of_flipped_classroom_across_various_disciplines_Insights_from_a_second-order_meta-analysis/20658822); [Strelan et al.](https://able.adelaide.edu.au/education/events/list/2019/06/research-seminar-flipped-classrooms-do-they-really-work) | Pakete eignen sich gut zur Vorbereitung auf die Unterrichtsstunde |
| Sich selbst erklären (z. B. „Warum ist dieser Schritt nötig?“ beim Lösungsbeispiel) | Lernen ohne Aufforderung zum Erklären | g ≈ 0,43 in der Oberstufe, 0,61 an Hochschulen | Bisra et al. 2018 (zit. n. Brod 2021); Fiorella & Mayer 2016 | Lösungsbeispiele mit einer Frage zum Selbsterklären; Aufträge zum Skizzieren, Zusammenfassen oder Erklären für andere (P3) |
| Mit vollständigen Notizen der Lehrkraft wiederholen | Mit eigenen Notizen wiederholen | etwa 17 % bessere Testergebnisse; halbfertige Notizen zum Ergänzen ähnlich gut | Kiewra & Benton 1987; Kiewra et al. 1995 (Übersicht Kiewra) | Muster-Merkblatt mitgeben, halb vorgefüllt zum Ergänzen (P13) |
| Concept Maps selbst erstellen | Herkömmliche Lernaktivitäten (z. B. Lesen) | g ≈ 0,74 in Klasse 9–12; Schüler profitieren mehr von teilweise vorgegebenen Maps als von leeren | Schroeder et al. 2018; Gurlitt & Renkl 2008 (zit. n. Brod 2021) | Struktur des Merkblatts vorgeben, Lernende füllen die Kernaussagen (P13) |
| Erlaubter Spickzettel in der Prüfung (selbst erstellt) | Prüfung ohne Spickzettel | uneinheitlich: Einzelstudien finden keinen Vorteil und Hinweise, dass man sich auf den Zettel verlässt (Dickson & Miller 2005; Funk & Dickson 2011); eine Metaanalyse findet für selbst erstellte Hilfen einen Vorteil in der Prüfung (*d* = 0,40) | Larwin, Gorman & Larwin 2013; Hamouda & Shaffer 2016 | Der Gewinn liegt im Erstellen, nicht im Nachschlagen: Merkblatt nach der Selbstüberprüfung aus dem Gedächtnis ergänzen (P13) |
| Lernen mit Simulationen (Situationen, in denen man handelt) | Unterricht ohne Simulation oder Vorher-Nachher-Vergleich | *g* = 0,85 auf komplexe Fertigkeiten, mit unterrichteter Vergleichsgruppe 0,82. Alle 145 Studien stammen aus der Hochschule, 126 aus dem Medizinstudium; gut die Hälfte vergleicht nur vorher und nachher. Hohe Echtheit 0,86, niedrige 0,58; Simulationen bis zu einer Stunde 0,65 | Chernikova et al. 2020 | Simulation als Standardform: Ein Arbeitsgegenstand trägt das Paket, jede Station ist eine Szene daran (P12). Übertragen: für Berufsschulklassen und kurze Pakete mit kleineren Wirkungen rechnen |
| Wie echt muss eine Simulation aussehen? | Aufwendige gegen einfache Simulatoren | kaum Unterschied im Lernerfolg (Medizin); entscheidend ist, dass das Wichtige gut zu erkennen ist | Norman, Dore & Grierson 2012; Chernikova et al. 2024 | Echt in der Funktion (Regeln, Abläufe, Folgen), sparsam im Aussehen; das Wichtige hervorheben |
| Vier Stufen der Beteiligung (ICAP) | Nur lesen oder zuhören (passiv) | Lernergebnisse steigen von passiv über aktiv (etwas tun: bedienen, markieren) und konstruktiv (etwas Eigenes erzeugen: erklären, begründen) bis interaktiv (im Gespräch mit einem Partner) | Chi & Wylie 2014 (Rahmenmodell, gestützt auf Einzelstudien) | In der Szene nicht nur klicken, sondern entscheiden und begründen (konstruktiv). „Interaktiv“ meint hier das Gespräch mit anderen: Das leistet der Unterricht, nicht das Paket |
| Lernspiele (Serious Games) | Herkömmlicher Unterricht | d = 0,29, stärker mit zusätzlicher Anleitung, mehreren Sitzungen und in Gruppen; g = 0,33, gut gestaltete Spiele bringen weitere 0,34 | Wouters et al. 2013; Clark et al. 2016 | Spiel nur zum Üben oder begründet, dann mit Anleitung im Spiel (P12) |
| Lernunterstützung im Spiel (Vormachen, Feedback, Reflexion, Vortraining, Coaching) | Dasselbe Spiel ohne Unterstützung | d = 0,34; ohne Anleitung lernt man vor allem das Spiel | Wouters & van Oostendorp 2013; Mayer 2019 | Ein Spiel vermittelt die Grundlagen selbst (SQL-Island-Prinzip) oder kommt erst zum Üben (P12) |
| Lernstoff als Spielregel (intrinsische Integration) | Dasselbe Spiel, Lernstoff als Quiz zwischen den Spielphasen | Mehr Lernzuwachs bei gleicher Spielzeit; frei wählend spielten Kinder die integrierte Version etwa siebenmal so lange (zwei Studien, Mathematik, 7–11 Jahre) | Habgood & Ainsworth 2011 | Wenn Spiel: Die Spielmechanik prüft das Lernziel (P12) |
| Verführerische Details (interessant, aber ohne Bezug zum Lernziel) | Material ohne solche Details | g = −0,33 (schlechter) | Sundararajan & Adesope 2020 | Im Arbeitsbereich der Szene steht nur, was zur Aufgabe gehört; Story und Figuren tragen den Inhalt, statt ihn zu schmücken |
| Freundliche Gestaltung (warme Farben, Figuren mit Gesicht) | Dasselbe Material neutral gestaltet | kleine Vorteile: Behalten 0,39, Verstehen 0,32, Transfer 0,33 | Brom, Stárková & D’Mello 2018 | Eigene Welt, Kulisse im Kopf und eine Figur als Auftraggeberin schaden nicht, solange sie nicht vom Arbeitsbereich ablenken |

**Was nicht belegt ist:** „Lerntypen“ (etwa der „visuelle Typ“) gibt es nach heutigem Forschungsstand nicht in einer Form, die fürs Unterrichten nützt; sie werden nicht berücksichtigt (Pashler et al. 2008; Kerres 2024). Auch „digital ist automatisch besser“ stimmt nicht: Lernen am Computer bringt über Jahrzehnte nur kleine bis mittlere Vorteile, und nur bei guter didaktischer Gestaltung (Tamim et al. 2011).

## Teil B1: Die dreizehn Prinzipien – Kern und Ausbau

Dreizehn Prinzipien reichen, und nur sieben davon sind Pflicht. Diese sieben bilden den **Kern** („Muss“): P3 bis P8 und P12. Sie sind am besten begründet, in jedem Paket mit vertretbarem Aufwand umsetzbar, und einen großen Teil davon nehmen die Vorlage und das Prüfskript ab. Die übrigen sechs sind **Ausbau** („Soll“): sinnvoll, aber abhängig von Fach, Thema und Zeit. Das frühere P14 (Szene zum Anfassen) ist in P12 aufgegangen; die übrigen Nummern bleiben, damit ältere Unterlagen lesbar bleiben. Die Spalte „Grundlage“ nennt, wie gut ein Prinzip belegt ist und worauf es beruht (Teil A1).

| Nr. | Prinzip | Grundlage | Aufwand | So sieht es im Paket aus | Status |
| --- | --- | --- | --- | --- | --- |
| P1 | Eine realistische Handlungssituation zieht sich durchs ganze Paket | mittel; übertragen (4C/ID: vor allem Hochschule) | gering | Story mit Betrieb und Kundenauftrag (z. B. Korbwerk IT-Service, Bäckerei Brunner) | Ausbau |
| P2 | Vom Einfachen zum Schweren; die Hilfe wird schrittweise weniger | gut; übertragen | gering, den Aufbau liefert die Vorlage | Entdecken → Üben mit Tipps → Selbstüberprüfung ohne Tipps; Aufgaben werden von Station zu Station anspruchsvoller | Ausbau |
| P3 | Erst vormachen: Musterlösungen | gut für Einsteiger; direkt belegt (Schule, Mathematik) | gering | Vorführung je neuem Aufgabentyp mit einer Frage zum Selbsterklären, für Könner überspringbar | **Kern** |
| P4 | Entdecken nur mit Anleitung | gut; direkt belegt | gering | Jede Station hat Auftrag, Vorab-Frage als Leitfrage und Rückmeldung; Übungen mit drei gestuften Tipps | **Kern** |
| P5 | Abfragen statt nochmal lesen | gut; direkt belegt | gering | Kurz-Check an jeder Station: erst die Auflösung der Vorab-Frage, dann 2–3 Fragen, ohne Note | **Kern** |
| P6 | Rückmeldung, die erklärt | mittel; direkt belegt | mittel | Begründung zu jeder Antwort, eigenes Feedback für typische Fehler | **Kern** |
| P7 | Bildschirme nach Mayer gestalten; die Szene ganz im Blick, der nächste Schritt sofort erkennbar | gut für Einsteiger; übertragen (kurze Laborversuche mit Studierenden) | gering bis mittel | Regeln in Teil C3; eine Kopfzeile, je Ansicht höchstens ein hervorgehobener Knopf | **Kern** |
| P8 | Ziele und Erfolgskriterien sichtbar machen; Ziele, Übungen und Selbstüberprüfung passen zusammen | mittel; eigene Entscheidung, gestützt auf Hattie und Kerres | gering | Lernziele als Etiketten auf dem Lernpfad der Startseite und als Satz an jeder Station; mindestens zwei Fragen je Lernziel in der Selbstüberprüfung; Auswertung je Lernziel | **Kern** |
| P9 | Hintergrundwissen und Bedienhinweise trennen | mittel; übertragen (4C/ID) | mittel | Hintergrund in Steckbriefen; Bedienhilfe genau dort, wo sie gebraucht wird | Ausbau |
| P10 | Wiederholen verteilen, Aufgaben mischen | gut; direkt belegt, im einzelnen Paket aber nur ansatzweise umsetzbar | mittel | Fragen aus früheren Stationen; gemischte Aufgaben in der Selbstüberprüfung; Selbsttest-Fragen auf dem Merkblatt für später. Wirklich verteilt wird erst mit einem Folgetest nach einigen Tagen in der Lernplattform | Ausbau |
| P11 | Selbstständiges Lernen anleiten statt voraussetzen | mittel; übertragen (belegt für Trainings und Lerntagebücher, nicht für eine Skala zum Antippen) | gering, die Werkzeuge liefert die Vorlage | Vorlage: Einschätzung einmal je Lernziel nach dem Kurz-Check, im Abschluss neben dem Ergebnis, Fortschritt, Lernempfehlung. Dazu von der Autorin: Reflexionsfrage mit Musterantwort je Übung | Ausbau |
| P12 | Handeln am Gegenstand: Simulation zuerst, jede Station eine Szene zum Anfassen, Spiel nur begründet | mittel; übertragen (Simulationen: Hochschule, vor allem Medizin; Lernspiele: gemischt) | mittel mit Baukasten, hoch bei eigenen Geräten | Phase „Erfinden“ wählt die Form in fester Reihenfolge (Simulation, interaktive Illustration, Spiel zum Üben, Lernspiel nur begründet); Szene groß in der Mitte und auf 1366 × 768 ganz zu sehen; Vorführung „Zeig’s mir“; Text kurz daneben; Plattform-Probe; Folgen statt Punkte, keine Ranglisten | **Kern** |
| P13 | Ergebnisse sichern: Merkblatt selbst ergänzen | mittel; übertragen | gering bis mittel | Halb vorgefülltes Merkblatt je Lernziel nach der Selbstüberprüfung: aus dem Gedächtnis ergänzen, mit dem Muster vergleichen, als PDF mit Selbsttest-Fragen herunterladen | Ausbau |

**Kern klein halten.** Frühere Fassungen hatten elf Muss-Prinzipien und über dreißig Muss-Punkte in der Checkliste; das überfordert Autorinnen und macht die einzelne Regel beliebig. Zwei Entscheidungen halten den Kern klein. Erstens: Was die Vorlage von selbst liefert (Aufbau mit abnehmender Hilfe, Einschätzung, Fortschritt, Datenübergabe), steht nicht mehr als Aufgabe in der Checkliste, sondern wird vom Prüfskript geprüft. Zweitens: Eine Regel wird erst dann zum Muss, wenn sie in mindestens einem Paket mit Schülern erprobt wurde und sich bewährt hat; bis dahin ist sie Ausbau.

**Zu P13: Merkblatt statt Spickzettel.** Ein fertiges Cheat Sheet zum Herunterladen sichert allein wenig: Nachlesen ist bloßes Wiederlesen. Ob erlaubte Spickzettel in Prüfungen helfen, ist umstritten; wo sie helfen, liegt der Gewinn im Erstellen (Teil A2). Wirksam wird das Merkblatt, wenn Lernende es nach der Selbstüberprüfung aus dem Gedächtnis ergänzen, mit dem Muster vergleichen und später zum Selbsttest nutzen. So verbindet P13 Abrufen (P5), Feedback (P6) und verteiltes Wiederholen (P10); Aufbau und Ablauf stehen in Teil C2.

**Zu P12: Handeln am Gegenstand.** Die ersten Pakete nach diesem Leitfaden waren gut begründet, aber oft lange Texte mit einem Quiz darunter. Die PING-Pakete zeigen, was stattdessen trägt: Man zerlegt einen PC, tippt Befehle in ein simuliertes Terminal, baut ein Netzwerk um. Lernpakete lohnen sich dort, wo Lernende entdecken, ausprobieren und Folgen sehen – bei dem, was die Lernplattform mit Test, H5P oder Lückentext nicht kann. Deshalb ist die Szene der Kern jeder Station, nicht ein Zusatz. Das geht auch außerhalb der IT: Dokumente prüfen, im nachgebauten Portal recherchieren, Formulare ausfüllen, Kundengespräche führen, Belege sortieren.

Die stärkste Form ist ein Arbeitsgegenstand, der das ganze Paket trägt: der Server im Terminal („Shell Yeah!“, „Get-Going!“), das PC-Gehäuse („Plug & Pray“) oder der Lageplan zweier Gebäude („Strukturierte Verkabelung“). Der Lernstoff steckt in den Regeln des Gegenstands: Die Grafikkarte lässt sich erst ausbauen, wenn das Stromkabel ab ist; der Befehl ping antwortet erst, wenn die Route stimmt. Echt sein muss dabei die Funktion, nicht jede Einzelheit des Aussehens: Aufwendige Simulatoren bringen kaum mehr als einfache, und es hilft, wenn das Wichtige gut zu erkennen ist (Norman et al. 2012; Chernikova et al. 2024). Dass Simulationen komplexe Fertigkeiten fördern, ist vor allem für das Studium belegt (Chernikova et al. 2020, Teil A2); für kurze Pakete an der Berufsschule ist das eine Übertragung.

Die Phase „Erfinden“ (Teil C1) prüft die Form in fester Reihenfolge: A Simulation eines Arbeitsgegenstands, B interaktive Illustration für abstrakte Inhalte, C eine von beiden zum Vermitteln und ein Spiel zum Üben, wenn Regeln viel Übung brauchen, D ein durchgehendes Lernspiel nur, wenn A und B nicht sinnvoll sind oder die Lehrkraft es ausdrücklich wünscht. Ein Spiel bringt eigene Regeln mit, die zusätzlich gelernt werden müssen; ohne eingebaute Anleitung lernt man vor allem das Spiel. Belegt wirksam sind Spiele mit Lernunterstützung (d = 0,34, Wouters & van Oostendorp 2013) und mit Merkmalen wie Vortraining, Coaching und Selbsterklären (Mayer 2019). Ein Lernspiel vermittelt die Grundlagen deshalb selbst, wie [SQL Island](https://sql-island.informatik.uni-kl.de/): Jeder Spielschritt bringt genau ein neues Konzept als Teil der Geschichte, der erste Zug wird vorgemacht, und der Lernstoff ist die Spielregel. Mit dem Stoff als Spielmechanik lernten Kinder mehr als mit demselben Stoff als Quiz zwischen den Spielphasen (Habgood & Ainsworth 2011). Story, Figuren und Kulisse ohne Bezug zum Lernziel lenken im Arbeitsbereich ab (verführerische Details, Teil A2); als Rahmen im Kopf und auf der Startseite stören sie nicht.

**Querschnitt: früh bauen und erproben.** Kein Prinzip ersetzt den Test mit echten Schülern. Deshalb entsteht der Prototyp einer Station gleich nach dem Konzept, und ein Kurztest mit drei bis fünf Schülern gehört zu jedem Paket (Teil C1, Phase 6; Muss in Teil C6).

**Bezug zu den vorhandenen PING-Paketen:** „Shell Yeah!“, „Get-Going!“, „Plug & Pray“ und „Netzwerktopologien erleben“ erfüllen P1, P2, P4, P5 und P8 bereits weitgehend (Story, Tutorial → Üben → Abschlusstest, gestufte Tipps, Kurz-Checks, Auswertung je Lernziel). Nachschärfen lassen sich vor allem P6 (Feedback, das erklärt), P10 (verteilte Wiederholung) und P11 (Selbsteinschätzung). Auf Kompass 4.0 sind sie noch nicht umgestellt (Kopfzeile, Selbstüberprüfung statt Nachweis, Tafelbild-Szenen).

## Teil B2: Was wir bewusst nicht übernehmen

Einige Ideen aus Forschung und Praxis sind entweder schlecht belegt oder für einzelne SCORM-Pakete zu aufwendig. Sie werden nicht verlangt.

| Idee | Warum nicht (oder nur vereinfacht) |
| --- | --- |
| Das vollständige 4C/ID-Planungsverfahren mit ausführlicher Aufgabenanalyse | Für ein Paket von wenigen Stunden zu aufwendig. Wir nutzen eine vereinfachte Form: Aufgaben von leicht nach schwer, gestufte Tipps, Hintergrundwissen getrennt von Bedienhilfe. |
| KI-gesteuerte Lernpfade, die sich automatisch anpassen | Kein belegter Vorteil gegenüber gut gemachten Lernprogrammen, hoher Aufwand, offene Datenschutzfragen. |
| Möglichst viel Wahlfreiheit als Qualitätsmerkmal | Freie Wahl allein bringt praktisch nichts (*g* = 0,05). Freiheit nur zusammen mit Orientierung. |
| Varianten für verschiedene „Lerntypen“ | Nicht belegt; auch Kerres (2024) stellt klar: Lerntypen gibt es nicht. |
| Erklärungen standardmäßig vorlesen lassen (Modalitätsprinzip) | Wirkt im Labor, aber im Klassenzimmer fehlen oft Kopfhörer, und Gesprochenes lässt sich schlecht überfliegen. Ton ist optional, Text immer kurz und in Schritten. Wo doch Ton eingesetzt wird: eine natürlich klingende Stimme (Stimmprinzip; moderne KI-Stimmen schneiden deutlich besser ab als die blechernen Computerstimmen früher Studien) und immer mit zuschaltbarem Text. |
| Hatties Rangliste als Entscheidungsgrundlage | Methodisch umstritten; nur zur Orientierung. |
| Punkte, Abzeichen, Ranglisten als Ersatz für echte Motivation | Wirkung auf das Verhalten klein und unsicher; Belohnungen können die Freude an der Sache sogar schmälern. |
| Erst ein komplettes Konzept, dann bauen | Mit KI ist ein Probelauf in Stunden gebaut; Fehler zeigen sich am Probelauf schneller als im Konzeptpapier. |
| Bestanden oder nicht bestanden im Lernpaket | Das Paket endet mit einer Selbstüberprüfung, die nicht zählt. Wer im Paket für einen Fehlversuch „durchfällt“, übt vorsichtiger und probiert weniger aus. Den Kompetenznachweis legt man außerhalb des Pakets ab (Teil C2). |

## Teil C1: Der Entwicklungsprozess in sieben Phasen

Jedes Paket durchläuft sieben Phasen; sie folgen ADDIE, laufen aber in kurzen Schleifen, und gebaut wird früh: Der Prototyp einer Station entsteht gleich nach dem Konzept, noch vor dem ausführlichen Drehbuch. Kerres (2024) empfiehlt ein solches schrittweises Vorgehen ausdrücklich, wenn das Team klein ist, die Lehrkraft selbst inhaltlich mitarbeitet und das Ziel am Anfang noch nicht ganz klar ist: So liegt jederzeit eine nutzbare Version vor, und Wichtiges wird verlässlicher fertig als „schöne Extras“. Zu jeder Phase gehört ein konkretes Ergebnis, das ins Repository kommt.

*(Ablaufdiagramm: Klären → Zielen → Erfinden → Prototyp bauen → Entwerfen und ausbauen → Erproben → Einsetzen und auswerten, mit Rücksprüngen nach Erprobung und Auswertung; nur in der Dokumentfassung.)*

1. **Klären (Analyse).** Welches Lernproblem löst das Paket, für wen, in welchem Rahmen? Ein Paket kann nur ein Lernproblem lösen; fehlen Geräte, Zeit oder Begleitung, hilft es allein nicht. Ergebnis: *Steckbrief* (eine Seite) mit Fach, Klasse, Lehrplanbezug, Vorwissen, Motivation und Erfahrung mit selbstständigem Lernen, Einsatzform (SeGeL oder klassisch), Geräten, Zeitrahmen, einer ersten Idee für die Leitsituation und den Kerninhalten.
2. **Zielen (Lernziele zuerst).** Drei bis acht überprüfbare Lernziele formulieren, dann sofort festlegen, woran man das Können erkennt: eine Handlungsaufgabe (Selbstüberprüfung Teil A) und mindestens zwei Fragen je Lernziel (Teil B), zunächst als Stichpunkte. Erst wenn feststeht, was die Lernenden am Ende können sollen, lässt sich entscheiden, welcher Gegenstand das trägt. Ergebnis: *Lernziel-Tabelle* (Lernziele und Selbstüberprüfung).
3. **Erfinden (Simulation zuerst).** Die kreative Phase (P12): Welcher Arbeitsgegenstand trägt die Lernziele? Die Form wird in fester Reihenfolge geprüft – Simulation, interaktive Illustration, eine von beiden mit Spiel zum Üben, durchgehendes Lernspiel nur begründet. Claude berät die Lehrkraft dazu und schlägt eine Umsetzung vor, bei Bedarf mit einer Alternative, jeweils mit einem Mockup des Bildschirms, einem Beispielzug, der Tabelle „Lernziel → Regel oder Reaktion des Gegenstands“, den Folgen von Fehlern und der Plattform-Probe; die Lehrkraft wählt. Ergebnis: *Konzept* mit der Entscheidung (Form und Umsetzung in der Vorlage) und einem Kurzplan für Station 1.
4. **Prototyp bauen.** Gleich danach eine einzige Station (bei einem Spiel: Level 1, im Simulationsmodus: Kapitel 1) mit zwei Fragen vollständig bauen und im Browser ausprobieren. Ein Mockup auf dem Papier zeigt nicht, ob eine Szene trägt; der Prototyp zeigt es in einer Stunde. Erst wenn Form, Optik und Bedienung überzeugen, lohnt sich das ausführliche Drehbuch. Ergebnis: *lauffähiger Prototyp*; wenn die Form nicht trägt, zurück zu Phase 3.
5. **Entwerfen und ausbauen.** Drehbuch für alle Stationen: Leitsituation und Story, Aufgaben von einfach nach komplex, Vorführungen, gestufte Tipps, Tafelbild-Szenen. Besonders wichtig: typische Fehler und Fehlvorstellungen der Schüler sammeln, denn daraus entstehen gute Falschantworten und gutes Feedback. Dann der Fragenpool als Markdown-Datei, die die Lehrkraft direkt liest und prüft, und der Rest des Pakets. Ergebnis: *Drehbuch*, *Fragenpool*, *lauffähiges Paket* (ZIP).
6. **Erproben.** Selbsttest mit Prüfskript und Checkliste (Teil C6), Review durch eine Kollegin oder einen Kollegen (fachlich und didaktisch), Kurztest mit drei bis fünf Schülern, die laut denken (Beobachtungsbogen im Skill-Set), Test in der echten ByCS-Lernplattform. Der Kurztest ist Pflicht: Er zeigt, was kein Prinzip vorhersagt. Ergebnis: *Änderungsliste*; zurück zu Phase 5.
7. **Einsetzen und auswerten.** Nach dem Einsatz den Bericht aus der Lernplattform exportieren: Welche Fragen lösen fast alle falsch (unklar oder zu schwer), welche fast alle richtig (zu leicht)? Reflexionsantworten lesen. Ergebnis: *neue Version* mit Versionsnummer und kurzem Änderungsprotokoll; bei Bedarf zurück zu Phase 2.

**Rollen.** Die Lehrkraft verantwortet fachliche Richtigkeit, Lernziele und Selbstüberprüfung; die KI übernimmt Programmierung, Gestaltung und Entwürfe. Alles, was die KI fachlich formuliert, wird von der Lehrkraft geprüft.

## Teil C2: Standardstruktur eines Lernpakets

Jedes Paket folgt demselben Grundmuster aus fünf Teilen. Es ist aus den PING-Paketen entstanden und setzt die Ansätze aus Teil A um: zuerst zeigen, dann begleitet üben, zuletzt selbstständig können. Einheitlichkeit hat einen eigenen Nutzen: Schüler müssen die Bedienung nur einmal lernen und können sich ganz auf den Inhalt konzentrieren.

| Teil | Zweck | Warum so (siehe Teil A) | Mindeststandard |
| --- | --- | --- | --- |
| 0 Einstieg | Orientierung und Motivation | Erst Orientierung: ein Überblick, der in Sekunden erfasst ist (grafischer Advance Organizer); was Mitdenken verlangt, steht dort, wo es wirkt (an der Station) | Startseite als Überblick: Szene mit Leitsituation (höchstens etwa 40 Wörter), Lernpfad mit den vier Teilen und den Lernzielen als kurze Etiketten (höchstens vier Wörter, ganzer Satz beim Antippen), Dauer, genau ein Knopf; keine Eingaben, ohne Scrollen auf Laptop und Tablet. Unaufdringlich daneben: die Abkürzung „Ich kenne mich schon aus“ |
| ① Entdecken (Tutorial) | Neues verstehen | Vormachen vor Nachmachen; Handeln in realistischen Situationen; Bildschirme nach Mayer | Stationen als Szene zum Anfassen (P12) mit je einem Auftrag; am Anfang das Lernziel als Satz und eine Vorab-Frage, die als Leitfrage über der Szene stehen bleibt; neue Begriffe neben der Szene; Lösungsbeispiel als Vorführung in der Szene vor der eigenen Aufgabe; Kurz-Check am Ende der Station: erst die Auflösung der Vorab-Frage, dann 2–3 Fragen (ohne Vorab-Frage 2–4); danach einmal je Lernziel die Einschätzung mit einem Klick; jede Station endet mit einem Bezug zur echten Praxis |
| ② Üben | Können aufbauen | Anwenden in wechselnden Situationen, von leicht nach schwer, mit abnehmender Hilfe | Eine Übung je Lernziel oder Kapitel, wechselnde Situationen; drei gestufte Tipps (Denkanstoß, Teillösung, Lösung); Feedback mit Begründung; Reflexionsfrage mit Musterantwort |
| ③ Selbstüberprüfung | Selbst prüfen, ob das Thema sitzt | Eine ganze Aufgabe ohne Hilfe lösen; Abfragen festigt das Gelernte | Teil A: Handlungsaufgabe in neuer Situation, ohne Tipps; Teil B: Fragen aus einem Pool, mindestens zwei je Lernziel, gemischte Fragetypen; zählt nicht und ist beliebig oft wiederholbar; ab 80 % „sitzt das Thema“ (Standard, begründet abweichbar); an die Lernplattform gehen das beste Ergebnis als Information und der Status „abgeschlossen“, nie bestanden oder nicht bestanden |
| 4 Abschluss | Integration, Sicherung und Transfer | Gelerntes einordnen und aus dem Gedächtnis sichern; über das eigene Lernen nachdenken | Auswertung je Lernziel, daneben die eigene Einschätzung von der Station, mit Lernempfehlung; Merkblatt zum Ergänzen und Herunterladen (P13, siehe unten); Ergebnis als PDF druckbar; Rückverweis auf passende Stationen |

**Selbstüberprüfung und Kompetenznachweis.** Das Paket endet mit einer Selbstüberprüfung: Lernende sehen selbst, ob sie so weit sind. Sie zählt nicht, lässt sich beliebig oft wiederholen und sagt ab 80 % „das Thema sitzt“. Ob jemand ein Thema nachweislich beherrscht, entscheidet erst der **Kompetenznachweis**. Er liegt außerhalb des Pakets: im SeGeL-Kurs beaufsichtigt in der Lernplattform, mit eigenen Aufgaben und der Entscheidung bestanden oder nicht. So bleibt im Paket alles Üben, und niemand fällt bei einem Versuch durch. Frühere Fassungen nannten den Teil „Nachweis“ und meldeten bestanden oder nicht bestanden an die Lernplattform; ältere Pakete sind daran zu erkennen (Teil C5).

**Startseite: Überblick statt Arbeitsblatt.** Die Startseite hat eine Aufgabe: Lernende sehen in wenigen Sekunden, worum es geht, was vor ihnen liegt und wo sie stehen. Frühere Fassungen der Vorlage stellten dort Leitsituation, Ablauf, Glossar, alle Lernziele mit Selbsteinschätzung und den Vorwissens-Check untereinander; in den Beispielpaketen zum Handelsregister waren das über 400 Wörter und 40 Eingabefelder vor dem ersten Klick. Das widerspricht P7 (ein nächster Schritt, Fünf-Sekunden-Test) und schwächt die Bausteine selbst.

Wer Ziele einschätzen soll, deren Begriffe er noch nicht kennt, rät; treffsicher wird die Einschätzung erst nach einem ersten Abrufversuch (Rhodes & Tauber 2011). Vorab-Fragen wirken am besten direkt vor dem Inhalt, der die Antwort klärt (Pan & Carpenter 2023), Vortraining direkt vor dem Ablauf, in dem die Begriffe vorkommen. Deshalb zeigt die Startseite nur Szene, Lernpfad und einen Knopf; Lernziel als Satz, Vorab-Frage, neue Begriffe und Einschätzung stehen an der Station. Das passt zur Arbeitsteilung mit der Lernplattform: Ausführliche Texte kann die Kursseite zeigen, das Paket liefert die kompakte, anschauliche Übersicht.

**Fragetypen.** Die Vorlage kennt sechs: Einfachauswahl, Mehrfachauswahl, Zuordnen, Zahleneingabe, Texteingabe und Hotspot (Stelle im Bild anklicken); jede Frage kann ein Bild tragen. Falschantworten werden aus den gesammelten typischen Fehlern gebildet, nicht erfunden. Jede Frage trägt das Lernziel, zu dem sie gehört.

**Merkblatt (P13).** Nach der Selbstüberprüfung öffnet sich ein halb vorgefülltes Merkblatt, gegliedert nach Lernzielen. Lernende ergänzen die Kernaussagen ohne Zurückblättern und vergleichen dann mit dem Muster. Zum Herunterladen gibt es eine Seite als PDF: vorne die eigenen Einträge neben dem Muster, der typische Fehler mit Korrektur, ein kurzes gelöstes Beispiel und bei Abläufen das Schritt-Schema. Hinten stehen fünf Selbsttest-Fragen ohne Lösung mit dem Hinweis „In 1–2 Wochen nochmal beantworten“; die Lösungen sind im Paket. Früher freigeschaltet würde das Merkblatt nur gelesen oder zum Spickzettel für die Selbstüberprüfung. Im SeGeL-Unterricht gehört es ins Lernportfolio. Wir nennen es bewusst „Merkblatt“, nicht „Cheat Sheet“.

**Tafelbild: der Mittelteil des Inputs.** Zu einem Thema gehört in der Regel ein kurzer Input der Lehrkraft. Er läuft auf Folien (bei uns: psi-slides in SailorSloth) und hat fünf Teile: Einstieg, Erklären, Beispiel, Üben, Sicherung. Das Paket liefert dafür einen Baustein, das **Tafelbild**: die interaktiven Bilder des Pakets, groß, Schritt für Schritt und ohne erklärenden Text; die Lehrkraft erklärt mündlich (Bild plus gesprochenes Wort statt Bild plus Text an der Wand, vgl. Redundanzprinzip). Das Tafelbild ersetzt nur den Mittelteil, also Erklären und Beispiel: Dort wählt die Lehrkraft zwischen Folie und Tafelbild. Einstieg, Üben und Sicherung bleiben auf den Folien. Jede Szene folgt dem Muster *Vorhersagen → Klicken → Deuten*. Regeln:

- **Zwei bis vier Tafelbild-Szenen gehören zu jedem Paket (Soll).** Sie entstehen aus den Szenen der Stationen und kosten wenig, wenn der Gegenstand schon gebaut ist. Mehr braucht der Mittelteil nicht.
- Das Tafelbild zeigt nichts, was im Paket fehlt, und jede Szene verweist auf ihre Station. Formeln, Vor-/Nachteil-Listen und Details bleiben in den Stationen; das Paket bleibt allein vollständig.
- Zugang: Symbol „Tafelbild“ in der Kopfzeile und Aufruf als Präsentation über `index.html#tafel` (als Link aus den Folien). Auf der Startseite steht kein eigener Hinweis. Öffnen Schüler das Tafelbild selbst, sind kurze Erklärungen zuschaltbar.
- Das Tafelbild speichert nichts und verändert weder Fortschritt noch Ergebnis.
- **Ein Ablaufplan, nicht zwei.** Den Ablauf des Inputs hält die Lehrkraft in den Notizen ihrer Folien fest (bei psi-slides: Notizen mit Zeitmarken im Cockpit). Dort steht auch, ab wo und mit welchen Szenen das Tafelbild übernehmen kann: Klicks und Tasten, Vorhersage-Frage, erwartete Fehlvorstellung, Kernaussage, Rückweg zur Folie. Eine eigene Ablaufplan-Datei gibt es nicht mehr; das Skill-Set liefert die Bausteine für diese Notizen (`tafelbild-notizen.md`), abgelegt neben dem Paket, nicht im ZIP.

Älteres Beispiel, noch als eigener Input von 20 Minuten mit sechs Szenen und eigenem Ablaufplan: „Netzwerktopologien erleben“ (Version 2) im [PING-Repository unter `packages/netzwerktopologien/lehrer/`](https://github.com/dennismarcbusch/PING/tree/main/packages/netzwerktopologien/lehrer).

**Größe.** Ein Paket deckt ein Thema ab, das sich in einem Satz benennen lässt. Wird das Drehbuch länger als etwa acht Stationen, lohnt es sich, zwei Pakete daraus zu machen.

Kerres (2024) nennt als Richtwert Lerneinheiten von 30 bis 45 Minuten, drei bis neun davon pro Kapitel und höchstens drei Gliederungsebenen. Wichtiger als die genaue Zahl ist, dass alle Einheiten gleich gerahmt sind: Jede beginnt mit Orientierung (worum es geht, wozu, wie lange) und endet mit einem Abschluss (Kurz-Check oder Zusammenfassung).

## Teil C3: Gestaltungsregeln

Die Regeln übersetzen die Prinzipien in überprüfbare Vorgaben; in Klammern steht der Fachbegriff, unter dem man bei Bedarf mehr dazu findet.

**Simulation und Szene zuerst, eigene Welt (P12)**

- Jede Station ist eine Szene, in der die Lernenden etwas bewegen: ein Dokument prüfen, ein Formular ausfüllen, im nachgebauten Portal recherchieren, ein Gespräch führen, sortieren, ein Gerät einstellen. Erst die Szene planen, dann den Text.
- Die Szene steht groß in der Mitte und ist auf einem Schullaptop (1366 × 768) ganz zu sehen, ohne Scrollen; das Prüfskript misst Ober- und Unterkante. Der Auftrag steht als Sprechblase der Figur (1–2 Sätze), „Kurz erklärt“ in einer schmalen Notiz daneben (höchstens etwa 40 Wörter); zusammen höchstens etwa 90 Wörter je Station. Im Simulationsmodus gilt je Schritt: höchstens etwa 60 Wörter.
- Erklärungen erscheinen dann, wenn sie gebraucht werden: als Reaktion auf das, was die Lernenden gerade tun.
- Das Lösungsbeispiel wird in der Szene vorgeführt („Zeig’s mir“), an einem anderen Fall; danach sind die Lernenden dran.
- Echt in der Funktion, sparsam im Aussehen: Dokumente, Portale und Geräte verhalten sich wie im Beruf (Felder, Abläufe, Folgen), mit erfundenen Firmen und Daten. Gezeigt wird, was zur Aufgabe gehört, und das Wichtige ist gut zu erkennen (Teil A2). Echte Webseiten werden als Übungsversion nachgebaut, nicht kopiert.
- Fehler wirken sich in der Szene aus wie in echt (die Kundin fragt nach, der Server antwortet nicht), dazu ein Satz zur Fehlvorstellung.
- Gleiche Bedienung, eigene Welt: Aufbau und Bedienung sind in allen Paketen gleich; jedes Paket hat eigene Farben, eine Kulisse und illustrierte Figuren passend zum Fach. Kulisse und Figuren stehen im Kopf, auf der Startseite und beim Auftrag (Sprechblase); im Arbeitsbereich der Szene steht nur, was zur Aufgabe gehört. Figuren vielfältig besetzen, keine realen Personen nachbilden.
- Das Konzept aus der Phase „Erfinden“ gibt den Rahmen vor: Bei einer Simulation mit einem durchgehenden Arbeitsgegenstand steht dieser im Simulationsmodus neben der Lektion und bleibt über alle Kapitel erhalten; die Lektion führt in kleinen Schritten, die sich am Gegenstand selbst abhaken, wie in den Tutorials „Shell Yeah!“ und „Get-Going!“. Üben und Selbstüberprüfung nutzen denselben Gegenstand mit neuen Fällen. Erklärung und Gegenstand stehen so nebeneinander statt nacheinander, und was die Lernenden aufgebaut haben, geht beim Kapitelwechsel nicht verloren. Wechselt der Gegenstand, ist jede Station eine eigene Szene; bei einer interaktiven Illustration ein Ausschnitt desselben Modells. Ein Spiel zum Üben steckt in den Übungen und nutzt die Regel, die im Entdecken geklärt wurde. Ein durchgehendes Lernspiel (Spielmodus, Stationen sind Level) vermittelt die Grundlagen selbst: ein neues Konzept je Schritt in der Story, der erste Zug vorgemacht, Nachschlagen neben dem Spiel. Immer steckt der Lernstoff in den Regeln, Fehler haben Folgen, es gibt keinen Zeitdruck und keine Ranglisten; ein Spielrahmen (Mission mit Karte) ist optional. Im Arbeitsbereich sind Story und Kulisse ohne Bezug zum Lernziel verführerische Details (Teil A2).
- Ein Szenen-Katalog mit Beispielen für alle Fächer liegt im Skill-Set (`szenen.md`).

**Bildschirm und Darstellung (nach Mayer)**

- Wort und Bild zusammen statt Text allein: Zu jeder Erklärung gehört eine passende Grafik, Skizze oder Animation, die zum Inhalt passt, nicht zu einem angeblichen Lerntyp (Multimedia).
- Alles weglassen, was nicht dem Lernziel dient: keine Deko-Bilder, keine Hintergrundmusik, keine „interessanten Nebenfakten“ neben der Aufgabe (Kohärenz). Solche interessanten, aber unwichtigen Details heißen in der Forschung „verführerische Details“: Sie ziehen Aufmerksamkeit vom Wesentlichen ab. Die eigene Welt des Pakets ist damit nicht gemeint, solange sie Rahmen bleibt (Kopf, Startseite, Auftraggeberin): Freundliche Gestaltung schadet nicht und hilft eher leicht (Brom et al. 2018).
- Das Wichtige hervorheben: Schlüsselbegriffe fett, im Bild ein Pfeil oder Rahmen genau auf die Stelle, um die es geht, Zwischenüberschriften statt langer Textblöcke. Farben und Markierungen sparsam einsetzen und im ganzen Paket immer mit derselben Bedeutung (Signalisierung).
- Beschriftung direkt ans Bild, nicht in eine Legende darunter; Erklärung und zugehörige Grafik gleichzeitig sichtbar (räumliche und zeitliche Nähe; in der Lernpsychologie spricht man vom „Split-Attention-Effekt“, der geteilten Aufmerksamkeit).
- Alles, was für eine Aufgabe nötig ist, gleichzeitig sichtbar halten: Auftrag, Bild oder Terminal und Eingabe stehen auf einem Bildschirm, ohne Scrollen oder Umschalten.
- Benötigte Informationen (Steckbrief, Kundenauftrag, Tabelle) neben der Aufgabe einblenden statt in einem anderen Reiter oder Pop-up. Ist der Platz knapp, eignet sich eine aufklappbare Seitenleiste, die beim Arbeiten offen bleiben kann.
- Tipps so platzieren, dass sie nicht verdecken, worauf sie sich beziehen.
- Im Entdecken- und Übungsteil erscheint das Feedback direkt an der Antwort oder Stelle, um die es geht, nicht gesammelt an anderer Stelle.
- Auf dem Zielgerät prüfen, besonders auf dem Tablet, wo weniger Platz ist.
- Inhalte in kleine Schritte teilen, die Lernende selbst weiterklicken (Segmentierung).
- Fachbegriffe vorab kurz einführen, bevor sie in einem komplexen Ablauf auftauchen (Vortraining): an der Station, an der sie zuerst gebraucht werden, als Begriffe zum Antippen neben der Szene, nicht gesammelt auf der Startseite.
- Denselben Text nicht gleichzeitig vorlesen und anzeigen (Redundanz).
- Locker und direkt ansprechen („Du“ bzw. „Sie“ je nach Zielgruppe), nicht im Lehrbuchton (Personalisierung).
- Einheitliche Bedienung und einheitlicher Aufbau über alle Pakete; jedes Paket hat seine eigene Welt (Farben, Kulisse, Figuren) mit einer einzigen Akzentfarbe für den nächsten sinnvollen Schritt.

Ergänzend nach Kerres (2024, Kap. 6.6):

- Das Bild vor dem zugehörigen Text zeigen; es dient als Anker für das Lesen.
- Für Einsteiger einfache Skizzen und Schemata statt Fotos oder realistischer Animationen; die Vereinfachung zeigt, worauf es ankommt.
- Einfache Grafiken mit kurzem Text erklären; sehr komplexe Abläufe dürfen zusätzlich eine gesprochene Erklärung bekommen.
- Persönliche Ansprache dosiert einsetzen und optisch vom Lernstoff abheben, z. B. als Sprechblase der Story-Figur.
- Den Bezug zu Beruf oder Alltag ausdrücklich nennen: Wozu brauche ich das?
- Signalisieren, dass die Aufgabe Anstrengung verlangt, aber zu schaffen ist; wirkt ein Angebot zu leicht, wird es nur überflogen.

**Orientierung: Wo geht es weiter?**

Signale braucht nicht nur der Lernstoff, sondern auch die Bedienung. Wer suchen muss, wo es weitergeht, verbraucht Aufmerksamkeit, die dem Lernen fehlt. Mayers Signalisierungsprinzip bezieht sich auf Inhalte; für die Bedienung stützen sich die folgenden Regeln auf Kerres' Forderung nach einfacher Navigation und auf Grundregeln guter Software-Bedienung.

- Je Bildschirm ist höchstens ein Knopf hervorgehoben: der nächste sinnvolle Schritt. Solange eine Aufgabe offen ist, ist das die Aufgabe selbst (für Neulinge die Vorführung „Zeig’s mir“), nicht „Weiter“. Der Weiter-Knopf steht immer unten rechts, bekommt die Akzentfarbe aber erst, wenn die Aufgabe erledigt ist; vorher sähe er aus wie die Aufforderung, sie zu überspringen. Nur die Startseite hat immer genau einen hervorgehobenen Knopf.
- Die Akzentfarbe ist für diesen einen Schritt reserviert, nicht für Deko oder Überschriften.
- Was gerade zu tun ist, steht als kurzer Auftrag oben auf dem Bildschirm, nicht versteckt im Fließtext.
- Ist eine Aufgabe erledigt, zeigt das Paket das sofort sichtbar und benennt den nächsten Schritt („Geschafft! Weiter zu Station 4: Arbeitsspeicher einsetzen“).
- Eine Fortschrittsanzeige zeigt, wo man steht und was schon erledigt ist. Sie steht in der Kopfzeile bei den Teilen („① Entdecken 2/3“) und als Punkte im Kopf der Station, nicht in eigenen Zeilen: Kopf, Teile und Fortschritt brauchen zusammen eine Zeile, damit auf 1366 × 768 gut 600 Pixel Höhe für die Aufgabe bleiben.
- Noch nicht verfügbare Schritte bleiben sichtbar, sind aber erkennbar ausgegraut, mit kurzem Grund.
- Anklickbares sieht anklickbar aus; Dekoratives nicht.
- Kein wichtiger Knopf liegt unbemerkt außerhalb des sichtbaren Bereichs, auch nicht auf dem Tablet.
- Prüfen mit dem Fünf-Sekunden-Test: Jemand sieht einen Bildschirm kurz an und sagt, was als Nächstes zu tun ist. Klappt das nicht, fehlt ein Signal.
- Die Startseite ist ein Überblick, kein Arbeitsblatt: Szene mit Leitsituation (höchstens etwa 40 Wörter), Lernpfad mit den Lernzielen als Etiketten, genau ein Knopf, keine Eingaben, ohne Scrollen auf Laptop (1366 × 768) und Tablet. Das Prüfskript misst das.

**Aufgaben und Übungen**

- Jede Aufgabe beginnt mit einem Auftrag aus der Leitsituation („Mira bittet dich …“), nicht mit „Aufgabe 3“.
- Erst Lösungsbeispiel, dann ähnliche Aufgabe, dann veränderte Aufgabe (Lösungsbeispiele, Ausblenden der Hilfe). Für Handgriffe und Verfahren gilt das immer. Wo ein Zusammenhang verstanden werden soll, dürfen Lernende die Szene auch zuerst erkunden: Die Vorab-Frage gibt dem Erkunden ein Ziel, und die Vorführung bleibt einen Klick entfernt (Teil A2, „erst selbst versuchen“).
- Lernende zum Mitdenken auffordern, nicht nur zum Lesen: Im Lösungsbeispiel steht an einem entscheidenden Schritt eine Frage zum Selbsterklären („Warum ist dieser Schritt nötig?“) – erst selbst überlegen, dann die Begründung aufklappen. Nach Stationen und Übungen regelmäßig ein kurzer Auftrag zum Skizzieren, Zusammenfassen in eigenen Worten oder Erklären für andere (generative Lernaktivitäten).
- Situationen variieren (andere Kunden, andere Geräte, andere Daten), damit Wissen übertragbar wird (4C/ID).
- Geprüft wird das Ergebnis, nicht ein bestimmter Lösungsweg; alternative richtige Wege werden akzeptiert.

* Kurz-Checks und Übungen deutlich als „zählt nicht“ kennzeichnen: Lernaufgaben sind keine Testaufgaben.
* Multiple Choice nicht unterschätzen: Gut gebaute Fragen, bei denen mehrere Antworten richtig sein können, verlangen echtes Nachdenken und lassen sich kaum erraten. Bei Eingabefeldern alle richtigen Schreibweisen akzeptieren.
* Im Entdecken- und Übungsteil nicht hart sperren („erst weiter, wenn alles richtig ist“), sondern einen nächsten Schritt vorschlagen.

**Tipps (immer drei Stufen)**

1. Denkanstoß: Worauf solltest du achten?
2. Teillösung oder Hinweis auf die passende Stelle im Entdecken-Teil.
3. Vollständige Lösung mit kurzer Begründung.

Tipps werden aktiv angefordert und zählen im Üben nicht gegen die Lernenden; in der Selbstüberprüfung gibt es keine.

**Für Lernende mit Vorwissen**

Was Einsteigern hilft, kann Fortgeschrittene bremsen: Ausführliche Erklärungen, Lösungsbeispiele und kleinschrittige Anleitungen kosten sie Zeit und Aufmerksamkeit, ohne etwas Neues zu bringen, und können das Lernen sogar verschlechtern (Expertise-Umkehr-Effekt, Kalyuga 2007). Ein Paket sollte deshalb Hilfe anbieten, aber nicht aufzwingen.

- Jede Station beginnt mit einer Vorab-Frage („Was vermutest du?“, zählt nicht). Wer richtig liegt, darf die Station überspringen; wer falsch liegt, lernt danach gezielter. Die Vorab-Frage ist zugleich die Leitfrage der Station: Sie bleibt über der Szene stehen, und der Kurz-Check löst sie als Erstes auf. Das ist wichtig, denn Vorab-Fragen helfen vor allem bei genau dem, wonach gefragt wurde, und nur, wenn die richtige Antwort danach auch gelernt wird (Pretesting, Teil A2). Sie zielt deshalb auf den Kern der Station; eine zusätzliche Leitfrage gibt es nicht.
- Die Abkürzung „Ich kenne mich schon aus“ auf der Startseite stellt alle Vorab-Fragen auf einem eigenen Bildschirm; was sitzt, wird auf dem Lernpfad als überspringbar markiert. Vorab-Fragen sind schwer zu erraten (Zahl, Text, Zuordnen oder Mehrfachauswahl), sonst trifft die Empfehlung Glückspilze.
- Ausführliche Erklärungen und Lösungsbeispiele sind aufklappbar, nicht Pflichtlektüre; die Kurzfassung steht sichtbar.
- Tipps gibt es nur auf Anforderung (siehe oben).
- Übersprungene Stationen bleiben jederzeit erreichbar; die Selbstüberprüfung ist für alle gleich.

**Ton, Inklusion und Deutsch als Zweitsprache**

Die Gestaltungsregeln sind Faustregeln. Für manche Lernende gelten sie nur eingeschränkt, deshalb zusätzlich:

- Gesprochenes ist nie die einzige Quelle: Wo Ton eingesetzt wird, gibt es den Text zum Zuschalten (Untertitel oder Transkript). Lernende mit Hörbeeinträchtigung brauchen ihn, und ohne Kopfhörer geht es im Klassenzimmer oft nicht anders.
- Für Lernende, die noch Deutsch lernen, dürfen Untertitel auch zusätzlich zum Ton laufen, obwohl das Redundanzprinzip davon abrät; das Verstehen der Sprache wiegt hier schwerer.
- Fachbegriffe in einem Glossar sammeln, das jederzeit erreichbar ist; die wichtigsten an der Station vorstellen, an der sie zuerst gebraucht werden (Vortraining).
- Kurze Sätze, geläufige Wörter, eine Information pro Satz. Fachbegriffe bleiben, werden aber erklärt.
- Information nie nur über Ton oder nur über Farbe vermitteln.

**Feedback**

- Zu jeder Antwort: richtig oder falsch, *warum*, und bei Fehlern, was als Nächstes hilft.
- Falsche Antworten, die auf einer typischen Fehlvorstellung beruhen, bekommen ein eigenes Feedback, das diese Fehlvorstellung anspricht.
- Kein reines Lob („Super!“) ohne Information; kein Punktestand als einziges Feedback.
- In der Selbstüberprüfung wirkt sich ein Fehler, wo möglich, realistisch aus (z. B. der PC startet nicht), statt sofort erklärt zu werden; die Erklärung folgt in der Auswertung.

**Story und Spielelemente**

- Eine Rahmengeschichte mit wiederkehrenden Figuren ist erwünscht; sie trägt Motivation und Lebensweltbezug.
- Punkte und Abzeichen nur, wenn sie eine Funktion für das Lernen haben. Kein Zeitdruck: Eine laufende Uhr belastet gerade die Schwächeren und passt nicht zu Aufgaben, die nicht zählen.

* Keine Ranglisten: Fortschritt an einem sachlichen Ziel messen („7 von 9 Lernzielen erreicht“) oder an der eigenen früheren Leistung, nicht am Vergleich mit Mitschülern. Der Vergleich demotiviert schwächere Lernende und widerspricht dem Datenschutz, wenn Ergebnisse für andere sichtbar werden (Kerres 2024).

## Teil C4: SeGeL-Unterricht und klassischer Unterricht mit digitalen Medien

Die Unterscheidung ist nötig, weil im SeGeL-Unterricht das Paket die Aufgaben der Lehrkraft teilweise übernehmen muss: Orientierung, Strukturierung, Rückmeldung und Anleitung zur Selbststeuerung. Im klassischen Unterricht übernimmt die Lehrkraft diese Rollen selbst, und das Paket ist ein Baustein. Der Kern der Prinzipien (P3–P8, P12) gilt in beiden Fällen gleich.

Die Begründung liefert die Forschung zur Selbststeuerung: Mehr Wahlfreiheit allein verbessert das Lernen nicht (*g* = 0,05), angeleitetes selbstreguliertes Lernen dagegen deutlich (rund 0,7 für mehrwöchige Trainingsprogramme an Schulen), ebenso Werkzeuge zur Selbstüberwachung wie Lerntagebücher (*d* = 0,42). Ein SeGeL-Paket muss Selbststeuerung also *unterstützen*, nicht nur *erlauben*. Belegt ist das für Trainings und Lerntagebücher, nicht für einzelne Klicks in einem Paket; die Bausteine der Vorlage sind eine begründete Übertragung und kein Ersatz für die Lernbegleitung.

Kerres (2024) bestätigt das aus der Forschung zum digitalen Lernen: Wer allein am Computer lernt, kommt schneller voran, bricht aber auch häufiger ab, und Phasen mit Lehrkraft verbessern die Ergebnisse. Die Lernbegleitung durch die Lehrkraft bleibt deshalb auch im SeGeL-Unterricht ein fester Bestandteil.

| Merkmal | SeGeL (selbstgesteuert) | Klassisch (lehrkraftgeleitet) |
| --- | --- | --- |
| Rolle des Pakets | Trägt die Lerneinheit vom Einstieg bis zur Selbstüberprüfung | Baustein für eine Phase: Erarbeitung, Übung, Simulation oder Vorbereitung (Flipped) |
| Zeitstruktur | Kein 45/90-Minuten-Raster; Fortschritt wird gespeichert, Wiedereinstieg jederzeit | Abschnitte von etwa 20–30 Minuten, die in eine Stunde passen; Stationen einzeln aufrufbar |
| Einstieg | Im Paket: Startseite mit Leitsituation und Lernpfad, Abkürzung für Lernende mit Vorwissen. Dazu der Input der Lehrkraft auf Folien, im Mittelteil wahlweise mit dem Tafelbild des Pakets (C2) | Durch die Lehrkraft, im Mittelteil z. B. mit dem Tafelbild des Pakets; das Paket kann den Einstieg kurz halten |
| Steuerung | Empfohlener Pfad mit Freiheit beim Tempo; Springen möglich, aber mit Hinweis, was vorausgesetzt wird | Lehrkraft gibt Abschnitte frei bzw. vor |
| Hilfe | Drei gestufte Tipps, Lösungsbeispiele, Glossar und Steckbriefe immer erreichbar; Hinweis, wann man die Lehrkraft fragen sollte | Tipps im Paket; vertiefende Hilfe durch Lehrkraft und Mitschüler |
| Selbstregulation | Liefert die Vorlage: Lernziel an jeder Station, Einschätzung einmal je Lernziel nach dem Kurz-Check, im Abschluss neben dem Ergebnis, Fortschrittsanzeige, Lernempfehlung nach der Selbstüberprüfung. Dazu Reflexionsfragen mit Musterantwort (Soll) | Optional; Reflexion und Sicherung im Plenum |
| Selbstüberprüfung und Kompetenznachweis | Selbstüberprüfung im Paket: zählt nicht, beliebig oft. Der Kompetenznachweis liegt außerhalb des Pakets, beaufsichtigt in der Lernplattform, bestanden oder nicht | Selbstüberprüfung als Übung oder Hausaufgabe; die Lernzielkontrolle macht die Lehrkraft |
| Rolle der Lehrkraft | Lernbegleitung: Auswertung der Daten, gezielte Gespräche mit Lernenden, die hängen | Unterrichtsleitung: Einführung, Moderation, Sicherung der Ergebnisse |
| Daten für die Lehrkraft | Wichtig: Ergebnisse je Lernziel und je Frage, Bearbeitungsstand | Hilfreich, aber nicht zwingend |
| Lebensweltbezug (K+5) | Trägt die Motivation über längere Zeit: echte Aufgaben, Bezug zu eigenen Geräten und Medien | Kann von der Lehrkraft im Unterrichtsgespräch hergestellt werden |

**Festlegung:** Pakete grundsätzlich für SeGeL bauen und so gliedern, dass einzelne Stationen auch im klassischen Unterricht einsetzbar sind. Umgekehrt (ein klassisches Paket nachträglich „SeGeL-tauglich“ machen) ist deutlich aufwendiger. Das gilt für alle Fächer, auch dort, wo es noch keine SeGeL-Kurse gibt.

**Wie offen darf ein Paket sein?** Kerres (2024, Kap. 10.5) nennt Merkmale, nach denen sich entscheiden lässt, ob ein fester Lernweg oder freies Erkunden besser passt:

| Eher fester Lernweg, wenn … | Eher freies Erkunden, wenn … |
| --- | --- |
| der Stoff aufeinander aufbaut | die Themen nebeneinander stehen |
| das Paket Teil eines Lehrgangs mit Prüfung ist | es um freiwilliges Weiterlernen geht |
| die Klasse ähnliches Vorwissen hat | die Lernenden sehr unterschiedlich sind |
| die Lernenden selbstständiges Lernen wenig gewohnt sind | sie gern und geübt selbstständig lernen |
| die Motivation vor allem von außen kommt (Note, Prüfung) | eigenes Interesse trägt |
| das Vorwissen gering ist | die Grundbegriffe schon sitzen |

Für die meisten Berufsschulklassen spricht das für einen empfohlenen Weg mit Freiheit beim Tempo, wie oben beschrieben. Mit wachsender Erfahrung der Lernenden kann ein Paket mehr Freiheit lassen.

## Teil C5: Technische Mindeststandards

Die Standards stammen aus den bisherigen PING-Paketen und den Tests in der ByCS-Lernplattform; sie sorgen dafür, dass jedes Paket dort läuft und die Ergebnisse ankommen.

| Bereich | Standard |
| --- | --- |
| Format | SCORM 1.2, eine ZIP-Datei mit `imsmanifest.xml` und `index.html`; alle Schriften, Skripte und Bilder im Paket (keine externen Server); unter 512 MB (ByCS-Grenze), in der Praxis meist unter 1 MB |
| Datenübergabe | `cmi.core.score.raw` = bestes Ergebnis der Selbstüberprüfung (0–100, als Information); `lesson_status` = `completed` nach der ersten Selbstüberprüfung, nie `passed` oder `failed`; kein `masteryscore` im Manifest (sonst setzt die Lernplattform selbst bestanden oder nicht bestanden); Fortschritt in `suspend_data`; Name aus `cmi.core.student_name` vorbelegen; `cmi.objectives` je Lernziel (Ergebnis, Status `completed`) und `cmi.interactions` je Frage mit der Kennung `S<Versuch>_<Frage-ID>`. In der Lernplattform den Abschluss der Aktivität an „abgeschlossen“ binden; ob die Punktzahl in die Bewertung eingeht, legt die Kurseinstellung fest – gedacht ist sie als Information |
| Ohne Lernplattform | Paket läuft auch lokal; Fortschritt dann nur im Browser, mit Hinweis |
| Geräte | Zielgerät im Steckbrief festlegen (PC, Tablet oder beides); bei Tablets: Antippen statt nur Ziehen. Bezugsgröße für die Prüfung ist der Schullaptop mit 1366 × 768 |
| Barrierefreiheit | Bedienung per Tastatur, ausreichender Kontrast, Alternativtexte für Bilder, Schrift skalierbar, Information nie nur über Farbe oder nur über Ton; Gesprochenes immer auch als Text (Untertitel oder Transkript); Glossar mit Fachbegriffen |
| Datenschutz | Keine Daten an Dritte, keine Tracking-Dienste, keine Konten außerhalb der Lernplattform; nur die SCORM-Felder, die für Lernen und Bewertung nötig sind |
| Ergebnis | Auswertung je Lernziel, druckbar als PDF |
| Qualitätssicherung | Test im SCORM-1.2-Testplayer; automatisierter Test, dass alle Aufgaben mit der Musterlösung lösbar sind und die Quellen zum gebauten Paket passen; Test in der echten ByCS-Lernplattform vor dem ersten Einsatz |
| Ablage | Quellen und ZIP im gemeinsamen Repository, einheitliche Benennung, Versionsnummer und Änderungsprotokoll |
| Quellen | Inhalte stehen im Ordner `quelle/` des Pakets: `paket.js` (Texte, Stationen, Szenen) und `fragen.md` (alle Fragen als Markdown; die Lehrkraft prüft sie dort direkt). `js/inhalt.js` wird daraus gebaut und nie von Hand geändert; ein Fehler in `fragen.md` bricht den Build mit Zeilenangabe ab. `quelle/` kommt nicht ins ZIP. Fragen, deren Grafik per Code entsteht, bleiben in `paket.js`. Ältere Pakete ohne `quelle/` bleiben gültig: Dort ist `js/inhalt.js` selbst die Quelle. |
| Versionsnummer | Paket: klein, aber sichtbar in der Kopfzeile (z. B. „v1.2“), dazu in der Fußzeile und auf Ergebnis-PDF und Merkblatt; dieselbe Nummer im Manifest. Prototyp 0.x, erste Fassung im Unterricht 1.0; bei jeder Änderung erhöhen (Korrektur 1.0 → 1.1, neue Inhalte 2.0) und im Änderungsprotokoll notieren. Kompass: eine einzige Nummer für Leitfaden, Skill-Set und Vorlage (Datei `VERSION`); mit welcher Fassung ein Paket gebaut wurde, steht in seiner `index.html` (`generator`). |
| Lizenz | Lizenz festlegen (z. B. CC BY-SA), damit Kollegen Pakete anpassen und weitergeben dürfen |
| Tafelbild | Präsentationsmodus im Paket (`js/tafel.js`, Daten in `PAKET.tafel`) mit zwei bis vier Szenen; Aufruf über den Knopf in der Kopfzeile oder `index.html#tafel`; Bedienung per Pfeiltasten und Presenter, Schaltflächen mindestens 48 px, lesbar am Beamer; schreibt keine SCORM-Werte, kein `suspend_data`, kein `localStorage` |
| Merkblatt (P13) | Wird im Browser als druckbare Seite erzeugt und als PDF gespeichert, ohne Server. Einträge nicht dauerhaft in suspend\_data ablegen (SCORM 1.2: höchstens 4096 Zeichen); das Merkblatt braucht keinen Namen. |
| Szenen-Baukasten | Fertige Bausteine in der Vorlage (`js/baukasten.js`): Figuren, Kulissen, Gespräch, simulierter Rechner mit Browser und Postfach, Formular, Dokument, Sortieren, Reihenfolge, Regler; alles per Antippen und Tastatur bedienbar, ohne externe Dateien |
| Simulationsmodus (Form A, B) | Ein Arbeitsgegenstand (Portal, Konsole, Formular …) steht neben der Lektion und bleibt über alle Kapitel erhalten (PAKET.simulation); Kapitel mit 2–6 Schritten, die sich am Zustand des Gegenstands selbst abhaken. Gespeichert werden nur die erledigten Schritte: Beim Wiedereinstieg spielt die Engine die Musterlösungen still nach, damit suspend\_data klein bleibt. Das Prüfskript löst jeden Schritt über die Bedienknöpfe, prüft, dass der Gegenstand erhalten bleibt und nach dem Neuladen gleich aussieht. |
| Schriften | Im Paket eingebettet, mit offener Lizenz (SIL Open Font License): Lexend für Text, Bricolage Grotesque für Überschriften; Lizenztexte liegen im Paket |

Kolleginnen und Kollegen ohne Programmiererfahrung müssen diese Details nicht selbst umsetzen; das Skill-Set (Teil C7) baut sie automatisch ein. Sie sollten aber wissen, dass es sie gibt, um die Checkliste abhaken zu können.

## Teil C6: Qualitätscheckliste für das Review

Ein Paket ist einsatzbereit, wenn das Prüfskript kein Rot zeigt und alle Punkte des Kerns erfüllt sind. Die Checkliste nutzen Autorin bzw. Autor zum Selbsttest und eine zweite Lehrkraft beim Review. Sie hat drei Teile: was die Vorlage von selbst erfüllt, den Kern (Muss) und den Ausbau (Soll).

**Erfüllt die Vorlage von selbst**

Diese Punkte stecken in Engine und Stil und werden vom Prüfskript geprüft. Von Hand prüfen muss sie nur, wer von der Vorlage abgewichen ist.

- Aufbau Entdecken → Üben mit Tipps → Selbstüberprüfung ohne Tipps → Abschluss; die Hilfe nimmt ab. (P2)
- Lernziele als Etikett auf dem Lernpfad und als Satz an jeder Station; Auswertung je Lernziel. (P8)
- Einschätzung einmal je Lernziel nach dem Kurz-Check, im Abschluss neben dem Ergebnis; Fortschrittsanzeige; Lernempfehlung. (P11)
- Eine Kopfzeile; je Ansicht höchstens ein hervorgehobener Knopf; „Weiter“ ist erst nach der Aufgabe hervorgehoben. (P7)
- Die Selbstüberprüfung zählt nicht: Ergebnis als Information, Status „abgeschlossen“, kein masteryscore.
- Wiedereinstieg nach Abbruch, Tastaturbedienung, Kontrast, keine externen Verbindungen, Versionsnummer in der Kopfzeile und auf den Ausdrucken.

**Kern: Didaktik (Muss)**

- [ ] Lernziele sind überprüfbar formuliert; jedes wird in der Selbstüberprüfung mit mindestens zwei Fragen oder Prüfpunkten erfasst. (P8)
- [ ] Die Form ist begründet (Simulation vor interaktiver Illustration vor Spiel zum Üben vor durchgehendem Lernspiel). Der Lernstoff steckt in den Regeln des Gegenstands oder Spiels (wer ihn nicht beherrscht, kommt nicht weiter, nicht erst in einem Quiz danach); ein Spiel vermittelt die Grundlagen selbst. Das Paket besteht die Plattform-Probe: Test, H5P oder Lückentext der Lernplattform könnten es nicht genauso. (P12)
- [ ] Jede Station hat eine Szene, in der die Lernenden etwas bewegen; sie ist auf 1366 × 768 ganz zu sehen, in der Funktion echt und reagiert auf Fehler. Der Text daneben bleibt im Budget. (P12)
- [ ] Vor jedem neuen Aufgabentyp gibt es eine Vorführung mit einer Frage zum Selbsterklären; Könner können sie überspringen. (P3)
- [ ] Jede Station hat einen klaren Auftrag, eine Vorab-Frage als Leitfrage und eine Rückmeldung; jede Übung hat drei gestufte Tipps. (P4)
- [ ] Jede Station endet mit einem Kurz-Check, der nicht zählt und zuerst die Vorab-Frage auflöst. (P5)
- [ ] Jede Antwort bekommt ein Feedback mit Begründung; typische Fehler haben eigenes Feedback. (P6)

**Kern: Gestaltung (Muss)**

- [ ] Im Arbeitsbereich der Szene steht nichts, was nicht zur Aufgabe gehört; Kulisse und Figuren bleiben im Kopf, auf der Startseite und beim Auftrag. (P7)
- [ ] Text und zugehörige Grafik stehen zusammen, Beschriftungen direkt im Bild; alles, was für eine Aufgabe nötig ist, ist gleichzeitig sichtbar, und Tipps und Feedback verdecken nichts. (P7)
- [ ] Fachbegriffe werden an der Station eingeführt, an der sie zuerst gebraucht werden. (P7)
- [ ] Auf jedem Bildschirm ist ohne Suchen erkennbar, was zu tun ist; Fünf-Sekunden-Test bestanden, auch auf dem Tablet. (P7)
- [ ] Die Startseite gibt in Sekunden einen Überblick: Szene, Lernpfad mit Ziel-Etiketten, ein Knopf; ohne Scrollen, höchstens etwa 40 Wörter Fließtext, keine Eingaben. (P7)

**Kern: Fachlich, Technik, Erprobung (Muss)**

- [ ] Eine Fachlehrkraft hat alle Inhalte, Musterlösungen und Fragen geprüft; alternative richtige Lösungswege werden akzeptiert.
- [ ] Das Prüfskript zeigt kein Rot; das Paket läuft in der ByCS-Lernplattform, Ergebnis und Status „abgeschlossen“ kommen an.
- [ ] Gesprochenes ist auch als Text verfügbar (Untertitel oder Transkript); keine Information nur über Ton oder nur über Farbe.
- [ ] Keine personenbezogenen Daten außerhalb der Lernplattform.
- [ ] Mit drei bis fünf Schülern erprobt (Beobachtungsbogen); Änderungen eingearbeitet.

**Ausbau (Soll)**

- [ ] Eine authentische Leitsituation zieht sich durch das ganze Paket. (P1)
- [ ] Die Aufgaben werden von Station zu Station anspruchsvoller, die Situationen wechseln. (P2)
- [ ] Trennung von Hintergrundwissen (Steckbrief, Glossar) und Bedienhilfe am Ort der Aufgabe. (P9)
- [ ] Wiederholungsfragen zu früheren Stationen sind eingestreut, die Selbstüberprüfung mischt die Aufgaben; wo möglich, folgt nach einigen Tagen ein Folgetest in der Lernplattform. (P10)
- [ ] Jede Übung hat eine Reflexionsfrage mit Musterantwort; nach Stationen oder Übungen gibt es Aufträge zum Skizzieren, Zusammenfassen oder Erklären. (P11, P3)
- [ ] Am Ende gibt es ein halb vorgefülltes Merkblatt zum Ergänzen und Herunterladen, freigeschaltet erst nach der Selbstüberprüfung, mit Selbsttest-Fragen zum späteren Wiederholen. (P13)
- [ ] Zwei bis vier Tafelbild-Szenen für den Mittelteil des Inputs: ohne erklärenden Text, jede mit ihrer Station verknüpft, nichts, was im Paket fehlt; Erklärungen für Schüler zuschaltbar. Die Hinweise für die Notizen der Folien liegen bei.
- [ ] Glossar mit allen Fachbegriffen, jederzeit erreichbar; kurze Sätze, geläufige Wörter (auch für Lernende, die Deutsch lernen).
- [ ] Das Paket hat eine eigene Welt (Thema, Kulisse, Figuren).
- [ ] Eine zweite Lehrkraft hat das Paket fachlich und didaktisch gegengelesen.

## Teil C7: Der Leitfaden als Skill-Set

Der Leitfaden ist zusätzlich als Skill-Set für Claude umgesetzt: Fünf Skills decken die sieben Phasen aus Teil C1 ab; jeder führt die Lehrkraft im Gespräch durch seinen Teil und wendet die Prinzipien automatisch an. So müssen Einsteiger den Leitfaden nicht auswendig kennen, um ihn einzuhalten.

**So bekommst du das Skill-Set:** Für den Einstieg genügt ein einziger Skill, `lernpaket-kompass`. Er enthält alle fünf Skills, erkennt, wo die Lehrkraft gerade steht, und führt Phase für Phase weiter. Er liegt als ZIP-Datei `skill_lernpaket-kompass.zip` in den [Releases](https://github.com/dennismarcbusch/lernpaket-kompass/releases) und wird in Claude unter *Customize → Skills* hochgeladen. Die fünf Einzel-Skills liegen im Repository [lernpaket-kompass unter skills/](../skills) und ebenfalls in den Releases; sie sind für Fortgeschrittene gedacht, die nur einzelne Phasen nutzen. Die [Anleitung zum Skill-Set](skill-set-anleitung.md) beschreibt Einrichtung, Arbeitsschritte mit Beispiel-Prompts, Upload in die ByCS-Lernplattform und häufige Probleme.

**Was dahintersteckt:** `lernpaket-bauen` arbeitet mit einer Paketvorlage, die die Paketstruktur aus Teil C2 und die technischen Mindeststandards aus Teil C5 bereits enthält: Selbsteinschätzung, Kurz-Checks, gestufte Tipps, Selbstüberprüfung (zählt nicht; ab 80 % sitzt das Thema), Auswertung je Lernziel, Merkblatt, SCORM-Datenübergabe und das Tafelbild für den Input. Pro Paket werden nur Inhalte, Interaktionen und Fragen geschrieben, deshalb sehen alle Pakete gleich aus und bedienen sich gleich. Die Fragen stehen in einer Markdown-Datei, die die Lehrkraft ohne Programmierkenntnisse liest und korrigiert; ein Werkzeug baut daraus das Paket. Ein Prüfskript spielt jedes Paket automatisch mit der Musterlösung durch und testet Datenübergabe, Wiedereinstieg und Tablet-Ansicht; es lässt sich auch auf ältere Pakete anwenden.

| Skill | Phase | Was er tut | Die Lehrkraft liefert | Ergebnis |
| --- | --- | --- | --- | --- |
| `lernpaket-planen` | 1–3, dann 5 | Führt ein kurzes Interview (Fach, Klasse, Vorwissen, Einsatzform, Leitsituation; höchstens zwei Runden Rückfragen), formuliert Lernziele und hält fest, woran man das Können erkennt, berät zur Form und schlägt eine Simulation vor, mit Mockup je Idee (interaktive Illustration bei abstrakten Inhalten, Spiel nur zum Üben oder begründet), plant Station 1 für den Prototyp. Nach dem Prototyp: Drehbuch mit einer Szene je Station und den Tafelbild-Szenen; fragt gezielt nach typischen Schülerfehlern | Fachwissen, Unterrichtserfahrung, Entscheidungen | Steckbrief, Lernziel-Tabelle, Konzept; später Drehbuch |
| `fragenpool-erstellen` | 5 | Erzeugt Fragen je Lernziel in den sechs Fragetypen, Falschantworten aus typischen Fehlern, Feedback zu jeder Antwort; alles in einer Markdown-Datei, die die Lehrkraft direkt prüft | Lernziele, typische Fehler, Prüfung der Fragen | Fragenpool als Markdown-Datei (geprüft) |
| `lernpaket-bauen` | 4, dann 5 | Baut zuerst den Prototyp (eine Station, zwei Fragen), nach Drehbuch und Fragenpool den Rest: SCORM-Paket als Simulation mit Szenen zum Anfassen (Spiel laut Konzept) aus dem Baukasten in der eigenen Welt des Pakets, mit fertigen Bausteinen (Station, Kurz-Check, Übung mit Tipps, Selbstüberprüfung, Auswertung, PDF, Tafelbild) | Konzept, später Drehbuch; Rückmeldung zum Prototyp | Prototyp, dann ZIP-Datei |
| `lernpaket-pruefen` | 6 | Geht die Checkliste aus Teil C6 durch, prüft die Quellen, testet die Datenübergabe, prüft Lösbarkeit und Barrierefreiheit, erstellt einen Review-Bericht | Paket, Ergebnis des Schülertests | Prüfbericht mit Ampel |
| `lernpaket-auswerten` | 7 | Liest den Berichtsexport aus der Lernplattform, zeigt schwierige und zu leichte Fragen, fasst Reflexionsantworten zusammen | Berichtsexport (ohne Namen) | Auswertung und Änderungsvorschläge |

Gemeinsame Grundlage aller Skills ist eine kurze Referenzdatei mit den dreizehn Prinzipien, dazu die Regeln aus C1–C6, damit alle Skills dieselben Maßstäbe anlegen. Die Belege zu den Prinzipien stehen in einer eigenen Datei, die nur bei Rückfragen geladen wird; jeder Skill liest nur, was seine Phase braucht. Der vorhandene Skill `bycs-lernmodul` (Look und Einbettung) geht in `lernpaket-bauen` auf.

**So arbeitet eine Kollegin ohne Programmiererfahrung (Beispiel)**

1. Sie öffnet Claude im gemeinsamen Projekt und schreibt: „Ich möchte ein Lernpaket zum Thema Dreisatz für die Berufsintegrationsklasse planen.“ Der Planungs-Skill startet und stellt Fragen.
2. Sie beantwortet die Fragen und korrigiert die vorgeschlagenen Lernziele. Claude berät sie zur Form und zeigt zu jeder Idee ein kurzes Mockup, etwa ein nachgebautes Programm oder Dokument aus ihrem Fach; sie wählt. Claude legt Steckbrief, Lernziel-Tabelle und Konzept als Dokument ab.
3. Sie sagt: „Bau mir den Prototyp.“ Claude baut eine Station und zwei Fragen; sie probiert sie im Browser aus und gibt Rückmeldung in normaler Sprache.
4. Überzeugt der Prototyp, entstehen Drehbuch und Fragenpool: Sie nennt typische Fehler ihrer Schüler und prüft die Fragen direkt in der Markdown-Datei. Claude baut den Rest. Danach lässt sie das Paket prüfen, gibt es einer Kollegin zum Review und testet es mit einigen Schülern.
5. Sie lädt die ZIP-Datei als Aktivität „Lernpaket“ in die ByCS-Lernplattform hoch.
6. Nach dem Einsatz exportiert sie den Bericht und lässt ihn auswerten.

**Grenzen, die im Leitfaden klar stehen müssen:** Die KI kann fachliche Fehler machen; jede Musterlösung und jede Frage wird von einer Lehrkraft geprüft. Schülerdaten werden nur ohne Namen an die KI gegeben. Die Entscheidung über Lernziele und Bewertung bleibt bei der Lehrkraft.

**Bereitstellung in zwei Formen:** (1) dieses Dokument als Langfassung plus eine zweiseitige Kurzfassung mit den elf Kernsätzen und der Checkliste; (2) das Skill-Set als Paket für Claude, zusammen mit einer Anleitung zur Einrichtung und Nutzung (umgesetzt).

## Offene Punkte und nächste Schritte

- [ ] Leitfaden mit zwei bis drei Kolleginnen und Kollegen aus anderen Fächern gegenlesen: Passt das Grundmuster auch für wissenslastige Fächer (z. B. Deutsch, Wirtschaft)? Dort trägt vermutlich Abrufen und Verteilen (P5, P10) mehr als die Handlungsaufgabe.
- [ ] Test eines PING-Pakets in der echten ByCS-Lernplattform abschließen (steht für „Plug & Pray“ und „Netzwerktopologien erleben“ noch aus).
- [ ] Vorhandene PING-Pakete gegen die Checkliste prüfen und P6, P10, P11 nachschärfen; bei „Plug & Pray“ zuerst die Orientierung („Wo geht es weiter?“) verbessern.
- [ ] Kurzfassung (zwei Seiten) erstellen.
- [ ] Skill-Set (gebaut am 27.10.2026) mit dem ersten neuen Paket erproben und die Anleitung um Screenshots ergänzen.
- [ ] Lizenz und Ablage für Pakete anderer Fächer klären (Repository, SCORM Hub).
- [x] Kapitel aus Kerres (2024) im Original prüfen und die Zusammenfassung in Teil A1 abgleichen.
- [x] Tafelbild in die Paketvorlage und das Skill-Set übernommen (28.10.2026): `tafel.js`/`tafel.css` in der Vorlage, Inhaltsprüfung und Prüfskript erweitert, Drehbuch-Abschnitt zum Tafelbild. Startseiten-Karte und eigene Ablaufplan-Vorlage sind mit 4.0 wieder entfallen.
- [ ] Eigenen Skill `tafelbild-erstellen` bauen: erzeugt nur Tafelbild-Szenen mit den Hinweisen für die Notizen der Folien, ohne Lernpaket – für Themen, die praktisch, in einer anderen Simulation (z. B. Packet Tracer) oder ganz ohne Paket umgesetzt werden.
- [ ] Vorhandene Pakete auf Kompass 4.0 heben (PING-Pakete, Handelsregister, die drei Pakete vom 7.11.2026): aktuelle Vorlage, Selbstüberprüfung statt Nachweis mit der Marke 80 % (bisher teils 70 % oder 60 %), zwei bis vier Tafelbild-Szenen.
- [ ] Lernpaket-Kompass 2 (29.10.2026): Szene als Pflichtkern jeder Station (damals P14, seit 4.0 Teil von P12), Baukasten für Szenen, eigene Welt je Paket, optionaler Spielrahmen; Pilot: Station 1 von „Das Handelsregister“.
- [ ] Lernpaket-Kompass 3 (29.10.2026): Phase „Erfinden“ mit drei Spielideen und Plattform-Probe, P12 „Lernstoff als Spielregel“ wird Muss, Spielmodus in der Vorlage; Piloten zum Handelsregister: „Stempel drauf!“ (Schalter-Simulator) und „Firmendex“ (Sammelspiel). Erprobung mit Schülern steht aus.
- [ ] Lernpaket-Kompass 3.1 (05.11.2026): Startseite als Überblick (Szene, Lernpfad mit Ziel-Etiketten, ein Knopf), Lernziel, Vorab-Frage und neue Begriffe an der Station, Einschätzung nach dem Kurz-Check, Abkürzung „Ich kenne mich schon aus“; das Prüfskript prüft die Startseite. Erprobung mit Schülern steht aus.
- [ ] Lernpaket-Kompass 3.2 (05.11.2026): P12 „Simulation zuerst, Spiel nur begründet“ – Formen A Simulation, B interaktive Illustration, C Spiel zum Üben, D Lernspiel nach dem SQL-Island-Prinzip; Phase „Erfinden“ berät zur Form und zeigt ein Mockup je Idee statt drei Spielideen. Der Simulationsmodus folgt in 3.3.
- [ ] Lernpaket-Kompass 3.3 (06.11.2026): Simulationsmodus in der Vorlage (`PAKET.simulation`): Lektion links in Kapiteln und Schritten, Arbeitsgegenstand rechts, der über alle Kapitel erhalten bleibt; Schritte haken sich am Zustand ab, Wiedereinstieg durch Nachspielen der Lösungen; im Prüfskript getestet. Pilot „Partner-Check“ (Registerportal und Prüfliste). Erprobung mit Schülern steht aus.
- [ ] Lernpaket-Kompass 4.0 (10.11.2026): Überarbeitung nach kritischer Durchsicht. Bildschirm: eine Kopfzeile, Stationen als Punkte, Szene auf 1366 × 768 ganz zu sehen, höchstens ein hervorgehobener Knopf. Station: Vorab-Frage als Leitfrage mit Auflösung im Kurz-Check, Einschätzung einmal je Lernziel. Regelwerk: Kern von sieben Prinzipien, P14 in P12, Belege in eigener Datei, eine Versionsnummer. Quellen (11.11.2026): Fragen als Markdown-Datei, das Paket wird aus den Quellen gebaut, das Prüfskript prüft auch die Quellen. Prozess: Zielen vor Erfinden, Prototyp vor Drehbuch. Paketende heißt Selbstüberprüfung und zählt nicht (Status „abgeschlossen“). Tafelbild als Mittelteil des Inputs, Ablauf in den Notizen der Folien. Erprobung mit Schülern steht aus.
- [ ] Erproben, bevor weitere Regeln dazukommen: Bisher ist keine Fassung des Kompass mit Schülern erprobt. Ein Paket mit drei bis fünf Schülern testen (Beobachtungsbogen) und in der ByCS-Lernplattform prüfen, wie Status „abgeschlossen“ und Punktzahl dort ankommen und welche Einstellungen der Aktivität dazu passen.
- [x] Plattformen, die bisher auf den Status „bestanden“ warten (z. B. der SailorSloth-Prototyp), auf „abgeschlossen“ umstellen. Erledigt am 11.11.2026: Der Prototyp wertet „bestanden“ und „abgeschlossen“ als erledigt.
- [ ] Nachweis-Paket: eine eigene Form für den Kompetenznachweis (nicht öffentlich, Varianten, bestanden oder nicht) ist offen und nicht Teil von 4.0.
- [x] Das Ablaufdiagramm in der Dokumentfassung neu zeichnen (neue Reihenfolge der Phasen).
- [ ] Baukasten nach den ersten Paketen anderer Fächer erweitern (z. B. Tabellenkalkulation, Zeitstrahl, Karte) und Erfahrungen mit dem Spielrahmen sammeln.

## Literatur

Links führen zum Volltext oder zu einer Zusammenfassung, die für diesen Entwurf eingesehen wurde; Titel ohne Link sind Standardliteratur oder Sekundärangaben. Vor einer Veröffentlichung sollten die Zahlen am Original geprüft werden.

- Adesope, O. O., Trevisan, D. A. & Sundararajan, N. (2017). [Rethinking the use of tests: A meta-analysis of practice testing](https://education.wsu.edu/documents/2018/01/rethinking-use-tests.pdf/). *Review of Educational Research, 87*(3), 659–701.
- Aleven, V., Stahl, E., Schworm, S., Fischer, F. & Wallace, R. (2003). Help seeking and help design in interactive learning environments. *Review of Educational Research, 73*(3), 277–320.
- Alfieri, L., Brooks, P. J., Aldrich, N. J. & Tenenbaum, H. R. (2011). [Does discovery-based instruction enhance learning?](https://www.fisme.science.uu.nl/publicaties/literatuur/2011_alfieri_discovery_learning.pdf) *Journal of Educational Psychology, 103*(1), 1–18.
- Ausubel, D. P. (1960). The use of advance organizers in the learning and retention of meaningful verbal material. *Journal of Educational Psychology, 51*(5).
- Barbieri, C. A., Miller-Cotto, D., Clerjuste, S. N. & Chawla, K. (2023). [A meta-analysis of the worked examples effect on mathematics performance](https://oaks.kent.edu/hcri/meta-analysis-worked-examples-effect-mathematics-performance). *Educational Psychology Review, 35*.
- Bisra, K., Liu, Q., Nesbit, J. C., Salimi, F. & Winne, P. H. (2018). Inducing self-explanation: A meta-analysis. Educational Psychology Review, 30(3), 703–725.
- Boulhrir (2025). [Rezension zu Hattie (2023), *Visible learning: The sequel*](https://jle.hse.ru/article/download/27821/23245). *Journal of Language and Education*.
- Brod, G. (2021). Generative learning: Which strategies for what age? Educational Psychology Review, 33, 1295–1318. ([Volltext](https://www.pedocs.de/volltexte/2021/23704/pdf/EPR_2021_4_Brod_Generative_Learning_A.pdf))
- Brom, C., Stárková, T. & D’Mello, S. K. (2018). How effective is emotional design? A meta-analysis on facial anthropomorphisms and pleasant colors during multimedia learning. *Educational Research Review, 25*, 100–119.
- Brunmair, M. & Richter, T. (2019). [Similarity matters: A meta-analysis of interleaved learning and its moderators](https://www.psychologie.uni-wuerzburg.de/fileadmin/06020400/2019/Brunmair_Richter_in_press__2019_META-ANALYSIS_OF_INTERLEAVED_LEARNING.pdf). *Psychological Bulletin, 145*(11), 1029–1052.
- Chernikova, O., Heitzmann, N., Stadler, M., Holzberger, D., Seidel, T. & Fischer, F. (2020). Simulation-based learning in higher education: A meta-analysis. Review of Educational Research, 90(4), 499–541. https://doi.org/10.3102/0034654320933544
- Chernikova, O. u. a. (2024). Where salience goes beyond authenticity: A meta-analysis on simulation-based learning in higher education. *Zeitschrift für Pädagogische Psychologie, 38*(1–2), 15–25.
- Cheung, A. C. K. & Slavin, R. E. (2016). How methodological features affect effect sizes in education. *Educational Researcher, 45*(5), 283–292.
- Chi, M. T. H. & Wylie, R. (2014). The ICAP framework: Linking cognitive engagement to active learning outcomes. Educational Psychologist, 49(4), 219–243.
- Clark, D. B., Tanner-Smith, E. E. & Killingsworth, S. S. (2016). Digital games, design, and learning: A systematic review and meta-analysis. Review of Educational Research, 86(1), 79–122. https://doi.org/10.3102/0034654315582065
- Collins, A., Brown, J. S. & Newman, S. E. (1989). Cognitive apprenticeship: Teaching the crafts of reading, writing, and mathematics. In L. B. Resnick (Hrsg.), *Knowing, learning, and instruction* (S. 453–494). Erlbaum.
- Costa, J. M., Miranda, G. & Melo, M. (2022). [The four-component instructional design model (4C/ID): A meta-analysis on use and effect](https://repositorio.iscte-iul.pt/bitstream/10071/23015/1/article_81383.pdf). *Learning Environments Research, 25*(2), 445–463.
- Cromley, J. G. & Chen (ca. 2025). [Nachrechnung der Studien zu Mayers Multimedia-Prinzipien](https://par.nsf.gov/biblio/10637927) (Meta-Analyse; Titel und Zeitschrift am Original prüfen).
- de Jong, T. (2010). Cognitive load theory, educational research, and instructional design: Some food for thought. Instructional Science, 38(2), 105–134.
- Dickson, K. L. & Miller, M. D. (2005). Authorized crib cards do not improve exam performance. Teaching of Psychology, 32(4), 230–233.
- Dignath, C. & Büttner, G. (2008). Components of fostering self-regulated learning among students. *Metacognition and Learning, 3*, 231–264.
- Dignath, C., van Ewijk, R., Perels, F. & Fabriz, S. (2023). [Let learners monitor the learning content and their learning behavior! A meta-analysis on the effectiveness of tools to foster monitoring](https://doi.org/10.1007/s10648-023-09718-4). *Educational Psychology Review, 35*, Art. 62.
- Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J. & Willingham, D. T. (2013). Improving students’ learning with effective learning techniques. *Psychological Science in the Public Interest, 14*(1), 4–58.
- Fiorella, L. & Mayer, R. E. (2016). Eight ways to promote generative learning. Educational Psychology Review, 28(4), 717–741.
- Frick, T. W., Chadha, R., Watson, C. & Zlatkovska, E. (2010). [Improving course evaluations to improve instruction and complex learning in higher education](https://bio.tedfrick.me/etrd/ETRD2010ImprovingCourseEvaluations.pdf). *ETR&D, 58*(2), 115–136.
- Funk, S. C. & Dickson, K. L. (2011). Crib card use during tests: Helpful or a crutch? Teaching of Psychology, 38(2), 114–117. ([Abstract](https://experts.nau.edu/en/publications/crib-card-use-during-testshelpful-or-a-crutch/))
- Gurlitt, J. & Renkl, A. (2008). Are high-coherent concept maps better for prior knowledge activation? Differential effects of concept mapping tasks on high school vs. university students. Journal of Computer Assisted Learning, 24(5), 407–419.
- Habgood, M. P. J. & Ainsworth, S. E. (2011). [Motivating children to learn effectively: Exploring the value of intrinsic integration in educational games](https://doi.org/10.1080/10508406.2010.508029). *Journal of the Learning Sciences, 20*(2), 169–206.
- Hamouda, S. & Shaffer, C. A. (2016). Crib sheets and exam performance in a data structures course. Computer Science Education. ([Volltext](https://people.cs.vt.edu/shaffer/Papers/Crib_Sheets2016.pdf))
- Hattie, J. (2023). *Visible learning: The sequel*. Routledge. ([Rezension](https://jle.hse.ru/article/download/27821/23245))
- Iterbeke, K., De Witte, K. & Schelfhout, W. (2021). The effects of computer-assisted adaptive instruction and elaborated feedback on learning outcomes. A randomized control trial. *Computers in Human Behavior, 120*, 106666.
- Johnson & Janzen (2023). [Kritik an der Methode von Hatties *Visible Learning*](https://ices.library.ubc.ca/index.php/criticaled/article/view/186745/185678). *Critical Education* (Titel am Original prüfen).
- Kalyuga, S., Ayres, P., Chandler, P. & Sweller, J. (2003). The expertise reversal effect. Educational Psychologist, 38(1), 23–31.
- Kalyuga, S. (2007). Expertise reversal effect and its implications for learner-tailored instruction. *Educational Psychology Review, 19*, 509–539.
- Karich, A. C., Burns, M. K. & Maki, K. E. (2014). Updated meta-analysis of learner control within educational technology. *Review of Educational Research, 84*(3), 392–410. ([Kurzreview Clearing House Unterricht](https://www.clearinghouse.edu.tum.de/wp-content/uploads/2017/07/CHU_KR_8_Karich_2014_Lernersteuerung-Software.pdf))
- Kerres, M. (2024). [*Mediendidaktik: Lernen in der digitalen Welt*](https://www.degruyterbrill.com/document/doi/10.1515/9783111201078/html) (6. Aufl.). De Gruyter Oldenbourg. Genutzt v. a. Kap. 4 (Wirksamkeit digitalen Lernens), 6.6 (Gestaltung), 8.3 und 8.6 (Instruktionsdesign, Vorgehen), 9.2 (Bildungsproblem), 10.2–10.5 (Steuerung, 3-2-1-Modell, adaptive Systeme, Kriterien für die Methode), 11.6 (Spielelemente), 12.6 (Struktur, Lernaufgaben) und 14 (Planungsleitfaden).
- Kerres, M., Buntins, K., Buchner, J., Drachsler, H. & Zawacki-Richter, O. (o. J., Preprint). [Lernpfade in adaptiven und künstlich-intelligenten Lernprogrammen](https://learninglab.uni-due.de/sites/default/files/KI-Bildung-Sammelband-V1.4_1.pdf). In C. de Witt u. a. (Hrsg.), *Künstliche Intelligenz in der Bildung*. Springer VS.
- Kiewra, K. A. (o. J.). Note this: How to improve student note taking. University of Nebraska–Lincoln. Darin u. a. Kiewra & Benton (1987) und Kiewra et al. (1995). ([Übersicht](https://cehs.unl.edu/images/cehs/soar/articles/Note%20This.%20How%20to%20Improve%20Student%20Note%20Taking.pdf))
- Kraft, M. A. (2020). Interpreting effect sizes of education interventions. *Educational Researcher, 49*(4), 241–253.
- Kruger, J. & Dunning, D. (1999). Unskilled and unaware of it: How difficulties in recognizing one's own incompetence lead to inflated self-assessments. *Journal of Personality and Social Psychology, 77*(6), 1121–1134.
- Kulik, J. A. & Fletcher, J. D. (2016). Effectiveness of intelligent tutoring systems: A meta-analytic review. *Review of Educational Research, 86*(1), 42–78.
- Larwin, K. H., Gorman, J. & Larwin, D. A. (2013). Assessing the impact of testing aids on post-secondary student performance: A meta-analytic study. *Educational Psychology Review, 25*(3), 429–443.
- Latimier, A., Peyre, H. & Ramus, F. (2021). A meta-analytic review of the benefit of spacing out retrieval practice episodes on retention. *Educational Psychology Review, 33*, 959–987.
- Luiten, J., Ames, W. & Ackerson, G. (1980). A meta-analysis of the effects of advance organizers on learning and retention. *American Educational Research Journal, 17*(2), 211–218.
- Mayer, R. E. (2017). [Using multimedia for e-learning](https://doi.org/10.1111/jcal.12197). *Journal of Computer Assisted Learning, 33*(5), 403–423.
- Mayer, R. E. (2019). [Computer games in education](https://doi.org/10.1146/annurev-psych-010418-102744). *Annual Review of Psychology, 70*, 531–549.
- Mayer, R. E. (2021). *Multimedia learning* (3. Aufl.). Cambridge University Press. ([Mayer: The future of multimedia learning](https://edtechbooks.org/docx/10349))
- Merrill, M. D. (2002). [First principles of instruction](https://classroom.eumetsat.int/mod/resource/view.php?id=14612). *ETR&D, 50*(3), 43–59.
- Noetel, M. u. a. (2022). Multimedia design for learning: An overview of reviews with meta-meta-analysis. *Review of Educational Research, 92*(3), 413–454.
- Norman, G., Dore, K. & Grierson, L. (2012). The minimal relationship between simulation fidelity and transfer of learning. *Medical Education, 46*(7), 636–647.
- Pan, S. C. & Carpenter, S. K. (2023). [Prequestioning and pretesting effects: A review of empirical research, theoretical perspectives, and implications for educational practice](https://doi.org/10.1007/s10648-023-09814-5). *Educational Psychology Review, 35*, Art. 97.
- Pashler, H., McDaniel, M., Rohrer, D. & Bjork, R. (2008). Learning styles: Concepts and evidence. *Psychological Science in the Public Interest, 9*(3), 105–119.
- Rhodes, M. G. & Tauber, S. K. (2011). [The influence of delaying judgments of learning on metacognitive accuracy: A meta-analytic review](https://doi.org/10.1037/a0021705). *Psychological Bulletin, 137*(1), 131–148.
- Ropovik, I., Adamkovic, M. & Greger, D. (2021). [Neglect of publication bias compromises meta-analyses of educational research](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8174709/). *PLOS ONE, 16*(6).
- Sailer, M. & Homner, L. (2020). [The gamification of learning: A meta-analysis](https://opus.bibliothek.uni-augsburg.de/opus4/frontdoor/index/index/docId/109056). *Educational Psychology Review, 32*(1), 77–112.
- Sarfo, F. K. & Elen, J. (2007). Developing technical expertise in secondary technical schools: The effect of 4C/ID learning environments. *Learning Environments Research, 10*, 207–221.
- Schildgen, J. (2014). SQL Island: An adventure game to learn the database language SQL. *Proceedings of the 8th European Conference on Games Based Learning (ECGBL)*, 137–138. Spiel: [sql-island.de](https://sql-island.informatik.uni-kl.de/)
- Schroeder, N. L., Nesbit, J. C., Anguiano, C. J. & Adesope, O. O. (2018). Studying and constructing concept maps: A meta-analysis. Educational Psychology Review, 30(2), 431–455.
- Shah, A. & Soosai Raj, A. G. (2024). [A review of cognitive apprenticeship methods in computing education research](https://par.nsf.gov//servlets/purl/10491208). *SIGCSE 2024*.
- Sinha, T. & Kapur, M. (2021). When problem solving followed by instruction works: Evidence for productive failure. *Review of Educational Research, 91*(5), 761–798.
- St. Hilaire, K. J., Chan, J. C. K. & Ahn, D. (2023). [Guessing as a learning intervention: A meta-analytic review of the prequestion effect](https://doi.org/10.3758/s13423-023-02353-8). *Psychonomic Bulletin & Review*.
- Sundararajan, N. & Adesope, O. (2020). Keep it coherent: A meta-analysis of the seductive details effect. Educational Psychology Review, 32(3), 707–734. https://doi.org/10.1007/s10648-020-09522-4
- Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257–285.
- Sweller, J., van Merriënboer, J. J. G. & Paas, F. (2019). Cognitive architecture and instructional design: 20 years later. Educational Psychology Review, 31(2), 261–292.
- Tamim, R. M. u. a. (2011). What forty years of research says about the impact of technology on learning. *Review of Educational Research, 81*(1), 4–28.
- Theobald, M. (2021). [Self-regulated learning training programs enhance university students’ academic performance, self-regulated learning strategies, and motivation: A meta-analysis](https://doi.org/10.1016/j.cedpsych.2021.101976). *Contemporary Educational Psychology, 66*, 101976.
- van Merriënboer, J. J. G., Clark, R. E. & de Croock, M. B. M. (2002). [Blueprints for complex learning: The 4C/ID-model](https://link.springer.com/doi/10.1007/BF02504993). *ETR&D, 50*(2), 39–64.
- van Merriënboer, J. J. G. & Kirschner, P. A. (2017). *Ten steps to complex learning* (3. Aufl.). Routledge.
- Wisniewski, B., Zierer, K. & Hattie, J. (2020). [The power of feedback revisited: A meta-analysis of educational feedback research](https://pmc.ncbi.nlm.nih.gov/articles/PMC6987456). *Frontiers in Psychology, 10*, 3087.
- Wouters, P., van Nimwegen, C., van Oostendorp, H. & van der Spek, E. D. (2013). A meta-analysis of the cognitive and motivational effects of serious games. Journal of Educational Psychology, 105(2), 249–265. https://doi.org/10.1037/a0031311
- Wouters, P. & van Oostendorp, H. (2013). A meta-analytic review of the role of instructional support in game-based learning. *Computers & Education, 60*(1), 412–425. https://doi.org/10.1016/j.compedu.2012.07.018
