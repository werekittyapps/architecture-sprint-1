import React, { lazy }  from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const AddPlaceButton = lazy(() => import('cards/AddPlaceButton').catch(() => {
  return { default: () => <div className='error'></div> };
 })
); 

const CardsList = lazy(() => import('cards/CardsList').catch(() => {
  return { default: () => <div className='error'></div> };
 })
); 

const Profile = lazy(() => import('profile/Profile').catch(() => {
  return { default: () => <div className='error'></div> };
 })
); 

function Main() {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="page__section">
        <Profile currentUser={currentUser} />
        <AddPlaceButton/>
      </section>
      <section className="places page__section">
        <CardsList currentUser={currentUser} />
      </section>
    </main>
  );
}

export default Main;
