import styled, { withTheme, css } from "styled-components";
import { buttonOverrides } from "@collaboratory/craft-util-styled";

const paddingSizes = {
  "xs": "2px 4px",
  "sm": "4px 8px",
  "md": "8px 16px",
  "lg": "12px 24px",
  "xl": "24px 48px"
};

const fontSizes = {
  "xs": "12px",
  "sm": "14px",
  "md": "16px",
  "lg": "18px",
  "xl": "24px"
};

const heightSizes = {
  "xs": "14px",
  "sm": "16px",
  "md": "18px",
  "lg": "20px",
  "xl": "28px"
};

function size(props) {
  const fontSize = fontSizes[props.size || "md"];
  const paddingSize = paddingSizes[props.size || "md"];
  return css`
    font-size: ${fontSize};
    padding: ${paddingSize};
    line-height: ${heightSizes};
    min-height: ${heightSizes};
  `;
}

export const ButtonStyled = styled.button`
  appearance: none;
  font-family: inherit;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;
  float: ${props => (props.float ? props.float : "none")};
  display: ${props => (props.block ? "block" : "inline-block")};
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.5s;
  ${size};.

  &:hover {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  }

  ${buttonOverrides};
`;
export default withTheme(ButtonStyled);
