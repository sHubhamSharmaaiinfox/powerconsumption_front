import React from "react";
import SuperAdminMasterLayout from "../masterLayout/SuperAdminMasterLayout";
import SuperAdminDashLayers from "../components/SuperAdminDashLayers";


const Dashboard = () => {
  return (
    <>
 <SuperAdminMasterLayout>
    <SuperAdminDashLayers />
 </SuperAdminMasterLayout>
    </>
  );
};
export default Dashboard;
