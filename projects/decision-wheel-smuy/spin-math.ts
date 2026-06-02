/** Ease-out cubic — fast start, gentle deceleration like friction. */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Compute final rotation (degrees) to land pointer on segment index. */
export function targetRotationForSegment(
  index: number,
  segmentCount: number,
  extraSpins = 5
): number {
  const segmentAngle = 360 / segmentCount;
  const jitter = (Math.random() - 0.5) * segmentAngle * 0.4;
  const landAngle =
    (((360 - (index + 0.5) * segmentAngle + jitter) % 360) + 360) % 360;
  const spins = extraSpins + Math.floor(Math.random() * 3);
  return 360 * spins + landAngle;
}

/** Which segment index sits under the top pointer at this rotation. */
export function segmentAtRotation(rotationDeg: number, segmentCount: number): number {
  const segmentAngle = 360 / segmentCount;
  const normalized = ((rotationDeg % 360) + 360) % 360;
  const raw = (360 - normalized) / segmentAngle - 0.5;
  return ((Math.round(raw) % segmentCount) + segmentCount) % segmentCount;
}
