import React from 'react'
import { Icon } from '@iconify/react';
import { apiGet, apiPost } from "../../services/client";
import { useState, useEffect,useRef } from "react";
import Loading from '../Loading';
import useReactApexChart from '../../hook/useReactApexChart';
import ReactApexChart from 'react-apexcharts';
import { useSearchParams } from 'react-router-dom';
import { WS_URL } from '../../config';


const MeterLayerCards = () => {

    
    const [loading, setLoading] = useState(false);
    const [kwh,setKwh] = useState(null);
    const  [kvah,setKvah] = useState(null);
    const [kvarh,setKvarh] = useState(null);
    const [chartData,setChartData] = useState(null);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const socketRef = useRef(null);

    const getMeterData = async () =>{
        setLoading(true);
        const data = {id}

        try{

            const res = await apiPost('userapp/overall-power',data);
           
            if (res?.data?.status == true){
                setKwh(res?.data?.kwh)
                setKvah(res?.data?.kvah)
                setKvarh(res?.data?.kvarh)
                setChartData(res?.data?.chart_data)
    
                
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
        getMeterData();
            const wsUrl = WS_URL+`card-data/${id}/`;
                socketRef.current = new WebSocket(wsUrl);
                socketRef.current.onopen = () => {
                  console.log("WebSocket connection established");
                }; 
                socketRef.current.onmessage = (event) => {
                  const data = JSON.parse(event?.data);
                //   setCardsData(data);
                console.log("cards data-------",data);
                setKwh(data?.kwh)
                setKvah(data?.kvah)
                setKvarh(data?.kvarh)
                setChartData(data?.chart_data)

                
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
       let createChartSix = (color1, color2) => {
      
              let series = [{
                  name: 'series1',
                  data: chartData ? chartData : [0,0,0,0,0,0,0,0,0,0,0,0]
              }]
              let options = {
      
                  legend: {
                      show: false
                  },
                  chart: {
                      type: 'area',
                      width: '100%',
                      height: 270,
                      toolbar: {
                          show: false
                      },
                      padding: {
                          left: 0,
                          right: 0,
                          top: 0,
                          bottom: 0
                      }
                  },
                  dataLabels: {
                      enabled: false
                  },
                  stroke: {
                      curve: 'smooth',
                      width: 3,
                      colors: [color1, color2], 
                      lineCap: 'round'
                  },
                  grid: {
                      show: true,
                      borderColor: '#D1D5DB',
                      strokeDashArray: 1,
                      position: 'back',
                      xaxis: {
                          lines: {
                              show: false
                          }
                      },
                      yaxis: {
                          lines: {
                              show: true
                          }
                      },
                      row: {
                          colors: undefined,
                          opacity: 0.5
                      },
                      column: {
                          colors: undefined,
                          opacity: 0.5
                      },
                      padding: {
                          top: -20,
                          right: 0,
                          bottom: -10,
                          left: 0
                      },
                  },
                  fill: {
                      type: 'gradient',
                      colors: [color1, color2],
                      gradient: {
                          shade: 'light',
                          type: 'vertical',
                          shadeIntensity: 0.5,
                          gradientToColors: [undefined, `${color2}00`], // Apply transparency to both colors
                          inverseColors: false,
                          opacityFrom: [0.4, 0.4], // Starting opacity for both colors
                          opacityTo: [0.3, 0.3], // Ending opacity for both colors
                          stops: [0, 100],
                      },
                  },
                  markers: {
                      colors: [color1, color2], // Use two colors for the markers
                      strokeWidth: 3,
                      size: 0,
                      hover: {
                          size: 10
                      }
                  },
                  xaxis: {
      
                      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                      tooltip: {
                          enabled: false
                      },
                      labels: {
                          formatter: function (value) {
                              return value;
                          },
                          style: {
                              fontSize: "14px"
                          }
                      }
                  },
                  yaxis: {
                      labels: {
                          formatter: function (value) {
                              return   value ;
                          },
                          style: {
                              fontSize: "14px"
                          }
                      },
                  },
                  tooltip: {
                      x: {
                          format: 'dd/MM/yy HH:mm'
                      }
                  }
              };
              return <ReactApexChart options={options} series={series} type="area"
                  height={270} />
          }
      return (
          <div className="col-xxl-8">
              <div className="card radius-8 border-0 p-20 card-design">
                  <div className="row gy-4">
                      <div className="col-xxl-4">
                          <div className="card p-3 radius-8 shadow-none bg-gradient-dark-start-1 mb-12 card-1">
                              <div className="card-body p-0">
                                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-0">
                                      <div className="d-flex align-items-center gap-2 mb-12">
                                          <span className="mb-0 w-48-px h-48-px bg-base text-pink text-2xl flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                                              <i className="ri-group-fill" />
                                          </span>
                                          <div>
                                              <span className="mb-0 fw-medium text-secondary-light text-lg">
                                                  KVAH
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-8">
                                      <h5 className="fw-semibold mb-0">{kvah?.toFixed(2)}</h5>
                                  </div>
                              </div>
                          </div>
                          <div className="card p-3 radius-8 shadow-none bg-gradient-dark-start-2 card-2 mb-12">
                              <div className="card-body p-0">
                                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-0">
                                      <div className="d-flex align-items-center gap-2 mb-12">
                                          <span className="mb-0 w-48-px h-48-px bg-base text-purple text-2xl flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                                              <i className="ri-youtube-fill" />
                                          </span>
                                          <div>
                                              <span className="mb-0 fw-medium text-secondary-light text-lg">
                                                  KWH
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-8">
                                      <h5 className="fw-semibold mb-0">{kwh?.toFixed(2)}</h5>
                                 
                                  </div>
                              </div>
                          </div>
                          <div className="card p-3 radius-8 shadow-none bg-gradient-dark-start-3 card-7 mb-0">
                              <div className="card-body p-0">
                                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-0">
                                      <div className="d-flex align-items-center gap-2 mb-12">
                                          <span className="mb-0 w-48-px h-48-px bg-base text-info text-2xl flex-shrink-0 d-flex justify-content-center align-items-center rounded-circle h6">
                                              <i className="ri-money-dollar-circle-fill" />
                                          </span>
                                          <div>
                                              <span className="mb-0 fw-medium text-secondary-light text-lg">
                                                  KVARh
                                              </span>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-8">
                                      <h5 className="fw-semibold mb-0">{kvarh?.toFixed(2)}</h5>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-xxl-8">
                          <div className="card-body p-0">
                              <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                                  <h6 className="mb-2 fw-bold text-lg">Active Power</h6>
                                  {/* <div className="">
                                      <select className="form-select form-select-sm w-auto bg-base border text-secondary-light" defaultValue="Yearly">
                                          <option value="Yearly">Yearly</option>
                                          <option value="Monthly">Monthly</option>
                                          <option value="Weekly">Weekly</option>
                                          <option value="Today">Today</option>
                                      </select>
                                  </div> */}
                              </div>
                              <ul className="d-flex flex-wrap align-items-center justify-content-center mt-3 gap-3">
                                  <li className="d-flex align-items-center gap-2">
                                      <span className="w-12-px h-12-px rounded-circle bg-primary-600" />
                                      <span className="text-secondary-light text-sm fw-semibold">
                                          Total Active Power:
                                          <span className="text-primary-light fw-bold">{kwh}</span>
                                      </span>
                                  </li>
                                  {/* <li className="d-flex align-items-center gap-2">
                                      <span className="w-12-px h-12-px rounded-circle bg-success-main" />
                                      <span className="text-secondary-light text-sm fw-semibold">
                                          Free Course:
                                          <span className="text-primary-light fw-bold">70</span>
                                      </span>
                                  </li> */}
                              </ul>
                              <div className="mt-40">
                                  <div
                                      id="enrollmentChart"
                                      className="apexcharts-tooltip-style-1"
                                  >
                                      {/* Pass the color value */}
                                      {createChartSix('#45B369', '#487fff')}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
}

export default MeterLayerCards