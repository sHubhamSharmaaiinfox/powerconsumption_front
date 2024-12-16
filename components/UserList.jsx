import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';
import { apiGet,apiPost } from "../services/client";
import moment from "moment";

const UserLists = () => {



    const [data, setData] = useState([]);
    const [first_name,setFirstName] = useState(null);
    const [last_name,setLastName] = useState(null);
    const [email,setEmail] = useState(null);
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirm_password,setConfirmPassword] = useState(null);
    const [loading, setLoading] = useState(false);

    const [editItem, setEditItem] = useState(null); // Holds data for the item being edited
        
    


    const CreateUser  = async ()=>{


        try{
            setLoading(true);
            const data  = {

                first_name: editItem?.first_name,
                last_name: editItem?.last_name,
                email: editItem?.email,
                password: editItem?.password,
                confirm_password : confirm_password,
                username : editItem?.username
            }
            
            const res = await apiPost("admin/create-user",data);
            
            getData();
            if (res?.data?.status == true) {
                console.log("success");
                getData();
            } else {
                console.log(res);   

            }
        } catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    const getData = async () => {
        try {
            const res = await apiGet("admin/get-user");
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
     const EnableDisableUser = async (id) =>{
            const data = {id}
            console.log(data);
            try{
                const res  = await apiPost("admin/user-status",data);
                if (res?.data?.status == true){
                getData();
                }else{
                console.log(res);
                }
            }catch(e){
                console.log(e);
            }
    
        } 


        const EditUser = async (id) =>{

          const data = {
            id : editItem?.id,
            first_name: editItem?.first_name,
            last_name: editItem?.last_name,
            email: editItem?.email,
            username : editItem?.username
          }
          console.log(data);
          setLoading(true);
          try{
            const res  = await apiPost("admin/update-user",data);
            getData();
            if (res?.data?.status == true) {
                console.log("success");
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
                <h5 className="card-title mb-0">All Users</h5>
                <Link
                    to="/view-profile"
                    className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2 w-2"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={() => setEditItem({ name: '', amount: '', plan_period: '', limit: '' })}
                >
                    <Icon
                        icon="ic:baseline-plus"
                        className="icon text-xl line-height-1"
                    />
                    Add New User
                </Link>

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
                                {editItem?.id ? 'Edit User' : 'Add New User'}
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">First Name</label>
                                            <input
                                                type="text"     
                                                className="form-control"
                                                value={editItem?.first_name || ''}
                                                onChange={(e) => handleInputChange('first_name', e.target.value)}
                                                
                                                placeholder="Enter first name"
                                            />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label  className="form-label">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editItem?.last_name || ''}
                                                onChange={(e) => handleInputChange('last_name', e.target.value)}
                                                placeholder="Enter last name"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label  className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter email"
                                            value={editItem?.email || ''}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label  className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"    
                                            placeholder="Enter Username"
                                            value={editItem?.username || ''}
                                                onChange={(e) => handleInputChange('username', e.target.value)}
                                        />
                                    </div>



                                    { editItem?.id ? <></> : <>

                                    <div className="mb-3">
                                        <label  className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={editItem?.password || ''}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            placeholder="Enter password"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label  className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm your password"
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                        />
                                    </div>
                                    </>

}

                                    <div className="modal-footer">
                                  


{loading ?  <button  className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32">loading....</button> :
                                       <button
                                       type="button"
                                       onClick={() => editItem?.id ? EditUser(editItem.id) : CreateUser()}
                                       className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                                   >
                                       Save 
                                   </button>
                                       
                                        }
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className="card-body">


                { data? 
                <table
                    className="table bordered-table mb-0"
                    id="dataTable"
                    data-page-length={10}
                >
                    <thead>
                        <tr>
                            <th scope="col">
                                <div className="form-check style-check d-flex align-items-center">

                                    <label className="form-check-label">S.L</label>
                                </div>
                            </th>
                            <th scope="col">Username</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Created At</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {/* <input className="form-check-input" type="checkbox" /> */}
                                    <label>{index + 1}</label>
                                </td>
                                <td>
                                    <Link to="#" className="text-primary-600">
                                        {item?.username}
                                    </Link>
                                </td>
                                <td>{item?.first_name}</td>
                                <td>{item?.last_name}</td>
                                <td>{item?.email}</td>
                                <td>{moment(item?.created_at).format("MMMM Do YYYY, h:mm:ss A")}  </td>
                                <td>
                                    {item?.status === "1" ? (
                                        <span 
                                        onClick={()=>EnableDisableUser(item?.id)}
                                        className="badge text-sm fw-semibold text-success-600 bg-success-100 px-20 py-9 radius-4 text-white   ">Active</span>
                                    ) : (
                                        <span 
                                        onClick={()=>EnableDisableUser(item?.id)}
                                        className="badge text-sm fw-semibold text-danger-600 bg-danger-100 px-20 py-9 radius-4 text-white ">Inactive</span>
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
                </table> :<></>

                    }
            </div>
        </div>

    )
}

export default UserLists