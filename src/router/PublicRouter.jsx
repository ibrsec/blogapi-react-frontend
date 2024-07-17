import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRouter = () => {
    const token = useSelector(state=>state.login.token)

  return !token ? <Outlet /> : <Navigate to='/'/>
}

export default PublicRouter