import { Badge } from "@/components/ui/badge"
import React from "react"

type InvestmentAsset = {
  id: number
  user_id: number
  nombre_activo: string
  fecha_adquisicion: string
  precio_compra: number
  broker: string
  notas: string
  horizonte: string
  objetivo: string
  created_at: string
  updated_at: string
}

export default function InvestmentAssets({ assets }: { assets: InvestmentAsset[] }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="w-[90%] m-auto mt-2.5 h-full flex flex-col gap-4 p-3 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-[var(--color-pickled-bluewood-900)]">Cartera de Inversiones</h2>
        <span className="text-sm text-[var(--color-pickled-bluewood-400)]">{assets.length} activos</span>
      </div>

      <div className="space-y-4">
        {assets.map((asset) => (
          <div key={asset.id} className="p-3 rounded-lg border border-pickled-bluewood-100 bg-white ">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-[var(--color-pickled-bluewood-900)]">{asset.nombre_activo}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className="h-5 px-2 text-xs bg-pickled-bluewood-50 text-[var(--color-pickled-bluewood-900)]"
                  >
                    {asset.objetivo}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="h-5 px-2 text-xs  bg-pickled-bluewood-50 text-[var(--color-pickled-bluewood-900)]"
                  >
                    {asset.horizonte}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-[var(--color-pickled-bluewood-900)]">
                  {asset.precio_compra.toLocaleString("es-ES")} €
                </div>
                <div className="text-xs text-[var(--color-pickled-bluewood-400)]">
                  {formatDate(asset.fecha_adquisicion)}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs mt-3">
              <div className="text-[var(--color-pickled-bluewood-400)]">
                <span className="font-medium">Broker:</span> {asset.broker}
              </div>
              {asset.notas && (
                <div
                  className="italic max-w-[60%] truncate text-[var(--color-pickled-bluewood-400)]"
                  title={asset.notas}
                >
                  "{asset.notas}"
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

