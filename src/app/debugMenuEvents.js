export const DEBUG_MENU_EVENT_TOGGLE_VIEWMODEL_TUNING = 'tactical-fps:toggle-viewmodel-tuning';
export const DEBUG_MENU_EVENT_TOGGLE_RECOIL_TUNING = 'tactical-fps:toggle-recoil-tuning';
export const DEBUG_MENU_EVENT_TOGGLE_MOVEMENT_TUNING = 'tactical-fps:toggle-movement-tuning';
export const DEBUG_MENU_EVENT_TOGGLE_REMOTE_BODY_TUNING = 'tactical-fps:toggle-remote-body-tuning';
export const DEBUG_MENU_EVENT_TOGGLE_REMOTE_WEAPON_TUNING = 'tactical-fps:toggle-remote-weapon-tuning';

export function dispatchDebugMenuEvent(eventName) {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new CustomEvent(eventName));
}
