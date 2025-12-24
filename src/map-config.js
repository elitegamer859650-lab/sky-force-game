export const MAP_SETTINGS = {
    locations: [
        { name: "PARADOX CITY", pos: { x: 50, z: 50 } },
        { name: "SKY BASE", pos: { x: -50, z: -50 } },
        { name: "DYNASTY", pos: { x: 0, z: 80 } }
    ],
    safeZone: { center: { x: 0, z: 0 }, radius: 150, shrinkRate: 0.1 },
    airplane: { start: { x: -200, z: 0 }, end: { x: 200, z: 0 }, height: 50 },
    lootPoints: [
        { type: "MP40", pos: { x: 10, y: 0.5, z: 10 } },
        { type: "MEDKIT", pos: { x: -20, y: 0.5, z: 5 } }
    ]
};
