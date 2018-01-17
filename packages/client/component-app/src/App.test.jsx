import React from "react";
import { shallow } from "enzyme";

import App from "./App";

describe("App Component", () => {
  it("should render without throwing an error", () => {
    expect(shallow(<App />)).toBeTruthy();
  });
});
