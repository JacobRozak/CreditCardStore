import React, { FC, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./CreateCard.scss";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { addCreditCard } from '../../redux/Slices/creditCardSlice'
import { useDispatch } from "react-redux";
import issuerData from  "../../context/data.json"

import { issuerDetails } from "../../interfaces/singleCard";
import { notification } from "../../notifications/notifications";

const CreditCard: FC = () => {

  const [showP, setShowP] = useState(false);

  const [issuer, SetIssuer] = useState<string>("amex");
  const [issuerDetails, SetIssuerDetails] = useState<issuerDetails>(issuerData[1]);
  const [number, SetNumber] = useState<string>(""); 
  const [name, SetName] = useState<string>("");
  const [month, SetMonth] = useState<string>("");
  const [expiry, SetExpiry] = useState<string>("");
  const [cvc, SetCvc] = useState<string>("");
  const [focus, SetFocus] = useState<string>("");
  const [balance, SetBalance] = useState<string>("");
  const [pin, SetPin] = useState<string>("")

  const dispatch = useDispatch();

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetMonth(e.target.value);
    SetExpiry(e.target.value);
  };
  const handleExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetExpiry(month.concat(e.target.value));
  };

  const handleIssuer = (e:React.ChangeEvent<any>) => {
    SetIssuer(e.target.value)
    var issuerDetails = issuerData.filter((f:any) => f.name == e.target.selectedOptions[0].text)[0]
    SetIssuerDetails(issuerDetails)
  }

  const showPar = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetFocus(e.target.name);
    setShowP(true);
  };
  
  const handleSubmit = () => {
    if (name.length == 0 || number.length < 16 || parseInt(balance) <= 0 || issuerDetails && issuerDetails.limit && parseInt(balance) > issuerDetails.limit) {
      notification("danger", "Ohh NO!", "these details may be incorrect, please fill them up as a real credit card")
    } else {
    dispatch(addCreditCard({
      id: Math.ceil(parseInt(Date.now().toFixed(5).toString())),
      issuer: issuer,
      issuerDetails: issuerDetails,
      number: number,
      name: name,
      expiry: expiry,
      cvc: cvc,
      balance: parseInt(balance),
      pin: parseInt(pin)
    }));
    notification("success", "Wonderful!", `new cart has been added`)
  }
}

  return (
    <>
      <div className="paymentcard">
        <div className={closed ? "none" : "rccs__card backcolor"}>
            <Cards
              issuer={issuer}
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              // focused={focus}
            />

          <br />
          <form>
          <div className="create__ingradient">
            <select
              className="form-control"
              name="expiry"
              onChange={ handleIssuer }
            >
              <option value="amex">AMEX Gold</option>
              <option value="amex">AMEX Platinum</option>
              <option value="visa">Visa</option>
            </select>
            </div>
            <div className="row">
              <div className="col-sm-11">
                <input
                  placeholder="Card Number"
                  type="tel"
                  className="form-control card-number"
                  value={number}
                  name="number"
                  maxLength={16}
                  pattern="[0-9]\d*"
                  onChange={(e) => {
                    SetNumber(e.target.value);
                  }}
                  onFocus={(e) => showPar(e)}
                  onBlur={() => setShowP(false)}
                ></input>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-11">
                <input
                  type="text"
                  placeholder="Card Name"
                  className="form-control card-name"
                  value={name}
                  name="name"
                  onChange={(e) => {
                    SetName(e.target.value);
                  }}
                  onFocus={(e) => SetFocus(e.target.name)}
                ></input>
              </div>
            </div>
            <br />
            <div className="row">
            </div>

            <div className="row">
              <div className="col-sm-4">
                <select
                  className="form-control"
                  name="expiry"
                  onChange={() => handleDate}
                >
                  <option value=" ">Month</option>
                  <option value="01">Jan</option>
                  <option value="02">Feb</option>
                  <option value="03">Mar</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">Aug</option>
                  <option value="09">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </select>
              </div>
              <div className="col-sm-4">
                <select
                  className="form-control"
                  name="expiry"
                  onChange={ () => handleExpiry }
                >
                  <option value=" ">Year</option>
                  <option value="21">2021</option>
                  <option value="22">2022</option>
                  <option value="23">2023</option>
                  <option value="24">2024</option>
                  <option value="25">2025</option>
                  <option value="26">2026</option>
                  <option value="27">2027</option>
                  <option value="28">2028</option>
                  <option value="29">2029</option>
                  <option value="30">2030</option>
                </select>
              </div>
              <div className="col-sm-3">
                <input
                  placeholder="CVC"
                  type="tel"
                  name="cvc"
                  maxLength={3}
                  className=" form-control card card-cvc"
                  value={cvc}
                  pattern="\d*"
                  onChange={(e) => {
                    SetCvc(e.target.value);
                  }}
                  onFocus={(e) => SetFocus(e.target.name)}
                ></input>
              </div>
              <div className="row">
              <div className="col-sm-11">
                <input
                  placeholder="Set Balance"
                  type="tel"
                  name="Balance"
                  maxLength={15}
                  className=" form-control card card-balance"
                  value={balance}
                  pattern="\d*"
                  onChange={(e) => {
                    SetBalance(e.target.value);
                  }}
                  onFocus={(e) => SetFocus(e.target.name)}
                >
                </input>
                </div>
                <div className="col-sm-11">
                 <input
                  placeholder="Pin"
                  type="tel"
                  name="pin"
                  maxLength={4}
                  className=" form-control card card-cvc"
                  value={pin}
                  pattern="\d*"
                  onChange={(e) => {
                    SetPin(e.target.value);
                  }}
                ></input>
                </div>
              </div>
            </div>
            <br />
            <Link to="/">
              <input
                type="submit"
                className="btn btn-secondary form-control"
                value="Submit"
                onClick={ (e) => {
                  handleSubmit()
                } }
              />
            </Link>
          </form>
          <p className={showP ? "p" : "none"}>
            you can also specify card provider by choosing
            <span className="b"> "4"</span> for Visa <span className="b"> "34"</span> for Amex  in the begining Card Number.
          </p>
        </div>
      </div>
    </>
  );
};
export default CreditCard;
