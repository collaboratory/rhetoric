import styled from "styled-components";

const Options = styled.div`
  z-index: 1;
  position: absolute;
  left: 0px;
  cursor: pointer;
  background: white;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors["primary-d-2"]};
  border-top: none;
  border-bottom: none;
  min-width: calc(100% - 2px);
  transition: max-height 0.25s;
  max-height: ${props => (props.toggled ? `100vh` : 0)};
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.15);
`;
export default Options;
