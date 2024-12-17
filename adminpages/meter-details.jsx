import React, { useEffect, useState } from 'react'
import AdminMasterLayer from '../masterLayout/AdminMasterLayer';
import MeterDataDetails from '../components/UserMeterDataTable';
const meterData = () => {


    return (


        <AdminMasterLayer>

           <MeterDataDetails/>

        </AdminMasterLayer>
    );


}

export default meterData