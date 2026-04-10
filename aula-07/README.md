# Aula 7 - Exibindo datas e números de forma mais real

> [!NOTE]
> Nesta aula, o Painel do Dia continua usando tarefas estruturadas, mas agora passa a exibir datas e números de um jeito muito mais natural para quem está lendo a interface.

## Onde paramos

Na aula 6, o projeto começou a salvar dados no navegador com `localStorage`.

Isso foi importante porque o painel deixou de depender apenas do estado momentâneo da página.

Agora vamos melhorar outro ponto muito importante em qualquer aplicação real.

Os dados já existem, mas ainda podem parecer crus demais.

Uma data como `2026-04-18` ou um número como `10.5` até funciona para o JavaScript, mas não é o formato mais agradável para a pessoa usuária.

É exatamente isso que vamos melhorar agora.

---

## O que muda nesta aula

Nesta aula, vamos introduzir duas ideias:

- formatação de datas
- formatação de números

O objetivo não é mudar os dados em si.

O objetivo é mudar a forma como esses dados aparecem na tela.

Por exemplo, uma data pode sair de:

```text
2026-04-18
```

Para algo assim:

```text
18 de abril de 2026
```

E um número pode sair de:

```text
10.5
```

Para algo assim:

```text
10,5
```

---

## Como o projeto evolui

O Painel do Dia agora vai mostrar:

- tarefas com prazo formatado
- horas estimadas com formatação local
- um resumo com contagem de tarefas
- um total de horas com aparência mais natural

Além disso, vamos reaproveitar o filtro salvo da aula anterior para mostrar que os dados continuam conectados.

No desafio, você vai adicionar mais uma informação formatada na interface.

---

## Preparando o ambiente

Abra a pasta `aula-07/projeto-base`.

Você vai trabalhar com esta estrutura:

```text
projeto-base/
├── index.html
├── style.css
└── script.js
```

O HTML e o CSS já estão prontos. O foco principal continua no `script.js`.

---

## Estruturando os dados com prazo e horas

Nesta aula, cada tarefa vai ganhar duas informações novas:

- `prazo`
- `horasEstimadas`

Exemplo:

```js
const tarefas = [
  {
    titulo: "Revisar a aula anterior",
    categoria: "Estudo",
    prazo: "2026-04-18",
    horasEstimadas: 2.5
  }
];
```

Repare que:

- o prazo continua sendo um texto no formato de data
- as horas continuam sendo número
- a formatação vai acontecer só na hora de exibir

> [!TIP]
> Isso é importante porque uma coisa é o valor bruto que a aplicação guarda. Outra coisa é o jeito como esse valor aparece para a pessoa usuária.

---

## Selecionando os elementos do painel

Antes de montar a interface, selecione os elementos principais:

```js
const resumo = document.querySelector("#resumo");
const referenciaData = document.querySelector("#referenciaData");
const contadorTarefas = document.querySelector("#contadorTarefas");
const tempoTotal = document.querySelector("#tempoTotal");
const filtroAtual = document.querySelector("#filtroAtual");
const listaTarefas = document.querySelector("#listaTarefas");
const saida = document.querySelector("#saida");

const btnMostrarPainel = document.querySelector("#btnMostrarPainel");
```

Esses elementos serão usados para:

- montar a lista principal
- mostrar os resumos do painel
- reaproveitar um valor salvo no navegador

### Faça agora

Abra o `script.js` e adicione essas seleções.

---

## Formatando datas

Agora vamos transformar o prazo em um formato mais natural.

Para isso, podemos usar `new Date()` junto com `toLocaleDateString()`:

```js
const prazoFormatado = new Date(tarefa.prazo).toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric"
});
```

Vamos ler isso com calma:

- `new Date(tarefa.prazo)` transforma o texto em uma data
- `toLocaleDateString("pt-BR", ...)` pede uma saída no formato brasileiro
- as opções definem como o dia, o mês e o ano devem aparecer

Assim, a interface fica muito mais próxima do jeito como uma pessoa realmente lê datas.

---

## Formatando números

Para números, podemos usar `toLocaleString("pt-BR")`.

Exemplo:

```js
const horasFormatadas = tarefa.horasEstimadas.toLocaleString("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});
```

Isso ajuda muito quando queremos mostrar:

- casas decimais com vírgula
- contadores
- resumos numéricos

Se o valor for `2.5`, por exemplo, o resultado fica:

```text
2,5
```

> [!IMPORTANT]
> O número continua sendo número no JavaScript. Só a aparência dele muda na tela.

---

## Montando a lista formatada

Agora podemos montar a lista principal do painel:

```js
function mostrarPainel() {
  listaTarefas.innerHTML = "";
  let totalHoras = 0;

  tarefas.forEach(function (tarefa) {
    const item = document.createElement("li");

    const titulo = document.createElement("h3");
    titulo.textContent = tarefa.titulo;

    const prazoFormatado = new Date(tarefa.prazo).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    const horasFormatadas = tarefa.horasEstimadas.toLocaleString("pt-BR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    });

    const prazo = document.createElement("p");
    prazo.textContent = "Prazo: " + prazoFormatado;

    const horas = document.createElement("p");
    horas.textContent = "Tempo estimado: " + horasFormatadas + " h";

    item.appendChild(titulo);
    item.appendChild(prazo);
    item.appendChild(horas);
    listaTarefas.appendChild(item);

    totalHoras = totalHoras + tarefa.horasEstimadas;
  });
}
```

Aqui estamos fazendo duas coisas ao mesmo tempo:

- formatando os dados de cada tarefa
- acumulando o total de horas para o resumo geral

---

## Formatando o resumo do painel

Depois de percorrer a lista, podemos formatar os resumos:

```js
const totalFormatado = totalHoras.toLocaleString("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});

contadorTarefas.textContent = tarefas.length.toLocaleString("pt-BR") + " tarefas";
tempoTotal.textContent = totalFormatado + " horas planejadas";
```

Mesmo quando o valor é pequeno, usar formatação mantém o padrão da interface.

Isso ajuda a criar consistência visual no sistema.

---

## Reaproveitando o que veio da aula 6

Na aula passada, salvamos um filtro favorito com `localStorage`.

Agora podemos recuperar esse valor e mostrá-lo no painel:

```js
const filtroSalvo = localStorage.getItem("painelFiltro");

if (filtroSalvo === null) {
  filtroAtual.textContent = "Nenhum filtro favorito salvo.";
} else {
  filtroAtual.textContent = "Filtro favorito: " + filtroSalvo;
}
```

Perceba a ideia:

- a aula 6 continua viva
- a aula 7 melhora a apresentação desses dados

Isso ajuda o aluno a sentir que o projeto realmente está evoluindo, e não recomeçando a cada etapa.

---

## Ligando tudo ao botão

Agora conectamos a função principal ao clique:

```js
btnMostrarPainel.addEventListener("click", mostrarPainel);
```

Quando o botão for clicado, o painel vai:

1. montar a lista de tarefas
2. formatar datas
3. formatar números
4. atualizar o resumo
5. reaproveitar o filtro salvo no navegador

### Faça agora

Adicione essa linha, salve e teste.

Ao clicar no botão, a interface deve parecer mais próxima de um painel real.

---

## O que você praticou nesta aula

Nesta etapa, você juntou:

- tarefas estruturadas
- formatação de datas com `toLocaleDateString`
- formatação de números com `toLocaleString`
- resumo com contadores e totais
- reaproveitamento de dados já salvos no navegador

Agora o Painel do Dia não está apenas correto do ponto de vista técnico.

Ele também está mais agradável e legível para quem usa a interface.

---

## Desafio

Agora vá para a pasta `desafio`.

Lá já existe um espaço com `id` `#ultimaAtualizacao`.

O seu objetivo é mostrar a data atual de forma formatada dentro desse elemento.

### Dicas

- use `new Date()`
- formate com `toLocaleDateString("pt-BR")`
- monte um texto claro para exibir na interface

Exemplo de ideia:

```js
const hoje = new Date();
```

Depois disso, você pode transformar essa data em um texto mais amigável para o painel.

> [!IMPORTANT]
> Aqui você vai praticar a mesma ideia da aula, mas agora em outro ponto da interface.

---

## Encerramento

Na aula 6, o painel começou a guardar dados.

Na aula 7, ele passou a apresentar esses dados de um jeito muito mais natural.

Esse passo é importante porque uma aplicação real não precisa apenas funcionar.

Ela também precisa comunicar bem as informações para quem está usando.
