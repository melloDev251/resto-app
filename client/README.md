## Install Packages

yarn add ou npm install

## Database file

import database file resto.sql

## Launch of the back-end and front-end server

npm start

## About the environnement variable

create .env file in client folder
copy this : REACT_APP_API_URL=http://localhost:5000/api/v1/restaurants

create folder config/.env file in server folder
copy this : PORT=5000
            PGUSER=postgres
            PGHOST=localhost
            PGPASSWORD=root
            PGDATABASE=resto
            PGPORT=5432
            CLIENT_URL=http://localhost:3000
