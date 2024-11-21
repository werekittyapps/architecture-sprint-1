import React from 'react';
import api from "../utils/api";

function Login () {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Так как за счет использования ProtectedRoute в host при монтировании App происходит редирект на Login,
  // проверка наличия токена и его валидности вынесена именно сюда
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      api
        .checkToken(token)
        .then((res) => {
          setAndDispatchEmail(res.data.email);
          setIsLoggedIn();
          triggerHistoryPush();
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin();
  }

  // Обработка history.push вынесена в событие history-push-event
  function triggerHistoryPush() {
    dispatchEvent(new CustomEvent("history-push-event"), {
      detail: '/'
    } );
  }

  // Обработка флага isLoggedIn вынесена в событие is-logged-in-event
  function setIsLoggedIn() {
    dispatchEvent(new CustomEvent("is-logged-in-event", {
      detail: true
    }) );
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

  function onLogin() {
    api
      .login(email, password)
      .then((res) => {
        setIsLoggedIn();
        setAndDispatchEmail(email);
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
          <h3 className="auth-form__title">Вход</h3>
          <label className="auth-form__input">
            <input type="text" name="name" id="email"
              className="auth-form__textfield" placeholder="Email"
              onChange={e => setAndDispatchEmail(e.target.value)} required  />
          </label>
          <label className="auth-form__input">
            <input type="password" name="password" id="password"
              className="auth-form__textfield" placeholder="Пароль"
              onChange={e => setPassword(e.target.value)} required  />
          </label>
        </div>
        <button className="auth-form__button" type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;
