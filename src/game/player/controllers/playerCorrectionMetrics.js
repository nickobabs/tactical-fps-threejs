export function recordRecentCorrectionEvent(eventLog, now, windowMs = 1000) {
  eventLog.push(now);
  while (eventLog.length > 0 && now - eventLog[0] > windowMs) {
    eventLog.shift();
  }
}
