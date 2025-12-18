## Sistema de Controle de Gastos Residenciais

Sistema desenvolvido para controle de gastos residenciais, permitindo o cadastro de pessoas, categorias e transações financeiras, além da geração de relatórios consolidados, conforme especificação do teste técnico.

Este projeto foi desenvolvido como parte de um **teste técnico para a vaga de Desenvolvedor Full Stack Júnior**, seguindo as regras de negócio descritas no enunciado.

---

## 🎯 Objetivo do Projeto

O objetivo deste projeto foi implementar o sistema solicitado no teste técnico de forma clara e organizada, garantindo o correto funcionamento das regras de negócio exigidas e a separação básica de responsabilidades entre as partes da aplicação.

---

## 🧱 Arquitetura do Projeto

O sistema foi dividido em dois projetos independentes:

- **Back-end:** ASP.NET Core Web API (.NET 8)
- **Front-end:** React com TypeScript

A separação entre back-end e front-end foi adotada para facilitar a organização do código e o desenvolvimento da aplicação.

O foco principal do teste está no **back-end**, enquanto o front-end foi desenvolvido para consumo e visualização dos dados da API.

---

## 🔧 Tecnologias Utilizadas

### Back-end

- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- SQLite
- Swagger
- Injeção de Dependência

### Front-end

- React
- TypeScript
- Vite
- Axios

---

## 📦 Estrutura do Back-end

```
ControleGastos.Api/
├── Controllers/    // Endpoints HTTP
├── Services/       // Regras de negócio
├── Models/         // Entidades do domínio
│   └── Enums/      // Enums do domínio
├── DTOs/           // Objetos de retorno dos relatórios
├── Data/           // DbContext e persistência
├── Program.cs
└── appsettings.json
```

---

## 📦 Estrutura do Front-end

```
controle-gastos-web/
├── src/
│   ├── components/   // Componentes reutilizáveis
│   ├── pages/        // Páginas da aplicação
│   ├── api/          // Comunicação com a API
│   └── App.tsx
└── package.json
```

---

## 📋 Regras de Negócio Implementadas

- Cadastro de pessoas, categorias e transações
- Exclusão em cascata de transações ao remover pessoa
- Validação de valores positivos
- Restrição de receitas para menores de idade
- Compatibilidade entre tipo de transação e categoria
- Relatórios por pessoa (obrigatório) e categoria (opcional)

As regras de negócio foram implementadas na camada de **Services**, mantendo os Controllers responsáveis apenas pela orquestração HTTP.

---

## 🔗 Principais Endpoints da API

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

## 🧪 Testes Unitários

Testes implementados com **xUnit** e **EF Core InMemory**, focados nas regras de negócio:

- Validação de idade
- Validação de categoria x tipo
- Exclusão em cascata

---

## 💾 Persistência de Dados

Persistência com **SQLite**, utilizando migrations do Entity Framework Core.

---

## ▶️ Como Executar

### Back-end

```bash
cd backend/ControleGastos.Api
dotnet ef database update
dotnet run
```

Swagger:

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

## 🧠 Decisões Técnicas

- SQLite por simplicidade
- EF Core para acesso a dados
- Enums para padronização
- Services centralizando regras

---

## 📝 Observações Finais

Projeto desenvolvido com foco em clareza, organização e aderência ao escopo do teste técnico.
