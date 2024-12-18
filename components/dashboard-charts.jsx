import useReactApexChart from '../hook/useReactApexChart'
import ReactApexChart from 'react-apexcharts'
import DashboardPieChart from './DashboardPieChart'
import { apiGet } from "../services/client";
import React, { useEffect, useState } from "react";

const  AdminDashCharts = () => {



        const [subscriptionData, setSubscriptionData] = useState([]);
    
        const getSubscription = async () => {
            try {
                const res = await apiGet("admin/subscription-chart");
                if (res?.data?.status === true) {
                    console.log(res);
                    const newData = res?.data?.data;
                    setSubscriptionData(newData);
    
                } else {
                    console.log(res?.data?.message);
                }
            } catch (e) {
                console.log(e);
            }
        };

        useEffect(() => {
            getSubscription();       
        }, []);
    
    let { columnChartSeriesOne, columnChartOptionsOne, columnChartSeriesTwo, columnChartOptionsTwo, columnChartSeriesThree, columnChartOptionsThree, columnChartSeriesFour, columnChartOptionsFour } = useReactApexChart()

    return (
        <>
            <section className="row gy-4 mt-1">
            <div className="col-md-6">
                <div className="card h-100 p-0">
                    <div className="card-header border-bottom bg-base py-16 px-24">
                        <h6 className="text-lg fw-semibold mb-0">Total Users</h6>
                    </div>
                    <div className="card-body p-24">
                        <ReactApexChart id="columnChart" options={columnChartOptionsOne} series={columnChartSeriesOne} type="bar" height={264} />
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card h-100 p-0">
                    <div className="card-header border-bottom bg-base py-16 px-24">
                        <h6 className="text-lg fw-semibold mb-0">Total Subscription</h6>
                    </div>
                    <div className="card-body p-24">
                        <ReactApexChart id="columnGroupBarChart" options={columnChartOptionsTwo} series={columnChartSeriesTwo} type="bar" height={264} />
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <DashboardPieChart/>
            </div>
            <div className="col-md-6">
                <div className="card h-100 p-0">
                    <div className="card-header border-bottom bg-base py-16 px-24">
                        <h6 className="text-lg fw-semibold mb-0">Total Devices</h6>
                    </div>
                    <div className="card-body p-24">
                    <ReactApexChart id="columnGroupBarChart" options={columnChartOptionsTwo} series={columnChartSeriesTwo} type="bar" height={264} />
                    </div>
                </div>
            </div>
            </section>
        </>


    )
}

export default AdminDashCharts