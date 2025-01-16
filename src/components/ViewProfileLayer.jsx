import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState,useEffect } from 'react';
import { apiGet, apiPost } from "../services/client";
import Avatar from 'react-avatar';
import Loading from './Loading';
const ViewProfileLayer = () => {
     const [passwordVisible, setPasswordVisible] = useState(false);
     const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
     const [userData, setUserData] = useState(null);
     const [editItem, setEditItem] = useState({ first_name: '', last_name: '' });
     const [passwordData, setPasswordData] = useState({ new_password: '', confirm_password: '' });
     const [loading, setLoading] = useState(false);
     const [passwordLoading, setPasswordLoading] = useState(false);
    
    // Toggle function for password field
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Toggle function for confirm password field
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };
    const getUserDetails = async () => {
        setLoading(true);
           try {
               const res = await apiGet("userapp/userprofile");
               if (res?.data?.status === true) {
                   setUserData(res?.data?.data);
                   setEditItem({
                       first_name: res?.data?.data?.first_name,
                       last_name: res?.data?.data?.last_name
                   });
               } else {
                   console.error(res?.data?.message);
               }
           } catch (error) {
               console.error(error);
           }finally{
                setLoading(false);
           }
       };
   
       const handleInputChange = (field, value) => {
           setEditItem({ ...editItem, [field]: value });
       };
   
       const EditUser = async () => {
           const data = {
               first_name: editItem.first_name,
               last_name: editItem.last_name,
           };
           console.log(data);       
           setLoading(true);
           try {
               const res = await apiPost("userapp/changeuserProfile", data);
               if (res?.data?.status === true) {
                   console.log("Profile updated successfully");
                   getUserDetails(); // Refresh data
               } else {
                   console.error(res?.data?.message);
               }
           } catch (error) {
               console.error(error);
           } finally {
               setLoading(false);
           }
       };
   
       const handlePasswordChange = (field, value) => {
           setPasswordData({ ...passwordData, [field]: value });
       };
   
       const ChangeUserPassword = async () => {
           const data = {
               password: passwordData.new_password,
               confirm_password: passwordData.confirm_password,
           };  
           console.log(data);
   
           if (data.password !== data.confirm_password) {
               alert("Passwords do not match!");
               return;
           }
   
           setPasswordLoading(true);
           try {
               const res = await apiPost("userapp/ChangeUserPass", data); 
               console.log(res);
               if (res?.data?.status === true) {
                   console.log("Password updated successfully");
                   alert("Password changed successfully");
                   setPasswordData({ new_password: '', confirm_password: '' }); 
               } else {
                   console.error(res?.data?.message);
                   alert(res?.data?.message || "Failed to update password");
               }   
           } catch (error) {
               console.error(error);
               alert("An error occurred while changing the password");
           } finally {
               setPasswordLoading(false);
           }
       };
   
       useEffect(() => {
           getUserDetails();
       }, []);
   
    return (
        <div className="row gy-4">
            {loading && <Loading />}
               <div className="col-lg-8">
                <div className="card h-100">
                    <div className="card-body p-24">
                        <ul
                            className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
                            id="pills-tab"
                            role="tablist"
                        >
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center px-24 active"
                                    id="pills-edit-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-edit-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-edit-profile"
                                    aria-selected="true"
                                >
                                    Edit Profile
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center px-24"
                                    id="pills-change-passwork-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-change-passwork"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-change-passwork"
                                    aria-selected="false"
                                    tabIndex={-1}
                                >
                                    Change Password
                                </button>
                            </li>
                            {/* <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link d-flex align-items-center px-24"
                                    id="pills-notification-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-notification"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-notification"
                                    aria-selected="false"
                                    tabIndex={-1}
                                >
                                    Notification Settings
                                </button>
                            </li> */}
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-edit-profile"
                                role="tabpanel"
                                aria-labelledby="pills-edit-profile-tab"
                                tabIndex={0}
                            >
                                <form action="#">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="mb-20">
                                                <label
                                                    htmlFor="name"
                                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                >
                                                    First Name
                                                    {/* <span className="text-danger-600">*</span> */}
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control radius-8"
                                                    id="name"
                                                    placeholder="Enter First Name"
                                                    value = {editItem.first_name}
                                                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="mb-20">
                                                <label
                                                    htmlFor="name"
                                                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                                                >
                                                    Last Name
                                                  
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control radius-8"
                                                    id="name"
                                                    placeholder="Enter Last Name"
                                                    value = {editItem?.last_name}
                                                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                    {loading ? (
                                            <button className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8">Loading...</button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={EditUser}
                                                className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="pills-change-passwork" role="tabpanel" aria-labelledby="pills-change-passwork-tab" tabIndex="0">
                                <div className="mb-20">
                                    <label htmlFor="your-password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        New Password <span className="text-danger-600">*</span>
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            className="form-control radius-8"
                                            id="your-password"
                                            placeholder="Enter New Password*"
                                            onChange={(e) => handlePasswordChange("new_password", e.target.value)}
                                        />
                                        <span
                                            className={`toggle-password ${passwordVisible ? "ri-eye-off-line" : "ri-eye-line"} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                                            onClick={togglePasswordVisibility}
                                        ></span>
                                    </div>
                                </div>

                                <div className="mb-20">
                                    <label htmlFor="confirm-password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                        Confirm Password <span className="text-danger-600">*</span>
                                    </label>
                                    <div className="position-relative">
                                        <input
                                            type={confirmPasswordVisible ? "text" : "password"}
                                            className="form-control radius-8"
                                            id="confirm-password"
                                            placeholder="Confirm Password*"
                                            onChange={(e) => handlePasswordChange("confirm_password", e.target.value)}
                                        />
                                        <span
                                            className={`toggle-password ${confirmPasswordVisible ? "ri-eye-off-line" : "ri-eye-line"} cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light`}
                                            onClick={toggleConfirmPasswordVisibility}                                        ></span>
                                    </div>
                                </div>
                                

                                <div className="d-flex align-items-center justify-content-center gap-3">
                                <div className="d-flex align-items-center justify-content-center gap-3">
                                        {passwordLoading ? (
                                            <button className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8">Loading...</button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={ChangeUserPassword}
                                                className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                            >
                                                Change Password
                                            </button>
                                        )}
                                    </div>
                                    </div>

                            </div>
                         




                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base ">
                    
                    <div className="pb-24 ms-16 mb-24 me-16 mt-2">
                        <div className="text-center border border-top-0 border-start-0 border-end-0 mt-3">
                        <Avatar name={`${userData?.first_name || ""} ${userData?.last_name || ""}`}/>
                            <h6 className="mb-0 mt-16">{userData?.first_name} {userData?.last_name}</h6>
                            <span className="text-secondary-light mb-16">{userData?.email}</span>
                        </div>
                        <div className="mt-24">
                            <h6 className="text-xl mb-16">Personal Info</h6>
                            <ul>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        Full Name
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {userData?.first_name} {userData?.last_name}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                        Email
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {userData?.email}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                       Username
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {userData?.username}
                                    </span>
                                </li>


                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        {" "}
                                       Refferal Code
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {userData?.refferal_code}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ViewProfileLayer;