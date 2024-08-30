import { useCallback, useRef, useState } from "react";
import { Input } from "../components";

const Login = () => {
  //Controlled component
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //Uncontroled component
  // const usernameRef = useRef<HTMLInputElement>(null);
  // const passwordRef = useRef<HTMLInputElement>(null);
  const inputsRefs = useRef<{ [key: string]: HTMLInputElement | null }>({
    username: null,
    password: null,
  });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleSubmit = useCallback(
    (event: { preventDefault: any }) => {
      // console.log("usernameRef", usernameRef);
      // console.log("passwordRef", passwordRef);
      event.preventDefault();
      // console.log("username", username);
      // console.log("password", password);
      // if (usernameRef.current && passwordRef.current) {
      //   const username = usernameRef.current.value;
      //   const password = passwordRef.current.value;
      //   console.log("username value", username);
      //   console.log("password value", password);
      // }

      // if(inputsRefs.current.username && inputsRefs.current.password){
      //   const username = inputsRefs.current.username.value;
      //   const password = inputsRefs.current.password.value;
      //   console.log("username value", username);
      //   console.log("password value", password);
      // }

      setErrors({});

      let isValid = true;
      const newErrors: { username?: string; password?: string } = {};

      if (inputsRefs.current.username && inputsRefs.current.password) {
        const usernameValue = inputsRefs.current.username.value.trim();
        const passwordValue = inputsRefs.current.password.value;

        if (!usernameValue) {
          isValid = false;
          newErrors.username = "Username is required.";
        }

        if (!passwordValue) {
          isValid = false;
          newErrors.password = "Password is required.";
        } else if (passwordValue.length < 8) {
          isValid = false;
          newErrors.password = "Password must be at least 8 characters long.";
        }

        setErrors(newErrors);

        if (isValid) {
          console.log("Form submitted with:", { username: usernameValue, password: passwordValue });
        }
      }
    },
    []
  );

  const handleChangeData = useCallback(
    (value: string, type: string) => {
      if (type === "password") {
        setPassword(value);
      } else {
        setUserName(value);
      }
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
