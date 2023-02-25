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
                title: 'User Registration',
                path: '',
            },
            {
                title: 'Role Listing',
                path: '',
            },
        ]
    },
    {
        title: 'Setups',
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        subNav: [
            {
                title: 'Department',
                path: '/admin/department-list',
            },
            {
                title: 'Category',
                path: '',
            },
        ]
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
        ]
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
        ]
    },
]