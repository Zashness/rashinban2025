/**
 * Scrolling marquee of sponsor logos.
 */

const defaultLogos = [
  { src: 'assets/logos/red-tokyo.png' },
  { src: 'assets/logos/TAMURA_BUILDS__color.png' },
  { src: 'assets/logos/spicescode.png' },
  { src: 'assets/logos/geoguessr-logo.png' },
  { src: 'assets/logos/geoguessr-record_logo.png' },
];

export async function initSponsorMarquee({
  containerId = 'sponsor-marquee',
  logos = defaultLogos,
  speed = 40, // px/sec
  gap = 72, // px
  height = 64, // px
  bottom = 142, // px, distance of the logos' center from the bottom of the screen
} = {}) {
  const wrap = document.getElementById(containerId);
  if (!wrap || !logos.length) return;
  wrap.style.setProperty('--bottom', `${bottom}px`);

  // Clear & build
  wrap.innerHTML = '';
  const track = document.createElement('div');
  track.className = 'sponsor-track';
  track.style.setProperty('--logo-h', `${height}px`);
  track.style.setProperty('--gap', `${gap}px`);
  wrap.appendChild(track);

  const makeSlide = () => {
    const slide = document.createElement('div');
    slide.className = 'sponsor-slide';
    logos.forEach((logo) => {
      const img = document.createElement('img');
      img.src = logo.src;
      img.decoding = 'async';
      img.loading = 'eager';
      slide.appendChild(img);
    });
    return slide;
  };

  // first slide (the “unit” we loop by)
  const slideA = makeSlide();
  track.appendChild(slideA);

  // wait for images to settle before measuring
  await waitForImages(slideA);

  // animate exactly one "unit" width
  const styles = getComputedStyle(track);
  const gapPx = parseFloat(styles.columnGap || styles.gap) || 0;
  const unitWidth = Math.ceil(slideA.getBoundingClientRect().width + gapPx);

  // duplicate slides until we’re safely > 2× container width
  while (track.scrollWidth < wrap.clientWidth * 2) {
    track.appendChild(slideA.cloneNode(true));
  }
  const duration = unitWidth / Math.max(1, speed); // seconds

  track.style.setProperty('--scroll-distance', `${unitWidth}px`);
  track.style.setProperty('--marquee-duration', `${duration}s`);
  track.classList.add('is-ready');
}

function waitForImages(root) {
  const imgs = Array.from(root.querySelectorAll('img'));
  return Promise.all(
    imgs.map((img) => {
      if (img.complete && img.naturalWidth) return Promise.resolve();
      if (img.decode) return img.decode().catch(() => {});
      return new Promise((res) => {
        img.addEventListener('load', res, { once: true });
        img.addEventListener('error', res, { once: true });
      });
    })
  );
}
