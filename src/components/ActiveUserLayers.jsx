import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { apiGet,apiPost } from "../services/client";
import moment from "moment";
import Loading from './Loading';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
const ActiveUsersLayers = () => {
    const [data,setData] = useState([]); 
    const { parse } = require('json2csv');
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await apiGet("admin/active-users");
            if (res?.data?.status === true) {
                console.log(res?.data?.data);
                const newData = res?.data?.data;
                setData(newData);

                setTimeout(() => {
                    $("#dataTable").DataTable({
                        pageLength: 10,
                        dom: 'Bfrtip', // Add buttons to the DOM
                        buttons: [
                            {
                                extend: 'csv', // Download CSV
                                text: ' <img src="../assets/images/csv.png" alt="CSV" width="20" height="20" /> CSV',
                            },
                            {
                                extend: 'pdf', // PDF export
                                text: '<img src="../assets/images/pdf.png" alt="CSV" width="20" height="20" /> PDF',
                                orientation: 'landscape',
                                pageSize: 'A4',
                                title: 'Active Users',
                                exportOptions: {
                                    columns: ':visible', // Export only visible columns
                                },
                            },
                            {
                                extend: 'print', // Print table
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
            setLoading(false);
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
            {loading ? <Loading />: null}
            <div className="card-header d-flex justify-content-between">
            <h5 className="card-title mb-0">Active Users</h5>
            </div>
            <div className="card-body">
         

                { data? 
                <table
                    className="table bordered-table mb-0"
                    id="dataTable"
                    data-page-length={10}
                >
                    <thead>
                        <tr>
                     
                            <th scope="col">Username</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={index}>
                            
                                <td>
                                    <Link to="#" className="text-primary-600">
                                        {item?.username}
                                    </Link>
                                </td>
                                <td>{item?.first_name}</td>
                                <td>{item?.last_name}</td>
                                <td>{item?.email}</td>
                                <td>{moment(item?.created_at).format("MMMM Do YYYY")}  </td>
                                <td>
                                    {item?.status === "1" ? (
                                        <span className="badge text-sm fw-semibold text-success-600 bg-success-100 px-20 py-9 radius-4 text-white   ">Active</span>
                                    ) : (
                                        <span className="badge text-sm fw-semibold text-danger-600 bg-danger-100 px-20 py-9 radius-4 text-white ">Inactive</span>
                                    )}
                                </td>

                            </tr>
                        ))}


                    </tbody>
                </table> :<></>

                    }
            </div>
        </div>

    )
}

export default ActiveUsersLayers