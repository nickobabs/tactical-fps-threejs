import { setTextIfChanged } from './hudText.js';

export function createHudObjectiveWidgetsController({
  plantProgressEl,
  plantProgressLabelEl,
  plantProgressFillEl,
}) {
  let lastPlantProgressVisible = null;
  let lastPlantProgressLabel = '';
  let lastPlantProgressValue = -1;

  return {
    update({ paused, utilityHudState }) {
      const plantProgressRatio = utilityHudState && utilityHudState.plantDuration > 0
        ? Math.max(0, Math.min(1, Number(utilityHudState.plantProgress ?? 0) / Number(utilityHudState.plantDuration ?? 1)))
        : 0;
      const plantProgressVisible = !paused && plantProgressRatio > 0;

      if (plantProgressVisible !== lastPlantProgressVisible) {
        plantProgressEl.classList.toggle('hud__plant-progress--active', plantProgressVisible);
        lastPlantProgressVisible = plantProgressVisible;
      }

      const plantProgressLabel = plantProgressVisible ? 'PLANTING' : '';
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
