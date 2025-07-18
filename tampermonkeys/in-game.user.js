// ==UserScript==
// @name         Rashinban Geoguessr Game Master Mode
// @namespace    https://github.com/Zashness/rashinban2025/blob/gh-pages/tampermonkeys/in-game.user.js
// @version      0.2.0
// @description  Game Master Mode mods for Rashinban2025
// @author       Zashness
// @match        https://www.geoguessr.com/duels/*/spectate*
// @icon         https://rashinban.org/assets/images/favicon.ico
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  // Inject a CSS rule that matches any class beginning with that prefix
  GM_addStyle(`
    @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Oswald:wght@200..700&display=swap');

    [class*="game_backgroundDefault__"][class*="game_backgroundDefault__"] {
      --background: url("https://rashinban.org/assets/images/key-visual.png");
    }
    /* In-game background & post-game background */
    [class^="views_activeRoundWrapper__"][class^="views_activeRoundWrapper__"],
    [class^="overlay_backdrop__"][class^="overlay_backdrop__"] {
      background: var(--background);
      background-repeat: no-repeat !important;
      background-position: center center !important;
      background-size: cover !important;
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
      background: #FF3030;
      border-radius: 12px;
      position: fixed !important;
      top: 82px;
      height: 114px;
      width: 760px;
    }
    /* "Round X" */
    [class^="game-notch_roundInfo__"] div [class^="views_round__"] > label:last-child {
      left: 132px;
    }
    /* "Move/No Move/NMPZ" */
    [class^="game-notch_roundInfo__"] div [class^="views_roundMultiplier__"]:nth-child(2) > label:last-child {
      left: 330px;
    }
    /* "Multiplier x3.5" */
    [class^="game-notch_roundInfo__"] div [class^="views_roundMultiplier__"]:last-child > label:last-child {
      left: 634px;
    }
    /* ROUND & DAMAGE */
    [class^="game-notch_roundInfo__"] div [class^="views_round"] > label:first-child {
      visibility: hidden;
    }
    /* (round #) "5",  "Moving"/"No Moving"/"NMPZ", "x2.5" */
    [class^="game-notch_roundInfo__"] div [class^="views_round"] > label:last-child {
      font-family: "Oswald", sans-serif;
      font-optical-sizing: auto;
      font-weight: 500;
      font-style: normal;
      top: 44px;
      position: fixed;
      font-size: 48px;
      color: white;
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

    /* Wrapper for both player views */
    [class^="views_playerViews__"][class^="views_playerViews__"] {
      top: 60px;
    }
    /* Player view. First-child=>left, 2nd child=right. */
    [class^="views_playerViews__"] > :first-child [class^="player-view_panorama__"] {
      --border-color: #FFB730;
    }
    [class^="views_playerViews__"] > :nth-child(2) [class^="player-view_panorama__"] {
      --border-color: #3083FF;
    }

    /* HP */
    [class*="cam-hud_wrapper__"][class*="cam-hud_wrapper__"] {
      top: -18px;
    }


    /* ===================================== */
    /* ========= Game preview mode ========= */
    /* ===================================== */

    [class^="cam-hud_wrapper__"]:has(~ [class^="preview-round_guessMapContainer__"]) {
      visibility:hidden;
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
      font-family: "Barlow", sans-serif;
      font-weight: 500;
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
})();
