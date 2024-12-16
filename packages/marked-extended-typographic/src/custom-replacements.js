const specialCharacters = {
  '\\(<<\\)': '«', // Left-pointing double angle quotation mark
  '\\(>>\\)': '»', // Right-pointing double angle quotation mark
  '\\(<-\\)': '←', // Left arrow
  '\\(->\\)': '→', // Right arrow
  '\\(<->\\)': '↔', // Double arrow
  '\\(<=>\\)': '⇔', // Double implies
  '\\(\\=\\>\\)': '⇒', // Implies
  '\\(\\<\\=\\=\\)': '⇐', // Less than or equal to
  '\\(\\=\\=\\>\\)': '⇒', // Implies
  '\\(==\\)': '≡', // Identical to
  '\\(\\<\\)': '≪', // Much less than
  '\\(\\>\\)': '≫', // Much greater than
  '\\(\\<\\=\\)': '≦', // Less than or equal to
  '\\(\\>\\=\\)': '≧', // Greater than or equal to
  '\\(\\<\\>\\)': '≷', // Neither less than nor greater than
  '\\(\\>\\<\\)': '≸', // Neither greater than nor less than
  '\\(\\+\\-\\)': '±', // Plus-minus sign
  '\\(-\\+\\)': '∓', // Minus-plus sign
  '\\(x\\)': '×', // Multiplication sign
  '\\(/\\)': '÷', // Division sign
};

const logicalAndMathematicalSymbols = {
  '\\(\\+\\)': '⊕', // Direct sum
  '\\(\\-\\)': '⊖', // Direct difference
  '\\(\\*\\)': '⊗', // Tensor product
  '\\(\\|\\)': '∣', // Divides
  '\\(\\&\\)': '∧', // Logical and
  '\\(\\|\\|\\)': '∨', // Logical or
  '\\(\\!\\)': '¬', // Logical not
  '\\(\\=\\)': '≠', // Not equal
  '\\(\\~\\)': '≈', // Approximately equal
  '\\(\\^\\)': '∧', // Logical and
  '\\(\\%\\)': '‰', // Per mille
  '\\(\\#\\)': '№', // Numero sign
  '\\(\\@\\)': '⊕', // Circled plus
  '\\(\\$\\)': '¤', // Currency sign
};

const typographicSymbols = {
  '\\(C\\^\\)': '©',
  '\\(c\\^\\)': '©',
  '\\(R\\^\\)': '®',
  '\\(r\\^\\)': '®',
  '\\(TM\\^\\)': '™',
  '\\(tm\\^\\)': '™',
  '\\(P\\^\\)': '℗',
  '\\(p\\^\\)': '℗',
  '\\(S\\^\\)': '§',
  '\\(s\\^\\)': '§',
  '\\(D\\^\\)': '†',
  '\\(d\\^\\)': '†',
  '\\(DD\\^\\)': '‡',
  '\\(dd\\^\\)': '‡',
  '\\(P\\*\\)': '¶',
  '\\(p\\*\\)': '¶',
};

const greekLetters = {
  '\\(alpha\\)': 'α',
  '\\(beta\\)': 'β',
  '\\(gamma\\)': 'γ',
  '\\(delta\\)': 'δ',
  '\\(epsilon\\)': 'ε',
  '\\(zeta\\)': 'ζ',
  '\\(eta\\)': 'η',
  '\\(theta\\)': 'θ',
  '\\(iota\\)': 'ι',
  '\\(kappa\\)': 'κ',
  '\\(lambda\\)': 'λ',
  '\\(mu\\)': 'μ',
  '\\(nu\\)': 'ν',
  '\\(xi\\)': 'ξ',
  '\\(omicron\\)': 'ο',
  '\\(pi\\)': 'π',
  '\\(rho\\)': 'ρ',
  '\\(sigma\\)': 'σ',
  '\\(tau\\)': 'τ',
  '\\(upsilon\\)': 'υ',
  '\\(phi\\)': 'φ',
  '\\(chi\\)': 'χ',
  '\\(psi\\)': 'ψ',
  '\\(omega\\)': 'ω',
};

export const customReplacements = {
  ...specialCharacters,
  ...logicalAndMathematicalSymbols,
  ...typographicSymbols,
  ...greekLetters,
};
