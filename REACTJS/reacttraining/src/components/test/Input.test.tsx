import { fireEvent, render, screen } from "@testing-library/react";
import Input from "../Input";

describe.only("Test Input Component", () => {
  test("Should render Input button with label", () => {
    render(<Input label="Username" />);
    const labelElement = screen.getAllByText("Username");
    expect(labelElement[0]).toBeInTheDocument();
    expect(labelElement).toHaveLength(2);
  });
  test("Should render Input button with error", () => {
    render(<Input label="Username" error="Username is required" />);
    const labelElement = screen.getByText("Username is required");
    expect(labelElement).toBeInTheDocument();
    // expect(labelElement).toHaveLength(2);
  });
  test("Should call onChange when input change", () => {
    const handleChange = jest.fn();
    render(
      <Input
        label="Username"
        placeholder="Enter username"
        onChange={handleChange}
        value=""
        error="Username is required"
      />
    );
    const inputElement = screen.getByPlaceholderText("Enter username");
    fireEvent.change(inputElement, { target: { value: "New username" } });
    expect(handleChange).toBeCalled();
  });
});

export {};