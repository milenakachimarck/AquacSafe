function handleLogin(event) {
    event.preventDefault();
    const usuario = document.getElementById('login-usuario').value;
    const senha = document.getElementById('login-senha').value;

    if (usuario && senha) {
        alert("Login realizado com sucesso! ✅");
        window.location.href = "portal.html";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});
