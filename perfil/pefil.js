'use strict'

let idUsuario = localStorage.getItem('usuarioId')
const botSair = document.getElementById('sair')
botSair.addEventListener('click', () =>{
    window.location.assign('../index.html')
    localStorage.setItem('usuarioId', 0)
})

async function getUsuario() {
    try {
        const url = 'http://localhost:8080/usuario/id/' + idUsuario
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (erro) {
    }
}
async function loadUsuario() {
    getUsuario()
        .then((data) => {
        let usuario = infoUsuario(data)
        criarPerfil(usuario)
})
}
const infoUsuario = (usuario) => {
    return usuario.usuario
}
const criarPerfil = (usuario) =>{

    const icon = document.getElementById('icon')
    if(usuario.imagem)
    icon.style.backgroundImage = `url(${'../img/' + usuario.imagem + ''})`
    else
    icon.style.backgroundImage = `url('../img/person.png')`

    const nomeEcidade = document.querySelector('.nomeEcidade')
    const nome = document.createElement('h3')
    nome.textContent = usuario.nome
    const cidade = document.createElement('span')

    const containerperfil = document.getElementById('info')

    const atributosPerfil = ['Telefone', 'Email', 'Localizacao']

    atributosPerfil.forEach(atributo =>{

        const userInfo = document.createElement('div')
        userInfo.classList.add('user-info')

        const iconImg = document.createElement('img')
        iconImg.src = `../img/${atributo.toLowerCase()}.png`
        const icon = document.createElement('div')
        icon.classList.add('info-icon')
        icon.appendChild(iconImg)

        const titulo = document.createElement('span')
        titulo.textContent = atributo

        let infoAtributo = document.createElement('p')
        if(atributo.toLowerCase() == 'localizacao'){

            if(usuario.localizacao.length> 0){
                const arrayLocalizacao = usuario.localizacao[0]
                infoAtributo.textContent = arrayLocalizacao.logradouro + ", " + arrayLocalizacao.bairro + ", " + arrayLocalizacao.pais
                cidade.textContent = arrayLocalizacao.cidade +" - " + arrayLocalizacao.estado
            }else{
                infoAtributo.textContent = 'Adicionar endereço'
                cidade.textContent = ""
            }
        }
        else
        infoAtributo = usuario[atributo.toLowerCase()]

        nomeEcidade.replaceChildren(nome, cidade)
        userInfo.replaceChildren(icon, titulo, infoAtributo)    
        containerperfil.appendChild(userInfo)
    })

}

loadUsuario()

