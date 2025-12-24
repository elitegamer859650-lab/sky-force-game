import { db } from './system-core.js';
import { ref, push, onChildAdded, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

export class ChatEngine {
    constructor(playerUID, roomID) {
        this.playerUID = playerUID;
        this.roomID = roomID;
        this.chatRef = ref(db, `chats/${this.roomID}`);
    }

    /**
     * Professional Message Send Logic
     * @param {string} text - The message content
     */
    sendMessage(text) {
        if (!text.trim()) return;
        
        push(this.chatRef, {
            sender: this.playerUID,
            message: text,
            timestamp: serverTimestamp()
        });
    }

    /**
     * Listen for incoming messages in real-time [cite: 2025-12-18]
     * @param {Function} callback - Function to update UI
     */
    listenToMessages(callback) {
        onChildAdded(this.chatRef, (snapshot) => {
            const data = snapshot.val();
            callback(data);
        });
    }
}
