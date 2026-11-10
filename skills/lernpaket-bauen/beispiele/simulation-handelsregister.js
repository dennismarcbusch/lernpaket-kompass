/* =====================================================================
   BEISPIEL Simulationsmodus (Lernpaket-Kompass, Form A „Simulation“):
   „Partner-Check“ – das Handelsregister am Arbeitsplatz im Einkauf.
   Ein Arbeitsgegenstand trägt das ganze Paket: das nachgebaute Registerportal
   (oben) und die Prüfliste für neue Geschäftspartner (unten). Kapitel sind
   Folgen kleiner Schritte am Gegenstand; Üben, Selbstüberprüfung und Tafelbild
   nutzen denselben Gegenstand mit neuen Firmen. Alle Firmen, Personen, Registernummern und das
   Portal sind erfunden bzw. nachgebaut (Übungsversion).
   Zum Nachschlagen: In einem echten Paket ersetzt diese Datei js/inhalt.js.
   ===================================================================== */

/* ---------- Erfundene Registerdaten ---------- */
// art: 'HRA' | 'HRB' | 'VR' | 'GnR'; vertretung: Zeilen im Abdruck; unterschrift: Antwortmöglichkeiten der Prüfliste
var FIRMEN = {
  hartmann: { firma: 'Hartmann Elektro GmbH', art: 'HRB', nr: 'HRB 7351', gericht: 'Amtsgericht Bamberg', sitz: 'Bamberg', gegenstand: 'Großhandel mit Elektroinstallationsmaterial',
    kapital: 'Stammkapital: 50.000,00 EUR', vertretung: 'Ist ein Geschäftsführer bestellt, vertritt er allein.<br><b>Geschäftsführer: Klaus Hartmann, Bamberg</b>',
    prokura: 'Einzelprokura: Jana Weiß, Hallstadt', datum: '14.03.2024',
    unterschrift: ['Klaus Hartmann und Jana Weiß', 'nur Klaus Hartmann', 'nur Jana Weiß', 'Peter Lang (Vertriebsleiter)'], richtig: 'Klaus Hartmann und Jana Weiß' },
  ostwind: { firma: 'Ostwind Papier e. K.', art: 'HRA', nr: 'HRA 2289', gericht: 'Amtsgericht Bamberg', sitz: 'Forchheim', gegenstand: 'Handel mit Papier- und Schreibwaren',
    kapital: '–', vertretung: 'Die Inhaberin vertritt allein.<br><b>Inhaberin: Ayşe Kaya, Forchheim</b>', prokura: '–', datum: '02.09.2023',
    unterschrift: ['Ayşe Kaya (Inhaberin)', 'jeder Mitarbeiter im Verkauf', 'nur ein Prokurist'], richtig: 'Ayşe Kaya (Inhaberin)' },
  seidl: { firma: 'Seidl & Roth KG', art: 'HRA', nr: 'HRA 1187', gericht: 'Amtsgericht Coburg', sitz: 'Lichtenfels', gegenstand: 'Herstellung von Korbmöbeln',
    kapital: 'Kommanditistin: Nina Roth, Bamberg, Einlage 20.000,00 EUR', vertretung: 'Jeder persönlich haftende Gesellschafter vertritt allein.<br><b>Persönlich haftender Gesellschafter: Bernd Seidl, Lichtenfels</b>',
    prokura: '<s>Prokura: Karl Meinel, Coburg</s> – Prokura erloschen (eingetragen am 10.06.2025)', datum: '10.06.2025',
    unterschrift: ['nur Bernd Seidl', 'Bernd Seidl und Nina Roth', 'Bernd Seidl und Karl Meinel', 'alle drei'], richtig: 'nur Bernd Seidl' },
  mainblick: { firma: 'Kulturverein Mainblick e. V.', art: 'VR', nr: 'VR 412', gericht: 'Amtsgericht Coburg', sitz: 'Lichtenfels', gegenstand: 'Förderung von Kunst und Kultur',
    kapital: '–', vertretung: 'Vorstand: Lena Grün (1. Vorsitzende)', prokura: '–', datum: '21.01.2022',
    unterschrift: ['Lena Grün (Vorstand)', 'jedes Vereinsmitglied'], richtig: 'Lena Grün (Vorstand)' },
  // für Üben und Selbstüberprüfung (neue Fälle mit demselben Gegenstand)
  brunner: { firma: 'Brunner Backwaren AG', art: 'HRB', nr: 'HRB 2044', gericht: 'Amtsgericht Coburg', sitz: 'Bad Staffelstein', gegenstand: 'Herstellung und Vertrieb von Backwaren',
    kapital: 'Grundkapital: 120.000,00 EUR', vertretung: 'Der Vorstand vertritt.<br><b>Vorstand: Günter Fischer, Coburg</b>', prokura: '–', datum: '05.05.2025',
    unterschrift: ['Günter Fischer (Vorstand)', 'jeder Aktionär'], richtig: 'Günter Fischer (Vorstand)' },
  lindgruen: { firma: 'Lindgrün Verpackung UG (haftungsbeschränkt)', art: 'HRB', nr: 'HRB 8120', gericht: 'Amtsgericht Bamberg', sitz: 'Bamberg', gegenstand: 'Herstellung von Verpackungen aus Recyclingpapier',
    kapital: 'Stammkapital: 1.000,00 EUR', vertretung: '<b>Geschäftsführerin: Sabine Kraus, Bamberg</b>', prokura: '–', datum: '30.08.2025',
    unterschrift: ['Sabine Kraus (Geschäftsführerin)', 'niemand'], richtig: 'Sabine Kraus (Geschäftsführerin)' },
  regio: { firma: 'Regio Einkauf eG', art: 'GnR', nr: 'GnR 61', gericht: 'Amtsgericht Bamberg', sitz: 'Bamberg', gegenstand: 'Gemeinsamer Einkauf für Handwerksbetriebe',
    kapital: '–', vertretung: 'Vorstand: Ole Jansen, Mira Lenz (gemeinsam)', prokura: '–', datum: '12.02.2024',
    unterschrift: ['Ole Jansen und Mira Lenz gemeinsam', 'jedes Mitglied'], richtig: 'Ole Jansen und Mira Lenz gemeinsam' },
  wiesental: { firma: 'Wiesental Möbel GmbH & Co. KG', art: 'HRA', nr: 'HRA 3302', gericht: 'Amtsgericht Coburg', sitz: 'Michelau', gegenstand: 'Handel mit Polstermöbeln',
    kapital: 'Kommanditist: Max Nordmann, Michelau, Einlage 50.000,00 EUR', vertretung: '<b>Persönlich haftende Gesellschafterin: Wiesental Verwaltungs GmbH, Michelau</b>', prokura: '–', datum: '18.11.2024',
    unterschrift: ['die Wiesental Verwaltungs GmbH (durch ihre Geschäftsführung)', 'Max Nordmann (Kommanditist)'], richtig: 'die Wiesental Verwaltungs GmbH (durch ihre Geschäftsführung)' },
  nordlicht: { firma: 'Nordlicht Druck GmbH', art: 'HRB', nr: 'HRB 6675', gericht: 'Amtsgericht Bamberg', sitz: 'Bamberg', gegenstand: 'Druck von Geschäftsdrucksachen',
    kapital: 'Stammkapital: 25.000,00 EUR', vertretung: '<b>Geschäftsführer: Tom Reuter, Bamberg</b>', prokura: 'Einzelprokura: Dr. Petra Vogt, Bamberg', datum: '07.07.2025',
    unterschrift: ['Tom Reuter und Dr. Petra Vogt', 'nur Tom Reuter', 'Tom Reuter, Dr. Petra Vogt und Jonas Birkner (Handlungsvollmacht)'], richtig: 'Tom Reuter und Dr. Petra Vogt' },
  vogt: { firma: 'Vogt Medizintechnik GmbH', art: 'HRB', nr: 'HRB 9012', gericht: 'Amtsgericht Coburg', sitz: 'Coburg', gegenstand: 'Vertrieb medizinischer Geräte',
    kapital: 'Stammkapital: 100.000,00 EUR', vertretung: '<b>Geschäftsführerin: Dr. Petra Vogt, Coburg</b>', prokura: 'Einzelprokura: Paul Berg, Coburg', datum: '03.03.2025',
    unterschrift: ['Dr. Petra Vogt und Paul Berg', 'nur Dr. Petra Vogt', 'nur Paul Berg'], richtig: 'Dr. Petra Vogt und Paul Berg' },
  berg: { firma: 'Berg & Jansen KG', art: 'HRA', nr: 'HRA 1520', gericht: 'Amtsgericht Coburg', sitz: 'Lichtenfels', gegenstand: 'Handel mit Bürotechnik',
    kapital: 'Kommanditist: Ole Jansen, Lichtenfels, Einlage 30.000,00 EUR', vertretung: '<b>Persönlich haftender Gesellschafter: Paul Berg, Lichtenfels</b>', prokura: '–', datum: '22.04.2025',
    unterschrift: ['nur Paul Berg', 'Paul Berg und Ole Jansen', 'nur Ole Jansen'], richtig: 'nur Paul Berg' }
};
var REGISTERNAME = { HRA: 'Handelsregister Abteilung A', HRB: 'Handelsregister Abteilung B', VR: 'Vereinsregister', GnR: 'Genossenschaftsregister' };
var ABTEILUNG = { HRA: 'A', HRB: 'B', VR: 'anderes Register', GnR: 'anderes Register' };

/* ---------- Der Arbeitsgegenstand: Registerportal + Prüfliste ---------- */
// partner: Schlüssel der Firmen in der Prüfliste; melde(): nach jeder Änderung (Simulation: api.geaendert)
function partnerCheck(box, partner, melde) {
  var E = KIT.el, stand = { seite: '/', q: '', offen: null, werte: {} };
  partner.forEach(function (k) { stand.werte[k] = { gericht: '', nr: '', abt: '', unterschrift: '' }; });
  var platz = E('div', { class: 'pc-platz' });
  var portalBox = E('div', { class: 'pc-portal' }), listeBox = E('div', { class: 'pc-liste' });
  platz.appendChild(portalBox); platz.appendChild(listeBox); box.appendChild(platz);
  function ge() { if (melde) melde(); }
  var portal = KIT.browser(portalBox, {
    adresse: 'registerportal.uebung', start: '/',
    beiSeite: function (pfad, d) { stand.seite = pfad; stand.offen = pfad === '/abdruck' && d ? d.k : null; if (pfad === '/treffer') stand.q = (d && d.q) || ''; ge(); },
    seiten: {
      '/': function (seite, nav) {
        seite.appendChild(E('h3', { text: 'Registerportal · Suche', style: { margin: '0 0 4px' } }));
        seite.appendChild(E('p', { class: 'klein', html: 'Handels-, Genossenschafts-, Partnerschafts- und Vereinsregister. <b>Einsicht für jeden, ohne Anmeldung.</b>', style: { margin: '0 0 6px' } }));
        var feld = E('input', { type: 'text', 'aria-label': 'Firmenname', placeholder: 'Teil des Namens, z. B. Hartmann', style: { width: '100%', maxWidth: '320px' } });
        var los = E('button', { type: 'button', text: '🔍 Suchen', onclick: function () { nav('/treffer', { q: feld.value }); } });
        feld.addEventListener('keydown', function (e) { if (e.key === 'Enter') los.click(); });
        seite.appendChild(E('div', { class: 'steuerung' }, [feld, los]));
      },
      '/treffer': function (seite, nav, d) {
        var q = String((d && d.q) || '').trim().toLowerCase();
        var t = Object.keys(FIRMEN).filter(function (k) { return q.length >= 3 && FIRMEN[k].firma.toLowerCase().indexOf(q) >= 0; });
        seite.appendChild(E('h3', { text: t.length + ' Treffer für „' + ((d && d.q) || '') + '“', style: { margin: '0 0 6px' } }));
        if (!t.length) seite.appendChild(E('p', { class: 'klein', text: 'Nichts gefunden. Suche mit einem Teil des Firmennamens (mindestens drei Buchstaben).' }));
        t.forEach(function (k) {
          var f = FIRMEN[k];
          seite.appendChild(E('div', { class: 'kit-karte pc-treffer' }, [
            E('div', {}, [E('b', { text: f.firma }), E('div', { class: 'klein', text: REGISTERNAME[f.art] + ' · ' + f.nr + ' · ' + f.gericht + ' · Sitz ' + f.sitz })]),
            E('button', { type: 'button', text: '📄 Aktueller Abdruck', onclick: function () { nav('/abdruck', { k: k }); } })
          ]));
        });
      },
      '/abdruck': function (seite, nav, d) {
        var f = FIRMEN[d.k];
        KIT.dokument(seite, {
          kopf: '<b>' + f.gericht + '</b> · ' + REGISTERNAME[f.art] + ' · Aktueller Abdruck', titel: f.firma,
          zeilen: [
            { id: 'nr', label: 'Nummer', wert: f.nr },
            { id: 'firma', label: 'Firma · Sitz · Gegenstand', wert: f.firma + '<br>' + f.sitz + '<br>' + f.gegenstand },
            { id: 'kapital', label: f.art === 'HRA' ? 'Kommanditisten' : 'Kapital', wert: f.kapital },
            { id: 'vertretung', label: 'Vertretung', wert: f.vertretung },
            { id: 'prokura', label: 'Prokura', wert: f.prokura },
            { id: 'datum', label: 'Letzte Eintragung', wert: f.datum }
          ],
          fuss: 'Übungsversion – nachgebaut, keine echten Registerdaten.'
        });
      }
    }
  });
  // Prüfliste: eine Zeile je Geschäftspartner
  listeBox.appendChild(E('div', { class: 'pc-listentitel', html: '📋 <b>Prüfliste neue Geschäftspartner</b> · Kernwerk Bürobedarf, Einkauf' }));
  var tab = E('table', { class: 'pc-tabelle' });
  tab.appendChild(E('tr', {}, ['Partner', 'Registergericht', 'Nummer', 'Abteilung', 'Darf unterschreiben'].map(function (h) { return E('th', { text: h }); })));
  var felder = {};
  partner.forEach(function (k) {
    var f = FIRMEN[k], tr = E('tr', {}), name = f.firma.replace(/ (GmbH & Co\. KG|GmbH|e\. K\.|KG|AG|eG|e\. V\.|UG \(haftungsbeschränkt\))$/, '');
    felder[k] = {};
    function feld(id, el) { felder[k][id] = el; el.addEventListener('change', function () { stand.werte[k][id] = el.value.trim(); ge(); }); el.addEventListener('input', function () { stand.werte[k][id] = el.value.trim(); }); return E('td', {}, el); }
    tr.appendChild(E('td', { html: '<b>' + KIT.esc(name) + '</b>' }));
    tr.appendChild(feld('gericht', E('input', { type: 'text', 'aria-label': 'Registergericht ' + name, placeholder: 'Amtsgericht …' })));
    tr.appendChild(feld('nr', E('input', { type: 'text', 'aria-label': 'Registernummer ' + name, placeholder: 'z. B. HRB 1' })));
    tr.appendChild(feld('abt', E('select', { 'aria-label': 'Abteilung ' + name }, [E('option', { value: '', text: '–' })].concat(['A', 'B', 'anderes Register'].map(function (o) { return E('option', { value: o, text: o }); })))));
    tr.appendChild(feld('unterschrift', E('select', { 'aria-label': 'Wer darf unterschreiben, ' + name }, [E('option', { value: '', text: '– wählen –' })].concat(f.unterschrift.map(function (o) { return E('option', { value: o, text: o }); })))));
    tab.appendChild(tr);
  });
  listeBox.appendChild(E('div', { class: 'pc-scroll' }, tab));
  function norm(s) { return String(s || '').toLowerCase().replace(/\s+/g, '').replace(/^amtsgericht|^ag/, ''); }
  return {
    stand: function () { return stand; },
    suchen: function (q) { portal.nav('/treffer', { q: q }); },
    oeffne: function (k) { portal.nav('/abdruck', { k: k }); },
    // Trefferliste zeigt die Firma k (Suche mit mindestens drei Buchstaben aus dem Namen)
    gefunden: function (k) { var q = String(stand.q || '').trim().toLowerCase(); return stand.seite === '/treffer' && q.length >= 3 && FIRMEN[k].firma.toLowerCase().indexOf(q) >= 0; },
    setze: function (k, id, v) { felder[k][id].value = v; stand.werte[k][id] = v; ge(); },
    // Prüfungen für die Schritte, Übungen und die Selbstüberprüfung
    gerichtOk: function (k) { return norm(stand.werte[k].gericht) === norm(FIRMEN[k].gericht); },
    nrOk: function (k) { return norm(stand.werte[k].nr) === norm(FIRMEN[k].nr); },
    abtOk: function (k) { return stand.werte[k].abt === ABTEILUNG[FIRMEN[k].art]; },
    unterschriftOk: function (k) { return stand.werte[k].unterschrift === FIRMEN[k].richtig; },
    // Musterlösung für eine Zeile
    fuelle: function (k, was) {
      var f = FIRMEN[k];
      if (!was || was.indexOf('reg') >= 0) { this.setze(k, 'gericht', f.gericht); this.setze(k, 'nr', f.nr); }
      if (!was || was.indexOf('abt') >= 0) this.setze(k, 'abt', ABTEILUNG[f.art]);
      if (!was || was.indexOf('unt') >= 0) this.setze(k, 'unterschrift', f.richtig);
    }
  };
}

// Kleine Darstellung nur für diesen Gegenstand (die Vorlage selbst bleibt unverändert)
(function () {
  var css = '.pc-platz{display:flex;flex-direction:column;gap:10px;flex:1}' +
    '.pc-portal{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--card);min-height:180px;display:flex;flex-direction:column}' +
    '.pc-portal .kit-seite{padding:10px 12px;max-height:30vh;overflow:auto}' +
    '.pc-treffer{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:6px 0;flex-wrap:wrap}' +
    '.pc-liste{border:1px solid var(--line);border-radius:12px;background:var(--card);padding:8px 10px}' +
    '.pc-listentitel{font-size:.9rem;margin-bottom:6px}' +
    '.pc-scroll{overflow-x:auto}' +
    '.pc-tabelle{border-collapse:collapse;width:100%;font-size:.88rem}' +
    '.pc-tabelle th{text-align:left;font-size:.75rem;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);padding:2px 4px}' +
    '.pc-tabelle td{padding:3px 4px;border-top:1px solid var(--line)}' +
    '.pc-tabelle input,.pc-tabelle select{width:100%;min-width:90px;font:inherit;padding:4px 6px;border:1px solid var(--line);border-radius:8px;background:var(--card)}';
  var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
})();

var PARTNER = ['hartmann', 'ostwind', 'seidl', 'mainblick'];

window.PAKET = {
  id: 'beispiel-partner-check',
  titel: 'Partner-Check',
  untertitel: 'Geschäftspartner im Handelsregister prüfen',
  version: '0.1',
  bereit: 80,
  dauer: 'etwa 60 Minuten',
  welt: { thema: 'wirtschaft', kulisse: 'buero', symbol: '📇' },
  figur: { name: 'Katja Winter', rolle: 'Ausbilderin bei Kernwerk Bürobedarf', aussehen: { haut: 0, haare: 'blond', frisur: 'dutt', kleidung: '#0f766e' } },
  leitsituation: 'Schön, dass du da bist! Bei <b>Kernwerk Bürobedarf</b> prüfen wir neue Geschäftspartner im <b>Handelsregister</b>, bevor wir Verträge schließen. Heute arbeitest du mit unserer Prüfliste – die ersten Handgriffe zeige ich dir.',

  // Simulationsmodus: ein Arbeitsgegenstand über alle Kapitel
  simulation: {
    titel: 'Arbeitsplatz Einkauf · Registerportal und Prüfliste',
    start: function (box, api) { return partnerCheck(box, PARTNER, api.geaendert); }
  },

  lernziele: [
    { id: 'LZ1', kurz: 'Register nutzen', text: 'Ich kann erklären, wozu es das Handelsregister gibt, und einen Eintrag im Registerportal finden.' },
    { id: 'LZ2', kurz: 'Abteilung A/B', text: 'Ich kann Unternehmen der Abteilung A oder B zuordnen oder erkennen, dass sie in ein anderes Register gehören.' },
    { id: 'LZ3', kurz: 'Vertretung prüfen', text: 'Ich kann am Registerauszug prüfen, wer ein Unternehmen vertreten darf, und Prokura und Handlungsvollmacht unterscheiden.' }
  ],

  stationen: [
    { id: 'K1', titel: 'Gibt es Hartmann Elektro wirklich?', lz: ['LZ1'], vorab: 'VA', check: ['C1', 'C2', 'C3'],
      schritte: [
        { zeigen: true, auftrag: 'Wir wollen bei <b>Hartmann Elektro</b> bestellen. Such die Firma im Registerportal.',
          erklaerung: 'Das Registerportal ist öffentlich: Jeder darf ohne Anmeldung und ohne Grund suchen.',
          frage: 'Warum darf jeder ins Handelsregister schauen?', warum: 'Wer Geschäfte macht, soll sich auf sichere Angaben verlassen können – etwa darauf, wer unterschreiben darf.',
          pruefe: function (sim) { return sim.gefunden('hartmann'); },
          loesen: function (sim) { sim.suchen('Hartmann'); } },
        { auftrag: 'Öffne den <b>aktuellen Abdruck</b> der Hartmann Elektro GmbH.', tipp: 'In der Trefferliste steht rechts ein Knopf.',
          pruefe: function (sim) { var s = sim.stand(); return s.seite === '/abdruck' && s.offen === 'hartmann'; },
          loesen: function (sim) { sim.oeffne('hartmann'); } },
        { auftrag: 'Trag in der Prüfliste <b>Registergericht und Nummer</b> von Hartmann ein.', erklaerung: 'Gericht und Nummer stehen oben im Abdruck. Damit ist die Firma eindeutig.',
          tipp: 'Kopf des Abdrucks: „Amtsgericht …“ und darunter die Nummer mit HRA oder HRB.',
          pruefe: function (sim) { return sim.gerichtOk('hartmann') && sim.nrOk('hartmann'); },
          loesen: function (sim) { sim.fuelle('hartmann', 'reg'); } }
      ],
      mitdenken: { auftrag: 'Erklär in zwei Sätzen, warum wir vor dem ersten Auftrag ins Register schauen.', muster: 'Wir sehen, ob es die Firma gibt und wie sie genau heißt. Auf das, was dort steht, dürfen wir uns verlassen.' } },

    { id: 'K2', titel: 'A, B oder ganz woanders?', lz: ['LZ2'], vorab: 'VB', check: ['C4', 'C20', 'C21'],
      schritte: [
        { zeigen: true, auftrag: 'In welcher <b>Abteilung</b> steht Hartmann Elektro? Trag sie in der Prüfliste ein.',
          erklaerung: 'HRB heißt Abteilung B: Dort stehen Kapitalgesellschaften wie GmbH, UG und AG.',
          warum: 'Die Nummer beginnt mit HRB. Die GmbH ist eine Kapitalgesellschaft, darum Abteilung B.',
          pruefe: function (sim) { return sim.abtOk('hartmann'); },
          loesen: function (sim) { sim.oeffne('hartmann'); sim.fuelle('hartmann', 'abt'); } },
        { auftrag: 'Jetzt <b>Ostwind Papier</b>: Such die Firma und trag die Abteilung ein.', tipp: 'e. K. heißt „eingetragener Kaufmann“ – ein Einzelunternehmen.',
          pruefe: function (sim) { return sim.abtOk('ostwind'); },
          loesen: function (sim) { sim.suchen('Ostwind'); sim.oeffne('ostwind'); sim.fuelle('ostwind', 'abt'); } },
        { auftrag: 'Und <b>Seidl & Roth</b>? Prüf die Abteilung im Portal.', tipp: 'Eine KG ist eine Personengesellschaft.',
          pruefe: function (sim) { return sim.abtOk('seidl'); },
          loesen: function (sim) { sim.suchen('Seidl'); sim.oeffne('seidl'); sim.fuelle('seidl', 'abt'); } },
        { auftrag: 'Zuletzt der <b>Kulturverein Mainblick</b>, der bei uns Stühle mieten will.', erklaerung: 'Das Portal zeigt mehrere Register. Achte darauf, in welchem der Treffer steht.',
          tipp: 'VR steht für Vereinsregister.',
          pruefe: function (sim) { return sim.abtOk('mainblick'); },
          loesen: function (sim) { sim.suchen('Mainblick'); sim.fuelle('mainblick', 'abt'); } }
      ],
      mitdenken: { auftrag: 'Skizziere auf Papier: Welche Rechtsformen stehen in A, welche in B, welche ganz woanders?', muster: 'A: e. K., OHG, KG (auch GmbH & Co. KG). B: GmbH, UG, AG. Eigene Register: Verein (VR), Genossenschaft (GnR).' } },

    { id: 'K3', titel: 'Wer darf unterschreiben?', lz: ['LZ3'], vorab: 'VC', check: ['C10', 'C11', 'C12'],
      schritte: [
        { zeigen: true, auftrag: 'Wer darf für <b>Hartmann Elektro</b> den Vertrag unterschreiben? Trag es in der Prüfliste ein.',
          erklaerung: 'Im Abdruck stehen alle, die vertreten dürfen: Geschäftsführer, Inhaber, persönlich haftende Gesellschafter und Prokuristen.',
          frage: 'Warum darf Jana Weiß unterschreiben, obwohl sie nicht Geschäftsführerin ist?', warum: 'Sie hat Prokura. Die steht im Register und gilt nach außen für fast alle Geschäfte.',
          pruefe: function (sim) { return sim.unterschriftOk('hartmann'); },
          loesen: function (sim) { sim.oeffne('hartmann'); sim.fuelle('hartmann', 'unt'); } },
        { auftrag: 'Wer unterschreibt bei <b>Ostwind Papier</b>?', tipp: 'Bei einem Einzelunternehmen gibt es nur eine Person, die im Register steht.',
          pruefe: function (sim) { return sim.unterschriftOk('ostwind'); },
          loesen: function (sim) { sim.suchen('Ostwind'); sim.oeffne('ostwind'); sim.fuelle('ostwind', 'unt'); } },
        { auftrag: 'Bei <b>Seidl & Roth</b> stehen drei Namen im Abdruck. Wer darf wirklich unterschreiben?', erklaerung: 'Lies Vertretung, Kommanditisten und Prokura genau.',
          tipp: 'Kommanditisten vertreten die KG nicht. Und eine durchgestrichene Prokura ist erloschen.',
          pruefe: function (sim) { return sim.unterschriftOk('seidl'); },
          loesen: function (sim) { sim.suchen('Seidl'); sim.oeffne('seidl'); sim.fuelle('seidl', 'unt'); } }
      ],
      mitdenken: { auftrag: 'Erklär einem neuen Azubi den Unterschied zwischen Prokura und Handlungsvollmacht in zwei Sätzen.', muster: 'Prokura wird ins Handelsregister eingetragen und gilt nach außen für fast alle Geschäfte. Handlungsvollmacht wird nicht eingetragen und gilt nur für übliche Geschäfte.' } }
  ],

  uebungen: [
    { id: 'UE1', titel: 'Neuer Kunde: Brunner Backwaren', lz: ['LZ1'],
      auftrag: 'Die <b>Brunner Backwaren AG</b> will bei uns bestellen. Erfasse Registergericht und Nummer in der Prüfliste.',
      interaktion: function (box, api) {
        var pc = null; pc = partnerCheck(box, ['brunner'], function () { if (pc && pc.gerichtOk('brunner') && pc.nrOk('brunner')) api.erledigt('Brunner Backwaren ist eindeutig erfasst.'); });
        return { loesen: function () { pc.suchen('Brunner'); pc.oeffne('brunner'); pc.fuelle('brunner', 'reg'); } };
      },
      tipps: ['Such mit einem Teil des Namens.', 'Öffne den aktuellen Abdruck – Gericht und Nummer stehen ganz oben.', 'Amtsgericht Coburg, HRB 2044.'],
      reflexion: { frage: 'Warum reicht der Name „Brunner Backwaren“ allein nicht, um die Firma sicher zu bestimmen?', muster: 'Ähnliche Namen kann es mehrmals geben. Erst Registergericht und Nummer machen den Eintrag eindeutig.' } },
    { id: 'UE2', titel: 'Drei neue Lieferanten', lz: ['LZ2'],
      auftrag: 'Drei Lieferanten an einem Morgen. Trag für jeden die <b>Abteilung</b> ein – oder dass er in ein anderes Register gehört.',
      interaktion: function (box, api) {
        var L = ['lindgruen', 'regio', 'wiesental'], pc = null;
        pc = partnerCheck(box, L, function () { if (pc && L.every(function (k) { return pc.abtOk(k); })) api.erledigt('Alle drei richtig zugeordnet.'); });
        return { loesen: function () { L.forEach(function (k) { pc.fuelle(k, 'abt'); }); } };
      },
      tipps: ['Schau auf die Rechtsform, nicht auf den Namen.', 'UG ist eine Form der GmbH. Eine eG hat ein eigenes Register.', 'Lindgrün → B, Regio Einkauf eG → anderes Register, Wiesental GmbH & Co. KG → A.'],
      reflexion: { frage: 'Warum steht die Wiesental Möbel GmbH & Co. KG in Abteilung A, obwohl „GmbH“ im Namen steht?', muster: 'Entscheidend ist die Rechtsform der Gesellschaft selbst: Sie ist eine KG, also eine Personengesellschaft. Die GmbH ist nur ihre persönlich haftende Gesellschafterin.' } },
    { id: 'UE3', titel: 'Vertrag mit Nordlicht Druck', lz: ['LZ3'],
      auftrag: 'Bei <b>Nordlicht Druck</b> haben sich drei Personen gemeldet. Wer darf laut Register den Vertrag unterschreiben?',
      interaktion: function (box, api) {
        var pc = null; pc = partnerCheck(box, ['nordlicht'], function () { if (pc && pc.unterschriftOk('nordlicht')) api.erledigt('Richtig: Geschäftsführer und Prokuristin.'); });
        return { loesen: function () { pc.oeffne('nordlicht'); pc.fuelle('nordlicht', 'unt'); } };
      },
      tipps: ['Wer steht im Abdruck unter „Vertretung“ und „Prokura“?', 'Handlungsvollmacht wird nicht ins Register eingetragen.', 'Tom Reuter (Geschäftsführer) und Dr. Petra Vogt (Prokuristin).'],
      reflexion: { frage: 'Jonas Birkner hat Handlungsvollmacht. Darf er nie unterschreiben?', muster: 'Doch, für übliche Geschäfte seines Bereichs. Im Register steht er aber nicht – darauf können wir uns also nicht berufen. Bei großen Verträgen lassen wir Geschäftsführer oder Prokuristin unterschreiben.' } }
  ],

  selbstueberpruefung: {
    dauer: '20 Minuten',
    gewichtA: 50,
    einleitung: 'Heute bin ich im Termin. <b>Du prüfst zwei neue Partner allein</b> – ohne Tipps und ohne Rückmeldung. Ich schaue mir deine Prüfliste später an.',
    teilA: {
      titel: 'Zwei neue Partner',
      auftrag: 'Prüf <b>Vogt Medizintechnik</b> und <b>Berg & Jansen</b> vollständig: Registergericht, Nummer, Abteilung und wer unterschreiben darf.',
      interaktion: function (box) {
        var pc = partnerCheck(box, ['vogt', 'berg'], null);
        return {
          auswerten: function () {
            return [
              { lz: 'LZ1', text: 'Vogt Medizintechnik: Gericht und Nummer', ok: pc.gerichtOk('vogt') && pc.nrOk('vogt') },
              { lz: 'LZ1', text: 'Berg & Jansen: Gericht und Nummer', ok: pc.gerichtOk('berg') && pc.nrOk('berg') },
              { lz: 'LZ2', text: 'Vogt Medizintechnik: Abteilung B', ok: pc.abtOk('vogt') },
              { lz: 'LZ2', text: 'Berg & Jansen: Abteilung A', ok: pc.abtOk('berg') },
              { lz: 'LZ3', text: 'Vogt Medizintechnik: Geschäftsführerin und Prokurist', ok: pc.unterschriftOk('vogt') },
              { lz: 'LZ3', text: 'Berg & Jansen: nur der persönlich haftende Gesellschafter', ok: pc.unterschriftOk('berg') }
            ];
          },
          loesen: function () { pc.fuelle('vogt'); pc.fuelle('berg'); }
        };
      }
    },
    teilB: { proLZ: 2 }
  },

  merkblatt: [
    { lz: 'LZ1', zeilen: [
      { text: 'Das Handelsregister führt das ___.', loesung: 'Amtsgericht (Registergericht)' },
      { text: 'Einsehen darf ___, ohne Begründung.', loesung: 'jeder' }
    ], fehler: 'Glauben, nur Gesellschafter dürften den Auszug sehen.', beispiel: 'Wir sehen vor der ersten Bestellung den Abdruck von Hartmann Elektro an.' },
    { lz: 'LZ2', zeilen: [
      { text: 'Abteilung A (HRA): e. K., ___, ___.', loesung: 'OHG, KG' },
      { text: 'Abteilung B (HRB): ___, UG, AG.', loesung: 'GmbH' }
    ], fehler: 'GmbH & Co. KG in B einordnen – sie ist eine KG, also A.', beispiel: 'Vereine → Vereinsregister, eG → Genossenschaftsregister.' },
    { lz: 'LZ3', zeilen: [
      { text: 'Vertreten dürfen Geschäftsführer, Inhaber, persönlich haftende Gesellschafter und ___.', loesung: 'Prokuristen' },
      { text: 'Kommanditisten dürfen die KG ___ vertreten.', loesung: 'nicht' }
    ], fehler: 'Handlungsvollmacht im Register suchen – sie wird nicht eingetragen.', beispiel: 'Seidl & Roth KG: Nur Bernd Seidl darf unterschreiben.', schema: 'Abdruck öffnen → Vertretung lesen → Prokura lesen (erloschen?) → Kommanditisten ausschließen.' }
  ],
  selbsttest: ['N2', 'N4', 'N6', 'N8', 'N18'],

  /* Tafelbild: der Mittelteil des Inputs (Erklären und Beispiel). Beide Szenen zeigen denselben Gegenstand
     wie das Paket, groß am Beamer: erst vorhersagen lassen („Was steht wohl im Abdruck?“), dann klicken, dann deuten. */
  tafel: {
    titel: 'Partner-Check – Erklären und Beispiel',
    szenen: [
      { id: 'abdruck', titel: 'Vom Namen zum Abdruck', station: 'K1',
        erklaerung: '<p>Das Registerportal ist öffentlich. Oben im Abdruck stehen <b>Registergericht und Nummer</b> – damit ist die Firma eindeutig.</p><p>HRA oder HRB in der Nummer verrät die Abteilung.</p>',
        zeichne: function (box, api) {
          var pc = partnerCheck(box, ['hartmann'], null);
          api.werkzeug({ icon: '🔍', text: 'Suchen', taste: 's', aktion: function () { pc.suchen('Hartmann'); } });
          api.werkzeug({ icon: '📄', text: 'Abdruck', taste: 'a', aktion: function () { pc.oeffne('hartmann'); } });
          api.werkzeug({ icon: '✍️', text: 'Eintragen', taste: 'n', aktion: function () { pc.fuelle('hartmann', ['reg']); } });
          return {};
        } },
      { id: 'vertretung', titel: 'Wer darf unterschreiben?', station: 'K3',
        erklaerung: '<p>Unter <b>Vertretung</b> und <b>Prokura</b> steht, wer unterschreiben darf. Eine erloschene Prokura zählt nicht mehr.</p><p>Der Kommanditist einer KG vertritt die Gesellschaft nicht.</p>',
        zeichne: function (box, api) {
          var pc = partnerCheck(box, ['seidl'], null);
          pc.oeffne('seidl');
          api.werkzeug({ icon: '📄', text: 'Abdruck', taste: 'a', aktion: function () { pc.oeffne('seidl'); } });
          api.werkzeug({ icon: '✅', text: 'Auflösen', taste: 'l', aktion: function () { pc.fuelle('seidl', ['unt']); } });
          return {};
        } }
    ]
  },

  glossar: [
    { begriff: 'Handelsregister (HR)', erklaerung: 'Öffentliches Verzeichnis der Kaufleute eines Amtsgerichtsbezirks.', vorab: 'K1' },
    { begriff: 'Registergericht', erklaerung: 'Das Amtsgericht, das das Register führt.', vorab: 'K1' },
    { begriff: 'Abdruck', erklaerung: 'Auszug aus dem Register mit den aktuellen Angaben zu einer Firma.', vorab: 'K1' },
    { begriff: 'Abteilung A (HRA)', erklaerung: 'Teil des HR für Einzelunternehmen und Personengesellschaften (e. K., OHG, KG).', vorab: 'K2' },
    { begriff: 'Abteilung B (HRB)', erklaerung: 'Teil des HR für Kapitalgesellschaften (GmbH, UG, AG).', vorab: 'K2' },
    { begriff: 'Prokura', erklaerung: 'Weitreichende Vollmacht. Sie wird ins HR eingetragen.', vorab: 'K3' },
    { begriff: 'Kommanditist', erklaerung: 'Gesellschafter einer KG, der nur mit seiner Einlage haftet. Er vertritt die KG nicht.', vorab: 'K3' },
    { begriff: 'Handlungsvollmacht', erklaerung: 'Begrenzte Vollmacht für übliche Geschäfte. Sie wird nicht eingetragen.' },
    { begriff: 'öffentlicher Glaube', erklaerung: 'Man darf sich auf das HR verlassen. Nicht Eingetragenes kann Gutgläubigen nicht entgegengehalten werden.' },
    { begriff: 'Komplementär', erklaerung: 'Persönlich haftender Gesellschafter einer KG. Er vertritt die KG.' }
  ],

  fragen: [
// ===== Vorab-Fragen (je Kapitel eine, schwer zu erraten) =====
{ id: 'VA', lz: 'LZ1', einsatz: ['vorab'], typ: 'text',
  frage: 'Welches Gericht führt das Handelsregister? Ein Wort genügt.',
  akzeptiert: ['Amtsgericht', 'Registergericht', 'das Amtsgericht', 'Amtsgerichte'],
  typisch: [{ antwort: 'Landgericht', feedback: 'Das Landgericht entscheidet größere Streitfälle. Das Register führt das Amtsgericht.' }, { antwort: 'Finanzamt', feedback: 'Das Finanzamt ist kein Gericht und führt das Register nicht.' }],
  erklaerung: 'Das Handelsregister führt das Amtsgericht als Registergericht.' },
{ id: 'VB', lz: 'LZ2', einsatz: ['vorab'], typ: 'mc',
  frage: 'Welche Unternehmen stehen in Abteilung B des Handelsregisters? Kreuze alle richtigen an.',
  optionen: [
    { text: 'Kernwerk Bürobedarf GmbH', richtig: true },
    { text: 'Ostwind Papier e. K.', feedback: 'e. K. ist ein Einzelunternehmen und steht in Abteilung A.' },
    { text: 'Seidl & Roth KG', feedback: 'Die KG ist eine Personengesellschaft und steht in Abteilung A.' },
    { text: 'Brunner Backwaren AG', richtig: true },
    { text: 'Lindgrün Verpackung UG (haftungsbeschränkt)', richtig: true }
  ],
  erklaerung: 'In Abteilung B stehen Kapitalgesellschaften: GmbH, UG und AG.' },
{ id: 'VC', lz: 'LZ3', einsatz: ['vorab'], typ: 'mc',
  frage: 'Wer darf laut Handelsregister eine GmbH nach außen vertreten? Kreuze alle richtigen an.',
  optionen: [
    { text: 'Geschäftsführer', richtig: true },
    { text: 'Prokuristen', richtig: true },
    { text: 'Mitarbeiter mit Handlungsvollmacht', feedback: 'Handlungsvollmacht wird nicht ins Register eingetragen.' },
    { text: 'Gesellschafter ohne Geschäftsführeramt', feedback: 'Gesellschafter vertreten eine GmbH nicht, nur ihre Geschäftsführer.' }
  ],
  erklaerung: 'Im Register stehen bei einer GmbH die Geschäftsführer und die Prokuristen; sie dürfen die GmbH nach außen vertreten.' },
// ===== Neue Kurz-Check-Fragen zu Kapitel 2 =====
{ id: 'C20', lz: 'LZ2', einsatz: ['check'], typ: 'mc',
  frage: 'Die Lindgrün Verpackung UG (haftungsbeschränkt) wird eingetragen. In welches Register?',
  optionen: [
    { text: 'Handelsregister Abteilung B', richtig: true },
    { text: 'Handelsregister Abteilung A', feedback: 'Die UG ist eine Form der GmbH, also eine Kapitalgesellschaft – Abteilung B.' },
    { text: 'Genossenschaftsregister', feedback: 'Dort stehen eingetragene Genossenschaften (eG), keine UG.' }
  ],
  erklaerung: 'Die UG (haftungsbeschränkt) ist eine GmbH mit geringem Stammkapital und steht wie jede GmbH in Abteilung B.' },
{ id: 'C21', lz: 'LZ2', einsatz: ['check'], typ: 'mc',
  frage: 'Woran erkennst du im Registerportal sofort, in welcher Abteilung eine Firma steht?',
  optionen: [
    { text: 'An HRA oder HRB vor der Nummer', richtig: true },
    { text: 'Am Firmennamen', feedback: 'Der Name kann täuschen, z. B. bei einer GmbH & Co. KG. Verlässlich ist HRA oder HRB.' },
    { text: 'Am Sitz der Firma', feedback: 'Der Sitz sagt, welches Amtsgericht zuständig ist, nicht die Abteilung.' }
  ],
  erklaerung: 'HRA steht für Abteilung A, HRB für Abteilung B.' },
// ===== Fragen aus dem geprüften Pool der Handelsregister-Beispiele =====
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
    { text: 'Es zeigt, wie viel Gewinn ein Unternehmen macht.', feedback: 'Geschäftszahlen stehen nicht im HR. Es geht um die rechtlichen Verhältnisse. Siehe Kapitel 1.' },
    { text: 'Das Finanzamt berechnet damit die Steuern.', feedback: 'Das HR dient der Rechtssicherheit im Geschäftsverkehr, nicht der Steuerberechnung. Siehe Kapitel 1.' }
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
{ id: 'C4', lz: 'LZ2', einsatz: ['check'], typ: 'zuordnen',
  frage: 'Ordne jede Rechtsform dem passenden Register zu.',
  paare: [
    { links: 'Ostwind Papier e. K.', rechts: 'HR Abteilung A' },
    { links: 'Lindgrün Verpackung GmbH', rechts: 'HR Abteilung B' },
    { links: 'Tennisclub Rot-Weiß e. V.', rechts: 'Vereinsregister' }
  ],
  feedbackFalsch: 'Einzelunternehmen und Personengesellschaften → A, Kapitalgesellschaften → B, Vereine haben ein eigenes Register.',
  erklaerung: 'e. K. ist ein Einzelunternehmen (A), die GmbH eine Kapitalgesellschaft (B). Eingetragene Vereine stehen im Vereinsregister, nicht im HR.' },
{ id: 'C10', lz: 'LZ3', einsatz: ['check'], typ: 'mc',
  frage: 'Frau Brandt hat Handlungsvollmacht, Herr Okafor Prokura. Was steht im HR?',
  optionen: [
    { text: 'Nur die Prokura von Herrn Okafor', richtig: true },
    { text: 'Beide Vollmachten', feedback: 'Handlungsvollmachten werden nicht eingetragen.' },
    { text: 'Keine von beiden', feedback: 'Die Prokura wird eingetragen, damit Geschäftspartner sie prüfen können.' }
  ],
  erklaerung: 'Prokura wird eingetragen, die Handlungsvollmacht nicht.' },
{ id: 'C11', lz: 'LZ3', einsatz: ['check'], typ: 'mc',
  frage: 'Die Firma hat Herrn Okafors Prokura intern auf 10 000 € begrenzt. Im HR steht das nicht. Er schließt für 50 000 € ab.',
  optionen: [
    { text: 'Der Vertrag gilt, die interne Beschränkung ist Dritten gegenüber unwirksam.', richtig: true },
    { text: 'Der Vertrag gilt nicht, weil er die Grenze überschreitet.', feedback: 'Die Prokura ist nach außen unbeschränkbar. Interne Grenzen binden Dritte nicht.' },
    { text: 'Der Vertrag gilt, wenn die Beschränkung ins HR eingetragen wird.', feedback: 'Auch eine Eintragung würde die Beschränkung gegenüber Dritten nicht wirksam machen.' }
  ],
  erklaerung: 'Eine Beschränkung des Umfangs der Prokura ist Dritten gegenüber unwirksam.' },
{ id: 'C12', lz: 'LZ3', einsatz: ['check'], typ: 'mc',
  frage: 'Was bedeutet der öffentliche Glaube des Handelsregisters?',
  optionen: [
    { text: 'Was nicht eingetragen ist, kann gutgläubigen Dritten nicht entgegengehalten werden.', richtig: true },
    { text: 'Was eingetragen ist, wird notariell beurkundet.', feedback: 'Die Eintragung ist keine Beurkundung. Es geht um den Schutz dessen, der sich auf das Register verlässt.' },
    { text: 'Kaufleute müssen alle Einträge auf Richtigkeit prüfen.', feedback: 'Eine solche Pflicht gibt es nicht. Wer sich auf das HR verlässt, wird geschützt.' }
  ],
  erklaerung: 'Wer gutgläubig auf das Register vertraut, wird geschützt: Nicht eingetragene Tatsachen kann man ihm nicht entgegenhalten.' },
{ id: 'N1', lz: 'LZ1', einsatz: ['selbstueberpruefung'], typ: 'mc',
  frage: 'Welche Aussagen zum Handelsregister stimmen? Kreuze alle richtigen an.',
  optionen: [
    { text: 'Es wird vom Amtsgericht geführt.', richtig: true },
    { text: 'Jeder darf einsehen.', richtig: true },
    { text: 'Es dient der Rechtssicherheit im Geschäftsverkehr.', richtig: true },
    { text: 'Es wird vom Landgericht geführt.', feedback: 'Zuständig ist das Amtsgericht.' },
    { text: 'Nur mit berechtigtem Interesse darf man einsehen.', feedback: 'Die Einsicht ist für jeden möglich.' }
  ],
  erklaerung: 'Das HR ist ein öffentliches Verzeichnis beim Amtsgericht und soll Rechtssicherheit schaffen.' },
{ id: 'N2', lz: 'LZ1', einsatz: ['selbstueberpruefung'], typ: 'mc',
  frage: 'Ein Praktikant meint: „Den HR-Auszug unseres Lieferanten dürfen nur die Gesellschafter des Lieferanten sehen.“ Was antwortest du?',
  optionen: [
    { text: 'Falsch, jeder darf ihn abrufen.', richtig: true },
    { text: 'Richtig, aus Datenschutzgründen.', feedback: 'Das HR ist bewusst öffentlich, damit sich Geschäftspartner informieren können.' },
    { text: 'Richtig, aber auch Kunden dürfen ihn sehen.', feedback: 'Der Kreis ist nicht begrenzt, es darf jeder einsehen.' }
  ],
  erklaerung: 'Öffentlichkeit ist Zweck des Registers: Jeder darf einsehen.' },
{ id: 'N3', lz: 'LZ1', einsatz: ['selbstueberpruefung'], typ: 'mc',
  frage: 'Eine GmbH meldet einen neuen Geschäftsführer an. Welche Aussage ist richtig?',
  optionen: [
    { text: 'Die Anmeldung erfolgt elektronisch in öffentlich beglaubigter Form beim Registergericht.', richtig: true },
    { text: 'Die Anmeldung muss notariell beurkundet werden.', feedback: 'Öffentliche Beglaubigung genügt, eine Beurkundung ist nicht verlangt.' },
    { text: 'Die Anmeldung erfolgt formlos beim Landgericht.', feedback: 'Zuständig ist das Registergericht beim Amtsgericht, und die Form ist vorgeschrieben.' }
  ],
  erklaerung: 'Für Anmeldungen gilt: elektronisch, öffentlich beglaubigt, beim Registergericht.' },
{ id: 'N4', lz: 'LZ1', einsatz: ['selbstueberpruefung'], typ: 'mc',
  frage: 'Welcher Nutzen ergibt sich für den Einkauf, wenn er vor einem Vertrag den HR-Auszug prüft?',
  optionen: [
    { text: 'Er weiß verlässlich, mit welcher Rechtsform und mit wem er es zu tun hat.', richtig: true },
    { text: 'Er erfährt den Umsatz und kann Preise verhandeln.', feedback: 'Geschäftszahlen stehen nicht im HR.' },
    { text: 'Er kann dem Lieferanten Weisungen erteilen.', feedback: 'Das HR gibt nur Auskunft, es begründet keine Rechte gegenüber dem Lieferanten.' }
  ],
  erklaerung: 'Der Auszug zeigt rechtliche Verhältnisse wie Rechtsform, Vertretung und Haftung.' },
{ id: 'N5', lz: 'LZ2', einsatz: ['selbstueberpruefung'], typ: 'zuordnen',
  frage: 'Ordne die Unternehmen dem richtigen Register zu.',
  paare: [
    { links: 'Brandt Elektrik OHG', rechts: 'HR Abteilung A' },
    { links: 'Möwe Verpackung UG (haftungsbeschränkt)', rechts: 'HR Abteilung B' },
    { links: 'Regio Einkauf eG', rechts: 'Genossenschaftsregister' },
    { links: 'Tennisclub Rot-Weiß e. V.', rechts: 'Vereinsregister' }
  ],
  feedbackFalsch: 'Personengesellschaften und Einzelunternehmen → A. GmbH, UG, AG → B. Genossenschaft und Verein haben eigene Register.',
  erklaerung: 'OHG → A, UG → B. Genossenschaften und eingetragene Vereine stehen nicht im Handelsregister.' },
{ id: 'N6', lz: 'LZ2', einsatz: ['selbstueberpruefung'], typ: 'mc',
  frage: 'In welche Abteilung gehört die Wiesental Möbel GmbH & Co. KG?',
  optionen: [
    { text: 'Abteilung A, weil sie eine KG ist.', richtig: true },
    { text: 'Abteilung B, weil eine GmbH beteiligt ist.', feedback: 'Die Rechtsform ist KG, also eine Personengesellschaft. Die GmbH ist nur Komplementärin und steht mit eigenem Eintrag in B.' },
    { text: 'In beide Abteilungen gleichzeitig.', feedback: 'Die KG steht in A. Die beteiligte GmbH hat ihren eigenen Eintrag in B, das ist ein anderes Unternehmen.' }
  ],
  erklaerung: 'Maßgeblich ist die Rechtsform der Gesellschaft selbst. Die KG steht in Abteilung A.' },
{ id: 'N7', lz: 'LZ2', einsatz: ['selbstueberpruefung'], typ: 'mc',
  frage: 'Welche Unternehmen stehen in Abteilung B? Kreuze alle richtigen an.',
  optionen: [
    { text: 'Nord Logistik GmbH', richtig: true },
    { text: 'Küstenwerk UG (haftungsbeschränkt)', richtig: true },
    { text: 'Südwind AG', richtig: true },
    { text: 'Feldmann & Partner OHG', feedback: 'Die OHG ist eine Personengesellschaft und steht in Abteilung A.' },
    { text: 'Bäckerei Hoff e. K.', feedback: 'Der eingetragene Kaufmann (e. K.) steht in Abteilung A.' }
  ],
  erklaerung: 'In Abteilung B stehen Kapitalgesellschaften: GmbH, UG und AG.' },
{ id: 'N8', lz: 'LZ2', einsatz: ['selbstueberpruefung'], typ: 'text',
  frage: 'Der Bürostuhl-Hersteller Kern & Lenz KG wird eingetragen. In welche Abteilung? Antworte mit A oder B.',
  akzeptiert: ['A', 'HRA', 'Abteilung A', 'Abt. A'],
  typisch: [
    { antwort: 'B', feedback: 'B ist für Kapitalgesellschaften. Die KG ist eine Personengesellschaft und gehört in A.' },
    { antwort: 'HRB', feedback: 'HRB ist für Kapitalgesellschaften. Die KG ist eine Personengesellschaft und gehört in A.' }
  ],
  erklaerung: 'Die KG ist eine Personengesellschaft, also Abteilung A.' },
{ id: 'N17', lz: 'LZ3', einsatz: ['selbstueberpruefung'], typ: 'mc',
  frage: 'Welche Aussage zu Prokura und Handlungsvollmacht stimmt?',
  optionen: [
    { text: 'Die Prokura wird eingetragen, die Handlungsvollmacht nicht.', richtig: true },
    { text: 'Beide werden in Abteilung A eingetragen.', feedback: 'Handlungsvollmachten werden gar nicht eingetragen, und die Prokura steht bei der jeweiligen Gesellschaft.' },
    { text: 'Die Prokura entsteht erst mit der Eintragung.', feedback: 'Die Prokura gilt schon mit ihrer Erteilung, die Eintragung ist nur bekanntmachend.' }
  ],
  erklaerung: 'Nur die Prokura wird ins HR eingetragen, und zwar deklaratorisch.' },
{ id: 'N18', lz: 'LZ3', einsatz: ['selbstueberpruefung'], typ: 'mc',
  frage: 'Ein Prokurist hat intern nur Vollmacht bis 5 000 €, im HR steht keine Beschränkung. Er kauft für 20 000 € bei uns Ware. Was gilt?',
  optionen: [
    { text: 'Der Kauf gilt, die interne Beschränkung ist uns gegenüber unwirksam.', richtig: true },
    { text: 'Der Kauf gilt nicht, weil er die Grenze überschreitet.', feedback: 'Die Prokura ist nach außen nicht beschränkbar.' },
    { text: 'Der Kauf gilt nur, wenn wir nachweisen, dass wir die Grenze nicht kannten.', feedback: 'Auf Gutgläubigkeit kommt es hier nicht an, die Beschränkung wirkt Dritten gegenüber nie.' }
  ],
  erklaerung: 'Eine Beschränkung des Umfangs der Prokura ist Dritten gegenüber unwirksam.' },
{ id: 'N19', lz: 'LZ3', einsatz: ['selbstueberpruefung'], typ: 'mc',
  frage: 'Eine GmbH hat ihren Geschäftsführer gewechselt, die Änderung steht noch nicht im HR. Der alte Geschäftsführer schließt noch einen Vertrag mit uns, wir wussten vom Wechsel nichts. Was gilt?',
  optionen: [
    { text: 'Die GmbH kann uns den Wechsel nicht entgegenhalten, weil wir gutgläubig waren.', richtig: true },
    { text: 'Der Vertrag ist unwirksam, weil der Geschäftsführer nicht mehr im Amt ist.', feedback: 'Der öffentliche Glaube schützt uns, denn die Änderung war nicht eingetragen.' },
    { text: 'Wir hätten den Wechsel selbst prüfen müssen, sonst gilt der Vertrag nicht.', feedback: 'Es gibt keine Pflicht, laufend zu prüfen. Wer auf das HR vertraut, wird geschützt.' }
  ],
  erklaerung: 'Nicht eingetragene Tatsachen können gutgläubigen Dritten nicht entgegengehalten werden (öffentlicher Glaube).' },
{ id: 'N20', lz: 'LZ3', einsatz: ['selbstueberpruefung'], typ: 'mc',
  frage: 'Eine Mitarbeiterin mit Handlungsvollmacht unterschreibt für ihre Firma. Welche Aussage ist richtig?',
  optionen: [
    { text: 'Sie ist nicht im HR eingetragen, wir müssen ihren Umfang bei Zweifeln erfragen.', richtig: true },
    { text: 'Sie ist in Abteilung A eingetragen.', feedback: 'Handlungsvollmachten werden nicht ins HR eingetragen.' },
    { text: 'Ihre Vollmacht gilt erst mit Eintragung.', feedback: 'Die Handlungsvollmacht gilt ohne jede Eintragung.' }
  ],
  erklaerung: 'Handlungsvollmachten werden nicht eingetragen, ihr Umfang ist aus dem HR nicht ablesbar.' }
  ]
};
