import { render, screen } from "@testing-library/react";
import CardCount from "./CardCount";

it("renders the progress of completing the list of cards", () => {
  const { container } = render(<CardCount index={5} numCards={19} />);
  expect(screen.getByText("6/19")).toBeInTheDocument();
  render(<CardCount index={6} numCards={19} />, { container });
  expect(screen.getByText("7/19")).toBeInTheDocument();
});
