import { render, fireEvent, screen } from "@testing-library/react";
import ActionButton from "./ActionButton";
import { ReactComponent as Logo } from "../../images/shuffle.svg";

it("renders a generic button with a logo and text", () => {
  const onClick = () => {};
  render(<ActionButton label="Test Action" logo={Logo} onClick={onClick} />);

  expect(screen.getByText("Test Action")).toBeTruthy();
  expect(screen.getByText("shuffle.svg")).toBeTruthy();
});

it("handles a click event", () => {
  let clicked = false;
  const onClick = () => {
    clicked = true;
  };
  const { container } = render(
    <ActionButton label="Test Action" logo={Logo} onClick={onClick} />
  );
  
  expect(clicked).toBe(false);

  fireEvent.click(container!.firstChild!);

  expect(clicked).toBe(true);
});
