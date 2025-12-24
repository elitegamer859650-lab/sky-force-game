import { db } from './system-core.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Store listing control by Admin [cite: 2025-12-18]
export function syncStoreItems(callback) {
    const storeRef = ref(db, 'server_control/store_items');
    onValue(storeRef, (snapshot) => {
        const items = snapshot.val();
        // MP40 Skins, Bundles will be received here
        callback(items);
    });
}

// Ye function lobby mein skins display karega
export function displayGunsInLobby(scene) {
    // Logic to show MP40 on a stand in lobby [cite: 2025-12-18]
}
