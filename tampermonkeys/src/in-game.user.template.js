// ==UserScript==
// @name         Rashinban Geoguessr Game Master Mode
// @namespace    https://github.com/Zashness/rashinban2025/blob/gh-pages/tampermonkeys/out/in-game.user.js
// @version      1.0.3
// @description  Game Master Mode mods for Rashinban2025
// @author       Zashness
// @match        https://www.geoguessr.com/*
// @icon         https://rashinban.org/assets/images/favicon.ico
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  // Inject a CSS rule that matches any class beginning with that prefix
  GM_addStyle(`
    @import url('https://fonts.googleapis.com/css2?family=Akshar:wght@300..700&display=swap');
    @import url('https://use.typekit.net/ljs6bhu.css');

    [class*="game_backgroundDefault__"][class*="game_backgroundDefault__"] {
      --background: linear-gradient(to top,rgba(0,0,0,.9) 0,rgba(0,0,0,0) 350px), url("https://rashinban.org/assets/images/key-visual.png")
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
      --border-color: #FF3030;
    }
    [class^="views_playerViews__"] > :nth-child(2) [class^="player-view_panorama__"] {
      --border-color: #3083FF;
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
      width: 1820px;
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
      height: 502px;
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
`);

  // ===== INLINED: sponsors.css =====

  GM_addStyle(/*@@SPONSORS_CSS_JSON@@*/);

  // ===== INLINED: sponsors.js =====
  //@@SPONSORS_JS@@

  const sponsorContainer = document.createElement('div');
  sponsorContainer.className = 'sponsors';
  sponsorContainer.id = 'sponsors';
  document.body.appendChild(sponsorContainer);

  const logoUrlPrefix =
    'https://raw.githubusercontent.com/Zashness/rashinban2025/refs/heads/gh-pages/';
  const leftLogos = [
    { src: logoUrlPrefix + 'assets/logos/red-tokyo-logo.svg' },
    { src: logoUrlPrefix + 'assets/logos/tamura-builds-white.svg' },
  ];
  const rightLogos = [
    { src: logoUrlPrefix + 'assets/logos/spicescode-white.svg' },
    { src: logoUrlPrefix + 'assets/logos/geoguessr-m.svg' },
    { src: logoUrlPrefix + 'assets/logos/geoguessr-record.svg' },
  ];
  initSponsors({
    containerId: 'sponsors',
    leftLogos: leftLogos,
    rightLogos: rightLogos,
    bottom: 125,
  });
})();
