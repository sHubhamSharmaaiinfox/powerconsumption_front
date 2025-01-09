import React, { useEffect, useState } from 'react'



import AdminMasterLayer from '../masterLayout/AdminMasterLayer';
import PendingRequestsLayers from '../components/PendingRequestsLayers';


const PendingRequests = () => {


    return (


        <AdminMasterLayer>
            <PendingRequestsLayers />

        </AdminMasterLayer>
    );


}

export default PendingRequests