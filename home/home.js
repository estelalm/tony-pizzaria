'use strict'

    let idUsuario = localStorage.getItem('usuarioId')

    console.log(idUsuario)
    async function getUsuarios() {
        try {
            const url = 'http://localhost:8080/usuarios'
            const response = await fetch(url)
            const data = await response.json()
            return data
        } catch (erro) {
        }
    }

    
    async function logar() {
        getUsuarios()
            .then((data) => {
            let usuarios = infoUsuarios(data)
                usuarios.forEach(usuario =>{
                    if(idUsuario == usuario.id){
                        const chamada = document.getElementById('headerP')
                        let nomeUsuario = usuario.nome.split(" ", 2)
                        chamada.innerHTML = '<a href="#">Home</a> Bom dia, ' + nomeUsuario[0] + "!"
                        const icon = document.querySelector('.perfil')
                        icon.src = '../img/' + usuario.imagem
                    }
                    
                })
    })
}
    const infoUsuarios = (usuarios) => {
        return usuarios.usuarios
    }
    logar()


//get categorias
async function getCategorias() {
    try {
        const url = 'http://localhost:8080/produtos/categorias'
        const response = await fetch(url)
        const data = await response.json()
        return data
      } catch (error) {
        console.error('Erro:', error)
      }
}
async function loadCategorias(){
    getCategorias()
    .then((data) =>{
        let categorias = infoCategorias(data)
            categorias.forEach(criarCategoria)
    })
}
const infoCategorias = (categorias) => {
    return categorias.categorias
}
const criarCategoria = (categoria) =>{

    if(categoria.icon != ""){
        const containerCategorias = document.getElementById('categorias-container')
        const linkCategoria = document.createElement('a') 
        linkCategoria.href = `#${categoria.nome}`
        const icon = document.createElement('img')
        icon.src = `../img/${categoria.icon}`
        icon.alt = categoria.nome
    
        linkCategoria.appendChild(icon)
        containerCategorias.appendChild(linkCategoria)
    }
}

//get favoritos
async function getFavoritos() {
    try {
        const url = 'http://localhost:8080/produtos/favoritos?usuario='+ idUsuario
        const response = await fetch(url)
        const data = await response.json()
        return data;
      } catch (error) {
        console.error('Erro:', error)
      }
}
async function loadFavoritos(){
    getFavoritos()
    .then((data) =>{
        let favoritos = infoFavorito(data)
            favoritos.forEach(criarFavorito)
    })
}
const infoFavorito = (favoritos) => {
    return favoritos.favoritos
}
const criarFavorito = (favorito) =>{

    const containerFavoritos = document.getElementById('fav-container')

    const display = document.createElement('div')
    display.classList.add('pizza-display')
    display.classList.add('display')
    display.classList.add('produto')

    const valor = document.createElement('span')
    valor.classList.add('preco')
    valor.innerHTML =`R$${favorito.preco}`

    const nomePizza = document.createElement('p')
    nomePizza.classList.add('nome-pizza')
    nomePizza.textContent = favorito.nome

    const imgPizza = document.createElement('img')
    imgPizza.src = `../img/${favorito.imagem}`

    display.replaceChildren(valor, nomePizza, imgPizza)
    containerFavoritos.appendChild(display)

    display.addEventListener('click', () =>{
        const idDoProduto = favorito.id
        localStorage.setItem('id-produto', idDoProduto)
        window.location.assign('../produto/produto.html')
    })

}


async function getProdutos(id) {
    try {
        const url = 'http://localhost:8080/produtos/categoria/id/'+id
        const response = await fetch(url)
        const data = await response.json()
        return data;
      } catch (error) {
        console.error('Erro:', error)
      }
}

//get bebidas

async function loadBebidas(){
    getProdutos(2)
    .then((data) =>{
        let bebidas = infoProdutosCategoria(data)
        bebidas.forEach(criarBebidas)
    })
}
const infoProdutosCategoria = (produtos) => {
    return produtos.produtos
}
const criarBebidas = (produto) =>{

    const containerProdutos = document.getElementById('container-bebidas')

    const displayProduto = document.createElement('div')
    displayProduto.classList.add('bebida')
    displayProduto.classList.add('produto')
    const imagemEtexto = document.createElement('div')
    imagemEtexto.classList.add('iconeEtexto')

    const imagem = document.createElement('img')
    imagem.src = `../img/${produto.imagem}`

    const texto = document.createElement('div')
    texto.classList.add('texto')

    const nomeProduto = document.createElement('h4')
    nomeProduto.textContent = produto.nome

    const descricao = document.createElement('p')
    descricao.innerHTML = produto.descricao

    const preco = document.createElement('span')
    preco.classList.add('preco')
    if(produto.valor == undefined)
    preco.textContent = 'R$0000'
    else
    preco.textContent = `R$${produto.valor}`

    texto.replaceChildren(nomeProduto, descricao)
    imagemEtexto.replaceChildren(imagem, texto)
    displayProduto.replaceChildren(imagemEtexto, preco)
    containerProdutos.appendChild(displayProduto)

    displayProduto.addEventListener('click', () =>{
        const idDoProduto = produto.id
        localStorage.setItem('id-produto', idDoProduto)
        window.location.assign('../produto/produto.html')
    })
    
}

async function loadProdutosCategoria(){
    getProdutos(2)
    .then((data) =>{
        let bebidas = infoProdutosCategoria(data)
        bebidas.forEach(criarBebidas)
    })
}
//criar as coisas
loadCategorias()
loadFavoritos()
loadBebidas()


