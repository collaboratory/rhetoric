import styled, { css } from "styled-components";
import {
  width,
  height,
  color,
  fontSize,
  space,
  borderColor,
  borderRadius,
  borderWidth
} from "styled-system";

const common = css`
  ${space};
  ${width};
  ${height};
  ${color};
  ${fontSize};
  ${borderColor};
  ${borderRadius};
  ${borderWidth};
`;

export const PanelContainer = styled.div`
  border-radius: 4px;
  background: white;
  color: black;
  overflow: hidden;

  ${common};
`;

export const PanelTitle = styled.h2`
  font-size: 24px;
  line-height: 32px;
  padding: 8px 20px;

  ${common};
`;

export const PanelContent = styled.div`
  font-size: 16px;
  line-height: 24px;
  padding: 8px 20px;

  ${common};
`;
