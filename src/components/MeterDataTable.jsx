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



    const [cardsData,setCardsData] = useState(null);



    const getCardsData = async () => {

        const data = {id}

        const res = await apiPost('userapp/meter-cards-data',data);
            if (res?.data?.status === true) {
                setCardsData(res?.data?.data);
                console.log(res?.data?.data);
            }else {
                console.log(res?.data?.message);
            }

    }






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
        }
    };

    useEffect(() => {
        getCardsData();
        // getData();
        // return () => {
        //     if ($.fn.DataTable.isDataTable("#dataTable")) {
        //         $("#dataTable").DataTable().destroy(true);
        //     }
        // };     
        
        

    }, []);

    return (   
        
        <>
        
      
        <div className="col-xxl-8 card-dash">
    <div className="d-flex flex-wrap gap-3">
        {/* Card 1 */}
        <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
            <div className="card-inner p-3">
                <div className="col">
                    <h6 className="mb-2 fw-bold text-lg">Voltage P-N</h6>
                </div>
                <div className="col d-flex justify-content-between mt-3">
                    <div className="col">
                        <b>R-N</b>
                        <p className="text-warning">{cardsData?.data?.Voltage_P_N?.R_N ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>Y-N</b>
                        <p className="text-primary">{cardsData?.data?.Voltage_P_N?.Y_N ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>B-N</b>
                        <p className="text-success">{cardsData?.data?.Voltage_P_N?.B_N ?? 0}</p>
                    </div>
                </div>
            </div>
        </div>
        {/* Card 2 */}
        <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
            <div className="card-inner p-3">
                <div className="col">
                    <h6 className="mb-2 fw-bold text-lg">Voltage P-P</h6>
                </div>
                <div className="col d-flex justify-content-between mt-3">
                    <div className="col">
                        <b>R-N</b>
                        <p className="text-warning">{cardsData?.data?.Voltage_P_P?.R_N ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>Y-N</b>
                        <p className="text-primary">{cardsData?.data?.Voltage_P_P?.Y_N ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>B-N</b>
                        <p className="text-success">{cardsData?.data?.Voltage_P_P?.B_N ?? 0}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
            <div className="card-inner p-3">
                <div className="col">
                    <h6 className="mb-2 fw-bold text-lg">Current</h6>
                </div>
                <div className="col d-flex justify-content-between mt-3">
                    <div className="col">
                        <b>R</b>
                        <p className="text-warning">{cardsData?.data?.Current?.R ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>Y</b>
                        <p className="text-primary">{cardsData?.data?.Current?.Y ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>B</b>
                        <p className="text-success">{cardsData?.data?.Current?.B ?? 0}</p>
                    </div>
                </div>
            </div>
        </div>


        <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
            <div className="card-inner p-3">
                <div className="col">
                    <h6 className="mb-2 fw-bold text-lg">Frequency</h6>
                </div>
                <div className="col d-flex justify-content-between mt-3">
                    <div className="col">
                        <b>R</b>
                        <p className="text-warning">{cardsData?.data?.Frequency?.R ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>Y</b>
                        <p className="text-primary">{cardsData?.data?.Frequency?.Y ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>B</b>
                        <p className="text-success">{cardsData?.data?.Frequency?.B ?? 0}</p>
                    </div>
                </div>
            </div>
        </div>


        <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
            <div className="card-inner p-3">
                <div className="col">
                    <h6 className="mb-2 fw-bold text-lg">Active Power (KW)</h6>
                </div>
                <div className="col d-flex justify-content-between mt-3">
                    <div className="col">
                        <b>R</b>
                        <p className="text-warning">{cardsData?.data?.ActivePower_K_W?.R ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>Y</b>
                        <p className="text-primary">{cardsData?.data?.ActivePower_K_W?.Y ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>B</b>
                        <p className="text-success">{cardsData?.data?.ActivePower_K_W?.B ?? 0}</p>
                    </div>
                </div>
            </div>
        </div>



        <div className="card  flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
            <div className="card-inner p-3">
                <div className="col">
                    <h6 className="mb-2 fw-bold text-lg">Apparent Power (KVA)</h6>
                </div>
                <div className="col d-flex justify-content-between mt-3">
                    <div className="col">
                        <b>R</b>
                        <p className="text-warning">{cardsData?.data?.ApparentPower_KVA?.R ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>Y</b>
                        <p className="text-primary">{cardsData?.data?.ApparentPower_KVA?.Y ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>B</b>
                        <p className="text-success">{cardsData?.data?.ApparentPower_KVA?.B ?? 0}</p>
                    </div>
                </div>
            </div>
        </div>


        <div className="card  flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
            <div className="card-inner p-3">
                <div className="col">
                    <h6 className="mb-2 fw-bold text-lg">Power Factor</h6>
                </div>
                <div className="col d-flex justify-content-between mt-3">
                    <div className="col">
                        <b>R</b>
                        <p className="text-warning">{cardsData?.data?.PowerFactor?.R ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>Y</b>
                        <p className="text-primary">{cardsData?.data?.PowerFactor?.Y ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>B</b>
                        <p className="text-success">{cardsData?.data?.PowerFactor?.B ?? 0}</p>
                    </div>
                </div>
            </div>
        </div>


        <div className="card  flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
            <div className="card-inner p-3">
                <div className="col">
                    <h6 className="mb-2 fw-bold text-lg">Phase Angle</h6>
                </div>
                <div className="col d-flex justify-content-between mt-3">
                    <div className="col">
                        <b>R</b>
                        <p className="text-warning">{cardsData?.data?.PhaseAngle?.R ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>Y</b>
                        <p className="text-primary">{cardsData?.data?.PhaseAngle?.Y ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>B</b>
                        <p className="text-success">{cardsData?.data?.PhaseAngle?.B ?? 0}</p>
                    </div>
                </div>
            </div>
        </div>


        <div className="card  flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
            <div className="card-inner p-3">
                <div className="col">
                    <h6 className="mb-2 fw-bold text-lg">THD Voltage</h6>
                </div>
                <div className="col d-flex justify-content-between mt-3">
                    <div className="col">
                        <b>R</b>
                        <p className="text-warning">{cardsData?.data?.THD_Voltage?.R ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>Y</b>
                        <p className="text-primary">{cardsData?.data?.THD_Voltage?.Y ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>B</b>
                        <p className="text-success">{cardsData?.data?.THD_Voltage?.B ?? 0}</p>
                    </div>
                </div>
            </div>
        </div>




        <div className="card  flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
            <div className="card-inner p-3">
                <div className="col">
                    <h6 className="mb-2 fw-bold text-lg">THD Current</h6>
                </div>
                <div className="col d-flex justify-content-between mt-3">
                    <div className="col">
                        <b>R</b>
                        <p className="text-warning">{cardsData?.data?.THD_Current?.R ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>Y</b>
                        <p className="text-primary">{cardsData?.data?.THD_Current?.Y ?? 0}</p>
                    </div>
                    <div className="col">
                        <b>B</b>
                        <p className="text-success">{cardsData?.data?.THD_Current?.B ?? 0}</p>
                    </div>
                </div>
            </div>
        </div>

        
    </div>
</div>


<div className="col-xxl-4 col-md-6">
              <div className="card h-100 radius-8 border-0">
                  <div className="card-body p-24 d-flex flex-column justify-content-between gap-8">
                      <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20">
                          <h6 className="mb-2 fw-bold text-lg mb-0">Apperent Power</h6>
              
            </div>
        </div>
    </div>
</div>
        </>
//         <div className="card basic-data-table">
//             <div className="card-header">
//                 <h5 className="card-title mb-0">ALL Meters Kwh</h5>
//             </div>

//             { data ? 
//             <div className="card-body">
//                 <table className="table bordered-table mb-0" id="dataTable">
//                     <thead>
//                         <tr>
//                             <th>S.R</th>
//                             <th>Meter Id</th>
//                             <th>Total Power</th>
//                             <th>DateTime</th>
//                             <th>Status</th>          
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data?.map((item, index) => (
//                             <tr key={index}>
//                                 <td>
//                                     <input className="form-check-input" type="checkbox" />
//                                     <label>{index + 1}</label>
//                                 </td>
//                                 <td>
//                                     <Link to="#" className="text-primary-600">
//                                          {item?.name}
//                                     </Link>
//                                 </td>
//                                 <td>{item?.active_power}</td>
//                                 <td>{moment(item?.datetime).format("MMMM Do YYYY")}</td>
//                                 <td>
//                                     <span className="bg-success-focus text-success-main px-24 py-4 rounded-pill fw-medium text-sm">
//                                         Normal
//                                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div> : <></>


// }
//         </div>
    );
};

export default MeterDataTable;
