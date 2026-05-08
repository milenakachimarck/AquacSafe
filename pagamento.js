const plans = {
  pro: { name: 'Plano Profissional', price: 89 },
  basic: { name: 'Plano Básico', price: 49 },
  enterprise: { name: 'Plano Empresarial', price: 199 }
};

let selectedPlan = 'pro';
let selectedMethod = 'card';

function selectPlan(el) {
  document.querySelectorAll('.plan-card').forEach(c => {
    c.classList.remove('selected', 'border-cyan-500', 'bg-cyan-500/10', 'border-2');
    c.classList.add('border', 'border-slate-700', 'bg-slate-800/50');
  });
  el.classList.remove('border', 'border-slate-700', 'bg-slate-800/50');
  el.classList.add('selected', 'border-2', 'border-cyan-500', 'bg-cyan-500/10');
  selectedPlan = el.dataset.plan;
  updateSummary();
}

function selectMethod(el) {
  document.querySelectorAll('.payment-method').forEach(m => {
    m.classList.remove('active', 'border-cyan-500', 'bg-cyan-500/10', 'border-2');
    m.classList.add('border', 'border-slate-700', 'bg-slate-800/50');
  });
  el.classList.remove('border', 'border-slate-700', 'bg-slate-800/50');
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
  btn.innerHTML = '<span class="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>';
  btn.disabled = true;

  setTimeout(() => {
    btn.classList.add('hidden');
    document.getElementById('success-msg').classList.remove('hidden');
    lucide.createIcons();
  }, 2000);
}

// Element SDK (mantido exatamente como estava)
const defaultConfig = {
  page_title: 'Finalizar Pagamento',
  brand_name: 'Acquasafe',
  background_color: '#020617',
  surface_color: '#1e293b',
  text_color: '#f1f5f9',
  primary_action: '#06b6d4',
  secondary_action: '#475569',
  font_family: 'Plus Jakarta Sans',
  font_size: 16
};

function applyConfig(config) {
  document.getElementById('page-title').textContent = config.page_title || defaultConfig.page_title;
  document.getElementById('brand-name').textContent = config.brand_name || defaultConfig.brand_name;
  
  const bg = config.background_color || defaultConfig.background_color;
  const text = config.text_color || defaultConfig.text_color;
  const font = config.font_family || defaultConfig.font_family;
  const size = config.font_size || defaultConfig.font_size;

  document.body.style.backgroundColor = bg;
  document.body.style.color = text;
  document.body.style.fontFamily = `${font}, sans-serif`;
  document.body.style.fontSize = `${size}px`;
  document.getElementById('page-title').style.fontSize = `${size * 2}px`;
}

window.elementSdk.init({
  defaultConfig,
  onConfigChange: async (config) => { applyConfig(config); },
  mapToCapabilities: (config) => ({
    recolorables: [
      { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
      { get: () => config.surface_color || defaultConfig.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
      { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
      { get: () => config.primary_action || defaultConfig.primary_action, set: (v) => { config.primary_action = v; window.elementSdk.setConfig({ primary_action: v }); } },
      { get: () => config.secondary_action || defaultConfig.secondary_action, set: (v) => { config.secondary_action = v; window.elementSdk.setConfig({ secondary_action: v }); } }
    ],
    borderables: [],
    fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); } },
    fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); } }
  }),
  mapToEditPanelValues: (config) => new Map([
    ['page_title', config.page_title || defaultConfig.page_title],
    ['brand_name', config.brand_name || defaultConfig.brand_name]
  ])
});

lucide.createIcons();
