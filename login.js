// Função de Login (exemplo)
function handleLogin(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('login-usuario').value;
    const senha = document.getElementById('login-senha').value;

    if (usuario && senha) {
        // Simulação de login bem-sucedido
        alert("Login realizado com sucesso! (Simulação)");
        // Redirecionar para o painel (mude o nome do arquivo se necessário)
        // window.location.href = "painel.html";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Inicialização dos ícones Lucide
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});
