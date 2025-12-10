import React from "react";
import { useParams } from "react-router";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ম্যাপের আইকন ফিক্স করার জন্য (Leaflet এর ডিফল্ট আইকন মাঝে মাঝে মিসিং থাকে)
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const TrackOrder = () => {
  const { id } = useParams();

  // ডামি অর্ডার ডাটা (আপনি চাইলে API দিয়ে লোড করতে পারেন)
  // লজিক:
  // Pending/Processing = Factory Location (Dhaka)
  // Shipped = Delivery Hub (On the way)
  // Delivered = User Location (Chittagong/Home)

  const orderStatus = "Shipped"; // এটা ডাটাবেস থেকে আসবে (dynamic)

  // লোকেশন কো-অর্ডিনেট (Latitude, Longitude)
  const factoryLocation = [23.8103, 90.4125]; // Dhaka (Factory)
  const deliveryHub = [23.4607, 91.1809]; // Comilla (On the way)
  const userLocation = [22.3569, 91.7832]; // Chittagong (Customer)

  // স্ট্যাটাস অনুযায়ী বর্তমান লোকেশন সেট করা
  let currentLocation = factoryLocation;
  let locationText = "Factory, Dhaka";

  if (orderStatus === "Shipped") {
    currentLocation = deliveryHub;
    locationText = "On the way (Comilla Hub)";
  } else if (orderStatus === "Delivered") {
    currentLocation = userLocation;
    locationText = "Delivered at your Doorstep";
  }

  // টাইমলাইন স্টেপস
  const steps = [
    { title: "Order Placed", date: "10 Oct", done: true },
    { title: "Processing", date: "11 Oct", done: true },
    {
      title: "Shipped",
      date: "12 Oct",
      done: orderStatus === "Shipped" || orderStatus === "Delivered",
    },
    {
      title: "Delivered",
      date: "Expected 14 Oct",
      done: orderStatus === "Delivered",
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">
        Track Your Order
      </h2>
      <p className="text-gray-500 mb-8">
        Order ID: <span className="font-mono text-blue-600">#{id}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* বাম পাশ: টাইমলাইন (Timeline) */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold mb-6 border-b pb-2">
            Order Progress
          </h3>
          <ul className="steps steps-vertical w-full">
            {steps.map((step, index) => (
              <li
                key={index}
                className={`step ${step.done ? "step-primary" : ""}`}
              >
                <div className="text-left w-full ml-4">
                  <h4
                    className={`font-bold ${
                      step.done ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-500">{step.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ডান পাশ: ম্যাপ (Live Map) */}
        <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-100 h-96 md:h-auto flex flex-col">
          <h3 className="text-xl font-bold mb-4 px-4 pt-4">Live Location</h3>

          {/* Leaflet Map Component */}
          <div className="flex-grow rounded-lg overflow-hidden border m-4 mt-0 relative z-0">
            <MapContainer
              center={currentLocation}
              zoom={9}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* মার্কার (Marker) */}
              <Marker position={currentLocation}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-bold text-blue-600">
                      Current Location
                    </h3>
                    <p>{locationText}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

          <div className="px-6 pb-4 text-center">
            <p className="text-sm text-gray-500">
              Current Status:{" "}
              <span className="font-bold text-green-600">{locationText}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
