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