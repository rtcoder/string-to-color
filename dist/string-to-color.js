export function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        const hex = "00" + value.toString(16);
        color += hex.substring(hex.length - 2);
    }
    return color;
}
//# sourceMappingURL=string-to-color.js.map