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

const PrecipitationGraph = ({ forecastData }) => {
  const labels = forecastData.map(day => new Date(day.date).toLocaleDateString());
  const precipitation = forecastData.map(day => day.day.totalprecip_mm);

  const data = {
    labels,
    datasets: [
      {
        label: 'Precipitation (mm)',
        data: precipitation,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
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
        text: '7-Day Precipitation Forecast',
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default PrecipitationGraph;
