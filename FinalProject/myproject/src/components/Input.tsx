import { memo, forwardRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { inputStyles } from "./styles";

type Props = {
  label: string;
  type?: string;
  value?: string;
  onChange?: (value: string, type: string) => void;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { label, type = "text", value = "", onChange = () => {}, error = "" },
    ref
  ) => {
    const [currenValue, setCurrentValue] = useState(value);
    // console.log("render", label);
    return (
      <TextField
        label={label}
        defaultValue={currenValue}
        onChange={(e) => setCurrentValue(e.target.value)}
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
