"use client";

import React from "react";
// Removed unused PageProps import
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AppLayout from "@/Layouts/AppLayout";
import ProtectedLayout from "@/Layouts/ProtectedLayout";

interface Budget {
  id: number;
  user_id: number;
  categoria: string;
  monto_limite: number;
  periodo: string;
  user?: {
    name: string;
    email: string;
  }
}

interface BudgetsPageProps {
  budgets: Budget[];
}

const BudgetsPage: React.FC<BudgetsPageProps> = ({ budgets }) => {
  return (
    <AppLayout>
      <ProtectedLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Presupuestos</h1>
          <Table className="bg-white border rounded-xl overflow-hidden">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead>Categoría</TableHead>
                <TableHead>Monto Límite</TableHead>
                <TableHead>Periodo</TableHead>
                <TableHead>Usuario</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell>{budget.categoria}</TableCell>
                  <TableCell>${budget.monto_limite.toLocaleString()}</TableCell>
                  <TableCell>{budget.periodo}</TableCell>
                  <TableCell>{budget.user?.name || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ProtectedLayout>
    </AppLayout>
  );
};

export default BudgetsPage;
