import { db } from './system-core.js';
import { ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

export class CombatEngine {
    constructor(playerUID, isGodMode = false) {
        this.playerUID = playerUID;
        this.health = 100;
        this.isGodMode = isGodMode; // Global God Mode toggle [cite: 2025-12-18]
        this.initHealthSync();
    }

    initHealthSync() {
        const healthRef = ref(db, `matches/big_match/players/${this.playerUID}/stats`);
        
        // Initial health setup on server
        update(healthRef, { health: this.health, status: "ALIVE" });

        // Listen for incoming damage from other players
        onValue(healthRef, (snapshot) => {
            const stats = snapshot.val();
            if (stats && stats.health !== this.health) {
                this.health = stats.health;
                this.checkDeathStatus();
            }
        });
    }

    /**
     * Professional Damage Calculation
     * @param {number} amount - Damage amount from MP40 [cite: 2025-12-18]
     */
    takeDamage(amount) {
        if (this.isGodMode) {
            console.log("God Mode Active: Damage Nullified!");
            return;
        }

        this.health -= amount;
        if (this.health < 0) this.health = 0;

        // Sync new health to server [cite: 2025-12-18]
        update(ref(db, `matches/big_match/players/${this.playerUID}/stats`), {
            health: this.health
        });
    }

    checkDeathStatus() {
        if (this.health <= 0) {
            console.log("Dhayeen! Player Eliminated.");
            update(ref(db, `matches/big_match/players/${this.playerUID}/stats`), {
                status: "DEAD"
            });
            // Trigger Death Screen Logic
            this.handleRespawn();
        }
    }

    handleRespawn() {
        setTimeout(() => {
            this.health = 100;
            update(ref(db, `matches/big_match/players/${this.playerUID}/stats`), {
                health: 100,
                status: "ALIVE"
            });
            console.log("Respawned at Base.");
        }, 5000); // 5-second respawn timer
    }
}
