/**
 * SKY FORCE - PHYSICS ENGINE
 * Prevents falling through the map [cite: 2025-12-18]
 */
export function applyPhysics(player, terrain) {
    const gravity = -0.05;
    player.velocity.y += gravity;
    player.position.y += player.velocity.y;

    // Collision with Mesher.obj Terrain
    if (player.position.y < 0) { // Floor level check
        player.position.y = 0;
        player.velocity.y = 0;
        player.onGround = true;
    }
}
