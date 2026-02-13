import React from 'react';

const Login = () => {
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form className="space-y-4">
                <div>
                    <label className="block mb-1">Email</label>
                    <input type="email" className="w-full border p-2 rounded" placeholder="Enter email" />
                </div>
                <div>
                    <label className="block mb-1">Password</label>
                    <input type="password" className="w-full border p-2 rounded" placeholder="Enter password" />
                </div>
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
            </form>
        </div>
    );
};

export default Login;
