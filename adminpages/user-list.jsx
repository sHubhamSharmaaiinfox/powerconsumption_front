import React from "react";
import AdminMasterLayer from "../masterLayout/AdminMasterLayer";
import UserLists from "../components/UserList";

const UserListPage = () => {
  return (
    <>
      <AdminMasterLayer>

            
    <UserLists />       
      </AdminMasterLayer>
    </>
  );
};
export default  UserListPage;
