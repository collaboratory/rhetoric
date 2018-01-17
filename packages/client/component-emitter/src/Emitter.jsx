import React, { Component, Children } from "react";
import PropTypes from "prop-types";

import EmitterService from "@collaboratory/craft-client-service-emitter";

const Emitter = ({ channel }) => {
  // Prepare the context
  const context = {};
  context[`emitter_${channel}`] = EmitterService.get(channel);

  return class EmitterComponent extends Component {
    static propTypes = {
      channel: PropTypes.string.isRequired,
      children: PropTypes.any
    };

    static childContextTypes = {
      emitter: PropTypes.object.isRequired
    };

    getChildContext() {
      return context;
    }

    render() {
      return Children.only(this.props.children);
    }
  };
};
export default Emitter;

export const withEmitter = (channel, Wrapped) => (
  <Wrapped emitter={EmitterService.get(channel)} />
);
