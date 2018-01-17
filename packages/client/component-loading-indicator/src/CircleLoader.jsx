import styled from "styled-components";
import { transparentize } from "polished";
import { space } from "styled-system";

const CircleLoader = styled.div`
  &,
  &:after {
    border-radius: 50%;
    width: ${props => props.width || `10em`};
    height: ${props => props.height || `10em`};
  }

  & {
    margin: 10px auto;
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border: 1.1em solid
      ${props =>
        transparentize(0.8, props.theme.colors[props.color || "light"])};
    border-left: 1.1em solid
      ${props => props.theme.colors[props.color || "light"]};
    transform: translateZ(0);
    animation: loader 1.1s infinite linear;
    ${space};
  }

  @-webkit-keyframes loader {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes loader {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
export default CircleLoader;
