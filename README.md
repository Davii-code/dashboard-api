📊 Dashboard API

API RESTful dinâmica construída em Node.js + TypeScript + Prisma + MySQL, que retorna dados formatados para diferentes tipos de gráficos (pizza, linha e barra).

O projeto foi desenvolvido como parte de um teste técnico para demonstrar boas práticas de backend, arquitetura limpa, testes automatizados e documentação.

🚀 Tecnologias Utilizadas

Node.js — runtime JavaScript

TypeScript — tipagem estática e melhor manutenção

Express — framework minimalista para APIs REST

Prisma ORM — abstração de banco de dados (MySQL / SQLite)

Jest + Supertest — testes unitários e de integração

Swagger UI — documentação interativa

SQLite — banco de teste para integração

ESLint + Prettier — padronização de código

🧱 Estrutura do Projeto
dashboard-api/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── docs/
│   └── server.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── tests/
│   ├── unit/
│   └── integration/
├── .env
├── .env.test
├── jest.config.js
├── tsconfig.json
├── package.json
└── README.md

⚙️ Instalação e Configuração
1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/dashboard-api.git
cd dashboard-api

2️⃣ Instalar dependências
npm install

3️⃣ Configurar variáveis de ambiente

Crie o arquivo .env na raiz do projeto:

DATABASE_PROVIDER="mysql"
DATABASE_URL="mysql://root:senha@localhost:3306/dashboard_db"
PORT=3000


💡 Substitua root e senha conforme seu ambiente MySQL local.

🗃️ Banco de Dados
Criar o banco:
mysql -u root -p -e "CREATE DATABASE dashboard_db;"

Rodar as migrações:
npx prisma migrate dev --name init

Popular com dados de exemplo:
npx ts-node prisma/seed.ts

🧠 Executando o Projeto
npm run dev


Servidor rodando em:

http://localhost:3000

📊 Endpoint Principal
GET /dashboard
Parâmetros de Query:
Nome	Tipo	Obrigatório	Descrição
tipoGrafico	string	✅	Tipo do gráfico (pizza, linha, barra)
dataInicio	string (YYYY-MM-DD)	✅	Data inicial do filtro
dataFim	string (YYYY-MM-DD)	✅	Data final do filtro
Exemplo de requisição:
GET http://localhost:3000/dashboard?tipoGrafico=pizza&dataInicio=2025-01-01&dataFim=2025-10-01

Exemplo de resposta (gráfico de pizza):
{
"type": "pie",
"labels": ["Eletrônicos", "Roupas", "Alimentos"],
"data": [4200.5, 1800.3, 2300.1]
}

🧩 Documentação Swagger

O projeto inclui documentação interativa via Swagger UI.

Acesse:

http://localhost:3000/api-docs

🧪 Testes Automatizados
Testes Unitários e de Integração:
npm test

Gerar relatório de cobertura:
npm run test:coverage

Exemplo de saída:
-----------------------------|---------|----------|---------|---------
File                         | % Stmts | % Branch | % Funcs | % Lines
-----------------------------|---------|----------|---------|---------
All files                    |   93.75 |    85.71 |   100.0 |   94.44
-----------------------------|---------|----------|---------|---------


O relatório HTML é salvo em:

coverage/lcov-report/index.html

⚡ Testes com SQLite

Para não depender do MySQL durante testes, o ambiente de teste usa SQLite local.

Arquivo .env.test:

DATABASE_PROVIDER="sqlite"
DATABASE_URL="file:./test.db?connection_limit=1"


Durante os testes, um script (tests/setupTestDB.ts) cria o banco, aplica as migrações e popula dados automaticamente.

🧰 Scripts disponíveis
Comando	Descrição
npm run dev	Inicia o servidor em modo desenvolvimento
npm run build	Compila TypeScript para JavaScript
npm start	Executa o projeto compilado
npm test	Executa testes unitários e de integração
npm run test:coverage	Executa testes com relatório de cobertura
npx prisma studio	Abre o painel visual do banco de dados Prisma
npx prisma migrate dev	Cria as tabelas no banco de dados
npm run seed	Popula o banco de dados com dados de exemplo
🧑‍💻 Autor

Davi Faria Gonçalves
Backend Developer • Node.js • TypeScript • Prisma
📧 davifariagoncalves@gmail.com


🏁 Conclusão

✅ API funcional e dinâmica
✅ Testes unitários + integração + coverage
✅ Documentação Swagger completa
✅ Pronta para deployment e integração com dashboards