# Aula 4 - Trabalhando com várias tarefas ao mesmo tempo

> [!NOTE]
> Nesta aula, o Painel do Dia deixa de mostrar só um resultado isolado e passa a exibir uma lista inteira de tarefas.

## Onde paramos

Na aula 3, o painel já conseguia ler dados digitados pelo usuário e transformar isso em cálculo.

Isso foi importante porque o projeto começou a ter lógica real.

Agora vamos para outro passo muito comum em aplicações de verdade.

Em vez de lidar com um único valor por vez, vamos começar a trabalhar com várias informações agrupadas.

---

## O que muda nesta aula

Nesta aula, vamos introduzir duas ideias centrais:

- arrays
- renderização de lista no DOM

Um array é uma estrutura usada para guardar vários valores juntos.

Por exemplo:

```js
const tarefas = ["Revisar aula", "Praticar JavaScript", "Organizar o dia"];
```

Em vez de criar uma variável para cada tarefa, agrupamos tudo em uma única coleção.

> [!TIP]
> Pense no array como uma pequena lista guardada dentro do JavaScript.

---

## Como o projeto evolui

O Painel do Dia agora vai mostrar:

- um resumo do plano atual
- uma lista com várias tarefas
- uma área pronta para receber uma nova tarefa

No desafio, você vai usar essa estrutura para adicionar um novo item visual na lista.

---

## Preparando o ambiente

Abra a pasta `aula-04/projeto-base`.

Você vai trabalhar com esta estrutura:

```text
projeto-base/
├── index.html
├── style.css
└── script.js
```

O HTML e o CSS já estão prontos. O foco principal continua no `script.js`.

---

## Entendendo o array

Até agora, usamos valores isolados:

```js
const nome = "Miguel";
const foco = "Estudar JavaScript";
```

Isso funciona bem quando queremos guardar uma coisa de cada vez.

Mas se quisermos armazenar várias tarefas, usar uma variável para cada item começa a ficar ruim.

Com array, podemos fazer assim:

```js
const tarefas = [
  "Revisar a aula anterior",
  "Praticar arrays",
  "Montar a lista do dia"
];
```

Agora temos uma única variável que guarda vários textos.

---

## Selecionando os elementos da lista

Antes de renderizar qualquer item, precisamos selecionar os elementos da página.

```js
const resumo = document.querySelector("#resumo");
const listaTarefas = document.querySelector("#listaTarefas");
const saida = document.querySelector("#saida");
const btnMostrarTarefas = document.querySelector("#btnMostrarTarefas");
```

Esses elementos vão permitir:

- atualizar o texto de apoio
- inserir tarefas na lista
- ligar tudo ao clique do botão

### Faça agora

Abra o `script.js` e adicione essas seleções.

---

## Criando a coleção de tarefas

Agora podemos montar o array da aula:

```js
const tarefas = [
  "Revisar a aula anterior",
  "Praticar arrays no navegador",
  "Organizar o foco do dia"
];
```

Cada item do array representa uma tarefa.

Repare que:

- os valores ficam entre colchetes
- os itens são separados por vírgula
- cada tarefa continua sendo uma string

> [!IMPORTANT]
> O array não substitui as strings. Ele apenas organiza várias strings dentro de uma mesma estrutura.

---

## Mostrando a lista na tela

Agora vem a parte nova da prática: transformar os dados do array em elementos visíveis no HTML.

Podemos criar uma função para isso:

```js
function mostrarTarefas() {
  listaTarefas.innerHTML = "";

  tarefas.forEach(function (tarefa) {
    const item = document.createElement("li");
    item.textContent = tarefa;
    listaTarefas.appendChild(item);
  });

  resumo.textContent = "Sua lista do dia está pronta para começar.";
  saida.textContent = "As tarefas foram carregadas no painel.";
}
```

Vamos ler esse bloco com calma:

- `listaTarefas.innerHTML = ""` limpa a lista antes de montar tudo de novo
- `tarefas.forEach(...)` passa por cada item do array
- `document.createElement("li")` cria um item de lista
- `item.textContent = tarefa` coloca o texto da tarefa dentro do item
- `appendChild(item)` envia o item para dentro da `<ul>`

---

## O que significa `forEach`

O `forEach` executa uma ação para cada item do array.

Neste caso:

```js
tarefas.forEach(function (tarefa) {
  const item = document.createElement("li");
  item.textContent = tarefa;
  listaTarefas.appendChild(item);
});
```

Isso significa:

1. pegar uma tarefa do array
2. criar um `<li>`
3. colocar o texto dentro dele
4. repetir esse processo para cada tarefa existente

Você não precisa decorar tudo agora.

O mais importante é entender a ideia: o JavaScript está usando a lista de dados para montar a lista visual da interface.

---

## Ligando a função ao botão

Assim como nas aulas anteriores, a função precisa ser conectada a um evento.

```js
btnMostrarTarefas.addEventListener("click", mostrarTarefas);
```

Quando o botão for clicado, a página vai montar a lista usando o array.

### Faça agora

Adicione essa linha, salve e teste.

Ao clicar no botão, a lista do HTML deve deixar de mostrar o estado inicial e passar a exibir as tarefas do dia.

---

## Por que isso é importante

Na prática, esta aula marca uma mudança grande.

Antes, o painel trabalhava com um texto, um número ou um resultado por vez.

Agora, ele passa a lidar com coleção de dados.

Essa ideia é essencial porque quase toda aplicação real trabalha com listas:

- lista de tarefas
- lista de produtos
- lista de mensagens
- lista de usuários

---

## O que você praticou nesta aula

Nesta etapa, você juntou:

- arrays
- strings dentro de uma coleção
- criação de elementos com `createElement`
- inserção no DOM com `appendChild`
- renderização de lista com base em dados
- função conectada a evento

O Painel do Dia agora já consegue mostrar várias tarefas ao mesmo tempo.

---

## Desafio

Agora vá para a pasta `desafio`.

Lá já existe um campo com `id` `#inputNovaTarefa` e um botão com `id` `#btnAdicionarTarefa`.

O seu objetivo é permitir que o usuário digite uma nova tarefa e adicione esse item à lista.

### Dicas

- leia o valor digitado no input
- adicione esse valor no array de tarefas
- monte a lista novamente depois da atualização
- limpe o campo após adicionar

Uma pista útil:

```js
tarefas.push(novaTarefa);
```

Esse comando adiciona um novo item ao final do array.

> [!IMPORTANT]
> Aqui você vai praticar a ideia mais importante da aula: quando os dados mudam, a interface também precisa ser atualizada.

---

## Encerramento

Na aula 3, o painel passou a calcular.

Na aula 4, ele começou a organizar várias tarefas de uma vez.

Esse passo é muito importante porque abre o caminho para as próximas aulas, quando cada tarefa deixará de ser apenas um texto solto e passará a ter mais estrutura.
