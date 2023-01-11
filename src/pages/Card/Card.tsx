import { FC } from "react";
import CreditCardList from "../../components/CreditCardList/CreditCardList";
import { motion } from "framer-motion";

const Card: FC = () => {
  return (
    <motion.div
      className="pizza page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CreditCardList />
    </motion.div>
  );
};

export default Card;
