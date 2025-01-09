import React, { useEffect, useState } from 'react'
import SuperAdminMasterLayout from '../masterLayout/SuperAdminMasterLayout';
import ActiveAdminLayers from '../components/ActiveAdminlayers';
import InactiveAdminLayers from '../components/InactiveAdminLayers';
const InactiveAdmin = () => {
    return (
       <>
       <SuperAdminMasterLayout>
       <InactiveAdminLayers />
       </SuperAdminMasterLayout>
       </>
    );
}

export default InactiveAdmin