import React, { useContext } from 'react';
import { AuthContext } from '../../../Provider/Authprovider';

const MyProfile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="card w-96 bg-base-100 shadow-xl border border-gray-200">
                <figure className="px-10 pt-10">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL || "https://i.ibb.co/T0x2y5t/user.png"} alt="profile" />
                        </div>
                    </div>
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl">{user?.displayName || "User Name"}</h2>
                    <p className="text-gray-500">{user?.email}</p>
                    
                    <div className="badge badge-primary badge-outline mt-2">Active Member</div>

                    <div className="card-actions mt-6 w-full">
                        <button className="btn btn-primary w-full">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;