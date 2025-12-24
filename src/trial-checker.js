import { db } from './system-core.js';
import { ref, get, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

export async function validateTrials(playerUID) {
    const trialRef = ref(db, `players/${playerUID}/inventory/trial_items`);
    const snapshot = await get(trialRef);

    if (snapshot.exists()) {
        const items = snapshot.val();
        const now = Date.now();
        const EXPIRE_TIME = 7 * 24 * 60 * 60 * 1000; // 7 Din in Milliseconds [cite: 2025-12-24]

        for (let key in items) {
            const startTime = items[key].activatedAt;
            if (now - startTime > EXPIRE_TIME) {
                // Trial Expired! [cite: 2025-12-18]
                await remove(ref(db, `players/${playerUID}/inventory/trial_items/${key}`));
                console.log(`Trial for ${items[key].name} has ended.`);
                return true; // Return true to show an alert in UI
            }
        }
    }
    return false;
}
