import styled from "styled-components";
import { overrides } from "@collaboratory/craft-util-styled";

const Table = styled.table`
  height: ${props => (props.fullHeight ? "100%" : "auto")};
  border: 1px solid #ccc;
  margin: 0;
  padding: 0;
  word-break: break-word;
  ${overrides};
`;
export default Table;
