import { db } from './system-core.js';
import { ref, get, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

/**
 * SKY FORCE - Result & Rank Engine
 * Calculates Points after Match [cite: 2025-12-18]
 */
export class MatchResult {
    constructor(playerUID) {
        this.playerUID = playerUID;
    }

    /**
     * Calculate and Save Points [cite: 2025-12-18]
     * @param {number} kills - Total kills in match
     * @param {boolean} isWinner - Did they win?
     */
    async processEndMatch(kills, isWinner) {
        const statsRef = ref(db, `players/${this.playerUID}/stats`);
        const snapshot = await get(statsRef);
        
        let currentPoints = 0;
        if (snapshot.exists()) {
            currentPoints = snapshot.val().rankPoints || 0;
        }

        // Rank Points Logic: 10 per kill, 50 for Victory
        const earnedPoints = (kills * 10) + (isWinner ? 50 : 10);
        const newTotal = currentPoints + earnedPoints;

        // Update Firebase
        await update(statsRef, {
            rankPoints: newTotal,
            totalKills: (snapshot.val().totalKills || 0) + kills,
            lastMatchDate: Date.now()
        });

        return earnedPoints;
    }
}
