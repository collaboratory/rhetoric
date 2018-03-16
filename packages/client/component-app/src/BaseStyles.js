import { injectGlobal } from "styled-components";
import { fontFace } from "polished";
import reset from "styled-reset";

function baseStyles(fromCDN = false) {
  return injectGlobal`
    ${reset};

    html, body {
      height: 100%;
      width: 100%;
      overflow: hidden;
    }

    h1 {
      font-family: 'Fjalla One', sans-serif;
      font-weight: normal;
      text-transform: uppercase;
      line-height: 46px;
      font-size: 43px;
      margin: 0 0 23px 0;
    }

    h2 {
      font-family: 'Cantarell', sans-serif;
      font-weight: 700;
      font-size: 20px;
      line-height: 23px;
      text-transform: uppercase;
      letter-spacing: -1px;
      margin: 0 0 23px 0;
    }

    html, body, p, input, select, label {
      font-family: 'Cantarell', sans-serif;
      font-size: 17px;
      line-height: 23px;
    }

    p {
      margin: 0 0 23px 0;
    }

    ${fontFace({
      fontFamily: "Fjalla One",
      fontFilePath: "/fonts/Fjalla_One/FjallaOne-Regular",
      fileFormats: ["ttf"]
    })};

    ${fontFace({
      fontFamily: "Cantarell",
      fontFilePath: "/fonts/Cantarell/Cantarell-Regular",
      fileFormats: ["ttf"]
    })};
    
    ${fontFace({
      fontFamily: "Cantarell Bold",
      fontFilePath: "/fonts/Cantarell/Cantarell-Bold",
      fileFormats: ["ttf"]
    })};
  `;
}
export default baseStyles;
