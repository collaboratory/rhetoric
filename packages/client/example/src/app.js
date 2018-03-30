import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";

import {
  Page,
  Title,
  Subtitle,
  Content
} from "@collaboratory/craft-component-page";
import Theme from "@collaboratory/craft-theme-default";
import Button from "@collaboratory/craft-component-button";

const Hello = () => (
  <ThemeProvider theme={Theme}>
    <Page>
      <Title>{process.env.BROWSER_TEST}</Title>
      <Subtitle>This is a thing</Subtitle>
      <Content>
        <Button bg="secondary">Hello, world!</Button>
      </Content>
    </Page>
  </ThemeProvider>
);

ReactDOM.render(<Hello />, document.getElementById("app"));
