import React from "react";
import PropTypes from "prop-types";

import { PanelContainer, PanelTitle, PanelContent } from "./Styled";

const Panel = ({ title, children, ...next }) => (
  <PanelContainer {...next}>
    <PanelTitle>{title}</PanelTitle>
    <PanelContent>{children}</PanelContent>
  </PanelContainer>
);

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any
};

export default Panel;
