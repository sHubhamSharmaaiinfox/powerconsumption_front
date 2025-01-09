import React from "react";
import SuperAdminMasterLayout from "../masterLayout/SuperAdminMasterLayout";
import UserListLayer from "../components/UserListLayer";


const UserDetails = () => {
  return (
    <>
    <SuperAdminMasterLayout>
    <UserListLayer />
    </SuperAdminMasterLayout>
    </>
  );
};
export default  UserDetails;
