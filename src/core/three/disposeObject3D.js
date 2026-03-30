export function disposeObject3D(root) {
  if (!root) {
    return;
  }

  root.traverse((object) => {
    object.geometry?.dispose?.();

    const materials = Array.isArray(object.material)
      ? object.material
      : object.material
        ? [object.material]
        : [];

    materials.forEach((material) => {
      if (!material) {
        return;
      }

      for (const value of Object.values(material)) {
        if (value?.isTexture) {
          value.dispose?.();
        }
      }

      material.dispose?.();
    });
  });
}
