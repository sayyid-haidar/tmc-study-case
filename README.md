# Tirta Medical Centre Case Study

## Run with docker

default API-KEY is NIATIKHLA5, edit API-KEY on docker-compose.yaml

```cmd
docker compose up
```

## Run with local environment

before run on local, preparation .env file

``` env
MYSQL_HOST=
MYSQL_PORT=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
API_KEY=
```

execuite command

```cmd
npm install

npm run migration:run

npm run start
```
