import { describe, it, expect, beforeEach, vi } from 'vitest';

// mock utils
vi.mock('./utils.js', () => ({
  applyKanaFont: vi.fn(),
}));

// import after the mock so it's applied
import { renderNameAndScoreFromRow } from './player-name-score.js';
import { applyKanaFont } from './utils.js';

function mountTopbarDom() {
  document.body.innerHTML = `
    <div>
      <div>
        <div id="player1-handle"></div>
        <div id="player1"></div>
      </div>
      <div>
        <div id="score1"></div>
      </div>
      <div>
        <div id="score2"></div>
      </div>
      <div>
        <div id="player2"></div>
        <div id="player2-handle"></div>
      </div>
    </div>
  `;
}

describe('renderNameAndScoreFromRow', () => {
  beforeEach(() => {
    mountTopbarDom();
    vi.clearAllMocks();
  });

  it('no-op if row missing or missing players', () => {
    expect(() => renderNameAndScoreFromRow(null)).not.toThrow();
    expect(applyKanaFont).not.toHaveBeenCalled();

    expect(() => renderNameAndScoreFromRow({ player_1: 'A|a' })).not.toThrow();
    expect(applyKanaFont).not.toHaveBeenCalled();

    expect(() => renderNameAndScoreFromRow({ player_2: 'B|b' })).not.toThrow();
    expect(applyKanaFont).not.toHaveBeenCalled();
  });

  it('renders names', () => {
    const row = {
      player_1: 'Alice|alice',
      player_1_score: '1',
      player_2: 'ボブ|bob_jp',
      player_2_score: '2',
    };

    renderNameAndScoreFromRow(row);

    expect(document.getElementById('player1').textContent).toBe('Alice');
    expect(document.getElementById('player2').textContent).toBe('ボブ');
  });

  it('renders handles (with "@")', () => {
    const row = {
      player_1: 'Alice|alice',
      player_1_score: '1',
      player_2: 'ボブ|bob_jp',
      player_2_score: '2',
    };

    renderNameAndScoreFromRow(row);

    expect(document.getElementById('player1-handle').textContent).toBe('@alice');
    expect(document.getElementById('player2-handle').textContent).toBe('@bob_jp');
  });

  it('omits "@" when handle is empty/missing', () => {
    renderNameAndScoreFromRow({
      player_1: 'Alice|', // empty handle
      player_1_score: '1',
      player_2: 'Bob', // no pipe → handle becomes ""
      player_2_score: '1',
    });

    expect(document.getElementById('player1-handle').textContent).toBe('');
    expect(document.getElementById('player2-handle').textContent).toBe('');
  });

  it('normalizes scores', () => {
    renderNameAndScoreFromRow({
      player_1: 'A|a',
      player_1_score: '',
      player_2: 'B|b',
      player_2_score: '2',
    });

    expect(document.getElementById('score1').textContent).toBe('0');
    expect(document.getElementById('score2').textContent).toBe('2');
  });

  it('calls applyKanaFont with (name, node) for each player', () => {
    const row = {
      player_1: 'Alice|a',
      player_1_score: '1',
      player_2: 'ボブ|b',
      player_2_score: '2',
    };

    renderNameAndScoreFromRow(row);

    expect(applyKanaFont).toHaveBeenCalledTimes(2);
    expect(applyKanaFont).toHaveBeenNthCalledWith(1, 'Alice', document.getElementById('player1'));
    expect(applyKanaFont).toHaveBeenNthCalledWith(2, 'ボブ', document.getElementById('player2'));
  });

  it('gracefully handles missing DOM nodes (no throws)', () => {
    // remove a few nodes to ensure the internal setText/setHandle guards don't explode
    document.getElementById('player1').remove();
    document.getElementById('score2').remove();

    expect(() =>
      renderNameAndScoreFromRow({
        player_1: 'Alice|a',
        player_1_score: '1',
        player_2: 'Bob|b',
        player_2_score: '2',
      }),
    ).not.toThrow();

    // remaining nodes still update
    expect(document.getElementById('player1-handle').textContent).toBe('@a');
    expect(document.getElementById('player2').textContent).toBe('Bob');
  });
});
