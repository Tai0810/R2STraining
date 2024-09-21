import { validateLoginForm, Errors } from "./validation";

describe('validateLoginForm', () => {
  test('should return an error when username is not provided', () => {
    const result: Errors = validateLoginForm(undefined, 'password123');
    expect(result.username).toBe('Username is required.');
    expect(result.password).toBeUndefined();
  });

  test('should return an error when password is not provided', () => {
    const result: Errors = validateLoginForm('username123');
    expect(result.password).toBe('Password is required.');
    expect(result.username).toBeUndefined();
  });

  test('should return errors when both username and password are missing', () => {
    const result: Errors = validateLoginForm(undefined, undefined);
    expect(result.username).toBe('Username is required.');
    expect(result.password).toBe('Password is required.');
  });

  test('should return an error when password is less than 8 characters', () => {
    const result: Errors = validateLoginForm('username123', 'short');
    expect(result.password).toBe('Password must be at least 8 characters long.');
    expect(result.username).toBeUndefined();
  });

  test('should return no errors when both username and password are valid', () => {
    const result: Errors = validateLoginForm('username123', 'password123');
    expect(result.username).toBeUndefined();
    expect(result.password).toBeUndefined();
  });
});
