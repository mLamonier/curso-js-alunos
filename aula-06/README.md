# Aula 6 - Salvando dados no navegador

> [!NOTE]
> Nesta aula, o Painel do Dia passa a continuar com os dados mesmo depois que a página é atualizada.

## Onde paramos

Na aula 5, cada tarefa deixou de ser apenas um texto e passou a ter estrutura própria.

Isso foi importante porque o projeto começou a trabalhar com dados mais parecidos com os de uma aplicação real.

Mas ainda existe um problema.

Se a página for atualizada, tudo volta ao estado inicial.

Ou seja: a interface mostra os dados, mas ainda não guarda nada.

É exatamente isso que vamos resolver agora.

---

## O que muda nesta aula

Nesta aula, vamos introduzir o `localStorage`.

O `localStorage` é um recurso do navegador que permite salvar dados localmente.

Isso significa que o projeto pode guardar informações e ler tudo de novo depois, mesmo após atualizar a página.

Por exemplo:

```js
localStorage.setItem("nome", "Miguel");
```

Depois, podemos recuperar esse valor:

```js
const nomeSalvo = localStorage.getItem("nome");
```

> [!TIP]
> Pense no `localStorage` como uma pequena gaveta do navegador onde sua aplicação pode guardar textos.

---

## Um detalhe importante

O `localStorage` trabalha com texto.

Isso quer dizer que ele não salva arrays e objetos diretamente do jeito que usamos no JavaScript.

Por isso, vamos reaproveitar a ideia de JSON da aula anterior.

Para salvar:

```js
localStorage.setItem("painelTarefas", JSON.stringify(tarefas));
```

Para recuperar:

```js
const tarefasSalvas = localStorage.getItem("painelTarefas");
const tarefasConvertidas = JSON.parse(tarefasSalvas);
```

Primeiro transformamos os dados em texto JSON.

Depois, transformamos esse texto de volta em estrutura JavaScript.

---

## Como o projeto evolui

O Painel do Dia agora vai permitir:

- mostrar tarefas estruturadas
- salvar essas tarefas no navegador
- restaurar tarefas já salvas
- manter também uma preferência simples do painel

No desafio, você vai salvar um filtro favorito do usuário.

---

## Preparando o ambiente

Abra a pasta `aula-06/projeto-base`.

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

Antes de começar, selecione os elementos principais:

```js
const resumo = document.querySelector("#resumo");
const listaTarefas = document.querySelector("#listaTarefas");
const jsonSaida = document.querySelector("#jsonSaida");
const saida = document.querySelector("#saida");

const btnMostrarPainel = document.querySelector("#btnMostrarPainel");
const btnSalvarTarefas = document.querySelector("#btnSalvarTarefas");
const btnRestaurarTarefas = document.querySelector("#btnRestaurarTarefas");
```

Esses elementos vão permitir:

- montar a lista
- mostrar o JSON atual
- salvar dados
- recuperar dados salvos

### Faça agora

Abra o `script.js` e adicione essas seleções.

---

## Uma pequena mudança: `let`

Nas aulas anteriores, usamos bastante `const`.

Nesta aula, a coleção de tarefas pode ser substituída por outra versão vinda do navegador.

Por isso, faz sentido usar `let`:

```js
let tarefas = [
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

Aqui, o array inicial ainda existe, mas agora ele pode ser trocado por uma versão recuperada do `localStorage`.

> [!IMPORTANT]
> `const` serve muito bem quando o valor não será substituído. Quando a intenção é trocar toda a referência depois, `let` faz mais sentido.

---

## Mantendo a renderização do painel

O painel continua precisando de uma função para desenhar a lista na tela.

Ela pode seguir a mesma linha da aula 5:

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

  jsonSaida.textContent = JSON.stringify(tarefas, null, 2);
}
```

O que muda nesta aula não é a forma de renderizar.

O que muda é a origem dos dados.

Agora eles podem vir não só do código, mas também do navegador.

---

## Salvando tarefas no navegador

Agora podemos criar a função que grava as tarefas no `localStorage`:

```js
function salvarTarefas() {
  localStorage.setItem("painelTarefas", JSON.stringify(tarefas));
  saida.textContent = "As tarefas foram salvas no navegador.";
}
```

Essa função faz três coisas:

1. pega o array de tarefas atual
2. transforma tudo em JSON
3. salva esse texto com uma chave

A chave, neste caso, é `"painelTarefas"`.

Ela funciona como o nome da gaveta onde os dados serão guardados.

---

## Recuperando tarefas salvas

Agora vem a outra metade da lógica:

```js
function restaurarTarefas() {
  const tarefasSalvas = localStorage.getItem("painelTarefas");

  if (tarefasSalvas === null) {
    saida.textContent = "Nenhuma tarefa salva foi encontrada.";
    return;
  }

  tarefas = JSON.parse(tarefasSalvas);
  mostrarPainel();
  saida.textContent = "As tarefas salvas foram restauradas.";
}
```

Vamos ler isso com calma:

- `getItem` tenta buscar o texto salvo
- se não existir nada, ele devolve `null`
- se existir, usamos `JSON.parse` para transformar o texto em array de objetos de novo
- depois renderizamos o painel com os dados recuperados

---

## Ligando as funções aos botões

Assim como nas outras aulas, as funções precisam ser conectadas aos eventos:

```js
btnMostrarPainel.addEventListener("click", mostrarPainel);
btnSalvarTarefas.addEventListener("click", salvarTarefas);
btnRestaurarTarefas.addEventListener("click", restaurarTarefas);
```

Agora o fluxo do painel fica assim:

1. mostrar as tarefas
2. salvar no navegador
3. restaurar depois, quando quiser

### Faça agora

Adicione essas linhas, salve e teste.

Um jeito simples de verificar:

1. clique para mostrar as tarefas
2. clique para salvar
3. atualize a página
4. clique em restaurar

Se tudo estiver certo, as tarefas voltam.

---

## Salvando uma preferência simples

Além das tarefas, também podemos salvar uma preferência menor.

No desafio desta aula, o painel traz um seletor de filtro favorito.

Esse tipo de valor também pode ser salvo com `localStorage` porque é apenas texto.

Exemplo:

```js
localStorage.setItem("painelFiltro", filtroEscolhido);
```

Aqui, não precisamos de `JSON.stringify`, porque o valor já é uma string simples.

---

## O que você praticou nesta aula

Nesta etapa, você juntou:

- objetos e JSON da aula anterior
- salvamento com `localStorage.setItem`
- leitura com `localStorage.getItem`
- conversão com `JSON.stringify`
- reconstrução com `JSON.parse`
- persistência de dados no navegador

Agora o Painel do Dia finalmente começa a se comportar como uma aplicação que lembra do que já foi feito.

---

## Desafio

Agora vá para a pasta `desafio`.

Lá existe um seletor com `id` `#selectFiltro`, um botão com `id` `#btnSalvarFiltro` e um texto com `id` `#filtroAtual`.

O seu objetivo é salvar o filtro favorito do usuário no navegador.

### Dicas

- leia o valor atual do seletor
- salve esse valor com `localStorage.setItem`
- mostre na tela qual foi o filtro salvo
- se quiser ir além, tente recuperar esse valor quando a página carregar

Exemplo de ideia:

```js
const filtroEscolhido = selectFiltro.value;
localStorage.setItem("painelFiltro", filtroEscolhido);
```

> [!IMPORTANT]
> Aqui você vai perceber que o `localStorage` não serve só para listas grandes. Ele também é ótimo para guardar preferências simples da interface.

---

## Encerramento

Na aula 5, o painel passou a trabalhar com tarefas estruturadas.

Na aula 6, ele começou a guardar essas informações no navegador.

Esse é um passo muito importante porque, a partir daqui, o projeto deixa de depender apenas do estado momentâneo da página e começa a construir memória própria.
