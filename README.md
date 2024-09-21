# market-challenge

buenas! pasos a seguir para que funcione el repo:

- npm i

recordar agregar un archivo .env con las siguientes variables:

* DB_USER=your_user
* DB_HOST=localhost
* DB_NAME=your_db
* DB_PASSWORD=your_pass
* DB_PORT=5432

correr migraciones:

- npm run migrate:up

 para correr los test:

- npm run test

 por ultimo para probar desde curl/postman/etc

- npm run start

listo! 
