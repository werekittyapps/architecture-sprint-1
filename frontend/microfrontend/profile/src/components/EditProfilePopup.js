import React from 'react';
import PopupWithForm from './PopupWithForm';
import api from "../utils/api";

function EditProfilePopup() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleUpdateUser() {
    api
      .setUserInfo({
        name,
        about: description,
      })
      .then((newUserData) => {
        setCurrentUser(newUserData);
        triggerUserUpdateEvent(newUserData);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser();
  }

  // Издание события user-update-event о необходимости обновить user
  function triggerUserUpdateEvent(user) {
    dispatchEvent(new CustomEvent("user-update-event", {
      detail: user
    }) );
  }  
  
  // Эта функция получает нотификации о событиях вызова EditProfilePopup
  const handleEditProfilePopupEvent = event => {
    setCurrentUser(event.detail);
    if (currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
    setIsEditProfilePopupOpen(true);
  }
    
  // Этот код добавляет подписку на нотификации о событиях вызова EditProfilePopup
  // и удаляет подписку, когда в ней пропадает необходимость
  React.useEffect(() => {
    addEventListener("edit-profile-popup-event", handleEditProfilePopupEvent);
    return () => removeEventListener("edit-profile-popup-event", handleEditProfilePopupEvent)
  }, []);

  return (
    <PopupWithForm
      isOpen={isEditProfilePopupOpen} onSubmit={handleSubmit} onClose={setIsEditProfilePopupOpen(false)} title="Редактировать профиль" name="edit"
    >
      <label className="popup__label">
        <input type="text" name="userName" id="owner-name"
               className="popup__input popup__input_type_name" placeholder="Имя"
               required minLength="2" maxLength="40" pattern="[a-zA-Zа-яА-Я -]{1,}"
               value={name || ''} onChange={handleNameChange} />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" name="userDescription" id="owner-description"
               className="popup__input popup__input_type_description" placeholder="Занятие"
               required minLength="2" maxLength="200"
               value={description || ''} onChange={handleDescriptionChange} />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
