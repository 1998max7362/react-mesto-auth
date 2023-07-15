import { Popup } from "./Popup";


export const PopupWithForm = ({ name, title, submitButtonText, submitButtonActive,children, isOpen, onClose, onSubmit}) => {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <form className="form" name={name} onSubmit={onSubmit} noValidate>
        <h2 className="form__name">{title}</h2>
        {children}
        <button
          type="submit"
          // className="form__save-button"
          className={`form__save-button ${submitButtonActive&&'form__save-button_disabled'}`}
          aria-label="Сохранить"
          disabled={submitButtonActive}
        >
          {submitButtonText}
        </button>
      </form>
    </Popup>
  );
};
