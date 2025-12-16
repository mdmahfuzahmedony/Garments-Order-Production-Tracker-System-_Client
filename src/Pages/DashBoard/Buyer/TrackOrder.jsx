import React from 'react';
import { useParams, Link } from 'react-router'; 
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
    
    const params = useParams(); 
    const id = params.id || params.orderId; 

    const axiosSecure = useAxiosSecure();

    const { data: order = {}, isLoading } = useQuery({
        queryKey: ['track-order', id],
        enabled: !!id, 
        queryFn: async () => {
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
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-[#03131E]">
                <span className="loading loading-bars loading-lg text-teal-500"></span>
            </div>
        );
    }

    const timeline = order.trackingHistory || [];

    return (
        // 1. Background: Matched with other pages (Gradient & Texture)
        <div className="min-h-screen p-4 md:p-10 font-sans transition-colors duration-300 relative
            bg-gradient-to-br from-gray-50 to-teal-50/30 
            dark:from-[#03131E] dark:to-[#0b1120]">
            
            {/* Background Texture (Dots) */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(#14b8a6 1px, transparent 1px)", backgroundSize: "25px 25px" }}>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* --- Header Navigation --- */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <p className="text-teal-500 dark:text-teal-400 font-bold tracking-widest uppercase text-xs mb-1">Live Tracking</p>
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            Track <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Order</span>
                        </h2>
                    </div>
                    <Link to="/dashboard/my-orders" className="btn btn-sm btn-ghost gap-2 text-gray-500 hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all">
                        <FaArrowLeft /> <span className="hidden sm:inline">Back to Orders</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* --- LEFT COLUMN: TIMELINE --- */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#151f32] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-10 transition-all">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">
                            <FaTruck className="text-teal-500" /> Production Timeline
                        </h2>

                        {timeline.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                                <FaBoxOpen className="text-6xl mb-4 text-gray-300 dark:text-gray-600" />
                                <h3 className="text-xl font-bold text-gray-500">Order Placed Successfully</h3>
                                <p className="text-gray-400">Detailed production updates will appear here soon.</p>
                            </div>
                        ) : (
                            <div className="relative border-l-2 border-dashed border-teal-100 dark:border-gray-700 ml-4 space-y-12">
                                {timeline.map((step, index) => {
                                    const isLatest = index === timeline.length - 1;
                                    return (
                                        <div key={index} className="relative pl-8 md:pl-12 group">
                                            {/* Timeline Dot Icon */}
                                            <div className={`absolute -left-[18px] top-0 w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                                                isLatest 
                                                ? 'bg-gradient-to-r from-teal-400 to-emerald-500 text-white border-teal-100 dark:border-teal-900 shadow-lg shadow-teal-500/40 scale-110' 
                                                : 'bg-white dark:bg-[#151f32] text-gray-400 border-gray-100 dark:border-gray-700'
                                            }`}>
                                                {getIcon(step.status)}
                                            </div>

                                            {/* Content Card */}
                                            <div className={`p-6 rounded-xl border transition-all duration-300 ${
                                                isLatest 
                                                ? 'bg-teal-50/50 dark:bg-teal-900/10 border-teal-200 dark:border-teal-800 shadow-md' 
                                                : 'bg-white dark:bg-[#0b1120] border-gray-100 dark:border-gray-800 hover:border-teal-200 dark:hover:border-teal-800'
                                            }`}>
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
                                                    <h4 className={`text-lg font-bold uppercase tracking-wide ${
                                                        isLatest ? 'text-teal-700 dark:text-teal-400' : 'text-gray-700 dark:text-gray-300'
                                                    }`}>
                                                        {step.status}
                                                    </h4>
                                                    <span className="text-xs font-mono text-gray-500 flex items-center gap-1 mt-1 sm:mt-0 bg-white dark:bg-[#151f32] px-2 py-1 rounded border border-gray-100 dark:border-gray-700">
                                                        <FaClock className="text-teal-400" /> {new Date(step.date).toLocaleString()}
                                                    </span>
                                                </div>

                                                {step.location && (
                                                    <div className="flex items-center gap-2 text-sm font-semibold mb-3 text-gray-600 dark:text-gray-400">
                                                        <FaMapMarkerAlt className="text-red-400" />
                                                        <span>{step.location}</span>
                                                    </div>
                                                )}

                                                {step.note && (
                                                    <div className="bg-white dark:bg-[#151f32] p-3 rounded-lg text-sm text-gray-500 dark:text-gray-400 italic border-l-4 border-teal-300 dark:border-teal-700 shadow-sm">
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
                        {/* Summary Card */}
                        <div className="bg-white dark:bg-[#151f32] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 transition-all hover:shadow-2xl hover:shadow-teal-500/5">
                            <h3 className="font-bold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-widest mb-4 border-b border-gray-100 dark:border-gray-700 pb-2">Order Summary</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="avatar">
                                    <div className="w-20 h-20 rounded-xl ring-1 ring-gray-100 dark:ring-gray-700">
                                        <img src={order.productImage} alt="Product" className="object-cover" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg leading-tight text-gray-800 dark:text-white">{order.productName}</h4>
                                    <span className="badge mt-2 bg-orange-100 text-orange-600 border-0 text-xs font-bold">Order #{order._id?.slice(-6).toUpperCase()}</span>
                                </div>
                            </div>
                            
                            <div className="space-y-3 bg-gray-50 dark:bg-[#0b1120] p-4 rounded-xl">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Quantity:</span>
                                    <span className="font-bold text-gray-800 dark:text-white">{order.quantity} pcs</span>
                                </div>
                                <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-gray-500">Total Price:</span>
                                    <span className="font-extrabold text-teal-500 text-lg">${order.totalPrice}</span>
                                </div>
                            </div>
                        </div>

                        {/* Map Card */}
                        <div className="bg-white dark:bg-[#151f32] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                            <div className="p-4 bg-gray-50 dark:bg-[#0b1120] border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="font-bold text-xs uppercase flex items-center gap-2 text-gray-600 dark:text-gray-300 tracking-wider">
                                    <FaMapMarkerAlt className="text-red-500"/> Current Location
                                </h3>
                                <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
                            </div>
                            <div className="relative h-64 w-full bg-blue-50 dark:bg-gray-800 group">
                                {/* Map Pattern Placeholder */}
                                <div className="absolute inset-0 opacity-30 dark:opacity-10 bg-[url('https://i.ibb.co/wzkP5Kk/map-pattern.png')] bg-cover bg-center"></div>
                                
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                    <span className="relative flex h-8 w-8">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-8 w-8 bg-red-500 border-4 border-white dark:border-gray-800 shadow-xl"></span>
                                    </span>
                                    <div className="bg-white dark:bg-[#151f32] px-4 py-2 rounded-full shadow-lg mt-3 text-xs font-bold text-gray-800 dark:text-white whitespace-nowrap border border-gray-100 dark:border-gray-700">
                                        {timeline.length > 0 ? timeline[timeline.length - 1].location : "Processing Center"}
                                    </div>
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