import React, { useEffect } from 'react'
import 'datatables.net-dt/js/dataTables.dataTables.js';
import MeterChart from './MeterChart';
import MeterChartDaily from './MeterChartDaily';
import MeterDataTable from './MeterDataTable';
import MeterLayerCards from './child/MeterLayerCards';

const MeterViewLayers = () => {
    return (
        <>
    <div className="row gy-4 mb-24">
       <MeterLayerCards />
       <MeterChart />
    </div> 
    
        <MeterDataTable />
    
    
    </>
    
    )
}

export default MeterViewLayers