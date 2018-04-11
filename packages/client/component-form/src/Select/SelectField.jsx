import React from "react";
import PropTypes from "prop-types";

import Field from "../Field";
import Label from "../Label";
import Select from "./Select";
import Box from "../Box";

export const SelectField = ({
  label,
  name,
  onChange = null,
  labelProps = {},
  fieldProps = {},
  labelWidth = 1 / 2,
  selectWidth = 1 / 2,
  ...selectProps
}) => {
  console.log("onChange", onChange);
  return (
    <Field {...fieldProps}>
      <Box width={labelWidth} textAlign="right">
        <Label htmlFor={name} {...labelProps} mr={1}>
          {label}
        </Label>
      </Box>
      <Box width={selectWidth} textAlign="left">
        <Select name={name} {...selectProps} onChange={onChange} />
      </Box>
    </Field>
  );
}

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelProps: PropTypes.object,
  fieldProps: PropTypes.object,
  children: PropTypes.any
};

export default SelectField;
