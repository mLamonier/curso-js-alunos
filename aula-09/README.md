# Aula 9 - Organizando a lógica com classes

> [!NOTE]
> Nesta aula, o Painel do Dia continua funcionando no navegador, mas agora começa a organizar a lógica de um jeito mais estruturado.

## Onde paramos

Na aula 8, o projeto já conseguia misturar dados locais com uma informação externa vinda de API.

Isso foi importante porque o painel passou a reunir várias responsabilidades:

- mostrar resumos
- formatar dados
- ler `localStorage`
- buscar uma frase externa

Tudo isso funcionou bem até aqui.

Mas conforme o projeto cresce, começa a ficar mais difícil manter tudo espalhado em funções soltas.

É exatamente aí que entra a ideia desta aula.

---

## O que muda nesta aula

Nesta aula, vamos introduzir três conceitos:

- classes
- `prototype`
- herança

A ideia principal é mostrar que, quando o projeto cresce, podemos reunir parte da lógica dentro de uma estrutura mais organizada.

Por exemplo:

```js
class PainelDoDia {
  constructor(tarefas) {
    this.tarefas = tarefas;
  }
}
```

Aqui, a classe funciona como um molde para criar um painel com seus próprios dados e métodos.

---

## Entendendo a ideia de classe

Uma classe ajuda a agrupar:

- dados
- funções relacionadas a esses dados

Em vez de deixar várias funções separadas pelo arquivo, podemos reunir tudo em um único lugar.

Exemplo:

```js
class PainelDoDia {
  constructor(tarefas) {
    this.tarefas = tarefas;
  }

  contarTarefas() {
    return this.tarefas.length;
  }
}
```

Repare no papel de cada parte:

- `class PainelDoDia` cria o molde
- `constructor` recebe os dados iniciais
- `this.tarefas` guarda esses dados dentro do painel
- `contarTarefas()` é um método da classe

> [!TIP]
> Pense na classe como uma forma de dizer: “este pedaço do código pertence ao painel e deve ficar junto”.

---

## Onde entra o `prototype`

No JavaScript, os métodos de uma classe ficam ligados ao `prototype`.

Você não precisa mergulhar nisso agora, mas vale enxergar a ideia:

```js
PainelDoDia.prototype.contarTarefas
```

Isso mostra que os objetos criados a partir da classe compartilham os métodos definidos nela.

Nesta aula, o mais importante não é usar `prototype` diretamente o tempo todo.

O mais importante é entender que a classe organiza métodos que poderão ser reaproveitados pelas instâncias criadas.

---

## E a herança?

Herança significa criar uma classe nova a partir de outra.

Exemplo:

```js
class PainelInspirador extends PainelDoDia {
  constructor(tarefas, mensagemExtra) {
    super(tarefas);
    this.mensagemExtra = mensagemExtra;
  }
}
```

Aqui:

- `PainelInspirador` herda a base de `PainelDoDia`
- `super(tarefas)` chama o `constructor` da classe principal

Nesta aula, vamos usar herança de forma leve, só para mostrar a ideia sem complicar demais.

---

## Como o projeto evolui

O Painel do Dia agora vai:

- manter suas tarefas dentro de uma classe
- concentrar métodos de resumo dentro dessa classe
- usar uma classe derivada para exibir uma mensagem extra

No desafio, você vai adicionar um comportamento novo usando essa estrutura.

---

## Preparando o ambiente

Abra a pasta `aula-09/projeto-base`.

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

Antes de criar a classe, selecione os elementos principais:

```js
const referenciaData = document.querySelector("#referenciaData");
const contadorTarefas = document.querySelector("#contadorTarefas");
const tempoTotal = document.querySelector("#tempoTotal");
const frase = document.querySelector("#frase");
const autor = document.querySelector("#autor");
const mensagemClasse = document.querySelector("#mensagemClasse");
const saida = document.querySelector("#saida");

const btnOrganizarPainel = document.querySelector("#btnOrganizarPainel");
```

Esses elementos serão usados para mostrar o resultado da classe na interface.

### Faça agora

Abra o `script.js` e adicione essas seleções.

---

## Criando a classe principal

Agora podemos começar com a classe base do painel:

```js
class PainelDoDia {
  constructor(tarefas, fraseDoDia) {
    this.tarefas = tarefas;
    this.fraseDoDia = fraseDoDia;
  }

  contarTarefas() {
    return this.tarefas.length;
  }

  calcularHorasTotais() {
    let total = 0;

    this.tarefas.forEach(function (tarefa) {
      total = total + tarefa.horasEstimadas;
    });

    return total;
  }
}
```

Repare no ganho:

- as tarefas passam a ficar dentro do painel
- o cálculo total também fica dentro dele
- a contagem de tarefas deixa de ser uma função solta

---

## Adicionando métodos para exibição

Agora podemos criar métodos que devolvem textos prontos para a interface:

```js
class PainelDoDia {
  // ...

  gerarReferencia() {
    const hojeFormatado = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

    return "Painel de " + hojeFormatado;
  }

  gerarResumo() {
    return "O painel agora está organizado em uma classe.";
  }
}
```

Isso ajuda a deixar a responsabilidade mais clara:

- a classe calcula
- a classe organiza o texto
- a interface só exibe o resultado

---

## Criando uma classe derivada

Agora vamos usar herança de forma simples:

```js
class PainelInspirador extends PainelDoDia {
  constructor(tarefas, fraseDoDia, mensagemExtra) {
    super(tarefas, fraseDoDia);
    this.mensagemExtra = mensagemExtra;
  }

  mostrarMensagemExtra() {
    return this.mensagemExtra;
  }
}
```

Essa classe nova:

- herda tarefas e frase do painel base
- adiciona uma mensagem própria

É uma forma leve de mostrar que a estrutura pode crescer sem jogar fora a base.

---

## Criando a instância do painel

Depois da classe, criamos o painel real da página:

```js
const painel = new PainelInspirador(tarefas, fraseDoDia, "Sua lógica agora está mais organizada.");
```

Esse objeto `painel` já nasce com:

- tarefas
- frase do dia
- métodos herdados
- mensagem extra

Agora podemos pedir informações diretamente a ele.

---

## Exibindo o resultado na interface

Com a instância criada, a função principal da aula pode ficar assim:

```js
function organizarPainel() {
  referenciaData.textContent = painel.gerarReferencia();
  contadorTarefas.textContent = painel.contarTarefas().toLocaleString("pt-BR") + " tarefas";
  tempoTotal.textContent = painel.calcularHorasTotais().toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }) + " horas planejadas";

  frase.textContent = '"' + painel.fraseDoDia.quote + '"';
  autor.textContent = "Autor: " + painel.fraseDoDia.author;
  mensagemClasse.textContent = painel.mostrarMensagemExtra();
  saida.textContent = painel.gerarResumo();
}
```

Perceba o que está acontecendo:

- a interface continua simples
- a lógica principal foi puxada para dentro da classe

Esse é o grande aprendizado da aula.

---

## Ligando ao botão

Agora conectamos tudo ao clique:

```js
btnOrganizarPainel.addEventListener("click", organizarPainel);
```

Quando o botão for clicado, o painel vai:

1. usar os métodos da classe
2. calcular dados
3. exibir a frase do dia
4. mostrar a mensagem extra da classe derivada

### Faça agora

Adicione essa linha, salve e teste.

Ao clicar no botão, a interface deve mostrar o mesmo tipo de informação que já conhecemos, mas agora organizada a partir de uma classe.

---

## O que você praticou nesta aula

Nesta etapa, você juntou:

- criação de classes
- uso de `constructor`
- métodos da classe
- ideia de `prototype`
- herança com `extends`
- chamada de `super()`
- organização da lógica em um objeto principal

Agora o Painel do Dia já não depende apenas de funções espalhadas pelo arquivo.

Ele começa a ter uma estrutura mais própria.

---

## Desafio

Agora vá para a pasta `desafio`.

O seu objetivo é criar mais um método para a classe derivada.

Esse método pode gerar uma mensagem curta sobre o total de tarefas do dia.

Depois, mostre esse texto em `#mensagemDesafio`.

### Dicas

- crie um novo método dentro de `PainelInspirador`
- esse método pode reaproveitar `this.tarefas.length`
- depois, use esse método na interface

Exemplo de ideia:

```js
gerarMensagemDeFoco() {
  return "Hoje o painel acompanha " + this.tarefas.length + " tarefas.";
}
```

> [!IMPORTANT]
> Aqui você aplica a continuação mais natural da aula: usar a própria classe para criar um comportamento novo sem espalhar mais lógica pelo arquivo.

---

## Encerramento

Na aula 8, o painel passou a misturar dados locais e externos.

Na aula 9, ele começou a organizar melhor a própria lógica.

Esse passo é importante porque prepara o caminho para o encerramento do curso, mostrando que um projeto maior precisa não só funcionar, mas também ficar mais fácil de manter.
