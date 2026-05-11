// ====================== AQUAFIELD ADMIN - SCRIPT.JS ======================

/* global window, document, lucide */

// ====================== VARIÁVEIS GLOBAIS ======================
const ADMIN_CREDENTIALS = [
  { username: 'admin1', password: 'senha123' },
  { username: 'admin2', password: 'aqua2024' }
];

let isLoggedIn = false;
let allClients = [];
let deleteTarget = null;

// Configuração padrão
const defaultConfig = {
  dashboard_title: 'AquaField Admin',
  welcome_message: 'Monitoramento de qualidade da água',
  background_color: '#0d1520',
  surface_color: '#131f2e',
  text_color: '#e0e8f0',
  primary_action_color: '#0ea5e9',
  secondary_action_color: '#6b8299',
  font_family: 'DM Sans',
  font_size: 14
};

// ====================== SDKs (Proteção contra erros) ======================
const elementSdk = window.elementSdk || {};
const dataSdk = window.dataSdk || {};

// ====================== INICIALIZAÇÃO DOS SDKS ======================
if (typeof elementSdk.init === 'function') {
  elementSdk.init({
    defaultConfig,
    onConfigChange: function (config) {
      const title = document.getElementById('main-title');
      const subtitle = document.getElementById('subtitle');
      if (title) title.textContent = config.dashboard_title || defaultConfig.dashboard_title;
      if (subtitle) subtitle.textContent = config.welcome_message || defaultConfig.welcome_message;
    }
  });
}

// Data SDK
const dataHandler = {
  onDataChanged: function (data) {
    if (isLoggedIn) {
      allClients = Array.isArray(data) ? data : [];
      renderAll();
    }
  }
};

(async function initDataSdk() {
  if (typeof dataSdk.init === 'function') {
    try {
      await dataSdk.init(dataHandler);
    } catch (e) {
      console.warn('Data SDK init falhou', e);
    }
  }
})();

// ====================== FUNÇÕES PRINCIPAIS ======================
function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('login-user').value.trim();
  const password = document.getElementById('login-pass').value.trim();
  const errorDiv = document.getElementById('login-error');

  const isValid = ADMIN_CREDENTIALS.some(cred => cred.username === username && cred.password === password);

  if (isValid) {
    isLoggedIn = true;
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('admin-screen').classList.remove('hidden');
    errorDiv.classList.add('hidden');
    renderAll();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  } else {
    errorDiv.textContent = 'Usuário ou senha inválidos!';
    errorDiv.classList.remove('hidden');
    document.getElementById('login-pass').value = '';
  }
}

function handleLogout() {
  if (confirm('Tem certeza que deseja sair?')) {
    isLoggedIn = false;
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('admin-screen').classList.add('hidden');
    document.getElementById('login-form').reset();
    document.getElementById('login-error').classList.add('hidden');
    allClients = [];
  }
}

function determineStatus(ph, turbidity, contamination) {
  if (ph < 5.5 || ph > 8.5 || turbidity > 100 || contamination === 'alta') return 'critico';
  if (ph < 6.0 || ph > 8.0 || turbidity > 50 || contamination === 'moderada') return 'alerta';
  return 'normal';
}

function statusLabel(s) {
  if (s === 'critico') return '<span class="status-critical px-2 py-0.5 rounded-full text-xs font-medium">Crítico</span>';
  if (s === 'alerta') return '<span class="status-warning px-2 py-0.5 rounded-full text-xs font-medium">Alerta</span>';
  return '<span class="status-ok px-2 py-0.5 rounded-full text-xs font-medium">Normal</span>';
}

function renderAll() {
  renderSummary();
  renderTable();
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderSummary() {
  const total = allClients.length;
  const critical = allClients.filter(c => c.status === 'critico').length;
  const warning = allClients.filter(c => c.status === 'alerta').length;
  const ok = allClients.filter(c => c.status === 'normal').length;

  const summaryHTML = `
    <div class="glass rounded-xl p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-[#0ea5e922] flex items-center justify-center"><i data-lucide="users" class="w-5 h-5 text-[#0ea5e9]"></i></div>
        <div><p class="text-xs text-[#6b8299]">Total Clientes</p><p class="text-xl font-bold text-white">${total}</p></div>
      </div>
    </div>
    <div class="glass rounded-xl p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-[#52c41a22] flex items-center justify-center"><i data-lucide="check-circle" class="w-5 h-5 text-[#73d13d]"></i></div>
        <div><p class="text-xs text-[#6b8299]">Normal</p><p class="text-xl font-bold text-white">${ok}</p></div>
      </div>
    </div>
    <div class="glass rounded-xl p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-[#faad1422] flex items-center justify-center"><i data-lucide="alert-triangle" class="w-5 h-5 text-[#ffc53d]"></i></div>
        <div><p class="text-xs text-[#6b8299]">Alerta</p><p class="text-xl font-bold text-white">${warning}</p></div>
      </div>
    </div>
    <div class="glass rounded-xl p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-[#ff4d4f22] flex items-center justify-center"><i data-lucide="x-circle" class="w-5 h-5 text-[#ff6b6b]"></i></div>
        <div><p class="text-xs text-[#6b8299]">Crítico</p><p class="text-xl font-bold text-white">${critical}</p></div>
      </div>
    </div>
  `;
  document.getElementById('summary-cards').innerHTML = summaryHTML;
}

function getFilteredClients() {
  const search = (document.getElementById('search-input')?.value || '').toLowerCase();
  const statusFilter = document.getElementById('filter-status')?.value || 'all';

  return allClients.filter(c => {
    const matchSearch = !search || 
      (c.farmer_name && c.farmer_name.toLowerCase().includes(search)) ||
      (c.farm_location && c.farm_location.toLowerCase().includes(search));
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });
}

function renderTable() {
  const filtered = getFilteredClients();
  const tbody = document.getElementById('clients-table');
  const empty = document.getElementById('empty-state');

  if (!filtered || filtered.length === 0) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
    empty.classList.add('flex');
    return;
  }

  empty.classList.add('hidden');
  empty.classList.remove('flex');

  tbody.innerHTML = filtered.map(c => `
    <tr class="border-b border-[#1a2a3a] hover:bg-[#1a2a3a33] transition-colors">
      <td class="px-5 py-3 font-medium text-white">${c.farmer_name || ''}</td>
      <td class="px-5 py-3 text-[#8899aa]">${c.farm_location || ''}</td>
      <td class="px-5 py-3 text-[#8899aa]">${c.crop_type || ''}</td>
      <td class="px-5 py-3">${c.ph_level || ''}</td>
      <td class="px-5 py-3">${c.turbidity || ''} NTU</td>
      <td class="px-5 py-3 capitalize">${c.contamination || ''}</td>
      <td class="px-5 py-3">${statusLabel(c.status)}</td>
      <td class="px-5 py-3 text-[#6b8299] text-xs">${c.last_check ? new Date(c.last_check).toLocaleDateString('pt-BR') : '—'}</td>
      <td class="px-5 py-3 text-center">
        <div class="flex items-center justify-center gap-1">
          <button onclick="editClient('${c.__backendId || c.id}')" class="p-1.5 rounded hover:bg-[#1a2a3a] text-[#6b8299] hover:text-[#0ea5e9]"><i data-lucide="edit-2" class="w-4 h-4"></i></button>
          <button onclick="deleteClient('${c.__backendId || c.id}')" class="p-1.5 rounded hover:bg-[#1a2a3a] text-[#6b8299] hover:text-[#ff6b6b]"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ====================== MODAL E FORMULÁRIO ======================
function openModal(editId = null) {
  document.getElementById('modal-overlay').classList.remove('hidden');
  document.getElementById('modal-overlay').classList.add('flex');

  if (editId) {
    const client = allClients.find(c => (c.__backendId || c.id) === editId);
    if (client) {
      document.getElementById('modal-title').textContent = 'Editar Cliente';
      document.getElementById('form-mode').value = 'edit';
      document.getElementBy