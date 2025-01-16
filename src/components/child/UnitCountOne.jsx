import React from 'react'
import { Icon } from '@iconify/react';
import { apiGet, apiPost } from "../../services/client";
import { useState, useEffect } from "react";
import Loading from '../Loading';
const UnitCountOne = () => {

    const [totalMeters,setTotalMeters] = useState(0);
    const [overallConsumption,setOverallConsumption] = useState(0);
    const [max_dropdown,setMaxDropdown] = useState(0);
    const [powerGrowthRate,setPowerGrowthRate] = useState(0);
    const [todays_power_consumed,setTodaysPowerConsumed] = useState(0);
    const [monthly_power_consumed,setMonthlyPowerConsumed] = useState(0);
    const [peak_power_today,setPeakPowerToday] = useState(0);
    const [peak_power_this_month,setPeakPowerThisMonth] = useState(0);
    const [all_time_peak_power,setAllTimePeakPower] = useState(0);
    const [loading, setLoading] = useState(false);

    const getMeterData = async () =>{
        setLoading(true);

        try{

            const res = await apiGet('userapp/meters-data');
           
            if (res?.data?.status == true){
                console.log(res);
                setTotalMeters(res?.data?.Total_meters);
                setOverallConsumption(res?.data?.overall_consumption);
                setMaxDropdown(res?.data?.max_dropdown);
                setPowerGrowthRate(res?.data?.power_growth_rate);
                setTodaysPowerConsumed(res?.data?.todays_power_consumed);
                setMonthlyPowerConsumed(res?.data?.monthly_power_consumed);
                setPeakPowerToday(res?.data?.peak_power_today);
                setPeakPowerThisMonth(res?.data?.peak_power_this_month);
                setAllTimePeakPower(res?.data?.all_time_peak_power);
            }
            else{
                console.log(res?.data?.message)
            }


        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }


    useEffect(() => {
        getMeterData();

      }, []);
    return (
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4 card-design">
            {loading && <Loading />}
            <div className="col">
                <div className="card shadow-none border bg-gradient-start-1 h-100 card-1">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Total Meters</p>
                                <h6 className="mb-0">{totalMeters}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                   icon="token:meter"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col">
                <div className="card shadow-none border bg-gradient-start-2 h-100 card-2">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Total Active Power (KWH)
                                </p>
                                <h6 className="mb-0">{overallConsumption}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                     icon="carbon:power"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border  h-100 card-3">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">
                                    Today's kVah
                                </p>
                                <h6 className="mb-0">{todays_power_consumed}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                   icon="ic:baseline-moving"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
              
                    </div>
                </div>
                {/* card end */}
            </div>
            <div className="col">
                <div className="card shadow-none border h-100 bg-gradient-start-4 card-4">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">This Month Active Power</p>
                                <h6 className="mb-0">{monthly_power_consumed}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                   icon="zmdi:notifications-active"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
            
                    </div>
                </div>
                
            </div>

            <div className="col">
                <div className="card shadow-none border bg-gradient-start-4 h-100 card-5">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Peak KW Today</p>
                                <h6 className="mb-0">{peak_power_today}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                   icon="hugeicons:activity-01"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col">
                <div className="card shadow-none border bg-gradient-start-4 h-100 card-6">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Peak KW This month</p>
                                <h6 className="mb-0">{peak_power_this_month}</h6>
                            </div>
                            <div className="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                     icon="hugeicons:activity-01"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="col">
                <div className="card shadow-none border bg-gradient-start-5 h-100 card-7">
                    <div className="card-body p-20">
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div>
                                <p className="fw-medium text-primary-light mb-1">Peak KW Altime</p>
                                <h6 className="mb-0">{all_time_peak_power}</h6>
                            </div>

                            <div className="w-50-px h-50-px bg-yellow rounded-circle d-flex justify-content-center align-items-center">
                                <Icon
                                    icon="hugeicons:activity-01"
                                    className="text-white text-2xl mb-0"
                                />
                            </div>
                        </div>
        
                    </div>
                </div>
             
            </div>
        </div>

    )
}

export default UnitCountOne