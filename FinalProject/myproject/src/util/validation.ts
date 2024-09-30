export const validateLoginForm = (email?: string, password?: string) => {
  const errors = {email: '', password: ''};

  if (!email) {
    errors.email = "Email is required.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  return errors;
};
