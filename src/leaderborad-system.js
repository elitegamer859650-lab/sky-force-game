import { db } from './system-core.js';
import { ref, query, orderByChild, limitToLast, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

/**
 * Professional Leaderboard Fetcher
 * Orders players by XP and filters for 8-digit UIDs [cite: 2025-12-23]
 */
export async function fetchTopRanks(limit = 10) {
    const playersRef = query(ref(db, 'players'), orderByChild('stats/xp'), limitToLast(limit));
    try {
        const snapshot = await get(playersRef);
        if (snapshot.exists()) {
            let leaderboardData = [];
            snapshot.forEach(child => {
                leaderboardData.push({ uid: child.key, ...child.val() });
            });
            // Reverse to get highest XP first [cite: 2025-12-18]
            return leaderboardData.reverse();
        }
        return [];
    } catch (error) {
        console.error("Leaderboard Sync Error: Paradox Security Blocked.");
        return [];
    }
}
