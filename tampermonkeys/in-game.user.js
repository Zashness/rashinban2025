// ==UserScript==
// @name         Rashinban Geoguessr Game Master Mode
// @namespace    https://github.com/Zashness/rashinban2025
// @version      0.1.0
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
            top: 45px;
            height: 110px;
            width: 700px;
        }
        [class^="game-notch_roundInfo__"] div [class^="views_round__"] > label:first-child {
            position: fixed;
            left: 38px;
            top: 48px;
            font-size: 19px;
        }
        [class^="game-notch_roundInfo__"] div [class^="views_round__"] > label:last-child {
            position: fixed;
            left: 114px;
            top: 42px;
            font-size: 64px;
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

        /* Player view. First-child=>left, 2nd child=right. */
        [class^="views_playerViews__"] > :first-child [class^="player-view_panorama__"] {
            --border-color: #FFB730;
        }
        [class^="views_playerViews__"] > :nth-child(2) [class^="player-view_panorama__"] {
            --border-color: #3083FF;
        }
    `);
})();
