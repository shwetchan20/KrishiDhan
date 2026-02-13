import React, { useState } from 'react';

const Register = () => {
    const [role, setRole] = useState('farmer');

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form className="space-y-4">
                <div>
                    <label className="block mb-1">I am a:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="farmer">Farmer (I want to rent)</option>
                        <option value="owner">Equipment Owner (I want to list)</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1">Name</label>
                    <input type="text" className="w-full border p-2 rounded" placeholder="Full Name" />
                </div>
                <div>
                    <label className="block mb-1">Email</label>
                    <input type="email" className="w-full border p-2 rounded" placeholder="Enter email" />
                </div>
                <div>
                    <label className="block mb-1">Password</label>
                    <input type="password" className="w-full border p-2 rounded" placeholder="Create password" />
                </div>
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Register</button>
            </form>
        </div>
    );
};

export default Register;
