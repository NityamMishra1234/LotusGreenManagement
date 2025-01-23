import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import store from './RTK/store.js'
import OwnerSignup from './components/OwnerSignup/OwnerSignup.jsx'
import OwnerLogin from './components/OwnerLogin/OwnerLogin.jsx'
import DashBord from './components/DashBord/DashBord.jsx'
import Room from './components/Room/Room.jsx'
import Student from './components/Student/Student.jsx'
import Payment from './components/Payment/Payment.jsx'
import Expenses from './components/Expenses/Expenses.jsx'
import Requests from './components/Requests/Requests.jsx'
import StudentLogin from './components/StudentLogin/StudentLogin.jsx'
import Studentdashbord from './components/StudentDashbord/Studentdashbord.jsx'
import ProtectedRoute from './utils/ProtectedRoute.jsx'
const router = createBrowserRouter([
  {
    path:'/Signup',
    element:<OwnerSignup/>
  }
  ,{
    path:'/',
    element:<OwnerLogin/>
  },
  {
    path:"/DashBord",
    
    element:(
      <ProtectedRoute>
    <DashBord/>
    </ProtectedRoute>)
  },{
    path:"/rooms",
    element:(
      <ProtectedRoute>
    <Room/>
    </ProtectedRoute>)
  },{
    path:"/students",
    element:(
      <ProtectedRoute>
    <Student/>
    </ProtectedRoute>)
  },{
    path:"/payments",
    element:(
      <ProtectedRoute>
    <Payment/>
    </ProtectedRoute>)
  },{
    path:'/expenses',
    element:(
      <ProtectedRoute>
    <Expenses/>
    </ProtectedRoute>)
    
  },{
    path:'/requests',
    element:(
      <ProtectedRoute>
    <Requests/>
    </ProtectedRoute>)
  },{
    path:"/studentLogin",
    element:<StudentLogin/>
  },{
    path:"/Studentdashboard",
    element:<Studentdashbord/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
