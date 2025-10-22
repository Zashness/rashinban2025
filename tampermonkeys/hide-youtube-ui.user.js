// ==UserScript==
// @name         YouTube hide UI in embed
// @namespace    https://github.com/Zashness/rashinban2025/blob/gh-pages/tampermonkeys/out/hide-youtube-ui.user.js
// @version      0.0.1
// @description  Hide UI elements of YouTube embeds
// @author       sp4ghet
// @match        https://www.youtube.com/embed/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant       GM_addStyle
// ==/UserScript==

'use strict';

const key = 'h';
let style;
let hidden = false;

document.addEventListener('keydown', (e) => {
  if (e.key === key && document.activeElement.tagName !== 'INPUT' && !hidden) return hide();
  if (e.key === key && hidden) return show();
});

function hide() {
  style = GM_addStyle(`
    .ytp-chrome-top,
    .ytp-pause-overlay,
    .ytp-chrome-bottom,
    .ytp-gradient-top,
    .ytp-gradient-bottom,
    .annotation {
        display: none !important;
    }
  `);

  hidden = true;
}

function show() {
  style.remove();
  hidden = false;
}
