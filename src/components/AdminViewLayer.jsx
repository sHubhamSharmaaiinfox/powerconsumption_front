import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiGet, apiPost } from "../services/client";
import $ from 'jquery';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSearchParams } from 'react-router-dom';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import Avatar from 'react-avatar';
import moment from 'moment';
import Loading from './Loading';
const AdminViewLayer = () => {
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState(null); // to store fetched user data
    const [imagePreview, setImagePreview] = useState('assets/images/user-grid/user-grid-img13.png');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [meterData, setMetersData] = useState([]);
    const [tableHeaders, setTableHeaders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');


     
     const getUserDetails = async () => {
        setLoading(true);
        try {
            const data = { id }; 

            setLoading(true);
            const res = await apiPost("superadmin/admindetail", data); // API call to fetch user details
            console.log("userdata",res);

            if (res?.data?.status === true) {
                setUserData(res?.data?.data);   
            } else {
                console.log(res?.data?.message); 
            }
        } catch (e) {
            console.log(e); 
        } finally {
            setLoading(false); 
        }
    };


    const getData = async () => {
        try {
            const data = { id }

            setLoading(true);
            const res = await apiPost("superadmin/get-users-data", data); 
            console.log("meter data",res);
            if (res?.data?.status === true) {
                console.log(res?.data?.data)
                const data = res?.data?.data;
                setMetersData(data);
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
                console.log(res?.data?.message);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

     const EnableDisablemeter = async (id) => {
            const data = { id }
            console.log(data);
            try {
                const res = await apiPost("admin/meter-status", data);
                if (res?.data?.status == true) {
                    getData();
                } else {
                    console.log(res);
                }
            } catch (e) {
                console.log(e);
            }
        }  
    useEffect(() => {
        getData();
        getUserDetails(); 
    }, []);

    return (
        <div className="row gy-4">
            {loading ? <Loading /> : null}
            <div className="col-lg-3">
                <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base">
                   
                    <div className="pb-24 ms-16 mb-24 me-16 mt-3">
                        <div className="text-center border border-top-0 border-start-0 border-end-0">
                        <Avatar name={`${userData?.userdata?.first_name || ""} ${userData?.userdata?.last_name || ""}`} />
                            <h6 className="mb-0 mt-16">{userData?.userdata?.username}</h6>
                            <span className="text-secondary-light mb-16">{userData?.userdata?.email}</span>
                        </div>
                        <div className="mt-24">
                            <h6 className="text-xl mb-16">Personal Info</h6>
                            <ul>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-50 text-md fw-semibold text-primary-light">
                                        Full Name
                                    </span>
                                    <span className="w-50 text-secondary-light fw-medium">
                                        {userData?.userdata?.first_name} {userData?.userdata?.last_name}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-50 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Email
                                    </span>
                                    <span className="w-50 text-secondary-light fw-medium">
                                       {userData?.userdata?.email}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-50 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Username
                                    </span>
                                    <span className="w-50 text-secondary-light fw-medium">
                                      {userData?.userdata?.username}
                                    </span>
                                </li>
                           
                                {/* <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-50 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Membership Plan
                                    </span>
                                    <span className="w-50 text-secondary-light fw-medium">
                                       {userData?.plan_name}
                                    </span>
                                </li> */}
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-50 text-md fw-semibold text-primary-light">
                                        {" "}
                                       Total Users
                                    </span>
                                    <span className="w-50 text-secondary-light fw-medium">
                                       {userData?.user_count}
                                    </span>
                                </li>
                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-9">
                <div className="card">
                    <div className="card-body p-24 my-card-r">
                        <h6>User's Created</h6>
                        {data ?
                            <table
                                className="table bordered-table mb-0"
                                id="dataTable"
                                data-page-length={10}
                            >
                                <thead>
                                    <tr>    
                                        <th scope="col">Username</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Status</th>
                                        {/* <th scope="col">Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {meterData?.map((item, index) => (
                                        <tr key={index}>
                                            
                                            <td>{item?.username}</td>
                                            <td>{item?.email}</td>
                                            <td>{item?.first_name} {item?.last_name}</td>
                                            <td>{moment(item?.meter_data?.created_at).format("MMMM Do YYYY, h:mm:ss A")}</td>
                                           
                                            
                                            <td>
                                                {item?.status === "1" ? (
                                                    <span className="badge text-sm fw-semibold text-success-600 bg-success-100 px-20 py-9 radius-4 text-white"
                                                    // onClick={() => EnableDisablemeter(item?.meter_data?.id)}
                                                    >
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="badge text-sm fw-semibold text-danger-600 bg-danger-100 px-20 py-9 radius-4 text-white"
                                                    // onClick={() => EnableDisablemeter(item?.meter_data?.id)}
                                                    >
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                            
                                            {/* <td className='d-flex justify-content-center'>
                                                 <Link
                                                    to={`/user-meter-details?id=${item?.meter_data?.id}`}
                                                    className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                                >
                                                    <Icon icon="mdi:eye" />
                                                </Link>

                                            </td> */}
                                           
                                        </tr>
                                    ))}
                                </tbody>

                            </table> : <></>
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AdminViewLayer;