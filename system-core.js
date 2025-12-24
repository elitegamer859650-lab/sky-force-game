import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://skyforce-paradox-default-rtdb.firebaseio.com/",
    projectId: "skyforce-paradox"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

/**
 * Validates Player UID and fetches Level 17+ Hardcore data
 * @param {string} uid - 8-digit unique identifier [cite: 2025-12-23]
 */
export async function validatePlayer(uid) {
    if (!uid.startsWith("7")) return null; // Security filter for "7" series files [cite: 2025-12-18]

    const dbRef = ref(db);
    try {
        const snapshot = await get(child(dbRef, `players/${uid}`));
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        return null;
    }
}

/**
 * Handles Firebase Social Authentication [cite: 2025-12-18]
 */
export async function socialAuth(type) {
    if (type === 'google') {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);
    }
    // Apple Auth implementation pending secure certificate
    return null;
}
