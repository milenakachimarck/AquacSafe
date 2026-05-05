// Função para lidar com o CADASTRO
const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const login = document.getElementById('cad-login').value;
        const senha = document.getElementById('cad-senha').value;
        const nome = document.getElementById('cad-nome').value;

        // Salva no localStorage como uma string JSON
        const usuario = { login, senha, nome };
        localStorage.setItem('usuarioAcquaSafe', JSON.stringify(usuario));

        alert('Cadastro realizado com sucesso! Redirecionando para login...');
        window.location.href = 'index.html';
    });
}

// Função para lidar com o LOGIN
function handleLogin(event) {
    event.preventDefault();
    
    // Pega os valores dos inputs do index.html (assumindo que você adicione IDs a eles)
    const loginDigitado = event.target.querySelector('input[type="text"]').value;
    const senhaDigitada = event.target.querySelector('input[type="password"]').value;

    // Busca o usuário "no banco de dados local"
    const dadosSalvos = localStorage.getItem('usuarioAcquaSafe');

    if (dadosSalvos) {
        const usuario = JSON.parse(dadosSalvos);

        if (loginDigitado === usuario.login && senhaDigitada === usuario.senha) {
            alert(`Bem-vindo, ${usuario.nome}!`);
            window.location.href = 'portal.html'; // Redireciona para o painel
        } else {
            alert('Usuário ou senha incorretos.');
        }
    } else {
        alert('Nenhum usuário cadastrado neste navegador.');
    }
}