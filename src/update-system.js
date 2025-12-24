import { db } from './system-core.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

/**
 * SKY FORCE - Update & News System
 * Keeps brothers informed about the latest 'Dhayeen' changes [cite: 2025-12-24]
 */
export class UpdateManager {
    constructor() {
        this.currentVersion = "v1.0.7"; // Aapki game ka current version
    }

    /**
     * Check for new patches from Admin [cite: 2025-12-18]
     */
    async checkUpdates() {
        const newsRef = ref(db, 'server_status/news');
        const snapshot = await get(newsRef);
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Agar version naya hai toh popup dikhao
            if (data.version !== this.currentVersion) {
                return data;
            }
        }
        return null;
    }
}
