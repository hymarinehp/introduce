/**
 * Ultra-smooth custom scroll animation with easeInOutCubic easing
 * @param {number} targetY - Destination scroll Y position
 * @param {number} duration - Animation duration in ms (default 750ms)
 */
export const smoothScrollTo = (targetY, duration = 750) => {
  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetY - startY;

  // Don't animate if already at destination
  if (Math.abs(distance) < 2) return;

  let startTime = null;

  // Smooth easeInOutCubic curve for silky smooth acceleration and deceleration
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animation = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easeProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * easeProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

/**
 * Scroll to a specific section element by ID with header offset
 * @param {string} sectionId - Target section ID
 * @param {number} offset - Y offset for sticky navbar (default -80px)
 */
export const scrollToSectionId = (sectionId, offset = -80) => {
  if (sectionId === 'hero') {
    smoothScrollTo(0, 750);
    return;
  }

  const element = document.getElementById(sectionId);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
    smoothScrollTo(Math.max(0, y), 750);
  }
};
