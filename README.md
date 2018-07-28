# Fuel Report [![Build Status](https://travis-ci.org/electricgnome/fuelReport.svg?branch=master)](https://travis-ci.org/electricgnome/fuelReport) <a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>

This app helps customers track their vehicle fleet's internal fuel reporting, and reconciles any differences with the credit card company's weekly statement.

## Technologies Used

built on Node/express, PSQL/Sequelize ORM, and materialize CSS.

## Development Setup

to get this app running in a local environment:

```sh
npm init
sequelize db:create
sequelize db:migrate
npm app.js
```

Then visit: `localhost:8800/register`
