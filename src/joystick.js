/**
 * SKY FORCE - JOYSTICK ENGINE
 * Converts 2D Touch to 3D Player Movement [cite: 2025-12-24]
 */
export class JoystickController {
    constructor(stickID, baseID) {
        this.stick = document.getElementById(stickID);
        this.base = document.getElementById(baseID);
        this.moveDir = { x: 0, z: 0 };
        this.active = false;
        this.init();
    }

    init() {
        this.base.addEventListener('touchstart', (e) => this.start(e));
        this.base.addEventListener('touchmove', (e) => this.move(e));
        this.base.addEventListener('touchend', () => this.end());
    }

    start(e) { this.active = true; }

    move(e) {
        if (!this.active) return;
        const touch = e.touches[0];
        const rect = this.base.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let dx = touch.clientX - centerX;
        let dy = touch.clientY - centerY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const maxRadius = rect.width / 2;

        if (dist > maxRadius) {
            dx *= maxRadius / dist;
            dy *= maxRadius / dist;
        }

        this.stick.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
        this.moveDir.x = dx / maxRadius;
        this.moveDir.z = dy / maxRadius;
    }

    end() {
        this.active = false;
        this.stick.style.transform = 'translate(-50%, -50%)';
        this.moveDir = { x: 0, z: 0 };
    }
}
