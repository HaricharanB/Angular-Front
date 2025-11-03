export interface Booking {
  id: string;
  name: string;
  city: string;
  phone: string;
  email: string;
  age: number | string;
  planId: string;
  planName: string;
  validity: number | string;
  paymentMode: string;
  cardNumber: string;
  premiumAmt: number;
  paymentFreq: string;
  earnings?: number;
  healthCondition?: string;
}
