/* BEISPIEL Wirtschaft (Lernpaket-Kompass 2): Station 1 aus „Das Handelsregister“.
   Zeigt eine Szene mit simuliertem Rechner (Postfach, nachgebautes Portal, Chat),
   antippbarem Dokument, Gespräch mit Entscheidungen, Vorführung („Zeig's mir“),
   Spielrahmen und eigener Welt. Zum Nachschlagen, nicht als Vorlage kopieren.
   Das Handelsregister – Inhalt (aus Drehbuch und Fragenpool). Alle Firmen, Personen,
   Registernummern und das Registerportal sind erfunden bzw. nachgebaut (Übungsversion). */

/* ---- Bausteine dieses Pakets ---- */
// Erfundene Registerdaten für das nachgebaute Portal
var REGISTER = {
  'hartmann': { firma: 'Hartmann Elektro GmbH', gericht: 'Amtsgericht Bamberg', nr: 'HRB 7351', sitz: 'Bamberg', gegenstand: 'Großhandel mit Elektroinstallationsmaterial', kapital: '50.000,00 EUR', vertretung: 'Ist ein Geschäftsführer bestellt, vertritt er die Gesellschaft allein.', personen: 'Geschäftsführer: Klaus Hartmann, Bamberg', prokura: '–', datum: '14.03.2024' },
  'ostwind': { firma: 'Ostwind Papier e. K.', gericht: 'Amtsgericht Bamberg', nr: 'HRA 2289', sitz: 'Forchheim', gegenstand: 'Handel mit Papier- und Schreibwaren', kapital: '–', vertretung: 'Der Inhaber vertritt allein.', personen: 'Inhaberin: Ayşe Kaya, Forchheim', prokura: '–', datum: '02.09.2023' }
};
var HR_ZEILEN = [
  { id: 'nr', label: 'Nummer', key: 'nr' },
  { id: 'firma', label: 'a) Firma<br>b) Sitz<br>c) Gegenstand', key: null },
  { id: 'kapital', label: 'Grund- oder Stammkapital', key: 'kapital' },
  { id: 'vertretung', label: 'a) Allgemeine Vertretungsregelung<br>b) Vertretungsberechtigte', key: null },
  { id: 'prokura', label: 'Prokura', key: 'prokura' },
  { id: 'datum', label: 'Tag der letzten Eintragung', key: 'datum' }
];
function hrAuszug(box, f, beiWahl) {
  return KIT.dokument(box, {
    kopf: '<b>' + f.gericht + '</b> · Handelsregister Abteilung ' + f.nr.slice(2, 3) + ' · Aktueller Abdruck',
    titel: f.firma,
    zeilen: HR_ZEILEN.map(function (z) {
      var w = z.key ? f[z.key] : z.id === 'firma' ? f.firma + '<br>' + f.sitz + '<br>' + f.gegenstand : f.vertretung + '<br><b>' + f.personen + '</b>';
      return { id: z.id, label: z.label, wert: w };
    }),
    fuss: 'Übungsversion – nachgebaut, keine echten Registerdaten.',
    beiWahl: beiWahl
  });
}
// Nachgebautes Registerportal: Suche ohne Anmeldung, Trefferliste, Abdruck
function registerPortal(fenster, opt) {
  var E = KIT.el;
  return KIT.browser(fenster, {
    adresse: 'registerportal.uebung',
    start: '/',
    beiSeite: opt.beiSeite,
    seiten: {
      '/': function (seite, nav) {
        seite.appendChild(E('h3', { text: 'Registerportal · Suche' }));
        seite.appendChild(E('p', { class: 'klein', html: 'Handels-, Genossenschafts-, Partnerschafts- und Vereinsregister. <b>Einsicht ohne Anmeldung.</b>' }));
        var feld = E('input', { type: 'text', 'aria-label': 'Firmenname', placeholder: 'Firmenname, z. B. Hartmann', style: { width: '100%', maxWidth: '360px' } });
        var los = E('button', { type: 'button', text: '🔍 Suchen', onclick: function () { nav('/treffer', { q: feld.value }); } });
        feld.addEventListener('keydown', function (e) { if (e.key === 'Enter') los.click(); });
        seite.appendChild(E('div', { class: 'steuerung' }, [feld, los]));
        if (opt.vorschlag) feld.value = opt.vorschlag;
      },
      '/treffer': function (seite, nav, d) {
        var q = String((d && d.q) || '').toLowerCase();
        var treffer = Object.keys(REGISTER).filter(function (k) { return q.length >= 3 && REGISTER[k].firma.toLowerCase().indexOf(q) >= 0; });
        seite.appendChild(E('h3', { text: treffer.length + ' Treffer für „' + ((d && d.q) || '') + '“' }));
        if (!treffer.length) seite.appendChild(E('p', { text: 'Nichts gefunden. Versuche einen Teil des Firmennamens.' }));
        treffer.forEach(function (k) {
          var f = REGISTER[k];
          seite.appendChild(E('div', { class: 'kit-karte', style: { margin: '6px 0' } }, [
            E('b', { text: f.firma }), E('div', { class: 'klein', text: f.gericht + ' · ' + f.nr + ' · Sitz ' + f.sitz }),
            E('button', { type: 'button', text: '📄 Aktueller Abdruck', style: { marginTop: '6px' }, onclick: function () { nav('/abdruck', { k: k }); } })
          ]));
        });
      },
      '/abdruck': function (seite, nav, d) { opt.abdruck(seite, REGISTER[d.k], d.k); }
    }
  });
}

window.PAKET = {
  id: 'wsk-handelsregister',
  titel: 'Das Handelsregister',
  untertitel: 'Eintragungen zuordnen und ihre Wirkung verstehen',
  version: '0.2',
  bestehen: 80,
  dauer: 'etwa 45 Minuten (in zwei Abschnitten möglich)',
  welt: { thema: 'wirtschaft', kulisse: 'buero', symbol: '📇' },
  figur: { name: 'Katja Winter', rolle: 'Ausbilderin bei Kernwerk Bürobedarf',
    aussehen: { haut: 0, haare: 'blond', frisur: 'dutt', kleidung: '#0f766e' } },
  leitsituation: 'Schön, dass du da bist! Bei <b>Kernwerk Bürobedarf</b> wollen wir mit neuen Geschäftspartnern ins Geschäft kommen. Bevor wir Verträge abschließen, prüfen wir im <b>Handelsregister</b>, mit wem wir es zu tun haben und wer unterschreiben darf.',
  spiel: {
    titel: 'Partner-Check bei Kernwerk',
    intro: 'Vier neue Geschäftspartner wollen Verträge mit <b>Kernwerk Bürobedarf</b>. Bevor wir unterschreiben, prüfst du jeden im Handelsregister. Ich zeige dir den ersten, dann bist du dran.',
    ziel: 'Alle vier Partner prüfen, dann den Abschlusstest bestehen.',
    zaehler: { name: 'Partner geprüft', symbol: '🤝' }
  },

  lernziele: [ /* … */ ],

  stationen: [
    {
      id: 'S1', titel: 'Wozu gibt es das Handelsregister?', lz: ['LZ1'],
      mission: { ort: 'Hartmann Elektro', symbol: '⚡', ende: 'Hartmann Elektro ist geprüft – Katja kann den Vertrag vorbereiten.' },
      auftrag: 'Hartmann Elektro will uns beliefern. Schau im Registerportal nach, ob die Firma eingetragen ist und wer für sie unterschreiben darf. Danach besprechen wir das.',
      leitfrage: 'Wer führt das Handelsregister, wer darf einsehen, wozu ist es gut?',
      inhalt: '<p>Das <b>Handelsregister</b> ist öffentlich. Das <b>Amtsgericht</b> führt es. Wer etwas ändern will, meldet es <b>elektronisch und öffentlich beglaubigt</b> an.</p>',
      selbsterklaerung: { schritt: 3, frage: 'Warum darf eigentlich jeder ins Handelsregister schauen, ohne einen Grund zu nennen?' },
      interaktion: function (box, api) {
        var E = KIT.el, os, phase = 'start', fertig = false;
        var ziele = [
          ['portal', 'Registerportal öffnen und <b>Hartmann</b> suchen'],
          ['abdruck', 'Aktuellen Abdruck öffnen'],
          ['person', 'Im Abdruck antippen, wer unterschreiben darf'],
          ['gespraech', 'Mit Katja besprechen']
        ], erreicht = {};
        function liste() {
          api.erklaere('<ol style="margin:0;padding-left:1.2rem">' + ziele.map(function (z) { return '<li style="' + (erreicht[z[0]] ? 'color:var(--ok)' : '') + '">' + (erreicht[z[0]] ? '✓ ' : '') + z[1] + '</li>'; }).join('') + '</ol>', 'Deine Schritte');
        }
        function hake(id) { if (!erreicht[id]) { erreicht[id] = 1; liste(); } }
        var mails = [{ id: 'm1', von: 'Katja Winter', betreff: 'Neuer Lieferant: Hartmann Elektro', text: '<p>Hallo,</p><p>Hartmann Elektro will uns ab Mai beliefern. Bitte prüf im <b>Registerportal</b>, ob die Firma eingetragen ist und wer für sie unterschreiben darf.</p><p>Danke! Katja</p>' }];
        function bauePC() {
          box.innerHTML = '';
          os = KIT.computer(box, { start: 'post', apps: [
            { id: 'post', name: 'Postfach', symbol: '✉️', start: function (f) { KIT.mail(f, { mails: mails, offen: 'm1' }); } },
            { id: 'portal', name: 'Registerportal', symbol: '🏛️', start: function (f, os, d) { portal(f, d); } },
            { id: 'chat', name: 'Chat mit Katja', symbol: '💬', start: function (f) { gespraech(f); } }
          ] });
        }
        function portal(f, d) {
          registerPortal(f, {
            vorschlag: d && d.vorschlag,
            beiSeite: function (pfad, dd) { if (pfad === '/treffer' && dd && /hart/i.test(dd.q || '')) hake('portal'); },
            abdruck: function (seite, firma, k) {
              if (k === 'hartmann') hake('abdruck');
              seite.appendChild(E('p', { class: 'klein', html: '<b>Tippe die Zeile an, aus der hervorgeht, wer für die Firma unterschreiben darf.</b>' }));
              var dok = hrAuszug(seite, firma, function (id) {
                if (api.demo()) return;
                if (id === 'vertretung') {
                  dok.markiere(id, 'richtig');
                  if (k === 'hartmann') { hake('person'); api.sage('Gut gefunden: Klaus Hartmann darf als Geschäftsführer allein unterschreiben. Öffne den Chat, dann besprechen wir den Rest.', 'froh'); }
                } else { dok.markiere(id, 'falsch'); api.meldung(id === 'prokura' ? 'Bei Prokura steht ein Strich – es gibt keinen Prokuristen. Wer vertritt die Firma also?' : 'Diese Zeile sagt nichts darüber, wer unterschreiben darf. Such nach „Vertretung“.', 'bad'); }
              });
              f.dok = dok;
            }
          });
        }
        function gespraech(f) {
          if (!erreicht.person) { f.appendChild(E('p', { style: { padding: '14px' }, html: '<b>Katja:</b> Schau zuerst im Registerportal nach, wer bei Hartmann unterschreiben darf. Dann reden wir.' })); return; }
          var w = E('div', { style: { padding: '12px' } }); f.appendChild(w);
          f.dlg = KIT.dialog(w, { figur: 'figur', schritte: [
            { frage: 'Prima. Kurze Frage: Wer führt eigentlich dieses Register?', antworten: [
              { text: 'Das Amtsgericht', richtig: true, reaktion: 'Genau, im Abdruck stand ja „Amtsgericht Bamberg“ – das Registergericht.' },
              { text: 'Die IHK', reaktion: 'Die IHK berät die Firmen, führt das Register aber nicht. Schau noch mal in den Kopf des Abdrucks.' },
              { text: 'Das Finanzamt', reaktion: 'Das Finanzamt interessiert sich für Steuern. Das Register führt ein Gericht – welches stand im Abdruck?' }
            ] },
            { frage: 'Musstest du dich anmelden oder einen Grund angeben, um reinzuschauen?', antworten: [
              { text: 'Nein, einsehen darf jeder.', richtig: true, reaktion: 'Richtig. Das Register ist öffentlich – für Kunden, Lieferanten, Banken und dich.' },
              { text: 'Ja, man braucht ein berechtigtes Interesse.', reaktion: 'Hast du dich irgendwo anmelden müssen? Das Portal war ohne Anmeldung offen.' }
            ] },
            { frage: 'Hartmann schreibt, sie hätten ab Juni eine neue Geschäftsführerin. Das wollen sie dem Gericht einfach per E-Mail schicken. Geht das?', antworten: [
              { text: 'Nein, über einen Notar: öffentlich beglaubigt und elektronisch.', richtig: true, reaktion: 'Genau. Das Gericht muss sicher sein, wer anmeldet – sonst wäre das Register nicht verlässlich.' },
              { text: 'Ja, eine E-Mail reicht.', reaktion: 'Dann könnte jeder fremde Firmen ändern. Wie muss die Anmeldung also aussehen?' },
              { text: 'Ja, aber nur per Brief mit Unterschrift.', reaktion: 'Eine einfache Unterschrift kann jeder fälschen. Was verlangt das Gericht stattdessen?' }
            ] },
            { frage: 'Und warum prüfen wir das alles, bevor wir unterschreiben?', antworten: [
              { text: 'Damit wir sicher wissen, mit wem wir es zu tun haben und wer unterschreiben darf.', richtig: true, reaktion: 'Genau das ist der Zweck: Rechtssicherheit. Danke, Hartmann ist geprüft!' },
              { text: 'Um zu sehen, wie viel Gewinn Hartmann macht.', reaktion: 'Hast du im Abdruck einen Gewinn gesehen? Dort stehen nur die rechtlichen Verhältnisse.' }
            ] }
          ], fertig: function () { hake('gespraech'); if (!fertig) { fertig = true; api.sage('Hartmann ist geprüft. Danke!', 'froh'); api.erledigt('Das Amtsgericht führt das Handelsregister, einsehen darf jeder, Anmeldungen sind öffentlich beglaubigt und elektronisch. So wissen wir sicher, mit wem wir Geschäfte machen.'); } } });
        }
        bauePC(); liste();
        return {
          demo: [
            { text: 'Ich zeige es dir an einem anderen Partner: <b>Ostwind Papier</b>. Im Registerportal gebe ich den Namen ein und suche.', warum: 'Das Portal ist für alle offen – es fragt nicht, wer du bist.', tun: function () { os.oeffne('portal', { vorschlag: 'Ostwind' }); box.querySelector('.kit-seite button').click(); } },
            { text: 'In der Trefferliste steht schon: <b>Amtsgericht Bamberg · HRA 2289</b>. Ich öffne den aktuellen Abdruck.', warum: 'Das Register führt das Amtsgericht am Sitz der Firma (Registergericht).', tun: function () { box.querySelector('.kit-seite .kit-karte button').click(); } },
            { text: 'Unter „Vertretung“ steht, wer unterschreiben darf: die Inhaberin Ayşe Kaya.', warum: 'Jeder darf einsehen, damit Geschäftspartner sich auf diese Angaben verlassen können.', tun: function () { var f = box.querySelector('.kit-fensterinhalt'); var d = box.querySelector('.kit-dok'); var z = d && d.querySelector('[data-id="vertretung"]'); if (z) { z.classList.add('markiert'); z.scrollIntoView({ block: 'nearest' }); } } }
          ],
          zuruecksetzen: function () { erreicht = {}; fertig = false; bauePC(); liste(); api.sage(''); },
          loesen: function () {
            os.oeffne('portal', { vorschlag: 'Hartmann' });
            box.querySelector('.kit-seite button').click();
            box.querySelector('.kit-seite .kit-karte button').click();
            box.querySelector('.kit-dok [data-id="vertretung"]').click();
            os.oeffne('chat');
            var f = box.querySelector('.kit-fenster .kit-fensterinhalt');
            (f.dlg || { loesen: function () {} }).loesen();
          }
        };
      },
      steckbrief: '<p>In echt heißt das Portal <b>handelsregister.de</b>, das gemeinsame Registerportal der Länder. Hier im Paket übst du an einer nachgebauten Version mit erfundenen Firmen.</p>',
      mitdenken: { auftrag: 'Erkläre einem Mitschüler in zwei Sätzen, wozu das Handelsregister gut ist.', muster: 'Im Handelsregister steht öffentlich, wer ein Unternehmen ist und wie es rechtlich aufgestellt ist. So kann jeder prüfen, mit wem er Geschäfte macht.' },
      beruf: 'Bevor der Einkauf einen größeren Vertrag mit einem neuen Lieferanten schließt, schaut er in den HR-Auszug: Rechtsform, wer unterschreiben darf, wer haftet.',
      check: ['C1', 'C2', 'C3']
    }
  ],

  fragen: [ /* … C1–C3 im Kurz-Check … */ ]
};
