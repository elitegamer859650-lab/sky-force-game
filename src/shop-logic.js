import { db } from './system-core.js';
import { ref, get, update, push, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

/**
 * SKY FORCE - Diamond & Shop Engine
 * Manages Top-ups and Transactions [cite: 2025-12-18]
 */
export class ShopManager {
    constructor(playerUID) {
        this.playerUID = playerUID;
    }

    /**
     * Get Current Balance [cite: 2025-12-18]
     */
    async getBalance() {
        const balRef = ref(db, `players/${this.playerUID}/currency`);
        const snapshot = await get(balRef);
        return snapshot.exists() ? snapshot.val() : { diamonds: 0, coins: 0 };
    }

    /**
     * Log Transaction (For Admin tracking) [cite: 2025-11-26]
     */
    async logTransaction(amount, type) {
        const logRef = push(ref(db, `transactions/${this.playerUID}`));
        await set(logRef, {
            amount: amount,
            type: type,
            timestamp: Date.now()
        });
    }
}
