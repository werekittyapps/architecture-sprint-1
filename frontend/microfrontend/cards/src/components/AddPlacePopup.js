import React from 'react';
import PopupWithForm from './PopupWithForm';
import api from "../utils/api";

function AddPlacePopup() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleAddPlaceSubmit(  );
  }

  function handleAddPlaceSubmit() {
    api
      .addCard({ name, link })
      .then((newCardFull) => {
        triggerCardsUpdateEvent([newCardFull, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  // Издание события cards-update-event о необходимости обновить cards
  function triggerCardsUpdateEvent(cards) {
    dispatchEvent(new CustomEvent("cards-update-event", {
      detail: cards
    }) );
  }  

  // Эта функция получает нотификации о событиях вызова AddPlacePopup
  const handleAddPlacePopupEvent = event => {
    setIsAddPlacePopupOpen(true);
  }
  
  // Этот код добавляет подписку на нотификации о событиях вызова AddPlacePopup 
  // и удаляет подписку, когда в ней пропадает необходимость
  React.useEffect(() => {
    addEventListener("add-place-popup-event", handleAddPlacePopupEvent);
    return () => removeEventListener("add-place-popup-event", handleAddPlacePopupEvent)
  }, []);

  return (
    <PopupWithForm
      isOpen={isAddPlacePopupOpen} onSubmit={handleSubmit} onClose={setIsAddPlacePopupOpen(false)} title="Новое место" name="new-card"
    >
      <label className="popup__label">
        <input type="text" name="name" id="place-name"
               className="popup__input popup__input_type_card-name" placeholder="Название"
               required minLength="1" maxLength="30" value={name} onChange={handleNameChange} />
        <span className="popup__error" id="place-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="url" name="link" id="place-link"
               className="popup__input popup__input_type_url" placeholder="Ссылка на картинку"
               required value={link} onChange={handleLinkChange} />
        <span className="popup__error" id="place-link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
