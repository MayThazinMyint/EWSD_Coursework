import React from "react";

import { 
    Chart as ChartJS,
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    Title
} from 'chart.js';

import { Bar } from "react-chartjs-2";
import barchartdata from "./barchartdata";

ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    Title
);






const BarChart = ()  => {



    return(
        <div className="w-[550px] h-[200px]">
           
            <Bar options={{
                responsive:true,
                plugins: {
                    title:{
                        display: true,
                        
                    },
                }
            }}
            data={barchartdata} 
            />
            
        </div>
    )
    }

export default BarChart;