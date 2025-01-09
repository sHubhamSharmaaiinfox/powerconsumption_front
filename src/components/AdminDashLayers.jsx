import React from 'react'
import AdminCards from './child/AdminCards'
import TotalSubscriber from './child/TotalSubscribers'
import AdminDashCharts from './dashboard-charts'

const AdminDashLayers = () => {

    return (
        <>

        <AdminCards />
            <section className="row gy-4 mt-1">
             <AdminDashCharts/>
            </section>
        </>


    )
}

export default AdminDashLayers