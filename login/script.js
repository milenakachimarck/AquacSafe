// ====================== LOGIN FUNCTION ======================
function handleLogin(e) {
  e.preventDefault();
  
  const btn = document.getElementById('btn-text');
  const originalText = btn.textContent;
  
  btn.textContent = 'Acessando...';
  
  setTimeout(() => {
    btn.textContent = '✓ Acesso concedido';
    btn.parentElement.style.opacity = '0.7';
  }, 1200);
}

// ====================== CONFIG & SDK ======================
const defaultConfig = {
  page_title: 'Bem-vindo ao AcquaSafe',
  page_subtitle: 'Monitoramento de qualidade de água em tempo real',
  login_button_text: 'Acessar Painel',
  background_color: '#0a0f1a',
  text_color: '#ffffff',
  primary_action_color: '#22d3ee',
  secondary_action_color: '#94a3b8',
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

  document.body.style.backgroundColor = config.background_color || defaultConfig.background_color;
  document.body.style.color = config.text_color || defaultConfig.text_color;

  const font = config.font_family || defaultConfig.font_family;
  document.body.style.fontFamily = `${font}, sans-serif`;

  const size = config.font_size || defaultConfig.font_size;
  if (title) title.style.fontSize = `${size * 2}px`;
  if (subtitle) subtitle.style.fontSize = `${size * 1.1}px`;
}

// Inicialização do Element SDK
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => applyConfig(config),
    mapToCapabilities: (config) => ({
      recolorables: [
        { 
          get: () => config.background_color || defaultConfig.background_color, 
          set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } 
        },
        { 
          get: () => config.text_color || defaultConfig.text_color, 
          set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } 
        },
        { 
          get: () => config.primary_action_color || defaultConfig.primary_action_color, 
          set: (v) => { config.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); } 
        }
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
      }
    }),
    mapToEditPanelValues: (config) => new Map([
      ['page_title', config.page_title || defaultConfig.page_title],
      ['page_subtitle', config.page_subtitle || defaultConfig.page_subtitle],
      ['login_button_text', config.login_button_text || defaultConfig.login_button_text]
    ])
  });
}

// Criar ícones do Lucide após carregar a página
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
});
