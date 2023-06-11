import {stringToColor} from "./dist/string-to-color.js";

const body = document.body;
const hexColorContainer = body.querySelector('.hex-color');
body.querySelector('textarea').addEventListener('input', e => {
    const color = stringToColor(e.target.value);
    body.style.setProperty('--bgColor', color);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    hexColorContainer.innerText = color;
})
