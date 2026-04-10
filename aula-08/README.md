# Aula 8 - Buscando dados fora da aplicação

> [!NOTE]
> Nesta aula, o Painel do Dia continua mostrando seus próprios dados, mas agora também aprende a buscar uma informação vinda de fora da aplicação.

## Onde paramos

Na aula 7, o painel passou a exibir datas e números de forma mais natural.

Isso foi importante porque a interface ficou mais real e mais agradável de ler.

Agora vamos dar outro passo muito comum em aplicações modernas.

Até aqui, tudo o que o painel mostrava vinha do próprio código ou do navegador.

Mas muitos sistemas também dependem de dados externos.

Por exemplo:

- uma frase inspiradora
- o clima atual
- uma cotação
- uma sugestão do dia

É exatamente esse tipo de situação que vamos começar a praticar agora.

---

## O que muda nesta aula

Nesta aula, vamos introduzir duas ideias novas:

- consumo de APIs
- `async/await`

Uma API é uma fonte de dados externa que a aplicação pode consultar.

Nesta aula, vamos usar uma API pública de frases para buscar uma inspiração do dia.

O endereço que vamos consultar é:

```text
https://dummyjson.com/quotes/random
```

Esse endpoint devolve um JSON com informações como:

```json
{
  "id": 1,
  "quote": "One of the major keys to success is self-confidence.",
  "author": "Arthur Ashe"
}
```

Ou seja: a aplicação faz uma requisição e recebe dados estruturados de volta.

---

## Entendendo a ideia de `fetch`

Para buscar dados de uma API no navegador, usamos `fetch()`.

Exemplo:

```js
const resposta = await fetch("https://dummyjson.com/quotes/random");
```

Essa linha pede os dados para a API.

Mas a resposta não chega no mesmo instante.

É por isso que precisamos de `await`.

---

## Onde entra o `async`

Quando usamos `await`, a função precisa ser declarada como `async`.

Por exemplo:

```js
async function carregarInspiracao() {
  const resposta = await fetch("https://dummyjson.com/quotes/random");
}
```

Aqui:

- `async` diz que a função vai lidar com uma operação assíncrona
- `await` faz o JavaScript esperar o resultado antes de continuar

> [!TIP]
> A ideia mais importante não é decorar os nomes agora. É entender que a aplicação está esperando a resposta da internet chegar antes de usar os dados.

---

## O que vem da API ainda precisa virar objeto

Depois do `fetch`, ainda precisamos converter a resposta em JSON:

```js
const dados = await resposta.json();
```

Essa etapa transforma a resposta recebida em um objeto JavaScript que podemos usar normalmente.

Depois disso, fica possível acessar:

```js
dados.quote
dados.author
dados.id
```

Repare como isso conversa diretamente com a aula 5, em que começamos a trabalhar com objetos e JSON.

---

## Como o projeto evolui

O Painel do Dia agora vai mostrar:

- o resumo local das tarefas
- a data de referência do painel
- o filtro salvo da aula anterior
- uma inspiração do dia vinda de uma API externa

No desafio, você vai exibir mais um campo da resposta recebida.

---

## Preparando o ambiente

Abra a pasta `aula-08/projeto-base`.

Você vai trabalhar com esta estrutura:

```text
projeto-base/
├── index.html
├── style.css
└── script.js
```

O HTML e o CSS já estão prontos. O foco principal continua no `script.js`.

---

## Selecionando os elementos do painel

Antes de começar, selecione os elementos principais:

```js
const referenciaData = document.querySelector("#referenciaData");
const contadorTarefas = document.querySelector("#contadorTarefas");
const tempoTotal = document.querySelector("#tempoTotal");
const filtroAtual = document.querySelector("#filtroAtual");
const frase = document.querySelector("#frase");
const autor = document.querySelector("#autor");
const statusBusca = document.querySelector("#statusBusca");
const saida = document.querySelector("#saida");

const btnMostrarPainel = document.querySelector("#btnMostrarPainel");
```

Esses elementos vão permitir:

- montar o resumo local do painel
- mostrar a frase vinda da API
- atualizar os textos de status

### Faça agora

Abra o `script.js` e adicione essas seleções.

---

## Mantendo o resumo local do painel

Mesmo com a API, o projeto continua exibindo seus próprios dados.

Podemos manter uma coleção local como esta:

```js
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
```

Depois, uma função simples pode atualizar a parte local da interface:

```js
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
```

Perceba a ideia:

- a parte local do projeto continua existindo
- a API entra como um novo complemento da interface

---

## Buscando a inspiração com `async/await`

Agora vem a parte nova da aula:

```js
async function carregarInspiracao() {
  const resposta = await fetch("https://dummyjson.com/quotes/random");
  const dados = await resposta.json();

  frase.textContent = '"' + dados.quote + '"';
  autor.textContent = "Autor: " + dados.author;
  statusBusca.textContent = "Inspiração carregada com sucesso.";
}
```

Vamos ler esse fluxo com calma:

1. a função é marcada com `async`
2. `fetch()` pede os dados para a API
3. `await` espera a resposta chegar
4. `resposta.json()` converte o conteúdo em objeto
5. o painel usa `dados.quote` e `dados.author`

É a primeira vez no curso em que o projeto depende de uma informação que não nasceu no próprio código.

---

## Juntando tudo no clique

Agora podemos criar uma função principal da aula:

```js
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
```

Repare em algo importante:

- o resumo local aparece a partir dos dados do próprio painel
- o filtro salvo vem do `localStorage`
- a inspiração chega de uma API externa

Agora o projeto já mistura diferentes fontes de dados no mesmo fluxo.

---

## Ligando a função ao botão

Por fim, ligamos tudo ao evento:

```js
btnMostrarPainel.addEventListener("click", mostrarPainel);
```

Quando o botão for clicado, o painel vai:

1. atualizar os resumos locais
2. ler o filtro salvo
3. fazer a busca externa
4. mostrar a frase recebida

### Faça agora

Adicione essa linha, salve e teste.

Ao clicar no botão, a interface deve carregar uma nova frase vinda da API.

---

## O que você praticou nesta aula

Nesta etapa, você juntou:

- consumo de API com `fetch`
- uso de `async`
- uso de `await`
- leitura de resposta JSON
- mistura de dados locais e dados externos
- atualização do painel com informação vinda da internet

Agora o Painel do Dia não depende só do que já estava salvo ou escrito no código.

Ele começou a conversar com uma fonte externa.

---

## Desafio

Agora vá para a pasta `desafio`.

Lá já existe um espaço com `id` `#detalheFrase`.

O seu objetivo é mostrar mais um dado retornado pela API.

Você pode usar o campo `id` da frase recebida.

### Dicas

- depois de receber `dados`, leia `dados.id`
- monte um texto claro com esse valor
- exiba esse texto em `#detalheFrase`

Exemplo de ideia:

```js
detalheFrase.textContent = "Frase #" + dados.id;
```

> [!IMPORTANT]
> Aqui você aplica exatamente a ideia pedida no roadmap: usar outro campo da resposta da API além do principal.

---

## Encerramento

Na aula 7, o painel ficou mais natural na forma de exibir dados.

Na aula 8, ele começou a buscar uma informação fora da própria aplicação.

Esse é um passo muito importante porque mostra que o projeto já consegue combinar interface, dados locais e dados externos em um mesmo fluxo.
