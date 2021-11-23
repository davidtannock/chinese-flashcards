import React from "react";
import { SwipeEventData, useSwipeable } from "react-swipeable";
import { Card } from "../../cards";
import "./FlashCard.css";

type Props = {
  /**
   * The card to display.
   */
  card: Card;

  /**
   * Executed when the user swipes left on the card.
   */
  onSwipedLeft?: () => void;

  /**
   * Executed when the user swipes right on the card.
   */
  onSwipedRight?: () => void;
};

type State = {
  /**
   * Whether or not the card is flipped.
   */
  flip: boolean;
};

/**
 * Makes the flashcard container a swipeable element.
 */
function Swipeable(props: any): JSX.Element {
  const { children, className, onClick, ...rest } = props;
  const eventHandlers = useSwipeable(rest);
  return (
    <div onClick={onClick} className={className} {...eventHandlers}>
      {children}
    </div>
  );
}

/**
 * FlashCard shows the current card, and lets the user
 * flip from front to back. The front of the card
 * is simplified chinese, the back is pinyin & english.
 */
class FlashCard extends React.Component<Props, State> {
  /**
   * Initialise the component to show the front of the card.
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      flip: false,
    };
  }

  /**
   * Show the front side of the card whenever the current card changes.
   */
  componentDidUpdate(prevProps: Props) {
    if (prevProps.card.f !== this.props.card.f) {
      this.setState({
        flip: false,
      });
    }
  }

  /**
   * Flip the card.
   */
  flip() {
    this.setState({
      flip: !this.state.flip,
    });
  }

  /**
   * User has swiped left on the card.
   */
  onSwipedLeft(event: SwipeEventData) {
    if (this.props.onSwipedLeft !== undefined) {
      this.props.onSwipedLeft();
    }
  }

  /**
   * User has swiped right on the card.
   */
  onSwipedRight(event: SwipeEventData) {
    if (this.props.onSwipedRight !== undefined) {
      this.props.onSwipedRight();
    }
  }

  render(): JSX.Element {
    return (
      <Swipeable
        className={`flashcard h-100 w-100 ${this.state.flip ? "flip" : ""}`}
        onClick={() => this.flip()}
        onSwipedLeft={(event: SwipeEventData) => this.onSwipedLeft(event)}
        onSwipedRight={(event: SwipeEventData) => this.onSwipedRight(event)}
      >
        <div className="flashcard-front">{this.props.card.f}</div>
        <div className="flashcard-back">
          {this.props.card.bp}
          <span>{this.props.card.be}</span>
        </div>
      </Swipeable>
    );
  }
}

export default FlashCard;
