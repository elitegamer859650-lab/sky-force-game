import { db } from './system-core.js';
import { ref, get, update } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

export class InventoryManager {
    constructor(playerUID) {
        this.playerUID = playerUID;
        this.ownedSkins = [];
        this.equippedWeapon = "default_mp40";
    }

    /**
     * Fetches owned assets from Firebase Server
     */
    async loadInventory() {
        const inventoryRef = ref(db, `players/${this.playerUID}/inventory`);
        try {
            const snapshot = await get(inventoryRef);
            if (snapshot.exists()) {
                this.ownedSkins = snapshot.val().skins || [];
                this.equippedWeapon = snapshot.val().equipped || "default_mp40";
                console.log("Inventory Loaded for UID: " + this.playerUID);
            }
        } catch (error) {
            console.error("Inventory Sync Failed: Paradox Security Block.");
        }
    }

    /**
     * Professional Weapon Swap Logic [cite: 2025-12-18]
     * @param {string} weaponID - The ID of the weapon to equip
     */
    async equipItem(weaponID) {
        // Verification: Ensure player owns the item before equipping
        if (this.ownedSkins.includes(weaponID) || weaponID === "default_mp40") {
            const updateRef = ref(db, `players/${this.playerUID}/inventory`);
            await update(updateRef, { equipped: weaponID });
            this.equippedWeapon = weaponID;
            console.log("Item Equipped: " + weaponID);
            return true;
        }
        return false;
    }
}
