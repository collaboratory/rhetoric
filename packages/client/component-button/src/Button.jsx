import React, { Component } from "react";
import PropTypes from "prop-types";

import ButtonStyled from "./ButtonStyled";
import ButtonLink from "./ButtonLink";

export default class Button extends Component {
  static propTypes = {
    to: PropTypes.string
  };

  render() {
    const { to, ...next } = this.props;
    return to ? <ButtonLink to={to} {...next} /> : <ButtonStyled {...next} />;
  }
}
