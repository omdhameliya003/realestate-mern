// src/components/common/adminComponent/PropertyBarChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

// Register chart components and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const PropertyBarChart = ({ dataForSale, dataForRent }) => {
  const barLabels = ['Houses', 'Flats', 'Shops', 'Offices'];

  const data = {
    labels: barLabels,
    datasets: [
      {
        label: 'For Sale',
        data: dataForSale,
        backgroundColor: '#4169E1',
        borderColor: '#1E3A8A',
        borderWidth: 1,
      },
      {
        label: 'For Rent',
        data: dataForRent,
        backgroundColor: '#DAA520',
        borderColor: '#8B6508',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      datalabels: {
        formatter: (value, ctx) => {
          const dataset = ctx.dataset.data;
          const sum = dataset.reduce((a, b) => a + b, 0);
          const percentage = ((value / sum) * 100).toFixed(1) + '%';
          return percentage;
        },
        color: '#fff',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
  };

  return <Bar data={data} options={options} id='propertyBarChart'/>;
};

export default PropertyBarChart;
