// Alternar visibilidade da senha
const toggleBtn = document.getElementById('toggleBtn');
const passwordInput = document.getElementById('password');

toggleBtn.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleBtn.textContent = '🙈';
  } else {
    passwordInput.type = 'password';
    toggleBtn.textContent = '👁️';
  }
});

// Simulação de login
const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const btn = form.querySelector('button');
  const originalText = btn.textContent;

  btn.textContent = 'Entrando...';
  btn.disabled = true;

  setTimeout(() => {
    if (username && password) {
      alert('✅ Login realizado com sucesso!\n\nBem-vindo ao Painel Administrativo.');
      // window.location.href = "dashboard.html"; // Descomente quando tiver a página
    } else {
      alert('Por favor, preencha todos os campos.');
    }

    btn.textContent = originalText;
    btn.disabled = false;
  }, 1500);
});

// Suporte para tecla Enter
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    form.dispatchEvent(new Event('submit'));
  }
});