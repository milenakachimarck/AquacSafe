// Inicializa os ícones da biblioteca Lucide
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

// Lógica de Login
function handleLogin(e) {
    e.preventDefault();
    
    const btnText = document.getElementById('btn-text');
    const originalText = btnText.textContent;
    
    // Feedback visual
    btnText.textContent = 'Acessando...';
    
    setTimeout(() => {
        btnText.textContent = '✓ Acesso concedido';
        // Efeito de desfoque no formulário após sucesso
        const form = e.target;
        form.style.opacity = '0.6';
        form.style.pointerEvents = 'none';
        
        console.log("Login efetuado!");
    }, 800);
}
