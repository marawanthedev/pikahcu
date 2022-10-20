import React, { useEffect, useState } from "react";
import { CardStructure } from "../../components/card/constants";
import "./cards.scss";
import Card from "../../components/card/card";
const PickachuImage = require("../../assets/pickachu.png");

export default function Cards(): JSX.Element {
  const cardSample = {
    text: "Creature #8862",
    img: PickachuImage,
    available: true,
  };

  const generateCards = () => {
    const cards = [...Array(6)].map((_) => {
      return { ...cardSample, id: Math.floor(Math.random() * 100) };
    });
    return cards;
  };

  const [cards, setCards] = useState<CardStructure[]>([...generateCards()]);
  const selectedCards: CardStructure[] = [];

  useEffect(() => console.log(cards), [cards]);

  const addSelection = (cardId: number) => {
    const selectedCard: CardStructure | undefined = cards.find(
      (card: CardStructure) => card.id === cardId
    );

    if (selectedCard) {
      selectedCards.push(selectedCard);
    }
  };
  const removeSelection = (cardId: number) => {
    const selectedCard: CardStructure | undefined = cards.find(
      (card: CardStructure) => card.id === cardId
    );
    if (selectedCard) {
      const selectedCardIndex = selectedCards.indexOf(selectedCard);

      selectedCards.splice(selectedCardIndex, 1);
    }
  };
  
  const handleAvailability = (card: CardStructure) => {
    if (selectedCards.indexOf(card) !== -1 && card.available === true)
      return false;
    if (selectedCards.indexOf(card) === -1 && card.available === true) {
      return true;
    } else return false;
  };
  const handleSubmission = () => {
    const newCards = cards.map((card: CardStructure) => {
      return { ...card, available: handleAvailability(card) };
    });

    setCards(newCards);
    selectedCards.splice(0, selectedCards.length);
    console.log(selectedCards);
  };

  return (
    <div className="cards">
      <div className="cards__exit">
        <div className="cards__exit__icon" />
        <button className="cards__exit__btn">Exit</button>
      </div>
      <div className="cards__internal-container">
        <div className="cards__circles">
          <div className="cards__circles__item"></div>
          <div className="cards__circles__item"></div>
        </div>
        <div className="cards__heading">
          <div className="cards__heading__top">Step 1 of 3</div>
          <div className="cards__heading__center">Select Creature</div>
          <div className="cards__heading__bottom">
            Select creature(s) to transform, don't worry you will still have the
            original
          </div>
        </div>
        <div className="cards__info"> You have 6 creatures</div>

        <div className="cards__items-container">
          {cards?.map((card: CardStructure) => {
            return (
              <Card
                card={{ ...card }}
                removeSelectionCallBack={removeSelection}
                addSelectionCallBack={addSelection}
              />
            );
          })}
        </div>

        <button
          type="button"
          className="cards__submit-btn"
          onClick={handleSubmission}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
