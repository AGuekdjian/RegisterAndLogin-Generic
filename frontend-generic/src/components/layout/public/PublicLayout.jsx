import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import "./PublicLayout.css"

export default function PublicLayout() {
    const { auth } = useAuth()
    return (
        <>
            <main className='layout__public'>
                {!auth._id ?
                    <Outlet />
                    :
                    <Navigate to="/presupuesto" />
                }

            </main>
        </>
    )
}
