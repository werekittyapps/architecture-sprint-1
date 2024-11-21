import React from 'react';

function ImagePopup() {
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [card, setCard] = React.useState(false);

  // Эта функция получает нотификации о событиях вызова ImagePopup
  const handleImagePopupEvent = event => {
    setCard(event.detail);
    setIsImagePopupOpen(true);
  }
  // Этот код добавляет подписку на нотификации о событиях вызова ImagePopup
  // и удаляет подписку, когда в ней пропадает необходимость
  React.useEffect(() => {
    addEventListener("image-popup-event", handleImagePopupEvent);
    return () => removeEventListener("image-popup-event", handleImagePopupEvent)
  }, []);


  return (
    <div className={`popup popup_type_image ${card ? 'popup_is-opened' : ''}`}>
      <div className="popup__content popup__content_content_image">
        <button type="button" className="popup__close" onClick={isImagePopupOpen(false)}></button>
        <img alt={card ? card.name : ''} src={card ? card.link : ''} className="popup__image" />
        <p className="popup__caption">{card ? card.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
