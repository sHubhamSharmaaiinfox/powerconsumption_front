import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from "react";
import React from 'react'
import { apiPost } from "../services/client";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NewPasswordLayer = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    console.log(token);
    localStorage.setItem('token',token);
    const [password, setPassword] = useState(null);
    const [confirm_password,setConfirmPassword] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error,setError] = useState(null);
    const navigate = useNavigate()


    const newPassword = async () => {
        try {
            setLoading(true)
            const data = { password, confirm_password }
            console.log(data);
            const res = await apiPost('reset-password', data);
            console.log('response',res);
         
            if (res?.data?.status == true) {
                localStorage.setItem('token',res?.data?.token);
                localStorage.setItem('role',res?.data?.role);
            
                if (res?.data?.role=='user'){
                    navigate(`/dashboard`)

                }else if(res?.data?.role=='admin'){
                    navigate(`/admin-dashboard`)
                  }
            } else {
                setError(res?.response?.data?.message);

            }
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <section className="auth bg-base d-flex flex-wrap">
            <div className="auth-left d-lg-block d-none">
                <div className="d-flex align-items-center flex-column h-100 justify-content-center">
                    <img src="assets/images/reset-pass-1.png" alt="" />
                </div>
            </div>
            <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
                <div className="max-w-464-px mx-auto w-100">
                    <div className='sign-in-div'>
                        <Link to="/" className="mb-40 max-w-290-px">
                            <img src="assets/images/power-logo-1.png" alt="" className='sign-in-div-img' />
                        </Link>
                        <h4 className="mb-12">Reset Your Password</h4>
                        <p className="mb-32 text-secondary-light text-lg">
                            please enter password and confirm password
                        </p>
                    </div>
                  
                        <div className="icon-field mb-16">
                            <span className="icon top-50 translate-middle-y">
                                <Icon icon="solar:lock-password-outline" />
                            </span>
                            <input
                                type="password"
                                className="form-control h-56-px bg-neutral-50 radius-12"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>
                        <div className="position-relative mb-20">
                            <div className="icon-field">
                                <span className="icon top-50 translate-middle-y">
                                    <Icon icon="solar:lock-password-outline" />
                                </span>
                                <input
                                    type="password"
                                    className="form-control h-56-px bg-neutral-50 radius-12"
                                    id="your-password"
                                    placeholder="Confirm Password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <span
                                className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                                data-toggle="#your-password"
                            />
                        </div>
                      
                        { loading ? 
                        <button
                            
                            className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                        >
                            {" "}
                            Loading...
                        </button> :

                            <button

                            className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                            onClick={newPassword}
                            >
                            {" "}
                        Continue
                    </button>
                    }
                 
                </div>
            </div>
        </section>
    )
}

export default NewPasswordLayer