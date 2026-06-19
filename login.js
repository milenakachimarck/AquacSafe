// login.js - Lógica compartilhada de login e cadastro

document.addEventListener('DOMContentLoaded', function() {

    // ==================== LÓGICA ESPECÍFICA DO CADASTRO ====================
    const formCadastro = document.getElementById('formCadastro');
    
    if (formCadastro) {
        const isAdminCheckbox = document.getElementById('isAdmin');
        const adminPasswordGroup = document.getElementById('adminPasswordGroup');

        // Mostrar/esconder campo de senha admin
        isAdminCheckbox.addEventListener('change', function() {
            adminPasswordGroup.classList.toggle('hidden', !this.checked);
        });

        // Validação de CPF
        function validarCPF(cpf) {
            cpf = cpf.replace(/[^\d]+/g, '');
            if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
            
            let soma = 0;
            for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
            let resto = (soma * 10) % 11;
            if (resto === 10 || resto === 11) resto = 0;
            if (resto !== parseInt(cpf.charAt(9))) return false;
            
            soma = 0;
            for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
            resto = (soma * 10) % 11;
            if (resto === 10 || resto === 11) resto = 0;
            if (resto !== parseInt(cpf.charAt(10))) return false;
            
            return true;
        }

        // Submissão do formulário
        formCadastro.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const loginInput = document.getElementById('cad-login').value.trim();
            const isAdmin = isAdminCheckbox.checked;
            const adminSenha = document.getElementById('admin-senha').value.trim();

            // Validação de CPF
            if (loginInput.length === 11 || loginInput.length === 14) {
                if (!validarCPF(loginInput)) {
                    alert('❌ CPF inválido! Por favor, verifique o número digitado.');
                    return;
                }
            }

            // Validação de conta Admin
            if (isAdmin) {
                if (!adminSenha) {
                    alert('❌ Para criar uma conta de Administrador, você deve informar a senha de confirmação.');
                    return;
                }
                // Senha de administrador (alterar conforme necessário)
                if (adminSenha !== "admin123") {
                    alert('❌ Senha de Administrador incorreta!');
                    return;
                }
            }

            alert('✅ Cadastro realizado com sucesso!' + 
                  (isAdmin ? '\n\n👑 Conta de Administrador criada com sucesso.' : ''));
            
            // Aqui você pode adicionar fetch para backend no futuro
            // fetch('/api/cadastro', { method: 'POST', body: new FormData(formCadastro) });
        });
    }

    // ==================== LÓGICA COMUM (pode adicionar mais aqui) ====================
    console.log('✅ login.js carregado com sucesso');
});