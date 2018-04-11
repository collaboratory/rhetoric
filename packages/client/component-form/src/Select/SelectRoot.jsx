import styled, { css } from "styled-components";
import SelectContainer from "./SelectContainer";

const SelectRootArrow = css`
  transition: all 0.25s;
  font-family: "FontAwesome";
  content: "\f078";
  color: ${props => props.theme.colors[props.color || "primary-l-2"]};
  background: ${props => props.theme.colors[props.color || "primary-l-6"]};
  border: 1px solid
    ${props =>
      props.theme.colors[
        props.outline || props.toggled ? "primary-d-2" : "primary-t-12"
      ]};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px 6px;
  display: inline-block;
  height: calc(100% - 6px);
  line-height: 24px;
`;

const SelectRoot = styled.div`
  position: relative;
  cursor: pointer;
  background: ${props => props.theme.colors[props.bg || "light"]};
  color: ${props => props.theme.colors[props.color || "primary-l-2"]};
  border-radius: 4px;
  user-select: none;
  transition: all 0.25s;

  &:hover {
    background: ${props => props.theme.colors[props.bg || "primary-l-4"]};
    color: ${props => props.theme.colors[props.color || "primary-d-2"]};

    &::before {
      background: ${props => props.theme.colors[props.color || "primary-d-2"]};
      color: ${props => props.theme.colors[props.color || "light"]};
    }

    ${SelectContainer} {
      border-color: ${props => props.theme.colors["primary-d-2"]};
    }
  }

  &::before {
    ${SelectRootArrow};
  }
`;
export default SelectRoot;
