import { db } from './system-core.js';
import { ref, set, onValue, update, onDisconnect } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

export class TeamManager {
    constructor(playerUID, isLeader = false) {
        this.playerUID = playerUID;
        this.teamID = isLeader ? playerUID : null; // Leader ki UID hi Team ID hogi
        this.members = {};
    }

    /**
     * Create a Team Room [cite: 2025-12-18]
     */
    createTeam() {
        const teamRef = ref(db, `teams/${this.playerUID}`);
        set(teamRef, {
            leader: this.playerUID,
            status: "IN_LOBBY",
            members: { [this.playerUID]: { status: "READY", skin: "safari_bundle" } }
        });
        onDisconnect(teamRef).remove(); // Agar leader offline ho toh team khatam
        console.log("Dhayeen! Team Created. Waiting for Brothers...");
    }

    /**
     * Send Invite to Friend [cite: 2025-12-18]
     */
    async sendInvite(friendUID) {
        const inviteRef = ref(db, `players/${friendUID}/invites/${this.playerUID}`);
        await set(inviteRef, {
            from: this.playerUID,
            teamID: this.playerUID,
            timestamp: Date.now()
        });
    }

    /**
     * Listen for Team Changes (Syncing Characters in Lobby) [cite: 2025-11-26]
     */
    syncTeamMembers(callback) {
        if (!this.teamID) return;
        const teamRef = ref(db, `teams/${this.teamID}/members`);
        onValue(teamRef, (snapshot) => {
            const data = snapshot.val() || {};
            this.members = data;
            callback(data); // Callback for Three.js to render characters
        });
    }
}
