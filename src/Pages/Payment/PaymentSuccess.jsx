import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router'; 
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
    const { tranId } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        // ১. সাকসেস অ্যালার্ট দেখানো
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Payment Successful!',
            text: `Transaction ID: ${tranId}`,
            showConfirmButton: false,
            timer: 2000
        });

        // ২. সাথে সাথে My Orders পেজে পাঠিয়ে দেওয়া
        navigate('/dashboard/my-orders');
        
    }, [tranId, navigate]);

    // যতক্ষণ রিডাইরেক্ট হচ্ছে, ততক্ষণ শুধু একটা লোডিং স্পিনার ঘুরবে
    return (
        <div className="flex justify-center items-center h-screen bg-base-200">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );
};

export default PaymentSuccess;