import React from 'react'
import useReactApexChart from '../hook/useReactApexChart'
import ReactApexChart from 'react-apexcharts'
import { useSearchParams } from "react-router-dom";
import { apiGet, apiPost } from "../services/client";
import { useState, useEffect,useRef } from "react";
import { WS_URL } from '../config';
import Loading from './Loading';



const MeterChart = () => {
      const [searchParams] = useSearchParams();
      const id = searchParams.get("id");
     const [loading,setLoading] = useState(false);      
     const [data,setData] = useState(null);
      let userOverviewDonutChartSeries = data ? data : [0,0,0]
      const socketRef = useRef(null);
      let userOverviewDonutChartOptions = {
          colors: ['#FF9F29', '#487FFF', '#16A34A'],
          labels: ['R', 'Y', 'B'],
          legend: {
              show: false
          },
          chart: {
              type: 'donut',
              height: 270,
              sparkline: {
                  enabled: true // Remove whitespace
              },
              margin: {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
              },
              padding: {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
              },animations: {
                enabled: false // Disable animations
            }
          },
          stroke: {
              width: 0,
          },
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
                      position: 'bottom'
                  }
              }
          }],
      };




   

    const getData = async () =>{
        setLoading(true);
        try{
            const data = {id}
            const res = await apiPost('userapp/kw-chart',data);
            if (res?.data?.status == true){
           
                setData(res?.data?.data);
                
            }
            else{
                console.log(res?.data?.message)
            }
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        getData();
        const wsUrl = WS_URL+`kw-data/${id}/`;
                socketRef.current = new WebSocket(wsUrl);
                socketRef.current.onopen = () => {
                  console.log("WebSocket connection established");
                }; 
                socketRef.current.onmessage = (event) => {
                    const parsedData = JSON.parse(event?.data);
                    console.log("Received WebSocket data:", parsedData);
            
                    // Extract and transform data for the chart
                    
                    const chartData = Array.isArray(parsedData) && parsedData.length === 3 ? parsedData : [0,0,0];
            
                    setData(chartData);
                
                };
                socketRef.current.onerror = (error) => {
                  console.error("WebSocket error:", error);
                };
                socketRef.current.onclose = (event) => {
                  console.log("WebSocket connection closed:", event.code, event.reason);
                };
            
                
                return () => {
                  if (socketRef.current) {
                    socketRef.current.close();
                    console.log("WebSocket connection disconnected");
                  }
                };



      }, []);

 
      return (
          <div className="col-xxl-4 col-md-6">
            {loading?<Loading/>:<></>}
              <div className="card h-100 radius-8 border-0">
                  <div className="card-body p-24 d-flex flex-column justify-content-between gap-8">
                      <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20">
                          <h6 className="mb-2 fw-bold text-lg mb-0">KW</h6>
                          {/* <select className="form-select form-select-sm w-auto bg-base border text-secondary-light" defaultValue="Yearly">
                              <option value="Yearly">Yearly</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Weekly">Weekly</option>
                              <option value="Today">Today</option>
                          </select> */}
                      </div>
                      <div
                          id="userOverviewDonutChart"
                          className="margin-16-minus y-value-left"
                      />
                      <ReactApexChart options={userOverviewDonutChartOptions} series={userOverviewDonutChartSeries} type="donut"
                          height={270} />
                      <ul className="d-flex flex-wrap align-items-center justify-content-between mt-3 gap-3">
                          <li className="d-flex flex-column gap-8">
                              <div className="d-flex align-items-center gap-2">
                                  <span className="w-12-px h-12-px rounded-circle bg-warning-600" />
                                  <span className="text-secondary-light text-sm fw-semibold">
                                      R
                                  </span>
                              </div>
                              <span className="text-primary-light fw-bold">{data ? data[0] : 0}</span>
                          </li>
                          <li className="d-flex flex-column gap-8">
                              <div className="d-flex align-items-center gap-2">
                                  <span className="w-12-px h-12-px rounded-circle bg-primary-600" />
                                  <span className="text-secondary-light text-sm fw-semibold">
                                      Y
                                  </span>
                              </div>
                              <span className="text-primary-light fw-bold">{data ? data[1] : 0}</span>
                          </li>
                          <li className="d-flex flex-column gap-8">
                              <div className="d-flex align-items-center gap-2">
                                  <span className="w-12-px h-12-px rounded-circle bg-success-600" />
                                  <span className="text-secondary-light text-sm fw-semibold">
                                      B
                                  </span>
                              </div>
                              <span className="text-primary-light fw-bold">{data ? data[2] : 0}</span>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
      );
}

export default MeterChart