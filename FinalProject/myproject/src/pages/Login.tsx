import React, { useCallback, useRef, useState } from "react";
import { Input } from "../components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { validateLoginForm, Errors } from "../utils/validation";
import { btnLoginStyle, loginStyle } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducers/authReducer";
import { Navigate, useNavigate } from "react-router-dom";
import { AppDispatch } from "../store"; // Import AppDispatch

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const dispatch: AppDispatch = useDispatch(); // Sử dụng AppDispatch
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  const inputsRefs = useRef<{ [key: string]: HTMLInputElement | null }>({
    email: null,
    password: null,
  });

  const handleSubmit = useCallback((event: { preventDefault: any }) => {
    event.preventDefault();

    if (inputsRefs.current.email && inputsRefs.current.password) {
      const emailValue = inputsRefs.current.email.value;
      const passwordValue = inputsRefs.current.password.value;

      const newErrors = validateLoginForm(emailValue, passwordValue);
      setErrors(newErrors);

      if (!newErrors.email && !newErrors.password) {
        dispatch(login({ email: emailValue, password: passwordValue }))
          .unwrap() // Đảm bảo kiểu trả về là Promise
          .then((result: any) => {
            if (result.success) {
              // navigate("/home"); // Điều hướng nếu thành công
              console.log('ok');
              
            }
          })
          .catch((error: any) => {
            console.error("Login failed:", error);
            setErrors({
              email: "",
              password: "Email hoặc mật khẩu không đúng",
            });
          });
      }
    }
  }, [dispatch, navigate]);

  const handleChangeData = useCallback((value: string, type: string) => {
    if (type === "password") {
      setPassword(value);
    } else {
      setEmail(value);
    }
  }, []);

  if (auth.isLoggedIn) {
    return <Navigate to="/home" replace={true} />;
  }

  return (
    <div className="app">
      <Box component="form" onSubmit={handleSubmit} style={loginStyle}>
        <Input
          label="Email"
          value={email}
          onChange={handleChangeData}
          ref={(element) => (inputsRefs.current.email = element)}
          error={errors.email}
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
