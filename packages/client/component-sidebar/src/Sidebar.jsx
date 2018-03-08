import styled, { withTheme } from "styled-components";
import {
  space,
  height,
  fontSize,
  color,
  textAlign,
  justifyContent
} from "styled-system";
import { transitions } from "polished";

// TODO: Create a smarter sidebar component, move styled

export const Sidebar = withTheme(styled.div`
  background: ${props => props.theme.colors[props.color || "dark"]};
  color: white;
  min-height: ${props => props.minHeight || "auto"};
  height: 100vh;
  overflow: auto;
  ${transitions("background 5.0s ease-in 0s")};

  @media (max-width: 32em) {
    width: 100vw;
  }

  @media (min-width: 32em) {
    width: 100%;
    height: 100vh;
  }
`);
export default Sidebar;

export const SidebarContent = withTheme(styled.div`
  width: calc(100% - 40px);
  text-align: center;
  padding: 20px;
  position: relative;
  transition: all 1s;

  @media (min-width: 32em) {
    min-height: calc(100% - 84px);
  }

  ${space};
  ${fontSize};
  ${color};
  ${textAlign};
  ${justifyContent};
`);

export const Title = withTheme(styled.h1`
  color: ${props => props.theme.colors[props.color || "light"]};
`);

export const Subtitle = withTheme(styled.h2`
  color: ${props => props.theme.colors[props.color || "light"]};
`);

export const SidebarFooter = styled.div`
  @media (min-height: 480px) {
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    margin: 20px;
    margin-bottom: 0;
  }

  ${space};
  ${height};
  ${color};
  ${textAlign};
  ${justifyContent};
`;
