import ButtonMU from "@mui/material/Button";

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
    onClick={onClick}
    startIcon={startIcon}
    disabled={disabled}
  >
    {label}
  </ButtonMU>
);

export default Button;
