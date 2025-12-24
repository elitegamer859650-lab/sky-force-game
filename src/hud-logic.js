/**
 * SKY FORCE - HUD INTERACTION ENGINE
 * Connects UI buttons to Three.js Player Actions [cite: 2025-12-18]
 */

export function setupControls(player) {
    window.shoot = () => {
        console.log("Dhayeen! Firing with MP5...");
        // Weapon Recoil aur Sound yahan chalegi
        player.isFiring = true;
    };

    window.jump = () => {
        if(player.onGround) {
            player.velocity.y = 10; 
            console.log("Jumped!");
        }
    };

    window.useMedkit = () => {
        let hpFill = document.getElementById('hp-fill');
        let currentHP = parseInt(hpFill.style.width);
        if(currentHP < 100) {
            hpFill.style.width = (currentHP + 20) + "%";
            console.log("Healing... +20 HP");
        }
    };

    window.openBag = () => {
        alert("Inventory: 2x Grenade, 1x Medkit");
    };
}
