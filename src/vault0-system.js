import { db } from './system-core.js';
import { ref, get, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

/**
 * SKY FORCE - Vault & Inventory System
 * Manages permanent and trial skins [cite: 2025-12-24]
 */
export class VaultManager {
    constructor(playerUID) {
        this.playerUID = playerUID;
    }

    /**
     * Get All Items (Permanent + Trial) [cite: 2025-12-18]
     */
    async loadVault() {
        const invRef = ref(db, `players/${this.playerUID}/inventory`);
        const snapshot = await get(invRef);
        
        if (snapshot.exists()) {
            return snapshot.val(); // Returns { permanent: {...}, trial_items: {...} }
        }
        return { permanent: {}, trial_items: {} };
    }

    /**
     * Equip a Skin [cite: 2025-12-18]
     * @param {string} itemID - The ID of skin to wear
     * @param {string} assetPath - The .glb path for Three.js
     */
    async equipSkin(itemID, assetPath) {
        const statsRef = ref(db, `players/${this.playerUID}/stats`);
        await update(statsRef, {
            equipped_skin_id: itemID,
            equipped_skin_path: assetPath
        });
        console.log("Dhayeen! Skin Equipped.");
    }
}
