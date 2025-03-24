"use client"

import { useState } from "react"
import { PiggyBank } from "lucide-react"
import { BentoCard } from "./ui/bento-grid"
import React from "react"

interface BudgetCategory {
  name: string
  amount: number
  color: string
}

export default function BudgetBento() {
  const [categories] = useState<BudgetCategory[]>([
    { name: "Alimentación", amount: 400, color: "bg-emerald-500" },
    { name: "Transporte", amount: 200, color: "bg-blue-500" },
    { name: "Vivienda", amount: 800, color: "bg-purple-500" },
  ])

  const totalBudget = categories.reduce((sum, category) => sum + category.amount, 0)

  // Create the background content for the BentoCard
  const budgetBackground = (
    <div className="flex flex-col items-center gap-4 mt-4 px-6">
      {categories.map((category, index) => (
        <div key={index} className="w-full space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-medium">{category.name}</span>
            <span className="text-sm font-semibold">{category.amount} €</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={`absolute left-0 top-0 h-full ${category.color}`}
              style={{ width: `${(category.amount / totalBudget) * 100}%` }}
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

  return (
    <BentoCard
      name="Presupuestos"
      className="lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4"
      background={budgetBackground}
      Icon={PiggyBank}
      description=""
      href="/budgets"
      cta="Ir a presupuestos"
    />
  )
}

