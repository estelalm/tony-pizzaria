'use strict'


 async function getCategorias() {

    const url = 'http://localhost:8080/produtos/categorias' 
    const response = await fetch(url)
    const categorias = await response.json()

    return categorias
}

async function getCat(){
    return getCategorias().then(function(result){
        return result.categorias
    })
}

console.log(await getCategorias())


const loadPagina = () => {

    const categorias = getCategorias()
    categorias.forEach(criarCategorias())
}
