reset_db () {
    npx dotenv sequelize db:seed:undo:all
    npx dotenv sequelize db:migrate:undo:all
    npx dotenv sequelize db:drop
    npx dotenv sequelize db:create
    npx dotenv sequelize db:migrate
    npx dotenv sequelize db:seed:all
}

if [ $1 == 'seed' ]; then
    npx dotenv sequelize db:seed:undo:all
    npx dotenv sequelize db:seed:all
elif [ $1 == 'migrate' ]; then
    npx dotenv sequelize db:seed:undo:all
    npx dotenv sequelize db:migrate:undo:all
    npx dotenv sequelize db:migrate
    npx dotenv sequelize db:seed:all
elif [ $1 == 'clear' ]; then
    clear
    npm start
elif [ $1 == 'reset' ]; then
    reset_db
elif [ $1 == 'restart' ]; then
    reset_db
    clear
    npm start
else
    echo "Unknown arg given. $1 is invalid."
fi
