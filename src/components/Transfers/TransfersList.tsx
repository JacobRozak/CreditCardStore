import "../CreditCardList/CreditCardList.scss";
import { useSelector } from "react-redux";
import { selectCreditCard } from "../../redux/Slices/creditCardSlice";
import { FC } from "react";
import { selectTransfers } from "../../redux/Slices/transferSlice"

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const CreditCardList: FC = () => {
  const { transferItems } = useSelector(selectTransfers)
  return (
    <div className="cart__items">
      {
          <ul>
            {transferItems.map((transfer) => (
              <li>
                From: {'•••• •••• •••• ' + transfer.sender.toString().slice(transfer.sender.toString().length-4)} To: {'•••• •••• •••• ' + transfer.receiver.toString().slice(transfer.receiver.toString().length-4)} Amount: {transfer.amount} $
              </li>
            ))}
          </ul>
      }
    </div>
  );
};

export default CreditCardList;
