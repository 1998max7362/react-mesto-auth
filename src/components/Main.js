import { useContext } from "react";
import {BrowserRouter, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) => {
  const currentUserInfo = useContext(CurrentUserContext)
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUserInfo.avatar}
            className="profile__avatar"
            alt="Ваша аватарка"
          />
          <button
            type="button"
            aria-label="edit-avatar"
            className="profile__avatar-edit-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUserInfo.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Кнопка редактировать"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{currentUserInfo.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Кнопка добавить"
          value=" "
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements" aria-label="Картиночки красивых мест">

        {cards.map((card) =>
        <Card key={card._id} 
        cardInfo = {card}
        onCardClick={()=>onCardClick(card)}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        />)}

      </section>
    </main>
  );
};
