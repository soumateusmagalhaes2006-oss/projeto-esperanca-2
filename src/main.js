// src/main.js
import { telaDoacoes, telaNovaDoacao } from "./pages/doacoes.js";
import { telaDoadores } from "./pages/doadores.js";
import { api } from "./api.js";

// Injeta o layout base da aplicação (cabeçalho, navegação e container principal)
function renderizarLayoutBase() {
  const appElement = document.querySelector("#app") || document.body;
  
  appElement.innerHTML = `
    <header class="cabecalho-principal">
      <div class="logo">
        <span class="icone-coracao">❤️</span>
        <strong>ConectaDoa</strong>
      </div>
      <nav class="menu-navegacao">
        <a href="#/doadores" class="nav-link" data-rota="doadores">Doadores</a>
        <a href="#/doacoes" class="nav-link" data-rota="doacoes">Doações</a>
        <a href="#/doacoes/nova" class="nav-link" data-rota="doacoes/nova">+ Registrar Doação</a>
      </nav>
      <div id="status-api" class="status-badge" title="Verificando status da API...">🔌 Conectando...</div>
    </header>
    <main id="conteudo-principal" class="conteudo"></main>
    <footer class="rodape">
      <small>Projeto Esperança &copy; 2026</small>
    </footer>
  `;
}

// Mapeamento das rotas da aplicação
const rotas = {
  "#/doadores": telaDoadores,
  "#/doacoes": telaDoacoes,
  "#/doacoes/nova": telaNovaDoacao,
};

// Gerenciador de mudança de rota (Router)
async function gerenciarRotas() {
  const hashAtual = window.location.hash || "#/doadores";
  const containerConteudo = document.querySelector("#conteudo-principal");

  // Destaca o link ativo no menu superior
  document.querySelectorAll(".nav-link").forEach((link) => {
    const rotaLink = link.getAttribute("href");
    if (hashAtual.startsWith(rotaLink)) {
      link.classList.add("ativo");
    } else {
      link.classList.remove("ativo");
    }
  });

  // Identifica qual função de tela renderizar com base no hash
  const funcaoTela = rotas[hashAtual] || telaDoadores;

  try {
    containerConteudo.innerHTML = `<div class="estado-carregando">Carregando conteúdo...</div>`;
    await funcaoTela(containerConteudo);
  } catch (erro) {
    console.error("Erro ao carregar a tela:", erro);
    containerConteudo.innerHTML = `
      <div class="cartao erro-tela">
        <h2>Ops! Ocorreu um erro</h2>
        <p>${erro.message || "Não foi possível carregar esta página."}</p>
      </div>
    `;
  }
}

// Verifica se a API está online e atualiza o badge visual no topo
async function verificarSaudeApi() {
  const badge = document.querySelector("#status-api");
  if (!badge) return;

  try {
    await api.checkHealth();
    badge.textContent = "API: ok, banco: ok";
    badge.className = "status-badge ok";
  } catch (erro) {
    badge.textContent = "API Offline / Erro";
    badge.className = "status-badge erro";
  }
}

// Inicialização da aplicação ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  renderizarLayoutBase();
  verificarSaudeApi();
  
  // Ouve alterações no hash da URL (navegação)
  window.addEventListener("hashchange", gerenciarRotas);
  
  // Executa a rota inicial
  gerenciarRotas();
});