import "./CardCount.css";

type Props = {
  /**
   * The index of the current card.
   */
  index: number;

  /**
   * The total number of cards currently shown.
   */
  numCards: number;
};

/**
 * CardCount shows the progress of completing the current list of cards.
 */
const CardCount = (p: Props): JSX.Element => {
  return (
    <div className="card-counts">
      <span>{`${p.index + 1}/${p.numCards}`}</span>
    </div>
  );
};

export default CardCount;
