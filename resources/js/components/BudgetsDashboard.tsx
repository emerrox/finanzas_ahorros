import { Progress } from "./ui/progress"
import React from "react"

type ExpenseCategory = {
  categoria: string
  periodo: string
  monto_limite: number
  gastos: number
  ingresos: number
}

export default function BudgetsDashboard({ expenseData }: { expenseData: ExpenseCategory[] }) {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-2">
      {expenseData.map((category, index) => {
        const percentSpent = (category.gastos / category.monto_limite) * 100
        const isOverLimit = category.gastos > category.monto_limite

        return (
          <div key={index} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">{category.categoria}</h3>
              <div className="text-xs">
                <span className={isOverLimit ? "text-rose-500 font-semibold" : ""}>
                  {category.gastos.toLocaleString("es-ES")} €
                </span>
                {" / "}
                <span>{category.monto_limite.toLocaleString("es-ES")} €</span>
              </div>
            </div>

            <div className="relative">
              <Progress
                value={Math.min(percentSpent, 100)}
                className={`h-2 ${isOverLimit ? "bg-rose-500/20" : "bg-secondary"}`}
                indicatorClassName={isOverLimit ? "bg-rose-500" : "bg-emerald-500"}
              />

              {isOverLimit && (
                <div className="absolute top-0 left-0 w-full flex items-center h-2">
                  <div className="h-full border-r-2 border-background" style={{ width: `${100}%` }} />
                </div>
              )}
            </div>

            {isOverLimit && (
              <p className="text-xs text-rose-500">
                +{(category.gastos - category.monto_limite).toLocaleString("es-ES")} € ({Math.round(percentSpent - 100)}
                %)
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

