// Resources/js/Pages/Dashboard.jsx
import { Link, router, usePage } from '@inertiajs/react';
import ProtectedLayout from '../Layouts/ProtectedLayout';
import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import { AuroraText } from '@/components/ui/aurora-text';

const Dashboard = () => {

    const data = usePage().props;
    console.log(data);

    const handleLogout = () => {
        router.post('/logout', {}, {
            onStart: () => console.log('Iniciando logout...'),
        });
    };

    return (
        <AppLayout>
            <ProtectedLayout>
                <nav>
                    <ul>
                        <li>
                            <Link href="dashboard" >Panel de Control</Link>
                        </li>

                        <li>
                            <Link href='budgets'>Presupuestos</Link>
                        </li>

                        <li>
                            <Link href="investments">Inversiones</Link>
                        </li>

                        <li>
                            <Link href="transactions">Transacciones</Link>
                        </li>
                    </ul>
                </nav>

                <h1 className='text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl' >Titulo <AuroraText colors={["#005A9B", "#4B0082", "#006400", "#8B0000", "#68217A", "#007ACC"]}>Nombre</AuroraText> </h1>
                
                <div className="dashboard-container">
                </div>
            </ProtectedLayout>
        </AppLayout>
    );
};

export default Dashboard;