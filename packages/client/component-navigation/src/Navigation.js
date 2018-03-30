import React, { Component } from "react";
import PropTypes from "prop-types";
import { Box } from "@collaboratory/craft-component-grid";

export class Navigation extends Component {
  state = {
    proceduralItems: []
  };

  static propTypes = {
    children: PropTypes.node,
    bg: PropTypes.string
  };

  render() {
    const { bg = "blue", ...next } = this.props;
    return (
      <Box bg={bg} {...next}>
        {this.props.children}
        {this.state.proceduralItems}
      </Box>
    );
  }
}

export default Navigation;
