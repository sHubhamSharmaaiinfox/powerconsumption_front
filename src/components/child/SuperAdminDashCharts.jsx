import useReactApexChart from '../../hook/useReactApexChart'
import ReactApexChart from 'react-apexcharts'

import { apiGet } from "../../services/client";
import React, { useEffect, useState } from "react";
import MeterChart from '../MeterChart';

const  SuperAdminDashCharts = () => {

        const [subscriptionData, setSubscriptionData] = useState([]);
        const [metersdata, setMetersData] = useState(null);
        const [userData,setUserData] = useState(null);
        const [adminData,setAdminData] = useState(null);
    const [subscriptionChart, setSubscriptionChart] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 264,
            },
            xaxis: {
                categories: [],
            },
        },
    });



    const [userChart, setUserChart] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 264,
            },
            xaxis: {
                categories: [],
            },
        },
    });



    const [adminChart, setAdminChart] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 264,
            },
            xaxis: {
                categories: [],
            },
        },
    });


    const [deviceChart, setDeviceChart] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 264,
            },
            xaxis: {
                categories: [],
            },
        },
    });


    const getSubscription = async () => {
        try {
            const res = await apiGet("superadmin/subscription-amount-by-month");
            if (res?.data?.status === true) {
                const newData = res?.data?.data;
                setSubscriptionData(newData);
                console.log(newData);

                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const monthlyTotals = new Array(12).fill(0);

                newData.forEach(item => {
                    const date = new Date(item.date);
                    const monthIndex = date.getMonth(); // Get month (0 = January)
                    monthlyTotals[monthIndex] += parseFloat(item.amount || 0);
                });
                console.log(monthlyTotals);

                // Update chart data
                setSubscriptionChart({
                    series: [
                        {
                            name: 'Subscription Amount',
                            data: monthlyTotals,
                        },
                    ],
                    options: {
                        chart: {
                            type: 'bar',
                            height: 264,
                        },
                        xaxis: {
                            categories: months,
                        },
                    },
                });
            } else {
                console.log(res?.data?.message);
            }
        } catch (e) {
            console.log(e);
        }
    };


        

        const getMetres = async () => {
            try {
                const res = await apiGet("superadmin/devices-by-month");
                if (res?.data?.status === true) {
                    console.log(res);
                    const newData = res?.data?.data;
                    setMetersData(newData);
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const monthlyTotals = new Array(12).fill(0);
                    newData.forEach(item => {
                        const date = new Date(item.date);
                        const monthIndex = date.getMonth(); 
                        monthlyTotals[monthIndex] += parseFloat(item.amount || 0);
                    });
    
                    console.log(monthlyTotals);
                    setDeviceChart({
                        series: [
                            {
                                name: 'Devices',
                                data: monthlyTotals,
                            },
                        ],
                        options: {
                            chart: {
                                type: 'bar',
                                height: 264,
                            },
                            xaxis: {
                                categories: months,
                            },
                        },
                    });
                } else {
                    console.log(res?.data?.message);
                }
            } catch (e) {
                console.log(e);
            }
        };


        const getUserCount = async () => {
            try {
                const res = await apiGet("superadmin/user-count-by-month");
                console.log("userdata chart response",res?.data?.status)
                if (res?.data?.status === true) {
                    const newData = res?.data?.data;
                    console.log("userdata",res?.data?.data);
                    setUserData(newData);
            
                
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const monthlyTotals = new Array(12).fill(0);

                newData.forEach(item => {
                    const date = new Date(item.date);
                    const monthIndex = date.getMonth(); 
                    monthlyTotals[monthIndex] += parseFloat(item.amount || 0);
                });

                console.log(monthlyTotals);

        
                setUserChart({
                    series: [
                        {
                            name: 'Users',
                            data: monthlyTotals,
                        },
                    ],
                    options: {
                        chart: {
                            type: 'bar',
                            height: 264,
                        },
                        xaxis: {
                            categories: months,
                        },
                    },
                });
    
                } else {
                    console.log(res?.data?.message);
                }
            } catch (e) {
                console.log(e);
            }
        };



        const getadminCount = async () => {
            try {
                const res = await apiGet("superadmin/admin-count-by-month");
                console.log("userdata chart response",res?.data?.status)
                if (res?.data?.status === true) {
                    const newData = res?.data?.data;
                    console.log("admindata",res?.data?.data);
                    setAdminData(newData);
            
                
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const monthlyTotals = new Array(12).fill(0);

                newData.forEach(item => {
                    const date = new Date(item.date);
                    const monthIndex = date.getMonth(); 
                    monthlyTotals[monthIndex] += parseFloat(item.amount || 0);
                });

                console.log(monthlyTotals);

        
                setAdminChart({
                    series: [
                        {
                            name: 'Users',
                            data: monthlyTotals,
                        },
                    ],
                    options: {
                        chart: {
                            type: 'bar',
                            height: 264,
                        },
                        xaxis: {
                            categories: months,
                        },
                    },
                });
    
                } else {
                    console.log(res?.data?.message);
                }
            } catch (e) {
                console.log(e);
            }
        };


        useEffect(() => {
            getSubscription();
            getMetres(); 
            getUserCount(); 
            getadminCount();     
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
                        { userData ?
                        <ReactApexChart id="userchart" options={userChart.options} series={userData} type="bar" height={264} /> : <></>

                        }
                        </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card h-100 p-0">
                    <div className="card-header border-bottom bg-base py-16 px-24">
                        <h6 className="text-lg fw-semibold mb-0">Total Admins</h6>
                    </div>
                    <div className="card-body p-24">


                        { adminData?
                              <ReactApexChart
                              id="subscriptionChart"
                              options={adminChart.options}
                              series={adminData}
                              type="bar"
                              height={264}
                          /> : <></>
                        }

                  
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card h-100 p-0">
                    <div className="card-header border-bottom bg-base py-16 px-24">
                        <h6 className="text-lg fw-semibold mb-0">Total Subscription Amount</h6>
                    </div>
                    <div className="card-body p-24">
                        { subscriptionData ?

                    <ReactApexChart
                                id="subscriptionChart"
                                options={subscriptionChart.options}
                                series={subscriptionData}
                                type="bar"
                                height={264}
                            /> : <></>
                        }
                    </div>
                </div>
            </div>
           
            <div className="col-md-6">
                <div className="card h-100 p-0">
                    <div className="card-header border-bottom bg-base py-16 px-24">
                        <h6 className="text-lg fw-semibold mb-0">Total Devices</h6>
                    </div>
                    <div className="card-body p-24">
                        { metersdata ? 
                    <ReactApexChart id="columnGroupBarChart" options={deviceChart.options} series={metersdata} type="bar" height={264} />:
                            <>  </>
                        }
                    </div>
                </div>
            </div>
            </section>
        </>


    )
}

export default SuperAdminDashCharts