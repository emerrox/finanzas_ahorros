// Resources/js/Pages/Dashboard.jsx
import { router } from '@inertiajs/react';
import ProtectedLayout from '../Layouts/ProtectedLayout';
import React from 'react';

const Dashboard = () => {
    const handleLogout = () => {
        router.post('/logout', {}, {
            onStart: () => console.log('Iniciando logout...'),
        });
    };

    return (
        <ProtectedLayout>
            <div className="dashboard-container">
                <h1>Panel de Control</h1>
                {/* Resto de tu contenido */}
                
                <button 
                    onClick={handleLogout}
                    className="logout-button"
                >
                    Cerrar Sesión
                </button>
            </div>
        </ProtectedLayout>
    );
};

export default Dashboard;