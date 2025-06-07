# To-do-List-Testing

## 1. Integrantes

- Victor Yuji Yano
- Victor Kenji Pawlowski Abeki

---

## 2. Explicação do Sistema

O **To-do-List-Testing** é um sistema web para gerenciamento de tarefas (lembretes/memos). O usuário pode adicionar, visualizar, atualizar o status e remover lembretes, cada um com título e data de criação. O sistema agrupa os lembretes por data, permitindo fácil organização e acompanhamento das tarefas pendentes e concluídas. 

O objetivo principal do projeto é aprofundar e demonstrar práticas de desenvolvimento orientadas a testes, estudadas ao longo das aulas, utilizando das ferramentas de testes para acompanhar o desenvolvimento do sistema e suas funcionalidades implementadas.

---

## 3. Tecnologias Utilizadas

- **Frontend**
  - **React**: Biblioteca JavaScript para construção da interface de usuário.
  - **Vite**: Ferramenta de build e desenvolvimento rápido para projetos frontend.
  - **Axios**: Cliente HTTP para comunicação com a API backend.
  - **Sass**: Pré-processador CSS para estilização dos componentes.

- **Testes**
  - **Vitest**: Framework de testes rápido e moderno, integrado ao Vite.
  - **Testing Library (React e User Event)**: Utilitários para testes de componentes React, focando em interações reais do usuário.
  - **JSDOM**: Simulação de ambiente DOM para execução dos testes em Node.js.

Essas tecnologias foram escolhidas para garantir um desenvolvimento ágil, moderno e com alta cobertura de testes automatizados, promovendo a confiabilidade e a manutenção do sistema.

## 4. Execução do Sistema

Para executar o sistema localmente, siga os passos abaixo:

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/To-do-List-Testing.git
    cd To-do-List-Testing
    ```

2. **Front End:**
    ```bash
    cd frontend

    # instalar dependencias
    npm install

    # executar
    npm run dev
    ```

3. **Back End:**
    ```bash
    cd backend

    # instalar dependencias
    npm install

    # executar
    npm run dev
    ```
    O sistema estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal).

4. **Executando os testes:**
    ```bash
    ## FRONT END (após instalar dependências)
    cd frontend
    npm run test

    # ou, alternativamente, com cobertura:
    npm run coverage
    ```
    ```bash
    ## BACKEND
    cd backend
    npm run test
    ```
    Os testes automatizados serão executados e o resultado será exibido no terminal e, ao executar o coverage, será gerada uma pasta com os dados gráficos de cobertura dos testes.

> **Observação:** Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

---