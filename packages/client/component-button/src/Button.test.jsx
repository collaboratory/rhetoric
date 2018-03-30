import React from "react";
import { shallow } from "enzyme";

import Button from "./Button";
import { ButtonStyled } from "./ButtonStyled";
import { ThemeProvider } from "styled-components";
import DefaultTheme from "@collaboratory/craft-theme-default";

describe("Button Component", () => {
  it("should render without throwing an error", () => {
    const btn = shallow(<Button />);
    expect(btn).toMatchSnapshot();
  });

  it("should render as a link when the to prop is present", () => {
    const btnLink = shallow(<Button to="/" />);
    expect(btnLink).toMatchSnapshot();
  });
});

describe("ButtonStyled Component", () => {
  it("should properly utilize the float prop", () => {
    expect(
      shallow(<ButtonStyled theme={DefaultTheme} float="left" />)
    ).toMatchSnapshot();
  });

  it("should properly utilize the block prop", () => {
    expect(
      shallow(
        <ThemeProvider theme={DefaultTheme}>
          <ButtonStyled block />
        </ThemeProvider>
      )
    ).toMatchSnapshot();
  });
});
