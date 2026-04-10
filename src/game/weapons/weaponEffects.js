import * as THREE from 'three';

const DEFAULT_NORMAL = new THREE.Vector3(0, 1, 0);

function createImpactMarker(point, normal = DEFAULT_NORMAL) {
  const marker = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffb36b }),
  );
  marker.position.copy(point).addScaledVector(normal, 0.05);
  marker.userData.life = 0.1;
  return marker;
}

function createTracer(start, end) {
  const geometry = new THREE.BufferGeometry().setFromPoints([start.clone(), end.clone()]);
  const material = new THREE.LineBasicMaterial({
    color: 0xffe7b0,
    transparent: true,
    opacity: 0.9,
  });

  const tracer = new THREE.Line(geometry, material);
  tracer.userData.life = 0.05;
  return tracer;
}

export function addImpactEffect(scene, temporaryObjects, start, hit) {
  const marker = createImpactMarker(hit.point, hit.face?.normal ?? DEFAULT_NORMAL);
  const tracer = createTracer(start, hit.point);
  scene.add(marker, tracer);
  temporaryObjects.push(marker, tracer);
}

export function addMissTracer(scene, temporaryObjects, start, end) {
  const tracer = createTracer(start, end);
  scene.add(tracer);
  temporaryObjects.push(tracer);
}

export function updateTemporaryEffects(scene, temporaryObjects, delta) {
  for (let i = temporaryObjects.length - 1; i >= 0; i -= 1) {
    const object = temporaryObjects[i];
    object.userData.life -= delta;

    if (object.material?.opacity !== undefined) {
      object.material.opacity = Math.max(object.userData.life * 10, 0);
    }

    if (object.userData.life <= 0) {
      object.geometry?.dispose?.();
      object.material?.dispose?.();
      scene.remove(object);
      temporaryObjects.splice(i, 1);
    }
  }
}
