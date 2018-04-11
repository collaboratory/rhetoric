import styled from "styled-components";
import {
  space,
  fontSize,
  textAlign,
  color,
  bg,
  width,
  height
} from "styled-system";

export const NavBrand = styled.h1`
  margin: 0;
  padding: 10px 20px;
  line-height: 40px;
  display: inline-block;
  vertical-align: middle;
  ${space};
  ${fontSize};
  ${textAlign};
  ${color};
  ${bg};
  ${width};
  ${height};
`;
export default NavBrand;
