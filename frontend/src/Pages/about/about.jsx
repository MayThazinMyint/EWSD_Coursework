import React from 'react';
import mtk from '../../assets/about/mtk.png';
import mtzm from '../../assets/about/mtzm.png';
import amzbm from '../../assets/about/amzbm.png';
import anonymous from '../../assets/about/anonymous.png';
import ancp from '../../assets/about/ancp.jpeg';
import hak from '../../assets/about/hak.png';
import vanzar from '../../assets/about/vanzar.jpg';

import './about.css';

const About = () => {
  const profileData = [
    { id: 0, name: 'May Thazin Myint', profileImg: mtzm, role: 'Leader' },
    { id: 1, name: 'Aung Kaung Myat', profileImg: anonymous, role: 'Team Member' },
    { id: 1, name: 'Aye Myat Zabe Moe', profileImg: amzbm, role: 'Team Member' },
    { id: 2, name: 'Aye Nyein Chan Pyae', profileImg: ancp, role: 'Team Member' },
    { id: 3, name: 'Htet Aung Kyaw', profileImg: hak, role: 'Team Member' },
    { id: 5, name: 'May Thu Kywe', profileImg: mtk, role: 'Team Member' },
    { id: 6, name: 'Thura Win', profileImg: anonymous, role: 'Team Member' },
    { id: 7, name: 'Van Za Lyan Htan', profileImg: vanzar, role: 'Team Member' },
  ];
  return (
    <div className="flex flex-col items-center">
      <p className="pt-[100px] text-center text-4xl font-bold shadow-sm">Meet our team</p>
      <div className="pt-[50px]   flex flex-wrap gap-[2.5rem] mx-[1rem] justify-center items-center">
        {profileData.map((data) => (
          //console.log('data',data)
          <div class="w-[250px]  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img class="h-[250px] rounded-t-lg" src={data.profileImg} alt="" />
            <div class="p-5">
              <div>
                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {data.name}
                </h5>
              </div>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
