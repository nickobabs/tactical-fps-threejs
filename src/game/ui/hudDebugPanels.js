import { setTextIfChanged } from './hudText.js';
import { createHudNetDebugPanelController } from './hudNetDebugPanelController.js';

export function createHudDebugPanelsController({
  roundEl,
  fpsEl,
  weaponEl,
  healthEl,
  utilityEl,
  networkEl,
  movementEl,
  positionEl,
  pointerEl,
  netDebugEl,
  netDebugCopyEl,
}) {
  let lastRoundText = '';
  let lastFpsText = '';
  let lastWeaponText = '';
  let lastHealthText = '';
  let lastUtilityText = '';
  let lastNetworkText = '';
  let lastMovementText = '';
  let lastPositionText = '';
  let lastPointerText = '';
  const netDebugPanelController = createHudNetDebugPanelController({
    netDebugEl,
    netDebugCopyEl,
  });

  return {
    updateDebugText({
      roundText,
      fpsText,
      healthText,
      weaponText,
      utilityText,
      networkText,
      movementText,
      positionText,
      pointerText,
    }) {
      lastRoundText = setTextIfChanged(roundEl, roundText, lastRoundText);
      lastFpsText = setTextIfChanged(fpsEl, fpsText, lastFpsText);
      lastHealthText = setTextIfChanged(healthEl, healthText, lastHealthText);
      lastWeaponText = setTextIfChanged(weaponEl, weaponText, lastWeaponText);
      lastUtilityText = setTextIfChanged(utilityEl, utilityText, lastUtilityText);
      lastNetworkText = setTextIfChanged(networkEl, networkText, lastNetworkText);
      lastMovementText = setTextIfChanged(movementEl, movementText, lastMovementText);
      lastPositionText = setTextIfChanged(positionEl, positionText, lastPositionText);
      lastPointerText = setTextIfChanged(pointerEl, pointerText, lastPointerText);
    },
    updateNetDebug({
      visible,
      networkDebug,
      movement,
      remoteDebug = null,
      markDebugSnapshotRequested = false,
      fps = 0,
      ignoreLocalCorrections = false,
    }) {
      netDebugPanelController.update({
        visible,
        networkDebug,
        movement,
        remoteDebug,
        markDebugSnapshotRequested,
        fps,
        ignoreLocalCorrections,
      });
    },
    logCurrentSummary() {
      netDebugPanelController.logCurrentSummary();
    },
    destroy() {
      netDebugPanelController.destroy();
    },
  };
}
