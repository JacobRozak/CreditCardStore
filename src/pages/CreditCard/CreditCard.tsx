import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreditCardList from "../../components/Transfers/TransfersList";
import { selectCreditCard } from "../../redux/Slices/creditCardSlice";
import { motion } from "framer-motion";
import "./Cart.scss";

const CreditCard: FC = () => {
  const { creditCardItems } = useSelector(selectCreditCard)
  return (
    <motion.div
      className="cart"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      {creditCardItems.length > 0 ? (
        <div className="cart__items">
          <CreditCardList />
        </div>
      ) : (
        <div className="cart__empty">
          <h3>
            Here is no credit cards... However, you can{" "}
            <Link to="/">
              <b className="b">order</b>
            </Link>{" "}
            one
          </h3>
        </div>
      )}
    </motion.div>
  );
};

export default CreditCard;
