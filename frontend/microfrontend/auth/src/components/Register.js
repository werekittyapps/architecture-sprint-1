import React from 'react';
import api from "../utils/api";
import { Link } from 'react-router-dom';

function Register () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e){
    e.preventDefault();
    onRegister();
  }

  // Обработка history.push вынесена в событие history-push-event
  function triggerHistoryPush() {
    dispatchEvent(new CustomEvent("history-push-event"), {
      detail: '/signin'
    } );
  }
  
  // Обработка статуса и флага InfoTooltip вынесена в событие info-tooltip-event
  function triggerInfoTooltip(status) {
    dispatchEvent(new CustomEvent("info-tooltip-event", {
      detail: status
    }) );
  }

  // Обработка смены email вынесена в событие new-email-event
  function dispatchEmail(email) {
    dispatchEvent(new CustomEvent("new-email-event", {
      detail: email
    }) );
  }  
  
  function setAndDispatchEmail(email) {
    dispatchEmail(email);
    setEmail(email);
  }

  function onRegister() {
    api
      .register(email, password)
      .then((res) => {
        triggerInfoTooltip("success");
        triggerHistoryPush();
      })
      .catch((err) => {
        triggerInfoTooltip("fail");
      });
  }

  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Регистрация</h3>
          <label className="auth-form__input">
            <input type="text" name="email" id="email"
              className="auth-form__textfield" placeholder="Email"
              onChange={e => setAndDispatchEmail(e.target.value)} required  />
          </label>
          <label className="auth-form__input">
            <input type="password" name="password" id="password"
              className="auth-form__textfield" placeholder="Пароль"
              onChange={e => setPassword(e.target.value)} required  />
          </label>
        </div>
        <div className="auth-form__wrapper">
          <button className="auth-form__button" type="submit">Зарегистрироваться</button>
          <p className="auth-form__text">Уже зарегистрированы? <Link className="auth-form__link" to="/signin">Войти</Link></p>
        </div>
      </form>
    </div>
  )
}

export default Register;
