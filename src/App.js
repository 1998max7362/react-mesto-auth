import { useState, useEffect, useCallback } from "react";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { Register } from "./components/Register";
import { AuthorizedMain } from "./components/AuthorizedMain";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { Login } from "./components/Login";
import { auth } from "./utils/Auth";
import ProtectedRouteElement from "./components/ProtectedRouteElement";
// import { Sign } from "./components/Sign";

function App() {
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const handleCurrentUserInfoChange = useCallback(
    (newUserInfo) => {
      setCurrentUserInfo((oldUserInfo) => {
        return { ...oldUserInfo, ...newUserInfo };
      });
    },
    [setCurrentUserInfo]
  );

  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = async () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      try {
        const userData = await auth.checkTokenValidity(token);
        setLoggedIn(true);
        handleCurrentUserInfoChange(userData.data);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
    else{
      setLoggedIn(false);
    }
  };

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUserInfo}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement loggedIn={loggedIn}>
                  <AuthorizedMain
                    handleCurrentUserInfoChange={handleCurrentUserInfoChange}
                    handleTokenCheck = {handleTokenCheck}
                  />
                </ProtectedRouteElement>
              }
            />
            <Route path="/sign-up" element={<Register />} />
            <Route
              path="/sign-in"
              element={<Login handleTokenCheck={handleTokenCheck} />}
            />
          </Routes>
        </CurrentUserContext.Provider>
        <Footer />
      </div>
    </div>
  );
}

export default App;
