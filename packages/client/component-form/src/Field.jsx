import styled from "styled-components";
import { overrides } from "@collaboratory/craft-util-styled";
import Label from "./Label";

const Field = styled.div`
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid
    ${props => props.theme.colors[props.divider || "primary-l-7"]};

  &:hover {
    ${Label} {
      color: ${props => props.theme.colors[props.outline || "primary-d-2"]};
      font-weight: bolder;
    }
  }

  ${overrides};
`;
export default Field;
