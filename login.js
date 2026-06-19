function handleLogin(e) {
    e.preventDefault();
    
    const btn = document.getElementById('btn-text');
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    const originalText = btn.textContent;
    
    btn.textContent = 'Acessando...';
    
    setTimeout(() => {
        btn.textContent = '✓ Acesso concedido';
        // Simulação de sucesso
        setTimeout(() => {
            window.location.href = "portal.html"; // Redireciona para o painel
        }, 800);
    }, 1200);
}

// Element SDK Configuration
const Config = {
    page_title: 'Bem-vindo ao AcquaSafe',
    page_subtitle: 'Monitoramento de qualidade de água em tempo real',
    login_button_text: 'Acessar Painel',
    background_color: '#0a0f1a',
    text_color: '#ffffff',
    primary_action_color: '#22d3ee',
    secondary_action_color: '#94a3b8',
    font_family: 'DM Sans',
    font_size: 16
};

function applyConfig(config) {
    const title = document.getElementById('page-title');
    const subtitle = document.getElementById('page-subtitle');
    const btnText = document.getElementById('btn-text');
    
    if (title) title.textContent = config.page_title || defaultConfig.page_title;
    if (subtitle) subtitle.textContent = config.page_subtitle || defaultConfig.page_subtitle;
    if (btnText) btnText.textContent = config.login_button_text || defaultConfig.login_button_text;
    
    document.body.style.backgroundColor = config.background_color || defaultConfig.background_color;
    document.body.style.color = config.text_color || defaultConfig.text_color;
    
    const font = config.font_family || defaultConfig.font_family;
    document.body.style.fontFamily = `${font}, sans-serif`;
}

function handleLogin(e){
    e.preventDefault();

    // @ts-ignore
    const login = document.getElementById("login").value.trim();
    // @ts-ignore
    const senha = document.getElementById("senha").value.trim();

    const usuario = JSON.parse(
        localStorage.getItem("usuarioAcquaSafe")
    );

    if(
        usuario 
    
        // @ts-ignore
        usuario.login = login 
        usuario.senha = senha
    ) 
    {
        alert("Login realizado!");
        window.location.href = "portal.html";
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    } else 
        { 
        alert("Login ou senha incorretos!");
    }
}