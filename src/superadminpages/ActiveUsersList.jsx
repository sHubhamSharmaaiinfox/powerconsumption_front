import React, { useEffect, useState } from 'react'
import SuperAdminMasterLayout from '../masterLayout/SuperAdminMasterLayout';
import ActiveUsersListLayer from '../components/ActiveUsersListLayer';
const ActiveUsersList = () => {
    return (
        <SuperAdminMasterLayout>
            <ActiveUsersListLayer />
        </SuperAdminMasterLayout>
    );
}
export default ActiveUsersList