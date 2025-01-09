import React, { useEffect, useState } from "react";
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { apiGet, apiPost } from "../services/client";
import { useSearchParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import useReactApexChart from '../hook/useReactApexChart'

const MeterDataDetails = () => {

    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [ReadingData, setReadingsData] = useState([]);
    const [tableHeaders, setTableHeaders] = useState([]);
    const [logsdata, setLogsData] = useState(null);
    const [dailychart, setDailyChartData] = useState(null);
    const [monthlychart,  setMonthlyChartData] = useState(null);


    const defaultLineChartOptions = {
        chart: {
          type: "area",
          toolbar: {
            show: true,
          },
        },
        xaxis: {
          categories: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ], 
        },
        yaxis: {
          labels: {
            formatter: (value) => `${value.toFixed(2)}`,
            style: {
              fontSize: "12px", 
              colors: "#000", 
            },
          },
          tickAmount: 6, 
        },
        grid: {
          padding: {
            left: 10, 
            right: 10,
          },
        },
        tooltip: {
          y: {
            formatter: (value) => `${value.toFixed(2)}`, 
          },
        },
        stroke: {
          curve: "smooth",
        },
        fill: {
          opacity: 0.4,
        },
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                height: 300,
              },
              yaxis: {
                labels: {
                  style: {
                    fontSize: "10px",
                  },
                },
              },
            },
          },
        ],
      };

      
    const defaultLineChartOptions1 = {
        chart: {
          type: "area",
          toolbar: {
            show: true,
          },
        },
        xaxis: {
          categories: [
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
            "24:00",
          ], 
        },
        yaxis: {
          labels: {
            formatter: (value) => `${value.toFixed(2)}`,
            style: {
              fontSize: "12px", 
              colors: "#000", 
            },
          },
          tickAmount: 6, 
        },
        grid: {
          padding: {
            left: 10, 
            right: 10,
          },
        },
        tooltip: {
          y: {
            formatter: (value) => `${value.toFixed(2)}`, 
          },
        },
        stroke: {
          curve: "smooth",
        },
        fill: {
          opacity: 0.4,
        },
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                height: 300,
              },
              yaxis: {
                labels: {
                  style: {
                    fontSize: "10px",
                  },
                },
              },
            },
          },
        ],
      };
    
      

    const MeterConsumptionLogs = async () => {
        const data = { id }
        console.log(data);
        try {
            const res = await apiPost("admin/meter-consumption-logs", data);
            if (res?.data?.status == true) {
                console.log('meter logs data',res.data);   
                setLogsData(res.data.data);

                if (data.length > 0) {
                    setTableHeaders(Object.keys(data[0])); 
                }
                if ($.fn.DataTable.isDataTable("#dataTable")) {
                    $("#dataTable").DataTable().destroy();
                }
                setTimeout(() => {
                    $("#dataTable").DataTable({
                        pageLength: 10,
                    });
                }, 0);
            } else {
                console.log(res);
            }
        } catch (e) {
            console.log(e);
        }
    }

    
    const MeterChartDaily = async () => {
        const data = { id }
        try {
            const res = await apiPost("admin/meter-chart-daily", data);
            if (res?.data?.status == true) {
                console.log('Daily Chart Data',res?.data?.data);   
                setDailyChartData(res?.data?.data);
            } else {
                console.log(res);
            }
        } catch (e) {
            console.log(e);
        }
    }



    const MeterChart = async () => {
        const data = { id }
        console.log(data);
        try {
            const res = await apiPost("admin/meter-chart", data);
            if (res?.data?.status == true) {
                console.log('Monthly Chart Data',res.data);   
                setMonthlyChartData(res?.data?.data);
            } else {
                console.log(res);
            }
        } catch (e) {
            console.log(e);
        }
    }

    
    useEffect(() => {       
        MeterChartDaily();
        MeterChart();
        MeterConsumptionLogs();
        return () => {
            if ($.fn.DataTable.isDataTable("#dataTable")) {
                $("#dataTable").DataTable().destroy(true);
            }
        };
    }, []);

 
    return (
        <div className="col-lg-12">
            <div className=" d-flex ">
                <div  className=" m-1 h-100 p-0 col-lg-6">
                   <div className="card">
                   <div className="card-header border-bottom bg-base py-16 px-24">
                        <h6 className="text-lg fw-semibold mb-0">Monthly Consumption</h6>
                    </div>
                    <div className="card-body p-24">
                        { monthlychart ?
                            <ReactApexChart id="defaultLineChart" className="apexcharts-tooltip-style-1" options={defaultLineChartOptions} series={monthlychart} type="area"
                            height={264} /> :<></>
                        }
                    </div>
                   </div>
                </div>
                <div className="m-1 h-100 p-0 col-lg-6">
                   <div className="card">
                   <div className="card-header border-bottom bg-base py-16 px-24">
                        <h6 className="text-lg fw-semibold mb-0">Today's Consumption</h6>
                    </div>
                    <div className="card-body p-24">
                        { dailychart ?
                        <ReactApexChart id="defaultLineChart" className="apexcharts-tooltip-style-1" options={defaultLineChartOptions1} series={dailychart} type="area"
                        height={264} /> :<></>
                        }
                    </div>
                   </div>
                </div>
            </div>
           <div className="card mt-4 col-lg-12">
           <div className="card-body">
           {logsdata ?
                <table
                    className="table bordered-table mb-0"
                    id="dataTable"
                    data-page-length={10}
                >
                    <thead>
                    
                        <tr>
                            <th scope="col">Member ID</th>
                            <th scope="col">Power</th>
                            <th scope="col">Volts</th>
                            <th scope="col">Amphare</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>

                    {logsdata?.map((item, index) => ( 
                        <tr  key={index}>
                        <td>
                            {item?.meter_id}
                        </td>
                        <td>
                        {item?.power}
                        </td>
                        <td>
                        {item?.data?.volts}
                        </td>
                        <td>
                        {item?.data?.amphere}
                        </td>
                        <td>
                        {item?.status === "1" ? (
                                            <span
                                                
                                                className="badge text-sm fw-semibold text-success-600 bg-success-100 px-20 py-9 radius-4 text-white   ">Active</span>
                                        ) : (
                                            <span
                                                
                                                className="badge text-sm fw-semibold text-danger-600 bg-danger-100 px-20 py-9 radius-4 text-white ">Inactive</span>
                                        )}
                        </td>
                    </tr>
                    ))}
                        
                    </tbody>

                </table>  : <></>
            }
            </div>
           </div>
        </div>

    )
}

export default MeterDataDetails