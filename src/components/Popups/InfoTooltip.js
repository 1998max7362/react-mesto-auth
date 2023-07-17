import { Popup } from "./Popup";
import succesIcon from '../../images/registration/success.svg'
import errorIcon from '../../images/registration/error.svg'

export const InfoTooltip = ({ name, isOpen, onClose, result, resultText }) => {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="info-tooltip">
        <img src={result? succesIcon : errorIcon}  className="info-tooltip__icon" alt='Иконка ответа на регистрацию' />
        <p className="info-tooltip__text">{resultText}</p>
      </div>
    </Popup>
  );
};
