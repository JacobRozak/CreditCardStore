import React, { FC } from "react";
import "./CreditCardItem.scss";
import { AppContext } from "../../context/context";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import { useNavigate } from "react-router-dom";
import {creditCard} from "../../interfaces/creditCardItem"

const CreditCardItem: FC<creditCard> = ({
    id,
    issuer,
    number,
    name,
    expiry,
    cvc,
    pin
}) => {
  let navigate = useNavigate();
  const cardSignin = (e: any) => {
    if (prompt("pass the pin code") == pin.toString()){
      navigate('/card/' + id.toString());
    } else {
      alert('WRONG PASSWORD')
    }
    e.preventDefault()
  }

  const { dark } = React.useContext(AppContext) as ContextType;

  return (
    <div className={dark ? "dark pizzaitem" : "pizzaitem"}>
      <div className="pizzaitem__image">
        <Cards issuer={issuer} preview={true} number={'•••• •••• •••• ' + number.slice(number.length-4)} name={name} expiry={expiry} cvc={cvc} />
      </div>
      <div className="pizzaitem__cart">
         <div className="pizzaitem__cart">
            <button onClick={cardSignin} className="button-btn">Get info</button>
          </div>
      </div>
    </div>
  );
};

export default CreditCardItem;
