import React from 'react';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { FcIdea } from 'react-icons/fc';
import { HiUserGroup } from 'react-icons/hi';
import { AiFillSetting } from 'react-icons/ai';
import { MdOutlineSystemUpdateAlt, MdReport, MdOutlineLogout } from 'react-icons/md';
import logo from '../../assets/logo.png';

export const Sidebardata = [
  { id: '0', title: '', path: '/', icon: '', src: logo },

  { id: '1', title: 'Idea Posts', path: '', icon: <FcIdea /> },
  {
    id: '2',
    title: 'User Management',
    icon: <HiUserGroup />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,

    subNav: [
      {
        title: 'Users',
        path: '/admin/user-list',
      },
    ],
  },
  {
    id: '3',
    title: 'Setups',
    icon: <AiFillSetting />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Department',
        path: '/admin/department-list',
      },
      {
        title: 'Category',
        path: '/admin/category-list',
      },
    ],
  },
  {
    id: '4',
    title: 'System Management',
    icon: <MdOutlineSystemUpdateAlt />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Academic Year',
        path: '/admin/academic-year',
      },
      {
        title: 'Terms and Conditions',
        path: '',
      },
    ],
  },
  {
    id: '5',
    title: 'Reports',
    icon: <MdReport />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Ideas Summary Report',
        path: '',
      },
      {
        title: 'Activity Report',
        path: '',
      },
    ],
  },
  { id: '6', title: 'Logout', path: '', icon: <MdOutlineLogout /> },
];
