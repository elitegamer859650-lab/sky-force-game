import { JoystickController } from './joystick-controller.js';
import { applyPhysics } from './world-physics.js';

const joystick = new JoystickController('joystick-stick', 'joystick-base');

function gameLoop() {
    requestAnimationFrame(gameLoop);

    // 1. Move Player based on Joystick [cite: 2025-12-24]
    if (joystick.active) {
        player.position.x += joystick.moveDir.x * 0.1;
        player.position.z += joystick.moveDir.z * 0.1;
    }

    // 2. Apply Gravity
    applyPhysics(player, gameTerrain);

    // 3. Render Three.js Scene
    renderer.render(scene, camera);
}

gameLoop();
