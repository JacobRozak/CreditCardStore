import { FC } from "react";
import CreditCardItem from "../CreditCardItem/CreditCardItem";
import "./CreditCardList.scss";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { selectCreditCard } from "../../redux/Slices/creditCardSlice";

const CreditCardList: FC = () => {
  const { creditCardItems } = useSelector(selectCreditCard)

  return (
    <div className="app_container">
      <div className="pizzalist">
        <div className="pizzalist__sort">
        </div>
        <div className="pizzalist__items">
          {creditCardItems.length == 0
            ? "No cards here just yet! Make sure to upload cards first"
            : creditCardItems.map((creditCardItem, i) => {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pizzalist__singlepizza"
                  >
                    <CreditCardItem {...creditCardItem} />
                  </motion.div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default CreditCardList;
