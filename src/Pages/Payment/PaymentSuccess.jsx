import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router"; // react-router-dom ব্যবহার করা ভালো
import axios from "axios";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get("transactionId");

    if (id && transactionId && !updated) {
      // 🔥 FIX: { withCredentials: true } যোগ করা হয়েছে 🔥
      axios
        .patch(
          `https://garments-order-production-tracker-s-nu.vercel.app/bookings/payment-success/${id}`,
          { transactionId },
          { withCredentials: true } // এটি ছাড়া পেমেন্ট স্ট্যাটাস আপডেট হবে না
        )
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            setUpdated(true);

            Swal.fire({
              title: "Payment Successful!",
              text: `Order Confirmed! Trans ID: ${transactionId}`,
              icon: "success",
              confirmButtonText: "See My Orders",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/dashboard/my-orders");
              }
            });
          }
        })
        .catch((err) => console.error("Update failed:", err));
    }
  }, [id, location.search, navigate, updated]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-success mb-4">
        Payment Processing...
      </h2>
      <span className="loading loading-spinner loading-lg text-success"></span>
      <p className="mt-2 text-gray-500">Please wait, do not close this page.</p>
    </div>
  );
};

export default PaymentSuccess;
