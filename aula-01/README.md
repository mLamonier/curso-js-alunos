# Aula 1 — Primeira interação com JavaScript

## Saindo do estático

Até aqui, usando HTML e CSS, você já consegue montar páginas estruturadas e com um bom visual.

Mas ainda existe uma limitação clara: a página não reage.

Se um usuário clicar em um botão, nada acontece. Se um texto precisar mudar, isso não acontece sozinho.

A página existe, mas é completamente estática.

É exatamente nesse ponto que entra o JavaScript.

---

## O que o JavaScript faz

O JavaScript é a linguagem responsável por adicionar comportamento à página.

Ele permite que o sistema responda ao usuário, altere conteúdos, execute lógica e controle o que acontece na tela.

Uma forma simples de entender isso é pensar que o HTML define o que existe, o CSS define como aparece e o JavaScript define o que acontece.

---

## Como o JavaScript funciona no navegador

O JavaScript roda diretamente no navegador.

Isso significa que o código é executado no computador do usuário, no momento em que a página é carregada.

Além disso, ele consegue acessar os elementos do HTML e modificá-los em tempo real.

Isso permite criar páginas dinâmicas, sem precisar recarregar tudo.

---

## Como vamos aprender

Nesta aula, você não vai apenas ler código.

Vamos trabalhar em um pequeno projeto já pronto visualmente.

O HTML e o CSS já estão preparados. O seu papel será usar JavaScript para transformar essa página em algo interativo.

Você vai escrever código no VS Code, salvar e ver o resultado direto no navegador.

---

## Preparando o ambiente

Abra a pasta `projeto-base` no VS Code.

Você deve ver três arquivos:

- index.html
- style.css
- script.js

O arquivo onde vamos trabalhar é o script.js.

É nele que toda a lógica da página será escrita.

---

## Ligando o JavaScript ao HTML

Para que o JavaScript funcione, ele precisa estar conectado ao HTML.

Isso é feito através da seguinte linha no final do arquivo HTML:

<script src="script.js"></script>

Essa linha faz com que o navegador carregue e execute o arquivo JavaScript junto com a página.

---

## Acessando um elemento da página

Antes de alterar qualquer coisa, precisamos acessar um elemento do HTML.

O JavaScript faz isso usando seletores.

const titulo = document.querySelector("#titulo");

Esse código busca um elemento pelo id.

Agora o JavaScript sabe exatamente qual elemento queremos controlar.

---

## Prática

Abra o arquivo script.js e escreva o código acima.

Salve o arquivo e atualize a página no navegador.

Nada visível vai acontecer ainda, e isso é esperado.

Neste momento, você apenas acessou o elemento.

---

## Alterando o conteúdo

Agora que temos acesso ao elemento, podemos alterar o que está sendo exibido.

titulo.textContent = "Texto alterado com JavaScript";

Esse comando substitui o texto do elemento na página.

---

## Prática

Adicione essa linha no seu script.js.

Salve e atualize o navegador.

Agora você deve ver o texto sendo alterado automaticamente.

Isso mostra que o JavaScript já está controlando a página.

---

## Fazendo a página reagir

Até agora, o código roda sozinho ao carregar a página.

Mas o mais importante é fazer a página reagir ao usuário.

Para isso, vamos trabalhar com um botão.

const botao = document.querySelector("#btnMensagem");

Esse código seleciona um botão da página.

---

## Detectando um clique

Agora vamos fazer algo acontecer quando o botão for clicado.

botao.addEventListener("click", () => {
  console.log("Botão clicado");
});

Esse código escuta o clique no botão e executa uma ação.

---

## Prática

Adicione esse código no seu arquivo.

Salve, abra a página e clique no botão.

Depois, abra o console do navegador.

Você deve ver a mensagem sendo exibida.

O console não é o foco da aula, mas é uma ferramenta importante para testes.

---

## Criando uma interação real

Agora vamos substituir o console por algo visível na página.

const saida = document.querySelector("#saida");

botao.addEventListener("click", () => {
  saida.textContent = "Você clicou no botão!";
});

Agora o clique altera o conteúdo da página.

---

## Prática

Atualize seu código com esse novo comportamento.

Clique no botão e observe o que muda na tela.

Tente alterar o texto para ver como o comportamento muda.

---

## Alterando mais de um elemento

O JavaScript pode controlar vários elementos ao mesmo tempo.

botao.addEventListener("click", () => {
  titulo.textContent = "Agora tudo mudou";
  saida.textContent = "O JavaScript alterou a página";
});

Agora mais de um elemento é modificado com uma única ação.

---

## Prática

Atualize o seu código para alterar mais de um elemento ao clicar.

Isso ajuda a entender como o JavaScript controla diferentes partes da página ao mesmo tempo.

---

## Desafio

Agora vá até a pasta desafio.

Use o botão com id #btnCor para criar uma nova interação.

A ideia é mudar a cor do card quando o botão for clicado.

Você já tem tudo que precisa para fazer isso.

Se necessário, revise os exemplos anteriores.

---

## Dica

Você vai precisar:

- selecionar o elemento
- escutar o clique
- alterar um estilo com JavaScript

---

## Encerramento

Nesta aula, você saiu de uma página estática para uma página que reage ao usuário.

Você aprendeu a acessar elementos, modificar conteúdos e responder a eventos.

Mais importante do que isso, você aplicou tudo isso em um projeto real.

Esse é o primeiro passo na programação com JavaScript.