/* =====================================================================
   INHALT DES LERNPAKETS – pro Paket werden nur die Dateien in quelle/ angepasst:
   diese Datei (quelle/paket.js) und die Fragen in quelle/fragen.md.
   paket.py bauen setzt daraus js/inhalt.js zusammen; js/inhalt.js nie von Hand ändern.
   Beispielinhalt: „Bits & Bytes“ (Binär ↔ Dezimal), Welt „technik“. Beim
   Bauen eines neuen Pakets vollständig durch die Inhalte aus Drehbuch und
   Fragenpool ersetzen. Ein zweites Beispiel aus der Wirtschaft (Szene mit
   Figur, simuliertem Rechner und Dokument) steht in beispiele/wirtschaft-handelsregister.js
   (im Skill-Ordner, nicht im Paket).

   Grundsatz (Leitfaden P12): Jede Station ist eine Szene zum Anfassen.
   Die Lernenden bewegen etwas – schalten, sortieren, markieren, entscheiden,
   bedienen einen simulierten Rechner. Text steht kurz in der Notiz daneben.

   welt:   {thema: 'wirtschaft'|'technik'|'sprache'|'natur'|'gesundheit'|'gestaltung',
            kulisse: 'buero'|'lager'|'werkstatt'|'serverraum'|'laden'|'stadt'|'natur'|'klasse',
            symbol: '🧭' (optional), farbe: '#hex' (optional)}
   figur:  {name, rolle, aussehen: {haut: 0–5, haare: 'braun'|'blond'|…, frisur:
            'kurz'|'lang'|'zopf'|'dutt'|'locken'|'glatze'|'kopftuch', kleidung: '#hex',
            brille, bart}}; weitere Personen in figuren: {key: {…}}
   spiel:  optionaler Spielrahmen {titel, intro, ziel, zaehler: {name, symbol}};
           dann je Station mission: {ort, symbol, ende}

   Fragen stehen in quelle/fragen.md (Markdown, Format in referenz/fragenformat.md).
   Nur eine Frage, deren Grafik per Code entsteht (wie F4 unten), steht hier in
   fragen: [...]; der Build hängt die Fragen aus fragen.md an. Felder im Paket:
   Fragetypen (typ):
     'mc'       Multiple Choice; mehrere richtige Optionen → Mehrfachauswahl.
                optionen: [{text, richtig, feedback}] – jede Falschantwort
                bekommt ein Feedback, das die Fehlvorstellung anspricht.
     'zuordnen' paare: [{links, rechts}]; feedbackFalsch optional.
     'zahl'     zahl: {wert, toleranz, einheit}; typisch: [{wert, feedback}].
     'text'     akzeptiert: ['…', '…'] (alle richtigen Schreibweisen);
                typisch: [{antwort, feedback}].
     'hotspot'  svg: '<svg viewBox=…>…</svg>', bereiche: [{x,y,w,h | cx,cy,r,
                label, richtig, feedback}] – genau ein Bereich ist richtig.
   Jede Frage: id, lz, einsatz (['check'|'selbstueberpruefung'|'uebung']),
   frage, erklaerung (warum die richtige Antwort richtig ist), optional bild.

   Station: check nennt die 2–3 Fragen des Kurz-Checks. Dieselben Fragen sind die
   Wissensabfrage, wenn jemand die Station überspringen will – mindestens eine
   davon schwer zu erraten (Zahl, Text, Zuordnen, Mehrfachauswahl). Eine
   Leitfrage (leitfrage, ein Satz) ist möglich, aber nicht nötig.

   tafel: zwei bis vier Tafelbild-Szenen für den Mittelteil des Inputs (siehe unten).

   Interaktionen (Station, Übung, Selbstüberprüfung Teil A) sind Funktionen
   function (box, api) { … return { loesen, demo, zuruecksetzen, auswerten } }.
     box                      die Bühne (groß, in der Mitte)
     api.kit                  Baukasten (js/baukasten.js): szene, figur, computer,
                              browser, mail, formular, dokument, sortieren, …
     api.erledigt(text)       Aufgabe gelöst (Station/Übung)
     api.meldung(text, art)   Rückmeldung unter der Szene, art: 'ok'|'bad'|'warn'|''
     api.erklaere(html)       Erklärung in der Notiz neben der Szene (passend zur Handlung)
     api.sage(text, ausdruck) Figur reagiert in ihrer Sprechblase
     loesen()                 setzt die Musterlösung ein (Pflicht, für automatische Tests)
     demo                     [{text, warum, tun: fn}] – Lösungsbeispiel, das in der
                              Szene vorgeführt wird („Zeig's mir"); tun() bewegt die Szene
     zuruecksetzen()          nach der Vorführung: Szene in den Aufgabenzustand
     auswerten()              nur Teil A: [{lz, text, ok}] je Prüfpunkt
   In Teil A der Selbstüberprüfung sind meldung und erklaere stumm (Rückmeldung erst nach dem Abgeben).
   ===================================================================== */

/* ---- Bausteine, die nur dieses Paket braucht ---- */
var WERTE = [128, 64, 32, 16, 8, 4, 2, 1];

// Router mit Anzeige und acht Schaltern – das Gerät, an dem gearbeitet wird.
// Lebensnah im Aussehen (referenz/szenen.md): Gehäuse mit Antennen, Schrauben und Füßen, Statusleuchten,
// Typenschild des erfundenen Herstellers, Etikett des Kunden. Bedienbar sind nur die acht Schalter;
// je Schalter zeigt eine Leuchte den Zustand, die Ziffer darunter sagt dasselbe ohne Farbe.
function geraeteTeile(geraet, mit) {
  var E = KIT.el;
  (mit || []).forEach(function (k) { geraet.appendChild(E('span', { class: k, 'aria-hidden': 'true' })); });
  ['ol', 'or', 'ul', 'ur'].forEach(function (k) { geraet.appendChild(E('span', { class: 'router-schraube ' + k, 'aria-hidden': 'true' })); });
}
function routerGeraet(box, opt) {
  opt = opt || {};
  var E = KIT.el, bits = [0, 0, 0, 0, 0, 0, 0, 0], gesperrt = false;
  var geraet = E('div', { class: 'router geraet', role: 'group', 'aria-label': opt.beschriftung || 'Router mit acht Bit-Schaltern' });
  var display = E('div', { class: 'router-display', 'aria-live': 'polite' });
  var reihe = E('div', { class: 'router-reihe' });
  var summe = E('div', { class: 'router-summe', 'aria-live': 'polite' });
  geraeteTeile(geraet, ['router-antenne l', 'router-antenne r', 'router-fuss l', 'router-fuss r']);
  geraet.appendChild(E('div', { class: 'router-kopf' }, [
    E('span', { class: 'router-status', 'aria-hidden': 'true' }, [E('span', { class: 'router-led' }), E('i', { text: 'PWR' }), E('span', { class: 'router-led' }), E('i', { text: 'NET' }), E('span', { class: 'router-led aus' }), E('i', { text: 'USB' })]),
    E('span', { class: 'router-etikett', text: opt.titel || 'KW-Router 8' }), display]));
  geraet.appendChild(reihe); geraet.appendChild(summe);
  geraet.appendChild(E('span', { class: 'router-schild', 'aria-hidden': 'true', html: '<b>KORBWERK</b> KW-R8 · 12 V ⎓ 1 A' }));
  var knoepfe = WERTE.map(function (w, i) {
    var b = E('button', { type: 'button', class: 'kipp', 'aria-pressed': 'false', 'aria-label': 'Bit mit Stellenwert ' + w,
      onclick: function () { if (gesperrt) return; bits[i] = 1 - bits[i]; zeichne(); if (opt.beiAenderung) opt.beiAenderung(wert()); } },
      [E('span', { class: 'kipp-led' }), E('span', { class: 'kipp-wert', text: w }), E('span', { class: 'kipp-hebel' }), E('span', { class: 'kipp-bit', text: '0' })]);
    reihe.appendChild(b); return b;
  });
  box.appendChild(geraet);
  function wert() { return bits.reduce(function (s, b, i) { return s + b * WERTE[i]; }, 0); }
  function zeichne() {
    knoepfe.forEach(function (b, i) { b.classList.toggle('an', !!bits[i]); b.setAttribute('aria-pressed', bits[i] ? 'true' : 'false'); b.querySelector('.kipp-bit').textContent = bits[i]; });
    display.textContent = opt.display !== undefined ? opt.display : bits.join('');
    var teile = WERTE.filter(function (w, i) { return bits[i]; });
    summe.classList.toggle('aus', opt.zeigeSumme === false);
    summe.innerHTML = opt.zeigeSumme === false ? '&nbsp;' : (teile.length ? teile.join(' + ') + ' = ' : '') + '<b>' + wert() + '</b>';
  }
  zeichne();
  return {
    wert: wert,
    setze: function (z) { WERTE.forEach(function (w, i) { bits[i] = z >= w ? 1 : 0; if (z >= w) z -= w; }); zeichne(); },
    bit: function (i, v) { bits[i] = v; zeichne(); },
    markiere: function (idx) { knoepfe.forEach(function (b, i) { b.classList.toggle('hervor', idx.indexOf(i) >= 0); }); },
    display: function (s) { opt.display = s; zeichne(); },
    summe: function (an) { opt.zeigeSumme = an; zeichne(); },
    sperre: function (s) { gesperrt = s; geraet.classList.toggle('gesperrt', !!s); }
  };
}
// Stil für die Geräte dieses Pakets (gehört zu diesem Paket, daher hier statt in stil.css)
(function () {
  var css = '.router{position:relative;max-width:720px;margin:8px auto 0;background:linear-gradient(#323845,#1b1f27);border:1px solid #0e1116;border-radius:14px;padding:14px 24px 20px;box-shadow:inset 0 1px 0 #535b6b,inset 0 -3px 0 #10131a,0 14px 26px rgba(10,15,40,.32);color:#cfd6e4}' +
    '.router.geraet{margin:36px auto 8px}' +
    /* Antennen, Füße, Schrauben, Typenschild: gehören zum Bild, tun nichts */
    '.router-antenne{position:absolute;top:-32px;width:9px;height:32px;border-radius:5px 5px 1px 1px;background:linear-gradient(90deg,#454c5a,#1d2129)}' +
    '.router-antenne::after{content:"";position:absolute;left:-3px;right:-3px;bottom:0;height:6px;border-radius:3px 3px 0 0;background:#14171d}' +
    '.router-antenne.l{left:52px;transform:rotate(-7deg);transform-origin:bottom}.router-antenne.r{right:52px;transform:rotate(7deg);transform-origin:bottom}' +
    '.router-fuss{position:absolute;bottom:-7px;width:48px;height:7px;border-radius:0 0 5px 5px;background:#12151b}.router-fuss.l{left:44px}.router-fuss.r{right:44px}' +
    '.router-schraube{position:absolute;width:9px;height:9px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#b4bac5,#5a606b 72%);box-shadow:inset 0 0 0 1px #1a1d24}' +
    '.router-schraube::after{content:"";position:absolute;left:1.5px;right:1.5px;top:4px;height:1px;background:#262a33;transform:rotate(35deg)}' +
    '.router-schraube.ol{left:7px;top:7px}.router-schraube.or{right:7px;top:7px}.router-schraube.ul{left:7px;bottom:8px}.router-schraube.ur{right:7px;bottom:8px}' +
    '.router-schild{position:absolute;right:26px;bottom:5px;font-size:.52rem;letter-spacing:.14em;color:#6f7888}.router-schild b{color:#8e97a7}' +
    '.router-kopf{display:flex;align-items:center;flex-wrap:wrap;gap:8px 12px;font-family:var(--titel);font-weight:800;margin-bottom:12px}' +
    '.router-status{display:flex;align-items:center;gap:4px}.router-status i{font:normal 700 .52rem var(--schrift);letter-spacing:.08em;color:#7d8696;margin-right:5px}' +
    '.router-led{flex:0 0 auto;width:8px;height:8px;border-radius:50%;background:#34d399;box-shadow:0 0 7px #34d399}.router-led.aus{background:#39404c;box-shadow:inset 0 0 0 1px #14171d}' +
    '.router-etikett{background:#f4f1e6;color:#1c2029;font-family:var(--schrift);font-weight:700;font-size:.82rem;line-height:1.3;padding:2px 9px;border-radius:3px;box-shadow:0 1px 2px rgba(0,0,0,.45)}' +
    '.router-display{margin-left:auto;font-family:ui-monospace,Consolas,monospace;font-size:1.5rem;letter-spacing:.2em;background:#0b1220;color:#7dd3fc;border:1px solid #334155;border-radius:6px;padding:4px 12px;min-width:10ch;min-height:1.9em;text-align:center;text-shadow:0 0 8px rgba(125,211,252,.6);box-shadow:inset 0 2px 6px #000}' +
    '.router-reihe{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:8px}' +
    '.kipp{display:flex;flex-direction:column;align-items:center;gap:5px;background:linear-gradient(#171c26,#0f131b);border:1px solid #3b4252;color:#e5e7eb;border-radius:10px;padding:8px 0 8px;min-height:126px}' +
    '.kipp:hover{border-color:#94a3b8}.kipp.an{border-color:var(--deko)}' +
    '.router.gesperrt .kipp{cursor:default}.router.gesperrt .kipp:hover{border-color:#3b4252}.router.gesperrt .kipp.an:hover{border-color:var(--deko)}' +
    '.kipp-led{width:9px;height:9px;border-radius:50%;background:#2c3340;box-shadow:inset 0 0 0 1px #0b0e13;transition:background .15s,box-shadow .15s}' +
    '.kipp.an .kipp-led{background:var(--deko);box-shadow:0 0 9px var(--deko)}' +
    '.kipp-wert{font-size:.85rem;color:#aab4c5;font-weight:700}' +
    '.kipp-hebel{width:24px;height:46px;border-radius:5px;background:#05070b;box-shadow:inset 0 2px 4px #000,0 1px 0 #3b4252;position:relative}' +
    '.kipp-hebel::after{content:"";position:absolute;left:3px;right:3px;height:20px;bottom:3px;border-radius:3px;background:repeating-linear-gradient(#f3efe4 0 3px,#cbc5b3 3px 4px);box-shadow:0 1px 2px rgba(0,0,0,.7);transition:bottom .15s}' +
    '.kipp.an .kipp-hebel::after{bottom:23px}' +
    '.kipp-bit{font-family:ui-monospace,Consolas,monospace;font-size:1.4rem;font-weight:800;line-height:1.1}' +
    '.kipp.hervor{outline:3px solid var(--deko);outline-offset:2px}' +
    '.router-summe{margin-top:12px;text-align:center;font-size:1.2rem;color:#e5e7eb;min-height:1.6em}' +
    '.router .router-summe{margin:10px auto 0;max-width:420px;font-family:ui-monospace,Consolas,monospace;font-size:1.05rem;background:#0b1220;border:1px solid #334155;border-radius:6px;padding:3px 10px;box-shadow:inset 0 2px 6px #000}' +
    '.router .router-summe.aus{visibility:hidden}' +
    /* Bit-Tester (Station 3): Lampen zum Antippen, Tafel mit allen Mustern */
    '.tester .router-display{letter-spacing:.04em;font-size:1.25rem;min-width:0}' +
    '.tester-knopf{min-height:38px;padding:4px 12px;border-radius:8px;background:linear-gradient(#4a5262,#343a47);border:1px solid #0e1116;color:#fff;font-weight:700;box-shadow:inset 0 1px 0 #6b7486,0 2px 0 #0e1116}' +
    '.tester-knopf:hover{border-color:#94a3b8}.tester-knopf:active{transform:translateY(1px);box-shadow:inset 0 1px 0 #6b7486}' +
    '.tester-bank{display:flex;justify-content:center;gap:10px;min-height:74px;margin-bottom:10px}' +
    '.lampe{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:58px;min-height:0;padding:6px 6px 5px;background:linear-gradient(#171c26,#0f131b);border:1px solid #3b4252;border-radius:10px;color:#e5e7eb;animation:kit-auf .2s ease-out}' +
    '.lampe:hover{border-color:#94a3b8}.lampe.an{border-color:var(--deko)}' +
    '.lampe-glas{width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#59627299,#232a36 70%);box-shadow:inset 0 0 0 2px #0b0e13;transition:background .15s,box-shadow .15s}' +
    '.lampe.an .lampe-glas{background:radial-gradient(circle at 35% 30%,#fff,var(--deko) 60%);box-shadow:inset 0 0 0 2px #0b0e13,0 0 14px var(--deko)}' +
    '.lampe-bit{font-family:ui-monospace,Consolas,monospace;font-weight:800;line-height:1}' +
    '.muster-kacheln{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:6px;background:#0b1220;border:1px solid #334155;border-radius:8px;padding:8px;min-height:100px;align-content:start;box-shadow:inset 0 2px 6px #000}' +
    '.muster-kacheln span{display:flex;flex-direction:column;align-items:center;gap:3px;font-family:ui-monospace,Consolas,monospace;font-size:.95rem;color:#9fb3c8;border:1px solid transparent;border-radius:6px;padding:4px 2px;animation:kit-auf .2s ease-out}' +
    '.muster-kacheln span.aktiv{border-color:var(--deko);color:#fff;background:rgba(255,255,255,.07)}' +
    '.muster-kacheln i{display:flex;gap:3px}.muster-kacheln i b{width:7px;height:7px;border-radius:50%;background:#263041}.muster-kacheln i b.an{background:var(--deko);box-shadow:0 0 5px var(--deko)}' +
    /* Notizzettel, Werkbank (Gerät und Vordruck nebeneinander), Adressplan auf Papier */
    '.zettel{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;max-width:560px;margin:18px auto 0;padding:8px 14px;background:linear-gradient(#fff6b8,#fdeb8f);border-radius:2px 2px 2px 14px;box-shadow:0 6px 12px rgba(60,50,0,.16);color:#3b3413}' +
    '.zettel input{width:5.5em}' +
    '.werkbank{display:flex;flex-wrap:wrap;gap:8px 22px;align-items:center;justify-content:center}' +
    '.werkbank>.router{flex:1 1 520px;min-width:0}.werkbank>.kit-formular,.werkbank>.kit-dok{flex:0 1 330px;margin:0}' +
    '.werkbank>.kit-dok{flex:1 1 460px}' +
    '.bitplan{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px 12px;margin:10px 0 6px}' +
    '.bitplan>span{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:2px}' +
    '.bitplan b{text-align:center;font-family:ui-monospace,Consolas,monospace;font-size:.85rem;line-height:1.9;border:1px solid #cfc4ac;border-radius:3px;background:#efe9da;color:#6b6252}' +
    '.bitplan b.frei{background:#fde68a;border-color:#d4a514;color:#3b3413}' +
    '@media (max-width:560px){.router{padding:12px 14px 18px}.router-reihe{gap:4px}.kipp{min-height:112px}.router-display{font-size:1.1rem}.router-status i,.router-schild{display:none}.muster-kacheln{grid-template-columns:repeat(4,minmax(0,1fr))}.bitplan{grid-template-columns:repeat(2,minmax(0,1fr))}}';
  var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
})();

var IP_SVG = function (bits) {
  // Ein Byte als Kästchenreihe, Stellenwerte direkt darüber (Beschriftung im Bild)
  var s = '<svg viewBox="0 0 560 110" role="img" aria-label="Ein Byte mit acht Stellen">';
  [128, 64, 32, 16, 8, 4, 2, 1].forEach(function (w, i) {
    s += '<rect x="' + (10 + i * 68) + '" y="40" width="60" height="56" rx="8" fill="#f6f8fc" stroke="#dbe2ec"/>';
    s += '<text x="' + (40 + i * 68) + '" y="78" text-anchor="middle" font-size="26" font-family="monospace" fill="#1b2333">' + bits[i] + '</text>';
  });
  return s + '<text x="10" y="26" font-size="15" fill="#6b7588">Stellenwerte stehen hier bewusst nicht dabei.</text></svg>';
};

window.PAKET = {
  id: 'beispiel-bits-und-bytes',          // = Identifier im imsmanifest.xml
  titel: 'Bits & Bytes',
  untertitel: 'Binärzahlen lesen und schreiben',
  version: '4.0',                       // Version dieses Pakets; eigene Pakete beginnen bei 1.0
  bereit: 80,                           // ab so viel Prozent sitzt das Thema (Selbstüberprüfung, zählt nicht)
  dauer: 'etwa 90 Minuten',
  welt: { thema: 'technik', kulisse: 'serverraum' },
  figur: { name: 'Mira Hofmann', rolle: 'Ausbilderin bei Korbwerk IT-Service',
    aussehen: { haut: 1, haare: 'rot', frisur: 'zopf', kleidung: '#4338ca', brille: true } },
  // Leitsituation: höchstens etwa 40 Wörter – sie ist der einzige Fließtext auf der Startseite
  leitsituation: 'Willkommen bei <b>Korbwerk IT-Service</b>! Router zeigen Adressen oft als Binärzahlen an – zum Beispiel <code>11000000</code> statt 192. Heute lernst du, solche Zahlen sicher zu lesen und zu schreiben.',

  lernziele: [
    { id: 'LZ1', kurz: 'Binär → dezimal', text: 'Ich kann eine 8-Bit-Binärzahl in eine Dezimalzahl umrechnen.' },
    { id: 'LZ2', kurz: 'Dezimal → binär', text: 'Ich kann eine Dezimalzahl von 0 bis 255 als 8-Bit-Binärzahl darstellen.' },
    { id: 'LZ3', kurz: 'Anzahl Werte', text: 'Ich kann berechnen, wie viele verschiedene Werte sich mit n Bit darstellen lassen.' }
  ],

  // Glossar: alle Fachbegriffe; vorab: '<Stations-id>' = wird an dieser Station vor der Szene vorgestellt (Vortraining)
  glossar: [
    { begriff: 'Bit', erklaerung: 'Kleinste Informationseinheit: 0 oder 1.', vorab: 'S1' },
    { begriff: 'Byte', erklaerung: '8 Bit zusammen. Ein Byte kann 256 verschiedene Werte haben (0 bis 255).', vorab: 'S1' },
    { begriff: 'Stellenwert', erklaerung: 'Wie viel eine Stelle in einer Zahl wert ist. Im Binärsystem: 1, 2, 4, 8, 16, 32, 64, 128 (von rechts).', vorab: 'S1' },
    { begriff: 'Binärzahl', erklaerung: 'Zahl, die nur aus 0 und 1 besteht (Zweiersystem).' },
    { begriff: 'Dezimalzahl', erklaerung: 'Zahl im gewohnten Zehnersystem mit den Ziffern 0 bis 9.' },
    { begriff: 'Oktett', erklaerung: 'Ein Byte als Teil einer IPv4-Adresse. Eine IPv4-Adresse hat vier Oktette, z. B. 192.168.1.10.' }
  ],

  stationen: [
    {
      id: 'S1', titel: 'Stellenwerte: So zählt ein Byte', lz: ['LZ1'],
      auftrag: 'Der Router der Bäckerei Sommer zeigt <code>11000000</code>. Stell die Schalter genauso ein: Welche Dezimalzahl ist das?',
      inhalt: '<p>Jede Stelle hat einen <b>Stellenwert</b>: rechts 1, nach links immer doppelt so viel. Eine 1 heißt: Dieser Wert zählt mit.</p>',
      interaktion: function (box, api) {
        var r = routerGeraet(box, { titel: 'Router Bäckerei Sommer', display: '11000000', beiAenderung: function (w) {
          if (w === 192) { api.sage('Genau! Jetzt kann ich die Adresse eintragen.', 'froh'); api.erledigt('11000000 = 128 + 64 = 192.'); }
          else if (w > 192) api.erklaere('<p>Du bist schon bei <b>' + w + '</b> – mehr als im Display. Vergleiche Schalter für Schalter mit <code>11000000</code>.</p>');
          else api.erklaere('<p>Unter jedem Schalter steht sein Stellenwert. Eingeschaltete Werte werden addiert: jetzt <b>' + w + '</b>.</p>');
        } });
        api.erklaere('<p>Tippe die Schalter an. Unten siehst du sofort, welche Zahl entsteht.</p>');
        return {
          demo: [
            { text: 'Das Beispiel <code>10110010</code>: Unter jedem Schalter steht sein Stellenwert.', warum: 'Jede Stelle ist doppelt so viel wert wie die rechts daneben.', tun: function () { r.display('10110010'); r.setze(0); r.markiere([0, 1, 2, 3, 4, 5, 6, 7]); } },
            { text: 'Wo im Display eine 1 steht, wird der Schalter eingeschaltet: 128, 32, 16 und 2.', warum: 'Eine 0 bedeutet „Stelle nicht benutzt“.', tun: function () { r.markiere([0, 2, 3, 6]); r.setze(178); } },
            { text: 'Die Werte der eingeschalteten Schalter addieren: 128 + 32 + 16 + 2 = <b>178</b>.', warum: 'Der Wert der Zahl ist die Summe der benutzten Stellenwerte.', tun: function () { r.markiere([]); } }
          ],
          zuruecksetzen: function () { r.display('11000000'); r.markiere([]); r.setze(0); },
          loesen: function () { r.setze(192); api.sage('Genau!'); api.erledigt('11000000 = 192.'); }
        };
      },
      selbsterklaerung: { schritt: 2, frage: 'Warum schaltest du nur die Stellen mit einer 1 ein und nicht alle acht?' },
      beruf: 'IPv4-Adressen und Subnetzmasken bestehen aus vier Bytes. Die Maske 255.255.255.0 heißt binär 11111111.11111111.11111111.00000000.',
      check: ['F2', 'F4', 'F1']
    },
    {
      id: 'S2', titel: 'Dezimal → binär', lz: ['LZ2'],
      auftrag: 'Der Drucker der Schreinerei Maier bekommt im letzten Byte die <b>150</b>. Stell 150 an den Schaltern ein – diesmal ohne Summenanzeige.',
      inhalt: '<p>Von links nach rechts: Passt der Stellenwert noch in den Rest, Schalter an und mit dem Rest weiter. Passt er nicht, bleibt der Schalter aus.</p>',
      interaktion: function (box, api) {
        var rest = KIT.el('div', { class: 'router-summe', style: { color: 'var(--ink)' } });
        var r = routerGeraet(box, { titel: 'Drucker Schreinerei Maier', display: '150 → ?', zeigeSumme: false, beiAenderung: function (w) {
          if (w === 150) { api.sage('Passt, der Drucker ist erreichbar.', 'froh'); api.erledigt('150 = 128 + 16 + 4 + 2 → 10010110.'); }
          else api.erklaere('<p>Eingestellt: <b>' + r.wert() + '</b>' + (w > 150 ? ' – zu viel. Welcher Schalter passt nicht mehr in den Rest?' : '') + '</p>');
        } });
        box.appendChild(rest);
        api.erklaere('<p>Starte links bei 128: Passt 128 in 150?</p>');
        return {
          demo: [
            { text: 'Beispiel <b>200</b>: 128 passt hinein → Schalter an. Rest 72.', warum: 'Immer mit dem größten Stellenwert beginnen.', tun: function () { r.display('200 → ?'); r.setze(128); r.summe(true); r.markiere([0]); rest.textContent = 'Rest: 200 − 128 = 72'; } },
            { text: '64 passt in 72 → an. Rest 8.', warum: 'Mit dem Rest geht es weiter, nicht mit 200.', tun: function () { r.setze(192); r.markiere([1]); rest.textContent = 'Rest: 72 − 64 = 8'; } },
            { text: '32 und 16 passen nicht in 8 → aus. 8 passt → an. Rest 0.', warum: 'Eine Stelle, die nicht passt, bleibt 0 – sie zählt trotzdem als Stelle.', tun: function () { r.setze(200); r.markiere([2, 3, 4]); rest.textContent = 'Rest: 8 − 8 = 0'; } },
            { text: 'Ergebnis: <code>11001000</code>. Ein Byte hat immer acht Stellen.', warum: 'Auch Nullen vorne oder hinten gehören dazu.', tun: function () { r.display('11001000'); r.markiere([]); } }
          ],
          zuruecksetzen: function () { r.display('150 → ?'); r.summe(false); r.markiere([]); r.setze(0); rest.textContent = ''; },
          loesen: function () { r.setze(150); api.erledigt('150 = 10010110.'); }
        };
      },
      selbsterklaerung: { schritt: 2, frage: 'Warum rechnest du nach dem ersten Schritt mit 72 weiter und nicht mehr mit 200?' },
      beruf: 'Beim Einrichten von Netzen musst du Adressen und Masken binär aufschreiben, um zu sehen, welche Bits zum Netz und welche zum Gerät gehören.',
      check: ['F7', 'F9', 'F6']
    },
    {
      id: 'S3', titel: 'Wie viele Werte passen in n Bit?', lz: ['LZ3'],
      auftrag: 'Mira fragt: „Wie viele verschiedene Adressen passen eigentlich in 4 Bit?“ Füge Bits hinzu und beobachte, wie viele Muster entstehen.',
      inhalt: '<p>Mit n Bit gibt es <b>2<sup>n</sup></b> Muster, von 0 bis 2<sup>n</sup> − 1.</p>',
      interaktion: function (box, api) {
        // Bit-Tester: je Bit eine Lampe zum Antippen, darunter die Tafel mit allen Mustern
        var E = KIT.el, n = 1, an = [0, 0, 0, 0];
        var geraet = E('div', { class: 'router tester', role: 'group', 'aria-label': 'Bit-Tester mit Lampen und Mustertafel' });
        geraeteTeile(geraet);
        var anzeige = E('div', { class: 'router-display', 'aria-live': 'polite' });
        var minus = E('button', { type: 'button', class: 'tester-knopf', text: '− Bit', onclick: function () { if (n > 1) { n--; zeichne(); } } });
        var plus = E('button', { type: 'button', class: 'tester-knopf', text: '+ Bit', onclick: function () { if (n < 4) { n++; zeichne(); } } });
        geraet.appendChild(E('div', { class: 'router-kopf' }, [E('span', { class: 'router-led', 'aria-hidden': 'true' }), E('span', { class: 'router-etikett', text: 'Bit-Tester' }), minus, plus, anzeige]));
        var bank = E('div', { class: 'tester-bank' });
        var kacheln = E('div', { class: 'muster-kacheln', 'aria-live': 'polite' });
        geraet.appendChild(bank); geraet.appendChild(kacheln);
        geraet.appendChild(E('span', { class: 'router-schild', 'aria-hidden': 'true', html: '<b>KORBWERK</b> KW-T4' }));
        var frage = E('div', { class: 'zettel' });
        var eing = E('input', { type: 'text', inputmode: 'numeric', size: 4, 'aria-label': 'Anzahl der Muster bei 8 Bit' });
        frage.appendChild(E('span', { html: 'Und bei <b>8 Bit</b>? Anzahl der Muster:' })); frage.appendChild(eing);
        frage.appendChild(E('button', { type: 'button', text: '✔ Prüfen', onclick: pruefe }));
        box.appendChild(geraet); box.appendChild(frage);
        function muster() {
          // Tafel: jedes Muster als Leuchtpunkte und als Ziffern; das an den Lampen eingestellte ist hervorgehoben
          var jetzt = an.slice(0, n).join('');
          kacheln.innerHTML = '';
          for (var m = 0; m < Math.pow(2, n); m++) {
            var t = (m + 256).toString(2).slice(-n);
            kacheln.appendChild(E('span', { class: t === jetzt ? 'aktiv' : null, html: '<i aria-hidden="true">' + t.split('').map(function (z) { return '<b' + (z === '1' ? ' class="an"' : '') + '></b>'; }).join('') + '</i>' + t }));
          }
        }
        function zeichne() {
          an = [0, 0, 0, 0];
          bank.innerHTML = '';
          for (var i = 0; i < n; i++) (function (i) {
            var l = E('button', { type: 'button', class: 'lampe', 'aria-pressed': 'false', 'aria-label': 'Lampe für Bit ' + (i + 1), onclick: function () {
              an[i] = 1 - an[i]; l.classList.toggle('an', !!an[i]); l.setAttribute('aria-pressed', an[i] ? 'true' : 'false'); l.lastChild.textContent = an[i]; muster();
            } }, [E('span', { class: 'lampe-glas' }), E('span', { class: 'lampe-bit', text: '0' })]);
            bank.appendChild(l);
          })(i);
          muster();
          minus.disabled = n <= 1; plus.disabled = n >= 4;
          anzeige.textContent = n + ' Bit → ' + Math.pow(2, n) + ' Muster';
          api.erklaere(n === 1 ? '<p>Ein Bit: 0 oder 1. Füge ein Bit hinzu.</p>' : '<p>Jedes alte Muster gibt es jetzt zweimal: mit 0 und mit 1 davor. Aus ' + Math.pow(2, n - 1) + ' werden ' + Math.pow(2, n) + '.</p>');
        }
        function pruefe() {
          var v = parseInt(eing.value, 10);
          if (v === 256) { api.sage('Richtig – deshalb hat ein Byte 256 Werte.', 'froh'); api.erledigt('2⁸ = 256 Muster, von 0 bis 255.'); }
          else if (v === 255) api.meldung('255 ist der größte Wert. Die 0 ist auch ein Muster – wie viele sind es dann?', 'bad');
          else if (v === 16) api.meldung('16 sind es bei 4 Bit. Bei 8 Bit verdoppelt es sich noch viermal.', 'bad');
          else api.meldung('Noch nicht. Verdopple bei jedem weiteren Bit: 2, 4, 8, 16, …', 'bad');
        }
        zeichne();
        return {
          demo: [
            { text: '1 Bit: zwei Muster, 0 und 1.', warum: 'Ein Bit ist entweder 0 oder 1.', tun: function () { n = 1; zeichne(); } },
            { text: '2 Bit: vier Muster. Jedes alte Muster gibt es mit 0 und mit 1 davor.', warum: 'Jede Möglichkeit des neuen Bits passt zu jedem alten Muster.', tun: function () { n = 2; zeichne(); } },
            { text: '3 Bit: acht Muster, von 000 (0) bis 111 (7).', warum: 'Die 0 ist eines der Muster – deshalb ist der größte Wert 7, nicht 8.', tun: function () { n = 3; zeichne(); } }
          ],
          zuruecksetzen: function () { n = 1; zeichne(); eing.value = ''; },
          loesen: function () { eing.value = '256'; pruefe(); }
        };
      },
      selbsterklaerung: { schritt: 3, frage: 'Es gibt 8 Muster – warum ist der größte Wert trotzdem nur 7?' },
      mitdenken: { auftrag: 'Zeichne auf Papier eine Tabelle für 1 bis 4 Bit mit der Anzahl der Werte. Erkläre deinem Sitznachbarn mit der Tabelle, warum sich die Anzahl mit jedem Bit verdoppelt.', muster: '1 Bit: 2 · 2 Bit: 4 · 3 Bit: 8 · 4 Bit: 16. Das neue Bit kann bei jedem bisherigen Muster 0 oder 1 sein – aus jedem Muster werden zwei.' },
      beruf: 'In einem Netz mit 8 Bit für Geräte gibt es 256 Bitmuster. Zwei davon sind reserviert, deshalb bleiben 254 Adressen für Geräte.',
      check: ['F14', 'F11', 'F13']
    }
  ],

  uebungen: [
    {
      id: 'U1', titel: 'Router-Anzeige lesen', lz: ['LZ1'],
      auftrag: 'Bei der Gärtnerei Lindner zeigt der Router das zweite Byte der Adresse als <code>10101000</code>. Trag die Dezimalzahl ins Protokoll ein.',
      interaktion: function (box, api) {
        var bank = KIT.el('div', { class: 'werkbank' }); box.appendChild(bank);
        var r = routerGeraet(bank, { titel: 'Router Gärtnerei Lindner', display: '10101000', zeigeSumme: false });
        r.setze(168); r.sperre(true);
        var f = KIT.formular(bank, { kopf: '<b>Korbwerk IT-Service</b><br>Kunde: Gärtnerei Lindner', nummer: 'Protokoll E 07', titel: 'Einrichtungsprotokoll', knopf: 'Ins Protokoll eintragen', vermerk: 'Protokolliert', felder: [
          { id: 'b2', label: '2. Byte der Adresse (dezimal)', typ: 'zahl', richtig: '168', hinweis: 'Stimmt noch nicht. Schreib dir die Stellenwerte über die Bits.' }
        ], beiSenden: function (w, ok) {
          if (ok.b2) { api.sage('Sauber protokolliert.', 'froh'); api.erledigt('10101000 = 128 + 32 + 8 = 168.'); }
          else if (w.b2 === '21') api.meldung('21 entsteht, wenn man links mit 1 anfängt. Die Stelle ganz links hat den Wert 128.', 'bad');
        } });
        return { loesen: function () { f.setze({ b2: '168' }); f.sende(); } };
      },
      tipps: ['Schreib zuerst die Stellenwerte 128 64 32 16 8 4 2 1 über die Bits.', 'Die Einsen stehen bei 128, 32 und 8.', '128 + 32 + 8 = 168.'],
      reflexion: { frage: 'Woran erkennst du schon vor dem Rechnen, ob eine Binärzahl größer als 127 ist?', muster: 'Wenn das Bit ganz links (Stellenwert 128) eine 1 ist, ist die Zahl mindestens 128. Ist es 0, ist sie höchstens 127.' }
    },
    {
      id: 'U2', titel: 'Adresse für den Server', lz: ['LZ2'],
      auftrag: 'Der neue Server bei Lindner soll im letzten Byte die 172 bekommen. Stelle 172 ein. Diesmal ohne Dezimalanzeige!',
      interaktion: function (box, api) {
        var r = routerGeraet(box, { titel: 'Server Gärtnerei Lindner', display: '172 → ?', zeigeSumme: false });
        var p = KIT.el('button', { type: 'button', text: '✔ Adresse übernehmen', style: { display: 'block', margin: '12px auto 0' }, onclick: function () {
          var w = r.wert();
          if (w === 172) { api.sage('Der Server antwortet. Gut gemacht!', 'froh'); api.erledigt('Richtig: 172 = 10101100.'); }
          else api.meldung('Der Server antwortet nicht: Deine Einstellung ergibt ' + w + '. ' + (w > 172 ? 'Das ist zu groß – prüfe, ob jeder Stellenwert wirklich noch in den Rest passt.' : 'Das ist zu klein – hast du einen Rest vergessen?'), 'bad');
        } });
        box.appendChild(p);
        return { loesen: function () { r.setze(172); p.click(); } };
      },
      tipps: ['Beginne mit dem größten Stellenwert, der in 172 passt.', '172 − 128 = 44. Welcher Stellenwert passt als nächster in 44?', '172 = 128 + 32 + 8 + 4 → 10101100.'],
      reflexion: { frage: 'Warum musst du nach jedem Schritt mit dem Rest weiterrechnen und nicht mit der ursprünglichen Zahl?', muster: 'Der schon abgezogene Stellenwert ist „verbraucht“. Würde man mit der ursprünglichen Zahl weiterrechnen, würde man denselben Anteil doppelt zählen und zu viele Einsen setzen.' }
    },
    {
      id: 'U3', titel: 'Wie viele Geräte passen?', lz: ['LZ3'],
      auftrag: 'In einem kleinen Netz bei Lindner bleiben die letzten 6 Bit der Adresse für Geräte frei. Wie viele verschiedene Bitmuster gibt es dafür?',
      interaktion: function (box, api) {
        // Adressplan auf Papier: 32 Bit in vier Bytes, die letzten 6 sind frei
        var bank = KIT.el('div', { class: 'werkbank' }); box.appendChild(bank);
        var kaestchen = '';
        for (var i = 0; i < 32; i++) kaestchen += (i % 8 === 0 ? '<span>' : '') + '<b' + (i < 26 ? '>N' : ' class="frei">?') + '</b>' + (i % 8 === 7 ? '</span>' : '');
        KIT.dokument(bank, {
          absender: { name: 'Korbwerk IT-Service', zeile: 'Netzplanung' }, zeichen: 'NP-0412', datum: 'Kunde: Gärtnerei Lindner',
          titel: 'Adressplan · 26 Bit Netz, 6 Bit für Geräte',
          text: '<div class="bitplan" role="img" aria-label="Adresse mit 32 Bit: 26 Bit Netz, die letzten 6 Bit frei für Geräte">' + kaestchen + '</div>',
          fuss: 'N = Netzteil (fest) · <b>?</b> = frei für Geräte'
        });
        var f = KIT.formular(bank, { kopf: '<b>Korbwerk IT-Service</b>', nummer: 'Planung NP 2', titel: 'Planung', knopf: 'Eintragen', vermerk: 'Geplant', felder: [
          { id: 'n', label: 'Bitmuster für die 6 freien Bit', typ: 'zahl', richtig: '64', hinweis: 'Bei n Bit gibt es 2 hoch n Muster.' }
        ], beiSenden: function (w, ok) {
          if (ok.n) api.erledigt('2⁶ = 64 Muster.');
          else if (w.n === '63') api.meldung('63 ist der größte Wert. Mit der 0 sind es 64 Muster.', 'bad');
          else if (w.n === '12') api.meldung('12 wäre 2 · 6. Es heißt aber 2 hoch 6.', 'bad');
        } });
        return { loesen: function () { f.setze({ n: '64' }); f.sende(); } };
      },
      tipps: ['Wie viele Möglichkeiten hat ein einzelnes Bit?', 'Bei n Bit gibt es 2 hoch n Muster.', '2⁶ = 64.'],
      reflexion: { frage: 'Mit 6 Bit gibt es 64 Muster, der größte Wert ist aber 63. Wie passt das zusammen?', muster: 'Die Zählung beginnt bei 0. Die 64 Muster sind die Werte 0 bis 63 – die 0 ist einer davon.' }
    }
  ],

  // Selbstüberprüfung am Ende: zählt nicht, beliebig oft wiederholbar; ab „bereit“ (80 %) sitzt das Thema.
  // danach: was als Nächstes kommt, wenn es sitzt (z. B. der Kompetenznachweis in der Lernplattform).
  selbstueberpruefung: {
    dauer: '15 Minuten',
    danach: 'Du bist bereit für den Kompetenznachweis. Den legst du in der Lernplattform ab – sprich deine Lehrkraft an.',
    gewichtA: 50,                       // Anteil von Teil A am Ergebnis in Prozent
    einleitung: 'Jetzt bist du allein beim Kunden: <b>Gärtnerei Lindner</b>. Ich bin heute nicht erreichbar – du schaffst das!',
    teilA: {
      titel: 'Router bei der Gärtnerei Lindner',
      auftrag: 'Der Router zeigt die Adresse binär. Trag sie dezimal ins Protokoll ein und stelle die Adresse für den Drucker ein.',
      interaktion: function (box) {
        var bytes = ['11000000', '10101000', '00000001', '00001010'], soll = [192, 168, 1, 10];
        box.innerHTML = '<p><b>Anzeige im Router:</b> <code style="font-size:1.1rem">' + bytes.join('.') + '</code></p><p><b>1.</b> Dezimal: </p>';
        var felder = soll.map(function (_, i) {
          var inp = document.createElement('input'); inp.type = 'text'; inp.inputMode = 'numeric'; inp.size = 4;
          inp.setAttribute('aria-label', (i + 1) + '. Byte dezimal');
          box.lastChild.appendChild(inp); if (i < 3) box.lastChild.appendChild(document.createTextNode(' . '));
          return inp;
        });
        var p2 = document.createElement('p'); p2.innerHTML = '<b>2.</b> Der Drucker bekommt im letzten Byte die <b>20</b>. Stelle sie binär ein:'; box.appendChild(p2);
        var b = routerGeraet(box, { titel: 'Drucker Gärtnerei Lindner', display: '20 → ?', zeigeSumme: false, beschriftung: 'Bit-Schalter für die Druckeradresse' });
        var p3 = document.createElement('p'); p3.innerHTML = '<b>3.</b> Wie viele verschiedene Werte kann das letzte Byte annehmen? ';
        var anz = document.createElement('input'); anz.type = 'text'; anz.inputMode = 'numeric'; anz.size = 5; anz.setAttribute('aria-label', 'Anzahl Werte');
        p3.appendChild(anz); box.appendChild(p3);
        function zahl(x) { return parseInt(String(x.value).trim(), 10); }
        return {
          auswerten: function () {
            return soll.map(function (s, i) { return { lz: 'LZ1', text: (i + 1) + '. Byte ' + bytes[i] + ' = ' + s, ok: zahl(felder[i]) === s }; })
              .concat([{ lz: 'LZ2', text: '20 = 00010100 eingestellt', ok: b.wert() === 20 }, { lz: 'LZ3', text: 'Ein Byte hat 256 mögliche Werte', ok: zahl(anz) === 256 }]);
          },
          loesen: function () { felder.forEach(function (f, i) { f.value = soll[i]; }); b.setze(20); anz.value = '256'; }
        };
      }
    },
    teilB: { proLZ: 2 }                 // Fragen je Lernziel aus dem Pool (einsatz 'selbstueberpruefung')
  },

  merkblatt: [
    { lz: 'LZ1', zeilen: [
      { text: 'Die Stellenwerte eines Bytes von rechts nach links: 1, 2, 4, ___, ___, ___, ___, 128.', loesung: '8, 16, 32, 64' },
      { text: 'Um eine Binärzahl umzurechnen, ___ ich die Stellenwerte aller Stellen mit einer 1.', loesung: 'addiere' }
    ], fehler: 'Links mit dem Stellenwert 1 anfangen. Die kleinste Stelle steht immer rechts.', beispiel: '10110010 = 128 + 32 + 16 + 2 = 178' },
    { lz: 'LZ2', zeilen: [
      { text: 'Ich ziehe immer den ___ Stellenwert ab, der noch in die Zahl passt.', loesung: 'größten' },
      { text: 'Passt ein Stellenwert nicht, schreibe ich an diese Stelle eine ___.', loesung: '0 (die Stelle bleibt stehen)' }
    ], fehler: 'Nullen weglassen – ein Byte hat immer acht Stellen.', beispiel: '200 = 128 + 64 + 8 → 11001000', schema: 'Größten passenden Stellenwert abziehen → 1 schreiben → mit dem Rest weiter → nicht passende Stellen 0.' },
    { lz: 'LZ3', zeilen: [
      { text: 'Mit n Bit lassen sich ___ verschiedene Werte darstellen.', loesung: '2ⁿ (2 hoch n)' },
      { text: 'Der größte Wert ist dann ___.', loesung: '2ⁿ − 1, bei 8 Bit also 255' }
    ], fehler: '255 statt 256 Werte – die 0 zählt mit.', beispiel: '4 Bit: 2⁴ = 16 Werte, von 0 bis 15' }
  ],
  selbsttest: ['F16', 'F17', 'F12', 'F5', 'F18'],

  fragen: [
    /* Fragen, deren Grafik per Code entsteht. Alle übrigen Fragen stehen in fragen.md. */
    { id: 'F4', lz: 'LZ1', einsatz: ['check'], typ: 'hotspot', frage: 'Tippe auf das Bit mit dem Stellenwert <b>32</b>.',
      svg: IP_SVG([1, 0, 1, 1, 0, 0, 1, 0]),
      bereiche: [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) {
        var w = [128, 64, 32, 16, 8, 4, 2, 1][i];
        return { x: 10 + i * 68, y: 40, w: 60, h: 56, label: (i + 1) + '. Stelle von links', richtig: w === 32, feedback: w === 32 ? '' : 'Diese Stelle hat den Stellenwert ' + w + '. Zähl von rechts: 1, 2, 4, 8, 16, 32.' };
      }),
      erklaerung: 'Von rechts gezählt ist die sechste Stelle (dritte von links) die mit dem Stellenwert 32.' }
  ],

  /* ---------- Tafelbild: der Mittelteil des Inputs (Leitfaden C2) ----------
     Wird von js/tafel.js angezeigt: groß, ohne erklärenden Text, Schritt für Schritt.
     Das Tafelbild ersetzt nur Erklären und Beispiel; Einstieg, Üben und Sicherung
     laufen auf den Folien der Lehrkraft. Darum genügen zwei bis vier Szenen.
     Jede Szene zeigt nur, was auch in ihrer Station vorkommt (station), die Erklärung
     ist für Schüler zuschaltbar. Werkzeuge mit api.werkzeug() erscheinen unten in der
     Leiste, mit Tastenkürzel. Was die Lehrkraft dazu in die Notizen ihrer Folien
     schreibt (ab wo das Tafelbild übernimmt, Klicks, Vorhersage-Frage, Rückweg),
     steht in lehrer/tafelbild-notizen.md. */
  tafel: {
    titel: 'Bits & Bytes – Erklären und Beispiel',
    szenen: [
      { id: 'stellenwerte', titel: 'Stellenwerte', station: 'S1',
        erklaerung: '<p>Jede der acht Stellen hat einen <b>Stellenwert</b>: rechts 1, nach links jeweils doppelt so viel.</p><p>Eine 1 bedeutet: Dieser Wert zählt mit. Die Zahl ist die Summe aller Stellenwerte mit einer 1.</p>',
        zeichne: function (box, api) {
          var b = routerGeraet(box, { titel: 'Ein Byte', display: '', zeigeSumme: false, beschriftung: 'Acht Bit-Schalter' });
          var g = box.querySelector('.router'); g.style.maxWidth = '1000px'; g.style.width = '100%'; g.style.margin = 'auto auto 0';
          g.querySelectorAll('.kipp-bit').forEach(function (x) { x.style.fontSize = '2.6rem'; });
          g.querySelectorAll('.kipp-wert').forEach(function (x) { x.style.fontSize = '1.3rem'; });
          var dez = document.createElement('div');
          dez.style.cssText = 'text-align:center;font-size:5rem;font-weight:800;margin:0 auto auto;visibility:hidden';
          dez.setAttribute('aria-live', 'polite');
          box.appendChild(dez);
          function zeige() { dez.textContent = '= ' + b.wert(); }
          box.addEventListener('click', zeige);
          zeige();
          api.werkzeug({ icon: '🔢', text: 'Dezimal', taste: 'd', typ: 'schalter', aktion: function (an) { dez.style.visibility = an ? 'visible' : 'hidden'; } });
          api.werkzeug({ icon: '🎲', text: 'Zufall', taste: 'z', aktion: function () { b.setze(Math.floor(Math.random() * 256)); zeige(); } });
          api.werkzeug({ icon: '↺', text: 'Leeren', taste: 'r', aktion: function () { b.setze(0); zeige(); } });
          return {};
        } },
      { id: 'anzahl', titel: 'Wie viele Werte?', station: 'S3',
        erklaerung: '<p>Mit jedem zusätzlichen Bit <b>verdoppelt</b> sich die Zahl der möglichen Muster: 2, 4, 8, 16 …</p><p>Mit n Bit gibt es 2<sup>n</sup> Werte, von 0 bis 2<sup>n</sup> − 1.</p>',
        zeichne: function (box, api) {
          var n = 1;
          var reihe = document.createElement('div');
          reihe.style.cssText = 'display:flex;justify-content:center;gap:10px;margin:auto auto 0;flex-wrap:wrap';
          var muster = document.createElement('div');
          muster.style.cssText = 'text-align:center;font-family:ui-monospace,Consolas,monospace;font-size:1.6rem;color:var(--ink-soft);min-height:2.4em;margin:1rem 0';
          var zahl = document.createElement('div');
          zahl.style.cssText = 'text-align:center;font-size:5rem;font-weight:800;margin:0 auto auto;visibility:hidden';
          box.appendChild(reihe); box.appendChild(muster); box.appendChild(zahl);
          function zeichne() {
            reihe.innerHTML = '';
            for (var i = 0; i < n; i++) { var k = document.createElement('div'); k.style.cssText = 'width:72px;height:88px;border:2px solid var(--line);border-radius:10px;background:var(--card);display:flex;align-items:center;justify-content:center;font-size:2.4rem;font-weight:800'; k.textContent = '?'; reihe.appendChild(k); }
            var alle = [];
            if (n <= 3) for (var m = 0; m < Math.pow(2, n); m++) alle.push((m + 256).toString(2).slice(-n));
            muster.textContent = alle.join('  ');
            zahl.textContent = '2' + ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸'][n] + ' = ' + Math.pow(2, n);
          }
          api.werkzeug({ icon: '−', text: 'Bit', taste: '-', aktion: function () { if (n > 1) { n--; zeichne(); } } });
          api.werkzeug({ icon: '+', text: 'Bit', taste: '+', aktion: function () { if (n < 8) { n++; zeichne(); } } });
          api.werkzeug({ icon: '🔢', text: 'Anzahl', taste: 'a', typ: 'schalter', aktion: function (an) { zahl.style.visibility = an ? 'visible' : 'hidden'; } });
          zeichne();
          return {};
        } }
    ]
  }
};
