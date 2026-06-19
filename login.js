function handleLogin(e) {
    e.preventDefault();
    
    const btn = document.getElementById('btn-text');
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
const defaultConfig = {
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

document.addEventListener('DOMContentLoaded', () => {
    // @ts-ignore
    lucide.createIcons();
    
    // Inicializa Element SDK
    if (window.elementSdk) {
        window.elementSdk.init({
            defaultConfig,
            onConfigChange: (config) => applyConfig(config),
            mapToCapabilities: (config) => ({
                recolorables: [
                    { get: () => config.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); }},
                    { get: () => config.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); }}
                ],
                fontEditable: {
                    get: () => config.font_family,
                    set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
                }
            })
        });
    }
});

document.getElementById("formCadastro").addEventListener("submit", function(e){
    e.preventDefault();

    const nome = document.getElementById("cad-nome").value;
    const login = document.getElementById("cad-login").value;
    const senha = document.getElementById("cad-senha").value;
    const isAdmin = document.getElementById("isAdmin").checked;
    const adminSenha = document.getElementById("admin-senha").value;

    const usuario = {
        nome,
        login,
        senha,
        isAdmin,
        adminSenha
    };

    localStorage.setItem("usuarioAcquaSafe", JSON.stringify(usuario));

    alert("Cadastro realizado com sucesso!");

    window.location.href = "index.html";
});