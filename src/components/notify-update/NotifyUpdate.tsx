import React from "react";
import "./NotifyUpdate.css";

type Props = {
  /**
   * Whether or not an update is available.
   */
  updateAvailable: boolean;
};

type State = {
  /**
   * Whether or not the update notification is visible.
   */
  isVisible: boolean;
};

class NotifyUpdate extends React.Component<Props, State> {
  /**
   * Initialise the state so the update notification is not visible.
   *
   * @param props Not used.
   */
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  /**
   * Show the update notification when an update is available.
   */
  componentDidUpdate(prevProps: Props) {
    if (prevProps.updateAvailable !== this.props.updateAvailable) {
      this.setState({
        isVisible: this.props.updateAvailable,
      });
    }
  }

  /**
   * Reload the page.
   */
  refresh() {
    window.location.reload();
  }

  render(): JSX.Element {
    return (
      <>
        <div
          className={`notifyupdate ${this.state.isVisible ? "visible" : ""}`}
          onClick={() => {
            this.refresh();
          }}
        >
          <div className="alert alert-success py-3" role="alert">
            A new version is available! <u>REFRESH</u>
          </div>
        </div>
      </>
    );
  }
}

export default NotifyUpdate;
