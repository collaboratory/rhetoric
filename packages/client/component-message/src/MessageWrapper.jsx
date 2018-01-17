import styled, { css } from "styled-components";
import {
  space,
  width,
  height,
  color,
  fontSize,
  fontFace,
  borderRadius,
  borderColor
} from "styled-system";

const messageCSS = props => {
  const type = props.type || "info";
  const messageColors = {
    fg: props.theme.colors[type + "-d-5"],
    bg: props.theme.colors[type],
    border: props.theme.colors[type + "-d-2"]
  };

  return css`
    border: 1px solid ${messageColors.border};
    background: ${messageColors.bg};
    color: ${messageColors.fg};
    ${space};
    ${width};
    ${height};
    ${color};
    ${fontSize};
    ${fontFace};
    ${borderRadius};
    ${borderColor};
  `;
};

const MessageWrapper = styled.div`
  padding: 8px 20px;
  border-radius: 4px;
  ${messageCSS};
`;
export default MessageWrapper;
