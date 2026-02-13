import React from 'react';

// 1. Accept the 't' prop
const Dashboard = ({ t }) => {
    return (
        <div>
            {/* 2. Page Title Translation */}
            <h2 className="text-3xl font-bold mb-6">{t('dashboard') || 'Dashboard'}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg shadow">
                    {/* 3. Profile Section Labels */}
                    <h3 className="text-xl font-semibold mb-2">{t('my_profile') || 'My Profile'}</h3>
                    <p><span className="font-medium">{t('name') || 'Name'}:</span> User Test</p>
                    <p><span className="font-medium">{t('role_label') || 'Role'}:</span> {t('role_farmer') || 'Farmer'}</p>
                </div>

                <div className="p-6 bg-white rounded-lg shadow">
                    {/* 4. Activity Section */}
                    <h3 className="text-xl font-semibold mb-2">{t('recent_activity') || 'Recent Activity'}</h3>
                    <p className="text-gray-500">{t('no_recent_bookings') || 'No recent bookings.'}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;