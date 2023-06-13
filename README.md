# String to Color

String to Color is a simple library that allows you to convert any string into a corresponding hexadecimal color value.

## Installation

To install the library, use the following command:

```bash
npm i @rtcoder/string-to-color
```

## Usage

Import the `stringToColor` function from `@rtcoder/string-to-color` in your JavaScript file:

```javascript
import { stringToColor } from "@rtcoder/string-to-color";
```

Use the `stringToColor` function to convert your string into a color:

```javascript
const color = stringToColor('Lorem ipsum dolor sit amet');
```

The `color` variable will now hold a hexadecimal color value based on the input string.

## Interface

The library provides the following interface:

```typescript
function stringToColor(str: string): string;
```

The `stringToColor` function takes a string as input and returns a corresponding hexadecimal color value.

Feel free to use this library to add some visual representation based on strings in your projects.
