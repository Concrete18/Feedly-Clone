if [ $1 == 'push' ]; then
    git push heroku dev:master
elif [ $1 == 'migrate' ]; then
    heroku run npm run sequelize db:migrate
elif [ $1 == 'seed' ]; then
    heroku run npm run sequelize db:seed:all
elif [ $1 == 'setup' ]; then
    heroku run npm run sequelize db:migrate
    heroku run npm run sequelize db:seed:all
elif [ $1 == 'reset' ]; then
    heroku run npm run sequelize db:seed:undo:all
    heroku run npm run sequelize db:migrate:undo:all
    heroku run npm run sequelize db:migrate
    heroku run npm run sequelize db:seed:all
elif [ $1 == 'pushseed' ]; then
    git push heroku dev:master
    heroku run npm run sequelize db:seed:undo:all
    heroku run npm run sequelize db:migrate:undo:all
    heroku run npm run sequelize db:migrate
    heroku run npm run sequelize db:seed:all
else
    echo "Unknown arg given. $1 is invalid."
fi
