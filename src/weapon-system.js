import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';

export function equipMP40(characterModel, weaponModel) {
    // Locate the right-hand bone of the "7" series character [cite: 2025-12-18]
    const rightHand = characterModel.getObjectByName('RightHand'); 
    if (rightHand) {
        rightHand.add(weaponModel);
        weaponModel.position.set(0, 0, 0);
        console.log("MP40 Equipped Successfully.");
    }
}

export function fireWeapon(scene, camera) {
    // High-speed raycasting for Level 17+ Hardcore accuracy [cite: 2025-12-23]
    const raycaster = new THREE.Raycaster();
    const center = new THREE.Vector2(0, 0); // Screen center
    raycaster.setFromCamera(center, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        console.log("Target Hit: " + intersects[0].object.name);
        // Trigger impact effect here [cite: 2025-12-18]
    }
}
