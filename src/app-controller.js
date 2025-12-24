/**
 * SKY FORCE - Master Application Controller
 * Manages Game State, Memory, and Navigation [cite: 2025-11-26]
 */

export class AppController {
    constructor() {
        this.currentState = "BOOT"; // BOOT, LOGIN, LOBBY, MATCH, INVENTORY
        this.playerData = null;
        this.init();
    }

    init() {
        console.log("MMA AI: System Core Initializing...");
        this.checkAuthStatus();
    }

    /**
     * Professional State Switcher
     * Releases memory of previous screen before loading next [cite: 2025-12-18]
     */
    switchState(newState) {
        console.log(`Transitioning: ${this.currentState} -> ${newState}`);
        this.currentState = newState;

        switch (newState) {
            case "LOBBY":
                window.location.href = "lobby.html";
                break;
            case "MATCH":
                window.location.href = "big-match.html";
                break;
            case "INVENTORY":
                window.location.href = "inventory.html";
                break;
            case "LOGIN":
                window.location.href = "login.html";
                break;
        }
    }

    /**
     * Global Player Update [cite: 2025-12-23]
     */
    setPlayerData(data) {
        this.playerData = data;
        localStorage.setItem('active_uid', data.uid);
        localStorage.setItem('player_level', data.level);
    }

    checkAuthStatus() {
        const savedUID = localStorage.getItem('active_uid');
        if (!savedUID) {
            this.currentState = "LOGIN";
        } else {
            console.log("Dhayeen! Auto-Login Active for UID: " + savedUID);
        }
    }
}

export const G_CONTROLLER = new AppController();
