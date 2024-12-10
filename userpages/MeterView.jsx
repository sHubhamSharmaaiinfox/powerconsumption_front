import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import MeterViewLayers from "../components/MeterViewLayers";

const MeterView = () => {
  return (
    <>
    
      <MasterLayout>
        
        <MeterViewLayers />
      </MasterLayout>
    </>
  );
};

export default MeterView; 
