import { css, withTheme } from "styled-components";
import ButtonStyled from "./ButtonStyled";
import ButtonLinkFilter from "./ButtonLinkFilter";

const LinkStyle = css`
  text-decoration: none;
  appearance: none;
`;

const ButtonLink = withTheme(
  ButtonStyled.withComponent(ButtonLinkFilter).extend(LinkStyle)
);
export default ButtonLink;
