import * as THREE from 'three';

export function createProduct(scene) {
  const product = new THREE.Group();
  product.name = "RoboBuddy";

  product.position.y = -1.0;

  // Main body (torso)
  const torso = createPart(
    'torso',
    new THREE.BoxGeometry(1.5, 2, 1),
    { color: 0x4a6fa5, metalness: 0.7, roughness: 0.3 },
    [0, 1, 0]
  );
  product.add(torso);

  // Head
  const head = createPart(
    'head',
    new THREE.SphereGeometry(0.8, 32, 32),
    { color: 0xffffff, metalness: 0.8, roughness: 0.2 },
    [0, 2.8, 0]
  );
//   const head = createPart(
//   'head',
//   new THREE.SphereGeometry(0.8, 32, 32),
//   {
//     color: 0xffffff,
//     metalness: 0.8,
//     roughness: 0.2,
//     emissive: new THREE.Color(0xffa500), // warm orange glow like sun
//     emissiveIntensity: 1.5
//   },
//   [0, 2.8, 0]
// );

  product.add(head);
  

  // Eyes, Arms, Legs, Antenna (same as before)
  // ... (refer to previous code for full implementation)

  scene.add(product);
  return product;
}

function createPart(name, geometry, materialOptions, position, rotation = [0, 0, 0]) {
  const material = new THREE.MeshStandardMaterial(materialOptions);
  const part = new THREE.Mesh(geometry, material);

  part.name = name;
  part.position.set(...position);
  part.rotation.set(...rotation);
  part.castShadow = true;
  part.receiveShadow = true;

  part.userData = {
    originalColor: materialOptions.color,
    originalScale: 1,
    description: getPartDescription(name),
  };

  return part;
}

function getPartDescription(partName) {
  const descriptions = {
    torso: "Main processing unit and power core.",
    head: "Sensor array with 360° vision.",
    leftEye: "Left optical sensor with night vision.",
    rightEye: "Right optical sensor with zoom.",
    leftArm: "Left manipulator arm.",
    rightArm: "Right manipulator arm.",
    leftLeg: "Left mobility unit.",
    rightLeg: "Right mobility unit.",
    antennaBase: "Communication array base.",
    antennaBall: "Emergency beacon.",
  };

  return descriptions[partName] || "Modular component.";
}
// createProduct.js
// import * as THREE from 'three';

// export function createProduct(scene) {
//   const lamp = new THREE.Group();
//   lamp.name = "DeskLamp";

//   // Base of the lamp
//   const base = createPart(
//     'base',
//     new THREE.CylinderGeometry(1, 1, 0.2, 32),
//     { color: 0x555555, metalness: 0.6, roughness: 0.4 },
//     [0, 0.1, 0]
//   );
//   lamp.add(base);

//   // Neck of the lamp (cylindrical arm)
//   const neck = createPart(
//     'neck',
//     new THREE.CylinderGeometry(0.1, 0.1, 2, 32),
//     { color: 0x333333, metalness: 0.7, roughness: 0.3 },
//     [0, 1.2, 0]
//   );
//   lamp.add(neck);

//   // Lamp head (cone shape)
//   const lampHead = new THREE.Mesh(
//     new THREE.ConeGeometry(0.8, 1, 32),
//     new THREE.MeshStandardMaterial({ color: 0xfff8e7, metalness: 0.3, roughness: 0.7 })
//   );
//   lampHead.position.set(0, 2.5, 0);
//   lampHead.rotation.x = Math.PI / 6;  // tilt the lamp head a bit
//   lampHead.castShadow = true;
//   lampHead.receiveShadow = true;
//   lamp.add(lampHead);

//   // Bulb inside the lamp head (emissive glowing sphere)
//   const bulb = new THREE.Mesh(
//     new THREE.SphereGeometry(0.15, 16, 16),
//     new THREE.MeshStandardMaterial({ emissive: 0xffffaa, emissiveIntensity: 1 })
//   );
//   bulb.position.set(0, 2.45, 0.2); // inside the lamp head, slightly forward
//   lamp.add(bulb);

//   // SpotLight to simulate the lamp's light beam
//   const lampLight = new THREE.SpotLight(0xfff7e8, 1.2);
//   lampLight.position.set(0, 2.5, 0);
//   lampLight.angle = Math.PI / 6;  // about 30 degrees cone
//   lampLight.penumbra = 0.2;       // softness of the edges
//   lampLight.decay = 2;            // light falloff
//   lampLight.distance = 10;        // range of the light
//   lampLight.castShadow = true;
//   lampLight.shadow.mapSize.width = 512;
//   lampLight.shadow.mapSize.height = 512;
//   lampLight.shadow.camera.near = 0.5;
//   lampLight.shadow.camera.far = 20;

//   lamp.add(lampLight);

//   scene.add(lamp);
//   return lamp;
// }

// function createPart(name, geometry, materialOptions, position, rotation = [0, 0, 0]) {
//   const material = new THREE.MeshStandardMaterial(materialOptions);
//   const part = new THREE.Mesh(geometry, material);

//   part.name = name;
//   part.position.set(...position);
//   part.rotation.set(...rotation);
//   part.castShadow = true;
//   part.receiveShadow = true;

//   part.userData = {
//     originalColor: materialOptions.color,
//     originalScale: 1,
//     description: getPartDescription(name),
//   };

//   return part;
// }

// function getPartDescription(partName) {
//   const descriptions = {
//     base: "Sturdy base to keep the lamp stable.",
//     neck: "Adjustable neck to position the light.",
//     lampHead: "Cone-shaped lamp head focusing the light.",
//     bulb: "Glowing bulb emitting warm light.",
//   };

//   return descriptions[partName] || "Modular component.";
// }
