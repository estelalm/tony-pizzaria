'use strict'


 async function getCategorias() {

    const url = 'http://localhost:8080/produtos' 
    const response = await fetch(url)
    const categorias = await response.json()

    return categorias
}

console.log(getCategorias())

