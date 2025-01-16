import React, { useEffect, useState } from 'react'




import PendingRequestsLayers from '../components/PendingRequestsLayers';
import SuperAdminDashLayers from '../components/SuperAdminDashLayers';
import SuperAdminMasterLayout from '../masterLayout/SuperAdminMasterLayout';


const PendingRequests = () => {


    return (


        <SuperAdminMasterLayout>
            <PendingRequestsLayers />

        </SuperAdminMasterLayout>
    );


}

export default PendingRequests