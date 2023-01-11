import { Routes, Route, useLocation } from "react-router-dom";

import CreditCard from "./CreditCard/CreditCard";
import Card from "./Card/Card";
import Transfers from "./Transfers/Transfers";
import PaymentPage from "./PaymentPage/PaymentPage";
import SingleCard from "./SingleCard/SingleCard";

import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Card />} />
          <Route path="/cart" element={<CreditCard />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/card/:id" element={<SingleCard />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedRoutes;
