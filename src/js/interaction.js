import * as THREE from 'three';
import TWEEN from 'tween.js';

export function setupInteraction(renderer, scene, camera) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let currentIntersection = null;

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (currentIntersection) {
      const prevObj = currentIntersection.object;
      prevObj.scale.set(
        prevObj.userData.originalScale,
        prevObj.userData.originalScale,
        prevObj.userData.originalScale
      );
    }

    if (intersects.length > 0 && intersects[0].object.userData.originalColor) {
      currentIntersection = intersects[0];
      const obj = intersects[0].object;
      obj.scale.set(
        obj.userData.originalScale * 1.05,
        obj.userData.originalScale * 1.05,
        obj.userData.originalScale * 1.05
      );
    } else {
      currentIntersection = null;
    }
  }

  function onClick(event) {
    if (currentIntersection) {
      const obj = currentIntersection.object;
      animateClick(obj);

      const infoPanel = document.getElementById('info-panel');
      const partName = document.getElementById('part-name');
      const partDesc = document.getElementById('part-description');

      partName.textContent = obj.name;
      partDesc.textContent = obj.userData.description;

      infoPanel.classList.remove('hidden');
      setTimeout(() => infoPanel.classList.add('hidden'), 5000);
    }
  }

  function animateClick(obj) {
    const originalScale = obj.scale.clone();
    const targetScale = originalScale.clone().multiplyScalar(1.2);

    new TWEEN.Tween(obj.scale)
      .to(targetScale, 100)
      .easing(TWEEN.Easing.Elastic.Out)
      .chain(new TWEEN.Tween(obj.scale).to(originalScale, 300))
      .start();
  }

  renderer.domElement.addEventListener('mousemove', onMouseMove);
  renderer.domElement.addEventListener('click', onClick);
}