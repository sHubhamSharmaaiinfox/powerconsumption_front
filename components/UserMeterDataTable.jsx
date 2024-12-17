import React, { useEffect, useState } from "react";
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { apiGet, apiPost } from "../services/client";
import { useSearchParams } from "react-router-dom";
const MeterDataDetails = () => {

    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [ReadingData, setReadingsData] = useState([]);
    const [tableHeaders, setTableHeaders] = useState([]);

    // Fetch meters data
    const getData = async () => {
        try {
            const data = { id };
            console.log(data);
   
            setLoading(true);
            const res = await apiPost("admin/get-readings", data); // Use apiGet instead of apiPost for GET requests
            console.log(res);
   
            if (res?.data?.status === true) {
                console.log(res?.data?.data);
                const data = res?.data?.data;
                setReadingsData(data);  

                if (data.length > 0) {
                    setTableHeaders(Object.keys(data[0])); // Assuming data[0] contains the object with keys
                }
   
                // Destroy existing DataTable instance if it exists
                if ($.fn.DataTable.isDataTable("#dataTable")) {
                    $("#dataTable").DataTable().destroy();
                }
   
                // Reinitialize DataTable after updating data
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
        } finally {
            setLoading(false);
        }
    };
   

    useEffect(() => {
        getData();
    }, []);


    return (

        <table
            className="table bordered-table mb-0"
            id="dataTable"
            data-page-length={10}
        >
            <thead>
                <tr>
                    <th scope="col">Member ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>

                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>

        </table>

    )
}

export default MeterDataDetails