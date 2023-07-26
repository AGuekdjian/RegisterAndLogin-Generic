import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'
import { NavLink } from 'react-router-dom'

export const Login = () => {
    const { form, changed } = useForm({})
    const [logged, setLogged] = useState("not_sended")

    const { setAuth } = useAuth()

    const loginUser = async (e) => {
        e.preventDefault()

        let userToLogin = form

        try {
            const res = await fetch(`${Global.url}/user/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userToLogin)
            })

            const data = await res.json()

            if (data.status == "Success") {
                localStorage.setItem("token", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))

                setLogged("logged")
                setAuth(data.user)
                setTimeout(() => {
                    window.location.reload()
                }, 400)
            } else {
                setLogged("error")
            }

            console.log(data);
        } catch (error) {
            console.log(error)
            throw new Error("Ha ocurrido un error!")
        }
    }

    return (
        <div>
            <form onSubmit={loginUser}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={changed} />
                </div>
                <div>
                    <label htmlFor="password">Contrasenia</label>
                    <input type="password" name="password" onChange={changed} />
                </div>
                <input type='submit' value="Iniciar Sesion" />
                <div>
                    <h3>Olvide mi contrasenia</h3>
                    <NavLink to="/register">Registrarse</NavLink>
                </div>
            </form>
            <div>
                <strong>{logged == "logged" ? "Usuario logeado correctamente" : "Hubo un error al logearse"}</strong>
            </div>
        </div>
    )
}
