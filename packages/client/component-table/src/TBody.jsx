import styled from "styled-components";
import { overrides } from "@collaboratory/craft-util-styled";

import Row from "./Row";

const TBody = styled.tbody`
  ${Row}:hover {
    background: #eee;
  }
  ${overrides};
`;
export default TBody;
