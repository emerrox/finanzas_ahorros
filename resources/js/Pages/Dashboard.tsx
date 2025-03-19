// Resources/js/Pages/Dashboard.jsx
import { Link, router, usePage } from '@inertiajs/react';
import ProtectedLayout from '../Layouts/ProtectedLayout';
import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import { AuroraText } from '@/components/ui/aurora-text';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { BellIcon, CalendarIcon, FileTextIcon, GlobeIcon } from 'lucide-react';
import { InputIcon } from '@radix-ui/react-icons';




const Dashboard = () => {
    const features = [
        {
          Icon: FileTextIcon,
          name: "Save your files",
          description: "We automatically save your files as you type.",
          href: "/",
          cta: "Learn more",
          background: <img className="absolute -right-20 -top-20 opacity-60" />,
          className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
        },
        {
          Icon: InputIcon,
          name: "Full text search",
          description: "Search through all your files in one place.",
          href: "/",
          cta: "Learn more",
          background: <img className="absolute -right-20 -top-20 opacity-60" />,
          className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
        },
        {
          Icon: GlobeIcon,
          name: "Multilingual",
          description: "Supports 100+ languages and counting.",
          href: "/",
          cta: "Learn more",
          background: <img className="absolute -right-20 -top-20 opacity-60" />,
          className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
        },
        {
          Icon: CalendarIcon,
          name: "Calendar",
          description: "Use the calendar to filter your files by date.",
          href: "/",
          cta: "Learn more",
          background: <img className="absolute -right-20 -top-20 opacity-60" />,
          className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
        },
        {
          Icon: BellIcon,
          name: "Notifications",
          description:
            "Get notified when someone shares a file or mentions you in a comment.",
          href: "/",
          cta: "Learn more",
          background: <img className="absolute -right-20 -top-20 opacity-60" />,
          className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
        },
      ];
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

                <BentoGrid className="lg:grid-rows-3 grid-cols-3 gap-4 w-1/2">
                    {features.map((feature) => (
                        <BentoCard key={feature.name} {...feature} />
                    ))}
                </BentoGrid>
            </ProtectedLayout>
        </AppLayout>
    );
};

export default Dashboard;