import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import Private from './Private'

export default function PrivateLayout() {
    const { auth } = useAuth()

    return (
        <>
            <section className='layout__content'>
                {auth._id ?
                    <Private />
                    :
                    <Navigate to="/login" />
                }
            </section>
        </>
    )
}
