// src/ui.js

// Cria um elemento HTML de forma segura contra XSS
export function el(tag, atributos = {}, ...filhos) {
  const elemento = document.createElement(tag);
  for (const [nome, valor] of Object.entries(atributos)) {
    if (nome.startsWith("on")) {
      elemento.addEventListener(nome.slice(2), valor);
    } else {
      elemento.setAttribute(nome, valor);
    }
  }
  elemento.append(...filhos.filter((filho) => filho !== null && filho !== undefined));
  return elemento;
}

// Mostra uma mensagem de sucesso ou erro
export function mostrarMensagem(caixa, texto, tipo = "sucesso") {
  caixa.textContent = texto;
  caixa.className = `mensagem ${tipo}`;
  caixa.hidden = false;
}

// Esconde a caixa de mensagem
export function esconderMensagem(caixa) {
  caixa.hidden = true;
}

// Cria um item de lista para estados como "Carregando..." ou "Nenhum..."
export function estado(texto) {
  return el("li", { class: "estado" }, texto);
}

// Formata data de "AAAA-MM-DD" para "DD/MM/AAAA" (padrão brasileiro)
export function formatarData(data) {
  if (!data) return "";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Retorna a data de hoje no formato AAAA-MM-DD para preencher inputs de data
export function hoje() {
  const agora = new Date();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  return `${agora.getFullYear()}-${mes}-${dia}`;
}