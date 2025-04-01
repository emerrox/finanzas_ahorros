import React from "react"
import { Progress } from "./ui/progress"
import { Badge } from "@/components/ui/badge"

type ExpenseCategory = {
  categoria: string
  periodo: string
  monto_limite: number
  gastos: number
  ingresos: number
}

export default function BudgetsDashboard({ expenseData }: { expenseData: ExpenseCategory[] }) {
  return (
    <div className="w-[90%] m-auto mt-2.5 h-full flex flex-col gap-7 p-3 rounded-lg ">
      <h2 className="text-lg font-semibold text-[var(--color-pickled-bluewood-900)]">Limites y presupuestos</h2>
      {expenseData.map((category, index) => {
        const percentSpent = (category.gastos / category.monto_limite) * 100
        const isOverLimit = category.gastos > category.monto_limite

        return (
          <div key={index} className="space-y-1.5">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <Badge
                  variant="outline"
                  className="h-6 px-3 py-1 text-sm font-medium  bg-pickled-bluewood-100  text-[var(--color-pickled-bluewood-900)]"
                >
                  {category.categoria}
                </Badge>
                <span className="text-xs mt-1 ml-1 text-[var(--color-pickled-bluewood-400)]">{category.periodo}</span>
              </div>

              <div className="text-xs">
                <span className="font-semibold" style={{ color: isOverLimit ? "#E74C3C" : "#2ECC71" }}>
                  {category.gastos.toLocaleString("es-ES")} €
                </span>
                <span className="text-[var(--color-pickled-bluewood-400)]">{" / "}</span>
                <span className="text-[var(--color-pickled-bluewood-400)]">
                  {category.monto_limite.toLocaleString("es-ES")} €
                </span>
              </div>
            </div>

            <div className="relative">
              <Progress
                value={Math.min(percentSpent, 100)}
                className="h-2 bg-[var(--color-pickled-bluewood-50)]"
                indicatorStyle={{
                  backgroundColor: isOverLimit ? "#E74C3C" : "#2ECC71",
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

