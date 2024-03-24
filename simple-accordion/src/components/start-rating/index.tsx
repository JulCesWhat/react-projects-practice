import { FaStar } from "react-icons/fa";
import "./styles.css";
import { useState } from "react";

const StarRating = ({ stars }: { stars: number }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleOnclick = (ind: number) => {
    setRating(ind);
  };

  const handleOnMouseEnter = (ind: number) => {
    setHover(ind);
  };

  const handleOnMouseLeave = () => {
    setHover(rating);
  };

  return (
    <div className="star-container">
      <div className="star-rating">
        {Array.from({ length: stars }, (_, index) => {
          const starValue = index + 1;
          return (
            <FaStar
              key={index}
              className={starValue <= hover ? "star active" : "star"}
              onClick={() => {
                handleOnclick(starValue);
              }}
              onMouseEnter={() => {
                handleOnMouseEnter(starValue);
              }}
              onMouseLeave={() => {
                handleOnMouseLeave();
              }}
            />
            // <span
            //   key={index}
            //   className={starValue <= hover ? "star active" : "star"}
            //   onClick={() => {
            //     handleOnclick(starValue);
            //   }}
            //   onMouseEnter={() => {
            //     handleOnMouseEnter(starValue);
            //   }}
            //   onMouseLeave={() => {
            //     handleOnMouseLeave();
            //   }}
            // >
            //   &#9733;
            // </span>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
