export function setTextIfChanged(element, nextText, lastText) {
  if (lastText !== nextText) {
    element.textContent = nextText;
    return nextText;
  }

  return lastText;
}
