import { useRef } from "react";
import { PopupWithForm } from "./PopupWithForm";

export const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
  const avatarRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault();
    const avatar = avatarRef.current.value
    onUpdateAvatar({
      avatar
    });
  }
  return(
    <PopupWithForm
    name={"avatar"}
    title={"Обновить аватар"}
    submitButtonText={"Сохранить"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <div className="form__input-container">
      <input
        className="form__input form__input_el_second"
        placeholder="Ссылка на картинку"
        id="avatar-source_link"
        type="url"
        name="avatar"
        required
        aria-label="Ссылка на картинку"
        ref={avatarRef}
      />
      <span
        className="form__input-error"
        id="avatar-source_link-input-error"
      ></span>
    </div>
  </PopupWithForm>
  )

};
