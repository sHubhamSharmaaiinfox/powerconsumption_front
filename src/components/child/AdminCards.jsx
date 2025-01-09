import React, {useEffect, useState  } from 'react'
import { Icon } from '@iconify/react';
import { apiGet, apiPost } from "../../services/client";
import Loading from '../Loading';
const AdminCards = () => {
    // States for dynamic data
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [inactiveUsers, setInactiveUsers] = useState(0);
    const [cardLoading, setCardLoading] = useState(false);
    // Fetch user data
    const fetchUserData = async () => {
        setCardLoading(true);
      try {
        const res = await apiGet("admin/get-usercount");
        if (res?.data?.status === true) {
          console.log(res?.data?.data);
          setUsers(res?.data?.data);
  
          
        } else {
          console.log(res?.data?.message);
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
      }finally{
        setCardLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUserData();
    }, []);
  
    return (
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
            {cardLoading? <Loading/>: null}
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-1 ">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Total Users</p>
                                <h6 className="mb-0">{users?.total_users}</h6>
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
                                <h6 className="mb-0">{users?.active_users}</h6>
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
                                <h6 className="mb-0">{users?.inactive_users}</h6>
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
                <div className="card shadow-none border bg-gradient-start-2 ">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Total Subscription
                                </p>
                                <h6 className="mb-0">{users?.total_subscriptions}</h6>
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
                                <h6 className="mb-0">{users?.total_amount}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                
                            <Icon icon="proicons:dollar-circle"  className="text-white text-2xl mb-0" />
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
                                   Monthly Amount
                                </p>
                                <h6 className="mb-0">{users?.total_subscriptions}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                            
                                 <Icon icon="proicons:dollar-circle"  className="text-white text-2xl mb-0" />
                            </div>
                        </div>
                        
                    </div>
                </div>
                {/* card end */}
            </div>
        </div>

    )
}

export default AdminCards