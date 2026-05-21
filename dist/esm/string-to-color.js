function stringToHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}
function hashToHexColor(hash) {
    let color = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += value.toString(16).padStart(2, "0");
    }
    return color;
}
function clampPercentage(value) {
    return Math.min(100, Math.max(0, value));
}
function hashToHslColor(hash, saturation, lightness) {
    const hue = (hash >>> 0) % 360;
    const safeSaturation = clampPercentage(saturation);
    const safeLightness = clampPercentage(lightness);
    return `hsl(${hue}, ${safeSaturation}%, ${safeLightness}%)`;
}
export function stringToColor(str, options = {}) {
    var _a, _b;
    const hash = stringToHash(str);
    if (options.format === "hsl") {
        return hashToHslColor(hash, (_a = options.saturation) !== null && _a !== void 0 ? _a : 65, (_b = options.lightness) !== null && _b !== void 0 ? _b : 55);
    }
    return hashToHexColor(hash);
}
//# sourceMappingURL=string-to-color.js.map