import React from 'react'
import useReactApexChart from '../hook/useReactApexChart'
import ReactApexChart from 'react-apexcharts'
import { useSearchParams } from "react-router-dom";
import { apiGet, apiPost } from "../services/client";
import { useState, useEffect } from "react";




const MeterChart = () => {


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
          ], // Ensure these match your months
        },
        yaxis: {
          labels: {
            formatter: (value) => `${value.toFixed(2)}`, // Format with two decimal points
            style: {
              fontSize: "12px", // Adjust font size for better readability
              colors: "#000", // Ensure the label is visible
            },
          },
          tickAmount: 6, // Controls the number of ticks on the Y-axis
        },
        grid: {
          padding: {
            left: 10, // Adjust padding to prevent cutoff
            right: 10,
          },
        },
        tooltip: {
          y: {
            formatter: (value) => `${value.toFixed(2)}`, // Format values in the tooltip as well
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
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    
    const [data,setData] = useState([]);

    const getData = async () =>{

        try{
            const data = {id}
            const res = await apiPost('userapp/meter-chart',data);
            if (res?.data?.status == true){
           
                setData(res?.data?.data);
                
            }
            else{
                console.log(res?.data?.message)
            }
        }catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        getData();
      }, []);

 
 
    return (
        <div className="col-md-6">
            <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">Meter Chart (Monthly)</h6>
                </div>
                <div className="card-body p-24">
                    <ReactApexChart id="defaultLineChart" className="apexcharts-tooltip-style-1" options={defaultLineChartOptions} series={data} type="area"
                        height={264} />
                </div>
            </div>
        </div>
    )
}

export default MeterChart