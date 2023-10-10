## Agendamento por email usando o google calendar

<img src="src/assets/home.png"/>



## Como executar a aplicação
Instalar as dependencias<br>
`npm install`<br><br>
Rodar a aplicação<br>
`npm run dev`

!!Necessário ter o Docker instalado no pc e criar um banco de dados no mesmo e deixa-lo em execução(seguindo os comandos abaixo de como utilizar o Docker)!! 

<br>

### Tecnologias utilizadas
- ReactJS
- Typescript
- Prisma
- Zod
- Docker
- MySQL



<p>Desenvolvido durante o programa de especialização, Ignite da Rocketseat</p>

<br>
<br>
<br>
<br>
<br>
<br>




Comando de instalação da interface de linha de comando do Prisma: <br>
` npm i prisma -D `

Comando de instalação da dependência que iremos utilizar na nossa aplicação:<br>
` npm i @prisma/client `

Comando para iniciar o Prisma:<br>
` npx prisma init --datasource-provider SQLite `

Comando pra rodar a migration:<br>
` npx prisma migrate dev `

Comando pra rodar o Prisma Studio:<br>
` npx prisma studio `

Biblioteca para melhorar a perfomace da aplicação, salvando os dados em cache <br>
` npm i @tanstack/react-query `


Comando utilizado para rodar o Docker: <br>
` docker run --name mysql -e MYSQL_ROOT_PASSWORD=docker -p 3306:3306 mysql:latest `


Comando utilizado para iniciar o container:
` docker start mysql ` <br>

Comando utilizado para parar o container: <br>
` docker stop mysql `