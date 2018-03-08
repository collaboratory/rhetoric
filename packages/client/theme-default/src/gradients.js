import { baseColors } from "./colors";

function makeGradients() {
  const gradients = {};
  for (let [name] of baseColors) {
    gradients[name] = [`${name}-d-1`, name, `${name}-d-1`];
  }
}

const gradients = makeGradients();
export default gradients;
