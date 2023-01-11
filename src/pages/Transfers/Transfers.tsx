import { FC } from "react";
import { motion } from "framer-motion";
import "./Contact.scss";
import TransfersList from "../../components/Transfers/TransfersList"

const Contact: FC = () => {
  return (
    <motion.div
      className="pizza page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
    <TransfersList />
    </motion.div>
  );
};

export default Contact;
