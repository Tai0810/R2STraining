import ButtonMU from "@mui/material/Button";
import { btnLoginStyle } from "./styles";

type Props = {
  label: string;
  onClick?: () => unknown;
  type?: "submit" | "button";
  startIcon?: React.ReactNode;
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  disabled?: boolean;
};

const Button = ({
  label,
  type = "submit",
  onClick = () => {},
  startIcon,
  variant = "outlined",
  color = "primary",
  disabled = false,
}: Props) => (
  <ButtonMU
    variant={variant}
    disableElevation
    color={color}
    type={type}
    style={btnLoginStyle}
    onClick={onClick}
    startIcon={startIcon}
    disabled={disabled}
  >
    {label}
  </ButtonMU>
);

export default Button;
