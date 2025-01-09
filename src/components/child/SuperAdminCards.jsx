import React, {useEffect, useState  } from 'react'
import { Icon } from '@iconify/react';
import { apiGet, apiPost } from "../../services/client";


const SuperAdminCards = () => {
    const [data, setData] = useState([]);
 
    const fetchData = async () => {
      try {
        const res = await apiGet("superadmin/dash-cards");
        if (res?.data?.status === true) {
          console.log(res?.data?.data);
          setData(res?.data?.data);      
        } else {
          console.log(res?.data?.message);
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
  
    return (
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-1 ">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Total Users</p>
                                <h6 className="mb-0">{data?.total_users}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="gridicons:multiple-users"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
         
                    </div>
                </div>
                {/* card end */}
            </div>

            <div className="col">
                <div className="card shadow-none border bg-gradient-start-3 ">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Active Users
                                </p>
                                <h6 className="mb-0">{data?.active_user}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fluent:people-20-filled"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                       
                    </div>
                </div>
                {/* card end */}
            </div>


            
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-4 ">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Inactive Users</p>
                                <h6 className="mb-0">{data?.inactive_users}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="solar:wallet-bold"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/* card end */}
            </div>


            <div className="col">
                <div className="card shadow-none border bg-gradient-start-3 ">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Total Admin's
                                </p>
                                <h6 className="mb-0">{data?.total_admin}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fluent:people-20-filled"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                       
                    </div>
                </div>
                {/* card end */}
            </div>


            <div className="col">
                <div className="card shadow-none border bg-gradient-start-3 ">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Active Admin's
                                </p>
                                <h6 className="mb-0">{data?.active_admin}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fluent:people-20-filled"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                       
                    </div>
                </div>
                {/* card end */}
            </div>


            <div className="col">
                <div className="card shadow-none border bg-gradient-start-3 ">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Inactive admin's
                                </p>
                                <h6 className="mb-0">{data?.inactive_admin}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fluent:people-20-filled"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                       
                    </div>
                </div>
                
            </div>


            <div className="col">
                <div className="card shadow-none border bg-gradient-start-2 ">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Total Subscribers
                                </p>
                                <h6 className="mb-0">{data?.total_subs}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fa-solid:award"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/* card end */}
            </div>

            <div className="col">
                <div className="card shadow-none border bg-gradient-start-2 ">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Subscription Amount
                                </p>
                                <h6 className="mb-0">{data?.subs_amount}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                
                            <Icon icon="proicons:dollar-circle"  className="text-white text-2xl mb-0" />
                            </div>
                        </div>  
                    </div>
                </div>
            </div>

            <div className="col">
                <div className="card shadow-none border bg-gradient-start-5 ">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Total Devices</p>
                                <h6 className="mb-0">{data?.total_devices}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="fa6-solid:tablet"
                                    className="text-white text-2xl mb-0"
                                />  

                            </div>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SuperAdminCards