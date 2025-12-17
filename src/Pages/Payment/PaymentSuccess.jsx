import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router'; // Link import ঠিক আছে
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
    const { id } = useParams(); // URL থেকে orderId (booking id) পাবো
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get('transactionId'); // আপনার ব্যাকএন্ড URL এ 'transactionId' নাম দিয়েছেন
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        const savePaymentInfo = async () => {
            if (id && transactionId) {
                try {
                    // 🔥 আপনার ব্যাকএন্ড রাউট এবং মেথড (PATCH) অনুযায়ী আপডেট করা হলো
                    const res = await axiosSecure.patch(`/bookings/payment-success/${id}`, {
                        transactionId: transactionId
                    });

                    if (res.data.modifiedCount > 0) {
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
                    }
                } catch (error) {
                    console.error("Payment Save Error", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Payment verified but failed to update database.',
                    });
                } finally {
                    setIsProcessing(false);
                }
            }
        };

        // ডাবল কল এড়াতে চেকিং
        if(isProcessing) {
             savePaymentInfo();
        }
       
    }, [id, transactionId, axiosSecure, navigate]);

    if (isProcessing) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-success"></span>
                <p className="ml-4 text-xl font-bold">Verifying Payment...</p>
            </div>
        );
    }

    return (
        <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-success">Payment Confirmed!</h2>
            <p className="text-gray-500 mt-2">Redirecting to orders...</p>
        </div>
    );
};

export default PaymentSuccess;