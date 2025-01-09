import React, { useEffect ,useState} from 'react'
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { apiGet } from "../services/client";
import moment from "moment";
import Loading from './Loading';

const MeterLayers = () => {
    const [data, setData] = useState([]);
    const [meterloading, setmeterloading] = useState(false);
    const getData = async () => {
        setmeterloading(true);
        try {
            const res = await apiGet("userapp/meter-list");
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
            setmeterloading(false);
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
            {meterloading && <Loading />}
            <div className="card-header">
                <h5 className="card-title mb-0">Meter List</h5>
            </div>
            <div className="card-body">
                <table
                    className="table bordered-table mb-0"
                    id="dataTable"
                    data-page-length={10}
                >
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className="form-check style-check d-flex align-items-center">
                                    <input className="form-check-input" type="checkbox" />
                                    <label className="form-check-label">S.R</label>
                                </div>
                            </th>
                            <th scope="col">Meter ID</th>
                            <th scope="col">Location</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        { data?.map((item,index)=>{
                            return(


                                <tr>
                            <td>
                                <div className="form-check style-check d-flex align-items-center">
                                    <input className="form-check-input" type="checkbox" />
                                    <label className="form-check-label">{index}</label>
                                </div>
                            </td>
                            <td>
                                
                            {item?.name}
                            
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                  
                                    <h6 className="text-md mb-0 fw-medium flex-grow-1">
                                        {item?.location}
                                    </h6>
                                </div>
                            </td>
                            <td>
                                {" "}
                                <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
                                    Active
                                </span>
                            </td>
                            
                            <td>{moment(item?.created_at).format("MMMM Do YYYY")}</td>
                            <td>
                                <Link
                                    to={`/meter-view?id=${item?.id}`}
                                    className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                                >
                                    <Icon icon="iconamoon:eye-light" />
                                </Link>
                                
                            </td>
                        </tr>


                            );
                        })
                        

}

                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default MeterLayers