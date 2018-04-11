import styled from "styled-components";
import { width, height, fontSize, fontFamily, color, textAlign } from "styled-system";

export const Box = styled.div`
  display: inline-block;
  line-height: 24px;
  vertical-align: middle;
  ${color};
  ${width};
  ${height};
  ${textAlign};
  ${fontSize}; 
  ${fontFamily};
`;
export default Box;
