import React from 'react';
import SuccessIcon from '../images/success-icon.svg';
import ErrorIcon from '../images/error-icon.svg';

function InfoTooltip() {
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");
  const icon = tooltipStatus === 'success' ? SuccessIcon : ErrorIcon
  const text = tooltipStatus === 'success' ? "Вы успешно зарегистрировались" : 
     "Что-то пошло не так! Попробуйте ещё раз."

  // Эта функция получает нотификации о событиях вызова InfoTooltip
  const handleInfoTooltipEvent = event => {
    setTooltipStatus(event.detail);
    setIsInfoTooltipOpen(true);
  }
  
  // Этот код добавляет подписку на нотификации о событиях вызова InfoTooltip 
  // и удаляет подписку, когда в ней пропадает необходимость
  React.useEffect(() => {
    addEventListener("info-tooltip-event", handleInfoTooltipEvent);
    return () => removeEventListener("info-tooltip-event", handleInfoTooltipEvent)
  }, []);

  return (
    <div className={`popup ${isInfoTooltipOpen && 'popup_is-opened'}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button type="button" className="popup__close" onClick={setIsInfoTooltipOpen(false)}></button>
            <div>
              <img className="popup__icon" src={icon} alt=""/>
              <p className="popup__status-message">{text}</p>
            </div>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;
