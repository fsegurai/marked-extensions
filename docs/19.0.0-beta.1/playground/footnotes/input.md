# Footnotes

Marked renders footnotes through the instance that parses the page[^instance], so a `new Marked()` keeps them local.
Named footnotes keep their name in the source[^why] and inline ones need no definition^[Inline footnotes are numbered
in order with the others.].

Hover a reference to preview it; click it to jump to the note.

[^instance]: Since 19.0.0-beta.1 the footnote content uses the extensions of that instance, not the global `marked`.
[^why]: The output numbers them in order of first reference.
