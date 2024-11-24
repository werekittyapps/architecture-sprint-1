import React from 'react';
import PopupWithForm from './PopupWithForm';
import api from "../utils/api";

function EditAvatarPopup() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const inputRef = React.useRef();

  function handleUpdateAvatar() {
    api
      .setUserAvatar(inputRef.current.value)
      .then((newUserData) => {
        triggerUserUpdateEvent(newUserData);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateAvatar();
  }

  // Издание события user-update-event о необходимости обновить user
  function triggerUserUpdateEvent(user) {
    dispatchEvent(new CustomEvent("user-update-event", {
      detail: user
    }) );
  }  
  
  // Эта функция получает нотификации о событиях вызова EditAvatarPopup
  const handleEditAvatarPopupEvent = event => {
    setIsEditAvatarPopupOpen(true);
  }
    
  // Этот код добавляет подписку на нотификации о событиях вызова EditAvatarPopup
  // и удаляет подписку, когда в ней пропадает необходимость
  React.useEffect(() => {
    addEventListener("edit-avatar-popup-event", handleEditAvatarPopupEvent);
    return () => removeEventListener("edit-avatar-popup-event", handleEditAvatarPopupEvent)
  }, []);

  return (
    <PopupWithForm
      isOpen={isEditAvatarPopupOpen} onSubmit={handleSubmit} onClose={setIsEditAvatarPopupOpen(false)} title="Обновить аватар" name="edit-avatar"
    >

      <label className="popup__label">
        <input type="url" name="avatar" id="owner-avatar"
          className="popup__input popup__input_type_description" placeholder="Ссылка на изображение"
          required ref={inputRef} />
        <span className="popup__error" id="owner-avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
