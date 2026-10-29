/* =====================================================================
   „Stempel drauf!“ – Das Handelsregister als Registergericht-Simulator
   Spielprinzip: Die Schüler sitzen am Schalter des Registergerichts,
   prüfen Anmeldungen gegen die Dienstanweisung und entscheiden:
   eintragen (HRA/HRB), ablehnen (mit beanstandeter Zeile), an ein anderes
   Register verweisen, Auszug ausgeben, Streitfälle beurteilen.
   Jede Entscheidung hat Folgen: Stadtplan, Ansehen, Zeitung.
   Lernstoff = Spielregeln (Dienstanweisung).
   Alle Firmen, Personen und Nummern sind erfunden.
   ===================================================================== */

/* ---------- Personen ---------- */
var LEUTE = {
  kaya: { name: 'Ayşe Kaya', aussehen: { haut: 2, haare: 'schwarz', frisur: 'lang', kleidung: '#7c3aed' } },
  birkner: { name: 'Jonas Birkner', aussehen: { haut: 1, haare: 'braun', frisur: 'kurz', kleidung: '#92400e', bart: true } },
  gruen: { name: 'Lena Grün', aussehen: { haut: 0, haare: 'blond', frisur: 'zopf', kleidung: '#15803d' } },
  huber: { name: 'Frau Huber', aussehen: { haut: 1, haare: 'grau', frisur: 'kurz', kleidung: '#be185d', brille: true } },
  meinel: { name: 'Karl Meinel', aussehen: { haut: 1, haare: 'weiss', frisur: 'glatze', kleidung: '#1d4ed8' } },
  nordmann: { name: 'Max Nordmann', aussehen: { haut: 3, haare: 'schwarz', frisur: 'kurz', kleidung: '#0e7490' } },
  reuter: { name: 'Tom Reuter', aussehen: { haut: 4, haare: 'schwarz', frisur: 'kurz', kleidung: '#374151' } },
  weber: { name: 'Erika Weber', aussehen: { haut: 1, haare: 'braun', frisur: 'kurz', kleidung: '#9a3412', brille: true } },
  kraus: { name: 'Sabine Kraus', aussehen: { haut: 0, haare: 'rot', frisur: 'lang', kleidung: '#0f766e' } },
  jansen: { name: 'Ole Jansen', aussehen: { haut: 1, haare: 'blond', frisur: 'kurz', kleidung: '#ca8a04' } },
  fischer: { name: 'Günter Fischer', aussehen: { haut: 1, haare: 'grau', frisur: 'kurz', kleidung: '#1e3a8a', bart: true } },
  lenz: { name: 'Mira Lenz', aussehen: { haut: 2, haare: 'dunkelbraun', frisur: 'kopftuch', tuch: '#db2777', kleidung: '#f59e0b' } },
  hartmann: { name: 'Klaus Hartmann', aussehen: { haut: 1, haare: 'grau', frisur: 'kurz', kleidung: '#111827', krawatte: '#dc2626' } },
  vogt: { name: 'Dr. Petra Vogt', aussehen: { haut: 3, haare: 'schwarz', frisur: 'lang', kleidung: '#4338ca', brille: true } },
  seidl: { name: 'Bernd Seidl', aussehen: { haut: 1, haare: 'braun', frisur: 'glatze', kleidung: '#57534e', bart: true } },
  roth: { name: 'Nina Roth', aussehen: { haut: 5, haare: 'schwarz', frisur: 'zopf', kleidung: '#0369a1' } },
  berg: { name: 'Paul Berg', aussehen: { haut: 0, haare: 'blond', frisur: 'kurz', kleidung: '#4d7c0f' } }
};
var DIREKTORIN = { name: 'Dr. Albers', aussehen: { haut: 2, haare: 'grau', frisur: 'kurz', kleidung: '#7f1d1d', brille: true } };
var BEGLAUBIGT = 'elektronisch, öffentlich beglaubigt (Notar)';

/* ---------- Dienstanweisung: die Spielregeln ---------- */
var REGELN = {
  form: { titel: '§ 1 Form', text: 'Anmeldungen kommen <b>elektronisch</b> und <b>öffentlich beglaubigt</b> über einen Notar. E-Mail oder Brief: Zeile „Eingereicht“ beanstanden, <b>ablehnen</b>.' },
  einsicht: { titel: '§ 2 Einsicht', text: '<b>Jeder</b> darf einsehen und einen Auszug bekommen – ohne Begründung.' },
  abteilung: { titel: '§ 3 Abteilungen', text: '<b>HRA:</b> e. K., OHG, KG (auch GmbH &amp; Co. KG)<br><b>HRB:</b> GmbH, UG, AG<br><b>Anderes Register:</b> Verein, Genossenschaft' },
  inhalt: { titel: '§ 4 Inhalt', text: '<b>Wird eingetragen:</b> Firma, Sitz, Gegenstand, Kapital, Vertretung, Prokura<br><b>Nie:</b> Umsatz, Gewinn, Mitarbeiterzahl, Handlungsvollmacht – Zeile beanstanden, ablehnen.' },
  wirkung: { titel: '§ 5 Vermerk', text: '🟥 <b>Entsteht mit Eintragung:</b> GmbH, UG, AG; Kleingewerbe wird freiwillig Kaufmann.<br>🟦 <b>Wird bekannt gemacht:</b> Es gab es schon vorher – Großbetrieb, Prokura, neuer Geschäftsführer, neuer Sitz.' },
  glaube: { titel: '§ 6 Öffentlicher Glaube', text: 'Wer auf das Register vertraut, wird geschützt: Eine <b>nicht eingetragene</b> Änderung gilt ihm gegenüber nicht. Eine Prokura gilt nach außen <b>immer voll</b>, interne Grenzen zählen nicht.' }
};

/* ---------- Fälle ----------
   typ: anmeldung | einsicht | streit
   aktion (Lösung): hra | hrb | anderes | ablehnen | auszug | abweisen | <id einer Streit-Option>
   fehler: Zeile, die beim Ablehnen beanstandet werden muss
   vermerk: k (entsteht mit Eintragung) | d (wird bekannt gemacht) – nur wenn § 5 gilt
   karte: Stadtplan – { name, neu: true = gibt es erst ab der Eintragung (blasses Haus) } */
function Z(id, k, v) { return [id, k, v]; }
var F = {
  kaya: { lz: 'LZ2', typ: 'anmeldung', wer: 'kaya', sagt: 'Guten Morgen! Ich möchte mein Geschäft eintragen lassen. Der Notar hat alles geschickt.',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Firma', 'Ostwind Papier e. K.'), Z('rf', 'Rechtsform', 'Einzelkauffrau'), Z('sitz', 'Sitz', 'Forchheim'), Z('person', 'Inhaberin', 'Ayşe Kaya'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'hra', vermerk: 'd', karte: { name: 'Ostwind Papier' } },
  birkner: { lz: 'LZ2', typ: 'anmeldung', wer: 'birkner', sagt: 'Wir sind eine Schreinerei mit zwei Gesellschaftern. Meine Schwester haftet nur mit ihrer Einlage.',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Firma', 'Birkenhof Möbel KG'), Z('rf', 'Rechtsform', 'Kommanditgesellschaft'), Z('sitz', 'Sitz', 'Lichtenfels'), Z('person', 'Gesellschafter', 'Jonas Birkner (Komplementär), Petra Birkner (Kommanditistin, Einlage 20.000 €)'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'hra', vermerk: 'd', karte: { name: 'Birkenhof Möbel' },
    falsch: 'Eine KG ist eine Personengesellschaft. Sie gehört in Abteilung A.' },
  gruenMail: { lz: 'LZ1', typ: 'anmeldung', wer: 'gruen', sagt: 'Hi! Ich hab Ihnen die Anmeldung einfach gemailt, das geht doch schneller.',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Firma', 'Lindgrün Verpackung GmbH'), Z('rf', 'Rechtsform', 'GmbH'), Z('sitz', 'Sitz', 'Bamberg'), Z('person', 'Geschäftsführerin', 'Lena Grün'), Z('form', 'Eingereicht', 'per E-Mail, ohne Beglaubigung')] },
    aktion: 'ablehnen', fehler: 'form',
    falsch: 'Eine einfache E-Mail reicht nicht. Anmeldungen kommen elektronisch und öffentlich beglaubigt über einen Notar – sonst könnte jeder fremde Firmen ändern.' },
  huber: { lz: 'LZ1', typ: 'einsicht', wer: 'huber', sagt: 'Ich möchte bei Hartmann Elektro eine teure Lampe bestellen. Darf ich mal schauen, wer das eigentlich ist?', grund: 'privat, vor einer Bestellung',
    aktion: 'auszug', falsch: 'Einsehen darf jeder. Das Register ist öffentlich, damit sich alle über ihre Geschäftspartner informieren können.' },
  meinel: { lz: 'LZ2', typ: 'anmeldung', wer: 'meinel', sagt: 'Unser Sportverein ist jetzt ein eingetragener Verein. Bitte ins Handelsregister!',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Name', 'TSV Ebersdorf e. V.'), Z('rf', 'Rechtsform', 'eingetragener Verein'), Z('sitz', 'Sitz', 'Ebersdorf'), Z('person', 'Vorstand', 'Karl Meinel'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'anderes', falsch: 'Vereine stehen im Vereinsregister, nicht im Handelsregister.' },
  nordmann: { lz: 'LZ2', typ: 'anmeldung', wer: 'nordmann', sagt: 'Wir sind eine KG – aber unsere Komplementärin ist eine GmbH. Wohin gehört das?',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Firma', 'Nordlicht Solar GmbH & Co. KG'), Z('rf', 'Rechtsform', 'Kommanditgesellschaft'), Z('sitz', 'Sitz', 'Coburg'), Z('person', 'Gesellschafter', 'Nordlicht Verwaltungs GmbH (Komplementärin), Max Nordmann (Kommanditist)'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'hra', vermerk: 'd', karte: { name: 'Nordlicht Solar' },
    falsch: 'Eine GmbH & Co. KG ist eine KG – also Abteilung A. Dass die Komplementärin eine GmbH ist, ändert die Rechtsform der KG nicht.' },
  reuter: { lz: 'LZ1', typ: 'einsicht', wer: 'reuter', sagt: 'Ich will den Auszug von Birkenhof Möbel. Warum? Sag ich nicht.', grund: '— keine —',
    aktion: 'auszug', falsch: 'Auch ohne Grund: Jeder darf einsehen. Ein „berechtigtes Interesse“ muss niemand nachweisen.' },
  weber: { lz: 'LZ1', typ: 'anmeldung', wer: 'weber', sagt: 'Ich habe unsere Anmeldung ausgedruckt und unterschrieben. Mit Briefmarke!',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Firma', 'Weber & Söhne OHG'), Z('rf', 'Rechtsform', 'Offene Handelsgesellschaft'), Z('sitz', 'Sitz', 'Kulmbach'), Z('person', 'Gesellschafter', 'Erika Weber, Paul Weber'), Z('form', 'Eingereicht', 'per Brief, einfache Unterschrift')] },
    aktion: 'ablehnen', fehler: 'form', falsch: 'Ein unterschriebener Brief reicht nicht. Die Anmeldung kommt elektronisch, die Unterschrift öffentlich beglaubigt.' },
  krausSitz: { lz: 'LZ2', typ: 'anmeldung', wer: 'kraus', sagt: 'Unsere GmbH ist umgezogen. Der Notar hat die Änderung geschickt.',
    dok: { titel: 'Anmeldung einer Änderung', zeilen: [Z('firma', 'Firma', 'Kernwerk Bürobedarf GmbH'), Z('rf', 'Rechtsform', 'GmbH'), Z('sitz', 'Neuer Sitz', 'Lichtenfels (bisher Bamberg)'), Z('person', 'Geschäftsführerin', 'Sabine Kraus'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'hrb', vermerk: 'd', karte: { name: 'Kernwerk Bürobedarf' }, falsch: 'Eine GmbH ist eine Kapitalgesellschaft. Sie steht in Abteilung B.' },
  jansen: { lz: 'LZ2', typ: 'anmeldung', wer: 'jansen', sagt: 'Wir sind eine Energiegenossenschaft mit 300 Mitgliedern. Bitte eintragen!',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Firma', 'Sonnenkraft Obermain eG'), Z('rf', 'Rechtsform', 'eingetragene Genossenschaft'), Z('sitz', 'Sitz', 'Lichtenfels'), Z('person', 'Vorstand', 'Ole Jansen'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'anderes', falsch: 'Genossenschaften stehen im Genossenschaftsregister, nicht im Handelsregister.' },

  gruenGmbH: { lz: 'LZ4', typ: 'anmeldung', wer: 'gruen', sagt: 'Diesmal richtig, über den Notar! Ab wann gibt es unsere GmbH denn jetzt?',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Firma', 'Lindgrün Verpackung GmbH'), Z('rf', 'Rechtsform', 'GmbH (in Gründung)'), Z('sitz', 'Sitz', 'Bamberg'), Z('kap', 'Stammkapital', '25.000,00 €'), Z('person', 'Geschäftsführerin', 'Lena Grün'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'hrb', vermerk: 'k', karte: { name: 'Lindgrün Verpackung', neu: true },
    falschVermerk: 'Eine GmbH gibt es erst ab der Eintragung. Vorher ist sie nur „in Gründung“ – die Eintragung bringt sie zur Welt.' },
  fischer: { lz: 'LZ4', typ: 'anmeldung', wer: 'fischer', sagt: 'Ich betreibe seit Jahren einen Großhandel mit 40 Leuten und drei Lagern. Jetzt melde ich mich endlich an.',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Firma', 'Fischer Großhandel e. K.'), Z('rf', 'Rechtsform', 'Einzelkaufmann'), Z('sitz', 'Sitz', 'Bamberg'), Z('person', 'Inhaber', 'Günter Fischer'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'hra', vermerk: 'd', karte: { name: 'Fischer Großhandel' },
    falschVermerk: 'Herr Fischer war schon vorher Kaufmann: Ein Großhandel mit 40 Leuten ist ein kaufmännischer Betrieb (Istkaufmann). Die Eintragung macht das nur bekannt.' },
  lenz: { lz: 'LZ4', typ: 'anmeldung', wer: 'lenz', sagt: 'Ich habe eine kleine Nähwerkstatt, nur ich allein. Ich muss nicht – aber ich möchte Kauffrau werden.',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Firma', 'Nähwerk Lenz e. K.'), Z('rf', 'Rechtsform', 'Einzelkauffrau (freiwillig)'), Z('sitz', 'Sitz', 'Lichtenfels'), Z('person', 'Inhaberin', 'Mira Lenz'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'hra', vermerk: 'k', karte: { name: 'Nähwerk Lenz', neu: true },
    falschVermerk: 'Ein Kleingewerbe muss nicht ins Register. Lässt es sich freiwillig eintragen, wird es erst dadurch Kaufmann (Kannkaufmann). Die Wirkung entsteht also mit der Eintragung.' },
  hartmannUmsatz: { lz: 'LZ3', typ: 'anmeldung', wer: 'hartmann', sagt: 'Eine Änderung beim Gegenstand. Und damit alle sehen, wie gut es uns geht, steht der Umsatz gleich mit drin!',
    dok: { titel: 'Anmeldung einer Änderung', zeilen: [Z('firma', 'Firma', 'Hartmann Elektro GmbH'), Z('gegenstand', 'Gegenstand', 'Großhandel mit Elektromaterial und Leuchten'), Z('umsatz', 'Umsatz 2025', '4,2 Mio. €'), Z('person', 'Geschäftsführer', 'Klaus Hartmann'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'ablehnen', fehler: 'umsatz', falsch: 'Umsatz und Gewinn werden nie eingetragen. Das Register zeigt die rechtlichen Verhältnisse: Firma, Sitz, Gegenstand, Kapital, Vertretung.' },
  hartmannProkura: { lz: 'LZ5', typ: 'anmeldung', wer: 'hartmann', sagt: 'Gut, ohne Umsatz. Herr Okafor hat seit gestern Prokura, das soll jetzt rein.',
    dok: { titel: 'Anmeldung einer Änderung', zeilen: [Z('firma', 'Firma', 'Hartmann Elektro GmbH'), Z('prokura', 'Prokura', 'Ole Okafor, Einzelprokura'), Z('person', 'Geschäftsführer', 'Klaus Hartmann'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'hrb', vermerk: 'd', karte: { name: 'Hartmann Elektro' },
    falsch: 'Die Prokura wird eingetragen – bei einer GmbH in Abteilung B.', falschVermerk: 'Die Prokura gilt schon, seit sie erteilt wurde. Die Eintragung macht sie nur bekannt.' },
  birknerHV: { lz: 'LZ5', typ: 'anmeldung', wer: 'birkner', sagt: 'Frau Brandt aus dem Verkauf hat jetzt Handlungsvollmacht. Das soll auch ins Register.',
    dok: { titel: 'Anmeldung einer Änderung', zeilen: [Z('firma', 'Firma', 'Birkenhof Möbel KG'), Z('hv', 'Handlungsvollmacht', 'Nina Brandt, Verkauf'), Z('person', 'Komplementär', 'Jonas Birkner'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'ablehnen', fehler: 'hv', falsch: 'Eine Handlungsvollmacht wird nicht eingetragen – nur die Prokura. Sie gilt auch ohne Eintragung.' },
  krausGF: { lz: 'LZ4', typ: 'anmeldung', wer: 'kraus', sagt: 'Ich habe letzte Woche aufgehört – Herr Demir ist seitdem Geschäftsführer bei Kernwerk.',
    dok: { titel: 'Anmeldung einer Änderung', zeilen: [Z('firma', 'Firma', 'Kernwerk Bürobedarf GmbH'), Z('person', 'Geschäftsführer neu', 'Emre Demir (bisher: Sabine Kraus)'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'hrb', vermerk: 'd', karte: { name: 'Kernwerk Bürobedarf' },
    falschVermerk: 'Herr Demir ist Geschäftsführer, seit er bestellt wurde. Die Eintragung macht den Wechsel nur bekannt.' },
  seidlGF: { lz: 'LZ5', typ: 'streit', wer: 'seidl', sagt: 'Frau Kraus hat am Montag bei mir 500 Kartons für Kernwerk bestellt. Jetzt heißt es: Sie war da schon nicht mehr Geschäftsführerin! Ich wusste von nichts. Muss Kernwerk zahlen?',
    dok: { titel: 'Registerauszug vom Montag · HRB 4711', zeilen: [Z('firma', 'Firma', 'Kernwerk Bürobedarf GmbH'), Z('person', 'Geschäftsführerin', 'Sabine Kraus'), Z('stand', 'Stand', 'Wechsel zu Herrn Demir noch nicht eingetragen')] },
    optionen: [['zahlen', '⚖️ Kernwerk muss zahlen', 'gruen'], ['nicht', '✋ Kernwerk muss nicht zahlen', 'rot']],
    aktion: 'zahlen', falsch: 'Herr Seidl durfte sich auf das Register verlassen: Dort stand am Montag noch Frau Kraus. Eine nicht eingetragene Änderung gilt ihm gegenüber nicht – das ist der öffentliche Glaube.' },
  vogt: { lz: 'LZ3', typ: 'anmeldung', wer: 'vogt', sagt: 'Wir gründen eine Aktiengesellschaft. Die Unterlagen kommen vom Notar.',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Firma', 'Obermain Robotics AG'), Z('rf', 'Rechtsform', 'Aktiengesellschaft (in Gründung)'), Z('sitz', 'Sitz', 'Coburg'), Z('kap', 'Grundkapital', '50.000,00 €'), Z('person', 'Vorstand', 'Dr. Petra Vogt'), Z('ma', 'Mitarbeiter', '12'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'ablehnen', fehler: 'ma', falsch: 'Die Zahl der Mitarbeiter gehört nicht ins Register. Ohne diese Zeile kann die AG eingetragen werden.' },
  seidlProkura: { lz: 'LZ5', typ: 'streit', wer: 'seidl', sagt: 'Schon wieder ich! Herr Okafor, Prokurist bei Hartmann Elektro, hat bei mir für 50.000 € gekauft. Hartmann sagt: Intern durfte er nur bis 10.000 €. Muss Hartmann zahlen?',
    dok: { titel: 'Registerauszug · HRB 2210', zeilen: [Z('firma', 'Firma', 'Hartmann Elektro GmbH'), Z('prokura', 'Prokura', 'Ole Okafor, Einzelprokura'), Z('grenze', 'Grenze', '— im Register steht keine —')] },
    optionen: [['zahlen', '⚖️ Hartmann muss zahlen', 'gruen'], ['nicht', '✋ Nur bis 10.000 €', 'rot']],
    aktion: 'zahlen', falsch: 'Eine Prokura gilt nach außen immer im vollen Umfang. Die interne Grenze von 10.000 € zählt gegenüber Herrn Seidl nicht.' },

  /* Für Üben und Nachweis */
  roth: { lz: 'LZ2', typ: 'anmeldung', wer: 'roth', sagt: 'Zu zweit gründen wir eine Unternehmergesellschaft mit 1.000 € Kapital.',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Firma', 'Roth Digital UG (haftungsbeschränkt)'), Z('rf', 'Rechtsform', 'UG (haftungsbeschränkt)'), Z('sitz', 'Sitz', 'Kronach'), Z('kap', 'Stammkapital', '1.000,00 €'), Z('person', 'Geschäftsführerin', 'Nina Roth'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'hrb', vermerk: 'k', falsch: 'Die UG ist eine Form der GmbH, also eine Kapitalgesellschaft: Abteilung B.', falschVermerk: 'Auch die UG entsteht als Kapitalgesellschaft erst mit der Eintragung.' },
  berg: { lz: 'LZ2', typ: 'anmeldung', wer: 'berg', sagt: 'Mein Kumpel und ich betreiben zusammen eine große Kfz-Werkstatt. Wir haften beide voll.',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Firma', 'Berg & Lorenz OHG'), Z('rf', 'Rechtsform', 'Offene Handelsgesellschaft'), Z('sitz', 'Sitz', 'Kulmbach'), Z('person', 'Gesellschafter', 'Paul Berg, Timo Lorenz'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'hra', vermerk: 'd', falsch: 'Die OHG ist eine Personengesellschaft: Abteilung A.', falschVermerk: 'Eine große Werkstatt ist schon ein kaufmännischer Betrieb. Die Eintragung macht nur bekannt.' },
  vogtAG: { lz: 'LZ4', typ: 'anmeldung', wer: 'vogt', sagt: 'Ohne die Mitarbeiterzeile – jetzt aber bitte!',
    dok: { titel: 'Anmeldung zur Eintragung', zeilen: [Z('firma', 'Firma', 'Obermain Robotics AG'), Z('rf', 'Rechtsform', 'Aktiengesellschaft (in Gründung)'), Z('sitz', 'Sitz', 'Coburg'), Z('kap', 'Grundkapital', '50.000,00 €'), Z('person', 'Vorstand', 'Dr. Petra Vogt'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'hrb', vermerk: 'k', falsch: 'Die AG ist eine Kapitalgesellschaft: Abteilung B.', falschVermerk: 'Die AG entsteht als juristische Person erst mit der Eintragung.' },
  jansenEinsicht: { lz: 'LZ1', typ: 'einsicht', wer: 'jansen', sagt: 'Ich bin Journalist und recherchiere über die Firmen in Coburg. Darf ich alle Auszüge sehen?', grund: 'Recherche',
    aktion: 'auszug', falsch: 'Auch Journalisten dürfen einsehen – jeder darf das.' },
  bergBrief: { lz: 'LZ1', typ: 'anmeldung', wer: 'berg', sagt: 'Wir haben einen neuen Gesellschafter. Ich hab’s Ihnen schnell als Foto geschickt.',
    dok: { titel: 'Anmeldung einer Änderung', zeilen: [Z('firma', 'Firma', 'Berg & Lorenz OHG'), Z('person', 'Gesellschafter neu', 'Lea Kunz'), Z('form', 'Eingereicht', 'Handyfoto per Messenger')] },
    aktion: 'ablehnen', fehler: 'form', falsch: 'Ein Foto per Messenger ist keine öffentlich beglaubigte elektronische Anmeldung.' },
  rothGewinn: { lz: 'LZ3', typ: 'anmeldung', wer: 'roth', sagt: 'Unser erster Gewinn! Den wollen wir im Register stehen haben.',
    dok: { titel: 'Anmeldung einer Änderung', zeilen: [Z('firma', 'Firma', 'Roth Digital UG (haftungsbeschränkt)'), Z('gewinn', 'Gewinn 2025', '18.400 €'), Z('person', 'Geschäftsführerin', 'Nina Roth'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'ablehnen', fehler: 'gewinn', falsch: 'Gewinne werden nicht eingetragen.' },
  kayaProkura: { lz: 'LZ5', typ: 'anmeldung', wer: 'kaya', sagt: 'Mein Bruder bekommt Prokura für Ostwind Papier.',
    dok: { titel: 'Anmeldung einer Änderung', zeilen: [Z('firma', 'Firma', 'Ostwind Papier e. K.'), Z('prokura', 'Prokura', 'Emre Kaya, Einzelprokura'), Z('person', 'Inhaberin', 'Ayşe Kaya'), Z('form', 'Eingereicht', BEGLAUBIGT)] },
    aktion: 'hra', vermerk: 'd', falsch: 'Prokura wird eingetragen. Ostwind Papier ist ein e. K., also Abteilung A.', falschVermerk: 'Die Prokura gilt ab der Erteilung, die Eintragung macht sie nur bekannt.' },
  seidlAlt: { lz: 'LZ5', typ: 'streit', wer: 'seidl', sagt: 'Bei Birkenhof steht schon lange im Register, dass Herr Kern kein Gesellschafter mehr ist. Er hat trotzdem bei mir im Namen der KG bestellt. Muss Birkenhof zahlen?',
    dok: { titel: 'Registerauszug · HRA 1187', zeilen: [Z('firma', 'Firma', 'Birkenhof Möbel KG'), Z('person', 'Gesellschafter', 'Jonas Birkner, Petra Birkner'), Z('stand', 'Ausgeschieden', 'Rolf Kern – eingetragen und bekannt gemacht vor 2 Jahren')] },
    optionen: [['zahlen', '⚖️ Birkenhof muss zahlen', 'gruen'], ['nicht', '✋ Birkenhof muss nicht zahlen', 'rot']],
    aktion: 'nicht', falsch: 'Hier steht das Ausscheiden längst im Register. Wer nicht nachschaut, ist nicht geschützt – der öffentliche Glaube schützt nur, wer sich auf das Register verlassen kann.' }
};

var WOCHEN = [
  { id: 'S1', titel: 'Woche 1 · Erste Tage am Schalter', regeln: ['form', 'einsicht', 'abteilung'],
    faelle: ['kaya', 'birkner', 'gruenMail', 'huber', 'meinel', 'nordmann', 'reuter', 'weber', 'krausSitz', 'jansen'],
    tutorial: [
      { sel: '.st-sprech', t: 'Willkommen am Schalter! Hier sagt dir jeder Besucher, was er will.' },
      { sel: '.st-regelbuch', t: 'Das ist deine Dienstanweisung. Prüf jede Anmeldung damit: Stimmt die Form (§ 1)? Welche Abteilung (§ 3)?' },
      { sel: '.st-papier', t: 'Frau Kaya: notariell beglaubigt, elektronisch – die Form passt. Nichts zu beanstanden.' },
      { sel: '[data-aktion="hra"]', t: 'Ein e. K. gehört nach § 3 in Abteilung A. Drück „Eintragen in HRA“.', klick: true }
    ] },
  { id: 'S2', titel: 'Woche 2 · Die neue Dienstanweisung', regeln: ['form', 'einsicht', 'abteilung', 'inhalt', 'wirkung', 'glaube'],
    faelle: ['gruenGmbH', 'fischer', 'lenz', 'hartmannUmsatz', 'hartmannProkura', 'birknerHV', 'krausGF', 'seidlGF', 'vogt', 'seidlProkura'],
    tutorial: [
      { sel: '.st-regel.neu', t: 'Neue Woche, drei neue Regeln (§ 4 bis § 6). Wirf einen Blick darauf.' },
      { sel: '.st-haus.geist', t: 'Siehst du das blasse Haus im Stadtplan? Die Lindgrün GmbH gibt es noch nicht – sie ist erst „in Gründung“.' },
      { sel: '[data-vermerk="k"]', t: 'Eine GmbH entsteht erst mit der Eintragung (§ 5). Wähle den roten Vermerk.', klick: true },
      { sel: '[data-aktion="hrb"]', t: 'Jetzt eintragen in HRB – und schau auf den Stadtplan.', klick: true }
    ] }
];

/* ---------- Stil des Spiels ---------- */
var STEMPEL_CSS = '.st-spiel{position:relative;display:grid;grid-template-rows:auto auto 1fr auto;min-height:600px;background:#efe7d6;font-size:15px;border-radius:12px;overflow:hidden;color:#26252c}' +
  '.st-oben{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;padding:8px 14px;background:#2b2a33;color:#f5f1e8;font-family:var(--titel)}' +
  '.st-oben b{font-weight:800}.st-oben .st-zeit{margin-left:auto;font-variant-numeric:tabular-nums}.st-ansehen{letter-spacing:2px;color:#fbbf24;font-size:1.05rem}' +
  '.st-stadt{position:relative;min-height:92px;background:linear-gradient(#bfe3f2 0 70%,#a3c98f 70%);border-bottom:3px solid #8b7d62;display:flex;align-items:flex-end;gap:12px;padding:6px 14px 0;overflow-x:auto}' +
  '.st-stadt .leer{align-self:center;font-size:.85rem;color:#3f4a3a}' +
  '.st-haus{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;font-size:.68rem;font-weight:700;transition:opacity .4s}' +
  '.st-haus .dach{width:0;height:0;border-left:30px solid transparent;border-right:30px solid transparent;border-bottom:18px solid #b45309}' +
  '.st-haus .wand{width:56px;height:36px;background:#fff7e6;border:2px solid #8b7d62;display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:4px;box-sizing:border-box}.st-haus .wand i{background:#7dd3fc;border-radius:2px}' +
  '.st-haus.geist{opacity:.5}.st-haus.geist .wand{background:transparent;border-style:dashed}.st-haus.geist .dach{border-bottom-color:#a8a29e}.st-haus.geist .wand i{background:transparent}' +
  '.st-haus.neu{animation:st-auf .7s cubic-bezier(.2,1.6,.4,1)}@keyframes st-auf{from{transform:translateY(40px) scale(.5);opacity:0}}' +
  '.st-haus .schild{background:#1f2937;color:#fff;border-radius:4px;padding:0 5px;margin:2px 0 4px;white-space:nowrap}' +
  '.st-mitte{display:grid;grid-template-columns:210px minmax(0,1fr) 260px;gap:12px;padding:12px;align-items:start}' +
  '@media (max-width:980px){.st-mitte{grid-template-columns:1fr}}' +
  '.st-schalter{background:#d9cdb3;border-radius:12px;padding:10px;display:flex;flex-direction:column;align-items:center;gap:6px}' +
  '.st-schalter .fig{width:120px;animation:st-kommt .5s ease-out}@keyframes st-kommt{from{transform:translateX(-40px);opacity:0}}' +
  '.st-schalter .name{font-weight:800;font-family:var(--titel)}' +
  '.st-sprech{background:#fff;border:2px solid #2b2a33;border-radius:12px;padding:8px 10px;font-size:.92rem;position:relative}' +
  '.st-sprech::before{content:"";position:absolute;top:-10px;left:50%;margin-left:-8px;border:8px solid transparent;border-bottom-color:#2b2a33;border-top:0}' +
  '.st-schlange{font-size:.8rem;color:#5b5446}' +
  '.st-tisch{background:repeating-linear-gradient(90deg,#8a6a45 0 40px,#916f48 40px 80px);border-radius:12px;padding:14px;display:flex;justify-content:center;min-height:300px}' +
  '.st-papier{background:#fffdf6;width:100%;max-width:520px;border-radius:3px;box-shadow:0 10px 24px rgba(0,0,0,.35);padding:14px 16px;position:relative;animation:st-rein .35s ease-out;align-self:flex-start}' +
  '@keyframes st-rein{from{transform:translateX(-60px) rotate(-4deg);opacity:0}}.st-papier.weg{transition:all .45s ease-in;transform:translateY(240px) rotate(8deg);opacity:0}' +
  '.st-papier h4{margin:0 0 6px;font-family:var(--titel);font-size:1.05rem;border-bottom:2px solid #2b2a33;padding-bottom:4px}' +
  '.st-zeile{display:grid;grid-template-columns:130px 1fr 22px;gap:8px;width:100%;text-align:left;background:none;border:0;border-bottom:1px dotted #c9bfa6;border-radius:0;padding:7px 4px;min-height:0;font:inherit;font-size:.93rem;align-items:start;color:inherit;cursor:pointer}' +
  '.st-zeile:hover{background:#fff1c2}.st-zeile b{color:#5b5446}.st-zeile .x{color:#c93c3c;font-weight:800;visibility:hidden}.st-zeile.beanstandet{background:#fde2e2;text-decoration:line-through;text-decoration-color:#c93c3c}.st-zeile.beanstandet .x{visibility:visible}' +
  '.st-zeile.fest{cursor:default}.st-zeile.fest:hover{background:none}' +
  '.st-hinweis{font-size:.8rem;color:#6b6250;margin-top:6px}' +
  '.st-stempel{position:absolute;right:20px;top:36px;border:5px solid;border-radius:10px;padding:6px 12px;font-family:var(--titel);font-weight:800;font-size:1.4rem;letter-spacing:.05em;transform:rotate(-12deg);animation:st-stempel .25s ease-out;background:rgba(255,255,255,.65);pointer-events:none;text-align:center;line-height:1.1}' +
  '.st-stempel small{display:block;font-size:.7rem;letter-spacing:0}' +
  '@keyframes st-stempel{from{transform:rotate(-12deg) scale(2.4);opacity:0}}' +
  '.st-stempel.gruen{color:#15803d;border-color:#15803d}.st-stempel.rot{color:#b91c1c;border-color:#b91c1c}.st-stempel.gelb{color:#a16207;border-color:#a16207}' +
  '.st-auszug{background:#f3f7ff}' +
  '.st-regelbuch{background:#fdf8ec;border-radius:12px;padding:10px 12px;border:2px solid #c9bfa6;max-height:440px;overflow:auto}' +
  '.st-regelbuch h4{margin:0 0 4px;font-family:var(--titel)}.st-regel{border-top:1px dashed #c9bfa6;padding:6px 0;font-size:.86rem;line-height:1.35}.st-regel b.t{display:block;font-family:var(--titel)}' +
  '.st-regel.neu{background:#fff3c4;border-radius:6px;padding:6px}.st-regel.neu b.t::after{content:" · NEU";color:#b45309;font-size:.75rem}' +
  '.st-aktionen{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;padding:10px 12px 12px;background:#2b2a33}' +
  '.st-aktionen .reihe{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:100%}' +
  '.st-aktionen button{font-family:var(--titel);font-weight:800;min-height:50px;padding:6px 14px;border:2px solid #f5f1e8;background:#3b3a44;color:#f5f1e8;border-radius:10px}' +
  '.st-aktionen button:hover{filter:brightness(1.2)}' +
  '.st-aktionen .gruen{background:#166534;border-color:#86efac}.st-aktionen .rot{background:#991b1b;border-color:#fca5a5}.st-aktionen .gelb{background:#854d0e;border-color:#fcd34d}' +
  '.st-aktionen .vermerk{background:#f5f1e8;color:#26252c;min-height:42px}.st-aktionen .vermerk.gewaehlt{outline:4px solid #fbbf24;outline-offset:2px;background:#fff}' +
  '.st-blase{position:absolute;left:50%;bottom:86px;transform:translateX(-50%);z-index:6;background:#fff;border:3px solid #b91c1c;border-radius:14px;padding:12px 14px;width:min(480px,92%);box-shadow:0 20px 50px rgba(0,0,0,.4);display:flex;gap:12px;align-items:flex-start;animation:st-rein .2s ease-out}' +
  '.st-blase.lob{border-color:#15803d}.st-blase.tut{border-color:#2563eb;position:static;transform:none;width:auto;margin:8px 12px 0;box-shadow:0 4px 14px rgba(0,0,0,.15);align-items:center}.st-blase.tut button{margin:0 0 0 auto}.st-blase.tut>div:last-child{display:flex;flex-wrap:wrap;gap:4px 12px;align-items:center;flex:1}.st-blase.tut>div:last-child>b{width:100%}.st-blase .fig{width:70px;flex:0 0 auto}.st-blase b{font-family:var(--titel)}.st-blase button{margin-top:8px}' +
  '.st-puls{animation:st-puls 1.1s infinite;position:relative;z-index:2}@keyframes st-puls{0%,100%{box-shadow:0 0 0 0 rgba(251,191,36,.95)}50%{box-shadow:0 0 0 9px rgba(251,191,36,0)}}' +
  '.st-ende{padding:18px;display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center}' +
  '.st-zeitung{background:#fbfaf6;max-width:620px;width:100%;border:1px solid #d6d3d1;box-shadow:0 8px 24px rgba(0,0,0,.2);padding:14px 18px;text-align:left;font-family:Georgia,serif;transform:rotate(-1deg);animation:st-rein .5s ease-out}' +
  '.st-zeitung .kopf2{font-family:var(--titel);font-weight:800;font-size:1.7rem;border-bottom:3px double #111;text-align:center}' +
  '.st-zeitung h5{font-size:1.2rem;margin:10px 0 4px;line-height:1.2}.st-zeitung p{margin:0 0 6px;font-size:.92rem}' +
  '.st-ende button{font-family:var(--titel);font-weight:800;min-height:50px;padding:6px 18px}' +
  '.st-spiel.klein{min-height:0}.st-spiel.klein .st-mitte{grid-template-columns:170px minmax(0,1fr) 240px}';

/* ---------- Der Schalter: spielt eine Liste von Fällen ----------
   opt: { faelle:[ids], regeln:[…], neueRegeln:[…], titel, stadt:[namen]|null, tutorial:[schritte]|null,
          pruefung:bool (kein Feedback), klein:bool, beiEnde(fehlerliste, ergebnisse) } */
function schalter(box, opt) {
  var E = KIT.el;
  if (!document.getElementById('st-css')) { var s = document.createElement('style'); s.id = 'st-css'; s.textContent = STEMPEL_CSS; document.head.appendChild(s); }
  var fig = function (a, aus) { return KIT.figur(a, { ausdruck: aus }); };
  var nr = 0, fehler = [], erg = [], ansehen = 5, gesperrt = false, beanstandet = {}, vermerk = null, tut = -1;
  var wurzel = E('div', { class: 'st-spiel' + (opt.klein ? ' klein' : '') });
  box.innerHTML = ''; box.appendChild(wurzel);
  var stadt = opt.stadt;
  function fall() { return F[opt.faelle[nr]]; }
  function hatWirkung() { return opt.regeln.indexOf('wirkung') >= 0; }

  function haus(name, geist, neu) {
    return E('div', { class: 'st-haus' + (geist ? ' geist' : '') + (neu ? ' neu' : ''), 'data-name': name }, [E('div', { class: 'dach' }), E('div', { class: 'wand', html: '<i></i><i></i><i></i><i></i>' }), E('div', { class: 'schild', text: geist ? name + ' i. G.' : name })]);
  }
  function zeichne() {
    var f = fall(), wer = LEUTE[f.wer];
    beanstandet = {}; vermerk = null; tut = -1;
    wurzel.innerHTML = '';
    var minuten = 8 * 60 + Math.round(nr * 480 / opt.faelle.length), hh = Math.floor(minuten / 60), mm = minuten % 60;
    wurzel.appendChild(E('div', { class: 'st-oben' }, [E('b', { text: '⚖️ Registergericht Bamberg' }), E('span', { text: opt.titel }),
      E('span', { class: 'st-zeit', text: '🕗 ' + hh + ':' + (mm < 10 ? '0' : '') + mm + ' · Vorgang ' + (nr + 1) + ' von ' + opt.faelle.length }),
      opt.pruefung ? null : E('span', { class: 'st-ansehen', title: 'Ansehen des Gerichts', 'aria-label': 'Ansehen ' + ansehen + ' von 5 Sternen', text: '★★★★★'.slice(0, ansehen) + '☆☆☆☆☆'.slice(0, 5 - ansehen) })]));
    if (stadt) {
      var st = E('div', { class: 'st-stadt', 'aria-label': 'Stadtplan mit den eingetragenen Firmen' });
      stadt.forEach(function (n) { st.appendChild(haus(n)); });
      if (f.karte && f.karte.neu && stadt.indexOf(f.karte.name) < 0) st.appendChild(haus(f.karte.name, true));
      if (!st.children.length) st.appendChild(E('span', { class: 'leer', text: '🏙️ Stadtplan: Jede Firma, die du einträgst, bekommt hier ihr Schild.' }));
      wurzel.appendChild(st);
    }
    var mitte = E('div', { class: 'st-mitte' });
    mitte.appendChild(E('div', { class: 'st-schalter' }, [E('div', { class: 'fig', html: fig(wer.aussehen, f.typ === 'streit' ? 'nachdenklich' : 'freundlich') }), E('div', { class: 'name', text: wer.name }), E('div', { class: 'st-sprech', html: f.sagt }), E('div', { class: 'st-schlange', text: opt.faelle.length - nr - 1 ? '👥 ' + (opt.faelle.length - nr - 1) + ' warten noch' : 'Letzter Vorgang' })]));
    var tisch = E('div', { class: 'st-tisch' }), papier;
    if (f.typ === 'einsicht') {
      papier = E('div', { class: 'st-papier st-auszug' }, [E('h4', { text: 'Antrag auf Einsicht' }), E('p', { html: 'Gewünscht: <b>aktueller Abdruck</b> aus dem Handelsregister' }), E('p', { html: 'Begründung: <i>' + f.grund + '</i>' })]);
    } else {
      papier = E('div', { class: 'st-papier' + (f.typ === 'streit' ? ' st-auszug' : '') }, [E('h4', { text: f.dok.titel })]);
      f.dok.zeilen.forEach(function (z) {
        if (f.typ === 'streit') { papier.appendChild(E('div', { class: 'st-zeile fest' }, [E('b', { text: z[1] }), E('span', { text: z[2] }), E('span')])); return; }
        var b = E('button', { type: 'button', class: 'st-zeile', 'data-id': z[0], 'aria-pressed': 'false', onclick: function () {
          if (gesperrt) return;
          beanstandet[z[0]] = !beanstandet[z[0]];
          b.classList.toggle('beanstandet', !!beanstandet[z[0]]); b.setAttribute('aria-pressed', beanstandet[z[0]] ? 'true' : 'false');
        } }, [E('b', { text: z[1] }), E('span', { text: z[2] }), E('span', { class: 'x', text: '✗' })]);
        papier.appendChild(b);
      });
      if (f.typ === 'anmeldung') papier.appendChild(E('div', { class: 'st-hinweis', text: '✗ Eine Zeile verstößt gegen die Dienstanweisung? Antippen = beanstanden. Dann ablehnen.' }));
    }
    tisch.appendChild(papier); mitte.appendChild(tisch);
    var rb = E('div', { class: 'st-regelbuch', 'aria-label': 'Dienstanweisung' }, [E('h4', { text: '📘 Dienstanweisung' })]);
    if (opt.ohneRegeln) rb.appendChild(E('p', { class: 'st-regel', html: 'Heute liegt die Dienstanweisung im Schrank – du kennst sie inzwischen.' }));
    else opt.regeln.slice().sort(function (a, b) { var n = opt.neueRegeln || []; return (n.indexOf(b) >= 0) - (n.indexOf(a) >= 0); }).forEach(function (r) { rb.appendChild(E('div', { class: 'st-regel' + ((opt.neueRegeln || []).indexOf(r) >= 0 ? ' neu' : ''), 'data-regel': r }, [E('b', { class: 't', text: REGELN[r].titel }), E('span', { html: REGELN[r].text })])); });
    mitte.appendChild(rb);
    wurzel.appendChild(mitte);

    var akt = E('div', { class: 'st-aktionen', role: 'toolbar', 'aria-label': 'Deine Entscheidung' });
    function knopf(id, text, kl) { return E('button', { type: 'button', class: kl || '', 'data-aktion': id, text: text, onclick: function () { entscheide(id); } }); }
    if (f.typ === 'einsicht') { akt.appendChild(knopf('auszug', '📄 Auszug ausgeben', 'gruen')); akt.appendChild(knopf('abweisen', '✋ Abweisen', 'rot')); }
    else if (f.typ === 'streit') f.optionen.forEach(function (o) { akt.appendChild(knopf(o[0], o[1], o[2])); });
    else {
      if (hatWirkung()) {
        var r1 = E('div', { class: 'reihe', role: 'radiogroup', 'aria-label': 'Eintragungsvermerk' });
        [['k', '🟥 Vermerk: entsteht mit Eintragung'], ['d', '🟦 Vermerk: wird bekannt gemacht']].forEach(function (v) {
          r1.appendChild(E('button', { type: 'button', class: 'vermerk', role: 'radio', 'aria-checked': 'false', 'data-vermerk': v[0], text: v[1], onclick: function () { waehleVermerk(v[0]); } }));
        });
        akt.appendChild(r1);
      }
      var r2 = E('div', { class: 'reihe' }, [knopf('hra', '🗄️ Eintragen in HRA', 'gruen'), knopf('hrb', '🗄️ Eintragen in HRB', 'gruen'), knopf('anderes', '↪️ Anderes Register', 'gelb'), knopf('ablehnen', '⛔ Ablehnen', 'rot')]);
      akt.appendChild(r2);
    }
    wurzel.appendChild(akt);
    if (nr === 0 && opt.tutorial) tutorial(0);
  }
  function waehleVermerk(v) {
    vermerk = v;
    wurzel.querySelectorAll('.vermerk').forEach(function (b) { var an = b.getAttribute('data-vermerk') === v; b.classList.toggle('gewaehlt', an); b.setAttribute('aria-checked', an ? 'true' : 'false'); });
    if (tut >= 0 && opt.tutorial[tut] && opt.tutorial[tut].sel.indexOf('data-vermerk') >= 0) tutorial(tut + 1);
  }

  /* Tutorial: Die Direktorin führt durch den ersten Fall (Lösungsbeispiel im Spiel) */
  function platziere(b) { var a = wurzel.querySelector('.st-aktionen'); b.style.bottom = ((a ? a.offsetHeight : 70) + 14) + 'px'; }
  function blaseWeg() { var b = wurzel.querySelector('.st-blase'); if (b) b.remove(); wurzel.querySelectorAll('.st-puls').forEach(function (n) { n.classList.remove('st-puls'); }); }
  function tutorial(i) {
    blaseWeg(); tut = i;
    var s = opt.tutorial[i]; if (!s) { tut = -1; return; }
    var ziel = wurzel.querySelector(s.sel); if (ziel) ziel.classList.add('st-puls');
    var oben = wurzel.querySelector('.st-oben');
    oben.parentNode.insertBefore(E('div', { class: 'st-blase tut', role: 'status' }, [E('div', { class: 'fig', html: fig(DIREKTORIN.aussehen, 'freundlich') }), E('div', {}, [E('b', { text: DIREKTORIN.name + ', Direktorin' }), E('div', { html: s.t }),
      s.klick ? null : E('button', { type: 'button', class: 'st-tut-weiter', text: 'Verstanden →', onclick: function () { tutorial(i + 1); } })])]), oben.nextSibling);
  }
  function blase(art, titel, text, knopfText, danach) {
    blaseWeg();
    var b = E('div', { class: 'st-blase ' + art, role: 'alertdialog', 'aria-label': titel }, [E('div', { class: 'fig', html: fig(DIREKTORIN.aussehen, art === 'lob' ? 'froh' : art === 'tut' ? 'nachdenklich' : 'ernst') }), E('div', {}, [E('b', { text: titel }), E('div', { html: text }), E('button', { type: 'button', class: 'st-ok', text: knopfText, onclick: function () { b.remove(); if (danach) danach(); } })])]);
    wurzel.appendChild(b); platziere(b); b.querySelector('button').focus();
  }

  function bewerte(id) {
    var f = fall(), ok = id === f.aktion, grund = '';
    if (ok && id === 'ablehnen') {
      var m = Object.keys(beanstandet).filter(function (k) { return beanstandet[k]; });
      if (!(m.length === 1 && m[0] === f.fehler)) { ok = false; grund = 'Ablehnen war richtig – aber du hast die falsche Zeile beanstandet. ' + (f.falsch || ''); }
    }
    if (ok && (id === 'hra' || id === 'hrb') && hatWirkung() && f.vermerk && vermerk !== f.vermerk) { ok = false; grund = 'Die Abteilung stimmt, aber der Vermerk nicht. ' + (f.falschVermerk || ''); }
    if (!ok && !grund) grund = f.falsch || 'Schau noch einmal in die Dienstanweisung.';
    return { ok: ok, grund: grund };
  }
  function entscheide(id, sofort) {
    if (gesperrt) return;
    var f = fall(), mitVermerk = hatWirkung() && (id === 'hra' || id === 'hrb');
    if (!sofort && mitVermerk && !vermerk) { blase('tut', 'Moment!', 'Erst den Vermerk wählen (§ 5): Entsteht etwas mit der Eintragung, oder wird nur bekannt gemacht, was es schon gibt?', 'Okay'); return; }
    if (!sofort && id === 'ablehnen' && !Object.keys(beanstandet).some(function (k) { return beanstandet[k]; })) { blase('tut', 'Moment!', 'Eine Ablehnung braucht eine Begründung: Tippe zuerst die Zeile an, die gegen die Dienstanweisung verstößt.', 'Okay'); return; }
    if (tut >= 0 && opt.tutorial && opt.tutorial[tut] && opt.tutorial[tut].sel !== '[data-aktion="' + id + '"]' && !sofort) { /* im Tutorial trotzdem zulassen */ }
    blaseWeg(); tut = -1;
    var r = bewerte(id);
    erg.push({ lz: f.lz, text: LEUTE[f.wer].name + ': ' + (r.ok ? 'richtig entschieden' : 'falsch entschieden'), ok: r.ok, fall: opt.faelle[nr], wahl: id, vermerk: vermerk });
    if (!r.ok) { fehler.push({ wer: LEUTE[f.wer].name, grund: r.grund }); ansehen = Math.max(0, ansehen - 1); }
    // Folgen: Stadtplan
    var eingetragen = (id === 'hra' || id === 'hrb') && (r.ok || opt.pruefung);
    if (stadt && f.karte && eingetragen && r.ok && stadt.indexOf(f.karte.name) < 0) stadt.push(f.karte.name);
    if (sofort) { gesperrt = false; return naechster(); }
    gesperrt = true;
    var papier = wurzel.querySelector('.st-papier');
    var S = { auszug: ['AUSGEGEBEN', 'gruen'], abweisen: ['ABGEWIESEN', 'rot'], ablehnen: ['ABGELEHNT', 'rot'], anderes: ['ANDERES REGISTER', 'gelb'], zahlen: ['MUSS ZAHLEN', 'gruen'], nicht: ['MUSS NICHT ZAHLEN', 'rot'] }[id] ||
      ['EINGETRAGEN ' + id.toUpperCase() + (mitVermerk ? '<small>' + (vermerk === 'k' ? 'entsteht mit Eintragung' : 'wird bekannt gemacht') + '</small>' : ''), 'gruen'];
    papier.appendChild(E('div', { class: 'st-stempel ' + S[1], html: S[0] }));
    if (stadt && f.karte && eingetragen && r.ok) {
      var h = [].slice.call(wurzel.querySelectorAll('.st-haus')).filter(function (x) { return x.getAttribute('data-name') === f.karte.name; })[0];
      if (h) { h.classList.remove('geist'); h.querySelector('.schild').textContent = f.karte.name; h.classList.add('neu'); }
      else { var st = wurzel.querySelector('.st-stadt'), leer = st.querySelector('.leer'); if (leer) leer.remove(); st.appendChild(haus(f.karte.name, false, true)); }
    }
    var stern = wurzel.querySelector('.st-ansehen'); if (stern) { stern.textContent = '★★★★★'.slice(0, ansehen) + '☆☆☆☆☆'.slice(0, 5 - ansehen); stern.setAttribute('aria-label', 'Ansehen ' + ansehen + ' von 5 Sternen'); }
    function weiter() { papier.classList.add('weg'); setTimeout(function () { gesperrt = false; naechster(); }, 380); }
    setTimeout(function () {
      if (opt.pruefung) weiter();
      else if (!r.ok) blase('', 'Das war nicht richtig.', r.grund + ' <i>(Das kostet einen Stern.)</i>', 'Verstanden – weiter', weiter);
      else if (opt.tutorial && nr === 0) blase('lob', 'Genau so!', 'Jetzt bist du dran. Die nächsten Vorgänge entscheidest du allein – die Dienstanweisung hilft dir.', 'Los geht’s', weiter);
      else weiter();
    }, 700);
  }
  function naechster() {
    nr++;
    if (nr < opt.faelle.length) zeichne(); else opt.beiEnde(fehler, erg, wurzel);
  }
  zeichne();
  return {
    // spielt alle offenen Fälle sofort richtig (Musterlösung für den Test)
    loeseAlle: function () {
      while (nr < opt.faelle.length) {
        var f = fall();
        if (f.aktion === 'ablehnen') { beanstandet = {}; beanstandet[f.fehler] = true; }
        vermerk = f.vermerk || null;
        entscheide(f.aktion, true);
      }
    },
    ergebnisse: function () { return erg; },
    offen: function () { return opt.faelle.slice(nr); }
  };
}

/* ---------- Das Hauptspiel: zwei Wochen am Schalter ---------- */
function stempelSpiel(box, api) {
  var E = KIT.el;
  var w = Math.min(api.speicher('w') || 0, WOCHEN.length - 1), stadt = (api.speicher('st') || []).slice(), sch = null;
  function woche() {
    var W = WOCHEN[w], stadtStart = stadt.slice();
    api.speicher('w', w);
    sch = schalter(box, { faelle: W.faelle, regeln: W.regeln, neueRegeln: w ? W.regeln.filter(function (r) { return WOCHEN[w - 1].regeln.indexOf(r) < 0; }) : [], titel: W.titel, stadt: stadt, tutorial: W.tutorial,
      beiEnde: function (fehler, erg, wurzel) { ende(W, fehler, wurzel, stadtStart); } });
  }
  function ende(W, fehler, wurzel, stadtStart) {
    var n = W.faelle.length, richtig = n - fehler.length, bestanden = fehler.length <= 2;
    wurzel.innerHTML = '';
    var z = E('div', { class: 'st-zeitung' }, [E('div', { class: 'kopf2', text: 'Obermain-Kurier' }), E('div', { style: { textAlign: 'center', fontSize: '.8rem' }, text: W.titel + ' · Wochenbilanz des Registergerichts' }),
      E('h5', { text: bestanden ? (fehler.length ? 'Registergericht arbeitet zuverlässig: ' : 'Fehlerfrei! ') + richtig + ' von ' + n + ' Vorgängen korrekt' : 'Chaos im Registergericht? Nur ' + richtig + ' von ' + n + ' Vorgängen korrekt' })]);
    if (!fehler.length) z.appendChild(E('p', { text: 'Die Direktorin lobt ihr neues Teammitglied: kein einziger Fehler.' }));
    fehler.forEach(function (x) { z.appendChild(E('p', { html: '<b>Ärger um den Fall ' + KIT.esc(x.wer) + ':</b> ' + x.grund })); });
    if (bestanden) { api.speicher('st', stadt); api.level(W.id, fehler.length ? 'Höchstens zwei Fehler – bestanden.' : 'Ohne einen einzigen Fehler!'); }
    else { stadt.length = 0; stadtStart.forEach(function (x) { stadt.push(x); }); }
    var knopf = bestanden
      ? E('button', { type: 'button', class: 'st-weiter', text: w + 1 < WOCHEN.length ? 'Nächste Woche beginnen →' : 'Abschluss ansehen →', onclick: function () { if (w + 1 < WOCHEN.length) { w++; woche(); } else schluss(); } })
      : E('button', { type: 'button', class: 'st-weiter', text: '↺ Woche wiederholen – höchstens zwei Fehler', onclick: woche });
    wurzel.appendChild(E('div', { class: 'st-ende' }, [z, bestanden ? null : E('p', { text: 'Mehr als zwei Fehler: Die Direktorin lässt dich die Woche noch einmal machen.' }), knopf]));
    knopf.focus();
  }
  function schluss() {
    box.innerHTML = '';
    var wurzel = E('div', { class: 'st-spiel' }); box.appendChild(wurzel);
    var st = E('div', { class: 'st-stadt', style: { minHeight: '130px' } });
    stadt.forEach(function (n) { st.appendChild(E('div', { class: 'st-haus neu' }, [E('div', { class: 'dach' }), E('div', { class: 'wand', html: '<i></i><i></i><i></i><i></i>' }), E('div', { class: 'schild', text: n })])); });
    wurzel.appendChild(st);
    wurzel.appendChild(E('div', { class: 'st-ende' }, [E('div', { style: { width: '130px' }, html: KIT.figur(DIREKTORIN.aussehen, { ausdruck: 'froh' }) }), E('h3', { text: 'Zwei Wochen Registergericht geschafft!' }),
      E('p', { text: stadt.length + ' Firmen stehen jetzt durch deine Stempel im Stadtplan. Unten wartet die Zwischenbilanz, dann geht es weiter mit ② Üben.' }),
      E('button', { type: 'button', text: '↺ Noch einmal von vorn spielen', onclick: function () { w = 0; stadt.length = 0; api.speicher('st', []); woche(); } })]));
  }
  if (WOCHEN.every(function (W) { return api.geschafft(W.id); })) schluss(); else woche();
  return {
    loesen: function () {
      for (w = 0; w < WOCHEN.length; w++) { woche(); sch.loeseAlle(); }
      w = WOCHEN.length - 1; schluss();
    }
  };
}

/* Kleine Schicht für Üben: höchstens ein Fehler, sonst neu */
function uebungsSchicht(ids, regeln, titel) {
  return function (box, api) {
    var sch;
    function start() {
      sch = schalter(box, { faelle: ids, regeln: regeln, titel: titel, stadt: null, klein: true, beiEnde: function (fehler, erg, wurzel) {
        wurzel.innerHTML = '';
        var ok = fehler.length <= 1;
        wurzel.appendChild(E2('div', { class: 'st-ende' }, [E2('h3', { text: ok ? '✔ Schicht geschafft' : 'Noch nicht ganz' }), E2('p', { text: (ids.length - fehler.length) + ' von ' + ids.length + ' richtig.' + (ok ? '' : ' Höchstens ein Fehler – probier es noch einmal.') }), ok ? null : E2('button', { type: 'button', text: '↺ Schicht wiederholen', onclick: start })]));
        if (ok) api.erledigt((ids.length - fehler.length) + ' von ' + ids.length + ' richtig entschieden.');
      } });
    }
    var E2 = KIT.el;
    start();
    return { loesen: function () { sch.loeseAlle(); } };
  };
}

/* ---------- Weitere Fälle für Üben und Nachweis ---------- */
LEUTE.dietz = { name: 'Rainer Dietz', aussehen: { haut: 1, haare: 'braun', frisur: 'kurz', kleidung: '#b91c1c', krawatte: '#1f2937' } };
LEUTE.hahn = { name: 'Clara Hahn', aussehen: { haut: 0, haare: 'blond', frisur: 'lang', kleidung: '#7e22ce', brille: true } };
LEUTE.schmitt = { name: 'Deniz Schmitt', aussehen: { haut: 3, haare: 'schwarz', frisur: 'kurz', kleidung: '#047857' } };
LEUTE.bohne = { name: 'Ida Bohne', aussehen: { haut: 2, haare: 'dunkelbraun', frisur: 'zopf', kleidung: '#78350f' } };
function anm(wer, sagt, titel, firma, rf, extra, aktion, mehr) {
  var zeilen = [Z('firma', 'Firma', firma)].concat(rf ? [Z('rf', 'Rechtsform', rf)] : []).concat(extra || []).concat([Z('form', 'Eingereicht', BEGLAUBIGT)]);
  var f = { typ: 'anmeldung', wer: wer, sagt: sagt, dok: { titel: titel, zeilen: zeilen }, aktion: aktion };
  Object.keys(mehr || {}).forEach(function (k) { f[k] = mehr[k]; });
  return f;
}
var NEU = 'Anmeldung zur Eintragung', AEND = 'Anmeldung einer Änderung';
// Üben 1: Abteilungen
F.uAG = anm('hahn', 'Wir sind eine Aktiengesellschaft und ziehen nach Bamberg.', AEND, 'Frankenstahl AG', 'Aktiengesellschaft', [Z('sitz', 'Neuer Sitz', 'Bamberg')], 'hrb', { lz: 'LZ2', vermerk: 'd', falsch: 'Die AG ist eine Kapitalgesellschaft: Abteilung B.' });
F.uOHG = anm('schmitt', 'Wir sind drei Gesellschafter, alle haften voll.', NEU, 'Schmitt & Arslan OHG', 'Offene Handelsgesellschaft', [Z('sitz', 'Sitz', 'Coburg')], 'hra', { lz: 'LZ2', vermerk: 'd', falsch: 'Die OHG ist eine Personengesellschaft: Abteilung A.' });
F.uVerein = anm('meinel', 'Diesmal der Musikverein – wir sind jetzt eingetragen.', NEU, 'Musikverein Harmonie e. V.', 'eingetragener Verein', [Z('person', 'Vorstand', 'Karl Meinel')], 'anderes', { lz: 'LZ2', falsch: 'Vereine gehören ins Vereinsregister.' });
F.uUG = anm('roth', 'Unsere kleine UG für Webdesign, mit 500 € Kapital.', NEU, 'Klickwerk UG (haftungsbeschränkt)', 'UG (haftungsbeschränkt)', [Z('kap', 'Stammkapital', '500,00 €')], 'hrb', { lz: 'LZ2', vermerk: 'k', falsch: 'Die UG ist eine Kapitalgesellschaft (Form der GmbH): Abteilung B.' });
F.uCoKG = anm('nordmann', 'Noch eine GmbH & Co. KG, diesmal für Immobilien.', NEU, 'Mainblick Immobilien GmbH & Co. KG', 'Kommanditgesellschaft', [Z('person', 'Komplementärin', 'Mainblick Verwaltungs GmbH')], 'hra', { lz: 'LZ2', vermerk: 'd', falsch: 'Eine GmbH & Co. KG ist eine KG: Abteilung A.' });
// Üben 2: Vermerk
F.uBohne = anm('bohne', 'Wir gründen eine Kaffeerösterei als GmbH.', NEU, 'Rösterei Bohne GmbH', 'GmbH (in Gründung)', [Z('kap', 'Stammkapital', '25.000,00 €')], 'hrb', { lz: 'LZ4', vermerk: 'k', karte: { name: 'Rösterei Bohne', neu: true }, falschVermerk: 'Die GmbH entsteht erst mit der Eintragung.' });
F.uDietz = anm('dietz', 'Mein Autohaus läuft seit zehn Jahren, 25 Leute. Ich war nie eingetragen.', NEU, 'Autohaus Dietz e. K.', 'Einzelkaufmann', [Z('ma0', 'Betrieb', 'Kfz-Handel mit Werkstatt seit 2016')], 'hra', { lz: 'LZ4', vermerk: 'd', karte: { name: 'Autohaus Dietz' }, falschVermerk: 'Ein Autohaus mit 25 Leuten ist längst ein kaufmännischer Betrieb (Istkaufmann). Die Eintragung macht nur bekannt.' });
F.uImker = anm('berg', 'Ich habe eine kleine Imkerei im Nebenerwerb. Ich möchte freiwillig Kaufmann werden.', NEU, 'Imkerei Honigtau e. K.', 'Einzelkaufmann (freiwillig)', [], 'hra', { lz: 'LZ4', vermerk: 'k', karte: { name: 'Imkerei Honigtau', neu: true }, falschVermerk: 'Ein Kleingewerbe wird durch die freiwillige Eintragung erst Kaufmann (Kannkaufmann).' });
F.uHahnGF = anm('hahn', 'Frankenstahl hat seit letztem Monat einen neuen Vorstand.', AEND, 'Frankenstahl AG', 'Aktiengesellschaft', [Z('person', 'Vorstand neu', 'Clara Hahn')], 'hrb', { lz: 'LZ4', vermerk: 'd', falschVermerk: 'Der neue Vorstand ist schon bestellt. Die Eintragung macht den Wechsel nur bekannt.' });
// Üben 3: Streitfälle und Vollmachten
F.uWolf = { lz: 'LZ5', typ: 'streit', wer: 'seidl', sagt: 'Herr Wolf hatte Prokura bei Autohaus Dietz. Sie wurde letzten Monat widerrufen, im Register steht sie aber noch. Er hat bei mir Reifen für 8.000 € gekauft. Muss Dietz zahlen?',
  dok: { titel: 'Registerauszug · HRA 3302', zeilen: [Z('firma', 'Firma', 'Autohaus Dietz e. K.'), Z('prokura', 'Prokura', 'Martin Wolf, Einzelprokura'), Z('stand', 'Stand', 'Widerruf noch nicht eingetragen')] },
  optionen: [['zahlen', '⚖️ Dietz muss zahlen', 'gruen'], ['nicht', '✋ Dietz muss nicht zahlen', 'rot']], aktion: 'zahlen',
  falsch: 'Der Widerruf steht nicht im Register. Herr Seidl darf sich auf die eingetragene Prokura verlassen – öffentlicher Glaube.' };
F.uHahnPK = { lz: 'LZ5', typ: 'streit', wer: 'schmitt', sagt: 'Die Prokuristin von Frankenstahl hat bei uns einen Firmenwagen gekauft. Frankenstahl sagt: Sie durfte intern nur Büromaterial kaufen.',
  dok: { titel: 'Registerauszug · HRB 1530', zeilen: [Z('firma', 'Firma', 'Frankenstahl AG'), Z('prokura', 'Prokura', 'Lea Brunner, Einzelprokura')] },
  optionen: [['zahlen', '⚖️ Frankenstahl muss zahlen', 'gruen'], ['nicht', '✋ Frankenstahl muss nicht zahlen', 'rot']], aktion: 'zahlen',
  falsch: 'Eine Prokura gilt nach außen im vollen Umfang. Die interne Grenze zählt gegenüber dem Autohändler nicht.' };
F.uHV = anm('dietz', 'Mein Verkäufer Herr Pohl bekommt Handlungsvollmacht. Bitte eintragen.', AEND, 'Autohaus Dietz e. K.', null, [Z('hv', 'Handlungsvollmacht', 'Jan Pohl, Verkauf')], 'ablehnen', { lz: 'LZ5', fehler: 'hv', falsch: 'Die Handlungsvollmacht wird nicht eingetragen – nur die Prokura.' });
// Nachweis: neue Situation, ohne Hilfe
F.bergHV = anm('berg', 'Unsere Bürokraft Frau Kunz bekommt Handlungsvollmacht.', AEND, 'Berg & Lorenz OHG', null, [Z('hv', 'Handlungsvollmacht', 'Lea Kunz, Büro')], 'ablehnen', { lz: 'LZ3', fehler: 'hv' });
F.berg.lz = 'LZ2'; F.roth.lz = 'LZ2'; F.kayaProkura.lz = 'LZ5';

var ALLE_REGELN = ['form', 'einsicht', 'abteilung', 'inhalt', 'wirkung', 'glaube'];
var NACHWEIS_FAELLE = ['roth', 'jansenEinsicht', 'berg', 'rothGewinn', 'bergBrief', 'kayaProkura', 'bergHV', 'seidlAlt'];

window.PAKET = {
  id: 'wsk-handelsregister-stempel',
  titel: 'Stempel drauf!',
  untertitel: 'Das Handelsregister – du arbeitest am Registergericht',
  version: '0.3',
  bestehen: 80,
  dauer: 'etwa 45 Minuten',
  welt: { thema: 'wirtschaft', kulisse: 'stadt', symbol: '⚖️' },
  figur: { name: 'Dr. Albers', rolle: 'Direktorin des Amtsgerichts', aussehen: DIREKTORIN.aussehen },
  leitsituation: 'Willkommen am <b>Registergericht</b>! Ab heute sitzt du am Schalter. Firmen wollen eingetragen werden, Bürger wollen Auszüge. Halte dich an die Dienstanweisung – jeder Fehler landet in der Zeitung.',
  spielwelt: { titel: 'Stempel drauf! Zwei Wochen am Registergericht', tab: 'Am Schalter', start: stempelSpiel },

  stationen: [
    { id: 'S1', titel: 'Woche 1 · Erste Tage am Schalter', lz: ['LZ1', 'LZ2'], check: ['C1', 'C3', 'C4'],
      mitdenken: { auftrag: 'Erklär deinem Sitznachbarn in drei Sätzen, warum Frau Grün ihre Anmeldung nicht einfach mailen darf.', muster: 'Das Register ist öffentlich und alle verlassen sich darauf. Darum muss sicher sein, dass die Anmeldung echt ist. Das garantiert die öffentliche Beglaubigung durch den Notar.' } },
    { id: 'S2', titel: 'Woche 2 · Die neue Dienstanweisung', lz: ['LZ3', 'LZ4', 'LZ5'], check: ['C5', 'C7', 'C10'],
      mitdenken: { auftrag: 'Zeichne auf Papier zwei Spalten: 🟥 „entsteht mit Eintragung“ und 🟦 „wird bekannt gemacht“. Sortiere alle Fälle von Woche 2 ein.', muster: '🟥 Lindgrün GmbH, Nähwerk Lenz. 🟦 Fischer Großhandel, Prokura Okafor, Geschäftsführer Demir.' } }
  ],

  uebungen: [
    { id: 'UE1', titel: 'Montagsansturm', lz: ['LZ2'],
      auftrag: 'Fünf Anmeldungen am Stück. Welche Abteilung – oder ein ganz anderes Register?',
      interaktion: uebungsSchicht(['uAG', 'uOHG', 'uVerein', 'uUG', 'uCoKG'], ['form', 'abteilung'], 'Sonderschicht · Abteilungen'),
      tipps: ['Schau auf die Rechtsform, nicht auf den Firmennamen.', 'Kapitalgesellschaften (GmbH, UG, AG) → B. Personengesellschaften und e. K. → A.', 'Vereine und Genossenschaften haben eigene Register.'],
      reflexion: { frage: 'Warum gehört die Mainblick GmbH & Co. KG nicht in Abteilung B, obwohl „GmbH“ im Namen steht?', muster: 'Maßgeblich ist die Rechtsform der Gesellschaft selbst. Das ist eine KG, also eine Personengesellschaft. Die GmbH ist nur ihre Komplementärin.' } },
    { id: 'UE2', titel: 'Der richtige Vermerk', lz: ['LZ4'],
      auftrag: 'Vier Eintragungen. Entsteht etwas mit der Eintragung – oder wird nur bekannt gemacht?',
      interaktion: uebungsSchicht(['uBohne', 'uDietz', 'uImker', 'uHahnGF'], ['abteilung', 'wirkung'], 'Sonderschicht · Vermerke'),
      tipps: ['Frag dich: Gab es das schon, bevor ich stemple?', 'Kapitalgesellschaften und freiwillige Kaufleute entstehen erst mit der Eintragung.', 'Großbetriebe, Prokura und neue Vorstände gibt es schon vorher – die Eintragung macht nur bekannt.'],
      reflexion: { frage: 'Herr Dietz und Herr Berg mit der Imkerei werden beide „e. K.“. Warum bekommen sie verschiedene Vermerke?', muster: 'Das Autohaus ist ein großer kaufmännischer Betrieb, Herr Dietz ist schon Kaufmann (deklaratorisch). Die kleine Imkerei wird erst durch die freiwillige Eintragung Kaufmann (konstitutiv).' } },
    { id: 'UE3', titel: 'Streit vor Gericht', lz: ['LZ5'],
      auftrag: 'Die Zivilrichterin fragt dich um Rat: Wer darf sich worauf verlassen?',
      interaktion: uebungsSchicht(['uWolf', 'uHahnPK', 'uHV'], ALLE_REGELN, 'Sonderschicht · Streitfälle'),
      tipps: ['Was steht im Register – und was nicht?', 'Eine Änderung, die nicht eingetragen ist, gilt gegenüber Gutgläubigen nicht.', 'Prokura: nach außen immer voll. Handlungsvollmacht: wird gar nicht eingetragen.'],
      reflexion: { frage: 'Warum ist es für einen Lieferanten klug, vor einem großen Auftrag einen Registerauszug zu holen?', muster: 'Er sieht, wer die Firma vertreten darf. Auf das, was im Register steht, darf er sich verlassen – Änderungen, die dort fehlen, gelten ihm gegenüber nicht.' } }
  ],

  nachweis: {
    dauer: '15 Minuten',
    gewichtA: 50,
    einleitung: 'Heute bin ich auf Fortbildung. <b>Du führst den Schalter allein</b> – ohne Dienstanweisung und ohne Rückmeldung. Ich schaue mir deine Stempel später an.',
    teilA: {
      titel: 'Deine erste Schicht allein',
      auftrag: 'Acht Vorgänge. Entscheide jeden so, wie es die Dienstanweisung verlangt.',
      interaktion: function (box) {
        var sch = schalter(box, { faelle: NACHWEIS_FAELLE, regeln: ALLE_REGELN, titel: 'Schicht ohne Direktorin', stadt: null, pruefung: true, ohneRegeln: true, klein: true,
          beiEnde: function (f, e, wurzel) { wurzel.innerHTML = '<div class="st-ende"><h3>Schicht beendet</h3><p>Alle Vorgänge sind gestempelt. Gib Teil A jetzt ab.</p></div>'; } });
        return {
          auswerten: function () {
            var erg = sch.ergebnisse(), aus = [];
            NACHWEIS_FAELLE.forEach(function (id) {
              var f = F[id], d = erg.filter(function (x) { return x.fall === id; })[0], name = LEUTE[f.wer].name;
              if (f.vermerk && (f.aktion === 'hra' || f.aktion === 'hrb')) {
                aus.push({ lz: f.lz, text: name + ': ' + (f.lz === 'LZ5' ? 'Prokura richtig eingetragen' : 'richtige Abteilung (' + f.aktion.toUpperCase() + ')'), ok: !!d && d.wahl === f.aktion });
                aus.push({ lz: 'LZ4', text: name + ': richtiger Vermerk (' + (f.vermerk === 'k' ? 'entsteht mit Eintragung' : 'wird bekannt gemacht') + ')', ok: !!d && d.wahl === f.aktion && d.vermerk === f.vermerk });
              } else aus.push({ lz: f.lz, text: name + ': richtig entschieden', ok: !!d && d.ok });
            });
            return aus;
          },
          loesen: function () { sch.loeseAlle(); }
        };
      }
    },
    teilB: { proLZ: 2 }
  },

  merkblatt: [
    { lz: 'LZ1', zeilen: [
      { text: 'Das Handelsregister führt das ___.', loesung: 'Amtsgericht (Registergericht)' },
      { text: 'Einsehen darf ___, ohne Begründung.', loesung: 'jeder' },
      { text: 'Anmeldungen kommen elektronisch und ___ über einen Notar.', loesung: 'öffentlich beglaubigt' }
    ], fehler: 'Eine E-Mail oder ein unterschriebener Brief reicht nicht.', beispiel: 'Frau Huber darf vor ihrer Bestellung den Auszug von Hartmann Elektro sehen.' },
    { lz: 'LZ2', zeilen: [
      { text: 'Abteilung A (HRA): e. K., ___, ___.', loesung: 'OHG, KG' },
      { text: 'Abteilung B (HRB): ___, UG, AG.', loesung: 'GmbH' }
    ], fehler: 'GmbH & Co. KG in B einordnen – sie ist eine KG, also A.', beispiel: 'Vereine → Vereinsregister, eG → Genossenschaftsregister.' },
    { lz: 'LZ3', zeilen: [
      { text: 'Eingetragen werden z. B. Firma, Sitz, Gegenstand, ___ und Vertretung.', loesung: 'Kapital' },
      { text: 'Nie eingetragen werden Umsatz, Gewinn, Mitarbeiterzahl und ___.', loesung: 'Handlungsvollmacht' }
    ], fehler: 'Geschäftszahlen gehören nicht ins Register.', beispiel: 'Hartmann Elektro: Gegenstand ja, Umsatz nein.' },
    { lz: 'LZ4', zeilen: [
      { text: 'Konstitutiv: Die Wirkung ___ mit der Eintragung.', loesung: 'entsteht' },
      { text: 'Deklaratorisch: Die Eintragung macht nur ___, was es schon gibt.', loesung: 'bekannt' }
    ], fehler: 'Jede Eintragung für konstitutiv halten.', beispiel: 'GmbH, AG, Kannkaufmann → konstitutiv. Istkaufmann, Prokura, neuer Geschäftsführer → deklaratorisch.', schema: 'Gab es das schon, bevor gestempelt wird? Ja → deklaratorisch. Nein → konstitutiv.' },
    { lz: 'LZ5', zeilen: [
      { text: 'Öffentlicher Glaube: Wer auf das Register vertraut, wird ___.', loesung: 'geschützt' },
      { text: 'Eine Prokura gilt nach außen immer im ___ Umfang.', loesung: 'vollen' }
    ], fehler: 'Interne Grenzen der Prokura gegenüber Lieferanten geltend machen.', beispiel: 'Frau Kraus stand noch im Register → Kernwerk muss Herrn Seidl zahlen.' }
  ],
  selbsttest: ['N4', 'N8', 'N12', 'N16', 'N20'],

  lernziele: [
    { id: 'LZ1', kurz: 'Zweck und Einsicht', text: 'Ich kann erklären, wozu es das Handelsregister gibt und wer hineinschauen darf.' },
    { id: 'LZ2', kurz: 'Abteilung A/B', text: 'Ich kann Unternehmen der Abteilung A oder B zuordnen oder erkennen, dass sie in ein anderes Register gehören.' },
    { id: 'LZ3', kurz: 'Inhalte', text: 'Ich kann angeben, welche Angaben zu einer Unternehmung im Handelsregister stehen und welche nicht.' },
    { id: 'LZ4', kurz: 'Wirkung', text: 'Ich kann bei einer Eintragung entscheiden, ob sie konstitutiv oder deklaratorisch wirkt.' },
    { id: 'LZ5', kurz: 'Öffentlicher Glaube, Prokura', text: 'Ich kann erklären, was „öffentlicher Glaube“ bedeutet, und Prokura und Handlungsvollmacht richtig einordnen.' }
  ],

  vorwissen: ['V1', 'V2', 'V3', 'V4', 'V5'],

  glossar: [
    { begriff: 'Handelsregister (HR)', erklaerung: 'Öffentliches Verzeichnis der Kaufleute eines Amtsgerichtsbezirks.', vorab: true },
    { begriff: 'Abteilung A (HRA)', erklaerung: 'Teil des HR für Einzelunternehmen und Personengesellschaften (e. K., OHG, KG).', vorab: true },
    { begriff: 'Abteilung B (HRB)', erklaerung: 'Teil des HR für Kapitalgesellschaften (GmbH, UG, AG).', vorab: true },
    { begriff: 'konstitutiv', erklaerung: '„Rechtsbegründend“: Erst durch die Eintragung entsteht die Rechtswirkung.', vorab: true },
    { begriff: 'deklaratorisch', erklaerung: '„Bekanntmachend“: Die Rechtswirkung gibt es schon. Die Eintragung macht sie nur öffentlich.', vorab: true },
    { begriff: 'Prokura', erklaerung: 'Weitreichende Vollmacht. Sie wird ins HR eingetragen.', vorab: true },
    { begriff: 'Handlungsvollmacht', erklaerung: 'Begrenzte Vollmacht für übliche Geschäfte. Sie wird nicht eingetragen.' },
    { begriff: 'öffentlicher Glaube', erklaerung: 'Man darf sich auf das HR verlassen. Nicht Eingetragenes kann Gutgläubigen nicht entgegengehalten werden.' },
    { begriff: 'Stammkapital / Grundkapital', erklaerung: 'Festgelegtes Kapital einer GmbH bzw. AG.' },
    { begriff: 'Kommanditist / Komplementär', erklaerung: 'Gesellschafter einer KG: beschränkt haftend (mit seiner Einlage) bzw. voll haftend.' },
    { begriff: 'Registergericht', erklaerung: 'Das Amtsgericht, das das HR führt.' },
    { begriff: 'öffentlich beglaubigt', erklaerung: 'Ein Notar bestätigt die Echtheit der Unterschrift. Die Anmeldung wird elektronisch eingereicht.' }
  ],

  /* FRAGEN-PLATZHALTER */
  fragen: [

// ===== Vorwissens-Check (eine je Lernziel) =====
{ id: 'V1', lz: 'LZ1', einsatz: ['vorwissen'], typ: 'mc',
  frage: 'Wer darf ins Handelsregister schauen?',
  optionen: [
    { text: 'Jeder', richtig: true },
    { text: 'Nur Kaufleute', feedback: 'Das HR ist öffentlich, auch Kunden, Lieferanten und Privatpersonen dürfen einsehen. Mehr dazu in Station 1.' },
    { text: 'Nur, wer ein berechtigtes Interesse nachweist', feedback: 'Ein Nachweis ist nicht nötig, die Einsicht steht jedem offen. Mehr dazu in Station 1.' }
  ],
  erklaerung: 'Das Handelsregister ist öffentlich: Jeder darf einsehen, ohne einen Grund zu nennen.' },
{ id: 'V2', lz: 'LZ2', einsatz: ['vorwissen'], typ: 'mc',
  frage: 'In welche Abteilung des Handelsregisters gehört eine KG?',
  optionen: [
    { text: 'Abteilung A', richtig: true },
    { text: 'Abteilung B', feedback: 'In B stehen Kapitalgesellschaften wie GmbH und AG. Die KG ist eine Personengesellschaft. Station 2 hilft.' },
    { text: 'In keine, nur Kapitalgesellschaften sind eingetragen', feedback: 'Auch Einzelunternehmen und Personengesellschaften stehen im HR, nämlich in Abteilung A. Station 2 hilft.' }
  ],
  erklaerung: 'Einzelunternehmen und Personengesellschaften (OHG, KG) stehen in Abteilung A.' },
{ id: 'V3', lz: 'LZ3', einsatz: ['vorwissen'], typ: 'mc',
  frage: 'Was steht bei einer GmbH nicht im Handelsregister?',
  optionen: [
    { text: 'Der Umsatz des letzten Jahres', richtig: true },
    { text: 'Das Stammkapital', feedback: 'Das Stammkapital steht im HR. Geschäftszahlen wie der Umsatz dagegen nicht. Station 2 hilft.' },
    { text: 'Der Name des Geschäftsführers', feedback: 'Der Geschäftsführer wird eingetragen. Nicht eingetragen werden Geschäftszahlen. Station 2 hilft.' }
  ],
  erklaerung: 'Im HR stehen Rechtsverhältnisse (Firma, Sitz, Kapital, Vertretung), keine Geschäftszahlen wie Umsatz oder Gewinn.' },
{ id: 'V4', lz: 'LZ4', einsatz: ['vorwissen'], typ: 'mc',
  frage: 'Wann entsteht eine GmbH rechtlich?',
  optionen: [
    { text: 'Mit der Eintragung ins Handelsregister', richtig: true },
    { text: 'Sobald der Gesellschaftsvertrag unterschrieben ist', feedback: 'Der Vertrag allein genügt nicht, die GmbH entsteht erst mit der Eintragung. Station 3 hilft.' },
    { text: 'Sobald das erste Geschäft gemacht wird', feedback: 'Der Geschäftsbeginn ist nicht entscheidend. Erst die Eintragung lässt die GmbH entstehen. Station 3 hilft.' }
  ],
  erklaerung: 'Die Eintragung wirkt hier konstitutiv: Ohne sie gibt es die GmbH als solche noch nicht.' },
{ id: 'V5', lz: 'LZ5', einsatz: ['vorwissen'], typ: 'mc',
  frage: 'Welche Vollmacht wird ins Handelsregister eingetragen?',
  optionen: [
    { text: 'Die Prokura', richtig: true },
    { text: 'Die Handlungsvollmacht', feedback: 'Handlungsvollmachten werden nicht eingetragen. Station 4 hilft.' },
    { text: 'Beide', feedback: 'Nur die Prokura wird eingetragen. Station 4 hilft.' }
  ],
  erklaerung: 'Die Prokura steht im HR, die Handlungsvollmacht nicht.' },

// ===== Station 1: Wozu das Handelsregister (LZ1) =====
{ id: 'C1', lz: 'LZ1', einsatz: ['check'], typ: 'mc',
  frage: 'Welche Stelle führt das Handelsregister?',
  optionen: [
    { text: 'Das Amtsgericht (Registergericht)', richtig: true },
    { text: 'Das Landgericht', feedback: 'Das Landgericht ist für größere Streitfälle zuständig, das HR führt das Amtsgericht.' },
    { text: 'Die Industrie- und Handelskammer', feedback: 'Die IHK berät und prüft Anmeldungen mit, führt das Register aber nicht. Das macht das Amtsgericht.' }
  ],
  erklaerung: 'Das Handelsregister wird beim zuständigen Amtsgericht geführt.' },
{ id: 'C2', lz: 'LZ1', einsatz: ['check'], typ: 'mc',
  frage: 'Wozu dient das Handelsregister?',
  optionen: [
    { text: 'Jeder kann sicher prüfen, mit wem er Geschäfte macht.', richtig: true },
    { text: 'Es zeigt, wie viel Gewinn ein Unternehmen macht.', feedback: 'Geschäftszahlen stehen nicht im HR. Es geht um die rechtlichen Verhältnisse. Siehe Station 1.' },
    { text: 'Das Finanzamt berechnet damit die Steuern.', feedback: 'Das HR dient der Rechtssicherheit im Geschäftsverkehr, nicht der Steuerberechnung. Siehe Station 1.' }
  ],
  erklaerung: 'Das HR liefert einen zuverlässigen Nachweis der rechtlichen Verhältnisse von Kaufleuten und schafft so Rechtssicherheit.' },
{ id: 'C3', lz: 'LZ1', einsatz: ['check'], typ: 'mc',
  frage: 'Wie muss eine Firma eine Änderung zum Handelsregister anmelden?',
  optionen: [
    { text: 'Elektronisch, in öffentlich beglaubigter Form', richtig: true },
    { text: 'Formlos per E-Mail an das Gericht', feedback: 'Das Gericht muss sich auf die Echtheit verlassen können, deshalb ist die Form vorgeschrieben.' },
    { text: 'Notariell beurkundet auf Papier', feedback: 'Beurkundung ist nicht nötig, öffentliche Beglaubigung und elektronische Einreichung genügen.' }
  ],
  erklaerung: 'Anmeldungen und Änderungen werden elektronisch in öffentlich beglaubigter Form eingereicht.' },

// ===== Station 2: Abteilung A oder B (LZ2, LZ3) =====
{ id: 'C4', lz: 'LZ2', einsatz: ['check'], typ: 'zuordnen',
  frage: 'Ordne jede Rechtsform dem passenden Register zu.',
  paare: [
    { links: 'Ostwind Papier e. K.', rechts: 'HR Abteilung A' },
    { links: 'Lindgrün Verpackung GmbH', rechts: 'HR Abteilung B' },
    { links: 'Tennisclub Rot-Weiß e. V.', rechts: 'Vereinsregister' }
  ],
  feedbackFalsch: 'Einzelunternehmen und Personengesellschaften → A, Kapitalgesellschaften → B, Vereine haben ein eigenes Register.',
  erklaerung: 'e. K. ist ein Einzelunternehmen (A), die GmbH eine Kapitalgesellschaft (B). Eingetragene Vereine stehen im Vereinsregister, nicht im HR.' },
{ id: 'C5', lz: 'LZ3', einsatz: ['check'], typ: 'mc',
  frage: 'Welche Angaben stehen bei einer GmbH im Handelsregister? Kreuze alle richtigen an.',
  optionen: [
    { text: 'Stammkapital', richtig: true },
    { text: 'Geschäftsführer', richtig: true },
    { text: 'Gegenstand des Unternehmens', richtig: true },
    { text: 'Umsatz des Vorjahres', feedback: 'Der Umsatz ist eine Geschäftszahl und steht nicht im HR.' },
    { text: 'Gewinn des Vorjahres', feedback: 'Der Gewinn steht nicht im HR. Eingetragen sind rechtliche Verhältnisse.' }
  ],
  erklaerung: 'Bei der GmbH werden Firma, Sitz, Gegenstand, Stammkapital und Geschäftsführer eingetragen, keine Geschäftszahlen.' },
{ id: 'C6', lz: 'LZ3', einsatz: ['check'], typ: 'mc',
  frage: 'Was gilt für die Kommanditisten einer KG?',
  optionen: [
    { text: 'Sie werden mit der Höhe ihrer Einlage eingetragen.', richtig: true },
    { text: 'Sie werden nicht eingetragen, nur die Komplementäre.', feedback: 'Beide Gesellschafterarten stehen im HR. Bei den Kommanditisten zusätzlich die Einlage.' },
    { text: 'Ihre Einlage steht nicht im Register.', feedback: 'Die Einlage steht im HR, sie zeigt, bis zu welcher Höhe die Kommanditisten haften.' }
  ],
  erklaerung: 'Die Einlage der Kommanditisten steht im HR, weil sie ihre Haftung begrenzt und Dritte das wissen sollen.' },

// ===== Station 3: konstitutiv/deklaratorisch (LZ4) =====
{ id: 'C7', lz: 'LZ4', einsatz: ['check'], typ: 'mc',
  frage: 'Bei welchen Vorgängen entsteht die Rechtswirkung erst durch die Eintragung (konstitutiv)? Kreuze alle richtigen an.',
  optionen: [
    { text: 'Gründung einer AG', richtig: true },
    { text: 'Kaufmannseigenschaft eines Kleingewerbetreibenden, der sich eintragen lässt', richtig: true },
    { text: 'Kaufmannseigenschaft eines großen Handelsbetriebs (Istkaufmann)', feedback: 'Ein Betrieb mit kaufmännischem Umfang ist schon vor der Eintragung Kaufmann. Die Eintragung macht das nur bekannt.' },
    { text: 'Erteilung einer Prokura', feedback: 'Die Prokura gilt schon, wenn sie erteilt wird. Die Eintragung macht sie nur bekannt.' }
  ],
  erklaerung: 'Konstitutiv wirkt die Eintragung bei der Entstehung von Kapitalgesellschaften und bei der Kannkaufmannseigenschaft.' },
{ id: 'C8', lz: 'LZ4', einsatz: ['check'], typ: 'mc',
  frage: 'Der Großhandel Weber & Sohn KG (Istkaufmann) wird ins HR eingetragen. Wie wirkt das?',
  optionen: [
    { text: 'Deklaratorisch: Die Rechtslage besteht schon, die Eintragung macht sie bekannt.', richtig: true },
    { text: 'Konstitutiv: Erst jetzt ist die Firma ein Kaufmann.', feedback: 'Wer ein Handelsgewerbe in kaufmännischem Umfang betreibt, ist schon vorher Kaufmann. Siehe Station 3.' },
    { text: 'Gar nicht, die Eintragung hat keine Wirkung.', feedback: 'Sie macht die Verhältnisse öffentlich und schafft so Rechtssicherheit. Siehe Station 3.' }
  ],
  erklaerung: 'Bei Istkaufleuten wirkt die Eintragung deklaratorisch.' },
{ id: 'C9', lz: 'LZ4', einsatz: ['check'], typ: 'mc',
  frage: 'Zwei Gründer handeln im Namen ihrer GmbH, bevor sie im HR steht. Wer haftet?',
  optionen: [
    { text: 'Die Handelnden persönlich und solidarisch', richtig: true },
    { text: 'Niemand, die GmbH gibt es ja noch nicht.', feedback: 'Genau weil es die GmbH noch nicht gibt, haften die Handelnden selbst.' },
    { text: 'Nur mit ihrer Einlage', feedback: 'Die Beschränkung auf die Einlage gilt erst nach der Eintragung. Vorher haften sie mit ihrem Privatvermögen.' }
  ],
  erklaerung: 'Vor der Eintragung gibt es die GmbH als solche nicht, die Handelnden haften persönlich und solidarisch.' },

// ===== Station 4: Prokura, öffentlicher Glaube (LZ5) =====
{ id: 'C10', lz: 'LZ5', einsatz: ['check'], typ: 'mc',
  frage: 'Frau Brandt hat Handlungsvollmacht, Herr Okafor Prokura. Was steht im HR?',
  optionen: [
    { text: 'Nur die Prokura von Herrn Okafor', richtig: true },
    { text: 'Beide Vollmachten', feedback: 'Handlungsvollmachten werden nicht eingetragen.' },
    { text: 'Keine von beiden', feedback: 'Die Prokura wird eingetragen, damit Geschäftspartner sie prüfen können.' }
  ],
  erklaerung: 'Prokura wird eingetragen, die Handlungsvollmacht nicht.' },
{ id: 'C11', lz: 'LZ5', einsatz: ['check'], typ: 'mc',
  frage: 'Die Firma hat Herrn Okafors Prokura intern auf 10 000 € begrenzt. Im HR steht das nicht. Er schließt für 50 000 € ab.',
  optionen: [
    { text: 'Der Vertrag gilt, die interne Beschränkung ist Dritten gegenüber unwirksam.', richtig: true },
    { text: 'Der Vertrag gilt nicht, weil er die Grenze überschreitet.', feedback: 'Die Prokura ist nach außen unbeschränkbar. Interne Grenzen binden Dritte nicht.' },
    { text: 'Der Vertrag gilt, wenn die Beschränkung ins HR eingetragen wird.', feedback: 'Auch eine Eintragung würde die Beschränkung gegenüber Dritten nicht wirksam machen.' }
  ],
  erklaerung: 'Eine Beschränkung des Umfangs der Prokura ist Dritten gegenüber unwirksam.' },
{ id: 'C12', lz: 'LZ5', einsatz: ['check'], typ: 'mc',
  frage: 'Was bedeutet der öffentliche Glaube des Handelsregisters?',
  optionen: [
    { text: 'Was nicht eingetragen ist, kann gutgläubigen Dritten nicht entgegengehalten werden.', richtig: true },
    { text: 'Was eingetragen ist, wird notariell beurkundet.', feedback: 'Die Eintragung ist keine Beurkundung. Es geht um den Schutz dessen, der sich auf das Register verlässt.' },
    { text: 'Kaufleute müssen alle Einträge auf Richtigkeit prüfen.', feedback: 'Eine solche Pflicht gibt es nicht. Wer sich auf das HR verlässt, wird geschützt.' }
  ],
  erklaerung: 'Wer gutgläubig auf das Register vertraut, wird geschützt: Nicht eingetragene Tatsachen kann man ihm nicht entgegenhalten.' },

// ===== Übungen =====
{ id: 'U1', lz: 'LZ2', einsatz: ['uebung'], typ: 'mc',
  frage: 'Die Rothaupt & Söhne OHG liefert Metallbau. In welcher Abteilung steht sie und warum?',
  optionen: [
    { text: 'Abteilung A, weil die OHG eine Personengesellschaft ist.', richtig: true },
    { text: 'Abteilung B, weil sie mehrere Gesellschafter hat.', feedback: 'Die Zahl der Gesellschafter entscheidet nicht. Maßgeblich ist, ob es sich um eine Personen- oder Kapitalgesellschaft handelt.' },
    { text: 'Gar nicht, weil sie ein Handwerksbetrieb ist.', feedback: 'Auch Handwerksbetriebe in Form einer OHG sind eingetragen.' }
  ],
  erklaerung: 'OHG und KG sind Personengesellschaften und stehen in Abteilung A.' },
{ id: 'U2', lz: 'LZ4', einsatz: ['uebung'], typ: 'mc',
  frage: 'Zwei Freundinnen schließen den Vertrag für ihre UG am 1. März, die Eintragung erfolgt am 20. März. Ab wann gibt es die UG?',
  optionen: [
    { text: 'Ab dem 20. März', richtig: true },
    { text: 'Ab dem 1. März', feedback: 'Der Vertrag allein reicht nicht. Die UG entsteht erst mit der Eintragung.' },
    { text: 'Ab dem ersten Verkauf', feedback: 'Der Geschäftsbeginn ist dafür nicht maßgeblich.' }
  ],
  erklaerung: 'Bei Kapitalgesellschaften wirkt die Eintragung konstitutiv.' },
{ id: 'U3', lz: 'LZ5', einsatz: ['uebung'], typ: 'mc',
  frage: 'Im Auszug steht „Gesamtprokura gemeinsam mit einem Geschäftsführer“. Der Prokurist unterschreibt allein einen Großauftrag. Was tust du?',
  optionen: [
    { text: 'Zweite Unterschrift verlangen, denn die Prokura gilt nur gemeinsam.', richtig: true },
    { text: 'Den Vertrag annehmen, denn Prokuristen dürfen alles.', feedback: 'Bei Gesamtprokura wirken zwei Personen zusammen. Das steht im HR.' },
    { text: 'Nachfragen, ob die Handlungsvollmacht reicht.', feedback: 'Hier geht es um eine Prokura, nicht um eine Handlungsvollmacht.' }
  ],
  erklaerung: 'Die Art der Vertretung (einzeln oder gemeinsam) steht im HR und ist bindend.' },

// ===== Nachweis Teil B: LZ1 =====
{ id: 'N1', lz: 'LZ1', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Welche Aussagen zum Handelsregister stimmen? Kreuze alle richtigen an.',
  optionen: [
    { text: 'Es wird vom Amtsgericht geführt.', richtig: true },
    { text: 'Jeder darf einsehen.', richtig: true },
    { text: 'Es dient der Rechtssicherheit im Geschäftsverkehr.', richtig: true },
    { text: 'Es wird vom Landgericht geführt.', feedback: 'Zuständig ist das Amtsgericht.' },
    { text: 'Nur mit berechtigtem Interesse darf man einsehen.', feedback: 'Die Einsicht ist für jeden möglich.' }
  ],
  erklaerung: 'Das HR ist ein öffentliches Verzeichnis beim Amtsgericht und soll Rechtssicherheit schaffen.' },
{ id: 'N2', lz: 'LZ1', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Ein Praktikant meint: „Den HR-Auszug unseres Lieferanten dürfen nur die Gesellschafter des Lieferanten sehen.“ Was antwortest du?',
  optionen: [
    { text: 'Falsch, jeder darf ihn abrufen.', richtig: true },
    { text: 'Richtig, aus Datenschutzgründen.', feedback: 'Das HR ist bewusst öffentlich, damit sich Geschäftspartner informieren können.' },
    { text: 'Richtig, aber auch Kunden dürfen ihn sehen.', feedback: 'Der Kreis ist nicht begrenzt, es darf jeder einsehen.' }
  ],
  erklaerung: 'Öffentlichkeit ist Zweck des Registers: Jeder darf einsehen.' },
{ id: 'N3', lz: 'LZ1', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Eine GmbH meldet einen neuen Geschäftsführer an. Welche Aussage ist richtig?',
  optionen: [
    { text: 'Die Anmeldung erfolgt elektronisch in öffentlich beglaubigter Form beim Registergericht.', richtig: true },
    { text: 'Die Anmeldung muss notariell beurkundet werden.', feedback: 'Öffentliche Beglaubigung genügt, eine Beurkundung ist nicht verlangt.' },
    { text: 'Die Anmeldung erfolgt formlos beim Landgericht.', feedback: 'Zuständig ist das Registergericht beim Amtsgericht, und die Form ist vorgeschrieben.' }
  ],
  erklaerung: 'Für Anmeldungen gilt: elektronisch, öffentlich beglaubigt, beim Registergericht.' },
{ id: 'N4', lz: 'LZ1', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Welcher Nutzen ergibt sich für den Einkauf, wenn er vor einem Vertrag den HR-Auszug prüft?',
  optionen: [
    { text: 'Er weiß verlässlich, mit welcher Rechtsform und mit wem er es zu tun hat.', richtig: true },
    { text: 'Er erfährt den Umsatz und kann Preise verhandeln.', feedback: 'Geschäftszahlen stehen nicht im HR.' },
    { text: 'Er kann dem Lieferanten Weisungen erteilen.', feedback: 'Das HR gibt nur Auskunft, es begründet keine Rechte gegenüber dem Lieferanten.' }
  ],
  erklaerung: 'Der Auszug zeigt rechtliche Verhältnisse wie Rechtsform, Vertretung und Haftung.' },

// ===== Nachweis Teil B: LZ2 =====
{ id: 'N5', lz: 'LZ2', einsatz: ['nachweis'], typ: 'zuordnen',
  frage: 'Ordne die Unternehmen dem richtigen Register zu.',
  paare: [
    { links: 'Brandt Elektrik OHG', rechts: 'HR Abteilung A' },
    { links: 'Möwe Verpackung UG (haftungsbeschränkt)', rechts: 'HR Abteilung B' },
    { links: 'Regio Einkauf eG', rechts: 'Genossenschaftsregister' },
    { links: 'Tennisclub Rot-Weiß e. V.', rechts: 'Vereinsregister' }
  ],
  feedbackFalsch: 'Personengesellschaften und Einzelunternehmen → A. GmbH, UG, AG → B. Genossenschaft und Verein haben eigene Register.',
  erklaerung: 'OHG → A, UG → B. Genossenschaften und eingetragene Vereine stehen nicht im Handelsregister.' },
{ id: 'N6', lz: 'LZ2', einsatz: ['nachweis'], typ: 'mc',
  frage: 'In welche Abteilung gehört die Wiesental Möbel GmbH & Co. KG?',
  optionen: [
    { text: 'Abteilung A, weil sie eine KG ist.', richtig: true },
    { text: 'Abteilung B, weil eine GmbH beteiligt ist.', feedback: 'Die Rechtsform ist KG, also eine Personengesellschaft. Die GmbH ist nur Komplementärin und steht mit eigenem Eintrag in B.' },
    { text: 'In beide Abteilungen gleichzeitig.', feedback: 'Die KG steht in A. Die beteiligte GmbH hat ihren eigenen Eintrag in B, das ist ein anderes Unternehmen.' }
  ],
  erklaerung: 'Maßgeblich ist die Rechtsform der Gesellschaft selbst. Die KG steht in Abteilung A.' },
{ id: 'N7', lz: 'LZ2', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Welche Unternehmen stehen in Abteilung B? Kreuze alle richtigen an.',
  optionen: [
    { text: 'Nord Logistik GmbH', richtig: true },
    { text: 'Küstenwerk UG (haftungsbeschränkt)', richtig: true },
    { text: 'Südwind AG', richtig: true },
    { text: 'Feldmann & Partner OHG', feedback: 'Die OHG ist eine Personengesellschaft und steht in Abteilung A.' },
    { text: 'Bäckerei Hoff e. K.', feedback: 'Der eingetragene Kaufmann (e. K.) steht in Abteilung A.' }
  ],
  erklaerung: 'In Abteilung B stehen Kapitalgesellschaften: GmbH, UG und AG.' },
{ id: 'N8', lz: 'LZ2', einsatz: ['nachweis'], typ: 'text',
  frage: 'Der Bürostuhl-Hersteller Kern & Lenz KG wird eingetragen. In welche Abteilung? Antworte mit A oder B.',
  akzeptiert: ['A', 'HRA', 'Abteilung A', 'Abt. A'],
  typisch: [
    { antwort: 'B', feedback: 'B ist für Kapitalgesellschaften. Die KG ist eine Personengesellschaft und gehört in A.' },
    { antwort: 'HRB', feedback: 'HRB ist für Kapitalgesellschaften. Die KG ist eine Personengesellschaft und gehört in A.' }
  ],
  erklaerung: 'Die KG ist eine Personengesellschaft, also Abteilung A.' },

// ===== Nachweis Teil B: LZ3 =====
{ id: 'N9', lz: 'LZ3', einsatz: ['nachweis'], typ: 'hotspot',
  frage: 'Hier ist ein Auszug der Nordstern Spedition GmbH. Tippe auf die Zeile, die <b>nicht</b> im Handelsregister steht.',
  svg: '<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="HR-Auszug"><rect x="2" y="2" width="356" height="196" rx="6" fill="none" stroke="currentColor"/><text x="14" y="26" font-size="13" font-weight="bold" fill="currentColor">Amtsgericht – HRB 12345</text><text x="14" y="58" font-size="13" fill="currentColor">Firma: Nordstern Spedition GmbH</text><text x="14" y="86" font-size="13" fill="currentColor">Sitz: Hamburg</text><text x="14" y="114" font-size="13" fill="currentColor">Stammkapital: 25.000 €</text><text x="14" y="142" font-size="13" fill="currentColor">Geschäftsführer: Lena Voss</text><text x="14" y="170" font-size="13" fill="currentColor">Umsatz Vorjahr: 3,2 Mio. €</text></svg>',
  bereiche: [
    { x: 6, y: 44, w: 348, h: 20, label: 'Firma', feedback: 'Die Firma steht im HR.' },
    { x: 6, y: 72, w: 348, h: 20, label: 'Sitz', feedback: 'Der Sitz steht im HR.' },
    { x: 6, y: 100, w: 348, h: 20, label: 'Stammkapital', feedback: 'Das Stammkapital der GmbH steht im HR.' },
    { x: 6, y: 128, w: 348, h: 20, label: 'Geschäftsführer', feedback: 'Der Geschäftsführer wird eingetragen.' },
    { x: 6, y: 156, w: 348, h: 20, label: 'Umsatz Vorjahr', richtig: true, feedback: 'Richtig, Geschäftszahlen stehen nicht im HR.' }
  ],
  erklaerung: 'Im HR stehen Firma, Sitz, Kapital und Vertretung, aber keine Geschäftszahlen wie der Umsatz.' },
{ id: 'N10', lz: 'LZ3', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Welche Angaben werden bei einer Aktiengesellschaft eingetragen? Kreuze alle richtigen an.',
  optionen: [
    { text: 'Grundkapital', richtig: true },
    { text: 'Vorstand', richtig: true },
    { text: 'Prokuristen und Art der Vertretung', richtig: true },
    { text: 'Gewinn des Vorjahres', feedback: 'Der Gewinn ist keine rechtliche Angabe und steht nicht im HR.' },
    { text: 'Liste aller Kunden', feedback: 'Kunden stehen nicht im HR, nur rechtliche Verhältnisse des Unternehmens.' }
  ],
  erklaerung: 'Bei der AG stehen Firma, Sitz, Gegenstand, Grundkapital, Vorstand und ggf. Prokuristen im HR.' },
{ id: 'N11', lz: 'LZ3', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Du liest den Auszug einer KG. Woran erkennst du, bis zu welcher Höhe ein Kommanditist haftet?',
  optionen: [
    { text: 'An der eingetragenen Einlage des Kommanditisten', richtig: true },
    { text: 'An den Umsatzzahlen der KG', feedback: 'Umsatzzahlen stehen nicht im HR und bestimmen die Haftung nicht.' },
    { text: 'Gar nicht, die Einlage steht nicht im HR.', feedback: 'Die Einlage der Kommanditisten ist eintragungspflichtig.' }
  ],
  erklaerung: 'Bei der KG steht die Einlage der Kommanditisten im HR, so ist ihre Haftungsgrenze erkennbar.' },
{ id: 'N12', lz: 'LZ3', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Im Auszug einer GmbH steht eine Prokura. Was kannst du daraus sicher ablesen?',
  optionen: [
    { text: 'Wer Prokurist ist und ob er allein oder nur gemeinsam vertritt.', richtig: true },
    { text: 'Wie viel der Prokurist verdient.', feedback: 'Gehälter stehen nicht im HR.' },
    { text: 'Welche Geschäfte intern erlaubt sind.', feedback: 'Interne Grenzen stehen nicht im HR und wirken Dritten gegenüber nicht.' }
  ],
  erklaerung: 'Eingetragen werden die Person und die Art der Vertretung (einzeln oder gemeinsam).' },

// ===== Nachweis Teil B: LZ4 =====
{ id: 'N13', lz: 'LZ4', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Die Eintragung einer GmbH ins HR wirkt …',
  optionen: [
    { text: 'konstitutiv: Erst durch sie entsteht die GmbH.', richtig: true },
    { text: 'deklaratorisch: Die GmbH gibt es schon, die Eintragung macht sie bekannt.', feedback: 'Das gilt für Istkaufleute. Eine GmbH entsteht erst mit der Eintragung.' },
    { text: 'weder noch, sie ist nur eine Formsache.', feedback: 'Ohne Eintragung gibt es die GmbH als solche nicht, das ist mehr als eine Formsache.' }
  ],
  erklaerung: 'Die Eintragung begründet hier die Rechtswirkung (konstitutiv).' },
{ id: 'N14', lz: 'LZ4', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Die Hartmann Textil OHG betreibt seit Jahren einen großen Handel und lässt sich jetzt eintragen. Welche Aussage stimmt?',
  optionen: [
    { text: 'Sie war schon vorher Kaufmann, die Eintragung ist deklaratorisch.', richtig: true },
    { text: 'Sie wird erst durch die Eintragung Kaufmann.', feedback: 'Bei einem Betrieb in kaufmännischem Umfang besteht die Kaufmannseigenschaft schon vorher.' },
    { text: 'Ohne Eintragung durfte sie keine Verträge schließen.', feedback: 'Verträge sind auch ohne Eintragung möglich, die Eintragung macht die Verhältnisse nur bekannt.' }
  ],
  erklaerung: 'Bei einem Istkaufmann wirkt die Eintragung nur bekanntmachend.' },
{ id: 'N15', lz: 'LZ4', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Welche Eintragungen wirken deklaratorisch? Kreuze alle richtigen an.',
  optionen: [
    { text: 'Eintragung eines Istkaufmanns', richtig: true },
    { text: 'Eintragung einer Prokura', richtig: true },
    { text: 'Gründung einer GmbH', feedback: 'Die GmbH entsteht erst mit der Eintragung, das ist konstitutiv.' },
    { text: 'Eintragung eines Kleingewerbetreibenden als Kannkaufmann', feedback: 'Hier entsteht die Kaufmannseigenschaft erst durch die Eintragung, das ist konstitutiv.' }
  ],
  erklaerung: 'Deklaratorisch ist die Eintragung dort, wo die Rechtswirkung schon vorher eingetreten ist.' },
{ id: 'N16', lz: 'LZ4', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Sandra Hoff betreibt eine kleine Näherei und lässt sie als „Nähstudio Hoff e. K.“ eintragen. Welche Aussage ist richtig?',
  optionen: [
    { text: 'Die Eintragung macht sie erst zur Kauffrau (konstitutiv).', richtig: true },
    { text: 'Sie war schon Kauffrau, die Eintragung ist deklaratorisch.', feedback: 'Ein Kleingewerbe ist kein Handelsgewerbe in kaufmännischem Umfang. Die Kaufmannseigenschaft entsteht hier erst durch die Eintragung.' },
    { text: 'Kleingewerbe können nicht eingetragen werden.', feedback: 'Sie können sich freiwillig eintragen lassen (Kannkaufmann).' }
  ],
  erklaerung: 'Wer ein Kleingewerbe betreibt, wird durch die Eintragung zum Kaufmann (Kannkaufmann), die Eintragung wirkt konstitutiv.' },

// ===== Nachweis Teil B: LZ5 =====
{ id: 'N17', lz: 'LZ5', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Welche Aussage zu Prokura und Handlungsvollmacht stimmt?',
  optionen: [
    { text: 'Die Prokura wird eingetragen, die Handlungsvollmacht nicht.', richtig: true },
    { text: 'Beide werden in Abteilung A eingetragen.', feedback: 'Handlungsvollmachten werden gar nicht eingetragen, und die Prokura steht bei der jeweiligen Gesellschaft.' },
    { text: 'Die Prokura entsteht erst mit der Eintragung.', feedback: 'Die Prokura gilt schon mit ihrer Erteilung, die Eintragung ist nur bekanntmachend.' }
  ],
  erklaerung: 'Nur die Prokura wird ins HR eingetragen, und zwar deklaratorisch.' },
{ id: 'N18', lz: 'LZ5', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Ein Prokurist hat intern nur Vollmacht bis 5 000 €, im HR steht keine Beschränkung. Er kauft für 20 000 € bei uns Ware. Was gilt?',
  optionen: [
    { text: 'Der Kauf gilt, die interne Beschränkung ist uns gegenüber unwirksam.', richtig: true },
    { text: 'Der Kauf gilt nicht, weil er die Grenze überschreitet.', feedback: 'Die Prokura ist nach außen nicht beschränkbar.' },
    { text: 'Der Kauf gilt nur, wenn wir nachweisen, dass wir die Grenze nicht kannten.', feedback: 'Auf Gutgläubigkeit kommt es hier nicht an, die Beschränkung wirkt Dritten gegenüber nie.' }
  ],
  erklaerung: 'Eine Beschränkung des Umfangs der Prokura ist Dritten gegenüber unwirksam.' },
{ id: 'N19', lz: 'LZ5', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Eine GmbH hat ihren Geschäftsführer gewechselt, die Änderung steht noch nicht im HR. Der alte Geschäftsführer schließt noch einen Vertrag mit uns, wir wussten vom Wechsel nichts. Was gilt?',
  optionen: [
    { text: 'Die GmbH kann uns den Wechsel nicht entgegenhalten, weil wir gutgläubig waren.', richtig: true },
    { text: 'Der Vertrag ist unwirksam, weil der Geschäftsführer nicht mehr im Amt ist.', feedback: 'Der öffentliche Glaube schützt uns, denn die Änderung war nicht eingetragen.' },
    { text: 'Wir hätten den Wechsel selbst prüfen müssen, sonst gilt der Vertrag nicht.', feedback: 'Es gibt keine Pflicht, laufend zu prüfen. Wer auf das HR vertraut, wird geschützt.' }
  ],
  erklaerung: 'Nicht eingetragene Tatsachen können gutgläubigen Dritten nicht entgegengehalten werden (öffentlicher Glaube).' },
{ id: 'N20', lz: 'LZ5', einsatz: ['nachweis'], typ: 'mc',
  frage: 'Eine Mitarbeiterin mit Handlungsvollmacht unterschreibt für ihre Firma. Welche Aussage ist richtig?',
  optionen: [
    { text: 'Sie ist nicht im HR eingetragen, wir müssen ihren Umfang bei Zweifeln erfragen.', richtig: true },
    { text: 'Sie ist in Abteilung A eingetragen.', feedback: 'Handlungsvollmachten werden nicht ins HR eingetragen.' },
    { text: 'Ihre Vollmacht gilt erst mit Eintragung.', feedback: 'Die Handlungsvollmacht gilt ohne jede Eintragung.' }
  ],
  erklaerung: 'Handlungsvollmachten werden nicht eingetragen, ihr Umfang ist aus dem HR nicht ablesbar.' }
]
};
