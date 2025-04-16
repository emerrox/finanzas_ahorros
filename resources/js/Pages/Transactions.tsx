"use client"

import { type JSX, useState, useMemo, useEffect } from "react"
import { Table, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ArrowUpDown, ChevronDown, Search, ChevronLeft, Trash2 } from "lucide-react"
import AppLayout from "@/Layouts/AppLayout"
import ProtectedLayout from "@/Layouts/ProtectedLayout"
import { Link, usePage } from "@inertiajs/react"
import { motion, AnimatePresence } from "framer-motion"
import { AuroraText } from "@/components/ui/aurora-text"
import TransactionForm from "../components/TransactionForm"
import { Alert } from "@/components/ui/alert"
import EditTransactionForm from "../components/edit-transaction-form"
import DeleteConfirmationModal from "../components/delete-confirmation-modal"
import React from "react"

interface Transaction {
  id: number
  user_id: number
  tipo: "ingreso" | "gasto"
  monto: number
  fecha: string
  categoria: string
  descripcion: string
  user?: {
    name: string
    email: string
  }
}

interface TransactionsPageProps {
  transactions: Transaction[]
  flash?: {
    success?: string
    error?: string
  }
}

interface PageProps {
  user: {
    id: number
  }
  [key: string]: any
}

type SortDirection = "asc" | "desc"
type SortColumn = "fecha" | "tipo" | "categoria" | "descripcion" | "monto" | null

function TransactionsPage({ transactions, flash }: TransactionsPageProps): JSX.Element {
  const [localTransactions, setLocalTransactions] = useState(transactions)
  const [filterType, setFilterType] = useState<"all" | "ingreso" | "gasto">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<SortColumn>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [transactionToDelete, setTransactionToDelete] = useState<number | null>(null)

  useEffect(() => {
    setLocalTransactions(transactions)
  }, [transactions])

  const pageProps = usePage<PageProps>().props
  const userIdFromPage = pageProps.user.id

  const handleDeleteTransaction = (deletedId: number) => {
    setLocalTransactions(prev => prev.filter(t => t.id !== deletedId))
  }

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = localTransactions

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((transaction) => {
        const date = new Date(transaction.fecha).toLocaleDateString().toLowerCase()
        const type = transaction.tipo.toLowerCase()
        const category = transaction.categoria.toLowerCase()
        const description = transaction.descripcion.toLowerCase()
        const amount = transaction.monto.toString().toLowerCase()

        return (
          date.includes(query) ||
          type.includes(query) ||
          category.includes(query) ||
          description.includes(query) ||
          amount.includes(query)
        )
      })
    }

    if (sortColumn) {
      filtered.sort((a, b) => {
        let valueA: any
        let valueB: any

        if (sortColumn === "fecha") {
          valueA = new Date(a.fecha).getTime()
          valueB = new Date(b.fecha).getTime()
        } else {
          valueA = a[sortColumn]
          valueB = b[sortColumn]
        }

        if (typeof valueA === "string") {
          valueA = valueA.toLowerCase()
          valueB = valueB.toLowerCase()
        }

        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [localTransactions, searchQuery, sortColumn, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage)

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedTransactions.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedTransactions, currentPage, itemsPerPage])

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, maxVisiblePages - 1)
      } else if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - maxVisiblePages + 2)
      }

      if (start > 2) {
        pages.push("ellipsis-start")
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (end < totalPages - 1) {
        pages.push("ellipsis-end")
      }

      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <AppLayout>
      <ProtectedLayout>
        <div className="container mx-auto p-4 pt-0">
          {/* Mensajes flash */}
          {flash?.success && (
            <Alert className="mb-4 bg-green-100 border-green-200 text-green-800">{flash.success}</Alert>
          )}

          {/* Encabezado */}
          <div className="sticky mb-8 -top-2.5">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
              <Link href="/dashboard">
                <Button className="bg-white text-pickled-bluewood-950 hover:bg-pickled-bluewood-50 border-[#416788]">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Volver a inicio
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl mx-auto">
                <AuroraText colors={["#005A9B", "#4B0082", "#006400", "#8B0000", "#68217A", "#007ACC"]}>
                  Transacciones
                </AuroraText>
              </h1>
            </div>
          </div>

          {/* Tabla y controles */}
          <div className="p-6 transition-all duration-300 ">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4 items-center">
                <div className="w-3/4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#759cbb]" />
                    <Input
                      placeholder="Buscar"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="pl-10 bg-white text-[#2c3e50]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="bg-white  text-[#2c3e50] hover:bg-[#eaeff4]">
                        Filtrar por: {filterType === "all" ? "Todos" : filterType}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border-[#cfdce8]">
                      <DropdownMenuItem
                        onClick={() => setFilterType("all")}
                        className="hover:bg-[#eaeff4] text-[#2c3e50]"
                      >
                        Todos
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setFilterType("ingreso")}
                        className="hover:bg-[#eaeff4] text-[#2c3e50]"
                      >
                        Ingresos
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setFilterType("gasto")}
                        className="hover:bg-[#eaeff4] text-[#2c3e50]"
                      >
                        Gastos
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <TransactionForm userId={userIdFromPage} />
            </div>

            {/* Tabla */}
            <div className="overflow-hidden transition-all duration-300 h-[415px] ">
              <Table className="transition-all bg-white border-[#cfdce8] rounded-2xl  duration-300 overflow-hidden">
                <TableHeader className="bg-[#eaeff4] sticky top-0 z-10">
                  <TableRow className="border-b-[#cfdce8]">
                    <TableHead
                      onClick={() => handleSort("fecha")}
                      className="cursor-pointer text-[#2c3e50] hover:text-[#5480a3]"
                    >
                      Fecha
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("tipo")}
                      className="cursor-pointer text-[#2c3e50] hover:text-[#5480a3]"
                    >
                      Tipo
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("categoria")}
                      className="cursor-pointer text-[#2c3e50] hover:text-[#5480a3]"
                    >
                      Categoría
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("descripcion")}
                      className="cursor-pointer text-[#2c3e50] hover:text-[#5480a3]"
                    >
                      Descripción
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("monto")}
                      className="cursor-pointer text-[#2c3e50] hover:text-[#5480a3]"
                    >
                      Monto
                      <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                    </TableHead>
                    <TableHead className="text-right text-[#2c3e50]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <AnimatePresence mode="wait">
                  <motion.tbody
                    key={`${currentPage}-${filterType}-${sortColumn}-${sortDirection}-${searchQuery}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="transition-all duration-200 overflow-hidden"
                  >
                    {paginatedTransactions.length === 0 ? (
                      <TableRow className="border-b-[#cfdce8] h-[300px]">
                        <TableCell colSpan={5} className="text-center py-4 text-[#416788]">
                          No se encontraron transacciones
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedTransactions.map((transaction, index) => (
                        <motion.tr
                          key={transaction.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.2,
                            delay: index * 0.03,
                            ease: "easeInOut",
                          }}
                          onClick={() => {
                            setSelectedTransaction(transaction)
                            setEditModalOpen(true)
                          }}
                          className="border-b-[#cfdce8] hover:bg-[#eaeff4] min-h-[50px] overflow-hidden cursor-pointer"
                        >
                          <TableCell className="text-[#2c3e50]">
                            {new Date(transaction.fecha).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded ${
                                transaction.tipo === "ingreso"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {transaction.tipo}
                            </span>
                          </TableCell>
                          <TableCell className="text-[#2c3e50]">{transaction.categoria}</TableCell>
                          <TableCell className="max-w-[200px] truncate text-[#2c3e50]">
                            {transaction.descripcion}
                          </TableCell>
                          <TableCell className="text-[#2c3e50]">${transaction.monto.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-100"
                              onClick={(e) => {
                                e.stopPropagation()
                                setTransactionToDelete(transaction.id)
                                setDeleteModalOpen(true)
                              }}
                            >
                              <span className="sr-only">Eliminar</span>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))
                    )}
                  </motion.tbody>
                </AnimatePresence>
              </Table>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} text-[#416788] hover:text-[#2c3e50] hover:bg-[#eaeff4]`}
                      />
                    </PaginationItem>

                    {getPageNumbers().map((page, index) =>
                      page === "ellipsis-start" || page === "ellipsis-end" ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis className="text-[#5480a3]" />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={index}>
                          <PaginationLink
                            isActive={currentPage === page}
                            onClick={() => typeof page === "number" && setCurrentPage(page)}
                            className={`cursor-pointer ${currentPage === page ? "bg-[#5480a3] text-white" : "text-[#416788] hover:bg-[#eaeff4]"}`}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} text-[#416788] hover:text-[#2c3e50] hover:bg-[#eaeff4]`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            <div className="mt-4 text-sm text-[#416788]">
              Mostrando {paginatedTransactions.length} de {filteredAndSortedTransactions.length} transacciones
            </div>
          </div>
        </div>
        {/* Edit Transaction Modal */}
        <EditTransactionForm transaction={selectedTransaction} open={editModalOpen} setOpen={setEditModalOpen} />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          transactionId={transactionToDelete}
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          onDelete={handleDeleteTransaction}
        />
      </ProtectedLayout>
    </AppLayout>
  )
}

export default TransactionsPage