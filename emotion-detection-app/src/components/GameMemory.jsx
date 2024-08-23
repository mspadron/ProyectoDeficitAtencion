import React, { useState, useEffect } from "react";
import Card from "./GameMemoryCard";
import { cardsData } from "../assets/cards";
import "../assets/estiloMemoryGame.css"

const GameMemory = ({ onComplete }) => {


  // states
  let [cardsState, setCardsState] = useState(cardsData);

  // numero de pares encontrados
  let [pairs, setPairs] = useState(0);

  // pares totales
  let totalPairs = cardsState.length / 2;

  // kep first card info
  let [firstCard, setFirstCard] = useState(null);
  // is it first click?
  let [secondClick, setSecondClick] = useState(false);
  // set flag to wait for 1500ms
  let [wait, setWait] = useState(false);

  // functions
  const checker = async (card) => {
    if (card.name === firstCard.name && card.id !== firstCard.id) {
      
      card["passed"] = true;
      firstCard["passed"] = true;
      changeCardStatusHandler(card);
      changeCardStatusHandler(firstCard);

        setPairs(pairs + 1);

      if (pairs + 1 === totalPairs) {
        onComplete();
      }
      
    } else {
      setWait(true);
      setTimeout(() => {
        changeCardStatusHandler(card);
        changeCardStatusHandler(firstCard);
        setWait(false);
      }, 1500);
    }
  };

  const changeCardStatusHandler = async (clickedCard) => {
    if (!clickedCard.passed) clickedCard.isFlipped = !clickedCard.isFlipped;
    let index = cardsState.findIndex((card) => card.id === clickedCard.id);
    let newState = [...cardsState];
    newState.splice(index, 1, clickedCard);
    await setCardsState(newState);
  };

  const handleClick = async (e, clickedCard) => {
    if (wait) {
      return;
    }
    if (!secondClick) {
      await setFirstCard(clickedCard);
      await setSecondClick(true);
      changeCardStatusHandler(clickedCard);
    } else {
      await setSecondClick(false);
      changeCardStatusHandler(clickedCard);
      checker(clickedCard);
      setFirstCard(null);
    }
  };

  return (
    <section className="memory-game">
      {cardsState?.map((card) => {
        return (
          <Card
            key={card.id}
            card={card}
            onClick={(e) => handleClick(e, card)}
          />
        );
      })}
      {/* <Card card={card} onClick={} /> */}
    </section>
  );
}

export default GameMemory;
