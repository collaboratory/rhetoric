import { Component, Children } from "react";
import PropTypes from "prop-types";

import EmitterService from "@collaboratory/craft-client-service-emitter";

export default class EmitterStore extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  static childContextTypes = {
    emitters: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      emitters: EmitterService
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
