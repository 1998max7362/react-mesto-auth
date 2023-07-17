import { useState, useEffect, useContext } from "react";

import { Header } from "./Header";
import { Main } from "./Main";
import { ImagePopup } from "./Popups/ImagePopup";
import { api } from "../utils/Api";

import { EditProfilePopup } from "./Popups/EditProfilePopup";
import { EditAvatarPopup } from "./Popups/EditAvatarPopup";
import { AddPlacePopup } from "./Popups/AddPlacePopup";
import { ApprovePopup } from "./Popups/ApprovePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export const AuthorizedMain = ({handleCurrentUserInfoChange,handleTokenCheck}) => {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isApprovePopupOpen, setApprovePopupOpen] = useState(false);
  const [approveCallback, setApproveCallback] = useState(() => {});
  const [selectedCard, setSelectedCard] = useState({});

  const currentUserInfo = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const userData = await api.getUserData();
        handleCurrentUserInfoChange(userData);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [handleCurrentUserInfoChange]);

  useEffect(() => {
    (async () => {
      try {
        const cards = await api.getInitialCards();
        setCards(cards);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setCards]);

  const handleCardLike = async (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUserInfo._id);
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((cards) =>
        cards.map((card) => (card._id === newCard._id ? newCard : card))
      );
    } catch (err) {
      console.log("Не удалось изменить лайк", err);
    }
  };

  const handleCardDelete = (card) => {
    setApproveCallback((oldCallback) => () => {
      handleCardDeleteApproved(card);
    });
    handleShowApprovePopup(true);
  };

  const handleCardDeleteApproved = async (card) => {
    try {
      const response = await api.deleteCard(card._id);
      if (response.message === "Пост удалён") {
        setCards((oldCards) =>
          oldCards.filter((oldCard) => oldCard._id !== card._id)
        );
        closeAllPopups();
      }
    } catch (err) {
      console.log("Не удалось удалить карточку", err);
    }
  };

  const handleUpdateUser = async (userInfo) => {
    try {
      const newUserInfo = await api.patchUserData(userInfo);
      handleCurrentUserInfoChange(newUserInfo);
      closeAllPopups();
    } catch (err) {
      console.log("Не удалось изменить данные пользователя", err);
    }
  };

  const handleUpdateAvatar = async (avatarLink) => {
    try {
      const newUserInfo = await api.updateAvatar(avatarLink);
      handleCurrentUserInfoChange(newUserInfo);
      closeAllPopups();
    } catch (err) {
      console.log("Не удалось изменить аватар пользователя", err);
    }
  };

  const handleAddPlaceSubmit = async ({ name, link, resetForm }) => {
    try {
      const newCard = await api.postCard({ name, link });
      setCards([newCard, ...cards]);
      resetForm();
      closeAllPopups();
    } catch (err) {
      console.log("Не удалось добавить карточку", err);
    }
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleShowApprovePopup = () => {
    setApprovePopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setApprovePopupOpen(false);
    setSelectedCard({});
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };


  const onExit = () =>{
    localStorage.removeItem('token');
    setApprovePopupOpen(false)
    handleTokenCheck()
  }

  const approveExit= () =>{
    setApprovePopupOpen(true)
    setApproveCallback(()=>()=>onExit())
  }

  return (
    <>
      <Header>
        <div style={{display: "flex", marginRight: 'clamp(0px,calc(27px - (100vw - 880px)/2),27px)'}}>
          <p style={{marginRight: '24px'}}>{currentUserInfo.email}</p>
          <p className="link" onClick={approveExit} style={{}}>{"Выйти"}</p>
        </div>
      </Header>
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      <ApprovePopup
        isOpen={isApprovePopupOpen}
        onClose={closeAllPopups}
        onApprove={approveCallback}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlaceSubmit={handleAddPlaceSubmit}
      />
      <ImagePopup
        name={"img"}
        isOpen={!!Object.keys(selectedCard).length}
        onClose={closeAllPopups}
        card={selectedCard}
      />
    </>
  );
};
