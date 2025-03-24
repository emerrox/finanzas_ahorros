import React from 'react';

type Props = {
  year_month: string;
  total_gastos: number;
  total_ingresos: number;
  desglose: {
    categoria: string;
    gastos: number;
  }[];
};

const MonthTransactionsVisualization: React.FC<Props> = ({
  total_gastos,
  total_ingresos,
  year_month,
  desglose = [],
}) => {
  // Calcular totales

  const balanceTotal = total_ingresos - total_gastos;

  // Paleta de colores para categorías
  const getColorClass = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-emerald-500",
      "bg-purple-500",
      "bg-amber-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    return colors[index % colors.length];
  };

  // Encontrar el monto máximo para escalar las barras
  const maxMonto = Math.max(
    ...desglose.map(item => Math.abs(item.gastos)),
    1
  );

  return (
    <div className="flex flex-col gap-4 mt-4 px-6">
      <h2 className="text-xl font-bold">{year_month}</h2>
      
      {desglose.map((item, index) => {
        const esIngreso = item.gastos < 0;
        const montoAbs = Math.abs(item.gastos);
        
        return (
          <div key={`${item.categoria}-${index}`} className="w-full space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-medium">{item.categoria}</span>
              <span className={`text-sm font-semibold text-gray-800`}>
                {esIngreso ? '+' : '-'}{montoAbs.toLocaleString('es-ES')} €
              </span>
            </div>
            
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className={`absolute left-0 top-0 h-full ${getColorClass(index)}`}
                style={{
                  width: `${(montoAbs / maxMonto) * 100}%`
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Sección de totales */}
      <div className="w-full mt-4 space-y-2">
        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-sm font-medium">Balance Total:</span>
          <span className={`font-bold ${
            balanceTotal > 0 
              ? 'text-green-600' 
              : balanceTotal < 0 
                ? 'text-red-600' 
                : 'text-gray-600'
          }`}>
            {balanceTotal.toLocaleString('es-ES')} €
          </span>
        </div>
      </div>
    </div>
  );
};

export default MonthTransactionsVisualization;