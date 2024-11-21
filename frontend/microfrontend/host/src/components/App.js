import React, { lazy }  from "react";
import { Route, useHistory, Switch } from "react-router-dom";

import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const InfoTooltip = lazy(() => import('auth/InfoTooltip').catch(() => {
    return { default: () => <div className='error'></div> };
   })
); 

const Login = lazy(() => import('auth/Login').catch(() => {
    return { default: () => <div className='error'></div> };
   })
); 

const Register = lazy(() => import('auth/Register').catch(() => {
    return { default: () => <div className='error'></div> };
   })
); 

const AddPlacePopup = lazy(() => import('cards/AddPlacePopup').catch(() => {
    return { default: () => <div className='error'></div> };
   })
); 

const ImagePopup = lazy(() => import('cards/ImagePopup').catch(() => {
    return { default: () => <div className='error'></div> };
   })
); 

const EditAvatarPopup = lazy(() => import('profile/EditAvatarPopup').catch(() => {
    return { default: () => <div className='error'></div> };
   })
); 

const EditProfilePopup = lazy(() => import('profile/EditProfilePopup').catch(() => {
    return { default: () => <div className='error'></div> };
   })
); 

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const history = useHistory();

    // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
    const [currentUser, setCurrentUser] = React.useState({});

    // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
    React.useEffect(() => {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => console.log(err));
    }, []);

    // Эта функция получает нотификации о событиях вызова перехода
    const handleHistoryPushEvent = event => {
      history.push(event.detail);
    }

    // Эта функция получает нотификации о событиях смены флага isLoggedIn
    const handleIsLoggedInEvent = event => {
      setIsLoggedIn(event.detail);
    }

    // Эта функция получает нотификации о событиях смены email
    const handleNewEmailEvent = event => {
        setEmail(event.detail);
    }

    // Эта функция получает нотификации о событиях смены email
    const handleUserUpdateEvent = event => {
        setCurrentUser(event.detail);
    }
  
    // Этот код добавляет подписку на нотификации о событиях вызова перехода 
    // и удаляет подписку, когда в ней пропадает необходимость
    React.useEffect(() => {
      addEventListener("history-push-event", handleHistoryPushEvent);
      return () => removeEventListener("history-push-event", handleHistoryPushEvent)
    }, []);

    // Этот код добавляет подписку на нотификации о событиях смены флага isLoggedIn
    // и удаляет подписку, когда в ней пропадает необходимость
    React.useEffect(() => {
      addEventListener("is-logged-in-event", handleIsLoggedInEvent);
      return () => removeEventListener("is-logged-in-event", handleIsLoggedInEvent)
    }, []);

    // Этот код добавляет подписку на нотификации о событиях смены email
    // и удаляет подписку, когда в ней пропадает необходимость
    React.useEffect(() => {
        addEventListener("new-email-event", handleNewEmailEvent);
        return () => removeEventListener("new-email-event", handleNewEmailEvent)
      }, []);
    
    // Этот код добавляет подписку на нотификации о событиях смены user
    // и удаляет подписку, когда в ней пропадает необходимость
    React.useEffect(() => {
        addEventListener("user-update-event", handleUserUpdateEvent);
        return () => removeEventListener("user-update-event", handleUserUpdateEvent)
      }, []);

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={isLoggedIn}
          />
          <Route path="/signup">
            <Register/>
          </Route>
          <Route path="/signin">
            <Login/>
          </Route>
        </Switch>
        <Footer/>
        <EditAvatarPopup/>
        <EditProfilePopup/>
        <AddPlacePopup/>
        <InfoTooltip/>
        <ImagePopup/>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
