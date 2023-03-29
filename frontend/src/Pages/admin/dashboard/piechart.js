import React from 'react';

import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import piechartdata from './piechartdata';

ChartJS.register(BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title);

const PieChart = () => {
  return (
    <div className="w-[750px] h-[400px]">
      <Doughnut
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
            },
          },
        }}
        data={piechartdata}
      />
    </div>
  );
};

export default PieChart;
