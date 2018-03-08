import styled from "styled-components";

const Page = styled.div`
  padding: 20px;
  width: calc(100% - 40px);
  height: calc(100vh - 40px);
  background: ${props => props.theme.colors[props.bg || "light"]};
  overflow: auto;
`;
export default Page;
