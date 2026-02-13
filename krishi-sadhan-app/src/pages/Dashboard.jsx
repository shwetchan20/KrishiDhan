import React from 'react';

const Dashboard = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">My Profile</h3>
                    <p>Name: User Test</p>
                    <p>Role: Farmer</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Recent Clean Activity</h3>
                    <p>No recent bookings.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
