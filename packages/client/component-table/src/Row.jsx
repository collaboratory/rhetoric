import styled from "styled-components";
import { overrides } from "@collaboratory/craft-util-styled";

const Row = styled.tr`
  cursor: pointer;
  background: ${props => (props.tinted ? "#ececec" : "#fff")};
  ${overrides};
`;
export default Row;
