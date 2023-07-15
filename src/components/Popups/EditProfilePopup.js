import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useState, useEffect } from "react";

export const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState(''); 
  const [about, setAbout] = useState('');

  const currentUserInfo = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUserInfo.name);
    setAbout(currentUserInfo.about);
  }, [currentUserInfo, isOpen]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handelDescriptionChange = (event) => {
    setAbout(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({ name, about });
  };

  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      submitButtonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__input-container">
        <input
          className="form__input form__input_el_first"
          placeholder="Имя"
          id="profile_name"
          type="text"
          name="name"
          aria-label="Имя"
          required
          minLength="2"
          maxLength="40"
          value={name||''}
          onChange={handleNameChange}
        />
        <span
          className="form__input-error"
          id="profile_name-input-error"
        ></span>
        <input
          className="form__input form__input_el_second"
          placeholder="Предназначение"
          id="Job"
          type="text"
          name="about"
          aria-label="Предназначение"
          required
          minLength="2"
          maxLength="200"
          value={about||''}
          onChange={handelDescriptionChange}
        />
        <span className="form__input-error " id="Job-input-error"></span>
      </div>
    </PopupWithForm>
  );
};
