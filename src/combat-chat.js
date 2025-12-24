import { db } from './system-core.js';
import { ref, push, set, onValue, onChildAdded } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

/**
 * SKY FORCE - Battle Communication
 * Real-time Quick Chat and Ping System [cite: 2025-12-18]
 */
export class CombatChat {
    constructor(matchID, playerUID) {
        this.matchID = matchID;
        this.playerUID = playerUID;
        this.chatRef = ref(db, `matches/${this.matchID}/chat`);
    }

    /**
     * Send Quick Message [cite: 2025-12-18]
     */
    async sendQuickChat(messageType) {
        const newMessageRef = push(this.chatRef);
        const messages = {
            "ENEMY": "⚠️ ENEMY SPOTTED!",
            "HELP": "🆘 HELP ME!",
            "LOOT": "📦 I FOUND LOOT!",
            "STAY": "🛡️ STAY TOGETHER!"
        };

        await set(newMessageRef, {
            sender: this.playerUID,
            text: messages[messageType] || messageType,
            timestamp: Date.now()
        });
    }

    /**
     * Listen for Squad Messages [cite: 2025-11-26]
     */
    listenForMessages(callback) {
        onChildAdded(this.chatRef, (snapshot) => {
            const data = snapshot.val();
            // Sirf last 5 seconds ke messages dikhao taaki screen bhar na jaye
            if (Date.now() - data.timestamp < 5000) {
                callback(data);
            }
        });
    }
}
