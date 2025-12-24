import { db } from './system-core.js';
import { ref, update, get, onValue, set, push } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

export class FriendSystem {
    constructor(playerUID) {
        this.playerUID = playerUID;
    }

    /**
     * Search Player by Numeric UID [cite: 2025-12-23]
     */
    async searchPlayer(numericID) {
        const playersRef = ref(db, 'players');
        const snapshot = await get(playersRef);
        let foundPlayer = null;

        snapshot.forEach((child) => {
            if (child.val().numeric_uid == numericID) {
                foundPlayer = { uid: child.key, ...child.val() };
            }
        });
        return foundPlayer;
    }

    /**
     * Send Friend Request [cite: 2025-12-18]
     */
    async sendRequest(targetUID) {
        const requestRef = ref(db, `players/${targetUID}/friend_requests/${this.playerUID}`);
        await set(requestRef, {
            from: this.playerUID,
            status: "PENDING",
            timestamp: Date.now()
        });
        console.log("Dhayeen! Friend Request Sent.");
    }

    /**
     * Accept Request & Connect Both Players
     */
    async acceptRequest(senderUID) {
        const updates = {};
        // Add to my friend list
        updates[`players/${this.playerUID}/friends/${senderUID}`] = true;
        // Add me to their friend list
        updates[`players/${senderUID}/friends/${this.playerUID}`] = true;
        // Remove the request
        updates[`players/${this.playerUID}/friend_requests/${senderUID}`] = null;

        await update(ref(db), updates);
    }

    /**
     * Live Online Status Listener [cite: 2025-11-26]
     */
    listenToFriends(callback) {
        const friendsRef = ref(db, `players/${this.playerUID}/friends`);
        onValue(friendsRef, async (snapshot) => {
            if (snapshot.exists()) {
                const friendIDs = Object.keys(snapshot.val());
                const friendsData = [];
                
                for (let id of friendIDs) {
                    const statusRef = ref(db, `players/${id}/status`);
                    const statusSnap = await get(statusRef);
                    friendsData.push({ uid: id, status: statusSnap.val() || "OFFLINE" });
                }
                callback(friendsData);
            }
        });
    }
}
