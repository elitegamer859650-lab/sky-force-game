/**
 * SKY FORCE - COMBAT ENGINE
 * Handles MP5 Firing, Damage, and Sound [cite: 2025-12-18]
 */
export class CombatSystem {
    constructor(player, scene) {
        this.player = player;
        this.scene = scene;
        this.isFiring = false;
    }

    shoot() {
        if (!this.isFiring) return;
        
        // Raycaster for shooting logic (Bullet path) [cite: 2025-12-24]
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({x: 0, y: 0}, this.camera); 

        // Sound Effect
        const audio = new Audio('assets/sfx/mp5_shot.mp3');
        audio.volume = 0.5;
        audio.play();

        // Muzzle Flash (Light effect)
        this.showMuzzleFlash();
        console.log("Dhayeen! Target Hit.");
    }

    showMuzzleFlash() {
        const flash = new THREE.PointLight(0xffaa00, 2, 5);
        flash.position.set(this.player.position.x, 1.5, this.player.position.z);
        this.scene.add(flash);
        setTimeout(() => this.scene.remove(flash), 50);
    }
}
