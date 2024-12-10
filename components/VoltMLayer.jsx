import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables.js";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { apiGet } from "../services/client";

const VoltMLayer = () => {
    const [data, setData] = useState([]);

    const getData = async () => {
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
            <div className="card-header">
                <h5 className="card-title mb-0">ALL Meters Kwh</h5>
            </div>
            <div className="card-body">
                <table className="table bordered-table mb-0" id="dataTable">
                    <thead>
                        <tr>
                            <th>S.R</th>
                            <th>Meter Id</th>
                            <th>Total Power Today</th>
                            <th>Total Power This Month</th>
                            <th>Total Peak Today</th>
                            <th>Total Peak This Month</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input className="form-check-input" type="checkbox" />
                                    <label>{index + 1}</label>
                                </td>
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
                                <td className="d-flex">
                                    <Link
                                        to="#"
                                        className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                                    >
                                        <Icon icon="iconamoon:eye-light" />
                                    </Link>
                                   
                          
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
