import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext } from "react";

export const Card = ({ cardInfo, onCardClick,onCardLike,onCardDelete }) => {
  const currentUserInfo = useContext(CurrentUserContext);

  const isOwn = cardInfo.owner._id === currentUserInfo._id;
  const isLiked = cardInfo.likes.some((i) => i._id === currentUserInfo._id);

  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_checked"
  }`;

  return (
    <div className="element">
      <img
        className="element__img"
        alt={cardInfo.name}
        src={cardInfo.link}
        onClick={onCardClick}
      />
      <div className="element__info">
        <h2 className="element__name">{cardInfo.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            aria-label="Кнопка лайк"
            type="button"
            onClick={()=>onCardLike(cardInfo)}
          ></button>
          <p className="element__like-counter">{cardInfo.likes.length}</p>
        </div>
      </div>
      {isOwn && (
        <button
          className="element__remove-button"
          aria-label="Кнопка удалить"
          type="button"
          onClick={()=>onCardDelete(cardInfo)}
          // value=" "
        ></button>
      )}
    </div>
  );
};
