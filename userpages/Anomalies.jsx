import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import Anomaliesayer from "../components/Anomaliesayer";

const Anomalies = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Basic Table" />

        <Anomaliesayer />

      </MasterLayout>

    </>
  );
};

export default Anomalies; 
