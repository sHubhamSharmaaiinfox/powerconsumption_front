import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { apiGet, apiPost } from "../services/client";
import moment from "moment";
import { Cursor } from '@phosphor-icons/react';
import Loading from './Loading';
const PaymentHistoryLayers = () => {

    const [data, setData] = useState([]);
    const { parse } = require('json2csv');
    const [paymentLoading, setPaymentLoading] = useState(false);
  




    const getData = async () => {
        setPaymentLoading(true);
        try {

            const res = await apiGet("admin/get-payment ");
            console.log(res);
            if (res?.data?.status === true) {
                setData(res?.data?.data);
                if ($.fn.DataTable.isDataTable("#dataTable")) {
                    $("#dataTable").DataTable().destroy();
                }
                setTimeout(() => {
                    $("#dataTable").DataTable({
                        pageLength: 10,
                        dom: 'Bfrtip',
                        buttons: [
                            {
                                extend: 'csv', 
                                text: ' <img src="../assets/images/csv.png" alt="CSV" width="20" height="20" /> CSV',
                            },
                            {
                                extend: 'pdf', 
                                text: '<img src="../assets/images/pdf.png" alt="CSV" width="20" height="20" /> PDF',
                                orientation: 'landscape',
                                pageSize: 'A4',
                                title: 'User Data',
                                exportOptions: {
                                    columns: ':visible', 
                                },
                            },
                            {
                                extend: 'print', 
                                text: '   <img src="../assets/images/print.png" alt="CSV" width="20" height="20" /> Print',
                            },
                        ],
                    });
                }, 0);
            } else {
                console.log(res?.data?.message);
            }
        } catch (e) {
            console.log(e);
        }finally{
            setPaymentLoading(false);
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
            {paymentLoading && <Loading />}
            <div className="card-header d-flex justify-content-between">
                <h5 className="card-title mb-0">Payment History</h5>

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
                                <th scope="col">image</th>
                                <th scope="col">currency</th>
                                <th scope="col">amount</th>
                                <th scope="col">comment</th>
                                <th scope="col">created at</th>
                                <th scope="col">Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => (
                                <tr key={index}>

                                    <td>

                                        {item?.username}

                                    </td>
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
                                    <td>{item?.currrency}</td>
                                    <td>{item?.amount}</td>
                                    <td>{item?.comment}</td>
                                    <td>{moment(item?.created_at).format("MMMM Do YYYY")}  </td>
                                    <td>
                                        {item?.status === "0" ? (
                                            <span
                                                className="badge text-sm fw-semibold text-warning-600 bg-warning-100 px-20 py-9 radius-4 text-white"
                                            >
                                                Pending
                                            </span>
                                        ) : item?.status === "1" ? (
                                            <span
                                                className="badge text-sm fw-semibold text-success-600 bg-success-100 px-20 py-9 radius-4 text-white"
                                            >
                                                Completed
                                            </span>
                                        ) : (
                                            <span
                                                className="badge text-sm fw-semibold text-danger-600 bg-danger-100 px-20 py-9 radius-4 text-white"
                                            >
                                                Canceled
                                            </span>
                                        )}
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

export default PaymentHistoryLayers;
