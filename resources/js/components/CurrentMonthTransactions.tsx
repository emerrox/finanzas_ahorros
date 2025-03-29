"use client"

import React from "react"
import { ArrowDownIcon, ArrowUpIcon, CalendarIcon, TagIcon } from "lucide-react"
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
  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  // Función para obtener el icono de categoría
  const getCategoryIcon = (categoria: string) => {
    // Aquí podrías mapear categorías específicas a iconos específicos
    // Por ahora usamos un icono genérico
    return <TagIcon className="h-4 w-4" aria-hidden="true" />
  }

  return (
    <div className="w-full h-full rounded-lg  overflow-hidden mt-6">


      <div className="p-4">
          {transactions.length > 0 ? (
            <ul className="space-y-4" aria-label="Lista de transacciones recientes">
              {transactions.map((transaction, index) => (
                <li key={`${transaction.fecha}-${index}`} className="group">
                  <div className="flex items-center gap-3 p-3 rounded-lg transition-all bg-white dark:bg-transactions-900/50 hover:bg-transactions-100 dark:border-transactions-800 hover:border-transactions-300 dark:hover:border-transactions-700">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        transaction.tipo === "ingreso"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {transaction.tipo === "ingreso" ? (
                        <ArrowUpIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <ArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate text-transactions-900 dark:text-transactions-100">
                        {transaction.descripcion}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-transactions-700 dark:text-transactions-300">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 h-5 px-2 text-xs border-transactions-200 dark:border-transactions-700 bg-transactions-50 dark:bg-transactions-900 text-transactions-700 dark:text-transactions-300"
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
                      <span
                        className={`font-medium ${
                          transaction.tipo === "ingreso"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                        aria-label={`${transaction.tipo === "ingreso" ? "Ingreso" : "Gasto"} de ${Math.abs(transaction.monto).toLocaleString("es-ES")} euros`}
                      >
                        {transaction.tipo === "ingreso" ? "+" : "-"}
                        {Math.abs(transaction.monto).toLocaleString("es-ES")} €
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="rounded-full bg-transactions-100 dark:bg-transactions-800 p-3 mb-3">
                <CalendarIcon className="h-6 w-6 text-transactions-500 dark:text-transactions-400" aria-hidden="true" />
              </div>
              <h3 className="font-medium mb-1 text-transactions-900 dark:text-transactions-100">
                No hay transacciones
              </h3>
              <p className="text-sm text-transactions-700 dark:text-transactions-300 max-w-[250px]">
                Cuando realices transacciones, aparecerán aquí.
              </p>
            </div>
          )}
      </div>
    </div>
  )
}

export default RecentTransactions

