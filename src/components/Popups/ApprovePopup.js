import { PopupWithForm } from "./PopupWithForm";

export const ApprovePopup = ({isOpen,onClose, onApprove}) => {

  const handleSubmit = (e) =>{
    e.preventDefault()
    onApprove()
  }

  return (
    <PopupWithForm
      name={"approve"}
      title={"Вы уверены?"}
      submitButtonText={"Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
};
