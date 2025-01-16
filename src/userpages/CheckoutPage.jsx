import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import PaymentCheckout from "../components/CheckoutPay";
import AdminMasterLayer from "../masterLayout/AdminMasterLayer";
const CheckoutUser = () => {
  return (
    <>
      <AdminMasterLayer>
       <PaymentCheckout/>
      </AdminMasterLayer>
    </>
  );
};
export default CheckoutUser;
