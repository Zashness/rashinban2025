/** Finds the first row where `active` column is TRUE */
export function getActiveRow(data) {
  for (let row of data) {
    if (row.active === 'TRUE') {
      return row;
    }
  }
  return null;
}

export function containsJapanese(text) {
  // Hiragana, Katakana, Han (CJK)
  const japaneseRE = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u;
  return japaneseRE.test(text);
}

export function applyKanaFont(name, el) {
  if (!el) return;
  if (containsJapanese(name)) el.classList.add('kana');
  else el.classList.remove('kana');
}
