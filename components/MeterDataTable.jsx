import React, { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables.js";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { apiPost} from "../services/client";
import { useSearchParams } from "react-router-dom";
import moment from "moment";



const MeterDataTable = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const data = {id}
            const res = await apiPost('userapp/meter-consumption-logs',data);
            if (res?.data?.status === true) {
                const newData = res?.data?.data;
                setData(newData);
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

            { data ? 
            <div className="card-body">
                <table className="table bordered-table mb-0" id="dataTable">
                    <thead>
                        <tr>
                            <th>S.R</th>
                            <th>Meter Id</th>
                            <th>Total Power</th>
                            <th>DateTime</th>
                            <th>Status</th>          
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
                                <td>{item?.power}</td>
                                <td>{moment(item?.created_at).format("MMMM Do YYYY, h:mm:ss A")}</td>
                                <td>
                                    <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                        Normal
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> : <></>


}
        </div>
    );
};

export default MeterDataTable;
