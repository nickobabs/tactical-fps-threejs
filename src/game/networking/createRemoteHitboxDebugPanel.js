import { DEBUG_MENU_EVENT_TOGGLE_REMOTE_HITBOX_DEBUG } from '../../app/debugMenuEvents.js';
import { makeDebugPanelDraggable } from '../../app/makeDebugPanelDraggable.js';

const TOGGLES = [
  ['enabled', 'Enable F3 Debug', 'Master remote-hitbox debug toggle. `F3` still flips this on or off quickly.'],
  ['showLatestHitboxes', 'Latest Hitboxes', 'Show latest authoritative hitboxes from the newest remote snapshot.'],
  ['showLatestMarkers', 'Latest Position Gap', 'Show rendered vs latest-authoritative root markers and connector line.'],
  ['showRewoundHitboxes', 'Rewound Hitboxes', 'Show hitboxes from the client-side lag-comp rewind approximation.'],
  ['showRewoundMarkers', 'Rewound Position Gap', 'Show rendered vs rewound-authority root markers and connector line.'],
];

function createCheckboxRow(labelText, helpText) {
  const wrapper = document.createElement('label');
  wrapper.style.display = 'block';
  wrapper.style.marginBottom = '10px';
  wrapper.style.padding = '8px';
  wrapper.style.border = '1px solid rgba(174, 211, 255, 0.16)';
  wrapper.style.borderRadius = '8px';
  wrapper.style.background = 'rgba(255,255,255,0.04)';

  const topRow = document.createElement('div');
  topRow.style.display = 'flex';
  topRow.style.alignItems = 'center';
  topRow.style.justifyContent = 'space-between';
  topRow.style.gap = '8px';

  const label = document.createElement('span');
  label.textContent = labelText;
  label.style.fontWeight = '700';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.style.accentColor = '#aed3ff';

  const help = document.createElement('div');
  help.textContent = helpText;
  help.style.marginTop = '4px';
  help.style.fontSize = '11px';
  help.style.lineHeight = '1.35';
  help.style.color = 'rgba(174, 211, 255, 0.82)';

  topRow.append(label, checkbox);
  wrapper.append(topRow, help);

  return { wrapper, checkbox };
}

export function createRemoteHitboxDebugPanel({ remotePlayerPresenter }) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '16px';
  overlay.style.right = '688px';
  overlay.style.zIndex = '10000';
  overlay.style.width = '320px';
  overlay.style.maxHeight = 'calc(100vh - 32px)';
  overlay.style.overflowY = 'auto';
  overlay.style.padding = '12px';
  overlay.style.border = '1px solid rgba(174, 211, 255, 0.2)';
  overlay.style.borderRadius = '10px';
  overlay.style.background = 'rgba(10, 14, 20, 0.92)';
  overlay.style.color = '#eef5ff';
  overlay.style.fontFamily = 'monospace';
  overlay.style.fontSize = '12px';
  overlay.style.display = 'none';
  overlay.style.backdropFilter = 'blur(10px)';
  document.body.appendChild(overlay);

  const title = document.createElement('div');
  title.textContent = 'Remote Hitbox Debug';
  title.style.fontWeight = '700';
  title.style.marginBottom = '8px';
  overlay.appendChild(title);
  const dragController = makeDebugPanelDraggable(overlay, title);

  const help = document.createElement('div');
  help.textContent = 'Split remote hitbox debug into latest-authority and rewound-authority views for hitreg checks.';
  help.style.marginBottom = '8px';
  help.style.color = 'rgba(174, 211, 255, 0.9)';
  overlay.appendChild(help);

  const rows = new Map();
  for (const [key, labelText, helpText] of TOGGLES) {
    const row = createCheckboxRow(labelText, helpText);
    row.checkbox.addEventListener('input', () => {
      remotePlayerPresenter?.setHitboxDebugSetting?.(key, row.checkbox.checked);
      sync();
    });
    rows.set(key, row);
    overlay.appendChild(row.wrapper);
  }

  const status = document.createElement('div');
  status.style.marginTop = '6px';
  status.style.paddingTop = '8px';
  status.style.borderTop = '1px solid rgba(174, 211, 255, 0.14)';
  status.style.fontSize = '11px';
  status.style.lineHeight = '1.4';
  status.style.color = 'rgba(174, 211, 255, 0.86)';
  overlay.appendChild(status);

  function formatDist(value) {
    return Number(value ?? 0).toFixed(3);
  }

  function formatAngle(value) {
    return Number(value ?? 0).toFixed(1);
  }

  function sync() {
    const settings = remotePlayerPresenter?.getHitboxDebugSettings?.() ?? {};
    for (const [key, row] of rows.entries()) {
      row.checkbox.checked = Boolean(settings[key]);
    }

    const debugState = remotePlayerPresenter?.getDebugState?.() ?? null;
    const latestPoints = debugState?.pose?.points?.latestError ?? null;
    const rewoundPoints = debugState?.pose?.points?.rewoundError ?? null;
    const latestChain = debugState?.pose?.points?.latestChain ?? null;
    const rewoundChain = debugState?.pose?.points?.rewoundChain ?? null;
    status.textContent = [
      `Tracked remotes: ${Number(debugState?.trackedRemoteCount ?? 0)}`,
      `Focus: ${debugState?.focusDisplayName ?? debugState?.focusPlayerId ?? 'none'}`,
      `Rewind ms: ${Number(debugState?.rewindMs ?? 0).toFixed(1)}`,
      `Latest xz gap: ${Number(debugState?.horizontalDistance ?? 0).toFixed(3)}`,
      `Rewound xz gap: ${Number(debugState?.rewoundHorizontalDistance ?? 0).toFixed(3)}`,
      `Anim: ${debugState?.animation?.presentationState ?? 'none'} target=${debugState?.animation?.targetClip ?? 'none'} base=${debugState?.animation?.baseClip ?? 'none'}`,
      `Auth: target=${debugState?.animation?.authoritativeTargetClip ?? 'none'} base=${debugState?.animation?.authoritativeBaseClip ?? 'none'} active=${debugState?.animation?.authoritativeActiveClip ?? 'none'}`,
      `Layers: active=${debugState?.animation?.activeCharacterClip ?? 'none'} upper=${debugState?.animation?.activeUpperBodyClip ?? 'none'} full=${debugState?.animation?.fullBodyActionClip ?? 'none'} lock=${debugState?.animation?.fireBaseLocked ? 'yes' : 'no'}`,
      `Pts latest xz: h=${formatDist(latestPoints?.head?.horizontalDistance)} n=${formatDist(latestPoints?.neck?.horizontalDistance)} s=${formatDist(latestPoints?.spine?.horizontalDistance)} lc=${formatDist(latestPoints?.leftClavicle?.horizontalDistance)} rc=${formatDist(latestPoints?.rightClavicle?.horizontalDistance)}`,
      `Pts rewind xz: h=${formatDist(rewoundPoints?.head?.horizontalDistance)} n=${formatDist(rewoundPoints?.neck?.horizontalDistance)} s=${formatDist(rewoundPoints?.spine?.horizontalDistance)} lc=${formatDist(rewoundPoints?.leftClavicle?.horizontalDistance)} rc=${formatDist(rewoundPoints?.rightClavicle?.horizontalDistance)}`,
      `Chain latest deg: s-n=${formatAngle(latestChain?.spineToNeck?.angleDegrees)} n-h=${formatAngle(latestChain?.neckToHead?.angleDegrees)} clav=${formatAngle(latestChain?.clavicleSpan?.angleDegrees)}`,
      `Chain rewind deg: s-n=${formatAngle(rewoundChain?.spineToNeck?.angleDegrees)} n-h=${formatAngle(rewoundChain?.neckToHead?.angleDegrees)} clav=${formatAngle(rewoundChain?.clavicleSpan?.angleDegrees)}`,
    ].join('\n');
  }

  const handleToggle = () => {
    const nextVisible = overlay.style.display === 'none';
    overlay.style.display = nextVisible ? 'block' : 'none';
    if (nextVisible) {
      sync();
    }
  };

  window.addEventListener(DEBUG_MENU_EVENT_TOGGLE_REMOTE_HITBOX_DEBUG, handleToggle);

  return {
    sync,
    destroy() {
      window.removeEventListener(DEBUG_MENU_EVENT_TOGGLE_REMOTE_HITBOX_DEBUG, handleToggle);
      dragController.destroy();
      overlay.remove();
    },
  };
}
