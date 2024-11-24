import React from 'react';

function Profile({ currentUser }) {
  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  // Вызов EditAvatarPopup вынесен в событие edit-avatar-popup-event
  function onEditAvatar() {
    dispatchEvent(new CustomEvent("edit-avatar-popup-event") );
  } 

  // Вызов EditProfilePopup вынесен в событие edit-profile-popup-event
  function onEditProfile() {
    dispatchEvent(new CustomEvent("edit-profile-popup-event", {
      detail: currentUser
    }) );
  } 

  return (
    <section className="profile">
        <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
    </section>
  );
}

export default Profile;
