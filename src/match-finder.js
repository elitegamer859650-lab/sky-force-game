import { db } from './system-core.js';
import { ref, set, push, onValue, onDisconnect, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

/**
 * SKY FORCE - Matchmaking & Server Discovery
 * Connects friends and brothers to the same match instance [cite: 2025-12-18]
 */
export class MatchFinder {
    constructor(playerUID) {
        this.playerUID = playerUID;
        this.currentRoom = null;
    }

    /**
     * Finds or Creates a Match Room [cite: 2025-11-26]
     */
    async findMatch() {
        console.log("MMA AI: Searching for active servers...");
        const roomsRef = ref(db, 'active_matches');
        
        try {
            const snapshot = await get(roomsRef);
            let roomFound = false;

            if (snapshot.exists()) {
                const rooms = snapshot.val();
                for (let id in rooms) {
                    if (rooms[id].playerCount < 16) { // Max 16 players [cite: 2025-12-18]
                        this.joinRoom(id);
                        roomFound = true;
                        break;
                    }
                }
            }

            if (!roomFound) {
                this.createNewRoom();
            }
        } catch (error) {
            console.error("Matchmaking Failed: Paradox Security Overload.");
        }
    }

    createNewRoom() {
        const roomsRef = ref(db, 'active_matches');
        const newRoomRef = push(roomsRef);
        this.currentRoom = newRoomRef.key;

        set(newRoomRef, {
            host: this.playerUID,
            playerCount: 1,
            status: "WAITING",
            map: "BIG_MATCH_CIRCLE"
        });

        this.joinRoom(this.currentRoom);
    }

    joinRoom(roomID) {
        this.currentRoom = roomID;
        const playerPresenceRef = ref(db, `active_matches/${roomID}/players/${this.playerUID}`);
        
        // Add player to room and set disconnect logic [cite: 2025-12-18]
        set(playerPresenceRef, {
            uid: this.playerUID,
            joinedAt: Date.now()
        });

        onDisconnect(playerPresenceRef).remove();
        console.log("Dhayeen! Connected to Server: " + roomID);
        
        // Trigger Big Match start [cite: 2025-12-18]
        window.location.href = "big-match.html";
    }
}
