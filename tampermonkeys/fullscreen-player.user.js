// ==UserScript==
// @name         Game Master Focus Player
// @namespace    https://github.com/Zashness/rashinban2025/blob/gh-pages/tampermonkeys/fullscreen-player.user.js
// @version      2025-07-19
// @description  Game Master fullscreen player window
// @author       sp4ghet
// @match        https://www.geoguessr.com/duels/*/spectate*
// @icon         https://rashinban.org/assets/images/favicon.ico
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    let currentStyle;
    function show(showLeft){
        const leftIndex = showLeft ? 100 : 0;
        const rightIndex = showLeft ? 0 : 100;
        currentStyle?.remove();
        currentStyle = GM_addStyle(`
        [class^="views_playerViews__"] > :first-child {
          z-index: ${leftIndex};
        }

        [class^="views_playerViews__"] > :nth-child(2) {
          z-index: ${rightIndex};
        }
        `);
    }
    show(true);

    document.addEventListener("keydown", (e) => {
      if(e.key === "1") {return show(true);}
      if(e.key === "2") {return show(false);}
    });

    GM_addStyle(`
    [class^="player-view_guessMap__"] {
      --width: 14vw;
    }

    [class^="player-view_guessMap__"][class*="player-view_active__"] {
      --width: 50vw;
    }

    /* Player View */
    [class^="player-view_viewWrapper__"]{
      position:absolute;
      top:-26.25vh;
      left:0;
      width:1920px;
      height:1080px;
      margin:0;
    }


    [class^="player-view_guessBanner__"]{
      visibility:hidden;
    }


    [class^="player-view_panorama__"][class*="player-view_inactive__"]
    {
      filter: brightness(0.9);
      transform: none;
      --border-color: rgba(0,0,0,0);
    }

    [class^="player-view_panorama__"], [class^="player-view_panorama__"]>div{
      border: 0;
      border-radius: 0;
      outline: 0;
    }
    `);



})();