import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/client";
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { QRCode } from 'react-qrcode-logo';
import { toast,ToastContainer } from "react-toastify";

const PaymentCheckout = () => {

    const [data, setData] = useState(null);
    const [searchParams] = useSearchParams();
    const [qrData, setQrData] = useState(null)
    const plan_id = searchParams.get('plan_id');
    const [imagepath, setImage] = useState(null);
    const [comment, setComment] = useState(null);
    const [base64Image, setBase64Image] = useState("");
    
    const getSubscription = async () => {
        try {
            const data = { plan_id };
            const res = await apiPost("userapp/getMembership", data);
            console.log(res);
            if (res?.data?.status === true) {
                setData(res?.data?.data);
                
            } else {
                console.log(res?.data?.message);
                toast.error("Error")
            }
        } catch (e) {
            console.log(e);

        }
    };


    const getQrData = async () => {
        try {
            const data = { plan_id };
            const res = await apiPost("userapp/createqrcode", data);
            console.log(res);
            if (res?.data?.status === true) {
                setQrData(res?.data?.data);
            } else {
                console.log(res?.data?.message);
            }
        } catch (e) {
            console.log(e);

        }
    };


    const SubmitPayment = async () => {
        try {
            if (!plan_id){
                toast.error("plan id is not defined")
                return 0
            }
         
            else if (!imagepath){
                toast.error("Select Image")
                return 0
            }
            const data = { plan_id ,imagepath,comment};
            const res = await apiPost("userapp/paymentreceived", data);
            console.log(res);
            if (res?.data?.status === true) {
                console.log(res?.data?.data);
                toast.success(res?.data?.message);
            } else {
                console.log(res?.data?.message);
                toast.error("Error")
            }
        } catch (e) {
            console.log(e);

        }
    };



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
          setBase64Image(reader?.result); 
          setImage(reader?.result);
        };
        reader.readAsDataURL(file);
      };


      
      

    useEffect(() => {
        getSubscription();
        getQrData();
    }, []);

    return (
        <div className="d-flex w-100 card">
            <div className="col-lg-12 d-flex w-100 gap-3 card-body">
            <ToastContainer />

                < div className="card col-lg-9">
                    <div className="card-body">

                        <div className="planhead">
                            <h3>Plan Details</h3>
                        </div>
                        <div className="row mt-5">
                            <div className="col">
                                <p className="plan-head">Plan Name</p>
                                <p>{data?.name}</p>
                            </div>
                            <div className="col">
                                <p className="plan-head">Plan Amount</p>
                                <p>₹{data?.amount}</p>
                            </div>
                            <div className="col">
                                <p className="plan-head">Plan duration</p>
                                <p>{data?.plan_period} months</p>
                            </div>
                        </div>
                        <hr />
                        <div className="checkout-det mt-3 col-lg-12 d-flex justify-content-between">
                            <div className="col-lg-6">
                                <h6 className="plan-head  pt-3">Enter Details</h6>
                                <div className="col mt-3">
                                    <label>Add Payment Image</label>
                                    <input type="file" class="form-control" accept="image/*" onChange={handleImageChange} />
                                </div>
                                <div className="col mt-3">
                                    <label>Add Comment</label>
                                    <textarea class="form-control" rows="4" placeholder="Add your comment here" onChange={(e) => setComment(e.target.value)} ></textarea>
                                </div>
                                <div className="col">
                                    <button className="bg-primary-600 bg-hover-primary-700 text-white text-center border border-primary-600 text-sm btn-sm px-12 py-10 w-100 radius-8 mt-28" onClick={SubmitPayment}>Submit</button>
                                </div>
                            </div>
                            <div className="col-lg-6 text-dir">
                                <h6 className="plan-head  pt-3 pb-3">Your Price Summary</h6>

                                <div className="d-flex justify-content-between mb-2">
                                    <div className="col">
                                        <b>Plan Amount:</b>
                                    </div>
                                    <div className="col">
                                        <p className="m-0">₹{data?.amount}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <div className="col">
                                        <b>Extras:</b>
                                    </div>
                                    <div className="col">
                                        <p className="m-0">₹0.00</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <div className="col">
                                        <b>Grand Total:</b>
                                    </div>
                                    <div className="col">
                                        <p className="m-0">₹{data?.amount}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


                <div className="card col-lg-3   ">
                    <div className="card-body">

                        <div className=" d-flex flex-column justify-content-center align-items-center">
                            <div style={{ textAlign: "center", marginTop: "50px" }}>
                                <h2>Scan this QR Code</h2>
                                { qrData ? 
                                <QRCode 
                                value={qrData} 
                                eyeRadius = "CornerRadii"
                                qrStyle = "fluid"
                                logoPaddingStyle = "circle"
                                
                                />: <></>}
                            </div>
                            <p className="pt-3">Pay quickly and securely with WR Code—scan to complete your transaction!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCheckout;
