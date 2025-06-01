import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// To this (newer Three.js versions):
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { initScene, initCamera, initRenderer, initControls } from './initScene.js';
import { addLighting } from './addLighting.js';
import { createProduct } from './createProduct.js';
import { setupInteraction } from './interaction.js';
import { updateCameraAnimation } from './cameraAnimation.js';
import TWEEN from 'tween.js';

// Global variables
let scene, camera, renderer, controls, product, lights;
let autoRotate = true;
let rotationSpeed = 0.5;

// Initialize the application
function init() {
  scene = initScene();
  camera = initCamera();
  renderer = initRenderer();
  controls = initControls(camera, renderer);
  lights = addLighting(scene);
  product = createProduct(scene);
  setupInteraction(renderer, scene, camera);

  // Event listeners
  window.addEventListener('resize', onWindowResize);
  document.getElementById('toggle-rotation').addEventListener('click', toggleRotation);
  document.getElementById('reset-view').addEventListener('click', resetView);

  // Start animation loop
  animate();
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();

  if (autoRotate) {
    updateCameraAnimation(camera);
  }

  controls.update();
  renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Toggle auto-rotation
function toggleRotation() {
  autoRotate = !autoRotate;
  const button = document.getElementById('toggle-rotation');
  button.textContent = autoRotate ? 'Pause Rotation' : 'Resume Rotation';
}

// Reset camera view
function resetView() {
  controls.reset();
  camera.position.set(0, 2, 5);
  controls.update();
}

// Start the application
init();