import { createDesertCompound } from './DesertCompound.js';
import { createTrainingGround } from './TrainingGround.js';

export const MAP_OPTIONS = [
  {
    id: 'training-ground',
    label: 'Training Ground',
    create: createTrainingGround,
  },
  {
    id: 'desert-compound',
    label: 'Desert Compound',
    create: createDesertCompound,
  },
];

export function getMapOption(mapId) {
  return MAP_OPTIONS.find((option) => option.id === mapId) ?? null;
}
