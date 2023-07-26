import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global'
import { NavLink } from 'react-router-dom'

export const Register = () => {
    const { form, changed } = useForm({})
    const [saved, setSaved] = useState("not_sended")

    const saveUser = async (e) => {
        e.preventDefault()

        let newUser = form

        try {
            const res = await fetch(`${Global.url}/user/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })

            const data = await res.json()

            if (data.status == "Success") {
                setSaved("saved")
            } else {
                setSaved("error")
            }

        } catch (error) {
            console.log(error)
            throw new Error("Ha ocurrido un error!")
        }
    }
    return (
        <>
            <div>
                <form onSubmit={saveUser}>
                    <div>
                        <div>
                            <label htmlFor="name">Nombre</label>
                            <input type="text" name='name' onChange={changed} />
                        </div>
                        <div>
                            <label htmlFor="surname">Apellido</label>
                            <input type="text" name='surname' onChange={changed} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={changed} />
                    </div>
                    <div>
                        <label htmlFor="password">Contrasenia</label>
                        <input type="password" name="password" onChange={changed} />
                    </div>
                    <input type='submit' value="Registrar" />
                    <NavLink to="/login">Iniciar Sesion</NavLink>
                </form>
                <div>
                    <strong>{saved == "saved" ? "Usuario registrado correctamente" : "Hubo un error al registrar el usuario"}</strong>
                </div>
            </div>
        </>
    )
}
