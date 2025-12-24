import { db } from './system-core.js';
import { ref, get, update, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

export class TrialEngine {
    constructor(playerUID) {
        this.playerUID = playerUID;
    }

    /**
     * Professional Expiry Checker [cite: 2025-12-24]
     */
    async checkTrialStatus() {
        const inventoryRef = ref(db, `players/${this.playerUID}/inventory/trial_items`);
        const snapshot = await get(inventoryRef);

        if (snapshot.exists()) {
            const trialItems = snapshot.val();
            const currentTime = Date.now();
            const sevenDaysInMS = 7 * 24 * 60 * 60 * 1000;

            for (let itemID in trialItems) {
                const startTime = trialItems[itemID].activatedAt;
                
                // Check if 7 days have passed
                if (currentTime - startTime > sevenDaysInMS) {
                    console.log(`Dhayeen! Trial Expired for: ${itemID}`);
                    // Remove item from inventory after trial [cite: 2025-12-18]
                    await remove(ref(db, `players/${this.playerUID}/inventory/trial_items/${itemID}`));
                    alert("Your 7-day trial for " + trialItems[itemID].name + " has expired! Visit store to buy.");
                }
            }
        }
    }
}
