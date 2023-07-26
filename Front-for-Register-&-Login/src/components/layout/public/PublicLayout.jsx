import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

export default function PublicLayout() {
    const { auth } = useAuth()
    return (
        <>
            <section className='layout__content'>
                {!auth._id ?
                    <Outlet />
                    :
                    <Navigate to="/presupuesto" />
                }

            </section>
        </>
    )
}
