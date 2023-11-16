import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiLocal from '../API/apiLocal/api'
import { AuthContext } from '../Contexts/AuthContext'

export default function Categoria() {

    const [nome, SetNome] = useState('')

    const navigation = useNavigate()
    const { loginToken } = useContext(AuthContext)

    useEffect(() => {
        const iToken = localStorage.getItem('@tklogin2023')
        const token = JSON.parse(iToken)

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
    })

    async function CriarCategoria(event) {
        event.preventDefault()
        if (nome === '') {
            toast.error('Campos em Branco')
            return;
        }
    }

    return (
        <div>
            <h2>Criar Categoria</h2>
            <form>
                <label>Nome:</label>
                <input
                    type="text"
                />
            </form>
        </div>
    )
}