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

const HumidityGraph = ({ forecastData }) => {
  const labels = forecastData.map(day => new Date(day.date).toLocaleDateString());
  const humidity = forecastData.map(day => day.day.avghumidity);

  const data = {
    labels,
    datasets: [
      {
        label: 'Humidity (%)',
        data: humidity,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
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
        text: '3-Day Humidity Forecast',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default HumidityGraph;
