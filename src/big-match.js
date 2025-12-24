import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// 1. Core Scene Initialization (4GB RAM Optimized) [cite: 2025-12-18]
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020202);
scene.fog = new THREE.FogExp2(0x020202, 0.05);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding; // Texture Protection [cite: 2025-12-18]
document.body.appendChild(renderer.domElement);

// 2. Lighting System (Safari Bundle Glow) [cite: 2025-12-18]
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// 3. Asset Verification & Loading [cite: 2025-12-18]
const loader = new GLTFLoader();

// Load verified character only [cite: 2025-12-18]
const playerFile = 'assets/72010ab8-172a-4341-82fd-b7f14babc100.glb';
loader.load(playerFile, (gltf) => {
    const player = gltf.scene;
    player.position.set(0, 0, 0); // Spawn Point
    scene.add(player);
    console.log("MMA AI: Player '7' Spawned in Big Match.");
    
    // Weapon Equip Logic [cite: 2025-12-18]
    loader.load('assets/mp40_gun.glb', (gun) => {
        const hand = player.getObjectByName('RightHand');
        if(hand) hand.add(gun.scene);
    });
});

// 4. Match Map Generation (CS Style Circle) [cite: 2025-12-18]
const mapFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x111111 })
);
mapFloor.rotation.x = -Math.PI / 2;
scene.add(mapFloor);

// 5. Camera & Loop [cite: 2025-12-18]
camera.position.set(0, 2, 5);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle Chromebook Resize [cite: 2025-12-18]
window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};
