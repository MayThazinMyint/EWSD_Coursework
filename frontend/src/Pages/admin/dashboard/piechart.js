import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesByDept } from '../../../features/report/dashboardSlice';
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
  const dispatch = useDispatch();
  const [categoryByDept, setCategoryByDept] = useState(null);
  useEffect(() => {
    dispatch(fetchCategoriesByDept()).then((res) => {
      setCategoryByDept(res.payload.data);
      console.log('categoryByDept', categoryByDept);
    });
  }, [dispatch]);

const pieChartData = [
  {
    label: 'Department A',
    value: 10,
  },
  {
    label: 'Department B',
    value: 20,
  },
  {
    label: 'Department C',
    value: 30,
  },
  {
    label: 'Department D',
    value: 40,
  },
];
  return (
    <div className="w-[750px] h-[400px]">
      <p className='font-bold'>Number of Category by Department</p>
      <Doughnut
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
            },
          },
        }}
        data={{
          labels:
            categoryByDept !== null &&
            categoryByDept.map((data) => data && data.department_description),
          datasets: [
            {
              label: 'Number of Category by Department',
              data:
                categoryByDept !== null && categoryByDept.map((data) => data && data.category_cnt),
              backgroundColor: ['#00FFFF', '#89CFF0', '#0096FF', '#0000FF'],
            },
          ],
        }}
      />
    </div>
  );
};

export default PieChart;
