// Login simples

function loginAdmin(){

    const usuario =
        document.getElementById("usuario").value;

    const senha =
        document.getElementById("senha").value;

    if(usuario === "admin" && senha === "1234"){

        localStorage.setItem("adminLogado","true");

        window.location.href = "admin.html";

    }else{

        alert("Usuário ou senha inválidos.");

    }
}

function logout(){

    localStorage.removeItem("adminLogado");

    window.location.href = "login-admin.html";
}

if(window.location.pathname.includes("admin.html")){

    if(localStorage.getItem("adminLogado") !== "true"){

        window.location.href = "login-admin.html";

    }
}

// ------------------
// Doenças
// ------------------

let doencas = [
    "Mofo-branco",
    "Antracnose",
    "Míldio"
];

function renderDoencas(){

    const lista =
        document.getElementById("listaDoencas");

    if(!lista) return;

    lista.innerHTML = "";

    doencas.forEach((doenca,index)=>{

        lista.innerHTML += `
            <li>
                ${doenca}

                <button
                    class="btn-gradient"
                    onclick="removerDoenca(${index})">
                    Excluir
                </button>
            </li>
        `;
    });
}

function adicionarDoenca(){

    const campo =
        document.getElementById("novaDoenca");

    if(campo.value.trim() === "") return;

    doencas.push(campo.value);

    campo.value = "";

    renderDoencas();
}

function removerDoenca(index){

    doencas.splice(index,1);

    renderDoencas();
}

// ------------------
// Clientes
// ------------------

const clientes = [
    {
        nome:"Fazenda Esperança",
        status:"Pago"
    },
    {
        nome:"Agro Silva",
        status:"Inadimplente"
    },
    {
        nome:"Campo Verde",
        status:"Pago"
    }
];

function renderClientes(){

    const lista =
        document.getElementById("listaClientes");

    if(!lista) return;

    lista.innerHTML = "";

    clientes.forEach(cliente=>{

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
                        ?

                        `<button
                            class="btn-gradient"
                            onclick="bloquearCliente('${cliente.nome}')">
                            Bloquear
                        </button>`

                        :

                        ""
                    }

                </div>

            </li>
        `;
    });
}

function bloquearCliente(nome){

    alert(
        `${nome} foi bloqueado por falta de pagamento.`
    );
}

renderDoencas();
renderClientes();