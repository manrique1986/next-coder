import LoginForm from 'app/components/auth/loginForm'
import React from 'react'

export const metadata = {
  title: "Login",
  description: "",
};


const loginPage = () => {
  return (
    <div>
        <LoginForm/>
    </div>
  )
}

export default loginPage