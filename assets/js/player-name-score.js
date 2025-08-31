/**
 * Call renderNameAndScoreFromRow(...) to update player names and scores.
 *
 * Assumes that HTML nodes exist with the following IDs:
 *   "player1", "player1-handle", "score1"
 *   "player2", "player2-handle", "score2"
 */
import { applyKanaFont } from './utils.js';

/** Split "Name|handle" into [name, handle] (both trimmed) */
function splitPlayerField(field = '') {
  const [name = '', handle = ''] = String(field).split('|');
  return [name.trim(), handle.trim()];
}

function setText(el, text) {
  if (!el) return;
  el.textContent = text.trim() || '';
}

function setHandle(el, handle) {
  if (!el) return;
  el.textContent = handle ? '@' + handle : '';
}

function normScore(score) {
  const s = String(score || '').trim();
  return s || '0';
}

/**
 * Render the "topbar" from a row object.
 * Works whether the center block (round, mode, damage multiplier) exists or not.
 *
 * @param {object} row - Active row from CSV (Papa header:true)
 */
export function renderNameAndScoreFromRow(row) {
  if (!row || !row.player_1 || !row.player_2) return;

  // Player 1
  const [p1Name, p1Handle] = splitPlayerField(row.player_1);
  const p1Node = document.getElementById('player1');
  setText(p1Node, p1Name);
  applyKanaFont(p1Name, p1Node);

  const p1HandleNode = document.getElementById('player1-handle');
  setHandle(p1HandleNode, p1Handle);

  const score1Node = document.getElementById('score1');
  setText(score1Node, normScore(row.player_1_score));

  // Player 2
  const [p2Name, p2Handle] = splitPlayerField(row.player_2);
  const p2Node = document.getElementById('player2');
  setText(p2Node, p2Name);
  applyKanaFont(p2Name, p2Node);

  const p2HandleNode = document.getElementById('player2-handle');
  setHandle(p2HandleNode, p2Handle);

  const s2Node = document.getElementById('score2');
  setText(s2Node, normScore(row.player_2_score));
}
