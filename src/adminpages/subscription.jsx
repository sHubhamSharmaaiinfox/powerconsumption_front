import React, { useEffect, useState } from 'react'

import SubscriptionLayers from '../components/SubscriptionLayers';

import AdminMasterLayer from '../masterLayout/AdminMasterLayer';
import SuperAdminMasterLayout from '../masterLayout/SuperAdminMasterLayout';

const Subscription = () => {
    return (
        <SuperAdminMasterLayout >
             <SubscriptionLayers />
        </SuperAdminMasterLayout>    
    );


}

export default Subscription