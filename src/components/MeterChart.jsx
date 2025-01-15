import React from 'react'
import useReactApexChart from '../hook/useReactApexChart'
import ReactApexChart from 'react-apexcharts'
import { useSearchParams } from "react-router-dom";
import { apiGet, apiPost } from "../services/client";
import { useState, useEffect } from "react";




const MeterChart = () => {



      const [searchParams] = useSearchParams();
      const id = searchParams.get("id");

  
      const [data,setData] = useState([]);


      let userOverviewDonutChartSeries = data ? data : [0,0,0]
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
        }
    }
    useEffect(() => {
        getData();
      }, []);

 
      return (
          <div className="col-xxl-4 col-md-6">
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