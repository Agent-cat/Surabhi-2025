import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserDetails = () => {
    const { email } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/verify-user?email=${email}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUser(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch user details");
            }
        };

        fetchUserDetails();
    }, [email]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-50  p-4 rounded-lg border border-red-200">
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32  bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl  mx-auto bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4  border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                </div>

                <div className="px-6 py-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-900">{user.email}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium text-gray-900">{user.fullName}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">College</p>
                            <p className="font-medium text-gray-900">{user.college}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">College ID</p>
                            <p className="font-medium text-gray-900">{user.collegeId}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">State</p>
                            <p className="font-medium text-gray-900">{user.state}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium text-gray-900">{user.address}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">Payment Status</p>
                            <p className="font-medium text-gray-900">{user.paymentStatus}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="font-medium text-gray-900">{user.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails; 