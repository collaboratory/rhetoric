import styled from "styled-components";
import { overrides } from "@collaboratory/craft-util-styled";

const Label = styled.label`
  vertical-align: top;
  text-transform: uppercase;
  line-height: 28px;
  margin-top: 10px;
  padding: 0 30px 8px 20px;
  text-align: right;
  transition: color 10s;
  ${overrides};
`;
export default Label;
