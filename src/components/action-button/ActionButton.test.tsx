import { render, fireEvent, screen } from "@testing-library/react";
import ActionButton from "./ActionButton";
import { ReactComponent as Logo } from "../../images/shuffle.svg";

it("renders a generic button with a logo and text", () => {
  const onClick = jest.fn();
  render(<ActionButton label="Test Action" logo={Logo} onClick={onClick} />);

  expect(screen.getByText("Test Action")).toBeTruthy();
  expect(screen.getByText("shuffle.svg")).toBeTruthy();
});

it("handles a click event", () => {
  const onClick = jest.fn();
  const { container } = render(
    <ActionButton label="Test Action" logo={Logo} onClick={onClick} />
  );

  fireEvent.click(container.firstChild!);

  expect(onClick).toBeCalledTimes(1);
});
