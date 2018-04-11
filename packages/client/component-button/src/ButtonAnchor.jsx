import styled, { css, withTheme } from "styled-components";
import ButtonStyled from "./ButtonStyled";
import ButtonLinkFilter from "./ButtonLinkFilter";

const StyledAnchor = styled.a`
  text-decoration: none;
  appearance: none;
`;

const ButtonAnchor = withTheme(
  ButtonStyled.withComponent(StyledAnchor)
);
export default ButtonAnchor;
