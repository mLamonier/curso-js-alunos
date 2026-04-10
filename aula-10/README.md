# Aula 10 - JavaScript além do navegador

> [!NOTE]
> Nesta aula, o Painel do Dia sai do navegador e ganha um pequeno script em Node.js para preparar dados do próprio projeto.

## Onde paramos

Na aula 9, o projeto passou a organizar melhor a lógica com classes.

Isso foi importante porque o painel começou a ficar mais fácil de manter.

Agora vamos encerrar o curso mostrando outra ideia essencial:

JavaScript não roda só no navegador.

Ele também pode rodar fora da página, direto no computador, com Node.js.

Esse é o passo final do curso.

---

## O que muda nesta aula

Nesta aula, vamos introduzir noções de Node.js.

O objetivo não é ensinar tudo sobre ambiente de servidor.

O objetivo é mostrar, de forma prática, que o mesmo JavaScript pode ser usado para:

- ler arquivos
- transformar dados
- gerar saídas úteis para a aplicação

Nesta aula, vamos criar um pequeno script que:

1. lê um arquivo JSON do Painel do Dia
2. calcula um resumo
3. gera um novo arquivo com esse resultado

---

## O que é Node.js

Node.js é um ambiente que permite executar JavaScript fora do navegador.

No navegador, usamos JavaScript para mexer com:

- DOM
- eventos
- interface

No Node.js, podemos usar JavaScript para mexer com:

- arquivos
- pastas
- processos
- automações

Nesta aula, vamos focar no uso mais simples e útil para este curso: leitura e escrita de arquivos.

---

## Como o projeto evolui

O Painel do Dia agora vai ganhar um script de apoio que:

- lê os dados de tarefas de um arquivo JSON
- conta tarefas
- soma horas planejadas
- cria um resumo final em outro arquivo

No desafio, você vai adaptar esse script para gerar uma segunda saída simples.

---

## Preparando o ambiente

Abra a pasta `aula-10/projeto-base`.

Você vai trabalhar com esta estrutura:

```text
projeto-base/
├── dados-painel.json
└── gerar-resumo.js
```

Aqui, o foco não é mais HTML e CSS.

Agora estamos trabalhando com arquivos e execução pelo terminal.

---

## O arquivo de dados do painel

Vamos começar com um JSON que representa o estado do projeto:

```json
{
  "usuario": "Miguel",
  "filtroFavorito": "Alta",
  "tarefas": [
    {
      "titulo": "Revisar a aula anterior",
      "horasEstimadas": 2.5,
      "status": "Concluída"
    },
    {
      "titulo": "Organizar o foco do dia",
      "horasEstimadas": 3,
      "status": "Pendente"
    }
  ]
}
```

Repare como isso conversa com tudo o que já fizemos:

- temos objeto
- temos array
- temos JSON
- temos dados do próprio Painel do Dia

Ou seja: a aula final não quebra o contexto do curso.

---

## Lendo o arquivo com Node.js

No Node, podemos usar o módulo `fs` para trabalhar com arquivos.

Exemplo:

```js
const fs = require("fs");

const conteudo = fs.readFileSync("dados-painel.json", "utf-8");
```

Aqui:

- `require("fs")` carrega o módulo de arquivos
- `readFileSync` lê o conteúdo do arquivo
- `"utf-8"` garante a leitura como texto

Depois disso, ainda precisamos transformar o texto em objeto JavaScript:

```js
const dadosPainel = JSON.parse(conteudo);
```

Agora sim podemos acessar:

```js
dadosPainel.usuario
dadosPainel.filtroFavorito
dadosPainel.tarefas
```

---

## Calculando o resumo no script

Depois de ler os dados, podemos calcular o resumo:

```js
let totalHoras = 0;
let tarefasConcluidas = 0;

dadosPainel.tarefas.forEach(function (tarefa) {
  totalHoras = totalHoras + tarefa.horasEstimadas;

  if (tarefa.status === "Concluída") {
    tarefasConcluidas = tarefasConcluidas + 1;
  }
});
```

Esse trecho reaproveita várias ideias do curso:

- leitura de propriedades
- operadores matemáticos
- condição simples
- loop com `forEach`

Ou seja: a aula final serve também como revisão prática do caminho inteiro.

---

## Gerando um novo arquivo

Agora podemos montar um objeto de saída:

```js
const resumoPainel = {
  usuario: dadosPainel.usuario,
  filtroFavorito: dadosPainel.filtroFavorito,
  totalTarefas: dadosPainel.tarefas.length,
  tarefasConcluidas: tarefasConcluidas,
  totalHorasPlanejadas: totalHoras
};
```

Depois disso, usamos `writeFileSync`:

```js
fs.writeFileSync(
  "resumo-painel.json",
  JSON.stringify(resumoPainel, null, 2),
  "utf-8"
);
```

Essa linha cria um novo arquivo com o resultado final do script.

> [!IMPORTANT]
> Aqui acontece a virada da aula: o JavaScript não está mais só exibindo informação na tela. Agora ele está preparando arquivos que podem apoiar a aplicação.

---

## Mostrando uma mensagem no terminal

Além de gerar o arquivo, também podemos mostrar uma mensagem simples:

```js
console.log("Resumo do painel gerado com sucesso.");
```

Isso ajuda quem está executando o script a saber que tudo funcionou.

---

## O script completo da aula

Quando juntamos tudo, a lógica principal fica assim:

```js
const fs = require("fs");

const conteudo = fs.readFileSync("dados-painel.json", "utf-8");
const dadosPainel = JSON.parse(conteudo);

let totalHoras = 0;
let tarefasConcluidas = 0;

dadosPainel.tarefas.forEach(function (tarefa) {
  totalHoras = totalHoras + tarefa.horasEstimadas;

  if (tarefa.status === "Concluída") {
    tarefasConcluidas = tarefasConcluidas + 1;
  }
});

const resumoPainel = {
  usuario: dadosPainel.usuario,
  filtroFavorito: dadosPainel.filtroFavorito,
  totalTarefas: dadosPainel.tarefas.length,
  tarefasConcluidas: tarefasConcluidas,
  totalHorasPlanejadas: totalHoras
};

fs.writeFileSync(
  "resumo-painel.json",
  JSON.stringify(resumoPainel, null, 2),
  "utf-8"
);

console.log("Resumo do painel gerado com sucesso.");
```

---

## Como executar no terminal

Dentro da pasta `projeto-base`, rode:

```powershell
node gerar-resumo.js
```

Se tudo der certo:

- o terminal mostrará uma mensagem de sucesso
- o arquivo `resumo-painel.json` será criado

---

## O que você praticou nesta aula

Nesta etapa final, você juntou:

- leitura de arquivo com `fs.readFileSync`
- conversão com `JSON.parse`
- cálculo com dados vindos de arquivo
- geração de novo conteúdo em JSON
- escrita com `fs.writeFileSync`
- execução de JavaScript fora do navegador com Node.js

Agora o curso mostra de forma prática que JavaScript pode apoiar o mesmo projeto em mais de um ambiente.

---

## Desafio

Agora vá para a pasta `desafio`.

O seu objetivo é adaptar o script para gerar uma segunda saída simples.

Você pode criar um arquivo chamado `resumo-curto.txt`.

Esse arquivo pode conter uma frase como:

```text
Miguel tem 3 tarefas no painel e 1 já foi concluída.
```

### Dicas

- monte um texto com template string
- use `fs.writeFileSync`
- gere o arquivo `.txt` além do `.json`

Exemplo de ideia:

```js
const resumoCurto = `${dadosPainel.usuario} tem ${dadosPainel.tarefas.length} tarefas no painel.`;
```

> [!IMPORTANT]
> Esse desafio fecha muito bem o curso porque mostra uma adaptação simples do script final para gerar outra saída útil.

---

## Encerramento

Na aula 9, o painel começou a organizar melhor sua própria lógica.

Na aula 10, você viu que o mesmo JavaScript também pode rodar fora do navegador para ler arquivos e preparar dados do projeto.

Esse encerramento conecta tudo o que foi construído ao longo do curso:

- DOM
- eventos
- funções
- arrays
- objetos
- JSON
- `localStorage`
- APIs
- classes
- e agora Node.js

O Painel do Dia começou como uma interface simples e terminou como um projeto pequeno, mas completo, que cresce junto com quem está aprendendo.
