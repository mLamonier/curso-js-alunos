# Aula 3 - Calculando informações do painel

> [!NOTE]
> Nesta aula, o Painel do Dia continua personalizado, mas agora também passa a fazer contas com os dados digitados pelo usuário.

## Onde paramos

Na aula 2, o projeto começou a mostrar nome, foco do dia e um recado digitado pelo próprio usuário.

Isso foi importante porque a página deixou de responder com textos fixos e passou a usar dados reais da pessoa que está interagindo com ela.

Agora vamos dar mais um passo.

Em vez de apenas mostrar textos, o painel também vai calcular resultados.

---

## O que muda nesta aula

Nesta aula, vamos trabalhar com duas ideias novas:

- operadores matemáticos
- conversão de texto para número

Os operadores são os símbolos usados para fazer contas no JavaScript.

Por exemplo:

```js
const soma = 2 + 3;
const subtracao = 8 - 2;
const multiplicacao = 4 * 5;
const divisao = 20 / 4;
```

> [!TIP]
> Você não precisa decorar tudo de uma vez. O objetivo aqui é entender que o JavaScript consegue fazer contas com os valores da página, não só trocar textos.

---

## Como o projeto evolui

O Painel do Dia agora vai mostrar:

- quem é a pessoa
- qual é o foco do dia
- quantos blocos ela planejou concluir
- quantos blocos já concluiu
- quantos pontos acumulou
- quantos blocos ainda faltam

No desafio, você vai calcular também o tempo restante.

---

## Preparando o ambiente

Abra a pasta `aula-03/projeto-base`.

Você vai trabalhar com esta estrutura:

```text
projeto-base/
├── index.html
├── style.css
└── script.js
```

O HTML e o CSS já estão prontos. O foco continua no `script.js`.

---

## Lendo campos numéricos

Nesta aula, além dos campos de texto, o projeto também tem campos para números.

Você pode começar selecionando os elementos principais:

```js
const titulo = document.querySelector("#titulo");
const descricao = document.querySelector("#descricao");
const resumo = document.querySelector("#resumo");
const resultado = document.querySelector("#resultado");
const saida = document.querySelector("#saida");

const inputNome = document.querySelector("#inputNome");
const inputFoco = document.querySelector("#inputFoco");
const inputMeta = document.querySelector("#inputMeta");
const inputConcluido = document.querySelector("#inputConcluido");

const btnCalcular = document.querySelector("#btnCalcular");
```

### Faça agora

Abra o `script.js` e adicione essas seleções.

Elas reúnem tudo o que vamos precisar para atualizar o painel e fazer os cálculos.

---

## Um detalhe importante sobre inputs numéricos

Mesmo quando o campo é do tipo `number` no HTML, o valor lido com `.value` ainda chega como texto.

Isso significa que este código:

```js
const meta = inputMeta.value;
const concluido = inputConcluido.value;
```

Ainda produz strings, e não números de verdade.

É por isso que precisamos converter esses valores.

---

## Convertendo texto em número

Para transformar o valor digitado em número, vamos usar `Number()`.

```js
const meta = Number(inputMeta.value);
const concluido = Number(inputConcluido.value);
```

Agora sim o JavaScript pode fazer contas corretamente com esses valores.

> [!IMPORTANT]
> Esse passo é importante porque o JavaScript trata texto e número de formas diferentes.

---

## Por que essa conversão importa

Observe a diferença:

```js
const errado = "2" + "3";
const certo = Number("2") + Number("3");
```

No primeiro caso, o resultado seria:

```text
23
```

No segundo caso, o resultado seria:

```text
5
```

Isso acontece porque o símbolo `+` pode juntar textos ou somar números.

Então, quando queremos fazer contas, precisamos garantir que estamos lidando com números.

---

## Fazendo os cálculos do painel

Agora podemos criar os cálculos principais da aula.

```js
const restante = meta - concluido;
const pontuacao = concluido * 10;
```

Aqui usamos dois operadores:

- `-` para descobrir quantos blocos faltam
- `*` para calcular a pontuação do dia

Se a pessoa concluiu `3` blocos, por exemplo, a pontuação pode ser `30`.

---

## Organizando tudo em uma função

Assim como na aula anterior, faz sentido reunir toda a lógica em uma função.

```js
function calcularPainel() {
  const nomeDigitado = inputNome.value;
  const focoDigitado = inputFoco.value;
  const meta = Number(inputMeta.value);
  const concluido = Number(inputConcluido.value);

  const restante = meta - concluido;
  const pontuacao = concluido * 10;

  titulo.textContent = "Olá, " + nomeDigitado + "!";
  descricao.textContent = "Seu foco de hoje é: " + focoDigitado + ".";
  resumo.textContent = "Você concluiu " + concluido + " de " + meta + " blocos.";
  resultado.textContent = pontuacao + " pontos";
  saida.textContent = "Faltam " + restante + " blocos para encerrar a meta.";
}
```

Essa função lê os dados da tela, faz as contas e atualiza o painel em um único fluxo.

### Faça agora

Crie essa função no `script.js`.

Neste momento, assim como na aula 2, a função ainda existe sozinha. Falta conectá-la ao botão.

---

## Ligando a função ao clique

Agora vamos conectar o botão à função principal da aula.

```js
btnCalcular.addEventListener("click", calcularPainel);
```

Quando o botão for clicado, o JavaScript vai:

1. ler os dados dos inputs
2. converter os valores numéricos
3. fazer os cálculos
4. atualizar o painel

### Faça agora

Adicione essa linha, salve e teste.

Digite seu nome, seu foco, quantos blocos planejou concluir e quantos já concluiu.

Depois clique no botão e observe o novo comportamento do painel.

---

## Lendo a gramática com mais atenção

Observe este trecho:

```js
const pontuacao = concluido * 10;
```

Aqui:

- `const` cria uma referência
- `pontuacao` é o nome do valor
- `=` guarda o resultado
- `concluido * 10` faz a conta

Esse tipo de leitura é importante porque o código começa a ficar maior, e entender cada parte evita confusão.

---

## O que você praticou nesta aula

Nesta etapa, você juntou:

- leitura de texto
- leitura de número
- conversão com `Number()`
- operadores matemáticos
- atualização de conteúdo
- função conectada a evento

Agora o projeto já não apenas reage e personaliza, mas também calcula.

---

## Desafio

Agora vá para a pasta `desafio`.

Lá já existe um espaço com `id` `#tempo`.

O seu objetivo é mostrar o **tempo restante** do plano do dia.

Considere que cada bloco equivale a `25` minutos.

### Dicas

- reaproveite a lógica de `meta` e `concluido`
- calcule primeiro quantos blocos faltam
- depois multiplique esse resultado por `25`
- mostre o resultado dentro de `#tempo`

Exemplo de raciocínio:

```text
se faltam 2 blocos, então faltam 50 minutos
```

> [!IMPORTANT]
> Aqui você vai praticar novamente subtração e multiplicação, mas agora para produzir um segundo resultado visível no painel.

---

## Encerramento

Na aula 2, o painel começou a ser personalizado.

Na aula 3, ele passou a transformar dados em resultados.

Esse é outro passo importante, porque agora o projeto começa a ter lógica real de aplicação.

Você aprendeu a converter textos em números, fazer contas com operadores matemáticos e exibir o resultado disso diretamente na interface.
