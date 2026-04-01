import * as THREE from 'three';

let rgbeLoaderModulePromise = null;

async function loadRGBELoader() {
  if (!rgbeLoaderModulePromise) {
    rgbeLoaderModulePromise = import('three/examples/jsm/loaders/RGBELoader.js');
  }

  return rgbeLoaderModulePromise;
}

export function preloadSkyboxModules() {
  return loadRGBELoader();
}

export class SkyboxManager {
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;
    this.backgroundTexture = null;
    this.environmentTexture = null;
    this.loadToken = 0;
  }

  async setSkybox(path, { backgroundIntensity = 1, environmentIntensity = 1 } = {}) {
    const loadToken = ++this.loadToken;

    try {
      const { RGBELoader } = await loadRGBELoader();
      const texture = await new RGBELoader().loadAsync(path);
      if (loadToken !== this.loadToken) {
        texture.dispose();
        return;
      }

      texture.mapping = THREE.EquirectangularReflectionMapping;

      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      pmremGenerator.compileEquirectangularShader();

      this.backgroundTexture?.dispose();
      this.environmentTexture?.dispose();
      this.backgroundTexture = texture;
      this.environmentTexture = pmremGenerator.fromEquirectangular(texture).texture;

      this.scene.background = this.backgroundTexture;
      this.scene.environment = this.environmentTexture;
      this.scene.backgroundIntensity = backgroundIntensity;
      this.scene.environmentIntensity = environmentIntensity;

      pmremGenerator.dispose();
    } catch (error) {
      console.error(`Failed to load HDR skybox "${path}".`, error);
    }
  }

  dispose() {
    this.backgroundTexture?.dispose();
    this.environmentTexture?.dispose();
  }
}
