import React, { useEffect, useState } from 'react'
import SuperAdminMasterLayout from '../masterLayout/SuperAdminMasterLayout';
import ActiveAdminLayers from '../components/ActiveAdminlayers';
const ActiveAdmin = () => {
    return (
       <>
       <SuperAdminMasterLayout>
       <ActiveAdminLayers />

       </SuperAdminMasterLayout>
       
       </>
    );
}

export default ActiveAdmin