import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import mitt from "mitt";
import { merge } from "lodash";

const modalEmitter = mitt();

const ModalContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: 100vw;
  height: 100vh;
`;

export default class Modal extends Component {
  state = {
    components: {}
  };

  static propTypes = {
    children: PropTypes.any
  };

  static childContextTypes = {
    modal: PropTypes.object.isRequired
  };

  getChildContext() {
    return {
      modal: modalEmitter
    };
  }

  constructor(props) {
    super(props);
    modalEmitter.on("setComponent", this.setComponent);
    modalEmitter.on("setComponents", this.setComponents);
    modalEmitter.on("removeComponent", this.removeComponent);
  }

  setComponents = map => {
    this.setState({
      components: merge(this.state.components, map)
    });
  };

  setComponent = ({ id, component }) => {
    const { components } = this.state;
    components[id] = component;
    this.setState({
      components
    });
  };

  removeComponent = id => {
    if (this.state.components.hasOwnProperty(id)) {
      const { components } = this.state;
      delete components[id];
      this.setState({
        components
      });
    }
  };

  render() {
    const modals = Object.keys(this.state.components).map(
      key => this.state.components[key]
    );
    return (
      <ModalContainer>
        {modals}
        {this.props.children}
      </ModalContainer>
    );
  }
}
