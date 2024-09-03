export type Errors = {
  username?: string;
  password?: string;
};

export const validateLoginForm = (username: string, password: string): Errors => {
  const errors: Errors = {};

  if (!username) {
    errors.username = "Username is required.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  return errors;
};
