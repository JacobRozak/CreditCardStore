import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./SingleCard.scss";

import { Store } from "react-notifications-component";

import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

import { useSelector } from "react-redux";
import { selectCreditCard } from "../../redux/Slices/creditCardSlice";

import { useDispatch } from "react-redux";
import { initiateTransfer } from '../../redux/Slices/creditCardSlice'
import { addTransfer } from '../../redux/Slices/transferSlice'

import {Card, transferDetails} from  "../../interfaces/singleCard"

const SingleCard: FC = () => {
    const params = useParams<string>();
    const { creditCardItems } = useSelector(selectCreditCard)
    const dispatch = useDispatch();

    const [fullInfo, setFullInfo] = useState<Card>();
    const [avaliableCards, setAvaliableCards] = useState<Card[]>()
    const [pickedCard, setPickedCard]= useState<number>()
    const [pickedAmount, setPickedAmount]= useState<any>()
    const handlePickAmount = (e:React.ChangeEvent<HTMLInputElement>) => setPickedAmount(parseInt(e.target.value))
    const handleCardPic = (e:React.ChangeEvent<any>) => setPickedCard(parseInt(e.target.value))
    const id: any = params.id
    const numberyfied = parseInt(id)
    const submitTransaction = () => {
      const submission: transferDetails = {
        sender: numberyfied,
        receiver: avaliableCards!.filter((obj:any) => obj.number.toString() == pickedCard)[0].id,
        amount: pickedAmount
      }
      dispatch(initiateTransfer(submission))
      dispatch(addTransfer(submission))
      if (fullInfo !== undefined && pickedAmount !== undefined) {
        setFullInfo({
          id: fullInfo.id,
          issuer: fullInfo.issuer,
          issuerDetails: fullInfo.issuerDetails,
          number: fullInfo.number,
          name: fullInfo.name,
          expiry: fullInfo.expiry,
          cvc: fullInfo.cvc,
          balance: fullInfo.issuerDetails?.fee ? fullInfo.balance - (pickedAmount + fullInfo.issuerDetails?.fee % fullInfo.balance) : fullInfo.balance - pickedAmount,
          pin: fullInfo.pin
        })
      }
      Store.addNotification({
        title: "The way to GO",
        message: `you just transfered monies onto a new card`,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
        duration: 1500,
        onScreen: true
        }
      });
    }
    useEffect(() => {
        const item = creditCardItems.filter((obj:Card) => obj.id.toString() == params.id)[0]
        setFullInfo({
          id: item.id,
          issuer: item.issuer,
          issuerDetails: item.issuerDetails,
          number: item.number,
          name: item.name,
          expiry: item.expiry,
          cvc: item.cvc,
          balance: item.balance,
          pin: item.pin
        })
        setAvaliableCards(creditCardItems.filter((obj:Card) => obj.id.toString() !== params.id))
    },[]);

    return (
        <motion.div
        className="pizzacreate page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
        {fullInfo ? (
        <>
      <div className="create__complete">
        <div className="create__pizzablock">
          <div className="create__pizzaimage">
            <Cards issuer={fullInfo.issuer} number={fullInfo.number} name={fullInfo.name} expiry={fullInfo.expiry} cvc={0} />
          </div>
          <div className="create__priceinfo">
            <div className="create__price">
              Balance: {fullInfo.balance} $
            </div>
            <div className="create__addtocart">
            </div>
          </div>
        </div>
        <div className="create__pizzaelements">
          <div className="create__input"></div>
          <div className="create__ingradients">
            <div className="create__ingradient">
            </div>
            <div className="create__ingradient">
              <label htmlFor="mySelect">Transfer Funds</label>
              <select
                id="mySelect"
                className="form-control"
                name="expiry"
                onChange={ handleCardPic }
                >
                  <option>Select Account</option>
                {
                avaliableCards!.map((e:Card) => e.number).map((f:string)=>{
                  return (
                    <option value={f}>{'•••• •••• •••• ' + f.slice(f.length-4)}</option>
                  )
                })
                }
              </select>
            </div>
            <div className="create__ingradient">
            <input
                placeholder="Amount"
                type="tel"
                name="amount of monies to send"
                maxLength={15}
                className=" form-control"
                // value={pickedAmount}
                pattern="\d*"
                onChange={handlePickAmount}
            ></input>
            </div>
          </div>
          <hr></hr>
          <button className="link_buy button-btn" onClick={submitTransaction}>
            transfer
         </button>
        </div>
      </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </motion.div>
  );
};

export default SingleCard;
