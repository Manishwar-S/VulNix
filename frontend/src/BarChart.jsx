import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VulnerabilityBarChart = () => {
  const data = {
    labels: [
      'Feb 22', 'Feb 23', 'Feb 24', 'Feb 25', 'Feb 26', 'Feb 27', 'Feb 28', 'Feb 29', 'Mar 1', 'Mar 2'
    ],
    datasets: [
      {
        label: 'Vulnerabilities Found',
        data: [15, 18, 12, 22, 30, 25, 28, 0, 0, 0], // Actual data for first 7 days, 0 for forecast days
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Blue for actual
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)', // Yellow for forecast
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderWidth: 1,
      },
      {
        label: 'Forecasted Vulnerabilities',
        data: [null, null, null, null, null, null, null, 26, 24, 22], // Only for forecast days
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red for forecast
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Daily Vulnerabilities Found & Forecast' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5, // Adjust if needed
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default VulnerabilityBarChart;