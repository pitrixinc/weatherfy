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

const WindSpeedGraph = ({ forecastData }) => {
  const labels = forecastData.map(day => new Date(day.date).toLocaleDateString());
  const windSpeed = forecastData.map(day => day.day.maxwind_kph);

  const data = {
    labels,
    datasets: [
      {
        label: 'Wind Speed (kph)',
        data: windSpeed,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
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
        text: '7-Day Wind Speed Forecast',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default WindSpeedGraph;
