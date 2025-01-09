import React, { useEffect, useState } from 'react'
import SuperAdminMasterLayout from '../masterLayout/SuperAdminMasterLayout';
import AdminPackageReportsLayer from '../components/AdminPackageReportsLayer';
const AdminPackageReports = () => {
    return (
       <SuperAdminMasterLayout>
            <AdminPackageReportsLayer />
       </SuperAdminMasterLayout>
    );
}
export default AdminPackageReports