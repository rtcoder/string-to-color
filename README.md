# String to Color

String to Color is a small library that converts any string into a stable color.

## Installation

To install the library, use the following command:

```bash
npm i @rtcoder/string-to-color
```

## Usage

Import the `stringToColor` function from `@rtcoder/string-to-color` in your JavaScript or TypeScript file:

```javascript
import { stringToColor } from "@rtcoder/string-to-color";
```

CommonJS is supported too:

```javascript
const { stringToColor } = require("@rtcoder/string-to-color");
```

Use the `stringToColor` function to convert your string into a hex color:

```javascript
const color = stringToColor("Lorem ipsum dolor sit amet");
```

The `color` variable will now hold a hexadecimal color value based on the input string.

For UI elements such as avatars or badges, you can return an HSL color with a controlled saturation and lightness:

```javascript
const color = stringToColor("Lorem ipsum dolor sit amet", {
  format: "hsl",
  saturation: 65,
  lightness: 55,
});
```

## Interface

The library provides the following interface:

```typescript
interface StringToColorOptions {
  format?: "hex" | "hsl";
  saturation?: number;
  lightness?: number;
}

function stringToColor(str: string, options?: StringToColorOptions): string;
```

The `stringToColor` function takes a string as input and returns a corresponding hexadecimal color value.

Feel free to use this library to add some visual representation based on strings in your projects.
