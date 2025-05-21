import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const ChartsDashboard = () => {
  const [pieData, setPieData] = useState([]);
  const [pieLabels, setPieLabels] = useState([]);
  const [barData, setBarData] = useState([]);
  const [barCategories, setBarCategories] = useState([]);
  const [timeSeriesData, setTimeSeriesData] = useState([]);

  useEffect(() => {
    fetch('https://c0b16506-fb3a-43f3-b96c-54e7b01ac171.mock.pstmn.io/grahpics')
      .then(res => res.json())
      .then(data => {
        setPieData(data.pieData);
        setPieLabels(data.pieLabels);
        setBarData(data.ventas);
        setBarCategories(data.categorias);
        setTimeSeriesData(data.timeSeries.map((d: any) => ({ x: new Date(d.x), y: d.y })));
      })
      .catch(err => console.error("Error al cargar los datos del mock server:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl mb-4">Gráfico Circular</h2>
        <Chart
          options={{ labels: pieLabels }}
          series={pieData}
          type="pie"
          width="100%"
        />
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl mb-4">Gráfico de Barras</h2>
        <Chart
          options={{
            chart: { id: 'bar' },
            xaxis: { categories: barCategories }
          }}
          series={[{ name: 'Ventas', data: barData }]}
          type="bar"
          width="100%"
        />
      </div>

      {/* Time Series Chart */}
      <div className="bg-white rounded-lg shadow p-4 col-span-1 md:col-span-2">
        <h2 className="text-xl mb-4">Serie Temporal</h2>
        <Chart
          options={{
            chart: { id: 'timeseries' },
            xaxis: {
              type: 'datetime',
              title: { text: 'Fecha' }
            }
          }}
          series={[{ name: 'Visitas', data: timeSeriesData }]}
          type="line"
          width="100%"
        />
      </div>
    </div>
  );
};

export default ChartsDashboard;
