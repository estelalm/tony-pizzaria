'use strict'


let idUsuario = localStorage.getItem('usuarioId') 
async function getProduto () {
    try {
        const idProduto = localStorage.getItem('id-produto')
        const url = 'http://localhost:8080/produto/id/' + idProduto
        const response = await fetch(url)
        const data = await response.json()
        return data
      } catch (erro) {
      }
}
async function loadProduto(){
    getProduto()
    .then((data) =>{
        let produto = infoProduto(data)
        criarProduto(produto)
        console.log(produto)
    })
}
const infoProduto = (produto) => {
    return produto.produto
}

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
        let arrayFavoritos = []
        favoritos.forEach(fav =>{
            arrayFavoritos.push(fav.id)
        })
        localStorage.setItem('arrayFavs', arrayFavoritos)
    })
}
const infoFavorito = (favoritos) => {
    return favoritos.favoritos
}
loadFavoritos()


const toggleFavorito = async (infoFav) =>{

    const url = 'http://localhost:8080/produtos/favoritos?usuario=' + idUsuario
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(infoFav)
    }
   const response = await fetch(url, options)
// .then(response => response.json()).then(data => console.log(data))

return response.ok
}

const criarProduto = (produto) =>{

    const containerProduto = document.getElementById('produto')

    const picture = document.getElementById('picture')
    picture.style.backgroundImage = `url(${'../img/' + produto.imagem + ''})`

    console.log(produto.imagem)
    const heart = document.createElement('img')
    heart.classList.add('heart')

    let eFavorito = false
    let arrayFavoritos = localStorage.getItem('arrayFavs')

        if(arrayFavoritos.includes(arrayFavoritos.toString())){
            heart.src = '../img/hart.svg'
            eFavorito = true
        }else{
            heart.src = '../img/hart-vazio.svg' 
             eFavorito = false
        }


    heart.addEventListener('click',  (botaoFav) =>{

        if(heart.src.includes('vazio')){
            heart.src = '../img/hart.svg'
            eFavorito = true
        }else{
            heart.src = '../img/hart-vazio.svg'
             eFavorito = false
        }
        let infoFav = {
            usuario: idUsuario,
            produto: produto.id,
            efavorito: eFavorito
        }
        toggleFavorito(infoFav)
     })

    const infoProduto = document.getElementById('info-produto')
    const nomeProduto = document.createElement('h1')
    nomeProduto.classList.add('nome-produto')
    nomeProduto.textContent = produto.nome
    const preco = document.createElement('h2')
    preco.classList.add('preco')
    preco.textContent = produto.preco
    const descricaoProduto = document.createElement('p')
    descricaoProduto.classList.add('descricao')
    descricaoProduto.textContent= produto.descricao
    const avaliacaoProduto = document.createElement('div')
    avaliacaoProduto.classList.add('avaliacao')

    for(let index = 1; index <= produto.avaliacao;index++){
        let estrela = document.createElement('img')
        estrela.src = '../img/estrela.svg'
        estrela.classList.add(`s${index}`)

        avaliacaoProduto.appendChild(estrela)
    }

    infoProduto.replaceChildren(nomeProduto, preco, descricaoProduto, avaliacaoProduto, heart)

    const comentariosContainer = document.getElementById('coment-container')

    produto.comentarios.forEach((comentario) =>{

        const caixaComentario = document.createElement('div')
        caixaComentario.classList.add('comentario')
        const cabecalho = document.createElement('div')
        cabecalho.classList.add('cabecalho-comentario')
        const iconeEnome = document.createElement('div')
        iconeEnome.classList.add('iconeEnome')
        const userIcone = document.createElement('img')
        if(comentario.perfil!=undefined)
        userIcone.src = `../img/${comentario.perfil}`
        else
        userIcone.src = '../img/person.png'

        const infoComentario = document.createElement('div')
        infoComentario.classList.add('info-comentario')
        const nomeUsuario = document.createElement('span')
        nomeUsuario.classList.add('nome')
        nomeUsuario.textContent = comentario.usuario
        const dataComentario = document.createElement('span')
        dataComentario.classList.add('data')
        dataComentario.textContent = comentario.data

        infoComentario.replaceChildren(nomeUsuario, dataComentario)
        iconeEnome.replaceChildren(userIcone, infoComentario)


        const avaliacaoComentario = document.createElement('div')
        avaliacaoComentario.classList.add('avaliacao-comentario')
       
        for(let index = 1; index <= comentario.avaliacao; index++){
            let estrela = document.createElement('img')
            estrela.src = '../img/estrela.svg'
    
            avaliacaoComentario.appendChild(estrela)
        }

        cabecalho.replaceChildren(iconeEnome, avaliacaoComentario)
    
        const textoComentario = document.createElement('p')
        textoComentario.classList.add('texto-comentario')
        const tituloComentario = document.createElement('span')
        tituloComentario.textContent = comentario.tituloComentario
        textoComentario.appendChild(tituloComentario)
        textoComentario.textContent = comentario.conteudo

        caixaComentario.replaceChildren(cabecalho, textoComentario)
        comentariosContainer.appendChild(caixaComentario)
    })

}
 loadProduto()


 