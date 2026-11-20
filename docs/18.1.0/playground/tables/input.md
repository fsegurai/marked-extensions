# Quarterly report

`||` makes a cell span one more column; a cell ending in `^^` merges into the cell above it.

[Sales report, Q4 2025]
| Category || Metrics ||
| Group | Item | Price | Trend |
|-------|------|------:|:-----:|
| Fruits | Apple | $1.00 | up |
| ^^ | Orange | $1.50 | flat |
| ^^ | Banana | $0.75 | down |
| Vegetables | Carrot | $0.60 | up |
| ^^ | Leek | $1.20 | up |
| Total: 5 items ||||

A single trailing `^` is ordinary text:

| Expression | Value |
|------------|-------|
| 2^ | power marker, not a span |
