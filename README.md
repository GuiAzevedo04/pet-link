# Descricao do Problema

Nosso petshop estava enfrentando dificuldades com o agendamento de horários para
banho e tosa. Com o uso de uma agenda física, frequentemente cometíamos erros, 
como marcar dois clientes no mesmo horário ou deixar de atender clientes por 
acreditar que não havia horários disponíveis, quando na verdade havia

# Descrição da Solução

Será construído um software capaz de prover CRUDs para clientes,
serviços de banho e tosa, horários de agendamento, produtos e funcionários. O sistema permitirá
que tanto os funcionários quanto os clientes realizem os agendamentos.
Os clientes poderão acessar o site e marcar seus próprios horários
de banho e tosa de forma simples e rápida, enquanto os funcionários poderão
gerenciar esses agendamentos e realizar ajustes quando necessário. O sistema
terá autorização e autenticação, garantindo
que cada funcionário tenha acesso apenas às funcionalidades de acordo
com sua permissão. Os dados referentes a login e senha estarão
criptografados no banco de dados, e toda a comunicação entre
o frontend e backend será criptografada,garantindo a segurança das informações.

# 💻 Tecnologias Utilizadas

### Front-End

Node - v20.5.1 ou 20.X

React - v18.3.1

Vite - v5.1.0

Material UI, Joy UI e Base UI Components

### Back-End
Spring Boot Java - v3.3.1


PostgreSQL - v17.2

# 📁 Estrutura de Pastas

```
.
├── Docs/       (Documentaçãoe e especificações do projeto)
│   ├── Padrões Adotados/ (Padrões que foram adotados no desenvolvimento)
│   └── Testes/    (Padronização dos testes)
├── back-end/               (Back-end do projeto)
│   └── src/
│       └── main/
│           ├── java/com/
│           │   ├── controller/ (Pasta com controllers e rotas)
│           │   ├── data/
│           │   │   ├── entity  (Entidades da aplicação)
│           │   │   └── dto     (Pasta com Data transfer objects)
│           │   ├── infra/      (Pasta que envolve arquivos reponsaveis pela Autenticação)
│           │   ├── repository/ (Pasta com repositories da aplicação)
│           │   ├── service/    (Pasta com services da aplicação)
│           │   └── PetlinkApplication.java (Arquivo responsável por inicializar aplicação)
│           ├── resources/
│           │   └── application.properties  (Arquivo de configuração)
│           └── test/
└── front-end/              (Frond-end do projeto)
    └── src/
        ├── assets/         (Contém imagens utilizadas)
        ├── components/     (Componentes utilizados em páginas)
        ├── pages/          (Páginas da aplicação)
        ├── App.jsx
        └── App.css
```

# 📕 Regras e Padrões de Uso do Git

Os commits devem utilizar um padrão objetivo e direto, deixando a linha do tempo do projeto mais estruturada e de fácil entendimento.

## Commits

- Padrão utilizado:
  <Mudança feita>...<O que sofreu alteração>

  Exemplo : Atualizando ScheduleController Cadastrar agendamento

## Branches
- **`main`**: Branch principal do projeto
- **`back-end`**: Branch dedicada ao desenvolvimento de funcionalidades relacionadas ao back-end.  
- **`front-end`**: Branch dedicada ao desenvolvimento de funcionalidades relacionadas ao front-end.  

## Criação de Branches  
- Para novas funcionalidades ou correções, crie branches a partir das branches `back-end` ou `front-end`
- Utilize o padrão de nomenclatura separando palavras por hífen. Exemplos:  
  - `back-end/User-Auth`  
  - `front-end/User-Page`

## 3. Merge com a Branch `main`  
- O merge das branches `back-end` e `front-end` com a branch `main` só deve ser realizado após:  
  - Conclusão de testes com todas funcionalidades 
  - Verificação da corretude das funcionalidades desenvolvidas.  
- Evite merges diretos na `main`. Utilize pull requests

