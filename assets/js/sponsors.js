/**
 * Scrolling marquee of sponsor logos.
 */

/**
 * Each logo has:
 *  - src {string} Required. Relative path (or URL) to the logo/image asset.
 *  - class {string} Optional. Extra CSS class to apply to the rendered <img>.
 */
const defaultLeftLogos = [
  { src: 'assets/logos/red-tokyo-logo.svg', class: 'logo-red-tokyo' },
  { src: 'assets/logos/tamura-builds-white.svg' },
];
const defaultRightLogos = [
  { src: 'assets/logos/spicescode-white.svg', class: 'logo-spicescode' },
  { src: 'assets/logos/geoguessr-m.svg', class: 'logo-geoguessr' },
  { src: 'assets/logos/geoguessr-record.svg', class: 'logo-geoguessr-record' },
];

export async function initSponsors({
  containerId = 'sponsors',
  leftLogos = defaultLeftLogos,
  rightLogos = defaultRightLogos,
  delay = 12, // sec
  height = 84, // px
  bottom = 142, // px, distance of the logos' center from the bottom of the screen
  gap = 72, // px, distance between logos
  left = 0, // px, distance from the left edge of the screen to the leftmost logo
  width = 1920,
} = {}) {
  const wrap = document.getElementById(containerId);
  if (!wrap || leftLogos.length + rightLogos.length === 0) return;
  wrap.style.setProperty('--bottom', `${bottom}px`);
  wrap.style.setProperty('--logo-h', `${height}px`);
  wrap.style.setProperty('--gap', `${gap}px`);
  wrap.style.setProperty('--left', `${left}px`);
  wrap.style.setProperty('--width', `${width}px`);

  // Clear & build
  wrap.innerHTML = '';
  const leftLogoContainer = document.createElement('div');
  leftLogoContainer.className = 'sponsor-left-logos';
  wrap.appendChild(leftLogoContainer);
  leftLogos.forEach((logo) => {
    const img = document.createElement('img');
    img.src = logo.src;
    img.className = logo.class || '';
    // special case for red tokyo, it needs more vertical space and offset
    if (logo.src === 'assets/logos/red-tokyo-logo.svg') {
      img.classList.add('red-tokyo');
    }
    img.decoding = 'async';
    img.loading = 'eager';
    leftLogoContainer.appendChild(img);
  });

  const rightLogoContainer = document.createElement('div');
  rightLogoContainer.className = 'sponsor-right-container';
  wrap.appendChild(rightLogoContainer);
  const rightLogo = document.createElement('img');
  rightLogo.id = 'sponsor-right';
  rightLogo.decoding = 'async';
  rightLogo.loading = 'eager';
  rightLogoContainer.appendChild(rightLogo);

  let currentIndex = 0;
  rightLogo.className = rightLogos[currentIndex].class || '';
  rightLogo.src = rightLogos[currentIndex].src;
  setInterval(() => {
    rightLogo.style.opacity = '0';
    // load the next logo while the node is invisible
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % rightLogos.length;
      rightLogo.className = rightLogos[currentIndex].class || '';
      rightLogo.src = rightLogos[currentIndex].src;
    }, 300);
    // fade the logo back in after the src has been changed, hopefully 300ms is enough time for the image to load
    setTimeout(() => {
      rightLogo.style.opacity = '1';
    }, 600);
  }, delay * 1000);
}
