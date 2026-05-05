<script>
    // 1. Dados iniciais
    let solucoes = [
        { nome: "Álcool Etílico 70%", concentracao: "70% v/v", solvente: "Água", uso: "Desinfecção de superfícies", validade: 180 },
        { nome: "Hipoclorito de Sódio", concentracao: "2-5%", solvente: "Água", uso: "Descontaminação", validade: 30 },
        { nome: "Solução de Formaldeído", concentracao: "10%", solvente: "Água", uso: "Fixação histológica", validade: 365 },
        { nome: "PBS (Phosphate Buffered Saline)", concentracao: "1x", solvente: "Água", uso: "Lavagem celular", validade: 60 },
        { nome: "Solução de Ácido Peracético", concentracao: "0.2%", solvente: "Água", uso: "Esterilização", validade: 14 }
    ];

    // 2. Renderização da Tabela
    function renderTabela() {
        const tbody = document.getElementById('tabelaSolucoes');
        if (!tbody) return; // Segurança caso o elemento não exista
        
        tbody.innerHTML = '';
        
        // Usamos o index para facilitar a exclusão/edição no array real
        solucoes.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.className = 'border-t hover:bg-blue-50 transition-colors';
            tr.innerHTML = `
                <td class="px-6 py-4 font-medium">${item.nome}</td>
                <td class="px-6 py-4">${item.concentracao}</td>
                <td class="px-6 py-4">${item.solvente}</td>
                <td class="px-6 py-4">${item.uso}</td>
                <td class="px-6 py-4">${item.validade} dias</td>
                <td class="px-6 py-4 text-center">
                    <button onclick="editar(${index})" class="text-blue-600 hover:text-blue-800 mr-3">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="excluir(${index})" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // 3. Sistema de Busca (Corrigido para evitar erro de elemento nulo)
    function inicializarBusca() {
        const inputSearch = document.getElementById('search');
        if (inputSearch) {
            inputSearch.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                const rows = document.querySelectorAll('#tabelaSolucoes tr');
                
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(term) ? '' : 'none';
                });
            });
        }
    }

    // 4. Funções de Ação
    function limparFiltros() {
        const inputSearch = document.getElementById('search');
        if (inputSearch) inputSearch.value = '';
        
        const rows = document.querySelectorAll('#tabelaSolucoes tr');
        rows.forEach(row => row.style.display = '');
    }

    function editar(index) {
        // Mantido conforme original, mas agora recebe o index do objeto
        alert(`Funcionalidade de edição para "${solucoes[index].nome}" em desenvolvimento.`);
    }
    
    function excluir(index) {
        if (confirm(`Excluir a solução "${solucoes[index].nome}"?`)) {
            // Remove do array de dados (importante para manter a lógica correta)
            solucoes.splice(index, 1);
            // Re-renderiza a tabela para atualizar a visualização
            renderTabela();
        }
    }

    // 5. Inicialização correta
    window.addEventListener('DOMContentLoaded', () => {
        renderTabela();
        inicializarBusca();
    });
</script>