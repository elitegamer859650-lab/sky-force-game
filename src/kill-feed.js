import { db } from './system-core.js';
import { ref, push, set, onChildAdded, query, limitToLast } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

/**
 * SKY FORCE - Kill Feed Engine
 * Broadcasts every 'Dhayeen' moment to all players [cite: 2025-12-18]
 */
export class KillFeed {
    constructor(matchID) {
        this.matchID = matchID;
        this.killRef = ref(db, `matches/${this.matchID}/killfeed`);
    }

    /**
     * Report a Kill [cite: 2025-12-18]
     * @param {string} killerName - Aapka Naam
     * @param {string} victimName - Dushman ka Naam
     * @param {string} weapon - Kis gun se mara (e.g., MP40)
     */
    async reportKill(killerName, victimName, weapon = "MP40") {
        const newKillRef = push(this.killRef);
        await set(newKillRef, {
            killer: killerName,
            victim: victimName,
            weapon: weapon,
            timestamp: Date.now()
        });
    }

    /**
     * Listen for Kills in Real-time [cite: 2025-11-26]
     */
    listen(callback) {
        const recentKills = query(this.killRef, limitToLast(5));
        onChildAdded(recentKills, (snapshot) => {
            const data = snapshot.val();
            // Sirf 3 second purane ya naye kills dikhao
            if (Date.now() - data.timestamp < 3000) {
                callback(data);
            }
        });
    }
}
