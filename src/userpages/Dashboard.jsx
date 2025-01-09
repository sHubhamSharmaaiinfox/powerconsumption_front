import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DashBoardLayerOne from "../components/DashBoardLayerOne";
const UserDashboard = () => {
  return (
    <>
      <MasterLayout>
        <DashBoardLayerOne />
      </MasterLayout>
    </>
  );
};
export default UserDashboard;
