// Resources/js/Pages/Dashboard.jsx
import { Link, router, usePage } from '@inertiajs/react';
import ProtectedLayout from '../Layouts/ProtectedLayout';
import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import { AuroraText } from '@/components/ui/aurora-text';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { Bot, ChartLine, Euro,PiggyBank, TrendingUp } from 'lucide-react';
import CurrentMonthTransactions from '@/components/CurrentMonthTransactions';
import BudgetsDashboard from '@/components/BudgetsDashboard';

interface Presupuesto {
  categoria: string;
  monto: number;
}

const TransactionsVisualization = ({ transactions }: { transactions: Presupuesto[] }) => {
    // Calculate total budget
    const totalBudget = transactions.reduce((sum, transactions) => sum + Number(transactions.monto), 0)
  
    // Define colors for different categories
    const getColorClass = (index: number) => {
      const colors = ["bg-emerald-500", "bg-blue-500", "bg-purple-500", "bg-amber-500", "bg-rose-500"]
      return colors[index % colors.length]
    }
  
    return (
      <div className="flex flex-col gap-4 mt-4 px-6">
        {transactions.map((transaction, index) => (
          <div key={index} className="w-full space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-medium">{transaction.categoria}</span>
              <span className="text-sm font-semibold">{transaction.monto} €</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`absolute left-0 top-0 h-full ${getColorClass(index)}`}
                style={{ width: `${(Number(transaction.monto) / totalBudget) * 100}%` }}
              />
            </div>
          </div>
        ))}
  
        <div className="w-full mt-2 flex items-center justify-between rounded-lg bg-muted p-3">
          <span className="text-sm font-medium">Presupuesto total</span>
          <span className="font-bold">{totalBudget} €</span>
        </div>
      </div>
    )
  }
  


const Dashboard = () => {

    const data = usePage<{ data:  {
        inversiones: any,
        presupuestos:any,
        transacciones: {        
          fecha: string;
          descripcion: string;
          monto: number;
          tipo: 'gasto' | 'ingreso';
          categoria: string;
        }[],
        user:any
     } }>().props.data;
    console.log(data);
    console.log(usePage());
    

    const features = [
        {
          Icon: Euro,
          name: "Transacciones",
          description:"",
          href: "/transactions",
          cta: "Ir a transacciones",
          background: <CurrentMonthTransactions transactions={data.transacciones} />,
          className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
        },
        {
          Icon: TrendingUp,
          name: "Inversiones",
          description: "",
          href: "/investments",
          cta: "Ir a inversiones",
          background: <img className="absolute -right-20 -top-20 opacity-60" />,
          className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
        },
        {
          Icon: Bot,
          name: "IA",
          description: "La IA te ayudará a tomar decisiones financieras",
          href: "/",
          cta: "Empezar",
          background: <img className="absolute -right-20 -top-20 opacity-60" />,
          className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
        },
        {
          Icon: ChartLine,
          name: "Analisís",
          description: "Descubre como se comportan tus finanzas",
          href: "/",
          cta: "Ir a análisis",
          background: <img className="absolute -right-20 -top-20 opacity-60" />,
          className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
        },
        {
            Icon: PiggyBank,
            name: "Presupuestos",
            description: "",
            href: "/budgets",
            cta: "Ir a presupuestos",
          background:<BudgetsDashboard expenseData={data.presupuestos} /> ,
          className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
        },
      ];


    const handleLogout = () => {
        router.post('/logout', {}, {
            onStart: () => console.log('Iniciando logout...'),
        });
    };

    return (
        <AppLayout>
            <ProtectedLayout>
                <h1 className='text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl' >Titulo <AuroraText colors={["#005A9B", "#4B0082", "#006400", "#8B0000", "#68217A", "#007ACC"]}>Nombre</AuroraText> </h1>

                <BentoGrid className="lg:grid-rows-3 grid-cols-3 gap-4 w-3/5 mx-auto">
                    {features.map((feature) => (
                        <BentoCard key={feature.name} {...feature} />
                    ))}
                </BentoGrid>
            </ProtectedLayout>
        </AppLayout>
    );
};

export default Dashboard;