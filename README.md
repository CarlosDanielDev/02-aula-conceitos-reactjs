# Dia 04 Front-End com Reactjs (Guia Básico de Reactjs)

Data: Apr 11, 2020
Hora de início: 11:37
Hora de término: 19:46
Status: Finalizado

Aqui meu todo list

## Aulas

- [x] Conceitos ReactJS
- [x] Configurando Babel
- [x] Configurando Webpack
- [x] Componentização
- [x] Propriedades
- [x] Estado e Imutabilidade
- [x] Importando CSS e Imagens
- [x] Listando Projetos da API
- [x] Cadastrando Projetos

# Conceitos ReactJS

## O que é React ?

- Biblioteca para construção de interfaces;
  - Tudo o que o usuário enxerga fica dentro do React.
- Utilizando para construção de Single-Page-Applications(SPA);
  - Conceito de SPA, ou seja sem Reload da página.
- Podemos chamar de framework ?
  - Sim, é um conjunto de ferramentas que facilita a construção das interfaces
- Tudo fica dentro do Javascript;
  - css
  - assets
- React / ReactJS / React Native;
  - React: é a biblioteca de construção de interfaces
  - ReactJS: é o comportamento da biblioteca no Browser.
  - React Native: é uma soma do React com uma biblioteca que lida co componentes nativos (Android/IOS).

Example Code:

```jsx
import React from "react";

import "./button.css"; // importando o css dentro do JS
import icon from "./button.png"; // imporando imagens dentro do JS

function Button() {
  return (
    <button>
      <img src={icon} />
    </button>
  );
}
```

## Vantagens

- Organização do código;
  - Componentização;
    - Cria-se um componente quando eu consigo isolar a lógica de um componente que não interfira no funcionamento da aplicação.
- Divisão de responsabilidades;
  - Back-end: Regra de negócio
  - Front-end: Interface;
- Uma API, múltiplos clientes;
- Programação declarativa;
  - Falamos qual o resultado que esperamos, e ela se comporta de acordo com o estado.

## JSX

- Escrever HTML dentro do JavaScript
- Com o React podemos criar nossos próprios elementos

## Imperativo vs Declarativo

```js
// Imperativo
const notificacoes = 0;

function montaBadge(num) {
  if (notificacoes === 0 && num > 0) {
    // adiciona badge
    // container.appendChild(badge)
  }
  if (notificacoes !== 0 && num > 0) {
    // apenas muda o número
    // badge.innerHTML = num ...
  }
  if (notificacoes !== 0 && num === 0) {
    // remove badge
    // container.removeChild(badge)
  }
}
```

```js
// Declarativa
function Badge({ num }) {
  return (
    <div id="container">
      {num > 0 && <div id="badge">{num}</div>}
      <span class="icon"></span>
    </div>
  );
}
```

## Babel / Webpack

- O browser não entende todo esse código;
- O `babel` converte o código JS de uma forma que o Browser entenda
- o `webpack` possui várias funções:
  - Criação do `bundle`, arquivo com todo o código da aplicação
  - Ensinar ao JavaScript como interpretar arquivos CSS, imagens e etc;
  - Live Reload com o `webpack` `dev server`

---

# Configurando Babel

Crie uma pasta e inicialize com o comando abaixo:

```bash
    yarn init -y
```

Comando para criar o arquivo `package.json`.

## Criar estrutura

- Criar pasta `src`
- Criar pasta `public`
- Instalando as seguintes dependências

```bash
        yarn add react react-dom
```

## Configurações

Na pasta `public` crie um arquivo `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ReactJS</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

- Babel: Converter (transpilar) o código do React para um código que o Browser entenda.
- Webpack: Pra cada tipo de arquivo (.js, .css, .png) eu vou converter de uma menira diferente.
- Loaders: babel-loader, css-loader, image-loader

## Babel

Para instalar as dependências de configuração execute o comando abaixo:

```bash
    yarn add @babel/core @babel/preset-env @babel/preset-react @babel/cli babel-loader webpack webpack-cli
```

Crie um arquivo com o nome `babel.config.js`, e cole o seguinte conteúdo neste arquivo.

```js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
};
```

- `@babel/preset-env`
  - Ele é responsável por detectar o ambiente que essa aplicação será executada, e basicamente converte somente as funções que o ambiente não entende para uma forma que ele consiga interpretar.
- `@babel/preset-react`, ele é basicamente responsável por compreender o `HTML` escrito dentro do `javascript`.

---

# Configurando Webpack

Crie um arquivo na raiz do projeto com o nome `webpack.config.js`.

```js
const path = reqire("path");
module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
```

> O webpack é responsável por identificar o arquivo qu está sendo importado e ativar um loader.

Adicione a seguinte dependência com o dependência de Desenvolvimento:

```bash
    yarn add webpack-dev-server -D
```

> JSX: HTML dentro do Javascript (Javascript XML);

Crie 2 arquivos dentro da pasta `src`, um com o nome `index.js` e o outro `App.js`.

```bash
    touch src/index.js src/App.js
```

Para inicializar a aplicação execute o seguinte comando:

```bash
    yarn webpack-dev-server --mode development
```

---

# Componentização

index.js

```jsx
import React from "react";
import { render } from "react-dom";
import App from "./App";
render(<App />, document.getElementById("app"));
```

App.js

```jsx
import React from "react";

function App() {
  return <h1>Hello World</h1>;
}

export default App;
```

Agora, crie uma pasta dentro da `src` com o nome `components`, dentro dessa pasta crie um arquivo com o nome `Header.js`.

```bash
    mkdir src/components && touch src/components/Header.js
```

Coloque este Conteúdo dentro do Arquivo `Header.js`, e modifique o arquivo `App.js`.

```jsx
// Header.js
import React from "react";

export default function Header() {
  return (
    <header>
      <h1>ReactJS</h1>
    </header>
  );
}
```

```jsx
// App.js
import React from "react";

import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Header />
    </>
  );
}

export default App;
```

---

# Propriedades

A propriedade é qualquer informação que podemos passar de um componente pai pra um componente filho.

Ex: Edite os seguintes arquivos;

```jsx
// App.js
import React from "react";

import Header from "./components/Header";

function App() {
  return (
    <>
      <Header title="Home" />
      <Header title="Profile" />
    </>
  );
}

export default App;
```

```jsx
// Header.js
import React from "react";

export default function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}
```

### Child

Modifique os seguintes arquivos e execute a aplicação para ver as mudanças:

```jsx
// App.js
import React from "react";

import Header from "./components/Header";

function App() {
  return (
    <>
      <Header title="Home">
        <ul>
          <li>Homepage</li>
          <li>Profile</li>
        </ul>
      </Header>
      <Header title="Profile">
        <ul>
          <li>Homepage</li>
          <li>Profile</li>
          <li>Login</li>
        </ul>
      </Header>
    </>
  );
}

export default App;
```

```jsx
// Header.js
import React from "react";

export default function Header({ children, title }) {
  return (
    <header>
      <h1>{title}</h1>
      {children}
    </header>
  );
}
```

---

# Estado e Imutabilidade

Edite o código do arquivo `App.js`, deixe-o dessa forma:

```jsx
// App.js
import React, { useState } from "react";

import Header from "./components/Header";

function App() {
  const [projects, setProjects] = useState([
    "Web Development with React",
    "Mobile development with React Native",
  ]);

  function handleAddProject() {
    setProjects([
      ...projects,
      `Back-end development with Nodejs - ${Date.now().toFixed(2)}`,
    ]);
  }
  return (
    <>
      <Header title="Home">
        <ul>
          {projects.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
        <button type="button" onClick={handleAddProject}>
          Adicionar projeto
        </button>
      </Header>
    </>
  );
}

export default App;
```

---

# Importando CSS e Imagens

Vamos começar instalando as seguintes dependências:

    yarn add style-loader css-loader

Atualize as configurações do arquivo `webpack.config.js`, deixe-o dessa forma:

```js
const path = require("path");
module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
};
```

Agora nosso código Esta habilitado pra importar arquivos com a extensão `.css` dentro dos arquivos Javascript.

Crie um arquivo chamado `App.css` dentro da pasta `src`:

```bash
    touch src/App.css
```

Dentro desse arquivo aplique a seguinte estilização e importe ele dentro do arquivo `App.js`

```css
/* App.css */
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  background: #f5f5f5;
  font-size: 14px sans-serif;
  color: #333;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
```

```jsx
    // App.js
    import React, { useState } from "react";
    import "./App.css"; // Importando aquivo css
    import Header from "./components/Header";

    ...
```

Agora vamos fazer com que seja possível a importação de imagens dentro javascript, instale a seguinte dependência:

```bash
    yarn add file-loader
```

Agora modifique o arquivo `webpack-config.js`, e execute o servidor novamente:

```js
const path = require("path");
module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
};
```

Crie uma pasta chamada `assets`, e coloque uma imagem dentro dela, e agora modifique o arquivo `App.js` dessa maneira:

```jsx
// App.js
import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import background from "./assets/background.jpeg";

function App() {
  const [projects, setProjects] = useState([
    "Web Development with React",
    "Mobile development with React Native",
  ]);

  function handleAddProject() {
    setProjects([
      ...projects,
      `Back-end development with Nodejs - ${Date.now().toFixed(2)}`,
    ]);
  }
  return (
    <>
      <Header title="Home">
        <img width={300} src={background} alt="image" />
        <ul>
          {projects.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
        <button type="button" onClick={handleAddProject}>
          Adicionar projeto
        </button>
      </Header>
    </>
  );
}

export default App;
```

### Hooks

- `useState()`
  - Retorna 1 array com 2 posições
    1. Variável com o valor atual
    2. Função pra atualizar o valor atual;

---

# Listando Projetos da API

Incie o back-end da última aula do módulo anterior, e instale a seguinte biblioteca no projeto de front-end que estamos configurando com React:

```bash
    yarn add axios
```

Agora crie uma pasta chamada `services` dentro da pasta `src`, e dentro da pasta `services`, crie um arquivo chamado `api.js`.

```bash
    mkdir src/services && touch ser/services/api.js
```

Edite o arquivo `api.js`, e coloque as seguintes configurações:

```jsx
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default api;
```

Show, então agora precisamos fazer algumas alterações no arquivo `App.js`.

```jsx
// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import api from "./services/api";
import Header from "./components/Header";

function App() {
  const [projects, setProjects] = useState([
    "Web Development with React",
    "Mobile development with React Native",
  ]);

  function handleAddProject() {
    setProjects([
      ...projects,
      `Back-end development with Nodejs - ${Date.now().toFixed(2)}`,
    ]);
  }
  useEffect(() => {
    api.get("/projects").then((result) => setProjects(result.data));
  }, []);
  return (
    <>
      <Header title="Home">
        <ul>
          {projects.map((project) => (
            <li key={project.id}>{project.title}</li>
          ))}
        </ul>
        <button type="button" onClick={handleAddProject}>
          Adicionar projeto
        </button>
      </Header>
    </>
  );
}

export default App;
```

---

# Cadastrando Projetos

Adicione o seguinte plugin do babel para lidar com o `async/await`.

```bash
    yarn add @babel/plugin-transform-runtime
```

E modifique o arquivo de configuração do babel:

```js
// babel.config.js
module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: ["@babel/plugin-transform-runtime"],
};
```

Agora modifique o arquivo `App.js`, para adicionar novos repositórios utilizando a API:

```jsx
// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import api from "./services/api";
import Header from "./components/Header";

function App() {
  const [projects, setProjects] = useState([]);

  async function handleAddProject() {
    const response = await api.post("/projects", {
      title: `Back-end development with Nodejs - ${Date.now().toFixed(2)}`,
      owner: "Carlos Daniel",
    });
    const project = response.data;
    setProjects([...projects, project]);
  }
  useEffect(() => {
    api.get("/projects").then((result) => setProjects(result.data));
  }, []);
  return (
    <>
      <Header title="Home">
        <ul>
          {projects.map((project) => (
            <li key={project.title}>{project.title}</li>
          ))}
        </ul>
        <button type="button" onClick={handleAddProject}>
          Adicionar projeto
        </button>
      </Header>
    </>
  );
}

export default App;
```

> Para facilitar a inicialização dos projetos utilize os `"scripts"` do `package.json` para automatizar os processos.

> Aqui está o [repositório](https://github.com/DanPHP7/01-aula-conceitos-nodejs) da aplicação Back-end
