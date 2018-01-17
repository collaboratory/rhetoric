import React, { Component } from "react";
import PropTypes from "prop-types";

import MessageWrapper from "./MessageWrapper";
import MessageTitle from "./MessageTitle";
import MessageContent from "./MessageContent";

// TODO: Implement dismissable behavior

/**
 * Notification message component
 *
 * @export
 * @class Message
 * @extends {Component}
 */
export default class Message extends Component {
  static propTypes = {
    type: PropTypes.string,
    title: PropTypes.string,
    dismissable: PropTypes.bool,
    onDismiss: PropTypes.func,
    children: PropTypes.any
  };

  render() {
    const {
      type = "info",
      title = "",
      // dismissable = false,
      // onDismiss = false,
      children,
      ...next
    } = this.props;
    return (
      <MessageWrapper type={type} {...next}>
        {title ? <MessageTitle>{title}</MessageTitle> : null}
        <MessageContent>{children}</MessageContent>
      </MessageWrapper>
    );
  }
}
