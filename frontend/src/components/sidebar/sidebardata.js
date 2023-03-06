import React from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri'
export const Sidebardata = [
  {
    title: 'Idea Posts',
    path: '',
  },
  {
    title: 'User Management',
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Users',
        path: '/admin/user-list',
      },
      {
        title: 'Category Listing',
        path: '/admin/category-list',
      },
    ],
  },
  {
    title: 'Setups',
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Department',
        path: '/admin/department-list',
      }
    ],
  },
  {
    title: 'System Management',
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Application Setting',
        path: '',
      },
      {
        title: 'Terms and Conditions',
        path: '',
      },
    ],
  },
  {
    title: 'Reports',
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
];