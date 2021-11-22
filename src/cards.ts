/**
 * Card is a flashcard with simplified chinese on the front,
 * pinyin & english on the back.
 */
export interface Card {
  /**
   * The index of the card in the array of all cards.
   */
  i: number;

  /**
   * The category of the card.
   */
  c: string;

  /**
   * The simplified chinese text on the front of the card.
   */
  f: string;

  /**
   * The pinyin text on the back of the card.
   */
  bp: string;

  /**
   * The english text on the back of the card.
   */
  be: string;
};

/**
 * Sorts an array of cards in ascending order.
 */
export const sortCards = (cards: Card[]): Card[] => {
  return cards.sort((a: Card, b: Card): number => {
    if (a.i < b.i) {
      return -1;
    } else if (a.i > b.i) {
      return 1;
    }
    return 0;
  });
};

/**
 * Shuffles an array of cards.
 */
export const shuffleCards = (cards: Card[]): Card[] => {
  return cards.sort((a: Card, b: Card): number => 0.5 - Math.random());
};
