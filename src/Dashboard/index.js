import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiLocal from '../API/apiLocal/api'
import { AuthContext } from '../Contexts/AuthContext'

export default function Dashboard() {
    const navigation = useNavigate()
    const { loginToken } = useContext(AuthContext)

    useEffect(() => {
        const iToken = localStorage.getItem('@tklogin2023')
        const token = JSON.parse(iToken)

        if(!token){
            navigation('/')
            return
        } else if (token){
            async function verificaToken(){
                const resposta = await apiLocal.get('/ListarUsuarioToken', {
                    headers: {
                        Authorization: 'Bearer ' + `${token}`
                    }
                })
                if(resposta.data.dados){
                    navigation('/')
                    return
                }
            }
            verificaToken()
        }
        
        loginToken()
    }, [])

    function handleSair(){
        localStorage.clear()
        setInterval(() => {
            navigation('/')
        }, 1000)
    }

    return (
        <div>
            <h1>Dashboard</h1>

            <Link to='/Produtos'>
                Cadastrar Produtos
            </Link>
            
            <br/>
            <br/>
            <br/>

            <button onClick={handleSair}>
                Sair
            </button>
        </div>
    )
}