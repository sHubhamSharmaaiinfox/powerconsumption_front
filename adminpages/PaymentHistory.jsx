import React, { useEffect, useState } from 'react'



import AdminMasterLayer from '../masterLayout/AdminMasterLayer';
import InActiveUsersLayers from '../components/InactiveUserLayer';
import PaymentHistoryLayers from '../components/PaymentHistoryLayers';


const PaymentHistory = () => {


    return (


        <AdminMasterLayer>
            <PaymentHistoryLayers />
        </AdminMasterLayer>
    );


}

export default PaymentHistory