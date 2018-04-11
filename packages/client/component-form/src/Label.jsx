import styled from "styled-components";
import { overrides } from "@collaboratory/craft-util-styled";

const Label = styled.label`
  vertical-align: top;
  text-transform: uppercase;
  line-height: 22px;
  margin-top: 10px;
  padding: 0 10px;
  text-align: right;
  transition: color 1s;
  font-size: 18px;
  ${overrides};
`;
export default Label;
