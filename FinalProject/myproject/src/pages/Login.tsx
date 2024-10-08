import { useCallback, useMemo, useRef, useState } from "react";
import { validateLoginForm } from "../util/validation";
import { Button, Input } from "../components";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginButtonStyle, loginStyle } from "./styles";
import { AppDispatch } from "../store";
import { login as handleLogin } from "../store/reducers/authReducer";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: any) => state.auth);
  const inputsRefs = useRef<{ [key: string]: HTMLInputElement | null }>({
    email: null,
    password: null,
  });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = useCallback(
    (event: { preventDefault: any }) => {
      event.preventDefault();
      console.log(inputsRefs);

      if (inputsRefs.current.email && inputsRefs.current.password) {
        const emailValue = inputsRefs.current.email.value;
        const passwordValue = inputsRefs.current.password.value;

        const errors = validateLoginForm(emailValue, passwordValue);

        setErrors(errors);

        if (!errors.email && !errors.password) {
          dispatch(handleLogin({ email: emailValue, password: passwordValue }));
        }

        if (Object.keys(errors).length === 0) {
          console.log("Form submitted with:", {
            email: emailValue,
            password: passwordValue,
          });
        }
      }
    },
    [dispatch]
  );

  const errMessage = useMemo(() => {
    if (errors.password) return errors.password;

    if (inputsRefs.current.email && inputsRefs.current.password) {
      const emailValue = inputsRefs.current.email.value;
      const passwordValue = inputsRefs.current.password.value;
      return emailValue && passwordValue && !auth.isLoggedIn
        ? "Email or password is not correct!"
        : "";
    }
  }, [auth.isLoggedIn, errors.password]);

  if (auth.isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className="app">
      <Box component="form" onSubmit={handleSubmit} style={loginStyle}>
        <Input
          label="Email"
          type="email"
          ref={(element) => (inputsRefs.current.email = element)}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          ref={(element) => (inputsRefs.current.password = element)}
          error={errMessage}
        />
        <div style={loginButtonStyle}>
          <Button label={"Login"} variant="contained" color="success" />
        </div>
      </Box>
    </div>
  );
};

export default Login;
