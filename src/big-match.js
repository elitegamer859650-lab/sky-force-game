import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { NetworkEngine } from './multiplayer-sync.js';
import { CombatEngine } from './combat-system.js';
import { MAP_SETTINGS } from './Map-Config.js';

// 1. Core Scene & World [cite: 2025-12-18]
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky Blue [cite: 2025-12-18]
scene.fog = new THREE.FogExp2(0x87ceeb, 0.01);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// 2. Lighting (Safari Bundle Glow Fix)
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

// 3. Terrain & Map Infrastructure [cite: 2025-12-18]
const terrainGeo = new THREE.PlaneGeometry(500, 500);
const terrainMat = new THREE.MeshStandardMaterial({ color: 0x222222 }); // Dark Ground
const terrain = new THREE.Mesh(terrainGeo, terrainMat);
terrain.rotation.x = -Math.PI / 2;
scene.add(terrain);

// Safe Zone Circle [cite: 2025-11-26]
const zoneGeo = new THREE.TorusGeometry(MAP_SETTINGS.safeZone.radius, 0.5, 16, 100);
const zoneMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const safeZone = new THREE.Mesh(zoneGeo, zoneMat);
safeZone.rotation.x = Math.PI / 2;
scene.add(safeZone);

// 4. Asset Loading (Character & Weapons)
const loader = new GLTFLoader();
let playerModel, network, combat;

const playerFile = 'assets/72010ab8-172a-4341-82fd-b7f14babc100.glb';
loader.load(playerFile, (gltf) => {
    playerModel = gltf.scene;
    playerModel.position.set(0, 50, 0); // Start in Airplane height [cite: 2025-12-18]
    scene.add(playerModel);
    
    // Initialize Engines [cite: 2025-12-23]
    network = new NetworkEngine(scene, playerModel, "87654321");
    combat = new CombatEngine("87654321", false);

    loader.load('assets/mp40_gun.glb', (gun) => {
        const hand = playerModel.getObjectByName('RightHand');
        if(hand) hand.add(gun.scene);
    });
});

// 5. Combat & Firing Logic [cite: 2025-12-18]
window.addEventListener('mousedown', () => {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(0,0), camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
        const target = intersects[0].object;
        if (target.name.startsWith("Player_")) {
            const targetUID = target.name.split("_")[1];
            // Damage Sync to Server
            combat.takeDamage(25); // Local test
            console.log("Dhayeen! Hit on: " + targetUID);
        }
    }
});

// 6. Game Loop (Movement & Zone Shrink) [cite: 2025-11-26]
function animate() {
    requestAnimationFrame(animate);
    
    if (network) network.updateLocalPosition();
    
    // Zone Shrinking Logic [cite: 2025-12-18]
    if (safeZone.scale.x > 0.1) {
        safeZone.scale.x -= 0.0001;
        safeZone.scale.y -= 0.0001;
    }

    // Airplane/Jump Physics Logic can be added here
    
    renderer.render(scene, camera);
}
animate();

window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};
