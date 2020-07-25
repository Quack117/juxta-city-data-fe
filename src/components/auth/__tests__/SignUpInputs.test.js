import React from "react";
import { render, fireEvent} from "@testing-library/react";
import SignUpInputs from "../SignUpInputs.js";


describe("<SignUpInputs />", () => {
  const form = {};
  const signUpChange = jest.fn();
  const handleSubmit = jest.fn();

  it("renders without crashing", () => {
    render(<SignUpInputs form={form} />);
  });

  it("renders the error and button", () => {
    const { getByText } = render(<SignUpInputs form={form} />);
    expect(getByText(/The username and email must be unique/i)).toBeInTheDocument();
    expect(getByText(/Submit/i)).toBeInTheDocument();
  });

  it("renders the username", () => {
    const { queryByPlaceholderText } = render(
      <SignUpInputs signUpChange={signUpChange} form={form} />
    );
    const input = queryByPlaceholderText("Username (required)");
    fireEvent.change(input, { target: { value: "Antonio123" } });

    expect(input.value).toBe("Antonio123");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "username");
  });

  it("renders the email", () => {
    const { queryByPlaceholderText } = render(
      <SignUpInputs signUpChange={signUpChange} form={form} />
    );
    const input = queryByPlaceholderText("Email (required)");
    fireEvent.change(input, { target: { value: "antonio@gmail.com" } });

    expect(input.value).toBe("antonio@gmail.com");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("name", "email");
  });
  
  it("renders the password", () => {
    const { queryByPlaceholderText } = render(
      <SignUpInputs signUpChange={signUpChange} form={form} />
    );
    const input = queryByPlaceholderText("Password (required)");
    fireEvent.change(input, { target: { value: "Antonio312" } });

    expect(input.value).toBe("Antonio312");
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveAttribute("name", "password");
  });

  it('calls "handleSubmit" function on submit button click', () => {
    const { getByText } = render(
      <SignUpInputs
        handleSubmit={handleSubmit}
        signUpChange={signUpChange}
        form={form}
      />
    );
    const submitButton = getByText(/submit/i);
    fireEvent.submit(submitButton);

    expect(submitButton).not.toBeDisabled();
    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
