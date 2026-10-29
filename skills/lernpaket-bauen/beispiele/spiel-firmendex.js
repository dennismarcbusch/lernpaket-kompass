/* =====================================================================
   „Firmendex“ – Das Handelsregister als Sammel- und Fangspiel
   Spielprinzip: In der Stadt leben Firmlinge (Unternehmen als Wesen).
   Man fängt sie mit dem richtigen Registerball (HRA/HRB) oder lässt sie
   frei, wenn sie in ein anderes Register gehören, trägt im Firmendex nur
   ein, was ins Register gehört, brütet im Amtsgericht Firmlinge aus
   (konstitutiv) oder macht bekannt, was es schon gibt (deklaratorisch),
   und besiegt am Ende den Rivalen mit den richtigen Argumenten.
   Lernstoff = Spielregeln. Alle Firmen und Personen sind erfunden.
   ===================================================================== */

/* ---------- Firmlinge ---------- */
// art: hra | hrb | frei (anderes Register)   attr: [Merkmal, Wert, steht im Register?]
var FIRMLINGE = {
  ostwind: { name: 'Ostwind Papier e. K.', rf: 'Einzelkauffrau (e. K.)', art: 'hra', farbe: '#60a5fa', symbol: '📄', lz: 'LZ2',
    attr: [['Firma', 'Ostwind Papier e. K.', 1], ['Sitz', 'Forchheim', 1], ['Inhaberin', 'Ayşe Kaya', 1], ['Umsatz', '380.000 €', 0], ['Mitarbeiter', '4', 0]],
    falsch: 'Ein e. K. ist ein Einzelunternehmen. Es gehört in Abteilung A.' },
  birkenhof: { name: 'Birkenhof Möbel KG', rf: 'Kommanditgesellschaft (KG)', art: 'hra', farbe: '#a16207', symbol: '🪑', lz: 'LZ2',
    attr: [['Firma', 'Birkenhof Möbel KG', 1], ['Sitz', 'Lichtenfels', 1], ['Kommanditistin', 'Petra Birkner, Einlage 20.000 €', 1], ['Gewinn', '45.000 €', 0], ['Handlungsvollmacht', 'Nina Brandt', 0]],
    falsch: 'Die KG ist eine Personengesellschaft. Sie gehört in Abteilung A.' },
  kernwerk: { name: 'Kernwerk Bürobedarf GmbH', rf: 'GmbH', art: 'hrb', farbe: '#14b8a6', symbol: '📎', lz: 'LZ2',
    attr: [['Firma', 'Kernwerk Bürobedarf GmbH', 1], ['Stammkapital', '25.000 €', 1], ['Geschäftsführerin', 'Sabine Kraus', 1], ['Umsatz', '2,1 Mio. €', 0], ['Kundenzahl', '1.400', 0]],
    falsch: 'Die GmbH ist eine Kapitalgesellschaft. Sie gehört in Abteilung B.' },
  robotics: { name: 'Obermain Robotics AG', rf: 'Aktiengesellschaft (AG)', art: 'hrb', farbe: '#818cf8', symbol: '🤖', lz: 'LZ2',
    attr: [['Firma', 'Obermain Robotics AG', 1], ['Grundkapital', '50.000 €', 1], ['Vorstand', 'Dr. Petra Vogt', 1], ['Prokura', 'Ole Okafor', 1], ['Mitarbeiter', '12', 0]],
    falsch: 'Die AG ist eine Kapitalgesellschaft. Sie gehört in Abteilung B.' },
  tsv: { name: 'TSV Ebersdorf e. V.', rf: 'eingetragener Verein (e. V.)', art: 'frei', farbe: '#f87171', symbol: '⚽', lz: 'LZ2',
    falsch: 'Vereine stehen im Vereinsregister, nicht im Handelsregister. Lass ihn frei.' },
  nordlicht: { name: 'Nordlicht Solar GmbH & Co. KG', rf: 'GmbH & Co. KG', art: 'hra', farbe: '#fbbf24', symbol: '☀️', lz: 'LZ2',
    attr: [['Firma', 'Nordlicht Solar GmbH & Co. KG', 1], ['Gegenstand', 'Bau von Solaranlagen', 1], ['Komplementärin', 'Nordlicht Verwaltungs GmbH', 1], ['Umsatz', '6,8 Mio. €', 0], ['Gewinn', '410.000 €', 0]],
    falsch: 'Eine GmbH & Co. KG ist eine KG – also Abteilung A. Die GmbH ist nur ihre Komplementärin.' },
  sonnenkraft: { name: 'Sonnenkraft Obermain eG', rf: 'eingetragene Genossenschaft (eG)', art: 'frei', farbe: '#a3e635', symbol: '🔋', lz: 'LZ2',
    falsch: 'Genossenschaften stehen im Genossenschaftsregister. Lass sie frei.' },
  // für Üben und Nachweis
  weber: { name: 'Weber & Söhne OHG', rf: 'Offene Handelsgesellschaft (OHG)', art: 'hra', farbe: '#fb923c', symbol: '🧱', lz: 'LZ2',
    attr: [['Firma', 'Weber & Söhne OHG', 1], ['Gesellschafter', 'Erika Weber, Paul Weber', 1], ['Sitz', 'Kulmbach', 1], ['Gewinn', '90.000 €', 0], ['Mitarbeiter', '9', 0]], falsch: 'Die OHG ist eine Personengesellschaft: Abteilung A.' },
  klickwerk: { name: 'Klickwerk UG (haftungsbeschränkt)', rf: 'UG (haftungsbeschränkt)', art: 'hrb', farbe: '#e879f9', symbol: '🖱️', lz: 'LZ2',
    attr: [['Firma', 'Klickwerk UG', 1], ['Stammkapital', '500 €', 1], ['Geschäftsführer', 'Deniz Schmitt', 1], ['Umsatz', '60.000 €', 0], ['Handlungsvollmacht', 'Jan Pohl', 0]], falsch: 'Die UG ist eine Form der GmbH, also Kapitalgesellschaft: Abteilung B.' },
  harmonie: { name: 'Musikverein Harmonie e. V.', rf: 'eingetragener Verein (e. V.)', art: 'frei', farbe: '#f472b6', symbol: '🎺', lz: 'LZ2', falsch: 'Vereine gehören ins Vereinsregister.' },
  mainblick: { name: 'Mainblick Immobilien GmbH & Co. KG', rf: 'GmbH & Co. KG', art: 'hra', farbe: '#38bdf8', symbol: '🏠', lz: 'LZ2', falsch: 'GmbH & Co. KG = KG = Abteilung A.' },
  frankenstahl: { name: 'Frankenstahl AG', rf: 'Aktiengesellschaft (AG)', art: 'hrb', farbe: '#94a3b8', symbol: '⚙️', lz: 'LZ2',
    attr: [['Firma', 'Frankenstahl AG', 1], ['Vorstand', 'Clara Hahn', 1], ['Grundkapital', '120.000 €', 1], ['Mitarbeiter', '210', 0], ['Umsatz', '48 Mio. €', 0]], falsch: 'Die AG ist eine Kapitalgesellschaft: Abteilung B.' }
};

/* ---------- Schatten im Osten: Was passiert durch die Eintragung? ---------- */
// siegel: k = schlüpft erst durch die Eintragung (konstitutiv) | d = gibt es schon, wird bekannt gemacht (deklaratorisch)
var SCHATTEN = {
  lindgruen: { name: 'Lindgrün Verpackung GmbH', farbe: '#4ade80', symbol: '📦', siegel: 'k', lz: 'LZ4', steck: 'GmbH in Gründung. Vertrag beim Notar unterschrieben, eingetragen ist noch nichts.',
    falsch: 'Eine GmbH gibt es erst ab der Eintragung. Vorher ist sie nur „in Gründung“ – die Eintragung lässt sie schlüpfen.' },
  fischer: { name: 'Fischer Großhandel e. K.', farbe: '#2563eb', symbol: '🚚', siegel: 'd', lz: 'LZ4', steck: 'Großhandel mit 40 Leuten und drei Lagern. Läuft seit Jahren, war nie eingetragen.',
    falsch: 'Ein Großhandel mit 40 Leuten ist längst ein kaufmännischer Betrieb (Istkaufmann). Herr Fischer ist schon Kaufmann – die Eintragung macht das nur bekannt.' },
  lenz: { name: 'Nähwerk Lenz e. K.', farbe: '#f472b6', symbol: '🧵', siegel: 'k', lz: 'LZ4', steck: 'Kleine Nähwerkstatt, nur die Inhaberin. Muss nicht ins Register – will aber freiwillig Kauffrau werden.',
    falsch: 'Ein Kleingewerbe wird erst durch die freiwillige Eintragung Kaufmann (Kannkaufmann). Die Wirkung entsteht mit der Eintragung.' },
  hartmann: { name: 'Hartmann Elektro GmbH', farbe: '#ef4444', symbol: '💡', siegel: 'd', lz: 'LZ5', steck: 'Gibt es seit 1998. Neu: Herr Okafor hat seit gestern Prokura.', lernt: 'Prokura',
    falsch: 'Die Prokura gilt, sobald sie erteilt ist. Die Eintragung macht sie nur bekannt.' },
  roth: { name: 'Roth Digital UG', farbe: '#c084fc', symbol: '💻', siegel: 'k', lz: 'LZ4', steck: 'UG in Gründung. Gesellschaftsvertrag ist unterschrieben, die Eintragung ist beantragt.',
    falsch: 'Auch die UG entsteht als Kapitalgesellschaft erst mit der Eintragung.' },
  kernwerkGF: { name: 'Kernwerk Bürobedarf GmbH', farbe: '#14b8a6', symbol: '📎', siegel: 'd', lz: 'LZ4', steck: 'Herr Demir ist seit letzter Woche neuer Geschäftsführer.',
    falsch: 'Herr Demir ist Geschäftsführer, seit er bestellt wurde. Die Eintragung macht den Wechsel nur bekannt.' },
  // Üben und Nachweis
  bohne: { name: 'Rösterei Bohne GmbH', farbe: '#92400e', symbol: '☕', siegel: 'k', lz: 'LZ4', steck: 'GmbH in Gründung, Stammkapital eingezahlt.', falsch: 'Die GmbH entsteht erst mit der Eintragung.' },
  dietz: { name: 'Autohaus Dietz e. K.', farbe: '#dc2626', symbol: '🚗', siegel: 'd', lz: 'LZ4', steck: 'Autohaus mit 25 Leuten, seit zehn Jahren am Markt, nie eingetragen.', falsch: 'Ein Autohaus dieser Größe ist schon kaufmännisch (Istkaufmann). Die Eintragung macht nur bekannt.' },
  honigtau: { name: 'Imkerei Honigtau e. K.', farbe: '#facc15', symbol: '🐝', siegel: 'k', lz: 'LZ4', steck: 'Kleine Imkerei im Nebenerwerb. Möchte freiwillig Kaufmann werden.', falsch: 'Kleingewerbe → Kaufmann erst durch die freiwillige Eintragung.' },
  hahnVorstand: { name: 'Frankenstahl AG', farbe: '#94a3b8', symbol: '⚙️', siegel: 'd', lz: 'LZ4', steck: 'Neue Vorständin seit letztem Monat bestellt.', falsch: 'Die Vorständin ist schon bestellt. Die Eintragung macht den Wechsel nur bekannt.' },
  ostwindPK: { name: 'Ostwind Papier e. K.', farbe: '#60a5fa', symbol: '📄', siegel: 'd', lz: 'LZ5', steck: 'Neu: Emre Kaya hat Prokura bekommen.', lernt: 'Prokura', falsch: 'Prokura gilt ab der Erteilung. Die Eintragung macht sie bekannt.' }
};

/* ---------- Duell-Argumente (LZ5, ein Mal LZ3) ---------- */
var ANGRIFFE = {
  grenze: { lz: 'LZ5', sagt: 'Mein Prokurist durfte intern nur bis 10.000 € kaufen. Die 50.000 € zahle ich nicht!',
    konter: [['📜 Prokura gilt nach außen immer voll', 1], ['🔔 Prokura gilt erst ab Eintragung', 0], ['🙈 Interne Grenzen stehen im Register', 0]],
    erkl: 'Eine Prokura gilt nach außen im vollen Umfang. Interne Grenzen zählen gegenüber dem Lieferanten nicht.' },
  abberufen: { lz: 'LZ5', sagt: 'Meine alte Geschäftsführerin war schon abberufen. Ihr Vertrag mit dir gilt nicht – auch wenn das noch nicht im Register steht!',
    konter: [['🛡️ Nicht eingetragen? Gilt nicht gegen mich!', 1], ['📄 Abberufung gilt sofort gegen alle', 0], ['✉️ Eine Rundmail an die Kunden reicht', 0]],
    erkl: 'Öffentlicher Glaube: Wer auf das Register vertraut, wird geschützt. Eine nicht eingetragene Änderung gilt ihm gegenüber nicht.' },
  hv: { lz: 'LZ5', sagt: 'Meine Verkäuferin hat Handlungsvollmacht – das kannst du im Register nachlesen!',
    konter: [['🚫 Handlungsvollmacht steht nie im Register', 1], ['🔵 Steht in Abteilung A', 0], ['🔴 Steht in Abteilung B', 0]],
    erkl: 'Nur die Prokura wird eingetragen. Die Handlungsvollmacht gilt auch ohne Eintragung und steht nicht im Register.' },
  umsatz: { lz: 'LZ3', sagt: 'Im Register sieht jeder unseren riesigen Umsatz. Da zittern alle!',
    konter: [['❓ Umsatz steht gar nicht im Register', 1], ['📈 Nur der Gewinn steht drin', 0], ['🔒 Nur Kaufleute dürfen ihn sehen', 0]],
    erkl: 'Umsatz und Gewinn werden nie eingetragen. Das Register zeigt die rechtlichen Verhältnisse.' },
  ausgeschieden: { lz: 'LZ5', sagt: 'Herr Kern ist bei uns seit zwei Jahren raus – steht längst im Register. Trotzdem hast du mit ihm Geschäfte gemacht. Pech für dich!',
    konter: [['📖 Stimmt – hätte ich nachgeschaut', 1], ['🛡️ Öffentlicher Glaube schützt mich immer', 0], ['📜 Er hatte doch Prokura', 0]],
    erkl: 'Steht eine Änderung längst im Register, muss man sie gegen sich gelten lassen. Geschützt ist nur, wer sich auf das Register verlassen konnte.' },
  form: { lz: 'LZ1', sagt: 'Meine Anmeldung habe ich einfach per E-Mail ans Gericht geschickt. Passt schon!',
    konter: [['🖋️ Nur elektronisch und öffentlich beglaubigt', 1], ['📧 E-Mail reicht, wenn sie signiert ist', 0], ['📮 Ein Brief wäre besser', 0]],
    erkl: 'Anmeldungen kommen elektronisch und öffentlich beglaubigt über einen Notar. Eine E-Mail oder ein Brief reicht nicht.' },
  widerruf: { lz: 'LZ5', sagt: 'Die Prokura von Herrn Wolf hatte ich widerrufen. Steht zwar noch im Register – aber sein Kauf bei dir gilt nicht!',
    konter: [['🛡️ Steht noch drin? Dann gilt sie für mich', 1], ['📄 Ein Widerruf gilt sofort gegen alle', 0], ['🔔 Prokura entsteht erst mit Eintragung', 0]],
    erkl: 'Der Widerruf ist nicht eingetragen. Wer gutgläubig auf das Register vertraut, wird geschützt – öffentlicher Glaube.' },
  grenze2: { lz: 'LZ5', sagt: 'Meine Prokuristin durfte nur Büromaterial kaufen – nicht den Firmenwagen bei dir!',
    konter: [['📜 Prokura gilt nach außen immer voll', 1], ['🙈 Interne Grenzen gelten auch für mich', 0], ['🚫 Prokura steht nicht im Register', 0]],
    erkl: 'Eine Prokura gilt nach außen im vollen Umfang. Interne Grenzen zählen gegenüber dem Händler nicht.' },
  einsicht: { lz: 'LZ1', sagt: 'Mein Registerauszug geht dich gar nichts an! Den dürfen nur meine Gesellschafter sehen.',
    konter: [['👀 Ins Register darf jeder schauen', 1], ['📝 Nur mit berechtigtem Interesse', 0], ['🏛️ Nur Gerichte dürfen das', 0]],
    erkl: 'Das Handelsregister ist öffentlich: Jeder darf einsehen, ohne Begründung.' }
};

/* ---------- Stil ---------- */
var DEX_CSS = '.fd{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 270px;gap:10px;background:#1e293b;border-radius:14px;padding:10px;color:#0f172a;min-height:560px;font-size:15px}' +
  '@media (max-width:900px){.fd{grid-template-columns:1fr}.fd-dex{max-height:none}}' +
  '.fd-welt{position:relative;background:#3f7d3a;border-radius:10px;overflow:hidden;outline:none;min-height:480px;display:flex;align-items:center;justify-content:center}.fd-welt:focus-visible{box-shadow:0 0 0 4px #fbbf24}' +
  '.fd-karte{display:grid;grid-template-columns:repeat(14,1fr);width:min(100%,720px);background:#3f7d3a}' +
  '.fd-t{aspect-ratio:1;position:relative;display:flex;align-items:center;justify-content:center;font-size:clamp(13px,2.2vw,26px);user-select:none;cursor:pointer}' +
  '.fd-t.weg{background:#e7d3a1}.fd-t.gras{background:repeating-linear-gradient(45deg,#6ea84a 0 6px,#79b552 6px 12px)}.fd-t.baum{background:#3f7d3a;cursor:default}.fd-t.wasser{background:#4fa3d9;cursor:default}' +
  '.fd-t.haus{background:#e7d3a1}.fd-t .haus{font-size:1.3em;filter:drop-shadow(0 2px 0 rgba(0,0,0,.3))}.fd-t .lbl{position:absolute;bottom:-1px;left:50%;transform:translateX(-50%);font-size:9px;font-weight:800;background:#0f172a;color:#fff;border-radius:3px;padding:0 3px;white-space:nowrap;z-index:2;font-family:var(--titel)}' +
  '.fd-t .busch{animation:fd-wackel 1s infinite}@keyframes fd-wackel{0%,100%{transform:rotate(0)}25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}' +
  '.fd-t .ich{width:92%;position:relative;z-index:3;animation:fd-hops .25s ease-out}@keyframes fd-hops{from{transform:translateY(-14%)}}' +
  '.fd-t .ich svg{display:block}.fd-tor{font-size:1.2em}' +
  '.fd-hud{position:absolute;left:8px;top:8px;display:flex;gap:6px;z-index:4;flex-wrap:wrap}.fd-hud span{background:rgba(15,23,42,.85);color:#fff;border-radius:999px;padding:2px 10px;font-weight:700;font-size:.8rem;font-family:var(--titel)}' +
  '.fd-pad{position:absolute;right:8px;bottom:8px;display:grid;grid-template-columns:repeat(3,40px);gap:3px;z-index:4}.fd-pad button{min-height:40px;padding:0;border-radius:8px;background:rgba(15,23,42,.75);color:#fff;border:0;font-size:1rem}' +
  '.fd-text{position:absolute;left:8px;right:8px;bottom:8px;z-index:6;background:#fff;border:4px solid #0f172a;border-radius:10px;padding:10px 12px;display:flex;gap:10px;align-items:flex-start;box-shadow:0 6px 0 rgba(0,0,0,.25);animation:fd-auf .2s ease-out}' +
  '@keyframes fd-auf{from{transform:translateY(20px);opacity:0}}.fd-text .fig{width:64px;flex:0 0 auto}.fd-text b{font-family:var(--titel)}.fd-text .wahl{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.fd-text button{min-height:42px}' +
  '.fd-kampf{position:absolute;inset:0;z-index:5;background:linear-gradient(#cfe9ff 0 55%,#9fd17a 55%);display:flex;flex-direction:column;animation:fd-blitz .5s}' +
  '@keyframes fd-blitz{0%{filter:brightness(4)}100%{filter:none}}' +
  '.fd-buehne{flex:1;position:relative;min-height:240px}.fd-dexkarte{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#dc2626;border-radius:14px;padding:10px 16px;display:flex;gap:12px;align-items:center;color:#fff;box-shadow:0 8px 0 rgba(0,0,0,.2);animation:fd-auf .3s}.fd-dexkarte svg{width:90px}.fd-dexkarte b{font-family:var(--titel);font-size:1.1rem}.fd-plattform{position:absolute;width:42%;height:34px;border-radius:50%;background:#6aa84f;box-shadow:inset 0 -6px 0 #4d8a36}' +
  '.fd-gegner{position:absolute;right:10%;top:12%;width:min(30%,170px);text-align:center}.fd-gegner svg{width:100%;display:block}' +
  '.fd-gegner.flieht{transition:all .5s;transform:translateX(120%);opacity:0}.fd-gegner.gefangen svg{transition:all .35s;transform:scale(.1);opacity:0}' +
  '.fd-info{position:absolute;left:4%;top:8%;background:#fff;border:3px solid #0f172a;border-radius:10px;padding:6px 10px;max-width:46%;box-shadow:4px 4px 0 rgba(0,0,0,.2)}.fd-info b{font-family:var(--titel)}.fd-info .rf{font-size:.85rem}' +
  '.fd-ich{position:absolute;left:8%;bottom:4%;width:min(22%,120px)}' +
  '.fd-ball{position:absolute;width:34px;height:34px;border-radius:50%;left:20%;bottom:30%;border:3px solid #0f172a;z-index:3;animation:fd-wurf .6s ease-in forwards}' +
  '.fd-ball::after{content:"";position:absolute;left:-3px;right:-3px;top:50%;height:3px;background:#0f172a}.fd-ball.hra{background:linear-gradient(#3b82f6 50%,#fff 50%)}.fd-ball.hrb{background:linear-gradient(#ef4444 50%,#fff 50%)}' +
  '@keyframes fd-wurf{to{left:78%;bottom:62%;transform:rotate(720deg)}}.fd-ball.wackelt{animation:fd-wurf .6s ease-in forwards,fd-ballw .45s .6s 3}@keyframes fd-ballw{0%,100%{rotate:0deg}30%{rotate:-25deg}70%{rotate:25deg}}' +
  '.fd-ball.prallt{animation:fd-wurf .6s ease-in forwards,fd-prall .5s .6s forwards}@keyframes fd-prall{to{left:60%;bottom:0;opacity:0}}' +
  '.fd-sterne{position:absolute;right:16%;top:18%;font-size:2rem;animation:fd-auf .4s}' +
  '.fd-unten{background:#0f172a;padding:10px;display:flex;flex-direction:column;gap:8px}' +
  '.fd-msg{background:#fff;border-radius:8px;padding:8px 12px;min-height:44px}.fd-msg b{font-family:var(--titel)}' +
  '.fd-wahl{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}.fd-wahl button{font-family:var(--titel);font-weight:800;min-height:50px;border-radius:12px;border:3px solid #fff;color:#fff;background:#334155;padding:4px 14px}' +
  '.fd-wahl .hra{background:#1d4ed8}.fd-wahl .hrb{background:#b91c1c}.fd-wahl .frei{background:#15803d}.fd-wahl .k{background:#7c2d12}.fd-wahl .d{background:#0e7490}.fd-wahl button:hover{filter:brightness(1.15)}' +
  '.fd-chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}.fd-chip{min-height:0;padding:6px 10px;border-radius:999px;border:2px dashed #94a3b8;background:#fff;color:#0f172a;font-size:.88rem;text-align:left}' +
  '.fd-chip b{font-family:var(--titel)}.fd-chip.an{border-style:solid;border-color:#16a34a;background:#dcfce7}.fd-chip.an::before{content:"✍️ "}' +
  '.fd-dex{background:#dc2626;border-radius:12px;padding:8px;color:#fff;display:flex;flex-direction:column;gap:6px;max-height:560px;overflow:auto}' +
  '.fd-dex h4{margin:0;font-family:var(--titel);display:flex;justify-content:space-between;align-items:center}.fd-dex .bild{background:#0f172a;border-radius:8px;padding:6px;display:grid;grid-template-columns:repeat(4,1fr);gap:4px}' +
  '.fd-slot{background:#1e293b;border-radius:6px;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:.7rem;color:#94a3b8;padding:2px;border:0;min-height:0;cursor:pointer}.fd-slot svg{width:100%}' +
  '.fd-slot.voll{background:#e2e8f0}.fd-slot.aktiv{outline:3px solid #fbbf24}' +
  '.fd-eintrag{background:#f8fafc;color:#0f172a;border-radius:8px;padding:8px 10px;font-size:.85rem}.fd-eintrag h5{margin:0 0 4px;font-family:var(--titel);font-size:.95rem}.fd-eintrag table{width:100%;border-collapse:collapse}.fd-eintrag td{border-top:1px solid #e2e8f0;padding:3px 2px;vertical-align:top}.fd-eintrag .geheim{color:#94a3b8;letter-spacing:2px}' +
  '.fd-badge{display:inline-block;border-radius:6px;padding:0 6px;font-size:.72rem;font-weight:800;color:#fff;margin-left:4px;font-family:var(--titel)}.fd-badge.hra{background:#1d4ed8}.fd-badge.hrb{background:#b91c1c}.fd-badge.k{background:#7c2d12}.fd-badge.d{background:#0e7490}' +
  '.fd-herzen{font-size:1.1rem;letter-spacing:2px}.fd-ziele{background:#fff;color:#0f172a;border-radius:8px;padding:6px 10px;font-size:.82rem}.fd-ziele{list-style:none;margin:0}.fd-ziele li{margin:2px 0}.fd-ziele .ok{color:#15803d;text-decoration:line-through}' +
  '.fd-ende{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:16px;text-align:center;flex:1}.fd-ende h3{margin:0;font-family:var(--titel)}.fd-ende button{font-family:var(--titel);font-weight:800;min-height:50px}' +
  '.fd.klein{grid-template-columns:1fr;min-height:0}.fd.klein .fd-kampf{position:relative;min-height:470px}';

/* ---------- Zeichnungen ---------- */
function firmlingSvg(f, opt) {
  opt = opt || {};
  var c = opt.schatten ? '#1f2937' : f.farbe, s = '<svg viewBox="0 0 100 100" role="img" aria-label="' + KIT.esc(opt.schatten ? 'unbekannter Schatten' : f.name) + '">';
  if (opt.ei) {
    s += '<ellipse cx="50" cy="58" rx="30" ry="38" fill="#fff7ed" stroke="#0f172a" stroke-width="3"/><circle cx="40" cy="45" r="6" fill="' + f.farbe + '"/><circle cx="62" cy="66" r="8" fill="' + f.farbe + '"/><circle cx="45" cy="78" r="4" fill="' + f.farbe + '"/>';
    if (opt.riss) s += '<path d="M24 55 L36 48 L44 58 L54 46 L64 57 L76 50" stroke="#0f172a" stroke-width="3" fill="none"/>';
    return s + '</svg>';
  }
  s += '<ellipse cx="50" cy="93" rx="28" ry="5" fill="rgba(0,0,0,.18)"/>';
  s += '<path d="M18 62 C14 30 34 14 50 14 C66 14 86 30 82 62 C80 82 66 90 50 90 C34 90 20 82 18 62 Z" fill="' + c + '" stroke="#0f172a" stroke-width="3"/>';
  s += '<path d="M24 26 L16 8 L36 18 Z M76 26 L84 8 L64 18 Z" fill="' + c + '" stroke="#0f172a" stroke-width="3" stroke-linejoin="round"/>';
  if (!opt.schatten) s += '<ellipse cx="50" cy="66" rx="20" ry="16" fill="rgba(255,255,255,.55)"/>';
  s += '<circle cx="38" cy="44" r="7" fill="#fff" stroke="#0f172a" stroke-width="2"/><circle cx="62" cy="44" r="7" fill="#fff" stroke="#0f172a" stroke-width="2"/>';
  s += '<circle cx="' + (opt.schatten ? 38 : 39) + '" cy="45" r="3.5" fill="#0f172a"/><circle cx="' + (opt.schatten ? 62 : 63) + '" cy="45" r="3.5" fill="#0f172a"/>';
  s += opt.schatten ? '<text x="50" y="76" font-size="22" text-anchor="middle" fill="#fbbf24" font-weight="800">?</text>' : '<path d="M42 54 Q50 60 58 54" stroke="#0f172a" stroke-width="2.5" fill="none" stroke-linecap="round"/><text x="50" y="76" font-size="16" text-anchor="middle">' + f.symbol + '</text>';
  return s + '</svg>';
}
var ICH = { name: 'Du', aussehen: { haut: 2, haare: 'braun', frisur: 'kurz', kleidung: '#dc2626' } };
var LINDE = { name: 'Professorin Linde', aussehen: { haut: 1, haare: 'weiss', frisur: 'dutt', kleidung: '#166534', brille: true } };
var REX = { name: 'Rivale Rex', aussehen: { haut: 3, haare: 'schwarz', frisur: 'locken', kleidung: '#7c3aed' } };
var NOTARIN = { name: 'Notarin Wolf', aussehen: { haut: 0, haare: 'rot', frisur: 'lang', kleidung: '#1f2937', brille: true } };
var MIA = { name: 'Mia', aussehen: { haut: 4, haare: 'schwarz', frisur: 'zopf', kleidung: '#f59e0b' } };

/* ---------- Begegnungen: die Spielmechanik, auch für Üben und Nachweis ----------
   schritt: { art: 'ball', id } | { art: 'siegel', id } | { art: 'duell', ids:[…] }
   opt: { pruefung, beglaubigt(): bool, fertig(ok, info), flucht() } */
function begegnung(buehne, schritt, opt) {
  var E = KIT.el;
  var k = E('div', { class: 'fd-kampf', role: 'dialog', 'aria-label': 'Begegnung' });
  buehne.appendChild(k);
  var feld = E('div', { class: 'fd-buehne' }), unten = E('div', { class: 'fd-unten' }), msg = E('div', { class: 'fd-msg', 'aria-live': 'polite' }), wahl = E('div', { class: 'fd-wahl' });
  feld.appendChild(E('div', { class: 'fd-plattform', style: { right: '4%', top: '38%' } }));
  feld.appendChild(E('div', { class: 'fd-plattform', style: { left: '2%', bottom: '2%' } }));
  k.appendChild(feld); unten.appendChild(msg); unten.appendChild(wahl); k.appendChild(unten);
  var fehler = 0, info = { fehler: 0 };
  function sage(html) { msg.innerHTML = html; }
  function knoepfe(liste) { wahl.innerHTML = ''; liste.forEach(function (b) { if (b) wahl.appendChild(E('button', { type: 'button', class: b[2] || '', 'data-wahl': b[0], text: b[1], onclick: function () { b[3](); } })); }); var f1 = wahl.querySelector('button'); if (f1) f1.focus(); }
  function schliessen(ok) { info.fehler = fehler; setTimeout(function () { k.remove(); opt.fertig(ok, info); }, opt.pruefung ? 250 : 0); }
  feld.appendChild(E('div', { class: 'fd-ich', html: KIT.figur(ICH.aussehen, { ausdruck: 'froh' }) }));

  if (schritt.art === 'ball') {
    var f = FIRMLINGE[schritt.id];
    var geg = E('div', { class: 'fd-gegner', html: firmlingSvg(f) }); feld.appendChild(geg);
    feld.appendChild(E('div', { class: 'fd-info', html: '<b>' + KIT.esc(f.name) + '</b><div class="rf">Rechtsform: ' + KIT.esc(f.rf) + '</div>' }));
    sage('Ein wilder Firmling erscheint! Welcher Registerball passt?');
    var wirf = function (ball) {
      wahl.innerHTML = '';
      var b = E('div', { class: 'fd-ball ' + ball }); feld.appendChild(b);
      if (opt.beglaubigt && !opt.beglaubigt()) {
        b.classList.add('prallt');
        sage('<b>Der Ball prallt ab!</b> Er ist nicht beglaubigt. Registerbälle wirken nur, wenn ein Notar sie <b>öffentlich beglaubigt</b> hat – sonst könnte jeder fremde Firmen eintragen.');
        setTimeout(function () { b.remove(); knoepfe([['flucht', '🏃 Zurück in die Stadt', '', function () { k.remove(); if (opt.flucht) opt.flucht(); }]]); }, 900);
        return;
      }
      var richtig = ball === f.art;
      if (opt.pruefung) { info.wahl = ball; b.classList.add(richtig ? 'wackelt' : 'prallt'); setTimeout(function () { geg.classList.add(richtig ? 'gefangen' : 'flieht'); }, 600); return setTimeout(function () { dexOderEnde(richtig); }, 1100); }
      b.classList.add(richtig ? 'wackelt' : 'prallt');
      setTimeout(function () {
        if (richtig) { geg.classList.add('gefangen'); feld.appendChild(E('div', { class: 'fd-sterne', text: '✨✨✨' })); }
        setTimeout(function () {
          b.remove();
          if (richtig) { sage('<b>Gefangen!</b> ' + KIT.esc(f.name) + ' gehört in ' + (ball === 'hra' ? 'Abteilung A (HRA)' : 'Abteilung B (HRB)') + '.'); setTimeout(function () { dexOderEnde(true); }, 900); }
          else { fehler++; sage('<b>' + KIT.esc(f.name) + ' bricht aus!</b> ' + f.falsch); knoepfe(baelle()); }
        }, 700);
      }, richtig ? 1900 : 900);
    };
    var frei = function () {
      wahl.innerHTML = '';
      var richtig = f.art === 'frei';
      if (opt.pruefung) { info.wahl = 'frei'; geg.classList.add('flieht'); return setTimeout(function () { dexOderEnde(richtig, true); }, 600); }
      if (richtig) { geg.classList.add('flieht'); sage('<b>Richtig!</b> ' + KIT.esc(f.name) + ' hüpft zufrieden davon – ' + (/Verein/.test(f.rf) ? 'Vereine stehen im Vereinsregister.' : 'Genossenschaften stehen im Genossenschaftsregister.')); setTimeout(function () { schliessen(true); }, 1500); }
      else { fehler++; sage('<b>Halt!</b> Dieser Firmling gehört ins Handelsregister. ' + f.falsch); knoepfe(baelle()); }
    };
    var baelle = function () { return [['hra', '🔵 HRA-Ball', 'hra', function () { wirf('hra'); }], ['hrb', '🔴 HRB-Ball', 'hrb', function () { wirf('hrb'); }], ['frei', '🍃 Freilassen (anderes Register)', 'frei', frei], opt.flucht ? ['flucht', '🏃 Weg', '', function () { k.remove(); opt.flucht(); }] : null]; };
    knoepfe(baelle());
    // Dex-Eintrag: nur eintragen, was ins Register gehört (LZ3)
    var dexOderEnde = function (gefangen, freigelassen) {
      info.gefangen = gefangen;
      // im Nachweis kommt der Dex-Eintrag immer (eigener Prüfpunkt), sonst nur nach dem Fang
      if (!f.attr || freigelassen || (!gefangen && !opt.pruefung)) return schliessen(gefangen);
      feld.innerHTML = '';
      feld.appendChild(E('div', { class: 'fd-dexkarte' }, [E('div', { html: firmlingSvg(f) }), E('div', {}, [E('div', { text: '📕 Neuer Eintrag' }), E('b', { text: f.name }), E('div', { html: '<span class="fd-badge ' + f.art + '">' + f.art.toUpperCase() + '</span>' })])]));
      sage('<b>Firmendex-Eintrag für ' + KIT.esc(f.name) + '</b><br>Tippe an, was ins Handelsregister kommt. Der Rest bleibt geheim.');
      var an = {}, chips = E('div', { class: 'fd-chips' });
      f.attr.forEach(function (a, i) {
        var c = E('button', { type: 'button', class: 'fd-chip', 'data-i': i, 'aria-pressed': 'false', html: '<b>' + KIT.esc(a[0]) + ':</b> ' + KIT.esc(a[1]), onclick: function () { an[i] = !an[i]; c.classList.toggle('an', !!an[i]); c.setAttribute('aria-pressed', an[i] ? 'true' : 'false'); } });
        chips.appendChild(c);
      });
      wahl.innerHTML = ''; unten.insertBefore(chips, wahl);
      var speichern = function () {
        var falschRein = f.attr.filter(function (a, i) { return an[i] && !a[2]; }), fehlt = f.attr.filter(function (a, i) { return !an[i] && a[2]; });
        info.dexOk = !falschRein.length && !fehlt.length;
        if (opt.pruefung) return schliessen(info.gefangen);
        if (info.dexOk) { sage('<b>Eintrag gespeichert!</b> Was nicht im Register steht, zeigt dein Dex als ???.'); wahl.innerHTML = ''; return setTimeout(function () { schliessen(true); }, 1200); }
        fehler++;
        sage((falschRein.length ? '<b>' + falschRein.map(function (a) { return KIT.esc(a[0]); }).join(', ') + '</b> ' + (falschRein.length > 1 ? 'gehören' : 'gehört') + ' nicht ins Register – Geschäftszahlen und Handlungsvollmachten bleiben draußen. ' : '') + (fehlt.length ? 'Es fehlt noch etwas, das eingetragen wird: Firma, Sitz, Gegenstand, Kapital, Gesellschafter, Vertretung und Prokura stehen im Register.' : ''));
      };
      knoepfe([['speichern', '💾 Eintrag speichern', 'hra', speichern]]);
    };
    // Musterlösung ohne Animation (für den automatischen Test)
    info.loese = function () { info.wahl = f.art; info.gefangen = f.art !== 'frei'; info.dexOk = !!f.attr; k.remove(); opt.fertig(true, info); };
  }

  if (schritt.art === 'siegel') {
    var s = SCHATTEN[schritt.id];
    var g2 = E('div', { class: 'fd-gegner', html: firmlingSvg(s, { schatten: true }) }); feld.appendChild(g2);
    feld.appendChild(E('div', { class: 'fd-info', html: '<b>' + KIT.esc(s.name) + '</b><div class="rf">' + KIT.esc(s.steck) + '</div>' }));
    sage('Ein Schatten! Welches Siegel bekommt die Eintragung?');
    var siegel = function (w) {
      wahl.innerHTML = '';
      var richtig = w === s.siegel;
      if (opt.pruefung) { info.wahl = w; return schliessen(richtig); }
      if (!richtig) { fehler++; sage('<b>Das Siegel passt nicht.</b> ' + s.falsch); return knoepfe(siegelKnoepfe()); }
      if (w === 'k') {
        g2.innerHTML = firmlingSvg(s, { ei: true }); sage('Das Ei wackelt …');
        setTimeout(function () { g2.innerHTML = firmlingSvg(s, { ei: true, riss: true }); }, 600);
        setTimeout(function () { g2.innerHTML = firmlingSvg(s); feld.appendChild(E('div', { class: 'fd-sterne', text: '🐣✨' })); sage('<b>Geschlüpft!</b> ' + KIT.esc(s.name) + ' gibt es erst durch die Eintragung – <b>konstitutiv</b>.'); }, 1300);
      } else {
        g2.innerHTML = firmlingSvg(s); feld.appendChild(E('div', { class: 'fd-sterne', text: '🔔' }));
        sage('<b>Bekannt gemacht!</b> ' + KIT.esc(s.name) + ' gab es schon – die Eintragung zeigt es allen: <b>deklaratorisch</b>.' + (s.lernt ? ' ' + KIT.esc(s.name.split(' ')[0]) + ' kann jetzt <b>' + s.lernt + '</b> – und alle können es nachlesen.' : ''));
      }
      setTimeout(function () { schliessen(true); }, w === 'k' ? 2700 : 2000);
    };
    var siegelKnoepfe = function () { return [['k', '🥚 Schlüpft erst durch die Eintragung', 'k', function () { siegel('k'); }], ['d', '🔔 Gibt es schon – wird bekannt gemacht', 'd', function () { siegel('d'); }], opt.flucht ? ['flucht', '🏃 Weg', '', function () { k.remove(); opt.flucht(); }] : null]; };
    knoepfe(siegelKnoepfe());
    info.loese = function () { info.wahl = s.siegel; k.remove(); opt.fertig(true, info); };
  }

  if (schritt.art === 'duell') {
    var ids = schritt.ids, runde = 0, ichHP = 3, ihmHP = ids.length, treffer = [];
    var rex = E('div', { class: 'fd-gegner', html: KIT.figur(REX.aussehen, { ausdruck: 'ernst' }) }); feld.appendChild(rex);
    var hp = E('div', { class: 'fd-info' }); feld.appendChild(hp);
    var zeigHP = function () { hp.innerHTML = '<b>' + REX.name + '</b> <span class="fd-herzen">' + '💜'.repeat(ihmHP) + '🤍'.repeat(ids.length - ihmHP) + '</span>' + (opt.pruefung ? '' : '<div class="rf">Du: <span class="fd-herzen">' + '❤️'.repeat(ichHP) + '🤍'.repeat(3 - ichHP) + '</span></div>'); };
    var zug = function () {
      zeigHP();
      if (ihmHP <= 0 || runde >= ids.length) {
        if (opt.pruefung) { info.treffer = treffer; return schliessen(true); }
        rex.innerHTML = KIT.figur(REX.aussehen, { ausdruck: 'nachdenklich' });
        sage('<b>Rex gibt auf:</b> „Okay, du kennst das Register besser als ich.“'); wahl.innerHTML = '';
        return setTimeout(function () { schliessen(true); }, 1800);
      }
      if (ichHP <= 0) { sage('<b>Du hast keine Herzen mehr.</b> Rex grinst. Probier es gleich noch einmal!'); return knoepfe([['nochmal', '↺ Duell neu starten', 'hra', function () { runde = 0; ichHP = 3; ihmHP = ids.length; treffer = []; rex.innerHTML = KIT.figur(REX.aussehen, { ausdruck: 'ernst' }); zug(); }]]); }
      var A = ANGRIFFE[ids[runde]];
      sage('<b>Rex:</b> „' + A.sagt + '“');
      knoepfe(KIT.mischen(A.konter.slice()).map(function (c) { return [c[0], c[0], '', function () { kontra(c); }]; }));
    };
    var kontra = function (c) {
      var A = ANGRIFFE[ids[runde]], ok = !!c[1];
      treffer.push({ id: ids[runde], ok: ok });
      wahl.innerHTML = '';
      if (opt.pruefung) { runde++; if (ok) ihmHP--; return setTimeout(zug, 200); }
      if (ok) { ihmHP--; runde++; KIT.wackeln(rex); sage('<b>Volltreffer!</b> ' + A.erkl); }
      else { ichHP--; fehler++; sage('<b>Rex kontert!</b> ' + A.erkl + ' <i>Das kostet ein Herz – gleiche Runde noch einmal.</i>'); }
      zeigHP();
      knoepfe([['weiter', 'Weiter ▶', 'hra', zug]]);
    };
    zug();
    info.loese = function () {
      while (runde < ids.length) { treffer.push({ id: ids[runde], ok: true }); ihmHP--; runde++; }
      info.treffer = treffer; k.remove(); opt.fertig(true, info);
    };
  }
  return info;
}

/* ---------- Die Stadt: Karte, Figuren, Ablauf der zwei Level ---------- */
var KARTE = [
  'tttttttttttttt',
  'tP..gg..tgg.At',
  't...gg..tgg..t',
  'tgg.....t...Rt',
  'tgg..K..X....t',
  't....N..tgg..t',
  'tgg..ww.tgg..t',
  'tgg..ww.t....t',
  'tttttttttttttt'
];
var ORTE1 = { ostwind: [1, 4], birkenhof: [2, 5], kernwerk: [3, 2], robotics: [4, 1], tsv: [6, 2], nordlicht: [7, 1], sonnenkraft: [3, 1] };
var ORTE2 = { lindgruen: [1, 9], fischer: [1, 10], lenz: [2, 10], hartmann: [5, 9], roth: [5, 10], kernwerkGF: [6, 10] };
var DUELL = ['grenze', 'abberufen', 'hv', 'umsatz'];

function firmendexSpiel(box, api) {
  var E = KIT.el;
  if (!document.getElementById('fd-css')) { var st = document.createElement('style'); st.id = 'fd-css'; st.textContent = DEX_CSS; document.head.appendChild(st); }
  var Z = api.speicher('z') || { f: [], n: 0, m: 0, r: 0 };   // f: erledigte Firmlinge/Schatten, n: Notar, m: Mia gefragt, r: Rivale besiegt
  var pos = [2, 2], blick = null, offen = null, auswahl = null;
  var wurzel = E('div', { class: 'fd' }); box.innerHTML = ''; box.appendChild(wurzel);
  var welt = E('div', { class: 'fd-welt', tabindex: '0', 'aria-label': 'Stadtkarte. Mit den Pfeiltasten laufen oder auf ein Feld tippen.' });
  var dex = E('div', { class: 'fd-dex', 'aria-label': 'Firmendex' });
  wurzel.appendChild(welt); wurzel.appendChild(dex);
  function sichern() { api.speicher('z', Z); }
  function erledigt(id) { return Z.f.indexOf(id) >= 0; }
  function level1Fertig() { return Object.keys(ORTE1).every(erledigt) && Z.m; }
  function level2Fertig() { return Object.keys(ORTE2).every(erledigt) && Z.r; }
  function torOffen() { return level1Fertig(); }
  function zelle(r, c) {
    var ch = KARTE[r][c];
    if (ch === 'X' && torOffen()) return '.';
    return ch;
  }
  function begehbar(r, c) { var ch = zelle(r, c); return ch === '.' || ch === 'g'; }
  function spotAuf(r, c) {
    var alle = [[ORTE1, 1], [ORTE2, 2]], treffer = null;
    alle.forEach(function (o) { Object.keys(o[0]).forEach(function (id) { var p = o[0][id]; if (p[0] === r && p[1] === c && !erledigt(id) && (o[1] === 1 || torOffen())) treffer = { id: id, level: o[1] }; }); });
    return treffer;
  }

  function zeichneKarte() {
    welt.innerHTML = '';
    var hud = E('div', { class: 'fd-hud' }, [E('span', { text: Z.n ? '🔵🔴 Bälle beglaubigt ✓' : '🔵🔴 Bälle: nicht beglaubigt' }), E('span', { text: '📕 ' + Z.f.length + ' Einträge' })]);
    welt.appendChild(hud);
    var g = E('div', { class: 'fd-karte' });
    KARTE.forEach(function (zeile, r) {
      zeile.split('').forEach(function (_, c) {
        var ch = zelle(r, c), t = E('div', { class: 'fd-t', 'data-r': r, 'data-c': c, onclick: function () { tippe(r, c); } });
        var cls = { '.': 'weg', g: 'gras', t: 'baum', w: 'wasser' }[ch] || 'haus';
        t.classList.add(cls);
        if (ch === 't') t.textContent = (r + c) % 3 ? '🌳' : '🌲';
        if (ch === 'w') t.textContent = c % 2 ? '〰️' : '';
        var hausInfo = { P: ['🏡', 'Labor'], N: ['🏛️', 'Notarin'], A: ['⚖️', 'Amtsgericht'], K: ['', 'Mia'], R: ['', 'Rex'], X: ['🚧', 'Tor'] }[ch];
        if (hausInfo) {
          if (ch === 'K' || ch === 'R') t.appendChild(E('div', { class: 'ich', html: KIT.figur((ch === 'K' ? MIA : REX).aussehen) }));
          else t.appendChild(E('span', { class: ch === 'X' ? 'fd-tor' : 'haus', text: hausInfo[0] }));
          t.appendChild(E('span', { class: 'lbl', text: hausInfo[1] }));
        }
        var sp = spotAuf(r, c);
        if (sp) t.appendChild(E('span', { class: 'busch', text: sp.level === 1 ? '❗' : '❓', title: 'Hier raschelt etwas' }));
        if (r === pos[0] && c === pos[1]) t.appendChild(E('div', { class: 'ich', html: KIT.figur(ICH.aussehen) }));
        g.appendChild(t);
      });
    });
    welt.appendChild(g);
    var pad = E('div', { class: 'fd-pad', 'aria-label': 'Steuerkreuz' });
    [['', ''], ['↑', [-1, 0]], ['', ''], ['←', [0, -1]], ['', ''], ['→', [0, 1]], ['', ''], ['↓', [1, 0]], ['', '']].forEach(function (p) {
      pad.appendChild(p[0] ? E('button', { type: 'button', 'aria-label': 'Laufen ' + p[0], text: p[0], onclick: function () { schritt(p[1][0], p[1][1]); } }) : E('span'));
    });
    welt.appendChild(pad);
    if (offen) welt.appendChild(offen);
  }
  function zeichneDex() {
    dex.innerHTML = '';
    var alle = Object.keys(ORTE1).concat(Object.keys(ORTE2));
    dex.appendChild(E('h4', {}, [E('span', { text: '📕 Firmendex' }), E('span', { text: Z.f.length + ' / ' + alle.length })]));
    var bild = E('div', { class: 'bild' });
    alle.forEach(function (id, i) {
      var f = FIRMLINGE[id] || SCHATTEN[id], da = erledigt(id);
      bild.appendChild(E('button', { type: 'button', class: 'fd-slot' + (da ? ' voll' : '') + (auswahl === id ? ' aktiv' : ''), 'aria-label': da ? f.name : 'noch unbekannt', html: da ? firmlingSvg(f) : '#' + (i + 1 < 10 ? '00' : '0') + (i + 1), onclick: function () { if (da) { auswahl = id; zeichneDex(); } } }));
    });
    dex.appendChild(bild);
    if (auswahl) dex.appendChild(eintrag(auswahl));
    var ziele = E('ul', { class: 'fd-ziele' });
    var z1 = [['Bälle beim Notar beglaubigen lassen', Z.n], ['Alle ❗-Firmlinge im Westen', Object.keys(ORTE1).every(erledigt)], ['Mias Frage beantworten', Z.m]];
    var z2 = [['Alle ❓-Schatten im Osten', Object.keys(ORTE2).every(erledigt)], ['Rivale Rex im Duell besiegen', Z.r]];
    (torOffen() ? [['Level 1 geschafft – das Tor ist offen', 1]].concat(z2) : z1).forEach(function (z) { ziele.appendChild(E('li', { class: z[1] ? 'ok' : '', text: (z[1] ? '✔ ' : '○ ') + z[0] })); });
    dex.appendChild(E('div', {}, [E('b', { text: torOffen() ? '🎯 Level 2 · Das Amtsgericht' : '🎯 Level 1 · Die Firmlinge der Stadt' })]));
    dex.appendChild(ziele);
  }
  function eintrag(id) {
    var f = FIRMLINGE[id], s = SCHATTEN[id], d = E('div', { class: 'fd-eintrag' });
    if (f) {
      d.appendChild(E('h5', { html: KIT.esc(f.name) + (f.art === 'frei' ? ' <span class="fd-badge d">anderes Register</span>' : ' <span class="fd-badge ' + f.art + '">' + f.art.toUpperCase() + '</span>') }));
      if (f.attr) { var tb = E('table'); f.attr.forEach(function (a) { tb.appendChild(E('tr', {}, [E('td', { text: a[0] }), E('td', a[2] ? { text: a[1] } : { class: 'geheim', text: '???' })])); }); d.appendChild(tb); }
      else d.appendChild(E('div', { text: /Verein/.test(f.rf) ? 'Steht im Vereinsregister.' : 'Steht im Genossenschaftsregister.' }));
    } else {
      d.appendChild(E('h5', { html: KIT.esc(s.name) + ' <span class="fd-badge ' + s.siegel + '">' + (s.siegel === 'k' ? '🥚 konstitutiv' : '🔔 deklaratorisch') + '</span>' }));
      d.appendChild(E('div', { text: s.steck }));
    }
    return d;
  }
  function textbox(wer, html, knoepfe, danach) {
    offen = E('div', { class: 'fd-text', role: 'dialog' }, [E('div', { class: 'fig', html: KIT.figur(wer.aussehen, { ausdruck: 'freundlich' }) }), E('div', {}, [E('b', { text: wer.name }), E('div', { html: html }), E('div', { class: 'wahl' }, (knoepfe || [['Weiter ▶', null]]).map(function (k) {
      return E('button', { type: 'button', 'data-wahl': k[2] || '', text: k[0], onclick: function () { offen = null; zeichneKarte(); if (k[1]) k[1](); else if (danach) danach(); welt.focus(); } });
    }))])]);
    zeichneKarte();
    var b = offen.querySelector('button'); if (b) b.focus();
  }
  // Bewegung
  function schritt(dr, dc) {
    if (offen || blick) return;
    var r = pos[0] + dr, c = pos[1] + dc;
    if (begehbar(r, c)) { pos = [r, c]; zeichneKarte(); var sp = spotAuf(r, c); if (sp) starteBegegnung(sp); }
    else sprich(zelle(r, c));
  }
  function tippe(r, c) {
    if (offen || blick) return;
    var ziel = begehbar(r, c) ? [r, c] : null, nachbar = null;
    if (!ziel) [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) { if (!nachbar && begehbar(r + d[0], c + d[1])) nachbar = [r + d[0], c + d[1]]; });
    var weg = pfad(pos, ziel || nachbar); if (!weg) return;
    var i = 0;
    (function geh() {
      if (offen || blick) return;
      if (i < weg.length) { pos = weg[i++]; zeichneKarte(); var sp = spotAuf(pos[0], pos[1]); if (sp) return starteBegegnung(sp); setTimeout(geh, 110); }
      else if (!ziel) sprich(zelle(r, c));
    })();
  }
  function pfad(a, b) {
    if (!b) return null; var key = function (p) { return p[0] + ',' + p[1]; }, vor = {}, q = [a]; vor[key(a)] = null;
    while (q.length) { var p = q.shift(); if (p[0] === b[0] && p[1] === b[1]) break; [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) { var n = [p[0] + d[0], p[1] + d[1]]; if (!(key(n) in vor) && begehbar(n[0], n[1])) { vor[key(n)] = p; q.push(n); } }); }
    if (!(key(b) in vor)) return null;
    var weg = [], p2 = b; while (p2 && key(p2) !== key(a)) { weg.unshift(p2); p2 = vor[key(p2)]; } return weg;
  }
  welt.addEventListener('keydown', function (e) { var d = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key]; if (d) { e.preventDefault(); schritt(d[0], d[1]); } });

  // Figuren und Orte
  function sprich(ch) {
    if (ch === 'P') textbox(LINDE, torOffen() ? 'Im Osten warten Schatten: Firmen, die eingetragen werden wollen. Entscheide, was die Eintragung bewirkt!' : 'Fang alle ❗-Firmlinge im Westen. 🔵 HRA-Ball oder 🔴 HRB-Ball – oder freilassen, wenn sie in ein anderes Register gehören.');
    if (ch === 'N') { if (Z.n) textbox(NOTARIN, 'Deine Bälle sind schon beglaubigt. Viel Erfolg!'); else textbox(NOTARIN, 'Ich beglaubige deine Registerbälle. Ohne <b>öffentliche Beglaubigung</b> nimmt das Registergericht nichts an.', [['🖋️ Bälle beglaubigen lassen', function () { Z.n = 1; sichern(); zeichneKarte(); zeichneDex(); }]]); }
    if (ch === 'K') {
      if (Z.m) return textbox(MIA, 'Danke noch mal! Ich hab bei Kernwerk bestellt.');
      if (!Z.f.length) return textbox(MIA, 'Fang erst ein paar Firmlinge – dann hab ich eine Frage an dich!');
      textbox(MIA, 'Darf ich in deinen Firmendex schauen? Ich will wissen, wer bei Kernwerk Geschäftsführerin ist. Ich bin aber keine Kauffrau …', [
        ['👀 Klar – reinschauen darf jeder', function () { Z.m = 1; sichern(); zeichneDex(); textbox(MIA, 'Super! Dann weiß ich, mit wem ich es zu tun habe. Das Register ist eben öffentlich.', null, pruefeLevel); }, 'ja'],
        ['📝 Nur mit berechtigtem Interesse', function () { textbox(LINDE, 'Nicht ganz: Das Handelsregister ist <b>öffentlich</b>. Jeder darf hineinschauen, ohne Grund. Frag Mia noch einmal!'); }, 'nein1'],
        ['🔒 Nur Kaufleute', function () { textbox(LINDE, 'Nicht ganz: <b>Jeder</b> darf ins Handelsregister schauen – Kunden, Lieferanten, auch Mia. Frag sie noch einmal!'); }, 'nein2']]);
    }
    if (ch === 'X') textbox(LINDE, 'Das Tor zum Amtsgericht öffnet sich, wenn du Level 1 geschafft hast.');
    if (ch === 'A') textbox(LINDE, 'Im Amtsgericht wird eingetragen. Manche Firmen <b>entstehen</b> erst dadurch (🥚), andere gab es schon – dann wird nur <b>bekannt gemacht</b> (🔔).');
    if (ch === 'R') {
      if (Z.r) return textbox(REX, 'Du schon wieder … Ich übe noch.');
      if (!Object.keys(ORTE2).every(erledigt)) return textbox(REX, 'Hol dir erst alle Schatten im Osten. Dann duellieren wir uns!');
      textbox(REX, 'Ich bin Rex, der Schlaumeier. Wetten, ich trickse dich mit dem Register aus?', [['⚔️ Duell!', function () { starteBegegnung({ duell: true }); }]]);
    }
  }
  function starteBegegnung(sp) {
    blick = true;
    var schritt = sp.duell ? { art: 'duell', ids: DUELL } : sp.level === 1 ? { art: 'ball', id: sp.id } : { art: 'siegel', id: sp.id };
    var inf = begegnung(welt, schritt, {
      beglaubigt: function () { return !!Z.n; },
      flucht: function () { blick = false; zeichneKarte(); welt.focus(); },
      fertig: function (ok) { blick = false; if (ok) { if (sp.duell) Z.r = 1; else Z.f.push(sp.id); auswahl = sp.duell ? auswahl : sp.id; sichern(); } zeichneKarte(); zeichneDex(); pruefeLevel(); welt.focus(); }
    });
    aktiv = inf;
  }
  var aktiv = null;
  function pruefeLevel() {
    if (level1Fertig() && !api.geschafft('S1')) { api.level('S1', 'Alle Firmlinge im Westen registriert.'); textbox(LINDE, '<b>Level 1 geschafft!</b> Das Tor nach Osten ist offen. Dort warten Schatten am Amtsgericht.'); }
    if (level2Fertig() && !api.geschafft('S2')) { api.level('S2', 'Alle Schatten eingetragen und Rex besiegt.'); textbox(LINDE, '<b>Level 2 geschafft!</b> Dein Firmendex ist komplett. Unten wartet die Zwischenbilanz, dann geht es weiter mit ② Üben.'); }
  }
  zeichneKarte(); zeichneDex();
  if (!Z.f.length && !Z.n) textbox(LINDE, 'Willkommen in Lichtenfels! Hier leben <b>Firmlinge</b>. Fang sie mit Registerbällen und trag sie in deinen Firmendex ein. Lauf mit den Pfeiltasten oder tippe auf ein Feld.', [['Los geht’s ▶', null]]);
  return {
    loesen: function () {
      offen = null; Z.n = 1; Z.m = 1; Z.r = 1;
      Object.keys(ORTE1).concat(Object.keys(ORTE2)).forEach(function (id) { if (!erledigt(id)) Z.f.push(id); });
      sichern(); zeichneKarte(); zeichneDex(); pruefeLevel(); offen = null; zeichneKarte();
    }
  };
}

/* ---------- Kurze Sequenzen für Üben und Nachweis ---------- */
function sequenz(schritte, opt) {
  return function (box, api) {
    var E = KIT.el, i = 0, fehler = 0, ergebnisse = [], aktiv = null;
    if (!document.getElementById('fd-css')) { var st = document.createElement('style'); st.id = 'fd-css'; st.textContent = DEX_CSS; document.head.appendChild(st); }
    var wurzel = E('div', { class: 'fd klein' }); box.appendChild(wurzel);
    var welt = E('div', { class: 'fd-welt', style: { background: 'transparent' } }); wurzel.appendChild(welt);
    function weiter() {
      welt.innerHTML = '';
      if (i >= schritte.length) return ende();
      var sch = schritte[i];
      aktiv = begegnung(welt, sch, { pruefung: opt.pruefung, fertig: function (ok, info) { ergebnisse.push({ schritt: sch, ok: ok, info: info }); fehler += info.fehler || 0; i++; weiter(); } });
    }
    function ende() {
      if (opt.pruefung) { welt.appendChild(E('div', { class: 'fd-ende' }, [E('h3', { text: 'Prüfung beendet' }), E('p', { text: 'Gib Teil A jetzt ab.' })])); return; }
      var ok = fehler <= (opt.maxFehler || 1);
      welt.appendChild(E('div', { class: 'fd-ende', style: { background: '#fff', borderRadius: '10px' } }, [E('h3', { text: ok ? '✔ Geschafft!' : 'Noch nicht ganz' }), E('p', { text: fehler + (fehler === 1 ? ' Fehlversuch.' : ' Fehlversuche.') + (ok ? '' : ' Höchstens ' + (opt.maxFehler || 1) + ' – probier es noch einmal.') }),
        ok ? null : E('button', { type: 'button', text: '↺ Noch einmal', onclick: function () { i = 0; fehler = 0; ergebnisse = []; weiter(); } })]));
      if (ok) api.erledigt(opt.text || 'Geschafft.');
    }
    weiter();
    return {
      loesen: function () { var n = 0; while (i < schritte.length && n++ < 50) aktiv.loese(); },
      ergebnisse: function () { return ergebnisse; }
    };
  };
}

var NACHWEIS_B = [
  { art: 'ball', id: 'weber' }, { art: 'ball', id: 'klickwerk' }, { art: 'ball', id: 'harmonie' }, { art: 'ball', id: 'frankenstahl' },
  { art: 'siegel', id: 'bohne' }, { art: 'siegel', id: 'dietz' }, { art: 'siegel', id: 'honigtau' }, { art: 'siegel', id: 'ostwindPK' },
  { art: 'duell', ids: ['ausgeschieden', 'einsicht', 'form', 'grenze'] }
];

window.PAKET = {
  id: 'wsk-handelsregister-dex',
  titel: 'Firmendex',
  untertitel: 'Das Handelsregister – fang sie dir alle!',
  version: '0.3',
  bestehen: 80,
  dauer: 'etwa 45 Minuten',
  welt: { thema: 'wirtschaft', kulisse: 'stadt', symbol: '📕' },
  figur: { name: 'Professorin Linde', rolle: 'Registerforscherin', aussehen: LINDE.aussehen },
  leitsituation: 'In Lichtenfels leben <b>Firmlinge</b>: Unternehmen, die ins Handelsregister wollen. Fang sie mit dem richtigen Registerball, füll deinen <b>Firmendex</b> und besiege am Ende Rivale Rex!',
  spielwelt: { titel: 'Firmendex – fang sie dir alle!', tab: 'Spielen', start: firmendexSpiel },

  stationen: [
    { id: 'S1', titel: 'Level 1 · Die Firmlinge der Stadt', lz: ['LZ1', 'LZ2', 'LZ3'], check: ['C1', 'C4', 'C5'],
      mitdenken: { auftrag: 'Erklär deinem Sitznachbarn, warum der Umsatz in deinem Dex immer „???“ bleibt.', muster: 'Das Handelsregister zeigt die rechtlichen Verhältnisse einer Firma: Firma, Sitz, Kapital, Vertretung. Geschäftszahlen wie Umsatz oder Gewinn werden nicht eingetragen.' } },
    { id: 'S2', titel: 'Level 2 · Das Amtsgericht', lz: ['LZ4', 'LZ5'], check: ['C7', 'C10', 'C12'],
      mitdenken: { auftrag: 'Zeichne auf Papier zwei Spalten: 🥚 „schlüpft erst durch die Eintragung“ und 🔔 „wird bekannt gemacht“. Sortiere alle Schatten aus Level 2 ein.', muster: '🥚 Lindgrün GmbH, Nähwerk Lenz, Roth Digital UG. 🔔 Fischer Großhandel, Prokura bei Hartmann, neuer Geschäftsführer bei Kernwerk.' } }
  ],

  uebungen: [
    { id: 'UE1', titel: 'Safari-Zone', lz: ['LZ2', 'LZ3'],
      auftrag: 'Fünf wilde Firmlinge hintereinander. Richtiger Ball – und ein sauberer Dex-Eintrag.',
      interaktion: sequenz([{ art: 'ball', id: 'mainblick' }, { art: 'ball', id: 'robotics' }, { art: 'ball', id: 'sonnenkraft' }, { art: 'ball', id: 'birkenhof' }, { art: 'ball', id: 'nordlicht' }], { maxFehler: 1, text: 'Alle Firmlinge sauber registriert.' }),
      tipps: ['Schau auf die Rechtsform, nicht auf den Namen.', 'GmbH, UG, AG → 🔴 HRB. e. K., OHG, KG (auch GmbH & Co. KG) → 🔵 HRA. Verein, eG → freilassen.', 'Im Dex: Firma, Sitz, Gegenstand, Kapital, Gesellschafter, Vertretung, Prokura. Nie: Umsatz, Gewinn, Mitarbeiter, Handlungsvollmacht.'],
      reflexion: { frage: 'Die Mainblick GmbH & Co. KG hat „GmbH“ im Namen. Warum trotzdem der blaue Ball?', muster: 'Maßgeblich ist die Rechtsform der Gesellschaft selbst: Sie ist eine KG, also eine Personengesellschaft (HRA). Die GmbH ist nur ihre Komplementärin.' } },
    { id: 'UE2', titel: 'Brutkasten', lz: ['LZ4'],
      auftrag: 'Fünf Schatten im Amtsgericht. Schlüpft etwas durch die Eintragung – oder gab es das schon?',
      interaktion: sequenz([{ art: 'siegel', id: 'fischer' }, { art: 'siegel', id: 'lenz' }, { art: 'siegel', id: 'hahnVorstand' }, { art: 'siegel', id: 'roth' }, { art: 'siegel', id: 'kernwerkGF' }], { maxFehler: 1, text: 'Alle Siegel richtig gesetzt.' }),
      tipps: ['Frag dich: Gibt es das schon, bevor gestempelt wird?', 'GmbH, UG und AG entstehen erst mit der Eintragung. Ein Kleingewerbe wird erst durch die freiwillige Eintragung Kaufmann.', 'Großbetriebe, Prokura und neue Geschäftsführer gibt es schon vorher – 🔔.'],
      reflexion: { frage: 'Fischer und Lenz werden beide „e. K.“. Warum bekommen sie verschiedene Siegel?', muster: 'Der Großhandel ist ein kaufmännischer Betrieb, Herr Fischer ist schon Kaufmann (deklaratorisch). Die kleine Nähwerkstatt wird erst durch die freiwillige Eintragung Kaufmann (konstitutiv).' } },
    { id: 'UE3', titel: 'Revanche gegen Rex', lz: ['LZ5'],
      auftrag: 'Rex hat neue Tricks gelernt. Kontere jeden mit dem richtigen Argument.',
      interaktion: sequenz([{ art: 'duell', ids: ['widerruf', 'grenze2', 'hv'] }], { maxFehler: 1, text: 'Rex ist geschlagen.' }),
      tipps: ['Was steht im Register – und was nicht?', 'Eine nicht eingetragene Änderung gilt gegenüber Gutgläubigen nicht.', 'Prokura: nach außen immer voll. Handlungsvollmacht: wird nie eingetragen.'],
      reflexion: { frage: 'Warum lohnt es sich für einen Händler, vor einem großen Geschäft ins Register zu schauen?', muster: 'Er sieht, wer die Firma vertreten darf. Auf das, was dort steht, darf er sich verlassen – Änderungen, die fehlen, gelten ihm gegenüber nicht.' } }
  ],

  nachweis: {
    dauer: '15 Minuten',
    gewichtA: 50,
    einleitung: 'Die große Firmendex-Prüfung! Diesmal <b>ohne Hinweise</b>: Was du entscheidest, gilt. Ich schaue mir dein Ergebnis am Ende an.',
    teilA: {
      titel: 'Die große Firmendex-Prüfung',
      auftrag: 'Vier Firmlinge, vier Schatten, ein letztes Duell gegen Rex. Entscheide jedes Mal so, wie es das Register verlangt.',
      interaktion: function (box) {
        var lauf = sequenz(NACHWEIS_B, { pruefung: true })(box, {});
        return {
          auswerten: function () {
            var erg = lauf.ergebnisse(), aus = [];
            NACHWEIS_B.forEach(function (sch, i) {
              var e = erg[i], inf = e ? e.info : {};
              if (sch.art === 'ball') {
                var f = FIRMLINGE[sch.id];
                aus.push({ lz: 'LZ2', text: f.name + ': richtiges Register', ok: !!e && inf.wahl === f.art });
                if (f.attr) aus.push({ lz: 'LZ3', text: f.name + ': Dex-Eintrag nur mit Registerangaben', ok: !!e && inf.dexOk === true });
              } else if (sch.art === 'siegel') {
                var s = SCHATTEN[sch.id];
                aus.push({ lz: s.lz, text: s.name + ': ' + (s.siegel === 'k' ? 'entsteht mit Eintragung' : 'wird bekannt gemacht'), ok: !!e && inf.wahl === s.siegel });
              } else sch.ids.forEach(function (id) {
                var t = e && (inf.treffer || []).filter(function (x) { return x.id === id; })[0];
                aus.push({ lz: ANGRIFFE[id].lz, text: 'Duell: ' + ANGRIFFE[id].konter[0][0].replace(/^\S+\s/, ''), ok: !!t && t.ok });
              });
            });
            return aus;
          },
          loesen: function () { lauf.loesen(); }
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
    ], fehler: 'Eine E-Mail oder ein unterschriebener Brief reicht nicht.', beispiel: 'Mia darf in den Firmendex schauen, obwohl sie keine Kauffrau ist.' },
    { lz: 'LZ2', zeilen: [
      { text: 'Abteilung A (HRA): e. K., ___, ___.', loesung: 'OHG, KG' },
      { text: 'Abteilung B (HRB): ___, UG, AG.', loesung: 'GmbH' }
    ], fehler: 'GmbH & Co. KG in B einordnen – sie ist eine KG, also A.', beispiel: 'Verein → Vereinsregister, eG → Genossenschaftsregister.' },
    { lz: 'LZ3', zeilen: [
      { text: 'Eingetragen werden z. B. Firma, Sitz, Gegenstand, ___ und Vertretung.', loesung: 'Kapital' },
      { text: 'Nie eingetragen werden Umsatz, Gewinn, Mitarbeiterzahl und ___.', loesung: 'Handlungsvollmacht' }
    ], fehler: 'Geschäftszahlen gehören nicht ins Register.', beispiel: 'Kernwerk: Stammkapital ja, Umsatz ???.' },
    { lz: 'LZ4', zeilen: [
      { text: 'Konstitutiv 🥚: Die Wirkung ___ mit der Eintragung.', loesung: 'entsteht' },
      { text: 'Deklaratorisch 🔔: Die Eintragung macht nur ___, was es schon gibt.', loesung: 'bekannt' }
    ], fehler: 'Jede Eintragung für konstitutiv halten.', beispiel: 'GmbH, UG, AG, Kannkaufmann → 🥚. Istkaufmann, Prokura, neuer Geschäftsführer → 🔔.', schema: 'Gibt es das schon, bevor gestempelt wird? Ja → 🔔 deklaratorisch. Nein → 🥚 konstitutiv.' },
    { lz: 'LZ5', zeilen: [
      { text: 'Öffentlicher Glaube: Wer auf das Register vertraut, wird ___.', loesung: 'geschützt' },
      { text: 'Eine Prokura gilt nach außen immer im ___ Umfang.', loesung: 'vollen' }
    ], fehler: 'Interne Grenzen der Prokura gegenüber Lieferanten geltend machen.', beispiel: 'Rex: „Mein Prokurist durfte nur bis 10.000 €“ – zählt nach außen nicht.' }
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
