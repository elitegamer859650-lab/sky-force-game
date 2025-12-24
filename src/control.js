export class PlayerControls {
    constructor(model, camera) {
        this.model = model;
        this.camera = camera;
        this.speed = 0.1;
        this.keys = {};

        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);
    }

    update() {
        if (!this.model) return;

        // Movement Logic [cite: 2025-12-18]
        if (this.keys['KeyW']) this.model.translateZ(this.speed);
        if (this.keys['KeyS']) this.model.translateZ(-this.speed);
        if (this.keys['KeyA']) this.model.rotation.y += 0.05;
        if (this.keys['KeyD']) this.model.rotation.y -= 0.05;

        // Camera follow logic
        this.camera.position.lerp(
            new THREE.Vector3(this.model.position.x, this.model.position.y + 2, this.model.position.z - 5), 
            0.1
        );
        this.camera.lookAt(this.model.position);
    }
}
