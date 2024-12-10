import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import Amplayers from "../components/Amplayers";

const AmpReading = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Basic Table" />

        <Amplayers />

      </MasterLayout>

    </>
  );
};

export default AmpReading; 
