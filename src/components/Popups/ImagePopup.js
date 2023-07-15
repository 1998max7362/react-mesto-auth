import { Popup } from "./Popup";


export const ImagePopup = ({name, isOpen, onClose, card}) => {

  return (
    <Popup
      name={name}
      isOpen={isOpen}
      onClose={onClose}
    >
      <figure className="img-container">
        <img src={card.link}  className="img-container__img" alt={card.name} />
        <figcaption className="img-container__caption">{card.name}</figcaption>
      </figure>
    </Popup>
  );
};
