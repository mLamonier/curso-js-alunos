# Aula 5 - Organizando melhor os dados da aplicação

> [!NOTE]
> Nesta aula, o Painel do Dia deixa de tratar cada tarefa como um texto solto e passa a trabalhar com tarefas mais completas.

## Onde paramos

Na aula 4, o projeto começou a exibir uma lista de tarefas usando um array.

Isso foi um passo importante porque o painel deixou de lidar com um único valor por vez.

Mas ainda existe uma limitação.

Cada tarefa continua sendo apenas um texto.

Na prática, aplicações reais quase nunca trabalham com itens tão simples assim.

Uma tarefa normalmente tem mais informações:

- título
- categoria
- prioridade
- status

É exatamente isso que vamos construir agora.

---

## O que muda nesta aula

Nesta aula, vamos introduzir duas ideias novas:

- objetos
- JSON

O objeto permite organizar várias informações relacionadas dentro de uma mesma estrutura.

Por exemplo:

```js
const tarefa = {
  titulo: "Praticar objetos",
  categoria: "Estudo",
  prioridade: "Alta"
};
```

Aqui, a tarefa não é mais um texto isolado.

Ela virou um conjunto de propriedades com significado próprio.

---

## Entendendo a diferença

Na aula 4, fazíamos algo assim:

```js
const tarefas = [
  "Revisar a aula anterior",
  "Praticar arrays",
  "Organizar o foco do dia"
];
```

Agora vamos evoluir para isto:

```js
const tarefas = [
  {
    titulo: "Revisar a aula anterior",
    categoria: "Estudo",
    prioridade: "Alta"
  },
  {
    titulo: "Organizar o foco do dia",
    categoria: "Planejamento",
    prioridade: "Média"
  }
];
```

Repare no ganho:

- cada item continua dentro do array
- mas agora cada item é um objeto
- cada objeto guarda mais contexto

> [!TIP]
> Pense assim: o array continua sendo a lista, e o objeto passa a ser o formato de cada tarefa dentro dessa lista.

---

## Onde entra o JSON

JSON é uma forma textual de representar dados estruturados.

Ele se parece com um objeto JavaScript, mas é usado como texto para transportar ou armazenar dados.

Veja um exemplo:

```json
{
  "titulo": "Praticar objetos",
  "categoria": "Estudo",
  "prioridade": "Alta"
}
```

Nesta aula, vamos mostrar esse formato na tela usando:

```js
JSON.stringify(tarefas, null, 2);
```

Você não precisa decorar os detalhes do `null, 2` agora.

O mais importante é perceber que o JavaScript consegue transformar os dados da aplicação em um texto JSON legível.

---

## Como o projeto evolui

O Painel do Dia agora vai mostrar:

- tarefas com título
- categoria de cada tarefa
- prioridade de cada tarefa
- uma prévia em JSON desses dados

No desafio, você vai mostrar mais uma informação da tarefa diretamente na interface.

---

## Preparando o ambiente

Abra a pasta `aula-05/projeto-base`.

Você vai trabalhar com esta estrutura:

```text
projeto-base/
├── index.html
├── style.css
└── script.js
```

O HTML e o CSS já estão prontos. O foco principal continua no `script.js`.

---

## Selecionando os elementos

Antes de montar a lista nova, selecione os elementos principais:

```js
const resumo = document.querySelector("#resumo");
const listaTarefas = document.querySelector("#listaTarefas");
const jsonSaida = document.querySelector("#jsonSaida");
const saida = document.querySelector("#saida");
const btnMostrarPainel = document.querySelector("#btnMostrarPainel");
```

Esses elementos serão usados para:

- montar a lista visual
- atualizar os textos da interface
- mostrar a versão em JSON das tarefas

### Faça agora

Abra o `script.js` e adicione essas seleções.

---

## Criando um array de objetos

Agora podemos montar a nova estrutura da aula:

```js
const tarefas = [
  {
    titulo: "Revisar a aula anterior",
    categoria: "Estudo",
    prioridade: "Alta",
    status: "Em andamento"
  },
  {
    titulo: "Organizar o foco do dia",
    categoria: "Planejamento",
    prioridade: "Média",
    status: "Pendente"
  }
];
```

Cada item ainda faz parte do array, mas agora cada tarefa tem várias propriedades.

Isso deixa os dados muito mais úteis para a aplicação.

---

## Lendo propriedades do objeto

Quando cada tarefa é um objeto, podemos acessar suas partes assim:

```js
tarefa.titulo
tarefa.categoria
tarefa.prioridade
```

Esse ponto é muito importante.

Ele indica que queremos ler uma propriedade específica do objeto.

---

## Renderizando tarefas mais completas

Agora podemos criar uma função para montar a lista com mais detalhes:

```js
function mostrarPainel() {
  listaTarefas.innerHTML = "";

  tarefas.forEach(function (tarefa) {
    const item = document.createElement("li");

    const titulo = document.createElement("h3");
    titulo.textContent = tarefa.titulo;

    const categoria = document.createElement("p");
    categoria.textContent = "Categoria: " + tarefa.categoria;

    const prioridade = document.createElement("p");
    prioridade.textContent = "Prioridade: " + tarefa.prioridade;

    item.appendChild(titulo);
    item.appendChild(categoria);
    item.appendChild(prioridade);
    listaTarefas.appendChild(item);
  });
}
```

Repare no que mudou:

- antes, cada item era só uma string
- agora, cada item gera mais de um elemento visual
- isso só é possível porque cada tarefa passou a guardar mais dados

---

## Mostrando os dados em JSON

Depois de montar a lista, também podemos exibir uma prévia em JSON:

```js
jsonSaida.textContent = JSON.stringify(tarefas, null, 2);
```

Essa linha transforma o array de objetos em texto.

Na prática, isso ajuda o aluno a perceber que:

- os dados têm estrutura
- essa estrutura pode ser exibida
- o painel e o JSON estão falando da mesma informação

> [!IMPORTANT]
> Essa ideia será muito útil na próxima aula, quando começarmos a salvar dados no navegador.

---

## Ligando tudo ao botão

Assim como nas aulas anteriores, a função principal precisa ser conectada ao clique.

```js
btnMostrarPainel.addEventListener("click", mostrarPainel);
```

Quando o botão for clicado, o painel vai:

1. montar a lista estruturada
2. mostrar categoria e prioridade
3. gerar a leitura em JSON

### Faça agora

Adicione essa linha, salve e teste.

Ao clicar no botão, a interface deve mostrar tarefas mais completas do que na aula anterior.

---

## O que você praticou nesta aula

Nesta etapa, você juntou:

- arrays
- objetos
- leitura de propriedades com `.`
- renderização de itens com mais contexto
- visualização de dados com `JSON.stringify`
- atualização do DOM a partir de dados estruturados

Agora o Painel do Dia já não trabalha só com lista de textos.

Ele começou a lidar com dados mais próximos de uma aplicação real.

---

## Desafio

Agora vá para a pasta `desafio`.

Cada tarefa já possui uma propriedade chamada `status`.

O seu objetivo é mostrar esse `status` na interface, junto das outras informações de cada tarefa.

### Dicas

- use `tarefa.status`
- crie um novo elemento com `document.createElement`
- adicione o texto do status nesse elemento
- envie esse novo elemento para dentro do item da lista

Exemplo de ideia:

```js
status.textContent = "Status: " + tarefa.status;
```

> [!IMPORTANT]
> Aqui você vai perceber com clareza a vantagem dos objetos: fica fácil mostrar novas informações sem precisar reinventar a estrutura da aplicação.

---

## Encerramento

Na aula 4, o painel começou a mostrar várias tarefas.

Na aula 5, cada tarefa deixou de ser só um texto e passou a ter estrutura própria.

Esse é um passo muito importante porque prepara o projeto para salvar dados, formatar informações e crescer com mais organização nas próximas aulas.
