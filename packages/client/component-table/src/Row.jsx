import styled from "styled-components";

const Row = styled.tr`
  cursor: pointer;
  background: ${props => (props.tinted ? "#ececec" : "#fff")};
`;
export default Row;
