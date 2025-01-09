import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { apiGet } from "../services/client";
import Loading from './Loading';
import moment from 'moment';

const Amplayers = () => {


    const [data, setData] = useState([]);
    const [loading, setLoadnin] = useState(false);
    useEffect(() => {
        getData();
        const table = $('#dataTable').DataTable({
            pageLength: 10,
        });
        return () => {
            table.destroy(true);
        };


    }, []);



    const getData = async () => {
        setLoadnin(true);
        try {
            const res = await apiGet("userapp/amp-volt-readings");
            if (res?.data?.status === true) {
                setData(res?.data?.data);
                console.log(res?.data?.data);
                if ($.fn.DataTable.isDataTable("#dataTable")) {
                    $("#dataTable").DataTable().destroy();
                }
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
                                title: 'User Data',
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
                console.error(res?.data?.message);
            }
        } catch (error) {
            console.error(error);
        }finally{
            setLoadnin(false);
        }
    };

    
    return (
        <div className="card basic-data-table">
            {loading ? <Loading /> : <></>}
            <div className="card-header">
                <h5 className="card-title mb-0">{data? <>Amp Volt Table</>:<></>}</h5>
            </div>
            <div className="card-body">
                <table
                    className="table bordered-table mb-0"
                    id="dataTable"
                    data-page-length={10}
                >
                    <thead>
                        <tr>
                            <th scope="col">Device</th>
                            <th scope="col">R</th>
                            <th scope="col">Y</th>
                            <th scope="col">B</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            data?.map((item, index) => (
                                <tr key={item?.id}>
                                    <td>{item?.name}</td>
                                    <td>{item?.data?.ApparentPower_KVA?.R}</td>
                                    <td>{item?.data?.ApparentPower_KVA?.Y}</td>
                                    <td>{item?.data?.ApparentPower_KVA?.B}</td>
                                    <td>{moment(item?.datetime).format("MMMM Do YYYY")} </td>
                                    <td>
                                    {item?.status === "1" ? (
                                            <span
                                                
                                                className="badge text-sm fw-semibold text-success-600 bg-success-100 px-20 py-9 radius-4 text-white   ">Active</span>
                                        ) : (
                                            <span
                                                
                                                className="badge text-sm fw-semibold text-danger-600 bg-danger-100 px-20 py-9 radius-4 text-white ">Inactive</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Amplayers