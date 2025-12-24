import { db } from './system-core.js';
import { ref, update, increment, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

export class VictoryEngine {
    constructor(playerUID) {
        this.playerUID = playerUID;
        this.matchKills = 0;
    }

    // Call this every time the player gets a kill [cite: 2025-12-18]
    recordKill() {
        this.matchKills++;
        console.log("Kill Recorded: " + this.matchKills);
    }

    /**
     * Professional Match Finish Logic
     * @param {boolean} isWinner - Did the player win the match?
     */
    async finalizeMatch(isWinner) {
        const playerStatsRef = ref(db, `players/${this.playerUID}`);
        
        // Level 17+ Hardcore XP Calculation [cite: 2025-12-23]
        const xpGained = (this.matchKills * 50) + (isWinner ? 500 : 100);

        const updates = {
            "stats/totalKills": increment(this.matchKills),
            "stats/totalMatches": increment(1),
            "stats/xp": increment(xpGained)
        };

        if (isWinner) {
            updates["stats/totalWins"] = increment(1);
            console.log("Victory! Redirecting to Win Screen...");
            this.showVictoryScreen();
        }

        try {
            await update(playerStatsRef, updates);
            console.log("Match Data Synced to Server Successfully.");
        } catch (error) {
            console.error("Sync Error: Paradox Security Blocked the Request.");
        }
    }

    showVictoryScreen() {
        // Professional transition to the next independent file [cite: 2025-12-18]
        setTimeout(() => {
            window.location.href = "win-screen.html";
        }, 2000);
    }
}
