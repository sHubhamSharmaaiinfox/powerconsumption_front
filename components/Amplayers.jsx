import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { apiGet } from "../services/client";


const Amplayers = () => {


    const [data, setData] = useState([]);
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
                    });
                }, 0);

            } else {
                console.error(res?.data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    
    return (
        <div className="card basic-data-table">
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
                            <th scope="col">Meter Id</th>
                            <th scope="col">Power</th>
                            <th scope="col">Amphare</th>
                            <th scope="col">Volts</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            data?.map((item, index) => (
                                <tr key={item?.id}>
                                    <td>{item?.meter_id}</td>
                                    <td>{item?.power}</td>
                                    <td>{item?.data?.amphere}</td>
                                    <td>{item?.data?.volts}</td>
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