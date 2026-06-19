{   document.addEventListener("DOMContentLoaded", () => 
 }
   
// ==========================
// ÍCONES

{
if (typeof lucide !== "undefined") 
    lucide.createIcons();
}

// ==========================
 CADASTRO

{
const formCadastro = document.getElementById("formCadastro");

if (formCadastro) 

    const isAdmin = document.getElementById("isAdmin");
    const adminGroup = document.getElementById("adminPasswordGroup");

    if (isAdmin && adminGroup) {
        isAdmin.addEventListener("change", () => {
            adminGroup.classList.toggle("hidden", !isAdmin.checked);
        });
    }

    formCadastro.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = document.getElementById("cad-nome").value;
        const login = document.getElementById("cad-login").value;
        const senha = document.getElementById("cad-senha").value;
        const admin = document.getElementById("isAdmin").checked;
        const adminSenha = document.getElementById("admin-senha").value;

        if (admin && adminSenha.trim() === "") {
            alert("Digite uma senha administrativa.");
            return;
        }

        const usuario = {
            nome,
            login,
            senha,
            admin,
            adminSenha
        };

        localStorage.setItem(
            "usuarioAcquaSafe",
            JSON.stringify(usuario)
        );

        alert("Cadastro realizado com sucesso!;

        window.location.href = "login.html";
    }

});

// ==========================
// LOGIN NORMAL
// ==========================
function handleLogin(event) {

```
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

    btn.textContent = "✓ Acesso concedido";

    setTimeout(() => {
        window.location.href = "portal.html";
    }, 800);

} else {

    alert("Login ou senha incorretos.");

}
```

}

// ==========================
// LOGIN ADMIN
// ==========================
function handleAdminLogin(event) {

```
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
    usuario.admin &&
    usuario.login === login &&
    usuario.adminSenha === senhaAdmin
) {

    alert("Administrador autenticado!");

    window.location.href = "painel-admin.html";

} else {

    alert("Credenciais administrativas inválidas.");

}
```

}
