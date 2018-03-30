import { injectGlobal } from "styled-components";
import reset from "styled-reset";

const defaultFont = `"Operator Mono Lig", "Operator Mono", "Fira Code", "Menlo", sans-serif`;
const defaultFonts = {
  page: defaultFont,
  heading: defaultFont,
  input: defaultFont
};

function baseStyles(fonts = defaultFonts, fromCDN = false) {
  return injectGlobal`
    ${reset};

    html, body, #app {
      font-family: ${fonts.page}
      height: 100%;
      width: 100%;
      overflow: hidden;
      padding: 0;
      margin: 0;
    }

    h1 {
      font-family: ${fonts.heading};
      font-weight: normal;
      text-transform: uppercase;
      font-size: 42px;
      line-height: 46px;
    }

    h2 {
      font-family: ${fonts.heading};
      font-weight: 700;
      font-size: 28px;
      line-height: 32px;
      text-transform: uppercase;
      letter-spacing: -1px;
    }

    html, body, p {
      font-family: ${fonts.page};
      font-size: 16px;
      line-height: 24px;
    }

    input, select, label {
      font-family: ${fonts.input};
      font-size: 16px;
      line-height: 24px;
    }

    p {
      margin: 0 0 23px 0;
    }
  `;
}
export default baseStyles;
