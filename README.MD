To use the app locally, you need to have a postgresql database installed and configured as follows;

Database Name : devmeet
Database user : postgres
Database host : localhost
database port : 5431
database password : mysecretpassword

Next, create a .env file which will hold the following config

DB_USER=postgres
DB_HOST=localhost
DB_NAME=devmeet
DB_PASSWORD=mysecretpassword
DB_PORT=5431
JWT_SECRET= jwtsecretpassword

