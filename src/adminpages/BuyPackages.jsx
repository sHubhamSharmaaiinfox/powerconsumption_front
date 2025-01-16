import React from "react";

import AdminMasterLayer from "../masterLayout/AdminMasterLayer";
import AdminPricingPlans from "../components/AdminPricingPlans";

const BuyPackages = () => {
  return (
    <>

      {/* MasterLayout */}
      <AdminMasterLayer>

    
        <AdminPricingPlans />

      </AdminMasterLayer>

    </>
  );
};

export default BuyPackages; 
