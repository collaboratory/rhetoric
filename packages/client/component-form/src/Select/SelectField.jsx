import React from "react";
import PropTypes from "prop-types";

import Field from "../Field";
import Label from "../Label";
import Select from "./Select";

const SelectField = ({
  label,
  name,
  labelProps = {},
  fieldProps = {},
  ...selectProps
}) => (
  <Field {...fieldProps}>
    <Label htmlFor={name} {...labelProps}>
      {label}
    </Label>
    <Select name={name} {...selectProps} />
  </Field>
);

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelProps: PropTypes.object,
  fieldProps: PropTypes.object,
  children: PropTypes.any
};

export default SelectField;
