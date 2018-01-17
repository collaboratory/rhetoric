import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ButtonLinkFilter = ({
  block,
  outline,
  borderColor,
  gradient,
  ...next
}) => <Link {...next} />;

ButtonLinkFilter.propTypes = {
  block: PropTypes.bool,
  outline: PropTypes.string,
  borderColor: PropTypes.string,
  gradient: PropTypes.object
};

export default ButtonLinkFilter;
