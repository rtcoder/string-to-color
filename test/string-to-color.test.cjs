const assert = require("node:assert/strict");
const { test } = require("node:test");

const expectedHexColors = new Map([
  ["", "#000000"],
  ["a", "#610000"],
  ["abc", "#627801"],
  ["Lorem ipsum dolor sit amet", "#de2db0"],
  ["Dawid Jeż", "#f6be42"],
  ["😀", "#630d1b"],
]);

test("CommonJS build returns stable hex colors by default", () => {
  const { stringToColor } = require("../dist/cjs/string-to-color.js");

  for (const [input, color] of expectedHexColors) {
    assert.equal(stringToColor(input), color);
  }
});

test("ES module build returns stable hex colors by default", async () => {
  const { stringToColor } = await import("../dist/esm/string-to-color.js");

  for (const [input, color] of expectedHexColors) {
    assert.equal(stringToColor(input), color);
  }
});

test("HSL output keeps saturation and lightness in a readable range", async () => {
  const { stringToColor } = await import("../dist/esm/string-to-color.js");

  assert.equal(stringToColor("abc", { format: "hsl" }), "hsl(234, 65%, 55%)");
  assert.equal(
    stringToColor("abc", { format: "hsl", saturation: 140, lightness: -10 }),
    "hsl(234, 100%, 0%)"
  );
});
