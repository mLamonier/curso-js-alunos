const referenciaData = document.querySelector("#referenciaData");
const contadorTarefas = document.querySelector("#contadorTarefas");
const tempoTotal = document.querySelector("#tempoTotal");
const filtroAtual = document.querySelector("#filtroAtual");
const frase = document.querySelector("#frase");
const autor = document.querySelector("#autor");
const statusBusca = document.querySelector("#statusBusca");
const saida = document.querySelector("#saida");

const btnMostrarPainel = document.querySelector("#btnMostrarPainel");

const tarefas = [
  {
    titulo: "Revisar a aula anterior",
    horasEstimadas: 2.5
  },
  {
    titulo: "Organizar o foco do dia",
    horasEstimadas: 3
  }
];

function mostrarResumoLocal() {
  let totalHoras = 0;

  tarefas.forEach(function (tarefa) {
    totalHoras = totalHoras + tarefa.horasEstimadas;
  });

  const hojeFormatado = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  referenciaData.textContent = "Painel de " + hojeFormatado;
  contadorTarefas.textContent = tarefas.length.toLocaleString("pt-BR") + " tarefas";
  tempoTotal.textContent = totalHoras.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }) + " horas planejadas";
}

async function carregarInspiracao() {
  const resposta = await fetch("https://dummyjson.com/quotes/random");
  const dados = await resposta.json();

  frase.textContent = '"' + dados.quote + '"';
  autor.textContent = "Autor: " + dados.author;
  statusBusca.textContent = "Inspiração carregada com sucesso.";
}

async function mostrarPainel() {
  mostrarResumoLocal();

  const filtroSalvo = localStorage.getItem("painelFiltro");

  if (filtroSalvo === null) {
    filtroAtual.textContent = "Nenhum filtro favorito salvo.";
  } else {
    filtroAtual.textContent = "Filtro favorito: " + filtroSalvo;
  }

  statusBusca.textContent = "Buscando inspiração...";

  await carregarInspiracao();
  saida.textContent = "O painel carregou seus dados e buscou uma frase externa.";
}

btnMostrarPainel.addEventListener("click", mostrarPainel);