export interface StringToColorOptions {
  format?: "hex" | "hsl";
  saturation?: number;
  lightness?: number;
}

function stringToHash(str: string): number {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return hash;
}

function hashToHexColor(hash: number): string {
  let color = "#";

  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, "0");
  }

  return color;
}

function clampPercentage(value: number): number {
  return Math.min(100, Math.max(0, value));
}

function hashToHslColor(
  hash: number,
  saturation: number,
  lightness: number
): string {
  const hue = (hash >>> 0) % 360;
  const safeSaturation = clampPercentage(saturation);
  const safeLightness = clampPercentage(lightness);

  return `hsl(${hue}, ${safeSaturation}%, ${safeLightness}%)`;
}

export function stringToColor(
  str: string,
  options: StringToColorOptions = {}
): string {
  const hash = stringToHash(str);

  if (options.format === "hsl") {
    return hashToHslColor(
      hash,
      options.saturation ?? 65,
      options.lightness ?? 55
    );
  }

  return hashToHexColor(hash);
}
