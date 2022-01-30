import { Navigate } from 'react-router-dom'
import MainBox from '../components/MainBox'
import Calendar from '../pages/Calendar'
import CalendarCreateAndUpdate from '../pages/Calendar/CreateAndUpdate'

export default [
  {
    path: '/',
    element: <MainBox />,
    children: [
      {
        path: '/',
        element: <Navigate to="/calendar" replace />,
      },
      {
        path: 'calendar/:id',
        element: <CalendarCreateAndUpdate />,
      },
      {
        path: '/calendar',
        element: <Calendar />,
      },
    ],
  },
]
