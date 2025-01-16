
import React, { useState, useEffect } from 'react';
import { apiGet, apiPost } from "../services/client";
import { toast,ToastContainer } from 'react-toastify';
import Loading from './Loading';
const PaymentForm =() =>{




    const [Merchant_name,setMerchantName] = useState(null);
    const [upi_id,setUpi] = useState(null);

    const [loading,setLoading] = useState(false);
     const getQrData = async () => {
        setLoading(true);
        try {

            const res = await apiGet("superadmin/get-qr-detail"); // API call to fetch user details
            

            if (res?.data?.status === true) {
             
                setMerchantName(res?.data?.data?.Merchant_name);
                setUpi(res?.data?.data?.upi_id);
            } else {
                console.log(res?.data?.message); // Handle error messages
            }
        } catch (e) {
            console.log(e); // Log any errors
        }finally
        {
            setLoading(false);
        }
    };

    const saveData  = async ()=>{

        try {
            setLoading(true);
            const data  = {upi_id,Merchant_name}
            const res = await apiPost("superadmin/createupiid",data); // API call to fetch user details
            //console.log("userdata",res);

            if (res?.data?.status === true) {
                toast.success("Success");
            } else {
                toast.error("error")
            }
        } catch (e) {
            console.log(e); // Log any errors
        } finally{
            setLoading(false);  
        }

    };



        useEffect(() => {
            getQrData();
             
        }, []);
    
    return(
       
    <div className="card p-3">
        {loading && <Loading/>}
         <ToastContainer/>
        <div className="card-body">
        <form action="#">
       
       <div className="col-sm-5">
           <div className="mb-20">
               <label
                   htmlFor="name"
                   className="form-label fw-semibold text-primary-light text-sm mb-8"
               >
                   UPI ID
                   {/* <span className="text-danger-600">*</span> */}
               </label>
               <input
                   type="text"
                   className="form-control radius-8"
                   id="name"
                   placeholder="Enter UPI ID"
                   value={upi_id}
                   onChange={(e) => setUpi(e.target.value)}
                  
               />
           </div>
       </div>

       <div className="col-sm-5">
           <div className="mb-20">
               <label
                   htmlFor="name"
                   className="form-label fw-semibold text-primary-light text-sm mb-8"
                   
               >
                   Merchant Name
                 
               </label>
               <input
                   type="text"
                   className="form-control radius-8"
                   id="name"
                   placeholder="Enter Merchant Name"
                   value={Merchant_name}
                   onChange={(e) => setMerchantName(e.target.value)}
               />
           </div>
       </div>

  
   <div className="d-flex align-items-center  gap-3">
    { loading ? 
       <button
           type="button"
           className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
       >
           loading...
       </button>:
        <button
        type="button"
        className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
        onClick={saveData}
    >
        save
    </button>


    }
   </div>
</form>
        </div>
    </div>
    )
}

export default PaymentForm