import { Sign } from "./Sign";
import { InfoTooltip } from "./Popups/InfoTooltip";
import { auth } from "../utils/Auth";
import { Header } from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({handleTokenCheck}) => {
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);


  const navigate = useNavigate()

  const onsubmit = async ({ email, password }) => {
    try {
      await auth.authorize({ email, password });
      handleTokenCheck()
    } catch (err) {
      console.log(err);
      setInfoTooltipOpen(true);
    }
  };

  return (
    <>
      <Header>
        <p className="link" onClick={()=> navigate('/sign-up')} style={{marginRight: 'clamp(0px,calc(27px - (100vw - 880px)/2),27px)'}}>{"Регистрация"}</p>
      </Header>
      <Sign
        title={"Вход"}
        buttonTitle={"Войти"}
        handleSubmit={onsubmit}
      >
      </Sign>
      <InfoTooltip
        name={"registration"}
        isOpen={isInfoTooltipOpen}
        onClose={() => setInfoTooltipOpen(false)}
        result={false}
      />
    </>
  );
};
