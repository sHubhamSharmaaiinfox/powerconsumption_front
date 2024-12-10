import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from "react";
import React from 'react'
import { apiPost } from "../services/client";
import { Link, useNavigate } from "react-router-dom";

const SignInLayer = () => {


    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false)
    const [error,setError] = useState(null);
    const navigate = useNavigate()


    const LoginUser = async () => {
        try {
           console.log("login user.. ")
            setLoading(true)
            const data = { email, password }
            console.log(data);
            const res = await apiPost('login', data);
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
                    <img src="assets/images/login-image.png" alt="" />
                </div>
            </div>
            <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
                <div className="max-w-464-px mx-auto w-100">
                    <div className='sign-in-div'>
                        <Link to="/" className="mb-40 max-w-290-px">
                            <img src="assets/images/power-logo-1.png" alt="" className='sign-in-div-img'/>
                        </Link>
                        <h4 className="mb-12">Sign In to your Account</h4>
                        <p className="mb-32 text-secondary-light text-lg">
                            Welcome back! please enter your detail
                        </p>
                    </div>
                    <form action="#">
                        <div className="icon-field mb-16">
                            <span className="icon top-50 translate-middle-y">
                                <Icon icon="mage:email" />
                            </span>
                            <input
                                type="email"
                                className="form-control h-56-px bg-neutral-50 radius-12"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)} 
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
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <span
                                className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                                data-toggle="#your-password"
                            />
                        </div>
                        <div className="">
                            <div className="d-flex justify-content-between gap-2">
                                <div className="form-check style-check d-flex align-items-center">
                                    <input
                                        className="form-check-input border border-neutral-300"
                                        type="checkbox"
                                        defaultValue=""
                                        id="remeber"
                                    />
                                    <label className="form-check-label" htmlFor="remeber">
                                        Remember me{" "}
                                    </label>
                                </div>
                                <Link to="forgot-password" className="text-primary-600 fw-medium">
                                    Forgot Password?
                                </Link>
                            </div>
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
onClick={LoginUser}
>
{" "}
Sign In
</button>
}
                        {/* <div className="mt-32 center-border-horizontal text-center">
                            <span className="bg-base z-1 px-4">Or sign in with</span>
                        </div> */}
                        {/* <div className="mt-32 d-flex align-items-center gap-3">
                            <button
                                type="button"
                                className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
                            >
                                <Icon
                                    icon="ic:baseline-facebook"
                                    className="text-primary-600 text-xl line-height-1"
                                />
                                Google
                            </button>
                            <button
                                type="button"
                                className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
                            >
                                <Icon
                                    icon="logos:google-icon"
                                    className="text-primary-600 text-xl line-height-1"
                                />
                                Google
                            </button>
                        </div> */}
                        {/* <div className="mt-32 text-center text-sm">
                            <p className="mb-0">
                                Don’t have an account?{" "}
                                <Link to="/sign-up" className="text-primary-600 fw-semibold">
                                    Sign Up
                                </Link>
                            </p>
                        </div> */}
                    </form>
                </div>
            </div>
        </section>

    )
}

export default SignInLayer