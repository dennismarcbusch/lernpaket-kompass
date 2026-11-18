/* =====================================================================
   Baukasten (Lernpaket-Kompass) – fertige Bausteine für Szenen zum Anfassen.
   Diese Datei wird NICHT pro Paket verändert. In inhalt.js über window.KIT
   bzw. api.kit nutzen. Alle Bausteine: per Antippen und Tastatur bedienbar,
   Farben über CSS-Variablen, keine externen Dateien.

   KIT.figur(key | aussehen, opt)   SVG-Figur (Brustbild) als String
   KIT.kulisse(name)                SVG-Hintergrund: buero, lager, werkstatt,
                                    serverraum, laden, stadt, natur, klasse
   KIT.szene(box, opt)              Bühne mit Kulisse und Personen
   KIT.dialog(box, opt)             Gespräch mit Antwortknöpfen
   KIT.computer(box, opt)           Rechner am Arbeitsplatz: Monitor, Taskleiste mit Uhr, Fenster
   KIT.browser(fenster, opt)        Browser mit Reiter und Adresszeile, auf Wunsch Portal-Gerüst
   KIT.mail(fenster, opt)           Postfach mit Ordnern, Absender-Kürzeln und Anhang
   KIT.formular(box, opt)           Formular als Vordruck, Programm-Maske oder Webformular
   KIT.dokument(box, opt)           Papier-Dokument mit Briefkopf, Unterschrift und Stempel
   KIT.sortieren(box, opt)          Karten antippen, dann Fach antippen
   KIT.reihenfolge(box, opt)        Schritte in die richtige Reihenfolge tippen
   KIT.regler(box, opt)             Schieberegler mit Live-Wert
   KIT.el(tag, attrs, kinder)       kleiner Helfer zum Bauen von Elementen
   ===================================================================== */
(function () {
  'use strict';

  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === undefined || v === null || v === false) return;
      if (k === 'html') n.innerHTML = v;
      else if (k === 'text') n.textContent = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(n.style, v);
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? '' : v);
    });
    (Array.isArray(kids) ? kids : kids === undefined ? [] : [kids]).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return n;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mischen(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function wackeln(n) { n.classList.remove('kit-wackeln'); void n.offsetWidth; n.classList.add('kit-wackeln'); }

  /* ---------- Figuren ---------- */
  var HAUT = ['#f6d3b3', '#e8b48f', '#d39a6a', '#b07448', '#8a5a35', '#5e3b22'];
  var HAARE = { schwarz: '#1f1a17', dunkelbraun: '#4a3020', braun: '#7a4a2a', rot: '#a6462a', blond: '#d8b46a', grau: '#9a9a9a', weiss: '#e6e6e6' };
  function figurDaten(key) {
    var P = window.PAKET || {};
    if (typeof key === 'object') return { aussehen: key };
    var alle = P.figuren || {};
    if (alle[key]) return alle[key];
    if (P.figur && (!key || key === 'figur')) return P.figur;
    return { name: key || '?', aussehen: {} };
  }
  function figur(key, opt) {
    opt = opt || {};
    var d = figurDaten(key), a = d.aussehen || {};
    var haut = typeof a.haut === 'number' ? HAUT[a.haut] : (a.haut || HAUT[1]);
    var haare = HAARE[a.haare] || a.haare || HAARE.dunkelbraun;
    var kleid = a.kleidung || 'var(--accent)';
    var fris = a.frisur || 'kurz';
    var aus = opt.ausdruck || a.ausdruck || 'freundlich';
    var s = '<svg class="kit-figur" viewBox="0 0 120 140" role="img" aria-label="' + esc(d.name || 'Figur') + '">';
    if (opt.rund) s += '<circle cx="60" cy="70" r="66" fill="var(--accent-soft)"/>';
    // Haare hinten (lang, zopf)
    if (fris === 'lang') s += '<path d="M31 58 C28 30 45 20 60 20 C76 20 92 30 89 58 L94 104 Q84 110 74 104 L78 62 L42 62 L46 104 Q36 110 26 104 Z" fill="' + haare + '"/>';
    if (fris === 'zopf') s += '<path d="M78 46 C96 54 96 84 86 100 C82 92 84 70 74 58 Z" fill="' + haare + '"/>';
    // Oberkörper
    s += '<path d="M12 140 C12 106 32 92 60 92 C88 92 108 106 108 140 Z" fill="' + kleid + '"/>';
    s += '<path d="M48 92 L60 108 L72 92 Z" fill="#fff" opacity=".9"/>';
    if (a.krawatte) s += '<path d="M57 98 L63 98 L65 122 L60 128 L55 122 Z" fill="' + a.krawatte + '"/>';
    s += '<rect x="51" y="76" width="18" height="20" rx="7" fill="' + haut + '"/>';
    s += '<rect x="51" y="84" width="18" height="6" fill="#000" opacity=".08"/>';
    // Kopf
    s += '<circle cx="36" cy="58" r="5.5" fill="' + haut + '"/><circle cx="84" cy="58" r="5.5" fill="' + haut + '"/>';
    s += '<ellipse cx="60" cy="55" rx="24" ry="27" fill="' + haut + '"/>';
    // Haare vorne
    var vorne = {
      kurz: '<path d="M35 52 C33 30 47 23 60 23 C75 23 88 31 85 52 C80 41 72 37 61 37 C49 37 40 41 35 52 Z" fill="' + haare + '"/>',
      lang: '<path d="M35 54 C33 30 47 22 60 22 C75 22 88 31 85 54 C81 40 70 33 60 36 C52 38 44 40 35 54 Z" fill="' + haare + '"/>',
      zopf: '<path d="M35 52 C33 30 47 23 60 23 C75 23 88 31 85 52 C80 40 70 36 60 37 C50 37 41 41 35 52 Z" fill="' + haare + '"/>',
      dutt: '<circle cx="60" cy="22" r="11" fill="' + haare + '"/><path d="M35 52 C33 31 47 26 60 26 C75 26 88 32 85 52 C80 41 72 38 61 38 C49 38 40 41 35 52 Z" fill="' + haare + '"/>',
      locken: [[40, 40, 10], [50, 31, 11], [62, 28, 12], [74, 32, 11], [82, 42, 9], [36, 50, 7], [86, 52, 7]].map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="' + haare + '"/>'; }).join(''),
      glatze: '<path d="M36 56 C35 46 38 42 40 41 L41 56 Z M84 56 C85 46 82 42 80 41 L79 56 Z" fill="' + haare + '"/>',
      kopftuch: '<path d="M33 60 C30 28 46 18 60 18 C76 18 92 28 87 60 C86 76 80 88 72 92 L48 92 C40 88 34 76 33 60 Z M38 58 C38 70 46 80 60 80 C74 80 82 70 82 58 C82 44 72 36 60 36 C48 36 38 44 38 58 Z" fill-rule="evenodd" fill="' + (a.tuch || haare) + '"/>'
    };
    s += vorne[fris] || vorne.kurz;
    // Gesicht
    s += '<path d="M46 49 Q51 46 55 49 M65 49 Q69 46 74 49" stroke="' + (fris === 'glatze' || fris === 'kopftuch' ? '#3b2a20' : haare) + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    s += '<circle cx="51" cy="57" r="2.8" fill="#1f2937"/><circle cx="69" cy="57" r="2.8" fill="#1f2937"/>';
    s += '<circle cx="45" cy="66" r="4.5" fill="#ff7a7a" opacity=".18"/><circle cx="75" cy="66" r="4.5" fill="#ff7a7a" opacity=".18"/>';
    s += '<path d="M60 58 Q62 64 58 66" stroke="#000" stroke-opacity=".18" stroke-width="2" fill="none" stroke-linecap="round"/>';
    var mund = {
      freundlich: '<path d="M52 71 Q60 78 68 71" stroke="#7a2e2e" stroke-width="2.6" fill="none" stroke-linecap="round"/>',
      froh: '<path d="M51 70 Q60 82 69 70 Z" fill="#7a2e2e"/><path d="M54 71 Q60 74 66 71" fill="#fff"/>',
      nachdenklich: '<path d="M53 73 Q59 71 67 74" stroke="#7a2e2e" stroke-width="2.6" fill="none" stroke-linecap="round"/>',
      ernst: '<path d="M53 73 L67 73" stroke="#7a2e2e" stroke-width="2.6" stroke-linecap="round"/>',
      ueberrascht: '<ellipse cx="60" cy="73" rx="4" ry="5" fill="#7a2e2e"/>'
    };
    s += mund[aus] || mund.freundlich;
    if (a.bart) s += '<path d="M38 62 C40 84 50 90 60 90 C70 90 80 84 82 62 C78 72 72 76 60 76 C48 76 42 72 38 62 Z M52 72 Q60 76 68 72 L68 75 Q60 79 52 75 Z" fill="' + haare + '" fill-rule="evenodd"/>';
    if (a.brille) s += '<g fill="none" stroke="#1f2937" stroke-width="2"><rect x="42" y="51" width="16" height="12" rx="5"/><rect x="62" y="51" width="16" height="12" rx="5"/><path d="M58 56 L62 56"/></g>';
    return s + '</svg>';
  }

  /* ---------- Kulissen (Farben: --k1 hinten, --k2 Mitte, --k3 vorne) ---------- */
  var KULISSEN = {
    buero: function () {
      var s = '';
      s += '<rect x="80" y="40" width="300" height="190" rx="10" fill="var(--k1)"/><path d="M230 40 V230 M80 135 H380" stroke="var(--k2)" stroke-width="8"/>';
      s += '<circle cx="520" cy="90" r="34" fill="none" stroke="var(--k2)" stroke-width="8"/><path d="M520 90 V68 M520 90 L536 100" stroke="var(--k2)" stroke-width="6" stroke-linecap="round"/>';
      s += '<rect x="700" y="60" width="300" height="12" fill="var(--k2)"/><rect x="700" y="150" width="300" height="12" fill="var(--k2)"/>';
      [0, 1, 2, 3, 4, 5, 6].forEach(function (i) { s += '<rect x="' + (712 + i * 40) + '" y="' + (78 + (i % 3) * 4) + '" width="28" height="' + (72 - (i % 3) * 4) + '" rx="3" fill="var(--k1)"/>'; });
      [0, 1, 2, 3].forEach(function (i) { s += '<rect x="' + (716 + i * 62) + '" y="170" width="48" height="60" rx="4" fill="var(--k1)"/>'; });
      s += '<path d="M1090 300 C1060 230 1080 170 1110 150 C1130 190 1140 250 1110 300 Z M1110 300 C1140 240 1170 220 1190 214 C1186 260 1160 290 1124 304 Z" fill="var(--k2)"/><rect x="1080" y="296" width="60" height="64" rx="8" fill="var(--k3)"/>';
      s += '<rect x="0" y="300" width="1200" height="60" fill="var(--k3)"/>';
      return s;
    },
    lager: function () {
      var s = '';
      [0, 1, 2].forEach(function (r) {
        var x = 60 + r * 380;
        s += '<rect x="' + x + '" y="30" width="12" height="300" fill="var(--k2)"/><rect x="' + (x + 300) + '" y="30" width="12" height="300" fill="var(--k2)"/>';
        [90, 180, 270].forEach(function (y) { s += '<rect x="' + x + '" y="' + y + '" width="312" height="10" fill="var(--k2)"/>'; });
        [40, 130, 220].forEach(function (y, k) { [0, 1, 2, 3].forEach(function (b) { if ((b + k + r) % 4 !== 3) s += '<rect x="' + (x + 22 + b * 70) + '" y="' + (y + 10 + ((b + k) % 2) * 8) + '" width="58" height="' + (40 - ((b + k) % 2) * 8) + '" rx="3" fill="var(--k1)"/>'; }); });
      });
      return s + '<rect x="0" y="320" width="1200" height="40" fill="var(--k3)"/>';
    },
    werkstatt: function () {
      var s = '<rect x="100" y="40" width="560" height="200" rx="8" fill="var(--k1)"/>';
      for (var i = 0; i < 12; i++) for (var j = 0; j < 4; j++) s += '<circle cx="' + (130 + i * 45) + '" cy="' + (70 + j * 45) + '" r="4" fill="var(--k2)"/>';
      s += '<path d="M180 80 l20 20 l-6 6 l-20 -20 z M200 100 l40 70" stroke="var(--k2)" stroke-width="12" stroke-linecap="round"/>';
      s += '<rect x="320" y="70" width="18" height="120" rx="6" fill="var(--k2)"/><rect x="300" y="70" width="58" height="24" rx="6" fill="var(--k2)"/>';
      s += '<circle cx="480" cy="120" r="40" fill="none" stroke="var(--k2)" stroke-width="12"/><rect x="560" y="80" width="60" height="110" rx="10" fill="var(--k2)"/>';
      s += '<rect x="760" y="120" width="360" height="24" fill="var(--k2)"/><rect x="790" y="144" width="18" height="160" fill="var(--k2)"/><rect x="1070" y="144" width="18" height="160" fill="var(--k2)"/>';
      s += '<rect x="820" y="80" width="90" height="40" rx="6" fill="var(--k1)"/><rect x="940" y="60" width="40" height="60" rx="6" fill="var(--k1)"/>';
      return s + '<rect x="0" y="304" width="1200" height="56" fill="var(--k3)"/>';
    },
    serverraum: function () {
      var s = '';
      [0, 1, 2, 3, 4].forEach(function (r) {
        var x = 70 + r * 220;
        s += '<rect x="' + x + '" y="30" width="170" height="290" rx="8" fill="var(--k2)"/>';
        for (var j = 0; j < 9; j++) {
          s += '<rect x="' + (x + 14) + '" y="' + (46 + j * 29) + '" width="142" height="20" rx="3" fill="var(--k1)"/>';
          s += '<circle cx="' + (x + 28) + '" cy="' + (56 + j * 29) + '" r="3.5" fill="' + ((j + r) % 3 ? 'var(--k3)' : '#5eead4') + '"/>';
          s += '<circle cx="' + (x + 40) + '" cy="' + (56 + j * 29) + '" r="3.5" fill="' + ((j * r) % 4 ? 'var(--k3)' : '#fcd34d') + '"/>';
        }
      });
      return s + '<rect x="0" y="320" width="1200" height="40" fill="var(--k3)"/>';
    },
    laden: function () {
      var s = '<path d="M60 40 H1140 L1110 100 H90 Z" fill="var(--k2)"/>';
      for (var i = 0; i < 18; i++) s += '<path d="M' + (90 + i * 57) + ' 100 q28 30 57 0" fill="' + (i % 2 ? 'var(--k1)' : 'var(--k2)') + '"/>';
      [0, 1].forEach(function (r) { var x = 120 + r * 640; [150, 220].forEach(function (y) { s += '<rect x="' + x + '" y="' + y + '" width="320" height="8" fill="var(--k2)"/>'; for (var k = 0; k < 7; k++) s += '<rect x="' + (x + 10 + k * 44) + '" y="' + (y - 34 + (k % 2) * 8) + '" width="30" height="' + (34 - (k % 2) * 8) + '" rx="4" fill="var(--k1)"/>'; }); });
      s += '<rect x="480" y="230" width="240" height="90" rx="10" fill="var(--k2)"/><rect x="560" y="200" width="80" height="34" rx="6" fill="var(--k1)"/>';
      return s + '<rect x="0" y="320" width="1200" height="40" fill="var(--k3)"/>';
    },
    stadt: function () {
      var s = '', hs = [[40, 140, 120], [170, 80, 90], [270, 180, 140], [420, 60, 110], [540, 130, 100], [650, 30, 130], [790, 150, 90], [890, 90, 120], [1020, 120, 140]];
      hs.forEach(function (h, i) {
        s += '<rect x="' + h[0] + '" y="' + h[1] + '" width="' + h[2] + '" height="' + (330 - h[1]) + '" fill="' + (i % 2 ? 'var(--k1)' : 'var(--k2)') + '"/>';
        for (var y = h[1] + 20; y < 300; y += 34) for (var x = h[0] + 16; x < h[0] + h[2] - 20; x += 30) if ((x + y + i) % 3) s += '<rect x="' + x + '" y="' + y + '" width="14" height="18" fill="var(--k3)" opacity=".55"/>';
      });
      return s + '<rect x="0" y="326" width="1200" height="34" fill="var(--k3)"/>';
    },
    natur: function () {
      var s = '<circle cx="980" cy="90" r="50" fill="var(--k1)"/>';
      s += '<path d="M0 250 C200 170 380 200 560 240 C760 190 960 160 1200 230 V360 H0 Z" fill="var(--k1)"/>';
      s += '<path d="M0 300 C240 250 460 290 700 300 C900 270 1060 260 1200 290 V360 H0 Z" fill="var(--k2)"/>';
      [[150, 240], [260, 260], [820, 250], [930, 270], [1080, 255]].forEach(function (t) { s += '<rect x="' + (t[0] - 6) + '" y="' + t[1] + '" width="12" height="40" fill="var(--k3)"/><circle cx="' + t[0] + '" cy="' + (t[1] - 20) + '" r="34" fill="var(--k3)"/>'; });
      return s;
    },
    klasse: function () {
      var s = '<rect x="260" y="40" width="680" height="200" rx="10" fill="var(--k2)"/><rect x="280" y="58" width="640" height="164" rx="6" fill="var(--k1)"/>';
      s += '<path d="M330 120 h120 M330 150 h200 M330 180 h160" stroke="var(--k2)" stroke-width="8" stroke-linecap="round"/>';
      s += '<rect x="60" y="80" width="140" height="160" rx="8" fill="var(--k1)"/><path d="M130 80 V240 M60 160 H200" stroke="var(--k2)" stroke-width="6"/>';
      return s + '<rect x="0" y="300" width="1200" height="60" fill="var(--k3)"/>';
    }
  };
  function kulisse(name) {
    var f = KULISSEN[name] || KULISSEN.buero;
    return '<svg class="kit-kulisse" viewBox="0 0 1200 360" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' + f() + '</svg>';
  }

  /* ---------- Szene mit Personen ---------- */
  function szene(box, opt) {
    opt = opt || {};
    var P = window.PAKET || {};
    var k = opt.kulisse || (P.welt && P.welt.kulisse) || 'buero';
    var s = el('div', { class: 'kit-szene', style: { minHeight: (opt.hoehe || 340) + 'px' } });
    s.innerHTML = kulisse(k);
    var ebene = el('div', { class: 'kit-ebene' });
    s.appendChild(ebene);
    box.appendChild(s);
    return {
      el: s, ebene: ebene,
      person: function (key, o) {
        o = o || {};
        var d = figurDaten(key);
        var p = el('div', { class: 'kit-person' + (o.rechts !== undefined ? ' rechts' : ''), style: { left: o.links !== undefined ? o.links : null, right: o.rechts !== undefined ? o.rechts : null, width: (o.groesse || 130) + 'px' } });
        var fig = el('div', { class: 'kit-person-bild', html: figur(key, o) });
        var name = el('div', { class: 'kit-person-name', text: d.name || '' });
        var blase = el('div', { class: 'kit-blase', 'aria-live': 'polite', hidden: true });
        p.appendChild(blase); p.appendChild(fig); p.appendChild(name);
        ebene.appendChild(p);
        var api = {
          el: p,
          sage: function (text, aus) { blase.hidden = !text; blase.innerHTML = text || ''; if (aus) fig.innerHTML = figur(key, { ausdruck: aus }); blase.classList.remove('neu'); void blase.offsetWidth; blase.classList.add('neu'); return api; },
          ausdruck: function (aus) { fig.innerHTML = figur(key, { ausdruck: aus }); return api; },
          weg: function () { p.remove(); }
        };
        if (o.text) api.sage(o.text);
        return api;
      },
      ding: function (node, o) { o = o || {}; var w = el('div', { class: 'kit-ding', style: { left: o.links, top: o.oben, right: o.rechts, bottom: o.unten, width: o.breite } }, node); ebene.appendChild(w); return w; }
    };
  }

  /* ---------- Dialog mit Antwortknöpfen ---------- */
  // opt: {figur, schritte: [{sagt} | {frage, antworten: [{text, richtig, reaktion}]}], fertig}
  function dialog(box, opt) {
    var wrap = el('div', { class: 'kit-dialog' });
    var verlauf = el('div', { class: 'kit-verlauf', 'aria-live': 'polite' });
    var wahl = el('div', { class: 'kit-wahl' });
    wrap.appendChild(verlauf); wrap.appendChild(wahl); box.appendChild(wrap);
    var d = figurDaten(opt.figur), i = 0, fehler = 0;
    // Im Fenster des Rechners rollt der Inhalt: nach jeder Zeile ans Ende, damit die Antworten zu sehen sind
    function nachUnten() { var f = wrap.closest ? wrap.closest('.kit-fensterinhalt') : null; if (f) f.scrollTop = f.scrollHeight; }
    function zeile(text, wer) {
      var z = el('div', { class: 'kit-zeile ' + (wer === 'ich' ? 'ich' : 'sie') });
      if (wer !== 'ich') z.appendChild(el('div', { class: 'kit-mini', html: figur(opt.figur) }));
      z.appendChild(el('div', { class: 'kit-sprech', html: (wer !== 'ich' && d.name ? '<b>' + esc(d.name) + '</b><br>' : '') + text }));
      verlauf.appendChild(z);
      verlauf.scrollTop = verlauf.scrollHeight;
      nachUnten();
    }
    function weiter() {
      wahl.innerHTML = '';
      var s = opt.schritte[i];
      if (!s) { if (opt.fertig) opt.fertig(fehler); return; }
      if (s.sagt) { zeile(s.sagt); i++; wahl.appendChild(el('button', { type: 'button', class: 'kit-weiter', text: s.knopf || 'Weiter', onclick: weiter })); return; }
      if (s.frage) zeile(s.frage);
      (s.mischen === false ? s.antworten : mischen(s.antworten)).forEach(function (a) {
        wahl.appendChild(el('button', { type: 'button', html: a.text, onclick: function () {
          zeile(a.text, 'ich');
          if (a.reaktion) zeile(a.reaktion);
          if (a.richtig) { i++; weiter(); } else { fehler++; }
        } }));
      });
      nachUnten();
    }
    weiter();
    return {
      loesen: function () { var n = 0; while (i < opt.schritte.length && n++ < 99) { var s = opt.schritte[i]; if (!s.sagt) { var r = s.antworten.filter(function (a) { return a.richtig; })[0]; zeile(r.text, 'ich'); if (r.reaktion) zeile(r.reaktion); } else zeile(s.sagt); i++; } wahl.innerHTML = ''; if (opt.fertig) opt.fertig(fehler); },
      fehler: function () { return fehler; }
    };
  }

  /* ---------- Rechner am Arbeitsplatz ---------- */
  function zwei(n) { return (n < 10 ? '0' : '') + n; }
  // Kürzel aus einem Namen („Katja Winter“ → „KW“) und eine feste Farbe dazu
  function kuerzel(name) { var w = String(name || '?').replace(/[^A-Za-zÄÖÜäöüß0-9 ]/g, ' ').trim().split(/\s+/); return ((w[0] || '?').charAt(0) + (w.length > 1 ? w[w.length - 1].charAt(0) : '')).toUpperCase(); }
  function farbton(text) { var h = 0; String(text || '').split('').forEach(function (c) { h = (h * 31 + c.charCodeAt(0)) % 360; }); return 'hsl(' + h + ',42%,40%)'; }

  // opt: {apps: [{id, name, symbol, start: function (fenster, os, daten)}], start: 'id', hinweis,
  //       hoehe: Höhe des ganzen Rechners mit Standfuß in px (Standard 380, damit er in eine Station passt;
  //              der Bildschirm wächst nicht mit, längere Inhalte rollen im Fenster wie in echt),
  //       uhr: '08:15', datum: '04.05.2026' (sonst die Zeit des Geräts), marke: 'Korbwerk' (erfundener Hersteller)}
  function computer(box, opt) {
    var pc = el('div', { class: 'kit-pc' });
    var jetzt = new Date();
    var schirm = el('div', { class: 'kit-schirm' });
    var fensterbox = el('div', { class: 'kit-fensterbox' });
    var dock = el('div', { class: 'kit-dock', role: 'toolbar', 'aria-label': 'Programme' });
    var uhr = el('div', { class: 'kit-uhr', 'aria-hidden': 'true' }, [
      el('span', { text: opt.uhr || zwei(jetzt.getHours()) + ':' + zwei(jetzt.getMinutes()) }),
      el('span', { text: opt.datum || zwei(jetzt.getDate()) + '.' + zwei(jetzt.getMonth() + 1) + '.' + jetzt.getFullYear() })]);
    schirm.appendChild(fensterbox);
    schirm.appendChild(el('div', { class: 'kit-taskleiste' }, [el('span', { class: 'kit-startknopf', 'aria-hidden': 'true' }), dock, uhr]));
    // Gehäuse: Rahmen mit Kamera, Bildschirm, Kinn mit Marke und Betriebsleuchte; darunter Standfuß und Tischkante
    pc.appendChild(el('div', { class: 'kit-monitor', style: { height: Math.max(220, (opt.hoehe || 380) - 26) + 'px' } }, [
      el('span', { class: 'kit-kamera', 'aria-hidden': 'true' }), schirm,
      el('div', { class: 'kit-kinn', 'aria-hidden': 'true' }, [el('span', { class: 'kit-marke', text: opt.marke || '' }), el('span', { class: 'kit-betrieb' })])]));
    pc.appendChild(el('div', { class: 'kit-pc-fuss', 'aria-hidden': 'true' }));
    box.appendChild(pc);
    var offen = null, knopf = {};
    function schreibtisch() {
      // Kein Fenster offen: Programme als Symbole auf dem Schreibtisch
      fensterbox.innerHTML = '';
      var d = el('div', { class: 'kit-desktop' });
      opt.apps.forEach(function (a) {
        d.appendChild(el('button', { type: 'button', class: 'kit-symbol', onclick: function () { os.oeffne(a.id); } }, [el('span', { class: 'kit-app-symbol', text: a.symbol || '▢' }), el('span', { class: 'kit-symbolname', text: a.name })]));
      });
      fensterbox.appendChild(d);
      fensterbox.appendChild(el('div', { class: 'kit-desktop-hinweis', text: opt.hinweis || 'Öffne ein Programm.' }));
    }
    var os = {
      oeffne: function (id, daten) {
        var app = opt.apps.filter(function (a) { return a.id === id; })[0];
        if (!app) return;
        fensterbox.innerHTML = '';
        Object.keys(knopf).forEach(function (k) { knopf[k].classList.toggle('aktiv', k === id); });
        var f = el('div', { class: 'kit-fenster', role: 'region', 'aria-label': app.name });
        // Die Fensterknöpfe gehören zum Bild eines Fensters, tun aber nichts: ruhig gehalten, nicht bedienbar
        f.appendChild(el('div', { class: 'kit-titelleiste' }, [el('span', { text: (app.symbol ? app.symbol + ' ' : '') + app.name }), el('span', { class: 'kit-punkte', 'aria-hidden': 'true' })]));
        var inhalt = el('div', { class: 'kit-fensterinhalt' });
        f.appendChild(inhalt); fensterbox.appendChild(f);
        offen = id;
        if (app.start) app.start(inhalt, os, daten);
      },
      offen: function () { return offen; }
    };
    opt.apps.forEach(function (a) {
      knopf[a.id] = el('button', { type: 'button', class: 'kit-app', 'aria-label': a.name, onclick: function () { os.oeffne(a.id); } }, [el('span', { class: 'kit-app-symbol', text: a.symbol || '▢' }), el('span', { class: 'kit-app-name', text: a.name })]);
      dock.appendChild(knopf[a.id]);
    });
    if (opt.start) os.oeffne(opt.start);
    else schreibtisch();
    return os;
  }

  // opt: {adresse: 'registerportal.uebung', seiten: {'/': function (seite, nav, daten) {...}}, start: '/', beiSeite,
  //       titel: 'Text im Reiter',
  //       portal: {name, unter, logo, menue: ['Suche', {text, pfad}], fuss}}   Gerüst der Webseite um jede Seite
  function browser(box, opt) {
    var verlaufListe = [], P = opt.portal;
    var fenster = box.closest ? box.closest('.kit-fenster') : null;
    if (fenster) fenster.classList.add('kit-mit-reiter');  // im Rechner ersetzt die Reiterzeile die Titelzeile
    var reiter = el('div', { class: 'kit-reiter', 'aria-hidden': 'true' }, [
      el('span', { class: 'kit-reiterkarte' }, [el('span', { class: 'kit-reitersymbol', html: (P && P.logo) || '' }), el('span', { class: 'kit-reitertitel', text: opt.titel || (P && P.name) || opt.adresse }), el('span', { class: 'kit-reiterzu', text: '×' })]),
      el('span', { class: 'kit-reiterplus', text: '+' }),
      fenster ? el('span', { class: 'kit-punkte' }) : null]);
    var leiste = el('div', { class: 'kit-browserleiste' });
    var zurueck = el('button', { type: 'button', class: 'kit-zurueck', 'aria-label': 'Zurück', text: '←', disabled: true });
    var adr = el('div', { class: 'kit-adresse', 'aria-label': 'Adresse' });
    leiste.appendChild(zurueck); leiste.appendChild(el('span', { class: 'kit-neuladen', 'aria-hidden': 'true', text: '⟳' })); leiste.appendChild(adr);
    var balken = el('div', { class: 'kit-ladebalken', 'aria-hidden': 'true' });
    var seite = el('div', { class: 'kit-seite' }), ansicht = seite;
    if (P) {
      var menue = el('div', { class: 'kit-portalmenue' });
      (P.menue || []).forEach(function (m) {
        menue.appendChild(typeof m === 'string' ? el('span', { text: m, 'aria-hidden': 'true' }) : el('button', { type: 'button', class: 'link', text: m.text, onclick: function () { nav(m.pfad); } }));
      });
      ansicht = el('div', { class: 'kit-portal' }, [
        el('div', { class: 'kit-portalkopf' }, [el('span', { class: 'kit-portallogo', 'aria-hidden': 'true', html: P.logo || '' }), el('span', { class: 'kit-portalname' }, [el('b', { text: P.name || opt.adresse }), P.unter ? el('small', { text: P.unter }) : null]), menue]),
        seite,
        el('div', { class: 'kit-portalfuss', html: P.fuss || 'Übungsversion' })]);
    }
    box.appendChild(reiter); box.appendChild(leiste); box.appendChild(balken); box.appendChild(ansicht);
    function nav(pfad, daten, ohneVerlauf) {
      var f = opt.seiten[pfad];
      if (!f) return;
      if (!ohneVerlauf) verlaufListe.push([pfad, daten]);
      zurueck.disabled = verlaufListe.length < 2;
      adr.innerHTML = '<span class="kit-schloss" aria-hidden="true">🔒</span> ' + esc(opt.adresse + (pfad === '/' ? '' : pfad));
      seite.innerHTML = '';
      ansicht.scrollTop = 0;
      if (verlaufListe.length > 1 || ohneVerlauf) { balken.classList.remove('laedt'); void balken.offsetWidth; balken.classList.add('laedt'); }  // kurzer Ladebalken als Folge des Klicks
      f(seite, nav, daten);
      if (opt.beiSeite) opt.beiSeite(pfad, daten);
    }
    zurueck.addEventListener('click', function () { if (verlaufListe.length < 2) return; verlaufListe.pop(); var v = verlaufListe[verlaufListe.length - 1]; nav(v[0], v[1], true); });
    nav(opt.start || '/');
    return { nav: nav, seite: function () { return verlaufListe.length ? verlaufListe[verlaufListe.length - 1][0] : null; } };
  }

  // opt: {mails: [{id, von, adresse, zeit, betreff, text, anhang: {name, groesse, oeffnen}, gelesen}], offen: id (gleich geöffnet),
  //       beiOeffnen: fn(mail), konto: 'Name des Postfachs', ordner: false (Ordnerspalte weglassen)}
  function mail(box, opt) {
    var w = el('div', { class: 'kit-mail' + (opt.ordner === false ? ' ohne-ordner' : '') });
    var liste = el('div', { class: 'kit-mailliste', role: 'list' });
    var lesen = el('div', { class: 'kit-mailtext', 'aria-live': 'polite', html: '<p class="kit-leer">Wähle links eine Nachricht.</p>' });
    var zahl = el('span', { class: 'kit-mailzahl' });
    function zaehle() { var n = liste.querySelectorAll('.neu').length; zahl.textContent = n || ''; zahl.hidden = !n; }
    if (opt.ordner !== false) {
      // Ordner gehören zum Bild eines Postfachs; gebraucht wird nur der Posteingang, der Rest ist ruhig und nicht bedienbar
      w.appendChild(el('div', { class: 'kit-mailordner', 'aria-hidden': 'true' }, [
        opt.konto ? el('div', { class: 'kit-mailkonto', text: opt.konto }) : null,
        el('div', { class: 'aktiv' }, [el('span', { text: '📥 Posteingang' }), zahl]),
        el('div', { text: '📤 Gesendet' }), el('div', { text: '📝 Entwürfe' }), el('div', { text: '🗑️ Papierkorb' })]));
    }
    w.appendChild(liste); w.appendChild(lesen); box.appendChild(w);
    function bild(m) { return el('span', { class: 'kit-mailbild', 'aria-hidden': 'true', text: kuerzel(m.von), style: { background: farbton(m.von) } }); }
    opt.mails.forEach(function (m) {
      var b = el('button', { type: 'button', class: 'kit-mailzeile' + (m.gelesen ? '' : ' neu'), role: 'listitem', onclick: function () {
        b.classList.remove('neu'); zaehle();
        liste.querySelectorAll('.aktiv').forEach(function (x) { x.classList.remove('aktiv'); });
        b.classList.add('aktiv');
        lesen.innerHTML = '';
        lesen.appendChild(el('div', { class: 'kit-mailkopf' }, [
          el('b', { text: m.betreff }),
          el('div', { class: 'kit-mailvon' }, [bild(m), el('span', { html: 'Von: ' + esc(m.von) + (m.adresse ? ' &lt;' + esc(m.adresse) + '&gt;' : '') + '<br>An: ' + esc(opt.konto || 'mich') }), m.zeit ? el('span', { class: 'kit-mailzeit', text: m.zeit }) : null])]));
        lesen.appendChild(el('div', { class: 'kit-mailinhalt', html: m.text }));
        if (m.anhang) {
          var art = (String(m.anhang.name).split('.').pop() || '').toUpperCase().slice(0, 4);
          var teile = [el('span', { class: 'kit-anhangart', text: art }), el('span', { class: 'kit-anhangname' }, [el('b', { text: m.anhang.name }), m.anhang.groesse ? el('small', { text: m.anhang.groesse }) : null])];
          // Nur ein Anhang, der sich öffnen lässt, ist ein Knopf
          lesen.appendChild(m.anhang.oeffnen ? el('button', { type: 'button', class: 'kit-anhang', 'aria-label': 'Anhang ' + m.anhang.name + ' öffnen', onclick: function () { m.anhang.oeffnen(); } }, teile) : el('div', { class: 'kit-anhang' }, teile));
        }
        if (opt.beiOeffnen) opt.beiOeffnen(m);
      } }, [bild(m), el('b', { text: m.von }), m.zeit ? el('span', { class: 'kit-mailzeit', text: m.zeit }) : null, el('span', { class: 'kit-mailbetreff', text: m.betreff })]);
      liste.appendChild(b);
      if (opt.offen && opt.offen === m.id) setTimeout(function () { b.click(); }, 0);
    });
    zaehle();
    return w;
  }

  // opt: {titel, art: 'vordruck' (Standard, Papier) | 'maske' (Programmfenster) | 'web' (Standard in einer Browser-Seite),
  //       kopf: html (Betrieb oder Behörde), nummer: 'Formular 12a', vermerk: 'Eingegangen' (Stempel oder Statuszeile nach dem Absenden),
  //       felder: [{id, label, typ: 'text'|'auswahl'|'zahl', optionen, platzhalter, richtig, hinweis, breite: 'halb'|'drittel', pflicht}
  //                | {abschnitt: 'Zwischenüberschrift'}],
  //       knopf, beiSenden: fn(werte, ergebnis), ohneRueckmeldung}
  function formular(box, opt) {
    var art = opt.art || (box.closest && box.closest('.kit-seite') ? 'web' : 'vordruck');
    var f = el('form', { class: 'kit-formular kit-form-' + art, novalidate: true });
    if (opt.kopf || opt.nummer) f.appendChild(el('div', { class: 'kit-formkopf' }, [el('div', { class: 'kit-formabsender', html: opt.kopf || '' }), opt.nummer ? el('div', { class: 'kit-formnummer', text: opt.nummer }) : null]));
    if (opt.titel) f.appendChild(el('div', { class: 'kit-formtitel', html: opt.titel }));
    var inputs = {}, felder = opt.felder.filter(function (fd) { return !fd.abschnitt; });
    var raster = el('div', { class: 'kit-formfelder' });
    opt.felder.forEach(function (fd) {
      if (fd.abschnitt) { raster.appendChild(el('div', { class: 'kit-formabschnitt', html: fd.abschnitt })); return; }
      var id = 'kitf-' + fd.id + '-' + Math.random().toString(36).slice(2, 6);
      var inp;
      if (fd.typ === 'auswahl') { inp = el('select', { id: id }, [el('option', { value: '', text: '– bitte wählen –' })].concat(fd.optionen.map(function (o) { return el('option', { value: o, text: o }); }))); }
      else inp = el('input', { id: id, type: 'text', inputmode: fd.typ === 'zahl' ? 'decimal' : null, placeholder: fd.platzhalter || '', autocomplete: 'off' });
      inputs[fd.id] = inp;
      raster.appendChild(el('div', { class: 'kit-feld' + (fd.breite ? ' ' + fd.breite : '') }, [el('label', { for: id, html: fd.label + (fd.pflicht ? ' <span class="kit-pflicht" title="Pflichtfeld">*</span>' : '') }), inp, el('div', { class: 'kit-feldhinweis', 'aria-live': 'polite' })]));
    });
    f.appendChild(raster);
    var status = el('div', { class: 'kit-formstatus', 'aria-live': 'polite', text: art === 'maske' ? 'Bereit' : '' });
    f.appendChild(el('div', { class: 'kit-formfuss' }, [el('button', { type: 'submit', class: 'kit-senden', text: opt.knopf || 'Absenden' }), status]));
    var abdruck = null;
    function melde(zustand, falsch) {
      // Sichtbare Folge des Absendens: Stempel auf dem Vordruck, Statuszeile in Maske und Webformular
      if (abdruck) { abdruck.remove(); abdruck = null; }
      var text = zustand === 'fehler' ? (falsch === 1 ? '1 Feld prüfen' : falsch + ' Felder prüfen') : zustand === 'ok' ? (opt.vermerk || (art === 'maske' ? 'Gespeichert' : art === 'web' ? 'Gesendet' : 'Eingegangen')) : (art === 'vordruck' ? 'Abgegeben' : 'Gespeichert');
      status.className = 'kit-formstatus ' + zustand;
      if (art === 'vordruck' && zustand !== 'fehler') {
        status.textContent = '';
        abdruck = el('div', { class: 'kit-stempel neu' + (zustand === 'ok' ? ' gruen' : ' blau'), text: text });
        f.appendChild(abdruck);
        status.appendChild(el('span', { class: 'kit-nurvorlesen', text: text }));
      } else status.textContent = (zustand === 'fehler' ? '' : '✓ ') + text;
    }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var werte = {}, erg = {}, falsch = 0;
      felder.forEach(function (fd) {
        var v = inputs[fd.id].value.trim(); werte[fd.id] = v;
        var ok = fd.richtig === undefined ? true : (typeof fd.richtig === 'function' ? fd.richtig(v) : [].concat(fd.richtig).some(function (r) { return String(r).toLowerCase() === v.toLowerCase(); }));
        erg[fd.id] = ok; if (!ok) falsch++;
        var feld = inputs[fd.id].parentNode;
        if (!opt.ohneRueckmeldung) {
          feld.classList.toggle('ok', ok); feld.classList.toggle('falsch', !ok);
          feld.querySelector('.kit-feldhinweis').innerHTML = ok ? '' : (fd.hinweis || 'Prüf das noch einmal.');
        }
      });
      melde(opt.ohneRueckmeldung ? 'abgegeben' : falsch ? 'fehler' : 'ok', falsch);
      if (opt.beiSenden) opt.beiSenden(werte, erg);
    });
    box.appendChild(f);
    return {
      el: f,
      setze: function (o) { Object.keys(o).forEach(function (k) { if (inputs[k]) inputs[k].value = o[k]; }); },
      sende: function () { f.dispatchEvent(new Event('submit', { cancelable: true })); },
      werte: function () { var o = {}; Object.keys(inputs).forEach(function (k) { o[k] = inputs[k].value.trim(); }); return o; }
    };
  }

  /* ---------- Dokument mit antippbaren Stellen ---------- */
  // Unterschrift als geschwungene Linie, aus dem Namen errechnet (immer gleich für denselben Namen):
  // je Wort eine hohe Schleife für den Großbuchstaben, dann flache, ungleiche Bögen, am Ende ein Unterstrich
  function schriftzug(name) {
    var x = 8, d = 'M8 26', worte = String(name || 'x').trim().split(/\s+/).slice(0, 3);
    function z(v) { return (Math.round(v * 10) / 10) + ' '; }
    worte.forEach(function (w, wi) {
      w.split('').slice(0, 7).forEach(function (c, i) {
        var n = c.charCodeAt(0) + wi * 7 + i * 3;
        if (i === 0) {
          var h = 17 + n % 6, b = 10 + n % 5;
          d += ' c' + z(b * .1) + z(-h) + z(b * .9) + z(-h) + z(b * .6) + z(-h * .35) + 'c' + z(-b * .3) + z(h * .5) + z(b * .1) + z(h * .45) + z(b * .4) + z(h * .35);
          x += b;
        } else {
          var h2 = 2 + n % 6, b2 = 4 + n % 5;
          d += ' q' + z(b2 * .4) + z(-h2 * 2) + z(b2 * .55) + z(-h2 * .4) + 't' + z(b2 * .45) + z(h2 * .4);
          x += b2;
        }
      });
      if (wi < worte.length - 1) { d += ' q3 2 6 -1'; x += 6; }
    });
    d += ' q8 -2 15 -7 M' + z(x + 12) + '30 Q' + z(x * .5) + '37 5 32';
    return '<svg viewBox="0 0 ' + Math.round(x + 24) + ' 40" width="' + Math.round(Math.min(200, (x + 24) * 1.3)) + '" height="' + Math.round(40 * Math.min(1.3, 200 / (x + 24))) + '" aria-hidden="true"><path d="' + d + '" fill="none" stroke="#1e3a8a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  // opt: {absender: {name, zeile, logo}, zeichen, datum (Briefkopf), kopf: html, titel, text: html (vor den Zeilen),
  //       zeilen: [{id, label, wert, nr, waehlbar}], nach: html (nach den Zeilen), unterschrift: 'Name' | {name, rolle},
  //       fuss: html, stempel: 'Text' (von Anfang an), beiWahl: fn(id, zeile, knopf), art}
  function dokument(box, opt) {
    var d = el('div', { class: 'kit-dok' + (opt.art ? ' ' + opt.art : '') });
    var A = opt.absender;
    if (A || opt.zeichen || opt.datum) {
      d.appendChild(el('div', { class: 'kit-briefkopf' }, [
        A ? el('span', { class: 'kit-brieflogo', 'aria-hidden': 'true', html: A.logo || esc(kuerzel(A.name)) }) : null,
        A ? el('span', { class: 'kit-briefabsender' }, [el('b', { text: A.name }), A.zeile ? el('small', { html: A.zeile }) : null]) : null,
        el('span', { class: 'kit-briefdaten', html: (opt.zeichen ? 'Zeichen: ' + esc(opt.zeichen) + '<br>' : '') + (opt.datum ? esc(opt.datum) : '') })]));
    }
    if (opt.kopf) d.appendChild(el('div', { class: 'kit-dokkopf', html: opt.kopf }));
    if (opt.titel) d.appendChild(el('div', { class: 'kit-doktitel', html: opt.titel }));
    if (opt.text) d.appendChild(el('div', { class: 'kit-doktext', html: opt.text }));
    var knoepfe = {};
    var tab = el('div', { class: 'kit-dokzeilen' });
    (opt.zeilen || []).forEach(function (z, i) {
      var inhalt = [el('span', { class: 'kit-doknr', text: z.nr || String(i + 1) }), el('span', { class: 'kit-doklabel', html: z.label }), el('span', { class: 'kit-dokwert', html: z.wert })];
      var zeile = opt.beiWahl && z.waehlbar !== false
        ? el('button', { type: 'button', class: 'kit-dokzeile', 'data-id': z.id, onclick: function () { opt.beiWahl(z.id, z, zeile); } }, inhalt)
        : el('div', { class: 'kit-dokzeile' }, inhalt);
      knoepfe[z.id] = zeile; tab.appendChild(zeile);
    });
    d.appendChild(tab);
    if (opt.nach) d.appendChild(el('div', { class: 'kit-doktext', html: opt.nach }));
    if (opt.unterschrift) {
      var u = typeof opt.unterschrift === 'string' ? { name: opt.unterschrift } : opt.unterschrift;
      d.appendChild(el('div', { class: 'kit-unterschrift' }, [el('span', { html: schriftzug(u.name) }), el('span', { class: 'kit-unterschrift-name', html: esc(u.name) + (u.rolle ? '<br><small>' + esc(u.rolle) + '</small>' : '') })]));
    }
    if (opt.fuss) d.appendChild(el('div', { class: 'kit-dokfuss', html: opt.fuss }));
    if (opt.stempel) d.appendChild(el('div', { class: 'kit-stempel', text: opt.stempel, 'aria-hidden': 'true' }));
    box.appendChild(d);
    return {
      el: d,
      markiere: function (id, art) { if (knoepfe[id]) { knoepfe[id].classList.remove('markiert', 'richtig', 'falsch'); if (art) knoepfe[id].classList.add(art); if (art === 'falsch') wackeln(knoepfe[id]); } },
      zeile: function (id) { return knoepfe[id]; },
      // Stempel als Folge einer Handlung aufdrücken. o: {farbe: 'rot'|'gruen'|'blau', oben: true}
      stemple: function (text, o) {
        o = o || {};
        var s = el('div', { class: 'kit-stempel neu' + (o.farbe && o.farbe !== 'rot' ? ' ' + o.farbe : '') + (o.oben ? ' oben' : ''), text: text, role: 'status' });
        d.appendChild(s);
        return s;
      }
    };
  }

  /* ---------- Sortieren: Karte antippen, dann Fach antippen ---------- */
  // opt: {karten: [{id, html, ziel, feedback}], faecher: [{id, titel, html}], sofort: true, beiFehler(karte, fach), fertig()}
  function sortieren(box, opt) {
    var wrap = el('div', { class: 'kit-sort' });
    var stapel = el('div', { class: 'kit-stapel', 'aria-label': 'Karten' });
    var faecher = el('div', { class: 'kit-faecher' });
    wrap.appendChild(stapel); wrap.appendChild(faecher); box.appendChild(wrap);
    var gewaehlt = null, lage = {}, kn = {}, fn = {};
    opt.karten.forEach(function (k) {
      var b = el('button', { type: 'button', class: 'kit-karte', 'aria-pressed': 'false', html: k.html, onclick: function () { waehle(k, b); } });
      kn[k.id] = b; stapel.appendChild(b);
    });
    opt.faecher.forEach(function (f) {
      var inhalt = el('div', { class: 'kit-fachinhalt' });
      var b = el('button', { type: 'button', class: 'kit-fach', onclick: function () { lege(f, inhalt); } }, [el('div', { class: 'kit-fachtitel', html: f.titel }), f.html ? el('div', { class: 'kit-fachhinweis', html: f.html }) : null]);
      var spalte = el('div', { class: 'kit-fachspalte' }, [b, inhalt]);
      fn[f.id] = inhalt; faecher.appendChild(spalte);
    });
    function waehle(k, b) {
      if (gewaehlt && gewaehlt.b === b) { b.classList.remove('gewaehlt'); b.setAttribute('aria-pressed', 'false'); gewaehlt = null; return; }
      if (gewaehlt) { gewaehlt.b.classList.remove('gewaehlt'); gewaehlt.b.setAttribute('aria-pressed', 'false'); }
      gewaehlt = { k: k, b: b }; b.classList.add('gewaehlt'); b.setAttribute('aria-pressed', 'true');
      wrap.classList.add('waehlt');
    }
    function lege(f, inhalt) {
      if (!gewaehlt) { wackeln(wrap.querySelector('.kit-stapel')); return; }
      var k = gewaehlt.k, b = gewaehlt.b;
      var ok = [].concat(k.ziel).indexOf(f.id) >= 0;
      if (opt.sofort !== false && !ok) { wackeln(b); if (opt.beiFehler) opt.beiFehler(k, f); return; }
      b.classList.remove('gewaehlt'); b.setAttribute('aria-pressed', 'false');
      inhalt.appendChild(b); lage[k.id] = f.id; gewaehlt = null; wrap.classList.remove('waehlt');
      if (opt.sofort !== false) { b.classList.add('richtig'); b.disabled = true; if (opt.beiRichtig) opt.beiRichtig(k, f); }
      if (Object.keys(lage).length === opt.karten.length && opt.fertig) opt.fertig(lage);
    }
    return {
      loesen: function () { opt.karten.forEach(function (k) { if (lage[k.id]) return; var f = opt.faecher.filter(function (x) { return [].concat(k.ziel).indexOf(x.id) >= 0; })[0]; waehle(k, kn[k.id]); lege(f, fn[f.id]); }); },
      lage: function () { return lage; },
      richtig: function () { return opt.karten.filter(function (k) { return [].concat(k.ziel).indexOf(lage[k.id]) >= 0; }).length; }
    };
  }

  /* ---------- Reihenfolge ---------- */
  // opt: {schritte: [html in richtiger Reihenfolge], fertig, beiFehler}
  function reihenfolge(box, opt) {
    var wrap = el('div', { class: 'kit-reihe' });
    var ziel = el('ol', { class: 'kit-reihe-ziel' });
    var pool = el('div', { class: 'kit-reihe-pool' });
    wrap.appendChild(ziel); wrap.appendChild(pool); box.appendChild(wrap);
    var n = 0, kn = [];
    opt.schritte.forEach(function (_, i) { ziel.appendChild(el('li', { class: 'kit-platz', html: '<span>' + (i + 1) + '</span>' })); });
    mischen(opt.schritte.map(function (s, i) { return { s: s, i: i }; })).forEach(function (x) {
      var b = el('button', { type: 'button', class: 'kit-karte', html: x.s, onclick: function () {
        if (x.i === n) { ziel.children[n].appendChild(b); b.disabled = true; b.classList.add('richtig'); n++; if (n === opt.schritte.length && opt.fertig) opt.fertig(); }
        else { wackeln(b); if (opt.beiFehler) opt.beiFehler(x.i, n); }
      } });
      kn[x.i] = b; pool.appendChild(b);
    });
    return { loesen: function () { while (n < opt.schritte.length) kn[n].click(); } };
  }

  /* ---------- Regler ---------- */
  // opt: {label, min, max, schritt, wert, einheit, format: fn, beiAenderung: fn(wert)}
  function regler(box, opt) {
    var id = 'kitr-' + Math.random().toString(36).slice(2, 7);
    var anzeige = el('output', { class: 'kit-reglerwert', for: id });
    var inp = el('input', { type: 'range', id: id, min: opt.min, max: opt.max, step: opt.schritt || 1, value: opt.wert !== undefined ? opt.wert : opt.min });
    var w = el('div', { class: 'kit-regler' }, [el('label', { for: id, html: opt.label }), inp, anzeige]);
    function upd() { var v = +inp.value; anzeige.textContent = (opt.format ? opt.format(v) : v) + (opt.einheit ? ' ' + opt.einheit : ''); if (opt.beiAenderung) opt.beiAenderung(v); }
    inp.addEventListener('input', upd);
    box.appendChild(w); upd();
    return { wert: function () { return +inp.value; }, setze: function (v) { inp.value = v; upd(); } };
  }

  window.KIT = {
    el: el, esc: esc, mischen: mischen, wackeln: wackeln,
    figur: figur, kulisse: kulisse, szene: szene, dialog: dialog,
    computer: computer, browser: browser, mail: mail, formular: formular,
    dokument: dokument, sortieren: sortieren, reihenfolge: reihenfolge, regler: regler,
    HAUT: HAUT, HAARE: HAARE
  };
})();
