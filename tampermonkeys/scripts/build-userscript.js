/**
 * Builds the in-game tampermonkey userscript using esbuild.
 * Usage: `npm run build:tm` or `npm run build:tampermonkey`
 */

import esbuild from 'esbuild';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..', '..');
const HEADER_FILE = path.join(ROOT, 'tampermonkeys', 'src', 'userscript-header.txt');
const DO_NOT_MODIFY_BLOCK = path.join(ROOT, 'tampermonkeys', 'src', 'do-not-modify-header.txt');
const ENTRY = path.join(ROOT, 'tampermonkeys', 'src', 'in-game.user.js');
const OUT_FILE = path.join(ROOT, 'tampermonkeys', 'out', 'in-game.user.js');

const header =
  readFileSync(HEADER_FILE, 'utf8').trimEnd() +
  '\n\n' +
  readFileSync(DO_NOT_MODIFY_BLOCK, 'utf8').trimEnd();

esbuild
  .build({
    entryPoints: [ENTRY],
    bundle: true,
    format: 'iife',
    banner: { js: header },
    loader: { '.css': 'text' },
    platform: 'browser',
    target: 'es2020',
    outfile: OUT_FILE,
  })
  .then(() => {
    console.log(`[build-userscript] wrote tampermonkeys/out/in-game.user.js`);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
