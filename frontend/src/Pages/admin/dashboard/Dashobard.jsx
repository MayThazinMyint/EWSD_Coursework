import React from 'react'
import Sidebar from '../../../components/sidebar/Sidebar'
import BarChart from './barchart';
import PieChart from './piechart';
const Dashobard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="px-[300px] pt-[100px]">
        dashboard
        <div className='flex'>
          <BarChart />
          <PieChart />
        </div>
      </div>
    </div>
  );
}

export default Dashobard