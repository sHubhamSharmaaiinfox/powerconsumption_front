import React from 'react'
import SuperAdminCards from './child/SuperAdminCards'
import SuperAdminDashCharts from './child/SuperAdminDashCharts'

const SuperAdminDashLayers = () => {
    return (
        <>
        <SuperAdminCards />
            <section className="row gy-4 mt-1">  
                <SuperAdminDashCharts />
            </section>
        </>
    )
}
export default SuperAdminDashLayers