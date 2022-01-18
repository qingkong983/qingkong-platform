import React from 'react'
import MainBox from '../components/MainBox/indexNew'
import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Calendar from '../pages/Calendar'
import CalendarCreateAndUpdate from '../pages/Calendar/CreateAndUpdate'

export default [
  {
    path: '/',
    element: <MainBox />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/calendar'} replace />,
      },
      {
        path: 'calendar/:id',
        element: <CalendarCreateAndUpdate />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      }
    ],
  },
]
