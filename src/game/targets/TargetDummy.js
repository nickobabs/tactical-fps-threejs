import * as THREE from 'three';
import { createDamagePopup, updateDamagePopups } from './targetFeedback.js';
import { createTargetView } from './targetView.js';
import {
  resetTargetPresentation,
  setTargetDownedPresentation,
  updateTargetPresentation,
} from './targetPresentation.js';

const MOVE_STEP = new THREE.Vector3();
const TARGET_POINT = new THREE.Vector3();
const LOOK_TARGET = new THREE.Vector3();
const MOVEMENT_DIRECTION = new THREE.Vector3();
const PLAYER_EYE = new THREE.Vector3();
const BOT_EYE = new THREE.Vector3();
const NAV_TARGET = new THREE.Vector3();

function lerpAngle(current, target, alpha) {
  const delta = Math.atan2(Math.sin(target - current), Math.cos(target - current));
  return current + delta * alpha;
}

export class TargetDummy {
  constructor(position = new THREE.Vector3()) {
    const targetView = createTargetView();
    this.group = targetView.group;
    this.group.position.copy(position);
    this.spawnPoint = position.clone();

    this.maxHealth = 100;
    this.health = this.maxHealth;
    this.hitFlash = 0;
    this.respawnDelay = 1.2;
    this.respawnTimer = 0;
    this.popups = [];
    this.radius = 0.42;
    this.height = 2.2;
    this.moveSpeed = 2.5;
    this.turnSpeed = 7;
    this.detectionRange = 32;
    this.preferredRange = 0;
    this.wanderTime = 0;
    this.wanderAngle = 0;
    this.path = [];
    this.pathIndex = 0;
    this.pathRepathTime = 0;
    this.lastSeenPlayerPosition = new THREE.Vector3();
    this.hasLastSeenPlayerPosition = false;
    this.hasSightOnPlayer = false;
    this.isAggro = false;
    this.time = Math.random() * Math.PI * 2;
    this.bodyMaterial = targetView.materials.body;
    this.headMaterial = targetView.materials.head;
    this.eyeMaterial = targetView.materials.eyes;
    this.browMaterial = targetView.materials.brows;
    this.expressionGroup = targetView.expressionGroup;
    this.shootables = targetView.shootables;
    const [body, head] = this.shootables;

    body.userData.damageMultiplier = 1;
    head.userData.damageMultiplier = 2;

    this.shootables.forEach((mesh) => {
      mesh.userData.damageReceiver = this;
    });
  }

  getObject() {
    return this.group;
  }

  getShootables() {
    return this.shootables;
  }

  applyDamage(amount, hitPoint = null, source = null) {
    if (this.respawnTimer > 0) {
      return 0;
    }

    const multiplier = source?.object?.userData.damageMultiplier ?? 1;
    const isHeadshot = multiplier > 1;
    const totalDamage = amount * multiplier;

    this.health = Math.max(0, this.health - totalDamage);
    this.hitFlash = 0.18;

    const popup = createDamagePopup(totalDamage, hitPoint, { isHeadshot });
    this.group.worldToLocal(popup.position);
    this.group.add(popup);
    this.popups.push(popup);

    if (this.health === 0) {
      this.respawnTimer = this.respawnDelay;
      setTargetDownedPresentation(this);
    }

    return totalDamage;
  }

  update(delta, context = {}) {
    this.time += delta;
    if (this.respawnTimer > 0) {
      updateTargetPresentation(this, delta);
      this.popups = updateDamagePopups(this.group, this.popups, delta);
      this.respawnTimer = Math.max(0, this.respawnTimer - delta);
      if (this.respawnTimer === 0) {
        this.health = this.maxHealth;
        this.group.position.copy(this.spawnPoint);
        this.path = [];
        this.pathIndex = 0;
        this.pathRepathTime = 0;
        this.hasLastSeenPlayerPosition = false;
        this.isAggro = false;
        resetTargetPresentation(this);
      }
      return;
    }

    this.updateMovement(delta, context);
    updateTargetPresentation(this, delta);
    this.popups = updateDamagePopups(this.group, this.popups, delta);
  }

  updateMovement(delta, {
    playerPosition = null,
    playerEyePosition = null,
    collisionWorld = null,
    navigationManager = null,
  } = {}) {
    if (!playerPosition) {
      this.hasSightOnPlayer = false;
      this.isAggro = false;
      return;
    }

    const floor = collisionWorld?.getGroundHeightAt(
      this.group.position.x,
      this.group.position.z,
      this.group.position.y,
      0.45,
    ) ?? 0;
    this.group.position.y = floor;

    TARGET_POINT.copy(playerPosition).sub(this.group.position);
    TARGET_POINT.y = 0;

    const distanceToPlayer = TARGET_POINT.length();
    BOT_EYE.set(this.group.position.x, this.group.position.y + 1.55, this.group.position.z);
    if (playerEyePosition) {
      PLAYER_EYE.copy(playerEyePosition);
    } else {
      PLAYER_EYE.set(playerPosition.x, playerPosition.y + 1.55, playerPosition.z);
    }
    this.hasSightOnPlayer = collisionWorld?.hasLineOfSight(BOT_EYE, PLAYER_EYE) ?? true;
    if (this.hasSightOnPlayer) {
      this.lastSeenPlayerPosition.copy(playerPosition);
      this.hasLastSeenPlayerPosition = true;
    }

    const playerDetected = distanceToPlayer <= this.detectionRange && this.hasSightOnPlayer;
    this.isAggro = playerDetected;
    if (navigationManager?.ready) {
      this.updateNavigationMovement(delta, {
        playerDetected,
        playerPosition,
        navigationManager,
        collisionWorld,
      });
      return;
    }

    this.updateFallbackMovement(delta, { playerDetected, playerPosition, collisionWorld, floor });
  }

  updateNavigationMovement(delta, {
    playerDetected,
    playerPosition,
    navigationManager,
    collisionWorld,
  }) {
    this.pathRepathTime = Math.max(0, this.pathRepathTime - delta);

    if (playerDetected) {
      if (this.pathRepathTime === 0) {
        this.path = navigationManager.computePath(this.group.position, playerPosition);
        this.pathIndex = this.path.length > 1 ? 1 : 0;
        this.pathRepathTime = 0.45;
      }
    } else {
      this.wanderTime -= delta;
      if (this.path.length === 0 || this.pathIndex >= this.path.length || this.wanderTime <= 0) {
        const wanderTarget = navigationManager.getRandomPointAround(this.group.position, 16)
          ?? navigationManager.getRandomPointAround(this.spawnPoint, 22)
          ?? navigationManager.getRandomPoint();
        if (wanderTarget) {
          this.path = navigationManager.computePath(this.group.position, wanderTarget);
          this.pathIndex = this.path.length > 1 ? 1 : 0;
          this.wanderTime = 2.5 + Math.random() * 2.5;
        }
      }
    }

    if (this.hasLastSeenPlayerPosition && !playerDetected && this.path.length === 0) {
      this.path = navigationManager.computePath(this.group.position, this.lastSeenPlayerPosition);
      this.pathIndex = this.path.length > 1 ? 1 : 0;
      this.hasLastSeenPlayerPosition = false;
    }

    if (this.path.length === 0 || this.pathIndex >= this.path.length) {
      return;
    }

    NAV_TARGET.copy(this.path[this.pathIndex]);
    NAV_TARGET.y = this.group.position.y;
    LOOK_TARGET.copy(NAV_TARGET).sub(this.group.position);
    LOOK_TARGET.y = 0;

    if (LOOK_TARGET.lengthSq() < 0.25) {
      this.pathIndex += 1;
      if (this.pathIndex >= this.path.length) {
        this.path = [];
      }
      return;
    }

    MOVEMENT_DIRECTION.copy(LOOK_TARGET).normalize();
    this.faceDirection(MOVEMENT_DIRECTION, delta);
    MOVE_STEP.copy(MOVEMENT_DIRECTION).multiplyScalar(this.moveSpeed * delta);
    const nextPosition = collisionWorld
      ? collisionWorld.move(this.group.position, this.radius, this.height, MOVE_STEP)
      : this.group.position.clone().add(MOVE_STEP);

    this.group.position.x = nextPosition.x;
    this.group.position.z = nextPosition.z;
    this.group.position.y = collisionWorld?.getGroundHeightAt(
      nextPosition.x,
      nextPosition.z,
      this.group.position.y,
      0.45,
    ) ?? this.group.position.y;
  }

  updateFallbackMovement(delta, { playerDetected, playerPosition, collisionWorld, floor }) {
    let shouldAdvance = false;
    if (playerDetected) {
      if (this.group.position.distanceTo(playerPosition) > this.preferredRange) {
        MOVEMENT_DIRECTION.copy(TARGET_POINT).normalize();
        shouldAdvance = true;
      }
    } else {
      this.wanderTime -= delta;
      if (this.wanderTime <= 0) {
        this.wanderTime = 1.6 + Math.random() * 1.8;
        this.wanderAngle = this.time * 0.7 + Math.sin(this.time * 1.3) * 1.2;
      }

      MOVEMENT_DIRECTION.set(Math.sin(this.wanderAngle), 0, Math.cos(this.wanderAngle));
      if (this.group.position.distanceToSquared(this.spawnPoint) > 64) {
        LOOK_TARGET.copy(this.spawnPoint).sub(this.group.position);
        LOOK_TARGET.y = 0;
        if (LOOK_TARGET.lengthSq() > 0.001) {
          MOVEMENT_DIRECTION.copy(LOOK_TARGET).normalize();
        }
      }
      shouldAdvance = true;
    }

    if (!shouldAdvance) {
      if (playerDetected && TARGET_POINT.lengthSq() > 0.001) {
        this.faceDirection(TARGET_POINT, delta);
      }
      return;
    }

    this.faceDirection(MOVEMENT_DIRECTION, delta);
    MOVE_STEP.copy(MOVEMENT_DIRECTION).multiplyScalar(this.moveSpeed * delta);
    const nextPosition = collisionWorld
      ? collisionWorld.move(this.group.position, this.radius, this.height, MOVE_STEP)
      : this.group.position.clone().add(MOVE_STEP);

    this.group.position.x = nextPosition.x;
    this.group.position.z = nextPosition.z;
    this.group.position.y = collisionWorld?.getGroundHeightAt(
      nextPosition.x,
      nextPosition.z,
      this.group.position.y,
      0.45,
    ) ?? floor;
  }

  faceDirection(direction, delta) {
    if (direction.lengthSq() <= 1e-6) {
      return;
    }

    const desiredYaw = Math.atan2(direction.x, direction.z);
    this.group.rotation.y = lerpAngle(
      this.group.rotation.y,
      desiredYaw,
      Math.min(1, delta * this.turnSpeed),
    );
  }

  destroy() {
    this.popups = updateDamagePopups(this.group, this.popups, Infinity);
  }
}
