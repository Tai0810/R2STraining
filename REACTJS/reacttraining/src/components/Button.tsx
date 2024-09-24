import ButtonMU from "@mui/material/Button";
import { btnLoginStyle } from "../pages/styles";

type Props = {
  label: string;
  onClick?: () => unknown;
  type?: "submit" | "button";
};

const Button = ({ label, type = "submit", onClick = () => {} }: Props) => (
  <ButtonMU
    variant="contained"
    disableElevation
    color="success"
    type="submit"
    style={btnLoginStyle}
    onClick={onClick}
  >
    Login
  </ButtonMU>
);

export default Button;
