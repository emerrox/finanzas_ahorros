import React from "react"
import { Progress } from "./ui/progress"

type ExpenseCategory = {
  categoria: string
  periodo: string
  monto_limite: number
  gastos: number
  ingresos: number
}

export default function BudgetsDashboard({ expenseData }: { expenseData: ExpenseCategory[] }) {
  // Custom color palette for text and subtle elements using the new palette
  const colors = {
    background: "#fffbeb",
    text: "#773310",
    muted: "#913e0f",
    shadow: "rgba(215, 116, 8, 0.1)",
    limit: "#b2510b",
  }

  const categoryColor = "#f39c12" // orange

  // Function to format period text
  const formatPeriod = (period: string) => {
    switch (period.toLowerCase()) {
      case "mensual":
        return "Mensual"
      case "diario":
        return "Diario"
      case "anual":
        return "Anual"
      default:
        return period
    }
  }

  return (
    <div className="w-[90%] m-auto mt-2.5 h-full flex flex-col gap-4 p-3 rounded-lg">
      {expenseData.map((category, index) => {
        const percentSpent = (category.gastos / category.monto_limite) * 100
        const isOverLimit = category.gastos > category.monto_limite

        return (
          <div key={index} className="space-y-1.5">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div
                  className="px-3 py-1 rounded-full inline-block"
                  style={{
                    backgroundColor: `${categoryColor}20`,
                  }}
                >
                  <h3 className="text-sm font-medium" style={{ color: categoryColor }}>
                    {category.categoria}
                  </h3>
                </div>
                <span className="text-xs mt-1 ml-1" style={{ color: colors.muted }}>
                  {formatPeriod(category.periodo)}
                </span>
              </div>
              <div className="text-xs">
                <span className="font-semibold" style={{ color: isOverLimit ? "#ef4444" : colors.text }}>
                  {category.gastos.toLocaleString("es-ES")} €
                </span>
                <span style={{ color: colors.muted }}>{" / "}</span>
                <span style={{ color: colors.muted }}>{category.monto_limite.toLocaleString("es-ES")} €</span>
              </div>
            </div>

            <div className="relative">
              <Progress
                value={Math.min(percentSpent, 100)}
                className="h-2"
                style={{ backgroundColor: "#fdf2c8" }}
                indicatorClassName=""
                indicatorStyle={{
                  backgroundColor: categoryColor,
                }}
              />

              {isOverLimit && (
                <div className="absolute top-0 left-0 w-full flex items-center h-2">
                  <div className="h-full border-white w-full" />
                </div>
              )}
            </div>

            {isOverLimit ? (
              <p className="text-xs" style={{ color: "#ef4444" }}>
                +{(category.gastos - category.monto_limite).toLocaleString("es-ES")} € ({Math.round(percentSpent - 100)}
                %)
              </p>
            ) : (
              <p className="text-xs" style={{ color: categoryColor }}>
                {Math.round(percentSpent)}%
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

