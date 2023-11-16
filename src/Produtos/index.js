import React, { useEffect, useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import apiLocal from '../API/apiLocal/api'
import { AuthContext } from '../Contexts/AuthContext'
import './produtos.estilo.scss'


export default function Produtos() {
    const navigation = useNavigate()
    const { loginToken } = useContext(AuthContext)

    const [categorias, setCategorias] = useState([''])
    const [nome, setNome] = useState('')
    const [fabricante, setFabricante] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [preco, setPreco] = useState('')

    const [idCategoria, setIdCategoria] = useState('')
    const [imagem, setImagem] = useState(null)


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

    useEffect(() => {
        async function loadCategorias() {
            const resposta = await apiLocal.get('/ListarCategorias', {
                headers: {
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            setCategorias(resposta.data)
        }
        loadCategorias()
    }, [categorias])

    function handleImagem(e) {
        if (!e.target.files) {
            return
        }
        const image = e.target.files[0]
        if (image.type === 'image/png' || image.type === 'image/jpeg') {
            setImagem(image)
        }
    }

    async function handleCadastrar(e) {
        try {
            e.preventDefault()

            if (nome === '' || fabricante === '' || quantidade === '' || preco === '' || idCategoria === '' ){
                toast.error('Campos em Branco')
                return;
            }

            const categoriaId = idCategoria
            const data = new FormData()

            data.append('nome', nome)
            data.append('fabricante', fabricante)
            data.append('quantidade', quantidade)
            data.append('preco', preco)
            data.append('categoriaId', categoriaId)
            data.append('file', imagem)
            
            const resposta = await apiLocal.post('/CriarProdutos', data, {

            })
            toast.success(resposta.data.dados)

        } catch (err) {
            console.log(err)
        }

        setNome('')
        setFabricante('')
        setQuantidade('')
        setPreco('')
        setImagem(null)
    }

    return (
        <div className="conteinerProdutosCadastro">
            <div>
                <h1>Produtos</h1>
            </div>
            <div>
                <form onSubmit={handleCadastrar}>
                    <select
                        value={idCategoria}
                        onChange={(e) => setIdCategoria(e.target.value)}
                    >
                        <option>Selecione...</option>
                        {categorias.map((item) => {
                            return (
                                <option
                                    value={item.id}>
                                    {item.nome}
                                </option>
                            )
                        })}
                    </select>
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <label>Fabricante:</label>
                    <input
                        type="text"
                        value={fabricante}
                        onChange={(e) => setFabricante(e.target.value)}
                    />
                    <label>Quantidade:</label>
                    <input
                        type="text"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                    <label>Preço:</label>
                    <input
                        type="text"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    />
                    <label>Imagem:</label>
                    <input
                        type="file"
                        // value={setImagem}
                        accept='image/jpeg, image/png'
                        onChange={handleImagem}
                    />
                    <button type='submit'>Enviar</button>
                </form>
            </div>
        </div>
    )
}