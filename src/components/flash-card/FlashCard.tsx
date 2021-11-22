import React from "react";
import { Card } from "../../cards";
import "./FlashCard.css";

type Props = {
  /**
   * The card to display.
   */
  card: Card;
};

type State = {
  /**
   * Whether or not the card is flipped.
   */
  flip: boolean;
};

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

  render(): JSX.Element {
    return (
      <div
        className={`flashcard h-100 w-100 ${this.state.flip ? "flip" : ""}`}
        onClick={() => this.flip()}
      >
        <div className="flashcard-front">{this.props.card.f}</div>
        <div className="flashcard-back">
          {this.props.card.bp}
          <span>{this.props.card.be}</span>
        </div>
      </div>
    );
  }
}

export default FlashCard;
