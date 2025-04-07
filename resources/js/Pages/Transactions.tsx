"use client"

import { type JSX, useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Card } from "@/components/ui/card"
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
import { ArrowUpDown, ChevronDown, Home, Search, ChevronLeft } from "lucide-react"
import AppLayout from "@/Layouts/AppLayout"
import ProtectedLayout from "@/Layouts/ProtectedLayout"
import { Link } from "@inertiajs/react"
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
}

type SortDirection = "asc" | "desc"
type SortColumn = "fecha" | "tipo" | "categoria" | "descripcion" | "monto" | null

function TransactionsPage({ transactions }: { transactions: Transaction[] }): JSX.Element {
  const [filterType, setFilterType] = useState<"all" | "ingreso" | "gasto">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortColumn, setSortColumn] = useState<SortColumn>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Handle sorting
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    // First apply type filter
    let filtered = transactions.filter((transaction) => (filterType === "all" ? true : transaction.tipo === filterType))

    // Then apply search filter across all fields
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

    // Then sort
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
  }, [transactions, filterType, searchQuery, sortColumn, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage)
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedTransactions.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedTransactions, currentPage])

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're at the beginning or end
      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, maxVisiblePages - 1)
      } else if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - maxVisiblePages + 2)
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push("ellipsis-start")
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("ellipsis-end")
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <AppLayout>
      <ProtectedLayout>
        <div className="container mx-auto p-4">
                <Link href="/dashboard" >
                  <Button  className="bg-white text-pickled-bluewood-950 hover:bg-pickled-bluewood-50 border-[#416788]">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Volver a inicio
                  </Button>
                </Link>
              <div>
                <h1 className="text-2xl font-bold text-[#2c3e50]">Transacciones</h1>
                <p className="text-[#416788]">Registro de ingresos y gastos</p>
              </div>
          <Card className="p-6 bg-white border-[#cfdce8]">
            <div className="flex gap-4 items-center">
              
               {/* Single search field */}
            <div className="w-1/4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#759cbb]" />
                <Input
                  placeholder="Buscar en todas las columnas..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1) // Reset to first page when searching
                  }}
                  className="pl-10 border-[#a6bfd3] focus:border-[#5480a3] focus:ring-[#5480a3] bg-white text-[#2c3e50]"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-white border-[#a6bfd3] text-[#2c3e50] hover:bg-[#eaeff4]">
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

           

            <Table>
              <TableHeader className="bg-[#eaeff4]">
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.length === 0 ? (
                  <TableRow className="border-b-[#cfdce8]">
                    <TableCell colSpan={5} className="text-center py-4 text-[#416788]">
                      No se encontraron transacciones
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedTransactions.map((transaction) => (
                    <TableRow key={transaction.id} className="border-b-[#cfdce8] hover:bg-[#eaeff4]">
                      <TableCell className="text-[#2c3e50]">
                        {new Date(transaction.fecha).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded ${
                            transaction.tipo === "ingreso" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.tipo}
                        </span>
                      </TableCell>
                      <TableCell className="text-[#2c3e50]">{transaction.categoria}</TableCell>
                      <TableCell className="max-w-[200px] truncate text-[#2c3e50]">{transaction.descripcion}</TableCell>
                      <TableCell className="text-[#2c3e50]">${transaction.monto.toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
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
          </Card>
        </div>
      </ProtectedLayout>
    </AppLayout>
  )
}

export default TransactionsPage

