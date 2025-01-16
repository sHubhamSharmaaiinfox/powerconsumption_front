import React from "react";
import AdminMasterLayer from "../masterLayout/AdminMasterLayer";
import PaymentForm from "../components/PaymentForm";
import SuperAdminMasterLayout from "../masterLayout/SuperAdminMasterLayout";

const PaymentSettings = () => {
  return (
    <>
      <SuperAdminMasterLayout>
      <PaymentForm/>
      </SuperAdminMasterLayout>
    </>
  );
};
export default PaymentSettings;
