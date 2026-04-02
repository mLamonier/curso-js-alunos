# Aula 2 — Personalizando o painel com entrada do usuário

> [!NOTE]
> Nesta aula, o projeto deixa de reagir apenas com textos fixos e passa a mostrar conteúdo digitado pelo próprio usuário.

## Onde paramos

Na aula anterior, você fez a página reagir ao clique.

Foi um passo importante, porque ali o JavaScript deixou de ser algo invisível e passou a realmente controlar a tela.

Agora vamos dar o próximo passo natural: em vez de mostrar sempre a mesma mensagem, o projeto vai usar o que a pessoa digitar.

Isso deixa a interface muito mais próxima de uma aplicação real.

---

## O que muda nesta aula

Nesta aula, vamos trabalhar principalmente com duas ideias novas.

A primeira é `string`, que é como o JavaScript representa textos.

A segunda é `function`, que é uma forma de guardar um bloco de código para reutilizar depois.

> [!TIP]
> Em vez de repetir a mesma lógica várias vezes, você cria uma função e manda o botão executar essa função quando for clicado.

---

## Como o projeto evolui

O card simples da aula 1 agora vira um pequeno **Painel do Dia**.

O usuário vai digitar:

- o próprio nome
- o foco principal do dia

Depois disso, a página será atualizada com esses dados.

No final, o desafio será adicionar um recado secundário personalizado.

---

## Preparando o ambiente

Abra a pasta `aula-02/projeto-base`.

Você vai trabalhar com esta estrutura:

```text
projeto-base/
├── index.html
├── style.css
└── script.js
```

O HTML e o CSS já estão preparados. O foco da aula continua sendo o `script.js`.

---

## Lendo o que o usuário digitou

Agora o projeto tem campos de entrada no HTML.

Para usar o que a pessoa digitou, primeiro precisamos selecionar esses elementos.

```js
const inputNome = document.querySelector("#inputNome");
const inputFoco = document.querySelector("#inputFoco");
const btnAtualizar = document.querySelector("#btnAtualizar");
```

Essas linhas funcionam exatamente como na aula anterior: o JavaScript encontra os elementos da página e passa a poder trabalhar com eles.

### Faça agora

Abra o `script.js` e adicione essas seleções.

Se quiser, também aproveite para selecionar:

```js
const titulo = document.querySelector("#titulo");
const descricao = document.querySelector("#descricao");
const saida = document.querySelector("#saida");
```

Esses são os elementos que vamos atualizar depois.

---

## Pegando o valor de um input

Depois de selecionar um campo, você pode acessar o texto digitado nele com `.value`.

```js
const nomeDigitado = inputNome.value;
```

Se a pessoa tiver digitado `Miguel`, por exemplo, essa variável passa a guardar esse texto.

É aqui que entra a ideia de `string`.

---

## O que é uma string

Sempre que o JavaScript trabalha com texto, ele está trabalhando com uma string.

Por exemplo:

```js
const mensagem = "Olá, mundo!";
```

Tudo que está entre aspas é texto.

Isso vale para nomes, recados, descrições e qualquer conteúdo textual que você queira mostrar na tela.

---

## Montando uma mensagem com strings

Agora podemos juntar textos fixos com textos digitados pelo usuário.

```js
titulo.textContent = "Olá, " + nomeDigitado + "!";
```

Aqui acontece uma junção:

- `"Olá, "` é um texto fixo
- `nomeDigitado` é o texto que veio do input
- `"!"` fecha a frase

O resultado final pode ser algo como:

```text
Olá, Miguel!
```

Isso faz a interface parecer viva, porque ela passa a responder com conteúdo personalizado.

### Faça agora

Teste também esta linha:

```js
descricao.textContent = "Hoje o seu foco principal é: " + inputFoco.value + ".";
```

Salve o arquivo, atualize a página e veja o painel mudar com base no que foi digitado.

---

## Lendo a gramática do código com calma

Observe esta linha:

```js
const nomeDigitado = inputNome.value;
```

Aqui, `const` cria uma referência com nome.

`nomeDigitado` é o nome que demos para esse valor dentro do código.

O sinal `=` significa que estamos guardando um valor.

`inputNome.value` quer dizer: pegue o valor atual que está dentro do campo.

O ponto e vírgula no final marca o encerramento da instrução.

> [!IMPORTANT]
> O JavaScript consegue inserir alguns pontos e vírgulas automaticamente em certas situações, mas nesta fase é melhor manter o ponto e vírgula explícito para o código ficar mais claro e previsível.

---

## Criando uma função

Até aqui, você já consegue escrever linhas soltas para atualizar a página.

Mas quando várias linhas precisam acontecer juntas, vale organizar isso dentro de uma função.

```js
function atualizarPainel() {
  const nomeDigitado = inputNome.value;
  const focoDigitado = inputFoco.value;

  titulo.textContent = "Olá, " + nomeDigitado + "!";
  descricao.textContent = "Hoje o seu foco principal é: " + focoDigitado + ".";
  saida.textContent = "Painel atualizado com sucesso.";
}
```

Essa função reúne toda a lógica de atualização do painel em um só lugar.

As chaves mostram onde a função começa e onde termina.

Tudo que estiver ali dentro será executado quando essa função for chamada.

### Faça agora

Crie essa função no seu `script.js`.

Neste momento, nada vai mudar ainda ao clicar no botão, e isso é esperado. A função existe, mas ainda não foi conectada ao evento.

---

## Ligando a função ao botão

Agora vamos reutilizar o que você aprendeu sobre clique.

```js
btnAtualizar.addEventListener("click", atualizarPainel);
```

Antes, você usou uma função escrita diretamente dentro do evento.

Agora, em vez disso, estamos entregando ao botão uma função que já foi criada antes.

> [!TIP]
> Repare que aqui usamos `atualizarPainel` sem parênteses. Isso acontece porque queremos passar a função para o evento, e não executar a função imediatamente.

### Faça agora

Adicione essa linha, salve e teste o projeto.

Digite seu nome, digite seu foco do dia e clique no botão.

Se tudo estiver certo, o painel será personalizado com o que você escreveu.

---

## O que você praticou sem perceber

Nesta aula, você já juntou vários conhecimentos em um mesmo fluxo:

- seleção de elementos
- leitura de inputs
- uso de strings
- atualização de texto no DOM
- reutilização de lógica com função
- clique chamando uma função pronta

Esse é exatamente o tipo de construção que vai aparecer de novo nas próximas aulas.

---

## Desafio

Agora vá para a pasta `desafio`.

Lá já existe um novo campo chamado `#inputRecado`, um botão com `id` `#btnRecado` e um texto com `id` `#recado`.

O seu objetivo é fazer o usuário atualizar esse recado secundário sozinho.

### Dicas

- selecione `#inputRecado`
- selecione `#btnRecado`
- selecione `#recado`
- crie uma função própria para esse comportamento
- use `.value` para ler o texto digitado
- use `textContent` para mostrar o novo recado

> [!IMPORTANT]
> Tente resolver usando a mesma lógica da função principal da aula. A ideia aqui é justamente reaproveitar o padrão que você acabou de aprender.

---

## Encerramento

Na aula 1, a página reagia.

Na aula 2, ela começou a reagir com dados do próprio usuário.

Esse é um salto importante, porque agora o projeto deixa de ser apenas interativo e começa a ficar personalizado.

Você aprendeu a trabalhar com texto, a entender melhor a gramática do código e a organizar múltiplas ações dentro de uma função.
