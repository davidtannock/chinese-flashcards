import { render, fireEvent } from "@testing-library/react";
import * as Constants from "./constants";
import App from "./App";
import { Card, sortCards } from "./cards";
import allCards from "./data/cards.json";

const allCardsLastIndex = allCards.length - 1;

const getHeader = (container: HTMLElement): HTMLElement => {
  return container.getElementsByTagName("header").item(0)!;
};

const getShuffleButton = (container: HTMLElement): Element => {
  const header = getHeader(container);
  const shuffleBtn = header.getElementsByClassName("action-button").item(0)!;
  expect(shuffleBtn.textContent).toContain("Shuffle");
  return shuffleBtn;
};

const getRestartButton = (container: HTMLElement): Element => {
  const header = getHeader(container);
  const restartBtn = header.getElementsByClassName("action-button").item(1)!;
  expect(restartBtn.textContent).toContain("Restart");
  return restartBtn;
};

const getFooter = (container: HTMLElement): HTMLElement => {
  return container.getElementsByTagName("footer").item(0)!;
};

const getNextButton = (container: HTMLElement): Element => {
  const footer = getFooter(container);
  const nextBtn = footer.getElementsByClassName("action-button").item(1)!;
  expect(nextBtn.textContent).toContain("Next");
  return nextBtn;
};

const getPreviousButton = (container: HTMLElement): Element => {
  const footer = getFooter(container);
  const previousBtn = footer.getElementsByClassName("action-button").item(0)!;
  expect(previousBtn.textContent).toContain("Previous");
  return previousBtn;
};

const getCategorySelect = (container: HTMLElement): HTMLSelectElement => {
  return container.getElementsByTagName("select").item(0)!;
};

const assertCurrentCard = (container: HTMLElement, expectedCard: Card) => {
  const cardFront = container
    .getElementsByClassName("flashcard-front")
    .item(0)!;
  const cardBack = container.getElementsByClassName("flashcard-back").item(0)!;
  expect(cardFront.textContent).toBe(expectedCard.f);
  expect(cardBack.textContent).toContain(expectedCard.bp);
  expect(cardBack.textContent).toContain(expectedCard.be);
};

const assertProgress = (container: HTMLElement, expectedText: string) => {
  const progress = container.getElementsByClassName("card-counts").item(0)!;
  expect(progress.firstChild?.textContent!).toBe(expectedText);
};

const getAllCardsOrder = () => {
  return allCards.map((card) => card.i);
};

beforeEach(() => {
  // Shuffling updates the original array, so always start sorted.
  sortCards(allCards);
});

it("renders without crashing", () => {
  const { container } = render(<App />);
  let categorySelect = container.getElementsByTagName("select").item(0)!;
  expect(categorySelect.value).toBe(Constants.CATEGORY_ALL);
  assertCurrentCard(container, allCards[0]);
  assertProgress(container, `1/${allCards.length}`);

  render(<App firstCardIndex={-1} />);
  render(<App firstCardIndex={allCards.length} />);
  render(<App firstCardIndex={allCards.length + 5} />);
});

it("shows the next card when the next button is clicked", () => {
  const { container } = render(<App />);
  const nextBtn = getNextButton(container);

  fireEvent.click(nextBtn);

  assertCurrentCard(container, allCards[1]);
  assertProgress(container, `2/${allCards.length}`);
});

it("stops when we've reached the end of the list", () => {
  const { container } = render(<App firstCardIndex={allCardsLastIndex - 1} />);
  const nextBtn = getNextButton(container);

  assertCurrentCard(container, allCards[allCardsLastIndex - 1]);

  fireEvent.click(nextBtn);
  fireEvent.click(nextBtn);
  fireEvent.click(nextBtn);
  fireEvent.click(nextBtn);

  assertCurrentCard(container, allCards[allCardsLastIndex]);
  assertProgress(container, `${allCards.length}/${allCards.length}`);
});

it("shows the previous card when the previous button is clicked", () => {
  const { container } = render(<App firstCardIndex={allCardsLastIndex} />);
  const previousBtn = getPreviousButton(container);

  fireEvent.click(previousBtn);

  assertCurrentCard(container, allCards[allCardsLastIndex - 1]);
  assertProgress(container, `${allCards.length - 1}/${allCards.length}`);
});

it("stops when we've reached the start of the list", () => {
  const { container } = render(<App firstCardIndex={1} />);
  const previousBtn = getPreviousButton(container);

  assertCurrentCard(container, allCards[1]);

  fireEvent.click(previousBtn);
  fireEvent.click(previousBtn);
  fireEvent.click(previousBtn);
  fireEvent.click(previousBtn);

  assertCurrentCard(container, allCards[0]);
  assertProgress(container, `1/${allCards.length}`);
});

it("shuffles the list of cards when shuffle is clicked", () => {
  const { container } = render(<App />);
  const shuffleBtn = getShuffleButton(container);
  let originalOrder = getAllCardsOrder();

  fireEvent.click(shuffleBtn);

  let actualOrder = getAllCardsOrder();
  expect(actualOrder).not.toEqual(originalOrder);
});

it("returns to the beginning and resets the order when restart is clicked", () => {
  const { container } = render(<App />);
  const shuffleBtn = getShuffleButton(container);
  const nextBtn = getNextButton(container);
  const restartBtn = getRestartButton(container);
  let originalOrder = getAllCardsOrder();

  fireEvent.click(shuffleBtn);
  let shuffledOrder = getAllCardsOrder();
  expect(shuffledOrder).not.toEqual(originalOrder);
  fireEvent.click(nextBtn);
  fireEvent.click(nextBtn);
  fireEvent.click(nextBtn);
  assertCurrentCard(container, allCards[3]);
  assertProgress(container, `4/${allCards.length}`);

  fireEvent.click(restartBtn);
  let restartedOrder = getAllCardsOrder();
  expect(restartedOrder).toEqual(originalOrder);
  assertProgress(container, `1/${allCards.length}`);

  fireEvent.click(restartBtn);
  assertProgress(container, `1/${allCards.length}`);
});

it("filters the cards when the category is changed", () => {
  const { container } = render(<App />);
  const nextBtn = getNextButton(container);
  const categorySelect = getCategorySelect(container);
  const category = allCards[0].c;
  const numCardsBefore = allCards.length;

  fireEvent.click(nextBtn);
  fireEvent.click(nextBtn);
  assertProgress(container, `3/${numCardsBefore}`);

  categorySelect.value = category;
  fireEvent.change(categorySelect);
  const numCardsAfter = allCards.filter((card) => card.c === category).length;
  expect(numCardsAfter).not.toBe(numCardsBefore);
  assertProgress(container, `1/${numCardsAfter}`);

  fireEvent.click(nextBtn);
  assertProgress(container, `2/${numCardsAfter}`);
  categorySelect.value = Constants.CATEGORY_ALL;
  fireEvent.change(categorySelect);
  assertProgress(container, `1/${numCardsBefore}`);
});
