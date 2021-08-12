import React, { useState, useEffect } from "react";
import Card from "./card";
import PropTypes from "prop-types";
import axios from "axios";

const MemoryGame = ({ level, setLevel }) => {
  const [game, setGame] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://hey-arnold-api.herokuapp.com/api/v1/characters/random?count=${level}`
      )
      .then((res) => {
        let getCaracthers = res.data;
        setCharacters(getCaracthers);
      });
  }, []);

  useEffect(() => {
    let newGame = [];
    for (let c = 0; c < characters.length; c++) {
      characters[c].flipped = false;
      characters[c].id = c;
      newGame.push(characters[c]);
    }
    newGame = newGame.concat(newGame);

    const shuffledGame = newGame
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setGame(shuffledGame);
    console.log(game);
    console.log(characters);
  }, [characters]);

  useEffect(() => {
    const finished = !game.some((card) => !card.flipped);
    if (finished && game.length > 0) {
      setTimeout(() => {
        const newGame = confirm(`You Win!`);
        if (newGame) {
          const gameLength = game.length;
          setLevel(null);
          setTimeout(() => {
            setLevel(gameLength);
          }, 5);
        } else {
          setLevel(null);
        }
      }, 500);
    }
  }, [game]);

  if (flippedIndexes.length === 2) {
    const match = game[flippedIndexes[0]].id === game[flippedIndexes[1]].id;

    if (match) {
      const newGame = [...game];
      newGame[flippedIndexes[0]].flipped = true;
      newGame[flippedIndexes[1]].flipped = true;
      setGame(newGame);

      const newIndexes = [...flippedIndexes];
      newIndexes.push(false);
      setFlippedIndexes(newIndexes);
    } else {
      const newIndexes = [...flippedIndexes];
      newIndexes.push(true);
      setFlippedIndexes(newIndexes);
    }
  }
  return (
    <div id="cards" className="d-flex justify-content-center">
      {game.map((card, index) => (
        <div className="card" key={index}>
          <Card
            id={index}
            image={card.image}
            game={game}
            flippedCount={flippedCount}
            setFlippedCount={setFlippedCount}
            flippedIndexes={flippedIndexes}
            setFlippedIndexes={setFlippedIndexes}
          />
        </div>
      ))}
    </div>
  );
};

MemoryGame.propTypes = {
  level: PropTypes.string,
  setLevel: PropTypes.func,
};

export default MemoryGame;
