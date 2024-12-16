import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { apiGet, apiPost } from "../services/client";
import moment from "moment";
import { Cursor } from '@phosphor-icons/react';

const SubscriptionLayers = () => {

    const [data, setData] = useState([]);
    const [editItem, setEditItem] = useState(null); // Holds data for the item being edited
    const [loading, setLoading] = useState(false);

    const CreatePackage = async () => {
        try {
            setLoading(true);
            const dataToSave = {
                name: editItem?.name,
                amount: editItem?.amount,
                plan_period: editItem?.plan_period,
                limit: editItem?.limit,
            };

            const res = await apiPost("admin/create-membership", dataToSave);
            if (res?.data?.status === true) {
                console.log("Success");
                getData();
            } else {
                console.log(res);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };


    const EnableDisablePlan = async (id) =>{
        const data = {id}
        console.log(data);
        try{
            const res  = await apiPost("admin/membership-status",data);
            if (res?.data?.status == true){
            getData();
            }else{
            console.log(res);
            }
        }catch(e){
            console.log(e);
        }

    } 

    const EditPackage = async (id) =>{
        const data = {
                id: editItem?.id,
                name: editItem?.name,
                amount: editItem?.amount,
                plan_period: editItem?.plan_period,
                limit: editItem?.limit,
        }
        setLoading(true);
        try{
            const res = await apiPost("admin/update-membership",data)
            if (res?.data?.status === true) {
                console.log("Success");
                getData();
            } else {
                console.log(res);
            }
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    const getData = async () => {
        try {
            const res = await apiGet("admin/get-membership");
            if (res?.data?.status === true) {
                setData(res?.data?.data);
    
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
        }
    };
    const handleEditClick = (item) => {
        setEditItem({ ...item });
    };

    const handleInputChange = (field, value) => {
        setEditItem({ ...editItem, [field]: value });
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
            <div className="card-header d-flex justify-content-between">
                <h5 className="card-title mb-0">All Packages</h5>
                <Link
                    to="#"
                    className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2 w-2"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={() => setEditItem({ name: '', amount: '', plan_period: '', limit: '' })} // Reset modal for new package
                >
                    <Icon
                        icon="ic:baseline-plus"
                        className="icon text-xl line-height-1"
                    />
                    Add New Package
                </Link>

                {/* Add/Edit Modal */}
                <div
                    className="modal fade"
                    id="myModal"
                    tabIndex="-1"
                    aria-labelledby="myModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="myModalLabel">
                                    {editItem?.id ? 'Edit Package' : 'Add New Package'}
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Plan Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editItem?.name || ''}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                placeholder="Enter Plan Name"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Amount</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={editItem?.amount || ''}
                                                onChange={(e) => handleInputChange('amount', e.target.value)}
                                                placeholder="Enter Amount"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Plan Period (months)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editItem?.plan_period || ''}
                                            onChange={(e) => handleInputChange('plan_period', e.target.value)}
                                            placeholder="Enter Plan Period in numbers"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Limit</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={editItem?.limit || ''}
                                            onChange={(e) => handleInputChange('limit', e.target.value)}
                                            placeholder="Enter Limit of devices"
                                        />
                                    </div>

                                    <div className="modal-footer">
                                        {loading ? (
                                            <button className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32" disabled>
                                                Loading ...
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => editItem?.id ? EditPackage(editItem.id) : CreatePackage()}
                                                className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                                            >
                                                Save Package
                                            </button>
                                        )}
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card-body">
                {data ? (
                    <table
                        className="table bordered-table mb-0"
                        id="dataTable"
                        data-page-length={10}
                    >
                        <thead>
                            <tr>
                                <th scope="col">S.L</th>
                                <th scope="col">Package Name</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Plan Period</th>
                                <th scope="col">Limit</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link to="#" className="text-primary-600">
                                            {item?.name}
                                        </Link>
                                    </td>
                                    <td>{item?.amount}</td>
                                    <td>{item?.plan_period}</td>
                                    <td>{item?.limit}</td>
                                    <td>{moment(item?.created_at).format("MMMM Do YYYY, h:mm:ss A")}</td>
                                    <td>
                                        {item?.status === "1" ? (
                                            <span
                                            onClick={()=>EnableDisablePlan(item?.id)}
                                             className="badge text-sm fw-semibold text-success-600 bg-success-100 px-20 py-9 radius-4 text-white"
                                             >
                                                Active
                                            </span>
                                        ) : (
                                            <span 
                                            className="badge text-sm fw-semibold text-danger-600 bg-danger-100 px-20 py-9 radius-4 text-white"
                                            onClick={()=>EnableDisablePlan(item?.id)}
                                            >
                                                Inactive
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <Link
                                            to="#"
                                            className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                                            data-bs-toggle="modal"
                                            data-bs-target="#myModal"
                                            onClick={() => handleEditClick(item)}
                                        >
                                            <Icon icon="lucide:edit" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default SubscriptionLayers;
