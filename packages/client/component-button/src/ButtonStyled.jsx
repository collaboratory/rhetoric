import styled, { withTheme } from "styled-components";
import { buttonOverrides } from "@collaboratory/craft-util-styled";

export const ButtonStyled = styled.button`
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 18pt;
  min-height: 24px;
  line-height: 26px;
  float: ${props => (props.float ? props.float : "none")};
  display: ${props => (props.block ? "block" : "inline-block")};
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.4);
  transition: all 0.5s;

  &:hover {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.15);
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  }

  ${buttonOverrides};
`;
export default withTheme(ButtonStyled);
