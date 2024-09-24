import { memo, forwardRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { inputStyles } from "./styles";

type Props = {
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (value: string, type?: string) => void;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      type = "text",
      value = "",
      onChange,
      error = "",
      placeholder = "",
    },
    ref
  ) => {
    const [currenValue, setCurrentValue] = useState(value);
    // console.log("render", label);
    return (
      <TextField
        label={label}
        defaultValue={currenValue}
        placeholder={placeholder}
        onChange={(e) => {
          if (typeof onChange === "function") {
            onChange(e.target.value);
          } else {
            setCurrentValue(e.target.value);
          }
        }}
        error={!!error}
        helperText={error}
        type={type}
        inputRef={ref}
        style={inputStyles}
      />
    );
  }
);

export default memo(Input);
