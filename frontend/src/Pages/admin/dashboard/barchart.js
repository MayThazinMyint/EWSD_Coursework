import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIdeaByDept } from '../../../features/report/dashboardSlice';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale, Title);

const BarChart = () => {
    const dispatch = useDispatch();
    const [ideaListByDpt, setIdeaListByDpt] = useState(null);
    useEffect(() => {
      dispatch(fetchIdeaByDept()).then((res) => {
        setIdeaListByDpt(res.payload.data)
        console.log('ideaListByDpt', res.payload.data);
        
      })
    }, [dispatch]);

  return (
    <div className="w-[550px] h-[200px]">
      <Bar
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
            ideaListByDpt !== null &&
            ideaListByDpt.map((data) => data && data.department_description),
          datasets: [
            {
              label: 'Ideas made by each department',
              data: ideaListByDpt !== null &&  ideaListByDpt.map((data) => data && data.idea_cnt),
              backgroundColor: '#FF0000',
            },
          ],
        }}
      />
    </div>
  );
};

export default BarChart;
