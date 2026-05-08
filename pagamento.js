document.addEventListener('DOMContentLoaded', () => {
    // Dados dos planos
    const plans = {
        pro: { name: 'Plano Profissional', price: 89 },
        basic: { name: 'Plano Básico', price: 49 },
        enterprise: { name: 'Plano Empresarial', price: 199 }
    };

    let selectedPlan = 'pro';
    let selectedMethod = 'card';

    // Selecionar Plano
    function selectPlan(planElement) {
        document.querySelectorAll('.plan-card').forEach(card => {
            card.classList.remove('selected', 'border-2', 'border-cyan-500', 'bg-cyan-500/10');
            card.classList.add('border', 'border-slate-700', 'bg-slate-800/50');
        });

        planElement.classList.add('selected', 'border-2', 'border-cyan-500', 'bg-cyan-500/10');
        selectedPlan = planElement.dataset.plan;
        updateSummary();
    }

    // Selecionar Método de Pagamento
    function selectMethod(methodElement) {
        document.querySelectorAll('.payment-method').forEach(btn => {
            btn.classList.remove('active', 'border-2', 'border-cyan-500', 'bg-cyan-500/10');
            btn.classList.add('border', 'border-slate-700', 'bg-slate-800/50');
        });

        methodElement.classList.add('active', 'border-2', 'border-cyan-500', 'bg-cyan-500/10');
        selectedMethod = methodElement.dataset.method;

        // Mostrar formulário correto
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
        btn.innerHTML = '<span class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>';
        btn.disabled = true;

        setTimeout(() => {
            btn.classList.add('hidden');
            document.getElementById('success-msg').classList.remove('hidden');
            lucide.createIcons();
        }, 1800);
    }

    // ====================== EVENT LISTENERS ======================
    
    // Planos
    document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('click', () => selectPlan(card));
    });

    // Métodos de pagamento
    document.querySelectorAll('.payment-method').forEach(btn => {
        btn.addEventListener('click', () => selectMethod(btn));
    });

    // Formatações de input
    const cardNumber = document.getElementById('card-number');
    const cardExp = document.getElementById('card-exp');

    if (cardNumber) cardNumber.addEventListener('input', () => formatCard(cardNumber));
    if (cardExp) cardExp.addEventListener('input', () => formatExp(cardExp));

    // Botão de pagamento
    const payBtn = document.getElementById('pay-btn');
    if (payBtn) payBtn.addEventListener('click', handlePayment);

    // Inicializações
    updateSummary();
    lucide.createIcons();
});
