import { render, fireEvent } from "@testing-library/react";
import FlashCard from "./FlashCard";

const card1 = { i: 1, c: "ch1", f: "你", bp: "nǐ", be: "you (singular)" };
const card2 = { i: 1, c: "ch1", f: "你好", bp: "nǐ hǎo", be: "hello" };

it("renders a flashcard with front and back text", () => {
  const { container } = render(<FlashCard card={card1} />);

  let front = container.getElementsByClassName("flashcard-front").item(0);
  expect(front).toHaveTextContent(card1.f);

  let back = container.getElementsByClassName("flashcard-back").item(0);
  expect(back).toHaveTextContent(card1.bp);
  expect(back).toHaveTextContent(card1.be);
});

it("flips the card when clicked", () => {
  const { container } = render(<FlashCard card={card1} />);

  let cardEl = container.getElementsByClassName("flashcard").item(0);

  expect(cardEl).not.toHaveClass("flip");

  fireEvent.click(container!.firstChild!);

  expect(cardEl).toHaveClass("flip");
});

it("flips to front when the card changes", () => {
  const { container } = render(<FlashCard card={card1} />);

  let cardEl = container.getElementsByClassName("flashcard").item(0);
  expect(cardEl).not.toHaveClass("flip");
  fireEvent.click(container!.firstChild!);
  expect(cardEl).toHaveClass("flip");

  render(<FlashCard card={card2} />, { container });

  expect(cardEl).not.toHaveClass("flip");
});
