export function scrollToTop() {
  const duration = 500;
  const start = window.scrollY;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smoother animation
    const easeProgress = 1 - Math.pow(1 - progress, 4);

    window.scrollTo(0, start * (1 - easeProgress));

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
}
