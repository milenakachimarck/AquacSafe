// ====================== HANDLE LOGIN ======================
function handleLogin(e) {
  e.preventDefault();

  const btn = document.getElementById('btn-text');
  btn.textContent = 'Acessando...';

  // Redirecionamento mais confiável
  setTimeout(() => {
    window.location.href = "../index.html";
    
    // Alternativa caso o acima não funcione:
    // window.location.replace("../index.html");
  }, 800);
}

// ====================== SDK CONFIG (mantido simplificado) ======================
const defaultConfig = {
  page_title: 'Bem-vindo ao AcquaSafe',
  page_subtitle: 'Monitoramento de qualidade de água em tempo real',
  login_button_text: 'Acessar Painel',
  background_color: '#0a0f1a',
  text_color: '#ffffff',
  primary_action_color: '#22d3ee',
  font_family: 'DM Sans',
  font_size: 16
};

function applyConfig(config) {
  const title = document.getElementById('page-title');
  const subtitle = document.getElementById('page-subtitle');
  const btnText = document.getElementById('btn-text');

  if (title) title.textContent = config.page_title || defaultConfig.page_title;
  if (subtitle) subtitle.textContent = config.page_subtitle || defaultConfig.page_subtitle;
  if (btnText) btnText.textContent = config.login_button_text || defaultConfig.login_button_text;

  if (config.background_color) document.body.style.backgroundColor = config.background_color;
  if (config.text_color) document.body.style.color = config.text_color;

  const font = config.font_family || defaultConfig.font_family;
  document.body.style.fontFamily = `${font}, sans-serif`;
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: (config) => applyConfig(config),
    mapToCapabilities: () => ({}),   // simplificado por enquanto
    mapToEditPanelValues: (config) => new Map([
      ['page_title', config.page_title],
      ['page_subtitle', config.page_subtitle],
      ['login_button_text', config.login_button_text]
    ])
  });
}

// Inicializa ícones do Lucide
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});
