# Scratch File

## PSQL commands

```psql
CREATE USER feed_dev WITH PASSWORD 'password' SUPERUSER;

CREATE DATABASE feed_db WITH OWNER feed_dev;
```

## Sequelize commands

```bash
npx sequelize model:generate --name User --attributes userName:string,email:string,hashedPassword:string

npx sequelize model:generate --name Feeds --attributes name:string,owner_id:integer

npx sequelize model:generate --name Sources --attributes feed_id:integer,name:string,url:string

npx sequelize model:generate --name Articles --attributes source_id:integer,name:string,url:string

npx sequelize model:generate --name Reads --attributes user_id:integer,article_id:integer

npx sequelize model:generate --name Saved --attributes user_id:integer,article_id:integer

npx sequelize model:generate --name Filter --attributes user_id:integer,filter_string:string

npx sequelize seed:generate --name seed_user

npx sequelize seed:generate --name seed_feeds

npx sequelize seed:generate --name seed_sources

npx sequelize seed:generate --name seed_articles
npx sequelize seed:generate --name seed_articleJoins

npx sequelize seed:generate --name seed_reads

npx sequelize seed:generate --name seed_saved

npx dotenv sequelize db:migrate

npx dotenv sequelize db:migrate:undo:all

npx dotenv sequelize db:seed:all

npx dotenv sequelize db:seed:undo:all

npx dotenv sequelize db:drop && npx dotenv sequelize db:create
```

## Combined Code for drop/migrate/seed

local reset only

```bash
npx dotenv sequelize db:drop && npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all
```

Heroku reset

```bash
npx dotenv sequelize db:seed:undo:all && npx dotenv sequelize db:migrate:undo:all && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all
```

Seed only reset

```bash
npx dotenv sequelize db:seed:undo:all && npx dotenv sequelize db:seed:all
```
