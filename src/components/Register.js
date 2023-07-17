import { Sign } from "./Sign";
import { InfoTooltip } from "./Popups/InfoTooltip";
import { auth } from "../utils/Auth";
import { Header } from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [result, setResult] = useState(false);

  const navigate = useNavigate();

  const onsubmit = async ({ email, password }) => {
    try {
      const res = await auth.register({ email, password });
      setResult(true);
    } catch (err) {
      console.log(err);
      setResult(false);
    }
    setInfoTooltipOpen(true);
  };

  return (
    <>
      <Header>
        <p
          className="link"
          onClick={() => navigate("/sign-in")}
          style={{
            marginRight: "clamp(0px,calc(27px - (100vw - 880px)/2),27px)",
          }}
        >
          {"Войти"}
        </p>
      </Header>
      <Sign
        title={"Регистрация"}
        buttonTitle={"Зарегистироваться"}
        handleSubmit={onsubmit}
      >
        <p
          className="link"
          onClick={() => navigate("/sign-in")}
          style={{ margin: "0", marginTop: "20px", textAlign: "center" }}
        >
          {"Уже зарегистрированы? Войти"}
        </p>
      </Sign>
      <InfoTooltip
        name={"registration"}
        isOpen={isInfoTooltipOpen}
        onClose={() => {
          setInfoTooltipOpen(false);
        }}
        result={result}
      />
    </>
  );
};
