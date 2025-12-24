/**
 * SKY FORCE - MAIN ENTRY POINT
 * This script ensures all modules are loaded correctly on Vercel [cite: 2025-12-18]
 */

import { initializeSecurity } from './src/anti-hack.js';
import { GameConfig } from './src/deployment-config.js';

// 1. Initializing Protection
try {
    initializeSecurity();
    console.log("%cSKY FORCE SHIELD: ACTIVE", "color: lime; font-weight: bold;");
} catch (e) {
    console.error("Security Shield Failed to load. Check src/anti-hack.js");
}

// 2. Running Diagnostic [cite: 2025-12-24]
GameConfig.selfDiagnostic().then(msg => {
    console.log(`%c${msg}`, "color: yellow;");
});

// 3. Exporting for Global Access
export const SKY_FORCE_CORE = {
    version: GameConfig.version,
    launchTime: new Date().toLocaleString(),
    developer: "Aapka Naam & Paradox AI"
};

console.log("Dhayeen! Game Core is ready for SQUAD.");
