import {
  buildHudDebugSummary,
  buildHudNetDebugText,
  pushHudDebugHistory,
} from './hudNetDebugText.js';

export function createHudNetDebugPanelController({
  netDebugEl,
  netDebugCopyEl,
}) {
  let lastNetDebugText = '';
  let lastNetDebugCopyHidden = true;
  let currentNetDebugText = '';
  let copyFeedbackTimeoutId = 0;
  let lastCopyButtonLabel = 'Copy';
  const debugHistory = [];

  async function copyNetDebugToClipboard() {
    const debugText = netDebugEl.textContent?.trim() || currentNetDebugText?.trim() || '';
    if (!debugText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(debugText);
      netDebugCopyEl.textContent = 'Copied';
    } catch (error) {
      console.warn('[Hud] Failed to copy net debug to clipboard.', error);
      netDebugCopyEl.textContent = 'Copy failed';
    }

    if (copyFeedbackTimeoutId > 0) {
      window.clearTimeout(copyFeedbackTimeoutId);
    }

    copyFeedbackTimeoutId = window.setTimeout(() => {
      netDebugCopyEl.textContent = lastCopyButtonLabel;
      copyFeedbackTimeoutId = 0;
    }, 1500);
  }

  function handleCopyClick() {
    void copyNetDebugToClipboard();
  }

  netDebugCopyEl.addEventListener('click', handleCopyClick);

  return {
    update({
      visible,
      networkDebug,
      movement,
      remoteDebug = null,
      markDebugSnapshotRequested = false,
      fps = 0,
      ignoreLocalCorrections = false,
    }) {
      if (visible || markDebugSnapshotRequested) {
        pushHudDebugHistory(debugHistory, { networkDebug, movement, fps });
      }

      if (visible) {
        const debugText = buildHudNetDebugText(networkDebug, movement, { ignoreLocalCorrections, remoteDebug });
        if (debugText !== lastNetDebugText) {
          netDebugEl.textContent = debugText;
          lastNetDebugText = debugText;
        }
        currentNetDebugText = debugText;
      } else if (currentNetDebugText) {
        currentNetDebugText = '';
      }

      if (markDebugSnapshotRequested) {
        currentNetDebugText = buildHudNetDebugText(networkDebug, movement, { ignoreLocalCorrections, remoteDebug });
        console.log(buildHudDebugSummary(debugHistory, currentNetDebugText));
      }

      const netDebugCopyHidden = !visible;
      if (netDebugCopyHidden !== lastNetDebugCopyHidden) {
        netDebugCopyEl.hidden = netDebugCopyHidden;
        lastNetDebugCopyHidden = netDebugCopyHidden;
      }
    },
    logCurrentSummary() {
      if (currentNetDebugText) {
        console.log(buildHudDebugSummary(debugHistory, currentNetDebugText));
      }
    },
    destroy() {
      netDebugCopyEl.removeEventListener('click', handleCopyClick);
      if (copyFeedbackTimeoutId > 0) {
        window.clearTimeout(copyFeedbackTimeoutId);
      }
    },
  };
}
