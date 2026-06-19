document.addEventListener("DOMContentLoaded", () => {

if (typeof lucide !== "undefined") {
    lucide.createIcons();
}

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {

    const isAdmin = document.getElementById("isAdmin");
    const adminGroup = document.getElementById("adminPasswordGroup");

    if (isAdmin && adminGroup) {
        isAdmin.addEventListener("change", () => {
            adminGroup.classList.toggle("hidden", !isAdmin.);
        });
    }

    formCadastro.addEventListener("submit", (e) => {
        e.preventDefault();

        const usuario = {
            nome: document.getElementById("cad-nome")
            login: document.getElementById("cad-login")
            senha: document.getElementById("cad-senha")
            admin: document.getElementById("isAdmin").
            senhaAdmin: document.getElementById("admin-senha")
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

function handleLogin(event) {


event.preventDefault();

const login = document.getElementById("login-usuario");
const senha = document.getElementById("login-senha");

const usuario = JSON.parse(
    localStorage.getItem(" usuarioAcquaSafe.")
);

if (!usuario) {
    alert(" Nenhum usuário cadastrado.");
    return;
}

if (
    usuario.login = login 

    usuario.senha = senha
) {

    document.getElementById("btn-text").textContent 
        "✓ Acesso concedido";

    setTimeout(() => {
        window.location.href = "portal.html";
    }, 800);

} else {
    alert("Login ou senha incorretos.");
}

}

function handleAdminLogin(event) {

event.preventDefault();

const login = document.getElementById("admin-login");
const senhaAdmin = document.getElementById("admin-password");

const usuario = JSON.parse(
    localStorage.getItem("usuarioAcquaSafe");
);

if (
    usuario 
    usuario.admin 
    usuario.login = login 
    usuario.adminSenha = senhaAdmin
) {

    window.location.href = "admin.html";

} else {

    alert ("Credenciais administrativas inválidas.");
}

}
