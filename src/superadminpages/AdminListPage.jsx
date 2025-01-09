import React from "react";
import AdminMasterLayer from "../masterLayout/AdminMasterLayer";
import UserLists from "../components/UserList";
import SuperAdminMasterLayout from "../masterLayout/SuperAdminMasterLayout";
import AdminList from "../components/AdminList";

const AdminListPage = () => {
  return (
    <>
     <SuperAdminMasterLayout>
        <AdminList />
     </SuperAdminMasterLayout>
    </>
  );
};
export default  AdminListPage;
