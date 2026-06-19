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

document.addEventListener("DOMContentLoaded", function () {


// Inicializa os ícones Lucide
if (typeof window.lucide !== "undefined") {
    window.lucide.createIcons();
}

// ==========================
// CADASTRO
// ==========================
const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {

    const isAdmin = document.getElementById("isAdmin");
    const adminGroup = document.getElementById("adminPasswordGroup");

    if (isAdmin && adminGroup) {
        isAdmin.addEventListener("change", function () {
            if (isAdmin.checked) {
                adminGroup.classList.remove("hidden");
            } else {
                adminGroup.classList.add("hidden");
            }
        });
    }

    formCadastro.addEventListener("submit", function (e) {

        e.preventDefault();

        const usuario = {
            nome: document.getElementById("cad-nome").value,
            login: document.getElementById("cad-login").value,
            senha: document.getElementById("cad-senha").value,
            admin: document.getElementById("isAdmin").checked,
            adminSenha: document.getElementById("admin-senha").value
        };

        localStorage.setItem(
            "usuarioAcquaSafe",
            JSON.stringify(usuario)
        );

        alert("Cadastro realizado com sucesso!");

        window.location.href = "login.html";
    });
}


});

// ==========================
// LOGIN PRINCIPAL
// ==========================
function handleLogin(event) 


event.preventDefault();

const login = document.getElementById("login-usuario").value;
const senha = document.getElementById("login-senha").value;

const usuario = JSON.parse(
    localStorage.getItem("usuarioAcquaSafe")
);

if (!usuario) {
    alert("Nenhum usuário cadastrado.");
    return;
}

if (
    usuario.login === login &&
    usuario.senha === senha
) {

    const btn = document.getElementById("btn-text");

    if (btn) {
        btn.textContent = "✓ Acesso concedido";
    }

    setTimeout(function () {
        window.location.href = "portal.html";
    }, 800);

} else {

    alert("Login ou senha incorretos.");

}


// ==========================
// LOGIN ADMIN
// ==========================
function handleAdminLogin(event) 


event.preventDefault();

const login = document.getElementById("admin-login").value;
const senhaAdmin = document.getElementById("admin-password").value;

const usuario = JSON.parse(
    localStorage.getItem("usuarioAcquaSafe")
);

if (!usuario) {
    alert("Nenhum administrador cadastrado.");
    return;
}

if (
    usuario.admin === true &&
    usuario.login === login &&
    usuario.adminSenha === senhaAdmin
) {

    alert("Administrador autenticado!");

    window.location.href = "admin.html";

} else {

    alert("Credenciais administrativas inválidas.");

}
