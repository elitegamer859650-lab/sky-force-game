import * as THREE from 'three';
import { setupWorld } from './scene-lighting.js';
import { createPlayer } from './player-placeholder.js';

const scene = new THREE.Scene();
setupWorld(scene); // Roshni on!
const player = createPlayer(scene); // Player on!

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(player.position);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
