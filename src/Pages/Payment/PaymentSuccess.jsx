import React, { useEffect, useRef } from 'react'; // useRef import করুন
import { useParams, useSearchParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
    const { id } = useParams(); 
    const [searchParams] = useSearchParams();
    const transactionId = searchParams.get('transactionId');
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    
    // ডাবল কল আটকাতে useRef ব্যবহার
    const isCalled = useRef(false);

    useEffect(() => {
        const savePaymentInfo = async () => {
            // যদি আগে একবার কল হয়ে থাকে, তবে আর কল করবে না
            if (isCalled.current) return;
            isCalled.current = true;

            if (id && transactionId) {
                try {
                    const res = await axiosSecure.patch(`/bookings/payment-success/${id}`, {
                        transactionId: transactionId
                    });

                    // 🔥 ফিক্স: modifiedCount > 0 অথবা matchedCount > 0 চেক করা
                    // matchedCount > 0 মানে ডাটা পাওয়া গেছে (হয়তো আগেই আপডেট হয়েছে)
                    if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
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
                        text: 'Failed to update payment info.',
                    });
                }
            }
        };

        savePaymentInfo();
       
    }, [id, transactionId, axiosSecure, navigate]);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <span className="loading loading-spinner loading-lg text-success"></span>
            <h2 className="text-3xl font-bold text-success">Processing Payment...</h2>
            <p className="text-gray-500">Please wait while we confirm your order.</p>
        </div>
    );
};

export default PaymentSuccess;