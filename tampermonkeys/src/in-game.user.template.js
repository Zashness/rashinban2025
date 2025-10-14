// ==UserScript==
// @name         Rashinban Geoguessr Game Master Mode
// @namespace    https://github.com/Zashness/rashinban2025/blob/gh-pages/tampermonkeys/out/in-game.user.js
// @version      1.1.8
// @description  Game Master Mode mods for Rashinban2025
// @author       Zashness
// @match        https://www.geoguessr.com/*
// @icon         https://rashinban.org/assets/images/favicon.ico
// @grant        GM_addStyle
// @grant        GM_addElement
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

window.addEventListener('load', function () {
  GM_addElement(document.body, 'script', {
    src: 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js',
  });
  // Inject a CSS rule that matches any class beginning with that prefix
  GM_addStyle(`
    @import url('https://fonts.googleapis.com/css2?family=Abel&family=Akshar:wght@300..700&family=Noto+Sans+JP:wght@100..900&display=swap');
    @import url('https://use.typekit.net/ljs6bhu.css');

    /* ===================================== */
    /* ========== Player Scores ============ */
    /* ===================================== */
    .topbar.topbar {
      top: 53px;
      position: absolute;
    }

    /* ===================================== */
    /* ============ Backgrounds ============ */
    /* ===================================== */
    [class*="game_backgroundDefault__"][class*="game_backgroundDefault__"] {
      --background: linear-gradient(to top,rgba(0,0,0,.9) 0,rgba(0,0,0,0) 350px), url("https://raw.githubusercontent.com/Zashness/rashinban2025/refs/heads/gh-pages/assets/images/key-visual.png")
    }
    /* In-game background & post-game background */
    [class^="views_activeRoundWrapper__"][class^="views_activeRoundWrapper__"],
    [class^="overlay_backdrop__"][class^="overlay_backdrop__"] {
      background: var(--background);
      background-repeat: no-repeat, no-repeat !important;
      background-position: center, center !important;
      background-size: 100% 100%, cover !important;
    }

    /* ===================================== */
    /* ======== In-game/Duels mode ========= */
    /* ===================================== */

    /* The main shaded notch on top of the screen */
    [class^="game-notch_shield__"] {
      display: none;
    }
    [class^="game-notch_ggLogo__"] {
      display: none;
    }
    [class^="game-notch_roundInfo__"] {
      background: #fff;
      position: fixed !important;
      top: 53px;
      height: 123px;
      width: 440px;
    }
    /* "Round X" */
    [class^="game-notch_roundInfo__"] div [class^="views_round__"] > label:last-child {
      left: 57px;
    }
    /* "Move/No Move/NMPZ" */
    [class^="game-notch_roundInfo__"] div [class^="views_roundMultiplier__"]:nth-child(2) > label:last-child {
      left: 219px;
    }
    /* "Multiplier x3.5" */
    [class^="game-notch_roundInfo__"] div [class^="views_roundMultiplier__"]:last-child > label:last-child {
      left: 378px;
    }
    /* ROUND & DAMAGE */
    [class^="game-notch_roundInfo__"] div [class^="views_round"] > label:first-child {
      visibility: hidden;
    }
    /* (round #) "5",  "Moving"/"No Moving"/"NMPZ", "x2.5" */
    [class^="game-notch_roundInfo__"] div [class^="views_round"] > label:last-child {
      font-family: "kaneda-gothic", sans-serif;
      font-optical-sizing: auto;
      font-weight: 900;
      font-style: normal;
      top: 68px;
      position: fixed;
      font-size: 64px;
      color: #151b26;
      transform: translateX(-50%);
    }


    /* User name and flag */
    [class^="cam-hud_nickAndFlag__"] {
      visibility: hidden !important;
    }

    [class^="cam-hud_playerBadge__RViHv"] {
      top: 175px;
      position: relative;
    }

    /* User avatar/cam */
    [class^="cam-hud_camWrapper"] {
      visibility: hidden !important;
    }

    /* In-game timer */
    [class^="views_roundInfo__"][class^="views_roundInfo__"] {
      position: fixed;
      top: 542px;
      z-index: 100;
    }
    [class^="views_countDown__"][class^="views_countDown__"] {
      transform: scale(2.0);
    }

    [class^="clock-timer_timer__"] {
      font-family: "kaneda-gothic", sans-serif;
      font-weight: 900;
      font-size: 36px;
    }

    /* Wrapper for both player views */
    [class^="views_playerViews__"][class^="views_playerViews__"] {
      top: 60px;
    }
    /* Player view. First-child=>left, 2nd child=right. */
    [class^="views_playerViews__"] > :first-child [class^="player-view_panorama__"] {
      --border-color: #3083FF;
    }
    [class^="views_playerViews__"] > :nth-child(2) [class^="player-view_panorama__"] {
      --border-color: #FF3030;
    }

    /* HP */
    [class*="cam-hud_wrapper__"][class*="cam-hud_wrapper__"] {
      top: -18px;
      display: grid;
      grid-template-columns: 1fr minmax(0, 760px) 1fr;
    }

    [class^="wc-health-bar_container__"][class^="wc-health-bar_container__"] {
      --height: 4rem;
      --bar-container-width: 16.75rem;
    }

    div[class*="wc-health-bar_right__"] label[class^="wc-health-bar_livesLabel__"] {
      transform: scaleX(-1) skew(-15deg) !important;
    }

    div[class^="wc-health-bar_barInner__"] label[class^="wc-health-bar_livesLabel__"] {
      font-family: "kaneda-gothic", sans-serif;
      font-weight: 900;
      font-size: 48px;
      font-style: normal;
      font-optical-sizing: auto;
      transform: skew(15deg,0deg);
      text-shadow: 0;
    }

    div[class^="settings_settingsButton__"] {
      bottom: 0;
      left: 0;
      opacity: 0;
    }
    div[class^="settings_settingsButton__"]:hover {
      opacity: .3;
    }
    button[class*="styles_hudButton__"][class*="styles_hudButton__"] {
      width: 140px;
      height: 140px;
      border-radius: 20px;
    }
    div[class^="spectate-map_toggle__"] {
      opacity: 0;
    }
    div[class^="spectate-map_toggle__"]:hover {
      opacity: 0.2;
    }

    /* hide darkened background around player views */
    [class^=views_playerViews__] [class^="views_bg__"] {
      background-color: transparent;
    }

    /* 5K Effect */
    [class^=__5k-celebration_root]{
      visibility: hidden;
    }

    #rashinban-5k{
      position: fixed;
      width: 1920px;
      height: 1080px;
      pointer-events: none;
      isolation: isolate;
    }

    /* ===================================== */
    /* ========= Game preview mode ========= */
    /* ===================================== */

    [class^="cam-hud_wrapper__"]:has(~[class^="preview-round_guessMapContainer__"]) {
      visibility: hidden;
    }

    /* hide guess map during preview */
    [class^="preview-round_guessMapContainer__"] {
      visibility: hidden;
    }

    [class^="round-score-screen_button__"] button,
    [class^="preview-round_startRoundButton__"] button {
      font-family: "kaneda-gothic", sans-serif;
      font-weight: 900;
      font-size: 36px;
      font-style: normal;
      border-radius: 10px;
      opacity: 0;
      --background: #ff0c0c;
      --text-shadow: none;
      --box-shadow: none;
    }
    [class^="round-score-screen_button__"]:hover button,
    [class^="preview-round_startRoundButton__"]:hover button {
      opacity: .2;
    }

    [class^="round-score-screen_hotkey__"],
    [class^="preview-round_hotkey__"] {
      display: none;
    }

    /* "next round starts in 03,02,01" */
    [class^="views_roundStartTitle__"],
    [class^="views_roundStartCount__"] {
      font-family: "kaneda-gothic", sans-serif;
      font-weight: 900;
      font-style: normal;
    }

    [class^="views_roundStartTitle__"] {
      font-size: 36px;
    }

    [class^="views_roundStartCount__"] {
      font-size: 48px;
    }

    /* hide the sponsor logos */
    body:has([class^="preview-round_guessMapContainer__"]) #sponsors {
      visibility: hidden;
    }

    /* ===================================== */
    /* ========== Post game mode =========== */
    /* ===================================== */

    /* Prevent HP from moving during post game */
    [class*="cam-hud_wrapper__"][class*="cam-hud_wrapper__"][class*="cam-hud_inRoundResult"] {
      transform: none;
    }
    /* Change position of the scores. Move up and spread to edge of screen. */
    [class*="round-score-animations_scoreTable"][class*="round-score-animations_scoreTable"][class*="round-score-animations_scoreTable"] {
      width: 1770px;
      margin-top: -392px;
    }
    /* Fonts for the distance and scores */
    [class*="round-score-animations_scoreContainer__"][class*="round-score-animations_scoreContainer__"],
    [class*="round-score-animations_static__"][class*="round-score-animations_static__"],
    [class*="round-score-animations_distanceRow__"][class*="round-score-animations_distanceRow__"],
    [class*="round-score-animations_scoreColumn"][class*="round-score-animations_scoreColumn"] {
      font-family: "Akshar", sans-serif;
      font-weight: 700;
      font-style: normal;
    }
    /* Not sure why this can't be combined with above...but needed here separately */
    [class*="round-score-map_mapContainer__"][class*="round-score-map_mapContainer__"] {
      top: -200px;
      position: relative;
      height: 530px;
    }
    div[class^="round-score_container__"] {
      width: 986px;
    }
    /* Remove divider between distance and score */
    [class*="round-score-animations_divider__"][class*="round-score-animations_divider__"],
    [class*="round-score-animations_scoreTitle__"][class*="round-score-animations_scoreTitle__"] {
      visibility: hidden;
    }
    /* Remove blur and color effect on score */
    [class^="shadow-text_root__"][class^="shadow-text_root__"] {
      text-shadow: none;
      font-size: 96px;
      color: white;
    }
    [class*="round-score-animations_static__"][class*="round-score-animations_static__"] {
      /*opacity: 0.8;*/
    }

    /* Distance */
    [class^="round-score-animations_scoreColumn"][class^="round-score-animations_scoreColumn"] {
      font-size: 24px;
    }

    /* ===================================== */
    /* ====== Game Master Setup Mode ======= */
    /* ===================================== */
    [data-qa="disband-party-button"] {
      top: 160px;
      z-index: 3;
    }
`);

  // ===== INLINED: consts.js =====
  //@@CONSTS_JS@@
  // ===== INLINED: utils.js =====
  //@@UTILS_JS@@

  // ===== INLINED: sponsors.css =====
  GM_addStyle(/*@@SPONSORS_CSS_JSON@@*/);
  // ===== INLINED: player-name-score.css =====
  GM_addStyle(/*@@PLAYER_SCORE_CSS_JSON@@*/);

  // ===== INLINED: sponsors.js =====
  //@@SPONSORS_JS@@

  /** START SPREADSHEET TOGGLE */
  const DEFAULTS = { sheetId: SHEET_ID, tabId: OVERLAYS_TAB_ID };
  const SUB_COMP = { sheetId: '1X4LSputlvX5pdP7xImtuBuCSsUhhjgQ5l5DlCNVq24s', tabId: '1383961576' };

  // read stored config, or default to Rashinban
  const sheetId = GM_getValue('sheetId', DEFAULTS.sheetId);
  const tabId = GM_getValue('tabId', DEFAULTS.tabId);
  const isRashinban = sheetId === DEFAULTS.sheetId && tabId === DEFAULTS.tabId;
  const currentSheetType = isRashinban ? 'Rashinban' : 'Sub-Competition';
  GM_registerMenuCommand(`Toggle tournament (current: ${currentSheetType})`, () => {
    const next = isRashinban ? SUB_COMP : DEFAULTS;
    // persist to stored config
    GM_setValue('sheetId', next.sheetId);
    GM_setValue('tabId', next.tabId);
    location.reload(); // re-init with new config
  });
  /** END SPREADSHEET TOGGLE */

  // Create sponsor container
  const sponsorContainer = document.createElement('div');
  sponsorContainer.className = 'sponsors';
  sponsorContainer.id = 'sponsors';
  document.body.appendChild(sponsorContainer);

  const logoUrlPrefix =
    'https://raw.githubusercontent.com/Zashness/rashinban2025/refs/heads/gh-pages/';
  const leftLogos = [
    { src: logoUrlPrefix + 'assets/logos/red-tokyo-logo.svg', class: 'logo-red-tokyo' },
    { src: logoUrlPrefix + 'assets/logos/tamura-builds-white.svg' },
  ];
  const rightLogos = [
    { src: logoUrlPrefix + 'assets/logos/spicescode-white.svg', class: 'logo-spicescode' },
    { src: logoUrlPrefix + 'assets/logos/geoguessr-m.svg', class: 'logo-geoguessr' },
    { src: logoUrlPrefix + 'assets/logos/geoguessr-record.svg', class: 'logo-geoguessr-record' },
  ];
  initSponsors({
    containerId: 'sponsors',
    leftLogos: leftLogos,
    rightLogos: rightLogos,
    bottom: 135,
    height: 84,
    width: 1340,
    left: 203,
  });

  // ===== INLINED: score.js =====
  //@@SCORE_JS@@

  function render(data) {
    const row = getActiveRow(data);
    renderNameAndScoreFromRow(row);
  }

  function fetchData() {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${tabId}`;

    fetch(csvUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((txt) => {
        const { data } = Papa.parse(txt, {
          header: true,
          skipEmptyLines: true,
        });
        render(data);
      })
      .catch((err) => {
        console.error('Fetch/Parse error:', err);
        // document.getElementById('error').innerHTML = '<p>Error loading data.</p>';
      });
  }

  const topbarHtml = `
      <div class="topbar">
        <div class="player1-bg player-bg">
          <div id="player1-handle" class="player-handle player1-handle"></div>
          <div id="player1" class="player player1"></div>
        </div>
        <div class="score-bg score1-bg">
          <div id="score1" class="score score1"></div>
        </div>
        <div class="center">
          <div class="round">ROUND</div>
          <div class="game-mode">GAME MODE</div>
          <div class="damage">DAMAGE</div>
        </div>
        <div class="score-bg score2-bg">
          <div id="score2" class="score score2"></div>
        </div>
        <div class="player2-bg player-bg">
          <div id="player2" class="player player2"></div>
          <div id="player2-handle" class="player-handle player2-handle"></div>
        </div>
      </div>
    `;
  document.body.insertAdjacentHTML('beforeend', topbarHtml);
  fetchData();
  setInterval(fetchData, 5 * 1000);

  let hasInit = false;
  let overlayRoot = null;
  let observer = null;

  const domChanges = new MutationObserver((_mutations) => {
    /* 5K Effect */

    const overlay = document.getElementById('overlay-portal-destination');
    if (overlay !== overlayRoot) {
      if (observer !== null) {
        observer.disconnect();
      }
      hasInit = false;
    }
    if (!overlay || hasInit) {
      return;
    }
    console.log('found overlay root');
    hasInit = true;
    overlayRoot = overlay;
    const customAnim = document.createElement('video');
    const videoSrc = document.createElement('source');
    videoSrc.src =
      'https://raw.githubusercontent.com/Zashness/rashinban2025/refs/heads/gh-pages/assets/videos/5K.webm';
    videoSrc.type = 'video/mp4';
    customAnim.append(videoSrc);
    customAnim.volume = 0.5;
    customAnim.id = 'rashinban-5k';
    overlayRoot.append(customAnim);

    observer = new MutationObserver((mutations) => {
      console.log('mutation');
      const fivek = document.querySelector(`[class^="__5k-celebration_root"]`);
      if (fivek) {
        customAnim.play();
      }
    });
    observer.observe(overlayRoot, {
      subtree: true,
      childList: true,
      characterData: true,
    });
  });
  domChanges.observe(document.body, { subtree: true, childList: true });
});
