import { css } from "styled-components";
import {
  space,
  width,
  height,
  fontSize,
  borderColor,
  borderRadius,
  color as overrideColor,
  bg,
  textAlign,
  lineHeight
} from "styled-system";
import { radialGradient, darken, lighten } from "polished";

/**
 * Convert an array of color/gradient strings to theme colors
 * @param {array} colors        An array of color/gradient strings
 * @param {object} themeColors  Theme colors config
 */
function convertColors(colors, themeColors) {
  return colors.map(c => convertColor(c, themeColors));
}
module.exports.convertColors = convertColors;

/**
 * Convert a color/gradient string to a theme color
 * @param {string} entry        Color string to convert
 * @param {object} ehemeColors  Theme colors config
 */
function convertColor(entry, themeColors) {
  const parts = entry.split(" ");
  const color = parts.shift();

  let result;
  if (themeColors.hasOwnProperty(color)) {
    result = `${themeColors[color]} ${parts.join(" ")}`;
  } else {
    result = `${color} ${parts.join(" ")}`;
  }

  return result.trim();
}
module.exports.convertColor = convertColor;

/**
 * Color prop support with theme defaults
 */
const color = props => {
  return `
  color: ${
    props.color
      ? props.theme.colors[props.color]
      : props.inverted
        ? props.theme.colors["dark"]
        : props.theme.colors["light"]
  };
  `;
};
module.exports.color = color;

/**
 * Border props support with theme defaults
 */
const border = props => {
  return `
    border: 1px solid ${
      props.borderColor
        ? convertColor(props.borderColor, props.theme.colors)
        : darken(
            0.025,
            convertColor(
              props.bg || props.theme.defaults.colors[0],
              props.theme.colors
            )
          )
    }
  `;
};
module.exports.border = border;

/**
 * Background props support with theme defaults
 */
const background = props => {
  if (props.gradient) {
    const colors = convertColors(
      props.gradient.colors || props.theme.gradients.default,
      props.theme.colors
    );

    const hoverColors =
      props.gradient.hoverColors ||
      colors.map(c => (props.inverted ? lighten(0.1, c) : darken(0.1, c)));

    if (!props.gradient.radial) {
      const direction =
        props.gradient.direction || props.theme.defaults.gradientDirection;
      return `
        background: linear-gradient(${direction}, ${colors.join(", ")});
        &:hover {
          background: linear-gradient(${direction}, ${hoverColors.join(", ")});
        }
      `;
    } else {
      const { extent, position, shape } = props.gradient;
      return `
        ${radialGradient({
          colorStops: colors,
          extent,
          position,
          shape
        })}
        &:hover {
          ${radialGradient({
            colorStops: hoverColors,
            extent,
            position,
            shape
          })}
        }
      `;
    }
  } else {
    if (props.bg) {
      const bgColor = convertColor(props.bg, props.theme.colors);
      return `
        background: ${bgColor};
        &:hover {
          background: ${
            props.inverted ? lighten(0.1, bgColor) : darken(0.1, bgColor)
          };
        }
      `;
    } else {
      const bgColor = convertColor(
        props.theme.defaults.colors[0],
        props.theme.colors
      );

      return `
        background: ${bgColor};
        &:hover {
          background: ${
            props.inverted ? lighten(0.1, bgColor) : darken(0.1, bgColor)
          };
        }
      `;
    }
  }
};
module.exports.background = background;

const float = ({ float }) => {
  return float && `float: ${float};`;
};

const overrides = css`
  ${space};
  ${width};
  ${height};
  ${overrideColor};
  ${bg};
  ${fontSize};
  ${borderColor};
  ${borderRadius};
  ${lineHeight};
  ${textAlign};
  ${float};
`;
module.exports.overrides = overrides;
module.exports.default = overrides;

const buttonOverrides = css`
  ${space};
  ${width};
  ${height};
  ${color};
  ${background};
  ${fontSize};
  ${border};
  ${borderRadius};
  ${textAlign};
  ${float};
`;
module.exports.buttonOverrides = buttonOverrides;
