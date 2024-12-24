import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { apiGet, apiPost } from "../services/client";
import moment from "moment";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { toast,ToastContainer } from 'react-toastify';


const PendingRequestsLayers = () => {

    const [data, setData] = useState([]);

    const AprovePayment = async (id) => {
        const data = { id, status: '1' }; // '1' for approved status
        console.log(data);

        try {
            const res = await apiPost("admin/update-payment", data);

            if (res?.data?.status === true) {
                toast.success("Success")
                getData();
            } else {
                console.log(res?.data?.message);
            }
        } catch (e) {
            console.error('Error:', e);
        }
    };

    const CancelPayment = async (id) => {
        const data = { id, status: '2' }; // '2' for canceled status
        console.log(data);

        try {
            const res = await apiPost("admin/update-payment", data);

            if (res?.data?.status === true) {
                toast.success("Success")
                getData();
            } else {
                console.log(res?.data?.message);
            }
        } catch (e) {
            console.error('Error:', e);
        }
    };

    const getData = async () => {
        try {
            const res = await apiGet("admin/get-pending-payments");
            console.log(res);
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

    useEffect(() => {
        getData();

        return () => {
            if ($.fn.DataTable.isDataTable("#dataTable")) {
                $("#dataTable").DataTable().destroy(true);
            }
        };

    }, []);

    return (

       
        <div className="card basic-data-table">
             <ToastContainer/>
            <div className="card-header d-flex justify-content-between">
                <h5 className="card-title mb-0">Pending Requests</h5>
            </div>

            <div className="card-body">
                {data ? (
                    <table
                        className="table bordered-table mb-0"
                        id="dataTable"
                        data-page-length={10}
                    >
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Image</th>
                                <th scope="col">Currency</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Comment</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Action</th>
                                <th scope="col">Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.username}</td>
                                    <td>{item?.email}</td>
                                    <td>  <Link
                                        to="#"
                                        className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal" 
                                    >
                                        <Icon icon="mdi:eye" />
                                    </Link>

                                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Payment Image</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body d-flex justify-content-center align-items-center">
                                                    <img src={item?.image} alt="Converted Base64" style={{ width: "300px" }} />
 
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </td>
                                    <td>{item?.currency}</td>
                                    <td>{item?.amount}</td>
                                    <td>{item?.comment}</td>
                                    <td>{moment(item?.created_at).format("MMMM Do YYYY, h:mm:ss A")}</td>
                                 
                                    <td>
                                        <span
                                            className="badge text-sm fw-semibold text-success-600 bg-success-100 px-20 py-9 radius-4 text-white"
                                            onClick={() => AprovePayment(item?.id)}
                                        >
                                            Approve
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className="badge text-sm fw-semibold text-danger-600 bg-danger-100 px-20 py-9 radius-4 text-white"
                                            onClick={() => CancelPayment(item?.id)}
                                        >
                                            Cancel
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default PendingRequestsLayers;
