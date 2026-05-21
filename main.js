import { stringToColor } from "./dist/esm/string-to-color.js";

const input = document.querySelector("#inputText");
const formatInputs = document.querySelectorAll('input[name="format"]');
const saturationInput = document.querySelector("#saturation");
const lightnessInput = document.querySelector("#lightness");
const saturationValue = document.querySelector("[data-saturation-value]");
const lightnessValue = document.querySelector("[data-lightness-value]");
const colorOutput = document.querySelector("[data-color-output]");
const codeOutput = document.querySelector("[data-code-output]");
const copyButton = document.querySelector("[data-copy-button]");
const hslControls = document.querySelectorAll("[data-hsl-control]");
const sampleButtons = document.querySelectorAll("[data-sample]");
const swatchList = document.querySelector("[data-swatch-list]");

const swatchSamples = [
  "Ada Lovelace",
  "Grace Hopper",
  "bug:login-timeout",
  "Design System",
  "Release 1.0.1",
  "Warsaw",
  "Lorem ipsum",
  "😀",
];

function getFormat() {
  return document.querySelector('input[name="format"]:checked')?.value ?? "hex";
}

function getOptions() {
  const format = getFormat();

  if (format !== "hsl") {
    return {};
  }

  return {
    format,
    saturation: Number(saturationInput?.value ?? 65),
    lightness: Number(lightnessInput?.value ?? 55),
  };
}

function snippetFor(value, options) {
  const safeValue = JSON.stringify(value);

  if (options.format !== "hsl") {
    return `const color = stringToColor(${safeValue});`;
  }

  return `const color = stringToColor(${safeValue}, {
  format: "hsl",
  saturation: ${options.saturation},
  lightness: ${options.lightness},
});`;
}

function syncHslControls(enabled) {
  hslControls.forEach((control) => {
    control.setAttribute("aria-disabled", String(!enabled));
  });

  [saturationInput, lightnessInput].forEach((control) => {
    if (control) {
      control.disabled = !enabled;
    }
  });
}

function render() {
  if (!input || !colorOutput || !codeOutput) {
    return;
  }

  const options = getOptions();
  const color = stringToColor(input.value, options);
  const isHsl = options.format === "hsl";

  document.documentElement.style.setProperty("--current-color", color);
  colorOutput.textContent = color;
  codeOutput.textContent = snippetFor(input.value, options);

  if (saturationValue && saturationInput) {
    saturationValue.textContent = saturationInput.value;
  }

  if (lightnessValue && lightnessInput) {
    lightnessValue.textContent = lightnessInput.value;
  }

  syncHslControls(isHsl);
}

function renderSwatches() {
  if (!swatchList) {
    return;
  }

  swatchList.innerHTML = swatchSamples
    .map((sample) => {
      const color = stringToColor(sample);

      return `<article class="swatch">
        <div class="swatch-color" style="background: ${color}"></div>
        <div class="swatch-body">
          <strong title="${sample}">${sample}</strong>
          <code>${color}</code>
        </div>
      </article>`;
    })
    .join("");
}

input?.addEventListener("input", render);
saturationInput?.addEventListener("input", render);
lightnessInput?.addEventListener("input", render);
formatInputs.forEach((control) => control.addEventListener("change", render));

sampleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (input instanceof HTMLTextAreaElement) {
      input.value = button.dataset.sample ?? "";
      render();
      input.focus();
    }
  });
});

copyButton?.addEventListener("click", async () => {
  if (!codeOutput?.textContent) {
    return;
  }

  await navigator.clipboard.writeText(codeOutput.textContent);
  copyButton.textContent = "Copied";
  window.setTimeout(() => {
    copyButton.textContent = "Copy snippet";
  }, 1400);
});

renderSwatches();
render();
