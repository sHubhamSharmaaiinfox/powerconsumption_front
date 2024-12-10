import React, { useEffect } from 'react'
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import MeterChart from './MeterChart';
import MeterChartDaily from './MeterChartDaily';
import MeterDataTable from './MeterDataTable';

const MeterViewLayers = () => {
    return (
        <>
    <div className='row'>

    <MeterChart />
    <MeterChartDaily />
    
    </ div>
    <section className="row gy-4 mt-1">
    <MeterDataTable />
    </section>
    </>
    
    )
}

export default MeterViewLayers