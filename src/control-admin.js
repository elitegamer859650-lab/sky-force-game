import { db } from './system-core.js';
import { ref, push, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

/**
 * Professional Admin Command
 * Sends Bundles/Skins to specific Player UID [cite: 2025-12-23]
 */
export async function sendGiftToPlayer(targetUID, itemID, title, message) {
    const mailboxRef = ref(db, `players/${targetUID}/mailbox`);
    const newMailRef = push(mailboxRef);

    try {
        await set(newMailRef, {
            itemID: itemID,
            title: title,
            message: message,
            timestamp: Date.now()
        });
        console.log(`Dhayeen! Gift sent to ${targetUID}`);
    } catch (error) {
        console.error("Paradox Security: Admin command failed.");
    }
}
