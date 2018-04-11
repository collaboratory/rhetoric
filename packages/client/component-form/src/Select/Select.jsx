import React, { Component } from "react";
import PropTypes from "prop-types";
import uniqid from "uuid/v4";

import SelectRoot from "./SelectRoot";
import SelectContainer from "./SelectContainer";
import SelectLabel from "./SelectLabel";
import Options from "./Options";
import Option from "./Option";

export default class Select extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.any,
    name: PropTypes.string.isRequired
  };

  wrapper = null;
  selectWrapper = null;

  dropDownHideTimeout = false;

  state = {
    label: "",
    value: "",
    toggled: false
  };

  componentDidMount() {
    if (this.props.label || this.props.value) {
      const { label = null, value = null } = this.props;
      this.setState({
        label,
        value
      });
    }
  }

  componentWillReceiveProps({ label, value, ...next }) {
    if (label || value) {
      this.setState({
        label,
        value
      });
    }
  }

  onToggle = e => {
    const toggled = !this.state.toggled;
    clearTimeout(this.dropDownHideTimeout);
    this.dropDownHideTimeout = false;
    this.setState({
      toggled
    });
  };

  onMouseOut = e => {
    if (this.state.toggled) {
      if (!this.wrapper || !this.wrapper.contains(e.relatedTarget)) {
        this.dropDownHideTimeout = setTimeout(this.onToggle, 1250);
      }
    }
  };

  onMouseOver = e => {
    if (this.dropDownHideTimeout) {
      clearTimeout(this.dropDownHideTimeout);
      this.dropDownHideTimeout = false;
    }
  };

  setValue = value => {
    const label = this.getLabel(value);
    this.setState({
      value,
      label
    }, () => {
      this.props.onChange({ value, label });
    });
  };

  renderOptions = () => {
    const { value, toggled } = this.state;
    const { options, name } = this.props;

    return (
      <Options
        onClick={e => {
          this.setValue(e.target.getAttribute("value"));
        }}
        key={`options.${name}`}
        toggled={toggled}
      >
        {options.map(o => {
          if (value !== o.value) {
            return (
              <Option
                key={uniqid()}
                value={o.value}
                selected={value === o.value}
              >
                {o.label}
              </Option>
            );
          }
        })}
      </Options>
    );
  };

  getLabel(value = false) {
    let label = "";

    if (!value) {
      value = this.state.value;
    }

    const { options } = this.props;
    if (options) {
      this.props.options.forEach(opt => {
        if (opt.value === value) {
          label = opt.label;
        }
      });
    }

    return label;
  }

  render() {
    const { value, toggled } = this.state;
    const { options, ...next } = this.props;

    return (
      <div
        ref={ref => {
          this.wrapper = ref;
        }}
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
      >
        <SelectRoot toggled={toggled} onClick={this.onToggle}>
          <input
            type="hidden"
            name={`select.${name}`}
            value={this.state.value}
          />
          <SelectContainer
            value={value}
            toggled={toggled}
            {...next}
          >
            <SelectLabel>{this.getLabel()}</SelectLabel>
            {this.renderOptions()}
          </SelectContainer>
        </SelectRoot>
      </div>
    );
  }
}
