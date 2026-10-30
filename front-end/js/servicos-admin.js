// dados falsos; no passo 20 virão da API
let servicos = [
  { id: 1, nome: "Lavagem Essencial", descricao: "Lavagem externa, rodas, pneus e secagem manual.", preco: 45, duracaoMin: 60, ativo: true },
  { id: 2, nome: "Lavagem Completa", descricao: "Limpeza externa e interna, aspiração e acabamento.", preco: 79.9, duracaoMin: 90, ativo: true },
  { id: 3, nome: "Detalhamento Premium", descricao: "Higienização profunda, cera protetora e revitalização.", preco: 149.9, duracaoMin: 180, ativo: true },
];
let proximoId = 4;
let editandoId = null; // null = criando um novo; número = editando aquele serviço

const lista = document.getElementById("lista-servicos-admin");
const modal = document.getElementById("modal-servico");
const form = document.getElementById("form-servico");

function desenhar() {
  lista.innerHTML = "";

  servicos.forEach((s) => {
    const linha = document.createElement("article");
    linha.className = "cartao servico-linha" + (s.ativo ? "" : " inativo");
    linha.innerHTML = `
      <div><h2></h2><p class="texto-suave"></p></div>
      <div class="servico-dados">
        <div><small>Preço</small><strong class="s-preco"></strong></div>
        <div><small>Duração</small><strong class="s-duracao"></strong></div>
        <label class="chave" title="Ativar/desativar serviço">
          <input type="checkbox"><span></span>
        </label>
        <button class="botao botao-claro btn-editar">Editar</button>
      </div>`;

    // textContent para o que o usuário digitou (evita injetar HTML)
    linha.querySelector("h2").textContent = s.nome;
    linha.querySelector("p").textContent = s.descricao;
    linha.querySelector(".s-preco").textContent = dinheiro(s.preco);
    linha.querySelector(".s-duracao").textContent = s.duracaoMin + " min";

    const chave = linha.querySelector("input[type=checkbox]");
    chave.checked = s.ativo;
    chave.addEventListener("change", () => {
      s.ativo = chave.checked;
      desenhar();
    });

    linha.querySelector(".btn-editar").addEventListener("click", () => abrirModal(s));
    lista.appendChild(linha);
  });
}

function abrirModal(servico) {
  form.reset();
  if (servico) {
    editandoId = servico.id;
    document.getElementById("titulo-modal-servico").textContent = "Editar serviço";
    document.getElementById("s-nome").value = servico.nome;
    document.getElementById("s-descricao").value = servico.descricao;
    document.getElementById("s-preco").value = servico.preco;
    document.getElementById("s-duracao").value = servico.duracaoMin;
  } else {
    editandoId = null;
    document.getElementById("titulo-modal-servico").textContent = "Novo serviço";
  }
  modal.showModal();
}

document.getElementById("btn-novo-servico").addEventListener("click", () => abrirModal(null));
document.getElementById("btn-fechar-servico").addEventListener("click", () => modal.close());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dados = {
    nome: document.getElementById("s-nome").value.trim(),
    descricao: document.getElementById("s-descricao").value.trim(),
    preco: Number(document.getElementById("s-preco").value),
    duracaoMin: Number(document.getElementById("s-duracao").value),
  };

  if (editandoId === null) {
    servicos.push({ id: proximoId++, ativo: true, ...dados });
  } else {
    Object.assign(servicos.find((s) => s.id === editandoId), dados);
  }

  modal.close();
  desenhar();
});

desenhar();