/**
 * Pure CSS/JS Confetti Effect
 * Satisfies Category 14:
 * - Localized burst when user clicks the correct answer on their FIRST tap.
 * - Zero external dependencies, emojis, or remote services.
 * - Pure DOM elements with CSS transforms and opacity fading.
 */

export function triggerConfetti(originX?: number, originY?: number): void {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '99999';
  container.style.overflow = 'hidden';

  const startX = originX !== undefined ? originX : window.innerWidth / 2;
  const startY = originY !== undefined ? originY : window.innerHeight / 3;

  const colors = ['#EC5B38', '#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6'];
  const particleCount = 42;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const color = colors[i % colors.length];
    const size = Math.floor(Math.random() * 8) + 6; // 6px to 14px
    const isCircle = Math.random() > 0.5;

    particle.style.position = 'absolute';
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = isCircle ? `${size}px` : `${size * 1.6}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = isCircle ? '50%' : '2px';
    particle.style.opacity = '1';
    particle.style.willChange = 'transform, opacity';
    particle.style.transition = 'transform 1.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.4s ease-out';

    container.appendChild(particle);

    // Calculate spread trajectory
    const angle = Math.random() * 2 * Math.PI;
    const velocity = Math.random() * 220 + 80;
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity + Math.random() * 120 + 40; // gravity bias
    const rot = Math.floor(Math.random() * 720) - 360;

    // Trigger animation in next animation frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        particle.style.transform = `translate(${destX}px, ${destY}px) rotate(${rot}deg)`;
        particle.style.opacity = '0';
      });
    });
  }

  document.body.appendChild(container);

  setTimeout(() => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }, 1800);
}
