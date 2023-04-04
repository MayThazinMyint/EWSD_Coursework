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
import logo from '../../assets/logo.png'


export const adminSidebardata = [
  {
    id: 0,
    title: '',
    path: '/home',
    icon: '',
    src: logo,
  },
  { id: 1, title: 'Dashboard', path: '/admin/dashboard', icon: <MdOutlineDashboardCustomize /> },
  {
    id: 2,
    title: 'Idea Posts',
    path: '/admin/ideas',
    icon: <FcIdea />,
  },
  {
    id: 3,
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
    id: 4,
    title: 'Setups',
    icon: <AiFillSetting />,
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
    id: 5,
    title: 'System Management',
    icon: <MdOutlineSystemUpdateAlt />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Acadmic Year',
        path: '/admin/academic-year',
      },
    ],
  },
  {
    id: 6,
    title: 'Logout',
    path: '',
    icon: <MdOutlineLogout />,
  },
];
export const QACoordinatorSidebardata = [
  {
    id: 0,
    title: '',
    path: '/home',
    icon: '',
    src: logo,
  },
  { id: 1, title: 'Dashboard', path: '/admin/dashboard', icon: <MdOutlineDashboardCustomize /> },
  {
    id: 2,
    title: 'Idea Posts',
    path: '/admin/ideas',
    icon: <FcIdea />,
  },
  {
    id: 3,
    title: 'Logout',
    path: '',
    icon: <MdOutlineLogout />,
  },
];
export const QAManagerSidebardata = [
  {
    id: 0,
    title: '',
    path: '/home',
    icon: '',
    src: logo,
  },
  { id: 1, title: 'Dashboard', path: '/admin/dashboard', icon: <MdOutlineDashboardCustomize /> },
  {
    id: 2,
    title: 'Idea Posts',
    path: '/admin/ideas',
    icon: <FcIdea />,
  },
 
  {
    id: 4,
    title: 'Setups',
    icon: <AiFillSetting />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Category',
        path: '/admin/category-list',
      },
    ],
  },
  {
    id: 6,
    title: 'Reports',
    icon: <MdReport />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
      {
        title: 'Anonymous Comment',
        path: '/admin/dashboard/anonymous-comment-report',
      },
      {
        title: 'Summary Report',
        path: '/admin/dashboard/summary',
      },
      {
        title: 'Customize Report',
        path: '/admin/dashboard/report',
      },
    ],
  },
  {
    id: 7,
    title: 'Logout',
    path: '',
    icon: <MdOutlineLogout />,
  },
];