import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "../components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { validateLoginForm, Errors } from "../utils/validation";
import { btnLoginStyle, loginStyle } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../store/actions";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  // Controlled component
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);

  // Uncontrolled component
  const inputsRefs = useRef<{ [key: string]: HTMLInputElement | null }>({
    username: null,
    password: null,
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = useCallback((event: { preventDefault: any }) => {
    event.preventDefault();

    if (inputsRefs.current.username && inputsRefs.current.password) {
      const usernameValue = inputsRefs.current.username.value;
      const passwordValue = inputsRefs.current.password.value;

      const newErrors = validateLoginForm(usernameValue, passwordValue);

      setErrors(newErrors);

      if (!newErrors.username && !newErrors.password) {
        dispatch({
          type: LOGIN,
          username,
          password,
        });
      }

      if (Object.keys(newErrors).length === 0) {
        console.log("Form submitted with:", {
          username: usernameValue,
          password: passwordValue,
        });
      }
    }
  }, []);

  const handleChangeData = useCallback((value: string, type: string) => {
    if (type === "password") {
      setPassword(value);
    } else {
      setUserName(value);
    }
  }, []);

  if (auth.isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="app">
      <Box component="form" onSubmit={handleSubmit} style={loginStyle}>
        <Input
          label="Username"
          value={username}
          onChange={handleChangeData}
          ref={(element) => (inputsRefs.current.username = element)}
          error={errors.username}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={handleChangeData}
          ref={(element) => (inputsRefs.current.password = element)}
          error={errors.password}
        />
        <Button
          variant="contained"
          disableElevation
          color="success"
          type="submit"
          style={btnLoginStyle}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
