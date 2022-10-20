import { useState, useEffect } from "react";
import { CardStructure } from "./constants";
import "./card.scss";

export type CardProps = {
  card: CardStructure;
  addSelectionCallBack: Function;
  removeSelectionCallBack: Function;
};
export default function Card({
  card,
  addSelectionCallBack,
  removeSelectionCallBack,
}: CardProps): JSX.Element {
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selected === true) {
      addSelectionCallBack(card.id);
    } else removeSelectionCallBack(card.id);
  }, [selected]);

  const manageAvailabilityBasedRendering = () => {
    if (!card.available) {
      return (
        <div className="card__non-available__text">
          <div className="card__non-available__text__upper">UnAvailable</div>
          <div className="card__non-available__text__lower">
            Already Transformed
          </div>
        </div>
      );
    }
  };
  const handleSelection = () => {
    if (card.available === true) setSelected(!selected);
  };
  return (
    <div className="card" onClick={handleSelection}>
      <div
        className={`card__main-section ${
          card.available ? "card__main-section__available" : null
        }`}
      >
        {manageAvailabilityBasedRendering()}

        <div className="card__main-section__effect-based ">
          <div
            className={`card__main-section__effect-based ${
              !card.available
                ? "card__main-section__effect-based__non-available"
                : null
            }`}
          />
          <div
            className="card__main-section__background"
            style={{ backgroundImage: `url(${card.img})` }}
          />

          <div className="card__selected-effect"></div>
          {selected && card.available ? (
            <span className="card__label">Selected</span>
          ) : null}
        </div>
      </div>
      <div className="card__lower-section">
        <div className="card__text">{card.text}</div>
      </div>
    </div>
  );
}
