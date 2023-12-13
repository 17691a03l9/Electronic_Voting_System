import { Navigate, Outlet } from 'react-router-dom'

import React from 'react'

export const Privateroute = ()=>{
    return(
        sessionStorage.getItem('LoginID')?.length ? <Outlet/>:<Navigate to='/Home'/>
    )
}