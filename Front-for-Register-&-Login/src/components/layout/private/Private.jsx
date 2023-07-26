import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import useAuth from '../../../hooks/useAuth'

export default function Private() {
    const { auth, loading } = useAuth()

    if (loading) {
        return <h2>Cargando...</h2>
    } else {
        return (
            <>
                <Outlet />
                <Header />
                <section>
                    <div>
                        {auth.name + " " + auth.surname}
                    </div>
                </section>
            </>
        )
    }
}
