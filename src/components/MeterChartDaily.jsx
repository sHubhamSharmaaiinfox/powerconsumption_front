import React from 'react'
import useReactApexChart from '../hook/useReactApexChart'
import ReactApexChart from 'react-apexcharts'
import { useSearchParams } from "react-router-dom";
import { apiGet, apiPost } from "../services/client";
import { useState, useEffect } from "react";
import Loading from './Loading';



const MeterChartDaily = () => {
    const [loading, setLoading] = useState(false);
    const defaultLineChartOptions = {
        chart: {
          type: "area",
          toolbar: {
            show: true,
          },
        },
        xaxis: {
          categories: [
            "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
            "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
            "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
          ], // Hour-wise categories
          labels: {
            style: {
              fontSize: "12px",
              colors: "#000",
            },
          },
        },
        yaxis: {
          labels: {
            formatter: (value) => `${value.toFixed(2)}`, // Format with two decimal points
            style: {
              fontSize: "12px",
              colors: "#000",
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
        setLoading(true);
        try{
            const data = {id}
            const res = await apiPost('userapp/meter-chart-daily',data);
            if (res?.data?.status == true){
                setData(res?.data?.data);
            }
            else{
                console.log(res?.data?.message)
            }
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
      }, []);

 
 
    return (
        <div className="col-md-6">
            {loading && <Loading />}
            <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">Meter Chart (Today's)</h6>
                </div>
                <div className="card-body p-24">
                    <ReactApexChart id="defaultLineChart" className="apexcharts-tooltip-style-1" options={defaultLineChartOptions} series={data} type="area"
                        height={264} />
                </div>
            </div>
        </div>
    )
}

export default MeterChartDaily