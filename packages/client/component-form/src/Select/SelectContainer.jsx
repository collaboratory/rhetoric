import styled, { css } from "styled-components";
import { overrides } from "@collaboratory/craft-client-util-styled";

const SelectContainer = styled.div`
  font-weight: bolder;
  line-height: 24px;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.25s;
  border: 1px solid
    ${props => props.theme.colors[props.outline || "primary-t-12"]};

  ${props =>
    props.toggled &&
    css`
      border: 1px solid
        ${props => props.theme.colors[props.outline || "primary"]};
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `};

  &:focus {
    border: 1px solid ${props => props.theme.colors[props.outline || "primary"]};
    box-shadow: 0 0 0 1px
      ${props => props.theme.colors[props.outline || "primary"]};
  }

  ${overrides};
`;
export default SelectContainer;
