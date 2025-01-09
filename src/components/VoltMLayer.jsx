import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables.js";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { apiGet } from "../services/client";
import Loading from "./Loading";
const VoltMLayer = () => {
    const [data, setData] = useState([]);
    const [ampLoading, setampLoading] = useState(false);

    const getData = async () => {
        setampLoading(true);
        try {
            const res = await apiGet("userapp/kwh");
            if (res?.data?.status === true) {
                console.log(res);
                const newData = res?.data?.data;
                setData(newData);

                // Initialize DataTables after data fetching
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
                console.log(res?.data?.message);
            }
        } catch (e) {
            console.log(e);
        }finally{
            setampLoading(false);
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
            {ampLoading && <Loading />}
            <div className="card-header">
                <h5 className="card-title mb-0">ALL Meters Kwh</h5>
            </div>
            <div className="card-body">
                <table className="table bordered-table mb-0" id="dataTable">
                    <thead>
                        <tr>
                            
                            <th>Meter Id</th>
                            <th>Total Power Today</th>
                            <th>Total Power This Month</th>
                            <th>Total Peak Today</th>
                            <th>Total Peak This Month</th>
                            <th>Status</th>
                 
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={index}>
                                
                                <td>
                                    <Link to="#" className="text-primary-600">
                                        Meter {item?.meter_id}
                                    </Link>
                                </td>
                                <td>{item?.total_power_today.toFixed(4)}</td>
                                <td>{item?.total_power_month.toFixed(4)}</td>
                                <td>{item?.peak_power_today.toFixed(4)}</td>
                                <td>{item?.peak_power_month.toFixed(4)}</td>
                                <td>
                                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                        Normal
                                    </span>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VoltMLayer;
