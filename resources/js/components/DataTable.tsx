"use client"

import { useState, useEffect, type ReactNode } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowDown,
  ArrowUp,
  Search,
} from "lucide-react"
import React from "react"

// Define the column interface
export interface Column<T> {
  header: string
  accessorKey: keyof T
  sortable?: boolean
  searchable?: boolean
  cell?: (item: T) => ReactNode
}

// Define the props for our component
interface DataTableProps<T> {
  title?: string
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  caption?: string
  searchPlaceholder?: string
  noResultsMessage?: string
  itemsPerPageOptions?: number[]
  defaultItemsPerPage?: number
  showingText?: string
  ofText?: string
  pageText?: string
  itemsText?: string
}

export default function DataTable<T extends Record<string, any>>({
  title,
  data,
  columns,
  keyField,
  caption = "Lista de datos",
  searchPlaceholder = "Buscar...",
  noResultsMessage = "No se encontraron resultados.",
  itemsPerPageOptions = [5, 10, 20, 50],
  defaultItemsPerPage = 5,
  showingText = "Mostrando",
  ofText = "de",
  pageText = "Página",
  itemsText = "elementos",
}: DataTableProps<T>) {
  // State for sorting
  const [sortField, setSortField] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null)

  // State for filtering
  const [filterValue, setFilterValue] = useState("")

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage)

  // Get searchable fields
  const searchableFields = columns.filter((column) => column.searchable !== false).map((column) => column.accessorKey)

  // Handle sort
  const handleSort = (field: keyof T) => {
    const column = columns.find((col) => col.accessorKey === field)
    if (!column?.sortable) return

    if (sortField === field) {
      // Toggle direction if same field
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortField(null)
        setSortDirection(null)
      } else {
        setSortDirection("asc")
      }
    } else {
      // New field, set to ascending
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Get sort icon
  const getSortIcon = (field: keyof T) => {
    const column = columns.find((col) => col.accessorKey === field)
    if (!column?.sortable) return null

    if (sortField !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />
    }
    return sortDirection === "asc" ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />
  }

  // Filter data
  const filteredData = data.filter((item) => {
    if (!filterValue) return true

    const searchTerm = filterValue.toLowerCase()
    return searchableFields.some((field) => {
      const value = item[field]
      if (value === null || value === undefined) return false
      return String(value).toLowerCase().includes(searchTerm)
    })
  })

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField || !sortDirection) return 0

    const fieldA = a[sortField]
    const fieldB = b[sortField]

    if (fieldA === null || fieldA === undefined) return 1
    if (fieldB === null || fieldB === undefined) return -1

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
    }

    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA
    }

    if (fieldA instanceof Date && fieldB instanceof Date) {
      return sortDirection === "asc" ? fieldA.getTime() - fieldB.getTime() : fieldB.getTime() - fieldA.getTime()
    }

    // Convert to string for comparison if types don't match
    return sortDirection === "asc"
      ? String(fieldA).localeCompare(String(fieldB))
      : String(fieldB).localeCompare(String(fieldA))
  })

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filterValue])

  return (
    <Card className="w-full bg-pickled-bluewood-50 border-pickled-bluewood-200">
      {title && (
        <CardHeader className="border-b border-pickled-bluewood-200">
          <CardTitle className="text-2xl font-bold text-pickled-bluewood-900">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-pickled-bluewood-400" />
            <Input
              placeholder={searchPlaceholder}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="pl-8 border-pickled-bluewood-300 focus:border-pickled-bluewood-500 focus:ring-pickled-bluewood-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-pickled-bluewood-600 whitespace-nowrap">Mostrar:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-[80px] border-pickled-bluewood-300 focus:ring-pickled-bluewood-500">
                <SelectValue placeholder={defaultItemsPerPage.toString()} />
              </SelectTrigger>
              <SelectContent>
                {itemsPerPageOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border border-pickled-bluewood-200 overflow-hidden">
          <Table>
            {caption && <TableCaption className="text-pickled-bluewood-500">{caption}</TableCaption>}
            <TableHeader className="bg-pickled-bluewood-100">
              <TableRow className="border-b-pickled-bluewood-200 hover:bg-pickled-bluewood-100">
                {columns.map((column) => (
                  <TableHead
                    key={String(column.accessorKey)}
                    onClick={() => handleSort(column.accessorKey)}
                    className={`text-pickled-bluewood-700 font-semibold ${column.sortable ? "cursor-pointer hover:text-pickled-bluewood-900" : ""}`}
                  >
                    <div className="flex items-center">
                      {column.header}
                      {getSortIcon(column.accessorKey)}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <TableRow
                    key={String(item[keyField])}
                    className="border-b-pickled-bluewood-200 hover:bg-pickled-bluewood-50"
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={`${String(item[keyField])}-${String(column.accessorKey)}`}
                        className="text-pickled-bluewood-800"
                      >
                        {column.cell ? column.cell(item) : String(item[column.accessorKey] ?? "")}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-pickled-bluewood-500">
                    {noResultsMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination controls */}
        {totalPages > 0 && (
          <div className="flex items-center justify-between space-x-2 py-4 mt-4">
            <div className="text-sm text-pickled-bluewood-600">
              {showingText} {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} {ofText}{" "}
              {filteredData.length} {itemsText}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="border-pickled-bluewood-300 text-pickled-bluewood-700 hover:bg-pickled-bluewood-100 hover:text-pickled-bluewood-900 disabled:text-pickled-bluewood-300"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-pickled-bluewood-300 text-pickled-bluewood-700 hover:bg-pickled-bluewood-100 hover:text-pickled-bluewood-900 disabled:text-pickled-bluewood-300"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-pickled-bluewood-700">
                {pageText} {currentPage} {ofText} {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-pickled-bluewood-300 text-pickled-bluewood-700 hover:bg-pickled-bluewood-100 hover:text-pickled-bluewood-900 disabled:text-pickled-bluewood-300"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="border-pickled-bluewood-300 text-pickled-bluewood-700 hover:bg-pickled-bluewood-100 hover:text-pickled-bluewood-900 disabled:text-pickled-bluewood-300"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

