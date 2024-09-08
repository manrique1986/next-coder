"use client";
import { useAuthContext } from 'app/context/AuthContext';
import LoginPage from './Login/loginPage';


import React from 'react'

const AdminLayout = ({children, Login}) => {

  const {user} = useAuthContext()

   

  return (
    <div>   
        {
            user?.logged ? children : <LoginPage/>
        }

    </div>
  )
}

export default AdminLayout