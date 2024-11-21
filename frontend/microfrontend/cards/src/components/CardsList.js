import React from "react";
import Card from './Card';

function CardsList({ currentUser }) {
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  // Эта функция получает нотификации о необходимости одновления cards
  const handleCardsUpdateEvent = event => {
    setCards(event.detail);
  }

  // Этот код добавляет подписку на нотификации о событиях обновления cards
  // и удаляет подписку, когда в ней пропадает необходимость
  React.useEffect(() => {
    addEventListener("cards-update-event", handleCardsUpdateEvent);
    return () => removeEventListener("cards-update-event", handleCardsUpdateEvent)
  }, []);

  return (
    <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              currentUser={currentUser}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          ))}
    </ul>
  );
}

export default CardsList;
