import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { Link } from 'react-router-dom'
import { apiGet, apiPost } from "../../services/client";
import { useState, useEffect } from "react";

const LatestRegisteredOne = () => {
    const [data,setData] = useState([]);
    const getData = async () =>{
        try{
            const res = await apiGet('userapp/kwh-data');
            if (res?.data?.status == true){
                console.log(res);
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
        <div className="col-xxl-9 col-xl-12">
            <div className="card h-100">
                <div className="card-body p-24">
                    <div className="d-flex flex-wrap align-items-center gap-1 justify-content-between mb-16">
                        <ul
                            className="nav border-gradient-tab nav-pills mb-0"
                            id="pills-tab"
                            role="tablist"
                        >
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center active"
                                    id="pills-to-do-list-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-to-do-list"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-to-do-list"
                                    aria-selected="true"
                                >
                                    KWH Data 
                                </button>
                            </li>
                        </ul>
                        <Link
                            to="/volt-readings"
                            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
                        >
                            View All
                            <Icon
                                icon="solar:alt-arrow-right-linear"
                                className="icon"
                            />
                        </Link>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="pills-to-do-list"
                            role="tabpanel"
                            aria-labelledby="pills-to-do-list-tab"
                            tabIndex={0}
                        >
                            <div className="table-responsive scroll-sm">
                                <table className="table bordered-table sm-table mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">Device Name</th>
                                            <th scope="col">Today</th>
                                            <th scope="col">This Month</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>


                                        { data?.map((item,index)=>{
                                            return(

                                                  <tr>
                                            <td>Meter {item?.meter_id}</td>
                                            <td>{item?.total_power_today}</td>
                                            <td>{item?.total_power_month}</td>
                                        
                                        </tr>
                                            );
                                        })
                                    }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LatestRegisteredOne