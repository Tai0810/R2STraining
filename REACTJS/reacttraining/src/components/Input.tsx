import { memo, forwardRef } from "react";

type Props = {
  label: string;
  type?: string;
  value?: string;
  onChange?: (value: string, type: string) => void;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, type = "text", value = "", onChange = () => {}, error }, ref) => {
    console.log("render", label);
    return (
      <div>
        <label htmlFor={label}>{label}</label>
        <input
          ref={ref}
          id={label}
          type={type}
          defaultValue={value} 
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }
);

export default memo(Input);