import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../Button";

describe('Test Button Component', () => {
  test('Should render button with label', () => {
    render(<Button label='Login' />);
    const buttonElement = screen.getByText('Login'); //
    expect(buttonElement).toBeInTheDocument();
  });
  test('Should trigger onClick when button is clicked', () => {
    const handleClick = jest.fn(); // Mock function
    render(<Button label='Login' type='button' onClick={handleClick} />);
    const buttonElement = screen.getByText('Login'); // element
    fireEvent.click(buttonElement);
    expect(handleClick).toBeCalled();
  });
  test('Should trigger handleSubmit when button is in a form', () => {
    const handleSubmit = jest.fn(); // Mock function
    render(
      <form id='form' onSubmit={handleSubmit}>
        <Button label='Login' type='submit' />
      </form>
    );
    const buttonElement = screen.getByText('Login');
    fireEvent.click(buttonElement);
    expect(handleSubmit).toBeCalled();
  });
});
