import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { apiGet, apiPost } from "../services/client";
import Avatar from 'react-avatar';
import Loading from './Loading';
const AdminProfileLayer = () => {
    const [imagePreview, setImagePreview] = useState('assets/images/user-grid/user-grid-img13.png');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [adminData, setAdminData] = useState(null);
    const [editItem, setEditItem] = useState({ first_name: '', last_name: '' });
    const [passwordData, setPasswordData] = useState({ new_password: '', confirm_password: '' });
    const [loading, setLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Toggle functions for password and confirm password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const readURL = (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(input.target.files[0]);
        }
    };

    const getAdminDetails = async () => {
        setLoading(true);
        try {
            const res = await apiGet("admin/admin-profile");
            if (res?.data?.status === true) {
                setAdminData(res?.data?.data);
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

    const EditAdmin = async () => {
        const data = {
            first_name: editItem.first_name,
            last_name: editItem.last_name,
        };
        setLoading(true);
        try {
            const res = await apiPost("admin/profile-update", data);
            if (res?.data?.status === true) {
                console.log("Profile updated successfully");
                getAdminDetails(); // Refresh data
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

    const ChangeAdminPassword = async () => {
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
            const res = await apiPost("admin/change-password", data); 
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
        getAdminDetails();
    }, []);

    return (
        <div className="row gy-4">
            {loading ? <Loading/> : null}   
                <div className="col-lg-8">
                <div className="card h-100">
                    <div className="card-body p-24">
                        <ul className="nav border-gradient-tab nav-pills mb-20 d-inline-flex" id="pills-tab" role="tablist">
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
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            {/* Edit Profile Section */}
                            <div className="tab-pane fade show active" id="pills-edit-profile" role="tabpanel" aria-labelledby="pills-edit-profile-tab" tabIndex={0}>
                                {/* <h6 className="text-md text-primary-light mb-16">Profile Image</h6> */}
                                {/* <div className="mb-24 mt-16">
                                    <div className="avatar-upload">
                                        <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                accept=".png, .jpg, .jpeg"
                                                hidden
                                                onChange={readURL}
                                            />
                                            <label htmlFor="imageUpload" className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle">
                                                <Icon icon="solar:camera-outline" className="icon"></Icon>
                                            </label>
                                        </div>
                                        <div className="avatar-preview">
                                            <div
                                                id="imagePreview"
                                                style={{
                                                    backgroundImage: `url(${imagePreview})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div> */}
                                <form>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="mb-20">
                                                <label htmlFor="first-name" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control radius-8"
                                                    id="first-name"
                                                    value={editItem.first_name}
                                                    placeholder="Enter First Name"
                                                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="mb-20">
                                                <label htmlFor="last-name" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control radius-8"
                                                    id="last-name"
                                                    value={editItem.last_name}
                                                    placeholder="Enter Last Name"
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
                                                onClick={EditAdmin}
                                                className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                            {/* Change Password Section */}
                            <div className="tab-pane fade" id="pills-change-passwork" role="tabpanel" aria-labelledby="pills-change-passwork-tab" tabIndex={1}>
                        
                                    <div className="mb-20">
                                        <label htmlFor="new-password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            New Password
                                        </label>
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            className="form-control radius-8"
                                            id="new-password"
                                            value={passwordData.new_password}
                                            placeholder="Enter New Password"
                                            onChange={(e) => handlePasswordChange("new_password", e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="btn btn-link text-primary-light mt-2"
                                        >
                                            {passwordVisible ? "Hide" : "Show"} Password
                                        </button>
                                    </div>
                                    <div className="mb-20">
                                        <label htmlFor="confirm-password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Confirm Password
                                        </label>
                                        <input
                                            type={confirmPasswordVisible ? "text" : "password"}
                                            className="form-control radius-8"
                                            id="confirm-password"
                                            value={passwordData.confirm_password}
                                            placeholder="Confirm Password"
                                            onChange={(e) => handlePasswordChange("confirm_password", e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={toggleConfirmPasswordVisibility}
                                            className="btn btn-link text-primary-light mt-2"
                                        >
                                            {confirmPasswordVisible ? "Hide" : "Show"} Password
                                        </button>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                        {passwordLoading ? (
                                            <button className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8">Loading...</button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={ChangeAdminPassword}
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
            <div className="col-lg-4">
                {/* Admin Profile Card */}
                <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base ">
                    <div className="pb-24 ms-16 mb-24 me-16 mt-2">
                        <div className="text-center border border-top-0 border-start-0 border-end-0 mt-3">
                        <Avatar name={`${adminData?.first_name || ""} ${adminData?.last_name || ""}`} />
                            <h6 className="mb-0 mt-16">{adminData?.first_name} {adminData?.last_name}</h6>
                            <span className="text-secondary-light mb-16">{adminData?.email}</span>
                        </div>
                        <div className="mt-24">
                            <h6 className="text-xl mb-16">Personal Info</h6>
                            <ul>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        Full Name
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {adminData?.first_name} {adminData?.last_name}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        Email
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {adminData?.email}
                                    </span>
                                </li>
                                <li className="d-flex align-items-center gap-1 mb-12">
                                    <span className="w-30 text-md fw-semibold text-primary-light">
                                        Username
                                    </span>
                                    <span className="w-70 text-secondary-light fw-medium">
                                        : {adminData?.username}
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

export default AdminProfileLayer;
