document.addEventListener("DOMContentLoaded", () => {

    // Inicializa os ícones
    if (window.lucide) {
        window.lucide.createIcons();
    }

});

function handleLogin(event) {
    event.preventDefault();

    const login = document.getElementById("login-usuario").value.trim();
    const senha = document.getElementById("login-senha").value.trim();

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
        }, 1000);

    } else {

        alert("Login ou senha incorretos.");

    }
}