import { lighten, darken, transparentize } from "polished";

function variants(name, color) {
  const variants = {};
  for (let i = 1; i < 20; i++) {
    variants[`${name}-l-${i}`] = lighten(i * 0.05, color);
    variants[`${name}-d-${i}`] = darken(i * 0.05, color);
    variants[`${name}-t-${i}`] = transparentize(i * 0.05, color);
  }
  return variants;
}

export const baseColors = [
  ["primary", "#3883DF"],
  ["light", "#F8F7F7"],
  ["dark", "#3A324D"],
  ["secondary", "#EE8963"],
  ["tertiary", "#8B5691"],
  ["success", "#46a27b"],
  ["warning", "#c39243"],
  ["info", "#a9cae6"],
  ["danger", "#f44336"],
  ["default", "#999999"]
];

const colors = {};
baseColors.forEach(a => {
  const [name, color] = a;
  colors[name] = color;
  for (let [n, c] of Object.entries(variants(name, color))) {
    colors[n] = c;
  }
});
export default colors;
