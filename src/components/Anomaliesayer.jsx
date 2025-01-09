import React, { useEffect,useState } from 'react'
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { apiGet, apiPost } from "../services/client";
import Loading from './Loading';

const Anomaliesayer = () => {
    const [alertdata, setAlertData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const table = $('#dataTable').DataTable({
            pageLength: 10,
        });
        return () => {
            table.destroy(true);
        };
    }, []);
    
    
    
    const getAlertData = async () => {
        setLoading(true);
          try {
              const res = await apiGet("userapp/all-alerts");
              if (res?.data?.status === true) {
                  setAlertData(res?.data?.data);
                  console.log(res);
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
            setLoading(false);
          }
      };

    useEffect(() => {
        getAlertData();
    }, []);


    return (
        <div className="card basic-data-table">
            {loading && <Loading />}
            <div className="card-header">
                <h5 className="card-title mb-0">Alert Table</h5>
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
                            <th scope="col">Level</th>
                            <th scope="col">Alert Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            alertdata?.map((alert, index) => (
                                <tr key={alert?.id}>
                                    <td>{alert?.meter_id}</td>
                                    <td>{alert?.level}</td>
                                    <td>{alert?.alert_name}</td>
                                    <td>{alert?.description}</td>
                                    <td>
                                    {alert?.status === "1" ? (
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

export default Anomaliesayer