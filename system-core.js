import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://skyforce-paradox-default-rtdb.firebaseio.com/",
    projectId: "skyforce-paradox"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export async function validateUser(uid) {
    if (!uid.startsWith("7")) return null; // Security: Only "7" series allowed [cite: 2025-12-18]
    const snapshot = await get(child(ref(db), `players/${uid}`));
    return snapshot.exists() ? snapshot.val() : null;
}

export async function socialLogin() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
}
