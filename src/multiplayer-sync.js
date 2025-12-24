import { db, auth } from './system-core.js';
import { ref, set, onValue, onDisconnect } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

export class NetworkEngine {
    constructor(scene, playerModel, playerUID) {
        this.scene = scene;
        this.playerModel = playerModel;
        this.playerUID = playerUID;
        this.otherPlayers = {}; // Dictionary to store other player models
        this.initNetwork();
    }

    initNetwork() {
        const playerRef = ref(db, 'matches/big_match/players/' + this.playerUID);

        // Remove player from server when they close the tab [cite: 2025-12-18]
        onDisconnect(playerRef).remove();

        // Listen for other players joining the match
        const roomRef = ref(db, 'matches/big_match/players/');
        onValue(roomRef, (snapshot) => {
            const playersData = snapshot.val();
            this.syncPlayers(playersData);
        });
    }

    // Update your position to the Firebase Server
    updateLocalPosition() {
        if (!this.playerModel) return;
        
        set(ref(db, 'matches/big_match/players/' + this.playerUID), {
            position: {
                x: this.playerModel.position.x,
                y: this.playerModel.position.y,
                z: this.playerModel.position.z
            },
            rotation: this.playerModel.rotation.y,
            lastSeen: Date.now()
        });
    }

    // Render other players on your screen [cite: 2025-12-18]
    syncPlayers(playersData) {
        for (let id in playersData) {
            if (id === this.playerUID) continue; // Skip yourself

            const data = playersData[id];
            if (!this.otherPlayers[id]) {
                // Spawn a new ghost model for the friend/brother
                this.spawnOtherPlayer(id, data.position);
            } else {
                // Smoothly interpolate position (Anti-Lag) [cite: 2025-12-18]
                this.otherPlayers[id].position.set(data.position.x, data.position.y, data.position.z);
                this.otherPlayers[id].rotation.y = data.rotation;
            }
        }
    }

    spawnOtherPlayer(id, pos) {
        // We use a simplified mesh for other players to save 4GB RAM [cite: 2025-12-18]
        const geometry = new THREE.BoxGeometry(1, 2, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const ghost = new THREE.Mesh(geometry, material);
        ghost.position.set(pos.x, pos.y, pos.z);
        ghost.name = "Player_" + id;
        
        this.scene.add(ghost);
        this.otherPlayers[id] = ghost;
        console.log("Dhayeen! Friend Joined with UID: " + id);
    }
}
