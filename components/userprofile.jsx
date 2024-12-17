import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiGet, apiPost } from "../services/client";
import $ from 'jquery';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useSearchParams } from 'react-router-dom';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import moment from 'moment';
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


     
     const getUserDetails = async () => {
        try {
            const data = { id }; 

            setLoading(true);
            const res = await apiPost("admin/user-detail", data); // API call to fetch user details
            console.log("userdata",res);

            if (res?.data?.status === true) {
                setUserData(res?.data?.data); // Store user details in state
            } else {
                console.log(res?.data?.message); // Handle error messages
            }
        } catch (e) {
            console.log(e); // Log any errors
        } finally {
            setLoading(false); // Set loading to false after API call completes
        }
    };

    // Fetch meters data
    const getData = async () => {
        try {
            const data = { id }

            setLoading(true);
            const res = await apiPost("admin/get-meters", data); // API call to get data
            console.log(res);

            if (res?.data?.status === true) {
                console.log(res?.data?.data)
                const data = res?.data?.data;
                setMetersData(data);

                // Dynamically set table headers based on API response
                if (data.length > 0) {
                    setTableHeaders(Object.keys(data[0])); // Assuming data[0] contains the object with keys
                }

                // Destroy existing DataTable instance if it exists
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

    useEffect(() => {
        getData();
        getUserDetails(); 
    }, []);



  

    const readURL = (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(input.target.files[0]);
        }
    };



    return (
        <div className="row gy-4">
            <div className="col-lg-4">
                <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
                    <img
                        src="assets/images/user-back.jpg"
                        alt=""
                        className="w-100 object-fit-cover"
                    />
                    <div className="pb-24 ms-16 mb-24 me-16  mt--100">
                        <div className="text-center border border-top-0 border-start-0 border-end-0">
                            <img
                                src="assets/images/user-image-1.jpg"
                                alt=""
                                className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
                            />
                            <h6 className="mb-0 mt-16">{userData?.username}</h6>
                            <span className="text-secondary-light mb-16">{userData?.email}</span>
                        </div>
                        <div className="mt-24">
                            <h6 className="text-xl mb-16">Personal Info</h6>
                            <ul>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        Full Name
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        {userData?.first_name} {userData?.last_name}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Email
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                       {userData?.email}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Username
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                      {userData?.username}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Membership Activiity
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                       
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Membership Plan
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                       
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                       Total Devices
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                       
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                      Adress
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                       
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <div className="card h-100">
                    <div className="card-body p-24">
                        <h5>User Data</h5>
                        {data ?
                            <table
                                className="table bordered-table mb-0"
                                id="dataTable"
                                data-page-length={10}
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">Member ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Location</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {meterData?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.member_id}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.location}</td>
                                            <td>{moment(item?.created_at).format("MMMM Do YYYY, h:mm:ss A")}</td>
                                            <td>
                                                {item?.status === "1" ? (
                                                    <span className="badge text-sm fw-semibold text-success-600 bg-success-100 px-20 py-9 radius-4 text-white"
                                                    onClick={() => EnableDisablemeter(item?.id)}>
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="badge text-sm fw-semibold text-danger-600 bg-danger-100 px-20 py-9 radius-4 text-white"
                                                    onClick={() => EnableDisablemeter(item?.id)}>
                                                        Inactive
                                                    </span>
                                                )}
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