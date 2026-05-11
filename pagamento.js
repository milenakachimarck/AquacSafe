// Variáveis globais
let selectedPlan = 'pro';
let selectedMethod = 'card';

// Dados dos planos
const plans = {
  pro: { name: 'Plano Profissional', price: 89 },
  basic: { name: 'Plano Básico', price: 49 },
  enterprise: { name: 'Plano Empresarial', price: 199 }
};

// Atualiza visual do cartão
function updateCardDisplay() {
  const name = document.getElementById('card-name').value || "NOME DO TITULAR";
  const number = document.getElementById('card-number').value || "•••• •••• •••• ••••";
  const exp = document.getElementById('card-exp').value || "MM/AA";

  document.getElementById('card-name-display').textContent = name.toUpperCase();
  document.getElementById('card-number-display').textContent = number;
  document.getElementById('expiry-display').textContent = exp;
}

function formatCard(el) {
  let value = el.value.replace(/\D/g, '');
  value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  el.value = value;
}

function formatExp(el) {
  let value = el.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.substring(0,2) + '/' + value.substring(2,4);
  }
  el.value = value;
}

// Selecionar Plano
function selectPlan(el) {
  document.querySelectorAll('.plan-card').forEach(card => card.classList.remove('selected'));
  el.classList.add('selected');
  selectedPlan = el.dataset.plan;
  updateSummary();
}

// Selecionar Método
function selectMethod(el) {
  document.querySelectorAll('.payment-method').forEach(btn => btn.classList.remove('active'));
  el.classList.add('active');
  selectedMethod = el.dataset.method;
}

// Atualiza resumo
function updateSummary() {
  const plan = plans[selectedPlan];
  // Atualize os elementos de resumo aqui se quiser
  console.log(`Plano selecionado: ${plan.name} - R$ ${plan.price}`);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  updateCardDisplay();
});

// Função de pagamento
function handlePayment() {
  const btn = document.getElementById('pay-btn');
  if (btn) {
    btn.innerHTML = 'Processando...';
    btn.disabled = true;
    
    setTimeout(() => {
      alert('Pagamento simulado com sucesso! (para testes)');
      btn.innerHTML = 'Confirmar Pagamento';
      btn.disabled = false;
    }, 1800);
  }
}