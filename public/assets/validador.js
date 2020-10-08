const btnEnviar = document.querySelector('[data-btn-enviar]')
btnEnviar.addEventListener('click', (evento)=>
{
    const senha = document.querySelector('[data-senha]')
    const confirmarSenha = document.querySelector('[data-confirmar-senha]')
    console.log('Senha: '+senha.value)
    console.log('Confirmar Senha: ' +confirmarSenha.value)
    if(senha.value != confirmarSenha.value)
    {
        alert('Erro! Não foi possível confirmar a senha. Verifique se em ambos os campos elas são iguais')
        evento.preventDefault()
    }
})
