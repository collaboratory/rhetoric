import React from "react";
import { shallow } from "enzyme";

import ButtonLink from "./ButtonLink";

describe("ButtonLink Component", () => {
  it("should render without throwing an error", () => {
    expect(shallow(<ButtonLink />)).toBeTruthy();
  });
});
