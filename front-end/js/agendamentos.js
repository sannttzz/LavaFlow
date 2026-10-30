const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

// ---------- filtros ----------
const botoes = document.querySelectorAll(".filtro");
const cartoes = document.querySelectorAll(".agendamento");

botoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    botoes.forEach((b) => b.classList.remove("ativo"));
    botao.classList.add("ativo");

    const filtro = botao.dataset.filtro;
    cartoes.forEach((c) => {
      const mostrar = filtro === "todos" || c.dataset.status === filtro;
      c.classList.toggle("escondido", !mostrar);
    });
  });
});

// ---------- cancelar ----------
document.querySelectorAll(".btn-cancelar").forEach((botao) => {
  botao.addEventListener("click", () => {
    if (!confirm("Deseja mesmo cancelar este agendamento?")) return;

    const cartao = botao.closest(".agendamento");
    cartao.dataset.status = "cancelado";

    const etiqueta = cartao.querySelector("[data-etiqueta]");
    etiqueta.textContent = "Cancelado";
    etiqueta.className = "etiqueta etiqueta-vermelha";

    cartao.querySelector(".agendamento-botoes").remove();
  });
});

// ---------- reagendar ----------
const modal = document.getElementById("modal-reagendar");
const form = document.getElementById("form-reagendar");
let cartaoAtual = null; // qual cartão está sendo reagendado

document.querySelectorAll(".btn-reagendar").forEach((botao) => {
  botao.addEventListener("click", () => {
    cartaoAtual = botao.closest(".agendamento");
    form.reset();
    modal.showModal();
  });
});

document.getElementById("btn-fechar-reagendar").addEventListener("click", () => modal.close());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const [ano, mes, dia] = document.getElementById("nova-data").value.split("-");
  const hora = document.getElementById("nova-hora").value;
  const duracao = Number(cartaoAtual.dataset.duracao);

  const campo = (nome) => cartaoAtual.querySelector(`[data-campo="${nome}"]`);
  campo("data").textContent = `${Number(dia)} ${meses[Number(mes) - 1]}, ${ano}`;
  campo("entrada").textContent = hora;
  campo("conclusao").textContent = somarMinutos(hora, duracao);

  modal.close();
});