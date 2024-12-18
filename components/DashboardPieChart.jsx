    import React, {useState,useEffect} from 'react'
    import useReactApexChart from '../hook/useReactApexChart'
    import ReactApexChart from 'react-apexcharts'
    import { apiGet, apiPost } from "../services/client";
    const DashboardPieChart = () => {

        // States for dynamic data
            const [users, setUsers] = useState([]);
            const [totalUsers, setTotalUsers] = useState(0);
            const [activeUsers, setActiveUsers] = useState(0);
            const [inactiveUsers, setInactiveUsers] = useState(0);
            const [chartSeries,setChartSeries] = useState([]);
        
            // Fetch user data
            const fetchUserData = async () => {
            try {
                const res = await apiGet("admin/get-usercount");
                if (res?.data?.status === true) {
                console.log(res?.data?.data);
                setUsers(res?.data?.data);
                setChartSeries([res?.data?.data?.active_users,res?.data?.data?.inactive_users])
        
                
                } else {
                console.log(res?.data?.message);
                }
            } catch (e) {
                console.error("Error fetching user data:", e);
            }
            };
        
            useEffect(() => {
            fetchUserData();
            }, []);


            let basicDonutChartOptions = {

                chart: {
                    height: 264,
                    type: 'donut',
                },
                colors: ['#16a34a', '#DC2626'],
                dataLabels: {
                    enabled: false
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            show: false
                        }
                    }
                }],
                legend: {
                    position: 'right',
                    offsetY: 0,
                    height: 230,
                    show: false
                }
            };
        
        return (
            <div className="col-md-12">
                <div className="card h-100 p-0">
                    <div className="card-header border-bottom bg-base py-16 px-24">
                        <h6 className="text-lg fw-semibold mb-0">Active & inactive Users</h6>
                    </div>
                    <div className="card-body p-24 text-center d-flex flex-wrap align-items-start gap-5 justify-content-center">
                        <div className="position-relative">
                            { chartSeries ?
                            <ReactApexChart id="basicDonutChart" className="w-auto d-inline-block" options={basicDonutChartOptions} series={chartSeries} type="donut"
                                height={264} /> : <></>
                            }
                            <div className="position-absolute start-50 top-50 translate-middle">
                                <span className="text-lg text-secondary-light fw-medium">
                                    Total Users
                                </span>
                                <h4 className="mb-0">{users?.total_users}</h4>
                            </div>
                        </div>
                        <div className="max-w-290-px w-100">
                            <div className="d-flex align-items-center justify-content-between gap-12 border pb-12 mb-12 border-end-0 border-top-0 border-start-0">
                                <span className="text-primary-light fw-medium text-sm">Label</span>
                                <span className="text-primary-light fw-medium text-sm">Value</span>
                                
                            </div>
                            <div className="d-flex align-items-center justify-content-between gap-12 mb-12">
                                <span className="text-primary-light fw-medium text-sm d-flex align-items-center gap-12">
                                    <span className="w-12-px h-12-px bg-success-600 rounded-circle" />{" "}
                                Active Users
                                </span>
                                <span className="text-primary-light fw-medium text-sm">{users?.active_users}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between gap-12 mb-12">
                                <span className="text-primary-light fw-medium text-sm d-flex align-items-center gap-12">
                                    <span className="w-12-px h-12-px bg-danger-600 rounded-circle" />{" "}
                                    Inactive users
                                </span>
                                <span className="text-primary-light fw-medium text-sm">{users?.inactive_users}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    export default DashboardPieChart