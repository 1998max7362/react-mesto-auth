import logo from "../images/header/logo.svg"

export const Header = ({children}) => {

    return(
        <header className="header">
        <img
          className="header__logo"
          src={logo}
          alt="Лого"
        />
        {children}
      </header>
    )
}