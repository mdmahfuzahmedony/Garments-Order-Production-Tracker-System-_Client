import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider'; // আপনার অথ কন্টেক্সট পাথ

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // ১. লোডিং অবস্থায় স্পিনার দেখানো
    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>;
    }

    // ২. ইউজার থাকলে চিলড্রেন কম্পোনেন্ট রিটার্ন করা
    if (user) {
        return children;
    }

    // ৩. ইউজার না থাকলে লগইন পেজে রিডাইরেক্ট করা (স্টেট সহ, যাতে লগইনের পর আগের পেজে ফিরে আসে)
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;