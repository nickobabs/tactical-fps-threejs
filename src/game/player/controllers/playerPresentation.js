import * as THREE from 'three';
import { NETCODE_SIMULATION_STEP } from '../../../shared/netcode.js';

const PRESENTATION_TARGET_WORLD = new THREE.Vector3();
const IMMEDIATE_PRESENTATION_VELOCITY = new THREE.Vector3();
const RESPONSIVE_PRESENTATION_OFFSET = new THREE.Vector3();

const CORRECTION_OFFSET_DECAY = 18;
const CORRECTION_OFFSET_EPSILON = 0.0001;
const PRESENTATION_MAX_EXTRAPOLATION = NETCODE_SIMULATION_STEP;
const RESPONSIVE_OFFSET_GAIN = 0.012;
const RESPONSIVE_OFFSET_DECAY = 16;
const RESPONSIVE_OFFSET_MAX = 0.08;

export function updatePresentationState({
  delta,
  alpha = 1,
  position,
  correctionOffsetWorld,
  responsivePresentationOffset,
  immediateVelocity,
  presentationTargetPosition,
}) {
  const damping = Math.exp(-CORRECTION_OFFSET_DECAY * delta);
  correctionOffsetWorld.multiplyScalar(damping);

  if (correctionOffsetWorld.lengthSq() <= CORRECTION_OFFSET_EPSILON * CORRECTION_OFFSET_EPSILON) {
    correctionOffsetWorld.set(0, 0, 0);
  }

  const responsiveDecay = Math.exp(-RESPONSIVE_OFFSET_DECAY * delta);
  responsivePresentationOffset.multiplyScalar(responsiveDecay);
  RESPONSIVE_PRESENTATION_OFFSET.set(
    immediateVelocity.x * RESPONSIVE_OFFSET_GAIN,
    0,
    immediateVelocity.z * RESPONSIVE_OFFSET_GAIN,
  );
  responsivePresentationOffset.addScaledVector(
    RESPONSIVE_PRESENTATION_OFFSET.sub(responsivePresentationOffset),
    1 - responsiveDecay,
  );
  if (responsivePresentationOffset.lengthSq() > RESPONSIVE_OFFSET_MAX * RESPONSIVE_OFFSET_MAX) {
    responsivePresentationOffset.setLength(RESPONSIVE_OFFSET_MAX);
  }

  PRESENTATION_TARGET_WORLD.copy(position).addScaledVector(
    IMMEDIATE_PRESENTATION_VELOCITY.set(
      immediateVelocity.x,
      immediateVelocity.y,
      immediateVelocity.z,
    ),
    THREE.MathUtils.clamp(alpha, 0, 1) * PRESENTATION_MAX_EXTRAPOLATION,
  );
  PRESENTATION_TARGET_WORLD.add(responsivePresentationOffset);
  PRESENTATION_TARGET_WORLD.add(correctionOffsetWorld);
  presentationTargetPosition.copy(PRESENTATION_TARGET_WORLD);
}
