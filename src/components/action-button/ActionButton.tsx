import "./ActionButton.css";

type Props = {
  /**
   * The svg logo.
   */
  logo: React.ComponentType<any>;

  /**
   * The label text.
   */
  label: string;

  /**
   * Executed when the action button is clicked.
   */
  onClick: () => void;
};

/**
 * ActionButton is a generic button.
 */
const ActionButton = (p: Props): JSX.Element => {
  const Logo = p.logo;
  return (
    <div
      className="action-button d-flex flex-column align-items-center"
      onClick={p.onClick}
    >
      <Logo />
      <span>{p.label}</span>
    </div>
  );
};

export default ActionButton;
