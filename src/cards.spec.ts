import { sortCards, shuffleCards } from "./cards";
import allCards from "./data/cards.json";

describe("shuffleCards", () => {
  it("shuffles cards in a random order", () => {
    let cards1 = shuffleCards([...allCards]);
    let cards2 = shuffleCards([...allCards]);

    expect(cards1).not.toEqual(allCards);
    expect(cards2).not.toEqual(allCards);
    expect(cards1).not.toEqual(cards2);
  });
});

describe("sortCards", () => {
  it("sorts cards in ascending order", () => {
    let cards = shuffleCards([...allCards]);
    expect(cards).not.toEqual(allCards);
    cards = sortCards(cards);
    expect(cards).toEqual(allCards);
  });
});
