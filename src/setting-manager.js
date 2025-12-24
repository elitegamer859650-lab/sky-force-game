/**
 * SKY FORCE - Settings & Custom HUD Manager
 * Stores Sensitivity, Graphics, and Button Layouts [cite: 2025-12-18]
 */

export const DEFAULT_SETTINGS = {
    sensitivity: 0.5,
    graphics: "Low", // Optimized for 4GB RAM [cite: 2025-12-18]
    hudLayout: {
        fireBtn: { x: 80, y: 70 }, // Percentage based
        jumpBtn: { x: 90, y: 50 },
        joystick: { x: 10, y: 70 }
    }
};

export class SettingsManager {
    static saveSettings(settings) {
        localStorage.setItem('sf_settings', JSON.stringify(settings));
        console.log("Settings Locked in Paradox Server.");
    }

    static loadSettings() {
        const saved = localStorage.getItem('sf_settings');
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    }
}
