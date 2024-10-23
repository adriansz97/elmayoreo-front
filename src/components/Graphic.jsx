import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

export const Graphic = () => {
  const chartRef = useRef(null); // Referencia al canvas

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d'); // Obtener el contexto 2D del canvas

    // Crear el gráfico de pie
    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Complete', 'Pending', 'Process', 'Ended'], // Etiquetas del gráfico
        datasets: [
          {
            label: 'Frutas',
            data: [300, 50, 100, 150], // Datos del gráfico
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ], // Colores para cada segmento
            borderColor: 'rgba(255, 255, 255, 1)', // Color del borde
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Reports',
          },
        },
      },
    });

    // Limpiar el gráfico al desmontar el componente
    return () => {
      pieChart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />; // Renderizar el canvas
};
