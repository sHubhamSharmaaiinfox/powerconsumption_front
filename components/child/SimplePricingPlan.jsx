import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState, useEffect } from 'react';
import { apiGet } from "../../services/client";
import { Link } from 'react-router-dom';
const SimplePricingPlan = () => {

    const [subscriptionData, setSubscriptionData] = useState([]);

    const getSubscription = async () => {
        try {
            const res = await apiGet("userapp/membershipplan");
            if (res?.data?.status === true) {
              
                setSubscriptionData(res?.data?.data);
                console.log('sub', res?.data?.data);
                console.log('mydata',subscriptionData);
            } else {
                console.log(res?.data?.message);
                
            }
        } catch (e) {
            console.log(e);
        
        }
    };

    useEffect(() => {
        getSubscription();
    }, []);

    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden mt-24">
            <div className="card-header border-bottom bg-base py-16 px-24">
                <h6 className="mb-0 text-lg">Simple Pricing Plan</h6>
            </div>
            <div className="card-body p-40">
                <div className="row justify-content-center">
                    <div className="col-xxl-10">
                        <div className="row gy-4" >
                    {subscriptionData?.map((item,index ) => ( 
                        
                        <div className="col-xxl-4 col-sm-6"  >
                                <div className="pricing-plan position-relative radius-24 overflow-hidden border bg-base">
                                    <div className="d-flex align-items-center gap-16">
                                        <span className="w-72-px h-72-px d-flex justify-content-center align-items-center radius-16 bg-primary-50">
                                            <img src="assets/images/pricing/price-icon4.png" alt="" />
                                        </span>
                                        <div className="">
                                            <span className="fw-medium text-md text-secondary-light">
                                                For individuals
                                            </span>
                                            <h6 className="mb-0">{item?.name}</h6>
                                        </div>
                                    </div>
                                    <p className="mt-16 mb-0 text-secondary-light mb-28">
                                    Get premium access with our subscription exclusive features, priority support, and regular updates!{" "}
                                    </p>
                                    <h3 className="mb-24">
                                    {item?.amount}{" "}
                                        <span className="fw-medium text-md text-secondary-light">
                                            {item?.plan_period}/monthly
                                        </span>{" "}
                                    </h3>
                                    <span className="mb-20 fw-medium">What’s included</span>
                                    <ul>
                                        <li className="d-flex align-items-center gap-16 mb-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-white text-lg "
                                                />
                                            </span>
                                            <span className="text-secondary-light text-lg">
                                                All analytics features
                                            </span>
                                        </li>
                                        <li className="d-flex align-items-center gap-16 mb-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-white text-lg "
                                                />
                                            </span>
                                            <span className="text-secondary-light text-lg">
                                                Up to 250,000 tracked visits
                                            </span>
                                        </li>
                                        <li className="d-flex align-items-center gap-16 mb-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-white text-lg "
                                                />
                                            </span>
                                            <span className="text-secondary-light text-lg">
                                                Normal support
                                            </span>
                                        </li>
                                        <li className="d-flex align-items-center gap-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-white text-lg "
                                                />
                                            </span>
                                            <span className="text-secondary-light text-lg">
                                                Up to 3 team members
                                            </span>
                                        </li>
                                    </ul>
                                    <button

                                        className="bg-primary-600 bg-hover-primary-700 text-white text-center border border-primary-600 text-sm btn-sm px-12 py-10 w-100 radius-8 mt-28"

                                    >
                                        <Link to="/Checkout-User">
                                        Get Started
                                        </Link>
                                    </button>
                                </div>
                            </div>
                     
                            
                       
                     ))}
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimplePricingPlan