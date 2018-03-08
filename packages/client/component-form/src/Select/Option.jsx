import styled from "styled-components";

const Option = styled.div`
  display: block;
  line-height: 24px;
  white-space: nowrap;
  padding: 4px 42px 4px 10px;
  border-top: 1px solid
    ${props => props.theme.colors[props.borderColor || "primary-l-7"]};
  transition: all 0.25s;

  &:hover {
    background: ${props => props.theme.colors[props.bg || "primary-l-8"]};
    text-shadow: 1px 1px 1px ${props => props.theme.colors["primary-l-7"]};
  }

  &:last-child {
    border-bottom: 1px solid ${props => props.theme.colors["primary-d-2"]};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
export default Option;
