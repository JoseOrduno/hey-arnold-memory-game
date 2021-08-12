import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import PropTypes from "prop-types";

const Card = ({
  id,
  image,
  game,
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes,
}) => {
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
  });

  useEffect(() => {
    if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
      setTimeout(() => {
        setFlipped(!flipped);
        setFlippedCount(flippedCount + 1);
        setFlippedIndexes([]);
        console.log(flippedIndexes);
      }, 1000);
    } else if (flippedIndexes[2] === false && id === 0) {
      setFlippedCount(flippedCount + 1);
      setFlippedIndexes([]);
      console.log(flippedIndexes);
    }
  }, [flippedIndexes]);

  const onCardClick = () => {
    if (!game[id].flipped && flippedCount % 3 === 0) {
      setFlipped(!flipped);
      setFlippedCount(flippedCount + 1);
      const newIndexes = [...flippedIndexes];
      newIndexes.push(id);
      setFlippedIndexes(newIndexes);
      console.log(flippedIndexes);
    } else if (
      flippedCount % 3 === 1 &&
      !game[id].flipped &&
      flippedIndexes.indexOf(id) < 0
    ) {
      setFlipped(!flipped);
      setFlippedCount(flippedCount + 1);
      const newIndexes = [...flippedIndexes];
      newIndexes.push(id);
      setFlippedIndexes(newIndexes);
      console.log(flippedIndexes);
    }
  };

  return (
    <div onClick={onCardClick}>
      <a.div
        className="cardstyle cardback"
        style={{
          opacity: opacity.to((o) => 1 - o),
          transform,
        }}
      />
      <a.div
        className="cardstyle cardfront"
        style={{
          opacity,
          transform: transform.to((t) => `${t} rotateX(180deg)`),
          backgroundImage: `url(${image})`,
        }}
      />
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number,
  image: PropTypes.any,
  game: PropTypes.any,
  setHighScore: PropTypes.number,
  flippedCount: PropTypes.number,
  setFlippedCount: PropTypes.func,
  flippedIndexes: PropTypes.any,
  setFlippedIndexes: PropTypes.func,
};

export default Card;
