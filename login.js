// Aguarda o documento carregar para iniciar os ícones
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Função de Login
function handleLogin(e) {
    e.preventDefault();
    
    const btnText = document.getElementById('btn-text');
    
    // Feedback visual de carregamento
    btnText.textContent = 'Acessando...';
    
    setTimeout(() => {
        btnText.textContent = '✓ Acesso concedido';
        // Reduz a opacidade do formulário para dar efeito de finalizado
        const form = e.target;
        form.style.opacity = '0.6';
        form.style.pointerEvents = 'none'; // Impede cliques repetidos
        
        console.log("Login realizado com sucesso!");
    }, 800);
}
