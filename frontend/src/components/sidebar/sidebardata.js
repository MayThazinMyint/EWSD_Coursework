import React from "react";
import {RiArrowDownSFill, RiArrowUpSFill}  from 'react-icons/ri'
import {FcIdea} from 'react-icons/fc'
import {HiUserGroup}  from 'react-icons/hi'
import {AiFillSetting} from 'react-icons/ai'
import {
  MdOutlineSystemUpdateAlt,
  MdReport,
  MdOutlineLogout,
  MdOutlineDashboardCustomize,
} from 'react-icons/md';


export const Sidebardata = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: <MdOutlineDashboardCustomize />,
  },
  {
    title: 'Idea Posts',
    path: '',
    icon: <FcIdea />,
  },
  {
    title: 'User Management',
    icon: <HiUserGroup />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,

    subNav: [
      {
        title: 'Users',
        path: '/admin/user-list',
      },
      {
        title: 'User Registeration',
        path: '/admin/register-user',
      },
    ],
  },
  {
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
    title: 'System Management',
    icon: <MdOutlineSystemUpdateAlt />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Acadmic Year',
        path: '/admin/academic-year',
      },
      {
        title: 'Terms and Conditions',
        path: '',
      },
    ],
  },
  {
    title: 'Reports',
    icon: <MdReport />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Ideas',
        path: '/admin/dashboard/idea-report',
      },
      {
        title: 'Anonymous Comment',
        path: '/admin/dashboard/anonymous-comment-report',
      },
    ],
  },
  {
    title: 'Logout',
    path: '',
    icon: <MdOutlineLogout />,
  },
];