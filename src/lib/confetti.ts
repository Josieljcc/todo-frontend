import confetti from 'canvas-confetti';

/**
 * Trigger a simple confetti burst at a specific position
 * @param x - X position relative to viewport (0-1)
 * @param y - Y position relative to viewport (0-1)
 */
export const triggerTaskCompleteConfetti = (x: number, y: number) => {
  confetti({
    particleCount: 50,
    spread: 70,
    origin: { x, y },
    colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#2563eb'],
    startVelocity: 30,
    gravity: 0.8,
    ticks: 100,
    zIndex: 9999,
  });
};
