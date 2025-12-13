import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const { id } = useParams(); // URL থেকে Order ID
  const navigate = useNavigate();
  const location = useLocation();
  const [updated, setUpdated] = useState(false); // যাতে ডাবল কল না হয়

  useEffect(() => {
    // ১. URL থেকে Transaction ID বের করা
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get("transactionId");

    if (id && transactionId && !updated) {
      // ২. ব্যাকএন্ডে জানিয়ে দেওয়া যে পেমেন্ট হয়েছে
      axios
        .patch(`http://localhost:2001/bookings/payment-success/${id}`, {
          transactionId,
        })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            setUpdated(true);

            // ৩. সফল হওয়ার মেসেজ
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
      <p className="mt-2 text-gray-500">
        Please wait, updating your order status.
      </p>
    </div>
  );
};

export default PaymentSuccess;
