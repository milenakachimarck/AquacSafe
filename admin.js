// ======================
// PROTEÇÃO DA ÁREA ADMIN
// ======================

document.addEventListener("DOMContentLoaded", () => {

    const estaNaPaginaAdmin =
        document.getElementById("listaClientes") !== null;

    if (estaNaPaginaAdmin) {

        const logado = localStorage.getItem("adminLogado");

        if (logado !== "true") {
            window.location.href = "login-admin.html";
            return;
        }

        renderDoencas();
        renderClientes();
    }
});

// ======================
// LOGIN
// ======================

function loginAdmin() {

    // @ts-ignore
    const usuario = document.getElementById("usuario").value.trim();
    // @ts-ignore
    const senha = document.getElementById("senha").value.trim();

    if (usuario === "admin" && senha === "1234") {

        localStorage.setItem("adminLogado", "true");

        window.location.href = "admin.html";

    } else {

        alert("Usuário ou senha inválidos.");
    }
}

// ======================
// LOGOUT
// ======================

function logout() {

    localStorage.removeItem("adminLogado");

    window.location.href = "login-admin.html";
}

// ======================
// DOENÇAS
// ======================

let doencas = [
    "Mofo-branco",
    "Antracnose",
    "Míldio"
];

function renderDoencas() {

    const lista = document.getElementById("listaDoencas");

    if (!lista) return;

    lista.innerHTML = "";

    doencas.forEach((doenca, index) => {

        lista.innerHTML += `
            <li>
                <span>${doenca}</span>

                <button
                    class="btn-gradient"
                    onclick="removerDoenca(${index})">
                    Excluir
                </button>
            </li>
        `;
    });
}

function adicionarDoenca() {

    const campo = document.getElementById("novaDoenca");

    if (!campo) return;

    // @ts-ignore
    const valor = campo.value.trim();

    if (valor === "") {
        alert("Digite o nome da doença.");
        return;
    }

    doencas.push(valor);

    // @ts-ignore
    campo.value = "";

    renderDoencas();
}

function removerDoenca(index) {

    doencas.splice(index, 1);

    renderDoencas();
}

// ======================
// CLIENTES
// ======================

const clientes = [
    {
        nome: "Fazenda Esperança",
        status: "Pago"
    },
    {
        nome: "Agro Silva",
        status: "Inadimplente"
    },
    {
        nome: "Campo Verde",
        status: "Pago"
    }
];

function renderClientes() {

    const lista = document.getElementById("listaClientes");

    if (!lista) return;

    lista.innerHTML = "";

    clientes.forEach((cliente) => {

        lista.innerHTML += `
            <li>

                <div>
                    <strong>${cliente.nome}</strong>
                </div>

                <div class="acoes">

                    <span class="${
                        cliente.status === "Pago"
                            ? "status-ok"
                            : "status"
                    }">
                        ${cliente.status}
                    </span>

                    ${
                        cliente.status === "Inadimplente"
                            ? `
                                <button
                                    class="btn-gradient"
                                    onclick="bloquearCliente('${cliente.nome}')">
                                    Bloquear
                                </button>
                              `
                            : ""
                    }

                </div>

            </li>
        `;
    });
}

function bloquearCliente(nome) {

    alert(`${nome} foi bloqueado por falta de pagamento.`);
}
function criarContaAdmin(){

    const usuario =
        // @ts-ignore
        document.getElementById("usuario").value.trim();

    const senha =
        // @ts-ignore
        document.getElementById("senha").value.trim();

    if(usuario === "" || senha === ""){

        alert("Preencha usuário e senha.");
        return;
    }

    localStorage.setItem("adminUsuario", usuario);
    localStorage.setItem("adminSenha", senha);

    alert("Conta de administrador criada com sucesso!");
}

function loginAdmin(){

    const usuario =
        // @ts-ignore
        document.getElementById("usuario").value.trim();

    const senha =
        // @ts-ignore
        document.getElementById("senha").value.trim();

    const usuarioSalvo =
        localStorage.getItem("adminUsuario");

    const senhaSalva =
        localStorage.getItem("adminSenha");

    if(usuario === usuarioSalvo &&
       senha === senhaSalva){

        localStorage.setItem("adminLogado","true");

        window.location.href = "admin.html";

    }else{

        alert("Usuário ou senha inválidos.");
    }
}

function loginAdmin(e){
    e.preventDefault();

    // @ts-ignore
    const login = document.getElementById("admin-login").value;
    // @ts-ignore
    const senha = document.getElementById("admin-password").value;

    const usuario = JSON.parse(
        localStorage.getItem("usuarioAcquaSafe")
    );

    if(
        usuario &&
        usuario.isAdmin &&
        usuario.login === login &&
        usuario.adminSenha === senha
    ){
        alert("Administrador autenticado!");
        window.location.href = "painel-admin.html";
    }else{
        alert("Credenciais de administrador inválidas!");
    }
}

const isAdmin = document.getElementById("isAdmin");
const adminGroup = document.getElementById("adminPasswordGroup");

isAdmin.addEventListener("change", () => {
    // @ts-ignore
    if(isAdmin.checked){
        adminGroup.classList.remove("hidden");
    }else{
        adminGroup.classList.add("hidden");
    }
});