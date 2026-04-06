export function getBufferedCorrectionStep({
  bufferedCorrection,
  delta,
  blendRate,
  maxCorrectionPerStep,
  epsilon,
  stepTarget,
}) {
  if (bufferedCorrection.lengthSq() <= epsilon * epsilon) {
    stepTarget.set(0, 0, 0);
    return false;
  }

  const alpha = 1 - Math.exp(-blendRate * delta);
  stepTarget.copy(bufferedCorrection).multiplyScalar(alpha);
  if (stepTarget.lengthSq() > maxCorrectionPerStep * maxCorrectionPerStep) {
    stepTarget.setLength(maxCorrectionPerStep);
  }

  return stepTarget.lengthSq() > epsilon * epsilon;
}

export function shouldDropBufferedCorrection({
  appliedCorrection,
  requestedCorrection,
  epsilon,
}) {
  return (
    appliedCorrection.lengthSq() <= epsilon * epsilon
    && requestedCorrection.lengthSq() > epsilon * epsilon
  );
}
