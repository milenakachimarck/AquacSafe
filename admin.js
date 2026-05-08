// State
let sensors = [];
let deleteTarget = null;

const defaultConfig = {
  page_title: 'Painel Administrativo',
  system_name: 'AgroÁgua Monitor',
  background_color: '#0f1a2e',
  surface_color: '#152238',
  text_color: '#e8f0e8',
  primary_action: '#22c55e',
  secondary_action: '#1e3a5f',
  font_family: 'DM Sans',
  font_size: 16
};

// Funções auxiliares
function getStatus(ph, turbidity, temp) {
  if (ph < 5.5 || ph > 8.5 || turbidity > 50 || temp > 40) return 'critical';
  if (ph < 6.0 || ph > 8.0 || turbidity > 25 || temp > 35) return 'alert';
  return 'normal';
}

function getAlertMessage(ph, turbidity, temp) {
  const msgs = [];
  if (ph < 5.5) msgs.push('pH muito ácido');
  else if (ph > 8.5) msgs.push('pH muito alcalino');
  else if (ph < 6.0 || ph > 8.0) msgs.push('pH fora do ideal');

  if (turbidity > 50) msgs.push('Turbidez crítica');
  else if (turbidity > 25) msgs.push('Turbidez elevada');

  if (temp > 40) msgs.push('Temperatura crítica');
  else if (temp > 35) msgs.push('Temperatura elevada');

  return msgs.length ? msgs.join(', ') : 'Parâmetros normais';
}

// Renderização
function renderSensors() { /* ... (todo o código da função renderSensors) ... */ }
function createSensorCard(s) { /* ... */ }
function updateSensorCard(el, s) { /* ... */ }
function updateStats() { /* ... */ }

// Element SDK
window.elementSdk.init({
  defaultConfig,
  onConfigChange: (config) => { /* ... todo o código de onConfigChange ... */ },
  mapToCapabilities: (config) => ({ /* ... */ }),
  mapToEditPanelValues: (config) => new Map([ /* ... */ ])
});

// Data SDK
const dataHandler = {
  onDataChanged(data) {
    sensors = data;
    renderSensors();
  }
};

(async () => {
  const r = await window.dataSdk.init(dataHandler);
  if (!r.isOk) console.error('Data SDK init failed');
})();

// Event Listeners (Navigation, Modal, Form, Delete)
document.getElementById('btn-go-admin').addEventListener('click', () => { /* ... */ });
document.getElementById('btn-back').addEventListener('click', () => { /* ... */ });
document.getElementById('btn-add-sensor').addEventListener('click', () => { /* ... */ });
document.getElementById('btn-cancel-modal').addEventListener('click', () => { /* ... */ });

document.getElementById('form-sensor').addEventListener('submit', async (e) => { /* ... todo o submit ... */ });

document.getElementById('btn-cancel-delete').addEventListener('click', () => { /* ... */ });
document.getElementById('btn-confirm-delete').addEventListener('click', async () => { /* ... */ });

lucide.createIcons();


