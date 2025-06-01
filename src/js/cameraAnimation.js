import * as THREE from 'three';

let cameraAngle = 0;
const cameraRadius = 5;
const cameraHeight = 2;

export function updateCameraAnimation(camera) {
  cameraAngle += 0.002;
  const x = Math.sin(cameraAngle) * cameraRadius;
  const z = Math.cos(cameraAngle) * cameraRadius;

  camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, 0.05);
  camera.position.z = THREE.MathUtils.lerp(camera.position.z, z, 0.05);
  camera.position.y = THREE.MathUtils.lerp(camera.position.y, cameraHeight, 0.05);

  camera.lookAt(0, 1, 0);
}
