import styled from "styled-components";

const Content = styled.div`
  color: ${props => props.theme.colors[props.color || "dark"]};
`;
export default Content;
