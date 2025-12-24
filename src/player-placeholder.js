/**
 * Creates a Temporary Player Cube [cite: 2025-12-18]
 */
export function createPlayer(scene) {
    const geometry = new THREE.BoxGeometry(1, 2, 1); // Player shape
    const material = new THREE.MeshLambertMaterial({ color: 0xff0000 }); // Red Color
    const player = new THREE.Mesh(geometry, material);
    
    player.position.y = 1; // Zameen se thora oopar
    scene.add(player);
    return player;
}
