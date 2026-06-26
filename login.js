/* =========================================================
   login.js  –  AcquaSafe
   Responsável por: cadastro, login de usuário e login admin
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) window.lucide.createIcons();

    /* ── Cadastro ── */
    const formCadastro = document.getElementById("formCadastro");
    if (formCadastro) {
        formCadastro.addEventListener("submit", (e) => {
            e.preventDefault();
            cadastrarUsuario();
        });

        const checkAdmin  = document.getElementById("isAdmin");
        const grupoAdmin  = document.getElementById("adminPasswordGroup");
        if (checkAdmin && grupoAdmin) {
            checkAdmin.addEventListener("change", () => {
                grupoAdmin.classList.toggle("hidden", !checkAdmin.checked);
            });
        }
    }
});

/* =========================================================
   CADASTRO
   ========================================================= */
function cadastrarUsuario() {
    const nome  = document.getElementById("cad-nome").value.trim();
    const login = document.getElementById("cad-login").value.trim();
    const senha = document.getElementById("cad-senha").value.trim();
    const isAdm = document.getElementById("isAdmin").checked;
    const senhaAdm = isAdm
        ? document.getElementById("admin-senha").value.trim()
        : "";

    if (!nome || !login || !senha) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }
    if (isAdm && !senhaAdm) {
        alert("Informe a senha administrativa.");
        return;
    }

    const usuario = { nome, login, senha, isAdmin: isAdm, adminSenha: senhaAdm };
    localStorage.setItem("usuarioAcquaSafe", JSON.stringify(usuario));
    alert("Cadastro realizado com sucesso!");
    window.location.href = "index.html";
}

/* =========================================================
   LOGIN DE USUÁRIO (index.html)
   ========================================================= */
function handleLogin(event) {
    event.preventDefault();

    const login = document.getElementById("login-usuario").value.trim();
    const senha = document.getElementById("login-senha").value.trim();
    const raw   = localStorage.getItem("usuarioAcquaSafe");

    if (!raw) {
        alert("Nenhum usuário cadastrado. Crie uma conta primeiro.");
        return;
    }

    const usuario = JSON.parse(raw);

    if (usuario.login === login && usuario.senha === senha) {
        const btnText = document.getElementById("btn-text");
        if (btnText) btnText.textContent = "✓ Acesso concedido";
        setTimeout(() => { window.location.href = "portal.html"; }, 900);
    } else {
        alert("Login ou senha incorretos.");
    }
}

/* =========================================================
   LOGIN ADMIN (login-admin.html)
   ========================================================= */
function loginAdmin() {
    const usuario = document.getElementById("usuario").value.trim();
    const senha   = document.getElementById("senha").value.trim();
    const raw     = localStorage.getItem("usuarioAcquaSafe");

    if (!raw) {
        alert("Nenhum administrador cadastrado.");
        return;
    }

    const user = JSON.parse(raw);

    if (user.isAdmin && user.login === usuario && user.adminSenha === senha) {
        localStorage.setItem("adminLogado", "true");
        window.location.href = "admin.html";
    } else {
        alert("Credenciais de administrador inválidas.");
    }
}

/* =========================================================
   LOGOUT ADMIN
   ========================================================= */
function logout() {
    localStorage.removeItem("adminLogado");
    window.location.href = "login-admin.html";
}
