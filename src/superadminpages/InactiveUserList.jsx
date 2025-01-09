import React, { useEffect, useState } from 'react'
import SuperAdminMasterLayout from '../masterLayout/SuperAdminMasterLayout';
import InactiveUsersListLayer from '../components/InactiveUserListLayer';
const InactiveUsersList = () => {
    return (
        <SuperAdminMasterLayout>
            < InactiveUsersListLayer />
        </SuperAdminMasterLayout>
    );
}
export default InactiveUsersList