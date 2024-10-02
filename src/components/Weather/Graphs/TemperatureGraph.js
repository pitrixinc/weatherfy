import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureGraph = ({ forecastData }) => {
  const labels = forecastData.map(day => new Date(day.date).toLocaleDateString());
  const maxTemps = forecastData.map(day => day.day.maxtemp_c);
  const minTemps = forecastData.map(day => day.day.mintemp_c);

  const data = {
    labels,
    datasets: [
      {
        label: 'Max Temperature (°C)',
        data: maxTemps,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Min Temperature (°C)',
        data: minTemps,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '3-Day Temperature Forecast',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TemperatureGraph;
