export type creditCardItem = {
    id: number
    issuer: string
    issuerDetails?: issuerDetails
    number: string
    name: string
    expiry: string
    cvc?: string
    balance: number
    pin:number
};

type issuerDetails = {
    id: number
    name: string
    cardStyle: string 
    limit: number 
    fee: number
  }
  
  export type transferDetails = {
    sender: number 
    receiver: number
    amount: number 
  };
  
  export interface CardSliceState {
    creditCardItems: creditCardItem[];
  }