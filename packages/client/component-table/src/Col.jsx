import styled from "styled-components";

const Col = styled.td`
  padding: 8px 20px;
  white-space: normal;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  line-height: 24px;
  max-height: 48px;
  white-space: nowrap;
  &:last-child {
    word-wrap: break-word;
  }
`;
export default Col;
