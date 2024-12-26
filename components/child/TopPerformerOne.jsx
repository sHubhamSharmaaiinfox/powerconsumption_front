import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { Link } from 'react-router-dom'
import { apiGet, apiPost } from "../../services/client";
import { useState, useEffect } from "react";

const TopPerformerOne = () => {

    const [data,setData] = useState([]);
    const getData = async () =>{
        try{
            const res = await apiGet('userapp/alerts');
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
        <div className="col-xxl-3 col-xl-12">
            <div className="card h-100">
                <div className="card-body">
                    <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                        <h6 className="mb-2 fw-bold text-lg mb-0">Alerts</h6>
                        <Link
                            to="/anomalies"
                            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
                        >
                            View All
                            <Icon
                                icon="solar:alt-arrow-right-linear"
                                className="icon"
                            />
                        </Link>
                    </div>


                    { data?.map((item,index)=>{
                        return(

                            <div className="mt-32">
                        <div className="d-flex align-items-center justify-content-between gap-3 mb-24">
                            <div className="d-flex align-items-center">
                               
                                <div className="flex-grow-1">
                                    <h6 className="text-md mb-0 fw-medium">Meter {item?.meter_id}</h6>
                                    <span className="text-sm text-secondary-light fw-medium">
                                        {item?.alert_name}
                                    </span>
                                </div>
                            </div>
                            <span className="text-primary-light text-md fw-medium">{item?.level}</span>
                        </div>
                    
                    
                    </div>
                        );
                    })
                    }

                </div>
            </div>
        </div>
    )
}

export default TopPerformerOne