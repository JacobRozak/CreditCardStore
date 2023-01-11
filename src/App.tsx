import { ReactNotifications } from "react-notifications-component";
import React from "react";
import CardNav from "./components/Header/CardNav"
import AnimatedRoutes from "./pages/AnimatedRoutes";
import "./styles.scss";
import "react-notifications-component/dist/theme.css";
import { AppContext } from "./context/context";

export default function App() {
  const { dark } = React.useContext(AppContext) as ContextType;

  return (
    <div className={dark ? "dark main" : "main"} id="App">
      <CardNav />
      <div id="page-wrap"></div>
      <div className="app-container">
        <ReactNotifications />
      </div>
      <AnimatedRoutes />
    </div>
  );
}
