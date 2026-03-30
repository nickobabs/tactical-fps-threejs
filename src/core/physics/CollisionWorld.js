import * as THREE from 'three';
import { MeshBVH } from 'three-mesh-bvh';

const CAPSULE_BOX = new THREE.Box3();
const CAPSULE_SEGMENT = new THREE.Line3();
const TRIANGLE_POINT = new THREE.Vector3();
const CAPSULE_POINT = new THREE.Vector3();
const PUSH_DIRECTION = new THREE.Vector3();
const GROUND_RAY = new THREE.Ray();
const VISIBILITY_RAY = new THREE.Ray();
const VISIBILITY_DIRECTION = new THREE.Vector3();

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

  getGroundHeightAt(x, z, currentY = Infinity, maxStepUp = Infinity, maxDrop = 12) {
    if (!this.collisionGeometry?.boundsTree || !Number.isFinite(currentY)) {
      return this.groundHeight;
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
      return this.groundHeight;
    }

    return Math.max(this.groundHeight, hit.point.y);
  }

  move(position, radius, height, delta) {
    const next = position.clone().add(delta);

    if (!this.collisionGeometry?.boundsTree) {
      return next;
    }

    const segmentStartY = next.y + radius;
    const segmentEndY = next.y + Math.max(radius, height - radius);

    CAPSULE_SEGMENT.start.set(next.x, segmentStartY, next.z);
    CAPSULE_SEGMENT.end.set(next.x, segmentEndY, next.z);

    for (let i = 0; i < 3; i += 1) {
      let adjusted = false;

      CAPSULE_BOX.makeEmpty();
      CAPSULE_BOX.expandByPoint(CAPSULE_SEGMENT.start);
      CAPSULE_BOX.expandByPoint(CAPSULE_SEGMENT.end);
      CAPSULE_BOX.min.addScalar(-radius);
      CAPSULE_BOX.max.addScalar(radius);

      this.collisionGeometry.boundsTree.shapecast({
        intersectsBounds: (box) => box.intersectsBox(CAPSULE_BOX),
        intersectsTriangle: (triangle) => {
          const distance = triangle.closestPointToSegment(
            CAPSULE_SEGMENT,
            TRIANGLE_POINT,
            CAPSULE_POINT,
          );

          if (distance >= radius) {
            return false;
          }

          PUSH_DIRECTION.copy(CAPSULE_POINT).sub(TRIANGLE_POINT);
          if (PUSH_DIRECTION.lengthSq() < 1e-8) {
            triangle.getNormal(PUSH_DIRECTION);
          } else {
            PUSH_DIRECTION.normalize();
          }

          const depth = radius - distance;
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

    next.set(
      CAPSULE_SEGMENT.start.x,
      CAPSULE_SEGMENT.start.y - radius,
      CAPSULE_SEGMENT.start.z,
    );

    return next;
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
}
