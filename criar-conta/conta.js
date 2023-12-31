'use strict'

const botCriar = document.getElementById('criar-conta')


const mudarPerfil = () => {

    const inputIcon = document.getElementById('add-img')
    const icon = document.getElementById('icon')

    let iconImage

    inputIcon.addEventListener('change', (e) => {

        const inputTarget = e.target
        const file = inputTarget.files[0]

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.addEventListener('load', (e) => {
                const readerTarget = e.target

                iconImage = readerTarget.result

                console.log(iconImage)

                icon.style.backgroundImage = `url(${iconImage})`
            })
        }
    })

    return iconImage
}

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
const getIdNovoUsuario = () =>{
    getUsuarios()
    .then((data) =>{
        let usuarios = infoUsuarios(data)
        let novoId = usuarios.length  + 1
        localStorage.setItem('novoid', novoId)
    })

    return localStorage.getItem('novoid')
}
console.log(getIdNovoUsuario())
const criarConta = () => {

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const senhaConfirmada = document.getElementById('confirma-senha').value
    const telefone = document.getElementById('telefone').value
    const icon = mudarPerfil()

    if (nome == "" || email == "" || senha == "" || senhaConfirmada == "" || telefone == "") {
    } else if (senha != senhaConfirmada) {
        alert("As senhas não são iguais")
    } else {
        alert("Conta criada, voltando para a página de login.  [AVISO: a página está com problema no momento, mas é só clicar no botao de voltar para logar normalmente]")
        window.location.assign("../index.html")
        console.log('ok')
    }

    let JSONusuario = {
            id: getIdNovoUsuario(),
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone,
            imagem: icon,
            localizacao : [
            ]
        }  
    return JSONusuario
}

const cadastrarUsuario = async () =>{

        let usuario = criarConta()
        const url = 'http://localhost:8080/usuarios'
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(usuario)
        }
        console.log(usuario)
    
       const response = await fetch(url, options)
    // .then(response => response.json()).then(data => console.log(data))

    return response.ok
}

 mudarPerfil()
//a conta cria normal, mas a página da erro
botCriar.addEventListener('click', cadastrarUsuario)