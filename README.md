# gofinances

> Project developed for sending .csv files and inserting the collected data into the database.

<p align="center">
  <img width="460" height="300" src="https://github.com/charleseduardome/gofinances/blob/master/preview.gif">
</p>

## Used

- ReactJs
- Typescript
- Axios
- Styled-components
- typeorm
- multer
- csv-parse

## Getting started

### Backend

Clone this repository

Create the "gofinances" database

Open the backend folder and run the yarn command to install all dependencies.

Configure the ormconfig.json file with the access data of your created bank.

Run migrations: yarn typeorm migration: run

Check if the boards were created.

Run: yarn dev: server to start the server in development mode.

### web

Open the web folder and execute the command "yarn" to install all dependencies.

Run yarn start

In the root folder there is a file with the correct format for sending.
