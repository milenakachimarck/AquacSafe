// Inicializa os ícones da biblioteca Lucide
lucide.createIcons();

// Função que lida com o clique no botão de login
function handleLogin(e) {
    e.preventDefault();
    
    const btnText = document.getElementById('btn-text');
    const originalText = btnText.textContent;
    
    // Feedback visual de carregamento
    btnText.textContent = 'Acessando...';
    
    setTimeout(() => {
        btnText.textContent = '✓ Acesso concedido';
        // Efeito visual no formulário
        btnText.parentElement.parentElement.style.opacity = '0.6';
        
        // Aqui você poderia redirecionar o usuário:
        // window.location.href = 'dashboard.html';
    }, 800);
}
