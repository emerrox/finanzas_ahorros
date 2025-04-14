"use client"

import { router, usePage } from "@inertiajs/react"
import ProtectedLayout from "../Layouts/ProtectedLayout"
import AppLayout from "../Layouts/AppLayout"
import { AuroraText } from "@/components/ui/aurora-text"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { Bot, LineChartIcon as ChartLine, Euro, PiggyBank, TrendingUp, User, Settings, LogOut } from "lucide-react"
import CurrentMonthTransactions from "@/components/CurrentMonthTransactions"
import BudgetsDashboard from "@/components/BudgetsDashboard"
import InvestmentAssets from "@/components/InvestmentAssets"
import React, { useEffect } from "react"
import UserMenu from "@/components/UserMenu"

const Dashboard = () => {
  const data = usePage<{
    data: {
      inversiones: any
      presupuestos: any
      transacciones: {
        fecha: string
        descripcion: string
        monto: number
        tipo: "gasto" | "ingreso"
        categoria: string
      }[]
      user: any
    }
  }>().props.data
  console.log(data)
  console.log(usePage())

  const features = [
    {
      Icon: Euro,
      name: "",
      description: "",
      href: "/transactions",
      cta: "Ir a transacciones",
      background: <CurrentMonthTransactions transactions={data.transacciones} />,
      className:
        "lg:row-start-1 lg:row-end-5 lg:col-start-2 lg:col-end-3 border-[var(--color-pickled-bluewood-100)] border-1",
    },
    {
      Icon: TrendingUp,
      name: "",
      description: "",
      href: "/investments",
      cta: "Ir a inversiones",
      background: <InvestmentAssets assets={data.inversiones} />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-4 border-pickled-bluewood-100 border-1",
    },
    {
      Icon: Bot,
      name: "IA",
      description: "La IA te ayudará a tomar decisiones",
      href: "/",
      cta: "Empezar",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-4 lg:row-end-5 border-pickled-bluewood-100 border-1",
    },
    {
      Icon: ChartLine,
      name: "Analisís",
      description: "Descubre como se comportan tus finanzas",
      href: "/",
      cta: "Ir a análisis",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2 border-pickled-bluewood-100 border-1",
    },
    {
      Icon: PiggyBank,
      name: "",
      description: "",
      href: "/budgets",
      cta: "Ir a presupuestos",
      background: <BudgetsDashboard expenseData={data.presupuestos}/>,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-5 border-pickled-bluewood-100 border-1",
    },
  ]

  const handleLogout = () => {
    router.post(
      "/logout",
      {},
      {
        onStart: () => console.log("Iniciando logout..."),
      },
    )
  }


  return (
    <AppLayout>
      <ProtectedLayout>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl text-pickled-bluewood-900">
            Money
            <AuroraText className="ml-1" colors={["#005A9B", "#4B0082", "#006400", "#8B0000", "#68217A", "#007ACC"]}>
              Mind
            </AuroraText>
          </h1>
        <UserMenu onLogout={handleLogout} settingsUrl="/settings" />


        </div>

        <BentoGrid className="lg:grid-rows-4 grid-cols-3 max-h-[750px] gap-6 w-3/5 mx-auto">
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </ProtectedLayout>
    </AppLayout>
  )
}

export default Dashboard

