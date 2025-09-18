# rashinban2025

Overlays and tampermonkey scripts for [Rashinban 2025](https://rashinban.org/)

### Game Master (in-game) Mode

- Tampermonkey: https://github.com/Zashness/rashinban2025/raw/refs/heads/gh-pages/tampermonkeys/out/in-game.user.js

### Brackets

- Qualifiers: https://zashness.github.io/rashinban2025/brackets.html
- Finals: https://zashness.github.io/rashinban2025/brackets-finals.html

### Interval (countdown)

- Overlay: https://zashness.github.io/rashinban2025/interval.html

### Interview

- Overlay: https://zashness.github.io/rashinban2025/interview.html

### For Analyst

- Tampermonkey: https://github.com/Zashness/rashinban2025/blob/gh-pages/tampermonkeys/fullscreen-player.user.js

## Developer Setup

### One time setup

```
npm ci
```

### Run tests locally

You can run screenshot tests for brackets.html and brackets-finals.html (assumption: using Windows).

```
npm run test:ui
```

### Update snapshots (when a visual change is intended)

If the screenshot tests failed because of intended UI changes, update the screenshots:

```
npm run test:update
```
