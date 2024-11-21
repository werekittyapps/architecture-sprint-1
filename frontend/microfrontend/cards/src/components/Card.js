import React from 'react';

function Card({ card, currentUser, onCardLike, onCardDelete }) {
  const cardStyle = { backgroundImage: `url(${card.link})` };

  function handleCardClick(card) {
    triggerImagePopup(card);
  }

  // Вызов ImagePopup вынесен в событие image-popup-event
  function triggerImagePopup(card) {
    dispatchEvent(new CustomEvent("image-popup-event", {
      detail: card
    }) );
  }  

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_is-active'}`;

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  );

  return (
    <li className="card">
      <div className="card__image" style={cardStyle} onClick={handleCardClick}>
      </div>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="card__description">
        <h2 className="card__title">
          {card.name}
        </h2>
        <div className="card__likes">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
