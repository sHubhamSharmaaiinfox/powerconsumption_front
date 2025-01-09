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
import { ToastContainer, toast } from 'react-toastify';



const UserProfile = () => {
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
    const [isCopied, setIsCopied] = useState(false);
    const [name,setName] = useState(null);
    const [location,setLocation]  = useState(null);  



        const handleCopy = (token) => {
            navigator.clipboard.writeText(token);
            setIsCopied(true);
            toast.success("copied");
            setTimeout(() => setIsCopied(false), 2000);
        };

const getUserDetails = async () => {
        setLoading(true);
        try {
            const data = { id }; 
            setLoading(true);
            const res = await apiPost("admin/userdetail", data); // API call to fetch user details
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

    // Fetch meters data
    const getData = async () => {
        try {
            const data = { id }

            setLoading(true);
            const res = await apiPost("admin/get-meters", data); 
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

                // Reinitialize DataTable after updating data
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


        const CreateMeter = async () => {


            try {
    
    
                if (! name){
                    toast.error("add name field")
                    return 0;
                }
                else if (! location){
                    toast.error("add location field")
                    return 0;
                }
                setLoading(true);
                const data = {
                    name,
                    location,
                    id
                }
    
                const res = await apiPost("admin/metercreate", data);
    
                if (res?.data?.status == true) {
                    console.log("success");
                    getData();
                    getUserDetails();
                    toast.success("success");
    
                } else {
                    console.log(res);
                    toast.error("failed");
    
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
    

    
    useEffect(() => {
        getData();
        getUserDetails(); 
    }, []);

    return (
        <div className="row gy-4">
            {loading ? <Loading /> : null}
            <div className="col-lg-3 ">
                <ToastContainer/>
                <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base">
                   
                    <div className="pb-24 ms-16 mb-24 me-16 mt-3">
                        <div className="text-center border border-top-0 border-start-0 border-end-0">
                        <Avatar name={`${userData?.userdata?.first_name || ""} ${userData?.userdata?.last_name || ""}`} />
                            <h6 className="mb-0 mt-16">{userData?.userdata?.username}</h6>
                            <span className="text-secondary-light mb-16">{userData?.userdata?.email}</span>
                        </div>
                        <div className="mt-24 text-padd">
                            <h6 className="text-xl mb-16">Personal Info</h6>
                            <ul>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-40 text-md fw-semibold text-primary-light">
                                        Full Name:
                                    </span>
                                    <span className="w-60 text-secondary-light fw-medium">
                                        {userData?.userdata?.first_name} {userData?.userdata?.last_name}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-40 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Email:
                                    </span>
                                    <span className="w-60 text-secondary-light fw-medium">
                                       {userData?.userdata?.email}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-40 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Username:
                                    </span>
                                    <span className="w-60 text-secondary-light fw-medium">
                                      {userData?.userdata?.username}
                                    </span>
                                </li>
                           
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-40 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Membership Plan:
                                    </span>
                                    <span className="w-60 text-secondary-light fw-medium">
                                       {userData?.plan_name}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-40 text-md fw-semibold text-primary-light">
                                        {" "}
                                       Total Devices:
                                    </span>
                                    <span className="w-60 text-secondary-light fw-medium">
                                       {userData?.meter_count}
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
                    <div   className="card-header d-flex justify-content-between">
                        <h6>User Meter Data</h6>
                        <Link
                                to="#"
                                className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2 w-2"
                                data-bs-toggle="modal"
                                data-bs-target="#myModal"
                            >
                                <Icon
                                    icon="ic:baseline-plus"
                                    className="icon text-xl line-height-1"
                                />
                                Add Meter
                            </Link>

                            <div
                                className="modal fade"
                                id="myModal"
                                tabIndex="-1"
                                aria-labelledby="myModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="myModalLabel">
                                                Add Meter
                                            </h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">

                                            <div className="">
                                                <div className="col-md-12 mb-3">
                                                    <label className="form-label">Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Name"
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-md-12 mb-3">
                                                    <label className="form-label">Location</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Location"
                                                        onChange={(e) => setLocation(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="modal-footer">


                                                {loading ?
                                                    <button className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32">loading....</button> :
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                                                        data-bs-dismiss="modal" aria-label="Close"
                                                        onClick={CreateMeter}
                                                    >
                                                        Save
                                                    </button>

                                                }


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {data ?
                            <table
                                className="table bordered-table mb-0"
                                id="dataTable"
                                data-page-length={10}
                            >
                                <thead>
                                    <tr>    
                                        <th scope="col">Username</th>
                                        <th scope="col">Meter Name</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Token</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {meterData?.map((item, index) => (
                                        <tr key={index}>
                                            
                                            <td>{item?.username}</td>
                                            <td>{item?.name}</td>
                                            <td>{moment(item?.created_at).format("MMMM Do YYYY")}</td>
                                            <td>{item?.location}</td>
                                            
                                            <td>
                                                {item?.status === "1" ? (
                                                    <span className="badge text-sm fw-semibold text-success-600 bg-success-100 px-20 py-9 radius-4 text-white"
                                                    onClick={() => EnableDisablemeter(item?.meter_data?.id)}>
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="badge text-sm fw-semibold text-danger-600 bg-danger-100 px-20 py-9 radius-4 text-white"
                                                    onClick={() => EnableDisablemeter(item?.meter_data?.id)}>
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td>{item?.token?.slice(0, 10)}********
                                            <button onClick={() => handleCopy(item?.token)} style={{ marginLeft: "8px", cursor: "pointer", border: "none", background: "transparent" }}>
                                                <Icon icon="solar:copy-broken" className='menu-icon' /> {/* Copy icon */}
                                            </button>
                                            </td>
                                            
                                            <td className='d-flex justify-content-center'>
                                                 <Link
                                                    to={`/meter-details?id=${item?.id}`}
                                                    className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                                >
                                                    <Icon icon="mdi:eye" />
                                                </Link>

                                            </td>
                                           
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

export default UserProfile;