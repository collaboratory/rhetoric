import { lighten, darken } from "polished";
const variants = [
  ["light-9", color => lighten(0.675, color)],
  ["light-8", color => lighten(0.6, color)],
  ["light-7", color => lighten(0.525, color)],
  ["light-6", color => lighten(0.45, color)],
  ["light-5", color => lighten(0.375, color)],
  ["light-4", color => lighten(0.3, color)],
  ["light-3", color => lighten(0.225, color)],
  ["light-2", color => lighten(0.15, color)],
  ["light-1", color => lighten(0.075, color)],
  ["dark-1", color => darken(0.075, color)],
  ["dark-2", color => darken(0.15, color)],
  ["dark-3", color => darken(0.225, color)],
  ["dark-4", color => darken(0.3, color)],
  ["dark-5", color => darken(0.375, color)],
  ["dark-6", color => darken(0.45, color)],
  ["dark-7", color => darken(0.525, color)],
  ["dark-8", color => darken(0.6, color)],
  ["dark-9", color => darken(0.675, color)]
];

export const baseColors = [
  ["red", `rgb(175, 25, 25)`],
  ["green", `rgb(25, 150, 45)`],
  ["blue", `rgb(25, 75, 150)`],
  ["yellow", `rgb(200, 200, 50)`],
  ["orange", `rgb(215, 125, 25)`],
  ["purple", `rgb(100, 25, 180)`],
  ["cyan", `rgb(25, 200, 200)`],
  ["brown", `rgb(125, 100, 10)`],
  ["gray", `rgb(125, 125, 125)`],
  ["black", `rgb(10, 10, 10)`],
  ["white", `rgb(245, 245, 245)`]
];

const colors = {};
baseColors.forEach(a => {
  const [name, color] = a;
  colors[name] = color;
  variants.forEach(b => {
    const [variant, modifier] = b;
    colors[`${name}-${variant}`] = modifier(color);
  });
});
export default colors;
