/**
 * SKY FORCE - LIGHT & WORLD ENGINE
 * Fixes the Black Screen Issue [cite: 2025-12-18]
 */
export function setupWorld(scene) {
    // 1. Background Color (Andhera khatam, Sky Blue shuru)
    scene.background = new THREE.Color(0x87CEEB); // Sky Blue

    // 2. Ambient Light (Har cheez ko halki roshni deta hai)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // 3. Directional Light (Suraj ki roshni - Shadows ke liye)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
    sunLight.position.set(10, 50, 10);
    scene.add(sunLight);

    // 4. Fog (Dhoond - Taaki game ki depth nazar aaye)
    scene.fog = new THREE.Fog(0x87CEEB, 1, 1000);
}
