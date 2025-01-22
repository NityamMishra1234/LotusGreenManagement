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
import Expenses from './components/Expenses/expenses.jsx'
import Requests from './components/Requests/Requests.jsx'
import StudentLogin from './components/StudentLogin/StudentLogin.jsx'
import Studentdashbord from './components/StudentDashbord/Studentdashbord.jsx'

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
    element:<DashBord/>
  },{
    path:"/rooms",
    element:<Room/>
  },{
    path:"/students",
    element:<Student/>
  },{
    path:"/payments",
    element:<Payment/>
  },{
    path:'/expenses',
    element:<Expenses/>
  },{
    path:'/requests',
    element:<Requests/>
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
