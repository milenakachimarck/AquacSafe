// Lista inicial de doenças e clientes
let doencas = ["Mofo-branco", "Antracnose", "Oídio"];
let clientes = [
    { nome: "Cliente A", pago: true },
    { nome: "Cliente B", pago: false },
    { nome: "Cliente C", pago: true }
];

// Função para adicionar doença
function adicionarDoenca() {
    const input = document.getElementById("novaDoencaInput");
    const nome = input.value.trim();
    if (nome && !doencas.includes(nome)) {
        doencas.push(nome);
        input.value = "";
        renderDoencas();
    } else {
        alert("Doença inválida ou já existente!");
    }
}

// Função para excluir doença
function excluirDoenca(nome) {
    doencas = doencas.filter(d => d !== nome);
    renderDoencas();
}

// Renderizar lista de doenças
function renderDoencas() {
    const ul = document.getElementById("listaDoencas");
    ul.innerHTML = "";
    doencas.forEach(d => {
        const li = document.createElement("li");
        li.textContent = d;
        const btn = document.createElement("button");
        btn.textContent = "Excluir";
        btn.onclick = () => excluirDoenca(d);
        li.appendChild(btn);
        ul.appendChild(li);
    });
}

// Renderizar lista de clientes
function renderClientes() {
    const ul = document.getElementById("listaClientes");
    ul.innerHTML = "";
    clientes.forEach(c => {
        const li = document.createElement("li");
        li.textContent = c.nome + (c.pago ? " (Pago)" : " (Não pagou)");
        if (!c.pago) {
            const btn = document.createElement("button");
            btn.textContent = "Bloquear App";
            btn.onclick = () => bloquearCliente(c.nome);
            li.appendChild(btn);
        }
        ul.appendChild(li);
    });
}

// Função para bloquear cliente
function bloquearCliente(nome) {
    alert(`O cliente "${nome}" foi bloqueado no app!`);
    // Aqui você pode integrar com backend para bloquear de verdade
}

// Inicializar listas
renderDoencas();
renderClientes();