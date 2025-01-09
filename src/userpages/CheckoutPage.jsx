import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import PaymentCheckout from "../components/CheckoutPay";
const CheckoutUser = () => {
  return (
    <>
      <MasterLayout>
       <PaymentCheckout/>
      </MasterLayout>
    </>
  );
};
export default CheckoutUser;
