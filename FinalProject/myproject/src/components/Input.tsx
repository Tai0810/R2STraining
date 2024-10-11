import { memo, forwardRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { inputStyles } from "./styles";

type Props = {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  error?: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      type = "text",
      value = "",
      error = "",
      placeholder = "",
      // onChange,
    },
    ref
  ) => {
    return (
      <TextField
        label={label}
        defaultValue={value}
        placeholder={placeholder}
        error={!!error}
        helperText={error}
        type={type}
        // onChange={onChange}
        inputRef={ref}
        style={inputStyles}
      />
    );
  }
);

export default memo(Input);
