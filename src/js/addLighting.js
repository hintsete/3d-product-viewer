import * as THREE from 'three';

export function addLighting(scene) {
  const lights = {};

  // Ambient light
  lights.ambient = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(lights.ambient);

  // Directional light (sun)
  lights.directional = new THREE.DirectionalLight(0xffffff, 1);
  lights.directional.position.set(5, 10, 7);
  lights.directional.castShadow = true;
  lights.directional.shadow.mapSize.width = 2048;
  lights.directional.shadow.mapSize.height = 2048;
  scene.add(lights.directional);

  return lights;
}