import { PopupWithForm } from "./PopupWithForm";
import { useFormAndValidation } from "../useValidatedState";

export const AddPlacePopup = ({ isOpen, onClose, onAddPlaceSubmit }) => {

    //Круто! Спасибо большое, Михаил!
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleClose = () => {
    resetForm()
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, link } = values;
    onAddPlaceSubmit({ name, link, resetForm });
  };

  return (
    <PopupWithForm
      name={"card"}
      title={"Новое место"}
      submitButtonText={"Создать"}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitButtonActive={!isValid}
    >
      <div className="form__input-container">
        <input
          className="form__input form__input_el_first"
          placeholder="Название"
          id="place_name"
          type="text"
          name="name"
          aria-label="Название"
          required
          minLength="2"
          maxLength="30"
          value={values.name||''}
          onChange={(e) => handleChange(e)}
          // onChange={(e) => setName(e.target.value)}
        />
        <span className="form__input-error" id="place_name-input-error">
          {errors.name}
        </span>
        <input
          className="form__input form__input_el_second"
          placeholder="Ссылка на картинку"
          id="source_link"
          type="url"
          name="link"
          required
          aria-label="Ссылка на картинку"
          value={values.link||''}
          onChange={(e) => handleChange(e)}
          // onChange={(e) => setLink(e.target.value)}
        />
        <span className="form__input-error" id="source_link-input-error">
          {errors.link}
        </span>
      </div>
    </PopupWithForm>
  );
};
