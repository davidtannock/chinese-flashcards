import React from "react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import ActionButton from "./components/action-button/ActionButton";
import FlashCard from "./components/flash-card/FlashCard";
import CardCount from "./components/card-count/CardCount";
import NotifyUpdate from "./components/notify-update/NotifyUpdate";
import "./App.css";
import { ReactComponent as ShuffleLogo } from "./images/shuffle.svg";
import { ReactComponent as RestartLogo } from "./images/restart.svg";
import { ReactComponent as PreviousLogo } from "./images/previous.svg";
import { ReactComponent as NextLogo } from "./images/next.svg";
import allCards from "./data/cards.json";
import * as Constants from "./constants";
import { Card, sortCards, shuffleCards } from "./cards";

type Props = {
  /**
   * Optionally the index of the first card to show.
   */
  firstCardIndex?: number;
};

type State = {
  /**
   * The index of the current card in cards.
   */
  index: number;

  /**
   * The current category selected.
   */
  category: string;

  /**
   * The array of cards in the selected category.
   */
  cards: Card[];

  /**
   * The current card to display.
   */
  currentCard: Card;

  /**
   * Whether or not the cards have been shuffled.
   */
  cardsAreShuffled: boolean;

  /**
   * Whether or not an application update is available.
   */
  updateAvailable: boolean;
};

/**
 * The Chinese flashcards application.
 */
class App extends React.Component<Props, State> {
  /**
   * Initialise the state to the 1st card of all categories.
   *
   * @param props Not used.
   */
  constructor(props: Props) {
    super(props);

    let index = props.firstCardIndex ?? 0;
    if (index < 0) {
      index = 0;
    } else if (index > allCards.length - 1) {
      index = allCards.length - 1;
    }

    this.state = {
      index: index,
      category: Constants.CATEGORY_ALL,
      cards: allCards,
      currentCard: allCards[index],
      cardsAreShuffled: false,
      updateAvailable: false,
    };
  }

  /**
   * Register the service worker and look out for updates to the application.
   */
  componentDidMount() {
    serviceWorkerRegistration.register({
      onUpdate: this.onServiceWorkerUpdate,
    });
  }

  /**
   * We have an updated service worker.
   */
  onServiceWorkerUpdate = (registration: ServiceWorkerRegistration) => {
    registration.waiting?.postMessage({ type: "SKIP_WAITING" });
    this.setState({
      updateAvailable: true,
    });
  };

  /**
   * Return to the 1st card in the selected category,
   * and reset the order of the cards if they've been shuffled.
   */
  restart() {
    let cards = this.state.cardsAreShuffled
      ? sortCards(this.state.cards)
      : this.state.cards;
    this.setState({
      index: 0,
      cards: cards,
      currentCard: cards[0],
      cardsAreShuffled: false,
    });
  }

  /**
   * Shuffle the cards in the selected category,
   * and return to the 1st card in the list.
   */
  shuffle() {
    let cards = shuffleCards(this.state.cards);
    this.setState({
      index: 0,
      cards: cards,
      currentCard: cards[0],
      cardsAreShuffled: true,
    });
  }

  /**
   * Go to the previous card in the list.
   */
  previous() {
    if (this.state.index <= 0) {
      return;
    }
    let index = this.state.index - 1;
    this.setState((state) => ({
      index: index,
      currentCard: state.cards[index],
    }));
  }

  /**
   * Go to the next card in the list.
   */
  next() {
    if (this.state.index >= this.state.cards.length - 1) {
      return;
    }
    let index = this.state.index + 1;
    this.setState((state) => ({
      index: index,
      currentCard: state.cards[index],
    }));
  }

  /**
   * The category has been changed. Reload the cards and
   * return to the 1st card in the list.
   */
  changeCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    let category = event.target.value;
    let cards =
      category === Constants.CATEGORY_ALL
        ? allCards
        : allCards.filter((card) => card.c === category);
    cards = sortCards(cards);
    this.setState({
      index: 0,
      category: category,
      cards: cards,
      currentCard: cards[0],
      cardsAreShuffled: false,
    });
  }

  render(): JSX.Element {
    return (
      <>
        <header>
          <nav className="navbar fixed-top navbar-light py-3 bg-light">
            <div className="container-fluid">
              <div
                className="btn-toolbar justify-content-between w-100"
                role="toolbar"
              >
                <div>
                  <select
                    value={this.state.category}
                    className="form-select"
                    onChange={(event) => {
                      this.changeCategory(event);
                    }}
                  >
                    <option value={Constants.CATEGORY_ALL}>All</option>
                    <option value="ch1">Ch11</option>
                    <option value="ch2">Ch22</option>
                  </select>
                </div>
                <ActionButton
                  logo={ShuffleLogo}
                  label="Shuffle"
                  onClick={() => {
                    this.shuffle();
                  }}
                />
                <ActionButton
                  logo={RestartLogo}
                  label="Restart"
                  onClick={() => {
                    this.restart();
                  }}
                />
              </div>
            </div>
          </nav>
        </header>

        <NotifyUpdate updateAvailable={this.state.updateAvailable} />

        <FlashCard
          card={this.state.currentCard}
          onSwipedLeft={() => {
            this.next();
          }}
          onSwipedRight={() => {
            this.previous();
          }}
        />

        <footer className="footer mt-auto py-3 bg-light">
          <div className="container-fluid">
            <div
              className="btn-toolbar justify-content-between w-100"
              role="toolbar"
            >
              <ActionButton
                logo={PreviousLogo}
                label="Previous"
                onClick={() => {
                  this.previous();
                }}
              />
              <CardCount
                index={this.state.index}
                numCards={this.state.cards.length}
              />
              <ActionButton
                logo={NextLogo}
                label="Next"
                onClick={() => {
                  this.next();
                }}
              />
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default App;
