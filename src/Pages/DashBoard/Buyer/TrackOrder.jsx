import React from 'react';
import { useParams, Link } from 'react-router'; // react-router-dom হবে
import { useQuery } from '@tanstack/react-query';
import { 
    FaMapMarkerAlt, 
    FaClock, 
    FaClipboardList, 
    FaArrowLeft, 
    FaBoxOpen, 
    FaCheckCircle,
    FaTruck,
    FaCut,
    FaTshirt,
    FaShippingFast
} from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure'; 

const Track_Order = () => {
    // 🔥 FIX 1: useParams থেকে সঠিক নামটা নিতে হবে
    // তোমার রাউটে যদি path="track-order/:orderId" থাকে, তাহলে এখানে orderId লিখতে হবে
    // আর যদি path="track-order/:id" থাকে, তাহলে id লিখতে হবে।
    // নিরাপদ থাকার জন্য আমি ধরে নিচ্ছি রাউটে :id বা :orderId আছে।
    
    const params = useParams(); 
    const id = params.id || params.orderId; // যেটাই আসুক, সেটা id তে রাখবে

    const axiosSecure = useAxiosSecure();

    const { data: order = {}, isLoading } = useQuery({
        queryKey: ['track-order', id],
        enabled: !!id, // id না থাকলে কল করবে না (Error 500 বন্ধ হবে)
        queryFn: async () => {
            // 🔥 FIX 2: id চেক করে কল যাবে
            const res = await axiosSecure.get(`/bookings/${id}`);
            return res.data;
        }
    });

    // আইকন সিলেকশন লজিক
    const getIcon = (status) => {
        if (!status) return <FaClipboardList />;
        const s = status.toLowerCase();
        if (s.includes('cut')) return <FaCut />;
        if (s.includes('sew')) return <FaTshirt />;
        if (s.includes('pack')) return <FaBoxOpen />;
        if (s.includes('ship') || s.includes('delivery')) return <FaShippingFast />;
        if (s.includes('delivered')) return <FaCheckCircle />;
        return <FaClipboardList />;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    const timeline = order.trackingHistory || [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-10 font-sans">
            {/* --- Header Navigation --- */}
            <div className="max-w-6xl mx-auto mb-6">
                <Link to="/dashboard/my-orders" className="btn btn-sm btn-ghost gap-2 text-gray-600 dark:text-gray-300">
                    <FaArrowLeft /> Back to Orders
                </Link>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* --- LEFT COLUMN: TIMELINE --- */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-primary">
                        <FaTruck /> Tracking Timeline
                    </h2>

                    {timeline.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center opacity-60">
                            <FaBoxOpen className="text-6xl mb-4 text-gray-400" />
                            <h3 className="text-xl font-bold">Order Placed Successfully</h3>
                            <p>Detailed production updates will appear here soon.</p>
                        </div>
                    ) : (
                        <div className="relative border-l-4 border-blue-100 dark:border-gray-700 ml-4 space-y-10">
                            {timeline.map((step, index) => {
                                const isLatest = index === timeline.length - 1;
                                return (
                                    <div key={index} className="relative pl-8 md:pl-12 group">
                                        <div className={`absolute -left-[14px] top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                                            isLatest 
                                            ? 'bg-primary text-white border-blue-200 scale-110 shadow-lg shadow-primary/40' 
                                            : 'bg-white dark:bg-gray-700 text-gray-500 border-gray-200 dark:border-gray-600'
                                        }`}>
                                            {getIcon(step.status)}
                                        </div>

                                        <div className={`p-5 rounded-xl border transition-all hover:shadow-md ${
                                            isLatest 
                                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                                            : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'
                                        }`}>
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                                                <h4 className={`text-lg font-bold uppercase tracking-wide ${
                                                    isLatest ? 'text-primary' : 'text-gray-700 dark:text-gray-200'
                                                }`}>
                                                    {step.status}
                                                </h4>
                                                <span className="text-xs font-mono text-gray-500 flex items-center gap-1 mt-1 sm:mt-0">
                                                    <FaClock /> {new Date(step.date).toLocaleString()}
                                                </span>
                                            </div>

                                            {step.location && (
                                                <div className="flex items-center gap-2 text-sm text-secondary font-semibold mb-3">
                                                    <FaMapMarkerAlt />
                                                    <span>{step.location}</span>
                                                </div>
                                            )}

                                            {step.note && (
                                                <div className="bg-base-100 dark:bg-gray-900 p-3 rounded-lg text-sm text-gray-600 dark:text-gray-300 italic border-l-4 border-gray-300">
                                                    "{step.note}"
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* --- RIGHT COLUMN: ORDER INFO --- */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <h3 className="font-bold text-gray-500 text-sm uppercase tracking-wider mb-4">Order Summary</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <img src={order.productImage} alt="Product" className="w-20 h-20 rounded-lg object-cover border" />
                            <div>
                                <h4 className="font-bold text-lg leading-tight">{order.productName}</h4>
                                <span className="badge badge-sm badge-warning mt-1">Order #{order._id?.slice(-6).toUpperCase()}</span>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="opacity-70">Quantity:</span>
                            <span className="font-bold">{order.quantity} pcs</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="opacity-70">Total Price:</span>
                            <span className="font-bold text-primary">${order.totalPrice}</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-4 bg-gray-100 dark:bg-gray-700 border-b dark:border-gray-600 flex justify-between items-center">
                            <h3 className="font-bold text-sm uppercase flex items-center gap-2">
                                <FaMapMarkerAlt className="text-red-500"/> Current Location
                            </h3>
                            <span className="text-xs font-mono opacity-70">Live Update</span>
                        </div>
                        <div className="relative h-64 w-full bg-blue-50 group">
                            <div className="absolute inset-0 opacity-40 bg-[url('https://i.ibb.co/wzkP5Kk/map-pattern.png')] bg-cover bg-center"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                <span className="relative flex h-8 w-8">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-8 w-8 bg-red-500 border-4 border-white shadow-xl"></span>
                                </span>
                                <div className="bg-white px-3 py-1 rounded-full shadow-lg mt-2 text-xs font-bold text-gray-800 whitespace-nowrap">
                                    {timeline.length > 0 ? timeline[timeline.length - 1].location : "Processing Center"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Track_Order;