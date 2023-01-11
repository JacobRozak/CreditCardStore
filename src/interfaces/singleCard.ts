export interface Card {
    id: number;
    issuer: string;
    issuerDetails?: issuerDetails
    number: string;
    name: string;
    expiry: string;
    cvc?: string;
    balance: number;
    pin: number;
  }

export type transferDetails = {
    sender: number 
    receiver: number
    amount: number 
  };
export  type issuerDetails = {
    id: number
    name: string
    cardStyle: string 
    limit: number 
    fee: number
  }