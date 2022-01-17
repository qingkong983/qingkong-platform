import React from 'react'
import MainBox from '../components/MainBox/indexNew'
import { Navigate } from 'react-router-dom'
import Home from '../pages/Home'

export default [
  {
    path: '/',
    element: <MainBox />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/project'} replace />,
      },
      {
        path: '/home',
        element: <Home />,
      }
    ],
  },
]
