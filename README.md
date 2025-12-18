# Sistema de Controle de Gastos Residenciais

Sistema desenvolvido para controle de gastos residenciais, permitindo o cadastro de pessoas, categorias e transações financeiras, além da geração de relatórios, conforme solicitado no teste técnico.

Este projeto foi desenvolvido como parte de um **teste técnico para a vaga de Desenvolvedor Full Stack Júnior**.

---

## Objetivo

O objetivo foi implementar o sistema proposto no teste técnico, focando no correto funcionamento das regras de negócio e na organização do código.

---

## Arquitetura

O projeto foi separado em dois módulos:

- **Back-end:** ASP.NET Core Web API (.NET 8)
- **Front-end:** React com TypeScript

O foco principal do teste está no back-end.  
O front-end foi desenvolvido apenas para consumo da API.

---

## Tecnologias Utilizadas

### Back-end

- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Swagger

### Front-end

- React
- TypeScript
- Vite
- Axios

---

## Estrutura do Back-end

```
ControleGastos.Api/
├── Controllers   // Endpoints da API
├── Services      // Regras de negócio
├── Models        // Entidades
│   └── Enums
├── DTOs          // Retorno dos relatórios
├── Data          // DbContext e configurações do banco
├── Program.cs
└── appsettings.json
```

---

## Regras de Negócio Implementadas

- Cadastro de pessoas, categorias e transações
- Remoção de transações ao excluir uma pessoa
- Validação de valores positivos para transações
- Pessoas menores de idade não podem registrar receitas
- Categoria deve ser compatível com o tipo da transação
- Relatórios por pessoa e por categoria

As regras foram implementadas na camada de **Services**, mantendo os controllers responsáveis apenas pelo recebimento das requisições.

---

## Endpoints Principais

- `GET /api/pessoas`
- `POST /api/pessoas`
- `DELETE /api/pessoas/{id}`

- `GET /api/categorias`
- `POST /api/categorias`

- `GET /api/transacoes`
- `POST /api/transacoes`

- `GET /api/relatorios/pessoas`
- `GET /api/relatorios/categorias`

---

## Testes

Foram implementados testes unitários com **xUnit**, focando nas regras de negócio mais importantes, como:

- Exclusão em cascata de transações
- Validação de idade para receitas
- Validação de categoria x tipo de transação

---

## Persistência

Os dados são persistidos em **SQLite**, utilizando migrations do Entity Framework Core.

---

## Como Executar

### Back-end

```bash
cd backend/ControleGastos.Api
dotnet ef database update
dotnet run
```

Swagger disponível em:

```
http://localhost:5130/swagger
```

### Front-end (opcional)

```bash
cd frontend/controle-gastos-web
npm install
npm run dev
```

---

## Observações Finais

Projeto desenvolvido com foco em simplicidade, organização e cumprimento do escopo solicitado no teste técnico.

- Foi adicionado um middleware simples para tratamento de erros de regra de negócio.
