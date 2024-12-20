import React, { useState, useEffect } from 'react';
import { apiGet, apiPost } from "../services/client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { ToastContainer, toast } from 'react-toastify';

const AddMetersUser = () => {



    const [status, setStatus] = useState(null)
    const [data, setData] = useState(null);
    const [name, setName] = useState(null)
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const checkStatus = async () => {
        try {
            const res = await apiGet("userapp/ismember");
            console.log(res);
            if (res?.data?.status === true) {
                setStatus(res?.data?.data);


            } else {
                console.log(res?.data?.message);

            }
        } catch (e) {
            console.log(e);

        }
    };


    const AllMeter = async () => {
        try {
            const res = await apiGet("userapp/getDevices");
            console.log("all meter data", res);
            if (res?.data?.status === true) {
                setData(res?.data?.data);

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

        }
    };


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
                location
            }

            const res = await apiPost("userapp/metercreate", data);

            if (res?.data?.status == true) {
                console.log("success");
                AllMeter();
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


    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = (token) => {
        navigator.clipboard.writeText(token);
        setIsCopied(true);
        toast.success("copied");
        setTimeout(() => setIsCopied(false), 2000);
    };


    useEffect(() => {
        checkStatus();
        AllMeter();
        return () => {
            if ($.fn.DataTable.isDataTable("#dataTable")) {
                $("#dataTable").DataTable().destroy(true);
            }
        };

    }, []);



    return (







        <div className="col-lg-12 d-flex justify-content-center align-items-center p-4 card">


            <ToastContainer/>

            {/* Before Subscription Page */}


            {/* After Subscription Page */}


            {status ?



                <>
                    {status == "1" ? <div className="card basic-data-table col-lg-12">
                        <div className="card-header d-flex justify-content-between">
                            <h5 className="card-title mb-0">All Meters</h5>
                            <Link
                                to="/view-profile"
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
                        <div className="card-body">


                            <table
                                className="table bordered-table mb-0"
                                id="dataTable"
                                data-page-length={10}
                            >
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <div className="form-check style-check d-flex align-items-center">

                                                <label className="form-check-label">S.L</label>
                                            </div>
                                        </th>
                                        <th scope="col">Meter Name</th>
                                        <th scope="col">Meter Location</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Token</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <label>{index + 1}</label>
                                            </td>
                                            <td>{item?.name}</td>
                                            <td>{item?.location}</td>
                                            <td>{item?.created_at}</td>
                                            <td>{item?.token?.slice(0, 10)}********
                                                <button onClick={() => handleCopy(item?.token)} style={{ marginLeft: "8px", cursor: "pointer", border: "none", background: "transparent" }}>
                                                    <Icon icon="solar:copy-broken" className='menu-icon' /> {/* Copy icon */}
                                                </button>
                                              </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                        </div>
                    </div>















                        :

                        <div className="col-lg-10 mt-4 mb-4 p-5 text-cenetr">
                            <div className="card-body text-center">
                                <h2 className="pt-3 pb-3">Choose Your Perfect Plan</h2>
                                <p>Subscribe to the right plan and unlock full control of your meter usage today!</p>
                                <Link to="/pricing" className="w-50">
                                    <button className="bg-primary-600 bg-hover-primary-700 text-white text-center border border-primary-600 text-sm btn-sm px-12 py-10 w-100 radius-8 mt-28">Get Plan</button>
                                </Link>
                            </div>
                        </div>




                    }
                </> : <></>

            }
        </div>
    )
}

export default AddMetersUser