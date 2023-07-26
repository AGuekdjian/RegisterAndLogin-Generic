import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
    const { auth } = useAuth()
    console.log(auth);

    return (
        <nav className="navbar__container-lists">

            <ul className="container-lists__menu-list">
                <li className="menu-list__item">
                    <a href="#" className="menu-list__link">
                        <i className="fa-solid fa-house"></i>
                        <span className="menu-list__title">Inicio</span>
                    </a>
                </li>

                <li className="menu-list__item">
                    <a href="#" className="menu-list__link">
                        <i className="fa-solid fa-list"></i>
                        <span className="menu-list__title">Timeline</span>
                    </a>
                </li>

                <li className="menu-list__item">
                    <a href="#" className="menu-list__link">
                        <i className="fa-solid fa-user"></i>
                        <span className="menu-list__title">Gente</span>
                    </a>
                </li>

                <li className="menu-list__item">
                    <a href="#" className="menu-list__link">
                        <i className="fa-regular fa-envelope"></i>
                        <span className="menu-list__title">Mensajes</span>
                    </a>
                </li>
            </ul>

            <ul className="container-lists__list-end">
                <li className="list-end__item">
                    <a href="#" className="list-end__link">
                        <span className="list-end__name">{auth.name}</span>
                    </a>
                </li>
                <li className="list-end__item">
                    <NavLink to="/presupuesto/logout" className="list-end__link">
                        <span className="list-end__name">Cerrar Sesion</span>
                    </NavLink>
                </li>
            </ul>

        </nav>
    )
}