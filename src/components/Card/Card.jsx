import React from "react";
import "../Card/Card.css";

const Card = ({ cards, aos }) => {
  return (
    <div className="card-container flex" data-aos={aos}>
      {cards.map((card, idx) => (
        <div className="card" key={idx}>
          <div className="card-header flex">
            <div className="card-image-con flex">
              <img src={card.image} alt="" />
            </div>
            <h3>{card.title}</h3>
          </div>
          <p className="sub-p">{card.para}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
