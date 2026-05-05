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

<script>
    // Função principal de login
    async function handleLogin(event) {
        event.preventDefault();
        
        const btn = document.getElementById('loginBtn');
        const btnText = document.getElementById('btn-text');
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Validação básica
        if (!username || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Efeito de carregamento
        btn.disabled = true;
        btnText.textContent = "Verificando...";

        // Simulação de requisição (substitua depois pela sua API real)
        await new Promise(resolve => setTimeout(resolve, 1800));

        // Sucesso
        btnText.innerHTML = `
            <span class="flex items-center justify-center gap-2">
                <i data-lucide="check-circle" class="w-5 h-5"></i>
                Acesso concedido
            </span>
        `;
        btn.classList.add('!bg-emerald-500');

        // Aguarda um pouco para o usuário ver a mensagem
        await new Promise(resolve => setTimeout(resolve, 1200));

        // === REDIRECIONAMENTO ===
        window.location.href = "dashboard.html";  // ← Mude para o nome da sua página principal
    }

    // Inicializa ícones do Lucide
    document.addEventListener('DOMContentLoaded', () => {
        lucide.createIcons();
    });
</script>