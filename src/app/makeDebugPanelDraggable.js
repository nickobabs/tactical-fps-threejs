function isInteractiveTarget(target) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName;
  return target.isContentEditable || tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || tagName === 'BUTTON';
}

export function makeDebugPanelDraggable(panel, handle) {
  if (!(panel instanceof HTMLElement) || !(handle instanceof HTMLElement) || typeof window === 'undefined') {
    return { destroy() {} };
  }

  handle.style.cursor = 'move';
  handle.style.userSelect = 'none';
  handle.style.touchAction = 'none';

  let dragState = null;

  const handlePointerMove = (event) => {
    if (!dragState) {
      return;
    }

    const nextLeft = dragState.originLeft + (event.clientX - dragState.startX);
    const nextTop = dragState.originTop + (event.clientY - dragState.startY);
    const maxLeft = Math.max(0, window.innerWidth - panel.offsetWidth);
    const maxTop = Math.max(0, window.innerHeight - panel.offsetHeight);

    panel.style.left = `${Math.min(Math.max(0, nextLeft), maxLeft)}px`;
    panel.style.top = `${Math.min(Math.max(0, nextTop), maxTop)}px`;
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
    panel.style.transform = 'none';
  };

  const stopDragging = () => {
    if (!dragState) {
      return;
    }
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', stopDragging);
    window.removeEventListener('pointercancel', stopDragging);
    dragState = null;
  };

  const handlePointerDown = (event) => {
    if (event.button !== 0 || isInteractiveTarget(event.target)) {
      return;
    }

    const rect = panel.getBoundingClientRect();
    panel.style.left = `${rect.left}px`;
    panel.style.top = `${rect.top}px`;
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
    panel.style.transform = 'none';

    dragState = {
      startX: event.clientX,
      startY: event.clientY,
      originLeft: rect.left,
      originTop: rect.top,
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDragging);
    window.addEventListener('pointercancel', stopDragging);
    handle.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  };

  handle.addEventListener('pointerdown', handlePointerDown);

  return {
    destroy() {
      stopDragging();
      handle.removeEventListener('pointerdown', handlePointerDown);
    },
  };
}
