"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDistance = calculateDistance;
exports.calculateFare = calculateFare;
function calculateDistance(lat1, lon1, lat2, lon2) {
    console.log(lat1, lon1, lat2, lon2, 'console.lo');
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
function calculateFare(distanceInKm) {
    const baseFare = 50;
    const perKmRate = 20;
    return Math.round(baseFare + perKmRate * distanceInKm);
}
