export type Errors = {
  email?: string;
  password?: string;
};

export const validateLoginForm = (username: string, password: string): Errors => {
  const errors: Errors = {};

  if (!username) {
    errors.email = "Username is required.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  return errors;
};
