import { setTextIfChanged } from './hudText.js';

function formatClock(seconds, { ceil = true } = {}) {
  const safeSeconds = Math.max(0, Number(seconds ?? 0));
  const wholeSeconds = ceil ? Math.ceil(safeSeconds) : Math.floor(safeSeconds);
  const minutes = Math.floor(wholeSeconds / 60);
  const remainingSeconds = wholeSeconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function createHudClassicController({
  classicEl,
  topClusterEl,
  bottomClusterEl,
  classicHealthEl,
  classicArmorEl,
  classicTimeEl,
  classicPhaseEl,
  classicAmmoMagEl,
  classicAmmoReserveEl,
  classicWeaponEl,
}) {
  let lastClassicVisible = null;
  let lastClassicBombPlanted = null;
  let lastClassicHealthText = '';
  let lastClassicArmorText = '';
  let lastClassicTimeText = '';
  let lastClassicPhaseText = '';
  let lastClassicAmmoMagText = '';
  let lastClassicAmmoReserveText = '';
  let lastClassicWeaponText = '';

  return {
    update({
      visible,
      roundManager,
      objectiveState,
      localPlayerState,
      weaponHudState,
    }) {
      if (visible !== lastClassicVisible) {
        classicEl.classList.toggle('hud__classic--active', visible);
        topClusterEl?.classList.toggle('hud__cluster--hidden', visible);
        bottomClusterEl?.classList.toggle('hud__cluster--hidden', visible);
        lastClassicVisible = visible;
      }

      const phaseDuration = roundManager
        ? (
          roundManager.phase === 'freeze'
            ? roundManager.freezeDuration
            : roundManager.phase === 'live'
              ? roundManager.liveDuration
              : 0
        )
        : 0;
      const timeLeft = roundManager?.roundEnded
        ? Math.max(0, Number(roundManager.roundEndCountdown ?? 0))
        : objectiveState?.bombState === 'planted'
          ? Math.max(0, Number(objectiveState?.bombTimeRemaining ?? 0))
          : Math.max(0, phaseDuration - Number(roundManager?.phaseTime ?? 0));

      const bombPlanted = objectiveState?.bombState === 'planted';
      const classicHealthText = String(localPlayerState?.health ?? '--');
      const classicArmorText = '0';
      const classicAmmoMagText = weaponHudState && weaponHudState.magazineSize > 0
        ? String(weaponHudState.ammoInMagazine)
        : '--';
      const classicAmmoReserveText = weaponHudState && weaponHudState.magazineSize > 0
        ? String(weaponHudState.reserveAmmo)
        : '--';
      const classicWeaponText = weaponHudState?.activeWeaponLabel ?? '--';

      if (bombPlanted !== lastClassicBombPlanted) {
        classicTimeEl.classList.toggle('hud__classic-time--planted', bombPlanted);
        classicPhaseEl.classList.toggle('hud__classic-phase--planted', bombPlanted);
        lastClassicBombPlanted = bombPlanted;
      }

      lastClassicHealthText = setTextIfChanged(classicHealthEl, classicHealthText, lastClassicHealthText);
      lastClassicArmorText = setTextIfChanged(classicArmorEl, classicArmorText, lastClassicArmorText);
      lastClassicTimeText = setTextIfChanged(classicTimeEl, '', lastClassicTimeText);
      lastClassicPhaseText = setTextIfChanged(classicPhaseEl, '', lastClassicPhaseText);
      lastClassicAmmoMagText = setTextIfChanged(classicAmmoMagEl, classicAmmoMagText, lastClassicAmmoMagText);
      lastClassicAmmoReserveText = setTextIfChanged(classicAmmoReserveEl, classicAmmoReserveText, lastClassicAmmoReserveText);
      lastClassicWeaponText = setTextIfChanged(classicWeaponEl, classicWeaponText, lastClassicWeaponText);
    },
  };
}
