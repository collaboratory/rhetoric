import styled from "styled-components";

const Subtitle = styled.h2`
  color: ${props => props.theme.colors[props.color || "tertiary-d-2"]};
`;

export default Subtitle;
