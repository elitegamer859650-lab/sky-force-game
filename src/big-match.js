import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { NetworkEngine } from './multiplayer-sync.js';
import { CombatEngine } from './combat-system.js';

// --- WORLD SETTINGS ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Real Sky Blue
scene.fog = new THREE.Fog(0x87ceeb, 50, 500);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement);

// --- LIGHTING ---
const sun = new THREE.DirectionalLight(0xffffff, 1.5);
sun.position.set(100, 200, 100);
scene.add(sun);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// --- TERRAIN & LOCATIONS ---
const floor = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), new THREE.MeshStandardMaterial({ color: 0x348C31 })); // Green Grass
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Safe Zone [cite: 2025-11-26]
const zoneGeo = new THREE.TorusGeometry(200, 1, 16, 100);
const zoneMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const safeZone = new THREE.Mesh(zoneGeo, zoneMat);
safeZone.rotation.x = Math.PI / 2;
scene.add(safeZone);

// --- GUNS & LOOT SPREAD ---
const guns = [];
function spawnLoot(x, z, type) {
    const box = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 2), new THREE.MeshStandardMaterial({ color: 0xffd700 }));
    box.position.set(x, 0.25, z);
    box.name = "LOOT_" + type;
    scene.add(box);
    guns.push(box);
}
spawnLoot(10, 10, "MP40"); spawnLoot(-30, 40, "AK47"); // Spread guns [cite: 2025-12-18]

// --- AIRPLANE LOGIC ---
const airplane = new THREE.Mesh(new THREE.BoxGeometry(20, 5, 40), new THREE.MeshStandardMaterial({ color: 0xffffff }));
airplane.position.set(-300, 100, 0);
scene.add(airplane);

// --- PLAYER & SYSTEMS ---
let playerModel, network, combat, isJumping = false;
const loader = new GLTFLoader();

loader.load('assets/72010ab8-172a-4341-82fd-b7f14babc100.glb', (gltf) => {
    playerModel = gltf.scene;
    playerModel.position.copy(airplane.position); 
    scene.add(playerModel);
    
    network = new NetworkEngine(scene, playerModel, "87654321");
    combat = new CombatEngine("87654321", false);
});

// --- JUMP & MOVEMENT ---
window.addEventListener('keydown', (e) => {
    if(e.code === 'Space' && !isJumping) {
        isJumping = true; // Exit airplane [cite: 2025-12-18]
    }
});

// --- MAIN LOOP ---
function animate() {
    requestAnimationFrame(animate);
    
    // Airplane Move
    airplane.position.x += 0.5;
    if(!isJumping && playerModel) playerModel.position.x = airplane.position.x;
    
    // Gravity if Jumped
    if(isJumping && playerModel && playerModel.position.y > 0) {
        playerModel.position.y -= 0.2; // Fall down
    }

    // Zone Shrink [cite: 2025-11-26]
    safeZone.scale.x -= 0.00005;
    safeZone.scale.y -= 0.00005;

    if (network) network.updateLocalPosition();
    renderer.render(scene, camera);
}
animate();
