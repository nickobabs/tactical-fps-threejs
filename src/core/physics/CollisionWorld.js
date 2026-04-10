import * as THREE from 'three';
import { MeshBVH } from 'three-mesh-bvh';

const CAPSULE_BOX = new THREE.Box3();
const CAPSULE_SEGMENT = new THREE.Line3();
const TRIANGLE_POINT = new THREE.Vector3();
const CAPSULE_POINT = new THREE.Vector3();
const PUSH_DIRECTION = new THREE.Vector3();
const TRIANGLE_NORMAL = new THREE.Vector3();
const GROUND_RAY = new THREE.Ray();
const VISIBILITY_RAY = new THREE.Ray();
const VISIBILITY_DIRECTION = new THREE.Vector3();
const HIT_RAY = new THREE.Ray();
const HIT_DIRECTION = new THREE.Vector3();
const PENETRATION_EPSILON = 1e-3;
const COLLISION_SKIN = 0.015;
const MOVE_STEP_DELTA = new THREE.Vector3();
const MOVE_START = new THREE.Vector3();
const MAX_HORIZONTAL_MOVE_SUBSTEP = 0.08;
const MAX_COLLISION_PASSES = 8;

export class CollisionWorld {
  constructor({ groundHeight = 0, collisionGeometry = null } = {}) {
    this.groundHeight = groundHeight;
    this.collisionGeometry = collisionGeometry ?? null;

    if (this.collisionGeometry && !this.collisionGeometry.boundsTree) {
      this.collisionGeometry.boundsTree = new MeshBVH(this.collisionGeometry, {
        maxLeafSize: 16,
      });
    }
  }

  getGroundHeight() {
    return this.groundHeight;
  }

  getGroundHeightAt(x, z, currentY = Infinity, maxStepUp = Infinity, maxDrop = 12, fallbackToGroundHeight = false) {
    if (!this.collisionGeometry?.boundsTree || !Number.isFinite(currentY)) {
      return fallbackToGroundHeight ? this.groundHeight : null;
    }

    const rayOriginY = currentY + maxStepUp + 0.05;
    GROUND_RAY.origin.set(x, rayOriginY, z);
    GROUND_RAY.direction.set(0, -1, 0);

    const hit = this.collisionGeometry.boundsTree.raycastFirst(
      GROUND_RAY,
      THREE.DoubleSide,
      0,
      maxStepUp + maxDrop + 0.1,
    );

    if (!hit || (hit.face?.normal?.y ?? 0) <= 0.15) {
      return fallbackToGroundHeight ? this.groundHeight : null;
    }

    return hit.point.y;
  }

  move(position, radius, height, delta, target = position) {
    if (!this.collisionGeometry?.boundsTree) {
      return target.copy(position).add(delta);
    }

    MOVE_START.copy(position);
    const moveDistance = Math.hypot(delta.x, delta.y, delta.z);
    const steps = Math.max(1, Math.ceil(moveDistance / MAX_HORIZONTAL_MOVE_SUBSTEP));
    target.copy(position);

    for (let stepIndex = 1; stepIndex <= steps; stepIndex += 1) {
      const alpha = stepIndex / steps;
      const nextX = MOVE_START.x + delta.x * alpha;
      const nextY = MOVE_START.y + delta.y * alpha;
      const nextZ = MOVE_START.z + delta.z * alpha;

      target.set(nextX, nextY, nextZ);
      const segmentStartY = target.y + radius;
      const segmentEndY = target.y + Math.max(radius, height - radius);

      CAPSULE_SEGMENT.start.set(target.x, segmentStartY, target.z);
      CAPSULE_SEGMENT.end.set(target.x, segmentEndY, target.z);

      for (let i = 0; i < MAX_COLLISION_PASSES; i += 1) {
        let adjusted = false;

        CAPSULE_BOX.makeEmpty();
        CAPSULE_BOX.expandByPoint(CAPSULE_SEGMENT.start);
        CAPSULE_BOX.expandByPoint(CAPSULE_SEGMENT.end);
        CAPSULE_BOX.min.addScalar(-radius);
        CAPSULE_BOX.max.addScalar(radius);

        this.collisionGeometry.boundsTree.shapecast({
          intersectsBounds: (box) => box.intersectsBox(CAPSULE_BOX),
          intersectsTriangle: (triangle) => {
            triangle.getNormal(TRIANGLE_NORMAL);
            if (TRIANGLE_NORMAL.y > 0.35) {
              return false;
            }

            const distance = triangle.closestPointToSegment(
              CAPSULE_SEGMENT,
              TRIANGLE_POINT,
              CAPSULE_POINT,
            );

            const targetSeparation = radius + COLLISION_SKIN;
            if (distance >= targetSeparation) {
              return false;
            }

            PUSH_DIRECTION.copy(CAPSULE_POINT).sub(TRIANGLE_POINT);
            if (PUSH_DIRECTION.lengthSq() < 1e-8) {
              PUSH_DIRECTION.copy(TRIANGLE_NORMAL);
            }
            if (PUSH_DIRECTION.lengthSq() < 1e-8) {
              return false;
            }
            PUSH_DIRECTION.normalize();

            const depth = targetSeparation - distance;
            if (depth <= PENETRATION_EPSILON) {
              return false;
            }

            CAPSULE_SEGMENT.start.addScaledVector(PUSH_DIRECTION, depth);
            CAPSULE_SEGMENT.end.addScaledVector(PUSH_DIRECTION, depth);
            adjusted = true;
            return false;
          },
        });

        if (!adjusted) {
          break;
        }
      }

      target.set(
        CAPSULE_SEGMENT.start.x,
        CAPSULE_SEGMENT.start.y - radius,
        CAPSULE_SEGMENT.start.z,
      );
    }

    return target;
  }

  hasLineOfSight(start, end, padding = 0.05) {
    if (!this.collisionGeometry?.boundsTree) {
      return true;
    }

    VISIBILITY_DIRECTION.copy(end).sub(start);
    const distance = VISIBILITY_DIRECTION.length();
    if (distance <= 1e-4) {
      return true;
    }

    VISIBILITY_DIRECTION.divideScalar(distance);
    VISIBILITY_RAY.origin.copy(start);
    VISIBILITY_RAY.direction.copy(VISIBILITY_DIRECTION);

    const hit = this.collisionGeometry.boundsTree.raycastFirst(
      VISIBILITY_RAY,
      THREE.DoubleSide,
      0,
      distance - padding,
    );

    return !hit;
  }

  raycast(start, direction, maxDistance = Infinity) {
    if (!this.collisionGeometry?.boundsTree) {
      return null;
    }

    HIT_DIRECTION.copy(direction);
    const directionLength = HIT_DIRECTION.length();
    if (directionLength <= 1e-6) {
      return null;
    }

    HIT_DIRECTION.divideScalar(directionLength);
    HIT_RAY.origin.copy(start);
    HIT_RAY.direction.copy(HIT_DIRECTION);

    return this.collisionGeometry.boundsTree.raycastFirst(
      HIT_RAY,
      THREE.DoubleSide,
      0,
      maxDistance,
    );
  }
}
