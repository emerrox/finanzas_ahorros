"use client"

import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TransactionModal({ userId }: { userId: number }) {
  const [open, setOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    tipo: "ingreso",
    monto: 0,
    fecha: new Date().toISOString().split("T")[0],
    categoria: "",
    descripcion: "",
    user_id: userId,
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post("/transactions", data, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#5480a3] text-white hover:bg-[#416788]">
          Nueva Transacción
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#2c3e50]">
            Nueva Transacción
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tipo */}
            <div>
              <Label htmlFor="tipo" className="text-[#2c3e50]">
                Tipo
              </Label>
              <Select value={data.tipo} onValueChange={(value) => setData("tipo", value)}>
                <SelectTrigger className="border-[#a6bfd3]">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#cfdce8]">
                  <SelectItem value="ingreso">Ingreso</SelectItem>
                  <SelectItem value="gasto">Gasto</SelectItem>
                </SelectContent>
              </Select>
              {errors.tipo && <p className="text-red-500 text-sm mt-1">{errors.tipo}</p>}
            </div>

            {/* Monto */}
            <div>
              <Label htmlFor="monto" className="text-[#2c3e50]">
                Monto
              </Label>
              <Input
                id="monto"
                type="number"
                value={data.monto}
                onChange={(e) => setData("monto", Number.parseFloat(e.target.value))}
                step="0.01"
                className="border-[#a6bfd3] focus:border-[#5480a3]"
              />
              {errors.monto && <p className="text-red-500 text-sm mt-1">{errors.monto}</p>}
            </div>

            {/* Fecha */}
            <div>
              <Label htmlFor="fecha" className="text-[#2c3e50]">
                Fecha
              </Label>
              <Input
                id="fecha"
                type="date"
                value={data.fecha}
                onChange={(e) => setData("fecha", e.target.value)}
                className="border-[#a6bfd3] focus:border-[#5480a3]"
              />
              {errors.fecha && <p className="text-red-500 text-sm mt-1">{errors.fecha}</p>}
            </div>

            {/* Categoría */}
            <div>
              <Label htmlFor="categoria" className="text-[#2c3e50]">
                Categoría
              </Label>
              <Input
                id="categoria"
                value={data.categoria}
                onChange={(e) => setData("categoria", e.target.value)}
                className="border-[#a6bfd3] focus:border-[#5480a3]"
              />
              {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>}
            </div>
          </div>

          {/* Descripción */}
          <div>
            <Label htmlFor="descripcion" className="text-[#2c3e50]">
              Descripción
            </Label>
            <Input
              id="descripcion"
              value={data.descripcion}
              onChange={(e) => setData("descripcion", e.target.value)}
              className="border-[#a6bfd3] focus:border-[#5480a3]"
            />
            {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={processing} className="bg-[#5480a3] text-white hover:bg-[#416788]">
              {processing ? "Guardando..." : "Crear Transacción"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
