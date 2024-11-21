import React from 'react';

function AddPlaceButton() {

  // Обработка статуса и флага AddPlacePopupOpen вынесена в событие add-place-popup-event
  function triggerAddPlacePopup() {
    dispatchEvent(new CustomEvent("add-place-popup-event") );
  }  


  return (
    <button className="add-button" type="button" onClick={triggerAddPlacePopup}></button>
  );
}

export default AddPlaceButton;
