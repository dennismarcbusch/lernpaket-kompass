# Fragen: Bits & Bytes

Format: referenz/fragenformat.md, Abschnitt „Fragen in quelle/fragen.md“. Jede Frage beginnt mit ## ID · Lernziel · Typ · Einsatz; Zeilen mit # gliedern nur.

# Vorab-Fragen

## V1 · LZ1 · zahl · vorab

Welche Dezimalzahl ist `10000001`?

= 129
- 2 → Du hast nur die Einsen gezählt. Jede Stelle hat aber einen eigenen Wert: ganz links 128, ganz rechts 1.
- 10000001 → Das ist die Ziffernfolge als Dezimalzahl gelesen. Im Binärsystem hat jede Stelle einen Stellenwert.

> Die Eins ganz links ist 128 wert, die ganz rechts 1: 128 + 1 = 129.

## V2 · LZ2 · text · vorab

Wie lautet **12** als 8-Bit-Binärzahl?

= 00001100
= 0000 1100
- 1100 → Der Wert stimmt, aber ein Byte hat immer 8 Stellen: vorne mit Nullen auffüllen.
- 00110000 → Die Stellen sind vertauscht. Die kleinen Werte (8, 4, 2, 1) stehen rechts.

> 12 = 8 + 4. Die Stellen für 8 und 4 sind 1, alle anderen 0: 00001100.

## V3 · LZ3 · zahl · vorab

Wie viele verschiedene Werte lassen sich mit **3 Bit** darstellen?

= 8
- 6 → Mit jedem Bit verdoppelt sich die Anzahl, sie wächst nicht nur um 2.
- 7 → 7 ist der größte Wert (111). Dazu kommt noch die 0: also 8 Werte.
- 3 → 3 ist die Anzahl der Bits, nicht der möglichen Werte.

> Jedes Bit verdoppelt die Möglichkeiten: 2 · 2 · 2 = 8 (von 000 bis 111).

# LZ1 · Binär → dezimal

## F1 · LZ1 · zahl · check, selbstueberpruefung

Welchen Dezimalwert hat `00001011`?

= 11
- 13 → Du hast die Stellenwerte von links nach rechts vergeben. Die Stelle mit dem Wert 1 steht ganz rechts.
- 1011 → Das ist die Ziffernfolge als Dezimalzahl gelesen. Rechne mit den Stellenwerten 8, 4, 2, 1.

> Die Einsen stehen bei 8, 2 und 1: 8 + 2 + 1 = 11.

## F2 · LZ1 · mc · check

Welchen Stellenwert hat das Bit ganz links in einem Byte?

- [x] 128
- [ ] 256 → 256 wäre die neunte Stelle. Ein Byte hat Stellenwerte von 1 bis 128.
- [ ] 8 → 8 ist die Anzahl der Bits in einem Byte, nicht der Stellenwert.
- [ ] 1 → Der Stellenwert 1 steht ganz rechts.

> Von rechts: 1, 2, 4, 8, 16, 32, 64, 128 – die achte Stelle hat den Wert 2⁷ = 128.

## F3 · LZ1 · zahl · selbstueberpruefung

Welchen Dezimalwert hat `11000000`?

= 192
- 3 → Du hast von links mit 1 und 2 angefangen. Die beiden Einsen stehen bei 128 und 64.

> 128 + 64 = 192.

## F5 · LZ1 · mc · selbstueberpruefung

Welche dieser Binärzahlen haben den Dezimalwert 10?

- [x] `00001010`
- [x] `1010` → Richtig – führende Nullen ändern den Wert nicht.
- [ ] `00000101` → Das ist 5 – die Ziffern sind verdreht.
- [ ] `10100000` → Hier stehen die Einsen bei 128 und 32: Das ist 160.

> 10 = 8 + 2. Ob davor Nullen stehen, ändert den Wert nicht.

## F16 · LZ1 · zahl · selbstueberpruefung

Welchen Dezimalwert hat `10101010`?

= 170
- 85 → 85 wäre `01010101` – du hast die Stellenwerte um eine Stelle verschoben.

> 128 + 32 + 8 + 2 = 170.

## F19 · LZ1 · zahl · uebung

Welche Dezimalzahl ist `10101000`?

= 168
- 21 → Du hast von links mit 1 angefangen. Die Stelle ganz links hat den Wert 128.

> 128 + 32 + 8 = 168.

# LZ2 · Dezimal → binär

## F6 · LZ2 · text · check, selbstueberpruefung

Schreibe **200** als 8-Bit-Binärzahl.

= 11001000
= 1100 1000
- 00010011 → Die Ziffern sind verdreht: Die größte Stelle (128) steht links.
Wenn falsch: Zerlege 200 in Stellenwerte: Welcher größte Stellenwert passt hinein?

> 200 = 128 + 64 + 8 → 11001000.

## F7 · LZ2 · mc · check

Wie lautet **100** als 8-Bit-Binärzahl?

- [x] `01100100`
- [ ] `00100110` → Die Ziffern sind verdreht – die 64 steht weiter links als die 4.
- [ ] `01100000` → Das ist 96: Der Rest 4 fehlt noch.
- [ ] `10010100` → 128 passt nicht in 100 – die erste Stelle muss 0 sein.

> 100 = 64 + 32 + 4 → 01100100.

## F8 · LZ2 · zuordnen · selbstueberpruefung

Ordne jeder Dezimalzahl die passende 8-Bit-Binärzahl zu.

- 1 = 00000001
- 16 = 00010000
- 128 = 10000000
- 255 = 11111111

> Eine einzelne 1 an einer Stelle ergibt genau deren Stellenwert; alle acht Einsen ergeben 255.

## F9 · LZ2 · mc · check

Du rechnest **37** um. Welchen Stellenwert ziehst du als Erstes ab?

- [x] 32
- [ ] 64 → 64 ist größer als 37 und passt nicht hinein.
- [ ] 16 → 16 passt zwar, aber 32 ist der größte Stellenwert, der passt.
- [ ] 37 → 37 ist kein Stellenwert. Stellenwerte sind 1, 2, 4, 8, 16, 32, 64, 128.

> Man beginnt immer mit dem größten passenden Stellenwert: 32 (Rest 5).

## F10 · LZ2 · text · selbstueberpruefung

Schreibe **255** als 8-Bit-Binärzahl.

= 11111111
= 1111 1111
- 100000000 → Das sind neun Stellen und der Wert 256. 255 ist der größte Wert eines Bytes.

> 255 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1: alle acht Bits sind 1.

## F17 · LZ2 · text · selbstueberpruefung

Schreibe **64** als 8-Bit-Binärzahl.

= 01000000
= 0100 0000
- 1000000 → Der Wert stimmt, aber ein Byte hat acht Stellen – vorne fehlt eine 0.
- 00000010 → Die Ziffern sind verdreht: 00000010 ist 2.

> 64 ist ein einzelner Stellenwert: zweite Stelle von links → 01000000.

# LZ3 · Anzahl Werte

## F11 · LZ3 · zahl · check

Wie viele verschiedene Werte lassen sich mit **4 Bit** darstellen?

= 16
- 15 → 15 ist der größte Wert. Zusammen mit der 0 sind es 16 Werte.
- 8 → 8 wäre 2 · 4. Jedes Bit verdoppelt die Anzahl: 2 · 2 · 2 · 2.

> 2⁴ = 16 Werte, von 0 bis 15.

## F12 · LZ3 · mc · selbstueberpruefung

Wie viele Bit brauchst du **mindestens**, um 1000 verschiedene Werte darzustellen?

- [x] 10
- [ ] 9 → 2⁹ = 512 reicht nicht für 1000 Werte.
- [ ] 1000 → Jedes Bit verdoppelt die Anzahl – du brauchst viel weniger Bits als Werte.
- [ ] 4 → Mit 4 Bit gibt es nur 16 Werte. Du hast vielleicht an die vier Ziffern von 1000 gedacht.

> 2¹⁰ = 1024 ≥ 1000, 2⁹ = 512 < 1000. Also mindestens 10 Bit.

## F13 · LZ3 · zahl · check, selbstueberpruefung

Wie viele verschiedene Werte kann **ein Byte** annehmen?

= 256
- 255 → 255 ist der größte Wert. Die 0 zählt mit: 256 Werte.

> 2⁸ = 256 Werte, von 0 bis 255.

## F14 · LZ3 · mc · check

Was passiert mit der Anzahl der darstellbaren Werte, wenn ein Bit dazukommt?

- [x] Sie verdoppelt sich.
- [ ] Sie steigt um 1. → Das neue Bit kann bei jedem bisherigen Muster 0 oder 1 sein – das verdoppelt die Anzahl.
- [ ] Sie steigt um 2. → Bei einem Bit mehr gibt es alle bisherigen Muster einmal mit 0 und einmal mit 1 davor.
- [ ] Sie verzehnfacht sich. → Das gilt im Dezimalsystem mit zehn Ziffern. Ein Bit hat nur zwei Zustände.

> Jedes zusätzliche Bit verdoppelt die Anzahl: 2ⁿ → 2ⁿ⁺¹.

## F15 · LZ3 · zahl · selbstueberpruefung

Ein Byte einer IPv4-Adresse hat 8 Bit. Welches ist der **größte** Wert, der darin stehen kann?

= 255
- 256 → 256 ist die Anzahl der Werte. Weil bei 0 begonnen wird, ist der größte Wert 255.

> 2⁸ − 1 = 255.

## F18 · LZ3 · zuordnen · selbstueberpruefung

Ordne zu: Wie viele verschiedene Werte gibt es mit …

- 1 Bit = 2
- 2 Bit = 4
- 8 Bit = 256
- 16 Bit = 65 536

> Jeweils 2 hoch Anzahl der Bits: 2¹, 2², 2⁸, 2¹⁶.

## F20 · LZ3 · zahl · uebung

Wie viele verschiedene Bitmuster gibt es mit **6 Bit**?

= 64
- 63 → 63 ist der größte Wert. Mit der 0 sind es 64 Muster.
- 12 → 12 wäre 2 · 6. Es heißt aber 2 hoch 6.

> 2⁶ = 64.
