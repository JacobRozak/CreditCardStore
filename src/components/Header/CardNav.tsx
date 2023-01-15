import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useSelector } from "react-redux";
import { FC } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../../context/context";

const Header:FC = () => {

  const { changeTheme, dark } = React.useContext(AppContext) as ContextType;

  return (
    <div className={dark ? "dark header" : "header"}>
      <nav className="header__nav">
        <ul className="header__ul">
          <li className="header__li">
            <Link className={dark ? "dark " : ""} to="/">
              Home
            </Link>
          </li>
          <li className="header__li">
            <Link className={dark ? "dark " : ""} to="/payment">
              add Card
            </Link>
          </li>
          <li className="header__li">
            <Link className={dark ? "dark " : ""} to="/transfers">
              Transactions history
            </Link>
          </li>
        </ul>
      </nav>
      <button className="changetheme" onClick={() => changeTheme()}>
        CHANGE THEME
      </button>
    </div>
  );
};

export default Header;
