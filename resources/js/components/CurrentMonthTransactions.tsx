"use client"

import React from "react"
import { ArrowDownIcon, ArrowUpIcon, CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Transaction = {
  fecha: string
  descripcion: string
  monto: number
  tipo: "gasto" | "ingreso"
  categoria: string
}

type Props = {
  transactions: Transaction[]
}

const RecentTransactions: React.FC<Props> = ({ transactions = [] }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden mt-6">
      <h2 className="text-lg font-semibold ml-8 text-[var(--color-pickled-bluewood-900)]">Ultimas transacciones</h2>

      <div className="p-4">
        {transactions.length > 0 ? (
          <ul className="space-y-4">
            {transactions.map((transaction, index) => {
              const isIncome = transaction.tipo === "ingreso"

              return (
                <li key={`${transaction.fecha}-${index}`} className="group">
                  <div className="flex items-center gap-3 p-3 rounded-lg transition-all bg-white hover:bg-[var(--color-pickled-bluewood-50)]">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        isIncome ? "bg-[#2ECC71]/10 text-[#2ECC71]" : "bg-[#E74C3C]/10 text-[#E74C3C]"
                      }`}
                    >
                      {isIncome ? (
                        <ArrowUpIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <ArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-[var(--color-pickled-bluewood-900)]">
                        {transaction.descripcion}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-[var(--color-pickled-bluewood-400)]">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 h-5 px-2 text-xs bg-[var(--color-pickled-bluewood-50)] text-[var(--color-pickled-bluewood-900)]"
                        >
                          <span>{transaction.categoria}</span>
                        </Badge>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" aria-hidden="true" />
                          <span className="text-xs">{formatDate(transaction.fecha)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <span className={`font-medium ${isIncome ? "text-[#2ECC71]" : "text-[#E74C3C]"}`}>
                        {isIncome ? "+" : "-"}
                        {Math.abs(transaction.monto).toLocaleString("es-ES")} €
                      </span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="rounded-full bg-[var(--color-pickled-bluewood-50)] p-3 mb-3">
              <CalendarIcon className="h-6 w-6 text-[var(--color-pickled-bluewood-400)]" aria-hidden="true" />
            </div>
            <h3 className="font-medium mb-1 text-[var(--color-pickled-bluewood-900)]">No hay transacciones</h3>
            <p className="text-sm text-[var(--color-pickled-bluewood-400)] max-w-[250px]">
              Cuando realices transacciones, aparecerán aquí.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentTransactions

