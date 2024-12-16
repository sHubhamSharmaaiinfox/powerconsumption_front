import React, { useEffect, useState } from 'react'

import SubscriptionLayers from '../components/SubscriptionLayers';

import AdminMasterLayer from '../masterLayout/AdminMasterLayer';

const Subscription = () => {


    return (


        <AdminMasterLayer>

            <SubscriptionLayers />

        </AdminMasterLayer>
    );


}

export default Subscription