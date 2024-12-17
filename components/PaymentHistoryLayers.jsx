import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { apiGet, apiPost } from "../services/client";
import moment from "moment";
import { Cursor } from '@phosphor-icons/react';

const PaymentHistoryLayers = () => {

    const [data, setData] = useState([]);





    const getData = async () => {
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
                                    <td>{item?.image}</td>
                                    <td>{item?.currrency}</td>
                                    <td>{item?.amount}</td>
                                    <td>{item?.comment}</td>
                                    <td>{moment(item?.created_at).format("MMMM Do YYYY, h:mm:ss A")}  </td>
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
