import { useEffect } from "react";

export const Popup = ({ name, children, isOpen, onClose }) => {

  useEffect(() => {
    if (!isOpen) return;
    
    function handleESC(e) {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleESC);

    return () => document.removeEventListener("keydown", handleESC);
  }, [isOpen]);


  return (
    <div
      id="popup"
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={(event) => {
        if (event.target.id === "popup") onClose();
      }}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="Close"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
};
