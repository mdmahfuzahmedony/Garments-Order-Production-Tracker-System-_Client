import React, { useEffect,useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
    const { id } = useParams(); 
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get('transactionId');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const isCalled = useRef(false);

    useEffect(() => {
        const savePaymentInfo = async () => {
            // 1. চেক করছি প্যারামিটারগুলো ঠিক আছে কিনা
            console.log("🟢 Step 1: Checking Params", { id, transactionId });

            if (!id || !transactionId) {
                console.error("🔴 Missing ID or TransactionID");
                return;
            }

            if (isCalled.current) return;
            isCalled.current = true;

            try {
                console.log("🟡 Step 2: Sending Request to Backend...");
                
                // API কল করা হচ্ছে
                const res = await axiosSecure.patch(`/bookings/payment-success/${id}`, {
                    transactionId: transactionId
                });

                console.log("🟢 Step 3: Backend Response:", res.data);

                // রেসপন্স চেক করা
                if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                    console.log("✅ Success! Showing Alert.");
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        text: `Transaction ID: ${transactionId}`,
                        confirmButtonText: 'See Orders'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/dashboard/my-orders');
                        }
                    });
                } else {
                    console.warn("⚠️ Data not modified. Response:", res.data);
                    // যদি আপডেট না হয়, তবুও ইউজারকে জানিয়ে দেওয়া
                    Swal.fire({
                        icon: 'info',
                        title: 'Already Updated',
                        text: 'This order is already marked as Paid.',
                        confirmButtonText: 'Go to Orders'
                    }).then(() => navigate('/dashboard/my-orders'));
                }

            } catch (error) {
                console.error("🔴 Step 4: Error Occurred:", error);
                // এররটি বিস্তারিত দেখার জন্য
                if(error.response) {
                     console.error("Server Error Data:", error.response.data);
                     console.error("Server Error Status:", error.response.status);
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed!',
                    text: error.message,
                });
            }
        };

        savePaymentInfo();
       
    }, [id, transactionId, axiosSecure, navigate]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <span className="loading loading-spinner loading-lg text-success"></span>
            <h2 className="text-3xl font-bold text-success">Processing Payment...</h2>
            <p className="text-gray-500">Please check console (F12) if stuck.</p>
        </div>
    );
};

export default PaymentSuccess;