import { createRemoteAudioEvent } from '../../shared/audioEvents.js';

export function resetPendingEventQueues(client) {
  client.pendingCombatEvents = [];
  client.pendingAudioEvents = [];
  client.pendingChatEvents = [];
}

export function enqueueCombatEvent(client, message) {
  client.pendingCombatEvents.push(message);
}

export function enqueueAudioEvent(client, message) {
  client.pendingAudioEvents.push(createRemoteAudioEvent(message));
}

export function enqueueChatEvent(client, message) {
  client.pendingChatEvents.push(message ?? null);
}

export function consumePendingEvents(client, key) {
  const events = client[key];
  client[key] = [];
  return events;
}

export function applyGameplayState(client, message) {
  client.roundState = message?.round ?? null;
  client.objectiveState = message?.objective ?? null;
  client.gameplaySettings = message?.gameplay ?? null;
  client.sprays = Array.isArray(message?.sprays) ? message.sprays : [];
}

export function resetGameplayState(client) {
  client.roundState = null;
  client.objectiveState = null;
  client.gameplaySettings = null;
  client.sprays = [];
}
