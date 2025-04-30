import React from 'react';
import PMDashboard from '../pm/PMDashboard';
import SADashboard from '../sa/SADashboard';

function Home() {
    const roles = localStorage.getItem('roles'); // get role from localStorage
    const username = localStorage.getItem('username');
    return (
        <div className="min-h-screen bg-gray-100">  
            <main>
                {roles === 'PM' && <PMDashboard />}
                {roles === 'SA' && <SADashboard />}
                {!roles && (
                    <p className="p-6 text-red-500">
                        No role found. Please log in again.
                    </p>
                )}
            </main>
        </div>
    );
}

export default Home;
