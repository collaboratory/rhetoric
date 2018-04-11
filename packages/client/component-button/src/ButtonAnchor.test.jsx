import React from "react";
import { shallow } from "enzyme";

import ButtonAnchor from "./ButtonAnchor";

describe("ButtonAnchor Component", () => {
  it("should render without throwing an error", () => {
    expect(shallow(<ButtonAnchor />)).toBeTruthy();
  });
});
