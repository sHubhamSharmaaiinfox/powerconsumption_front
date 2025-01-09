import React, { useEffect, useState } from 'react'



import AdminMasterLayer from '../masterLayout/AdminMasterLayer';
import ActiveUsersLayers from '../components/ActiveUserLayers';

const ActiveUsers = () => {


    return (


        <AdminMasterLayer>

           <ActiveUsersLayers />

        </AdminMasterLayer>
    );


}

export default ActiveUsers