/**
 * SKY FORCE - Settings & Optimization Manager
 * Controls Graphics and Audio for Low-End Devices [cite: 2025-12-24]
 */
export class SettingsManager {
    constructor() {
        this.config = JSON.parse(localStorage.getItem('game_settings')) || {
            graphics: 'HIGH',
            music: true,
            sfx: true
        };
    }

    /**
     * Update Graphics Quality [cite: 2025-12-18]
     * @param {string} level - 'LOW' or 'HIGH'
     */
    setGraphics(level) {
        this.config.graphics = level;
        this.save();
        // Dhayeen! Reload to apply changes or call renderer update
        alert("Graphics set to " + level + ". Please restart lobby for best effect.");
    }

    /**
     * Toggle Audio [cite: 2025-11-26]
     */
    toggleMusic(status) {
        this.config.music = status;
        this.save();
    }

    save() {
        localStorage.setItem('game_settings', JSON.stringify(this.config));
    }

    /**
     * Apply settings to Three.js Renderer [cite: 2025-12-24]
     */
    applyToRenderer(renderer) {
        if (this.config.graphics === 'LOW') {
            renderer.setPixelRatio(0.5); // Lower resolution for 4GB RAM [cite: 2025-12-18]
            renderer.shadowMap.enabled = false;
        } else {
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
        }
    }
}
