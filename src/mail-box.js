import { db } from './system-core.js';
import { ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

export class MailboxSystem {
    constructor(playerUID) {
        this.playerUID = playerUID;
        this.mailRef = ref(db, `players/${this.playerUID}/mailbox`);
    }

    /**
     * Listens for gifts sent from Control Panel [cite: 2025-12-18]
     */
    listenForGifts(callback) {
        onValue(this.mailRef, (snapshot) => {
            const gifts = snapshot.val() || {};
            callback(gifts);
        });
    }

    /**
     * Professional Claim Logic
     * Moves item from Mailbox to Vault [cite: 2025-12-18]
     */
    async claimItem(mailID, itemID) {
        const vaultRef = ref(db, `players/${this.playerUID}/inventory/skins`);
        const targetMailRef = ref(db, `players/${this.playerUID}/mailbox/${mailID}`);

        // 1. Add to Vault
        await update(ref(db, `players/${this.playerUID}/inventory`), {
            [itemID]: true
        });

        // 2. Remove from Mailbox
        await remove(targetMailRef);
        console.log("Dhayeen! Bundle Equipped from Mailbox.");
    }
}
