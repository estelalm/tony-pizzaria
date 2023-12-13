'use strict'

const botComecar = document.getElementById('comecar')
const botEntrar = document.getElementById('entrar')

const mostrarLogin = () => {

    const title = document.getElementById('title')
    const subtitle = document.getElementById('subtitle')
    const loginContainer = document.getElementById('login')

    title.innerHTML = 'Acesse a sua <br> conta'
    subtitle.textContent = "O que você está esperando para saborear as mais deliciosas pizzas e sobremesas da região?"
    title.classList.remove('inicial')

    loginContainer.classList.add('show')
    loginContainer.classList.add('remove')

    botComecar.classList.add('hide')
}
botComecar.addEventListener('click', mostrarLogin)


async function getUsuarios() {
    try {
        const url = 'http://localhost:8080/usuarios'
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (erro) {
    }
}

document.getElementById('email').value = "celso.silva@email.com"
document.getElementById('senha').value = "Fulano01"

async function logar() {
    getUsuarios()
        .then((data) => {

            let usuarios = infoUsuarios(data)
            let loginValido = false

            let login = document.getElementById('email').value
            let senha = document.getElementById('senha').value

            usuarios.forEach((usuario) => {

                let usuarioEmail
                let usuarioSenha
                if (usuario.email == login && senha == usuario.senha) {
                    usuarioEmail = usuario.email
                    usuarioSenha = usuario.senha
                    let idUsuario = usuario.id
                    localStorage.setItem('usuarioId', idUsuario)
                    console.log(localStorage.getItem('usuarioId'))
                    loginValido = true
                } 
            })
            if(loginValido)
            window.location.assign('../home/home.html')
            else
            alert('Usuário ou senha incorretos')
            
        })
}
const infoUsuarios = (usuarios) => {
    return usuarios.usuarios
}

botEntrar.addEventListener('click', logar)