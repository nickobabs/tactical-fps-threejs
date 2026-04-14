import { setTextIfChanged } from './hudText.js';

export function createHudObjectiveWidgetsController({
  plantProgressEl,
  plantProgressLabelEl,
  plantProgressFillEl,
}) {
  let lastPlantProgressVisible = null;
  let lastPlantProgressLabel = '';
  let lastPlantProgressValue = -1;
  let lastDefusing = null;

  return {
    update({ paused, utilityHudState }) {
      const defusing = Number(utilityHudState?.defuseProgress ?? 0) > 0;
      const progressValue = Number(
        defusing
          ? utilityHudState.defuseProgress
          : utilityHudState?.plantProgress ?? 0,
      );
      const progressDuration = Number(
        defusing
          ? utilityHudState.defuseDuration
          : utilityHudState?.plantDuration ?? 0,
      );
      const plantProgressRatio = utilityHudState && progressDuration > 0
        ? Math.max(0, Math.min(1, progressValue / progressDuration))
        : 0;
      const plantProgressVisible = !paused && plantProgressRatio > 0;

      if (plantProgressVisible !== lastPlantProgressVisible) {
        plantProgressEl.classList.toggle('hud__plant-progress--active', plantProgressVisible);
        lastPlantProgressVisible = plantProgressVisible;
      }
      if (defusing !== lastDefusing) {
        plantProgressEl.classList.toggle('hud__plant-progress--defusing', defusing);
        lastDefusing = defusing;
      }

      const plantProgressLabel = plantProgressVisible ? String(utilityHudState?.progressLabel ?? 'PLANTING') : '';
      lastPlantProgressLabel = setTextIfChanged(
        plantProgressLabelEl,
        plantProgressLabel,
        lastPlantProgressLabel,
      );

      if (Math.abs(plantProgressRatio - lastPlantProgressValue) > 0.001) {
        plantProgressFillEl.style.transform = `scaleX(${plantProgressRatio.toFixed(4)})`;
        lastPlantProgressValue = plantProgressRatio;
      }
    },
  };
}
