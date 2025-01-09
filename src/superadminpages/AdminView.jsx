import React from "react";
import SuperAdminMasterLayout from "../masterLayout/SuperAdminMasterLayout";
import AdminViewLayer from "../components/AdminViewLayer";

const AdminView = () => {
  return (
    <>
<SuperAdminMasterLayout >
    <AdminViewLayer />
</SuperAdminMasterLayout>
    </>
  );
};
export default AdminView;