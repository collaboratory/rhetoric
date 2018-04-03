import styled from "styled-components";
import { overrides } from "@collaboratory/craft-util-styled";

const Col = styled.td`
  padding: 8px 20px;
  vertical-align: middle;
  white-space: normal;
  border-bottom: 1px solid #ccc;
  border-right: ${props =>
    props.borderRight !== undefined ? props.borderRight : "1px solid #ccc"};
  line-height: 24px;
  white-space: nowrap;
  &:last-child {
    word-wrap: break-word;
  }
  ${overrides};
`;
export default Col;
