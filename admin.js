

// VALORES SIMULADOS
let ph = 7.0;
let temperatura = 24;
let osmolaridade = 320;

// ELEMENTOS HTML
const phElemento = document.getElementById('ph');
const temperaturaElemento = document.getElementById('temperatura');
const osmolaridadeElemento = document.getElementById('osmolaridade');
const statusElemento = document.getElementById('status');
const alertaCard = document.querySelector('.alerta-card');

// FUNÇÃO PARA ATUALIZAR DADOS
function atualizarDados() {

    // GERA VALORES ALEATÓRIOS
    ph = (Math.random() * 4 + 5).toFixed(1);
    temperatura = Math.floor(Math.random() * 15 + 18);
    osmolaridade = Math.floor(Math.random() * 300 + 200);

    // MOSTRA NA TELA
    phElemento.textContent = ph;
    temperaturaElemento.textContent = temperatura + '°C';
    osmolaridadeElemento.textContent = osmolaridade + ' mOsm';

    // VERIFICA PROBLEMAS
    if (ph > 8 || ph < 5.5 || osmolaridade > 450) {

        statusElemento.textContent = 'Problema Detectado';

        alertaCard.style.background = '#dc2626';

    } else {

        statusElemento.textContent = 'Água Segura';

        alertaCard.style.background = '#16a34a';
    }
}

// ATUALIZA A CADA 3 SEGUNDOS
setInterval(atualizarDados, 3000);

