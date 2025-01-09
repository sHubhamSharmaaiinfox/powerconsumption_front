import React, { useEffect, useState } from 'react'



import AdminMasterLayer from '../masterLayout/AdminMasterLayer';
import InActiveUsersLayers from '../components/InactiveUserLayer';


const InActiveUsers = () => {


    return (


        <AdminMasterLayer>

        <InActiveUsersLayers />

        </AdminMasterLayer>
    );


}

export default InActiveUsers