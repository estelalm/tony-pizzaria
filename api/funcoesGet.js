


//a funçao get precisou ser feita em 3 partes porque nao retornava o valor certo
//get favoritos
async function getFavoritos(idUsuario) {
    try {
        const url = 'http://localhost:8080/produtos/favoritos?usuario='+ idUsuario
        const response = await fetch(url)
        const data = await response.json()
        return data;
      } catch (error) {
      }
}
const infoFavorito = (favoritos) => {
    return favoritos.favoritos
}

//get recomendados
async function getRecomendados() {
    try {
        const url = 'http://localhost:8080/produtos/recomendados'
        const response = await fetch(url)
        const data = await response.json()
        return data;
      } catch (error) {
        console.error('Erro:', error)
      }
}
const infoRecomendados = (recomendados) => {
    return recomendados.recomendados
}

//get produtos por categoria
async function getProdutosCategoria(id) {
    try {
        const url = 'http://localhost:8080/produtos/categoria/id/'+id
        const response = await fetch(url)
        const data = await response.json()
        return data;
      } catch (error) {
        console.error('Erro:', error)
      }
}

const infoProdutosCategoria = (produtos) => {
    return produtos.produtos
}

//get usuarios

async function getUsuarios () {
    try {
        const url = 'http://localhost:8080/usuarios'
        const response = await fetch(url)
        const data = await response.json()
        return data
      } catch (erro) {
      }
}
const infoUsuarios = (usuarios) => {
    return usuarios.usuarios
}

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
const infoCategorias = (categorias) => {
    return categorias.categorias
}

//get produto por ID
async function getProduto (idProduto) {
    try {
        
        const url = 'http://localhost:8080/produto/id/' + idProduto
        const response = await fetch(url)
        const data = await response.json()
        return data
      } catch (erro) {
      }
}
const infoProduto = (produto) => {
    return produto.produto
}


//get comentarios
async function getComentarios (idProduto) {
    try {
        
        const url = 'http://localhost:8080/comentarios/produto/id/' + idProduto
        const response = await fetch(url)
        const data = await response.json()
        return data
      } catch (erro) {
      }
}
const infoComentarios = (comentarios) => {
    return comentarios.comentarios
}


module.exports ={
    getUsuarios,
    getFavoritos,
    getProdutosCategoria,
    getRecomendados,
    getCategorias,
    infoFavorito,
    infoRecomendados,
    infoProdutosCategoria,
    infoUsuarios,
    infoCategorias
}