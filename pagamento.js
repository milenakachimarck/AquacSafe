const plans = {
    pro: { name: 'Plano Profissional', price: 89 },
    basic: { name: 'Plano Básico', price: 49 },
    enterprise: { name: 'Plano Empresarial', price: 199 }
};

let selectedPlan = 'pro';
let selectedMethod = 'card';

function selectPlan(el) {
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected', 'border-cyan-500', 'bg-cyan-500/10', 'border-2');
        card.classList.add('border', 'border-slate-700', 'bg-slate-800/50');
    });

    el.classList.add('selected', 'border-2', 'border-cyan-500', 'bg-cyan-500/10');
    selectedPlan = el.dataset.plan;
    updateSummary();
}

function selectMethod(el) {
    document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('active', 'border-cyan-500', 'bg-cyan-500/10', 'border-2');
        method.classList.add('border', 'border-slate-700', 'bg-slate-800/50');
    });

    el.classList.add('active', 'border-2', 'border-cyan-500', 'bg-cyan-500/10');
    selectedMethod = el.dataset.method;

    document.getElementById('form-card').classList.toggle('hidden', selectedMethod !== 'card');
    document.getElementById('form-pix').classList.toggle('hidden', selectedMethod !== 'pix');
    document.getElementById('form-boleto').classList.toggle('hidden', selectedMethod !== 'boleto');
}

function updateSummary() {
    const p = plans[selectedPlan];
    document.getElementById('summary-plan').textContent = p.name;
    document.getElementById('summary-price').textContent = `R$ ${p.price},00`;
    document.getElementById('summary-total').textContent = `R$ ${p.price},00/mês`;
}

function formatCard(el) {
    el.value = el.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

function formatExp(el) {
    el.value = el.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
}

function handlePayment() {
    const btn = document.getElementById('pay-btn');
    btn.innerHTML = 'Processando...';
    btn.disabled = true;

    setTimeout(() => {
        btn.classList.add('hidden');
        document.getElementById('success-msg').classList.remove('hidden');
        lucide.createIcons();
    }, 2000);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    updateSummary();
});
