import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register everything here only
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PropertyPieChart = ({ dataCounts }) => {
  const labels = ['Houses', 'Flats', 'Shops', 'Offices'];

  const data = {
    labels: labels.map((label, i) => `${label} (${dataCounts[i]})`),
    datasets: [
      {
        label: 'Properties',
        data: dataCounts,
        backgroundColor: ['blue', 'green', 'red', 'purple'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      datalabels: {
        formatter: (value, ctx) => {
          const sum = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percent = ((value / sum) * 100).toFixed(1) + '%';
          return percent;
        },
        color: '#fff',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
    },
  };

  return <Pie data={data} options={options} id='propertyPieChart'/>;
};

export default PropertyPieChart;
