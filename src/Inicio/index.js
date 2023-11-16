
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiLocal from '../API/apiLocal/api'
import './inicio.estilo.scss'

export default function Inicio() {
    const navigation = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    const iToken = localStorage.getItem('@tklogin2023')
    const token = JSON.parse(iToken)

    useEffect(() => {
        if (!token) {
            navigation('/')
            return
        } else if (token) {
            async function verificaToken() {
                const resposta = await apiLocal.get('/ListarUsuarioToken', {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                if (resposta.data.dados) {
                    navigation('/')
                    return
                }
            }
            verificaToken()
        }
    }, [])

    async function handleLogin(e) {
        e.preventDefault()
        if (!email || !password) {
            toast.warn('Existem Campos em Branco')
        }

        try {
            const resposta = await apiLocal.post('/LoginUsuarios', {
                email, password
            })

            console.log(resposta.data.id)

            if (resposta.data.id) {
                const token = resposta.data.token
                localStorage.setItem('@tklogin2023', JSON.stringify(token))
                toast.success('Login Efetuado com sucesso')
                navigation('/Dashboard')
            }

        } catch (err) {
            toast.error(err.response.data.error)
        }
        return

    }

    return (
        <div>
            <div className='loginInicio'>
                <h1>Login</h1>
            </div>
            <div className='formInicio'>
                <form onSubmit={handleLogin}>
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <button type='submit'>Enviar</button>
                </form>
                <p>Para se cadastrar clique <Link to='/Login'>AQUI</Link></p>
            </div>
        </div>
    )
}