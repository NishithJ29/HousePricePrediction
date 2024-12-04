// PredictionChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PredictionChart = ({ predictedPrice, historicalPrices }) => {
    const data = {
        labels: ['Predicted Price', 'Historical Price 1', 'Historical Price 2'], // Customize as needed
        datasets: [
            {
                label: 'House Prices',
                data: [predictedPrice, ...historicalPrices],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Price Comparison</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default PredictionChart;
