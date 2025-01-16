import React, { useEffect, useState } from 'react'
import PaymentHistoryLayers from '../components/PaymentHistoryLayers';
import SuperAdminMasterLayout from '../masterLayout/SuperAdminMasterLayout';
const PaymentHistory = () => {
    return (
        <SuperAdminMasterLayout>
            <PaymentHistoryLayers />
        </SuperAdminMasterLayout>
    );


}

export default PaymentHistory