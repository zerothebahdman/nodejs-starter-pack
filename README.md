# Refiners API Documentation

A highly scalable and a focus on performance and best practices boilerplate code for Nodejs and TypeScript based web applications.

Start a new application in seconds!

---

## Documentation

[Documentation on postman](https://documenter.getpostman.com/view/17791415/2s83zgvQad)

## Features

- Quick scaffolding
- TypeScript
  - The best way to write modern applications. Code is easier to understand. It is now way more difficult to write invalid code as was the case in dynamically typed languages
- Authentication out of the box

## Requirements

1. Node 16
2. NPM
3. Docker
4. MySQL || PostgreSQL

## Project Installation

1. `cd` into whatever directory you want work from.
2. Run `git clone https://github.com/codewithdiv/nodejs-boilerplate.git` then `cd` into the repo.
3. After clonning the app create a new file `.env` copy the environment variables from `.env.example` and paste it inside the `.env` file. Attach the necessary environment variables
4. Run `npm install`

## Project Setup

1. Create a database on your machine.

- If you are using **MySQL**
  - Navigate into `src/database/prisma/schema.prisma` verify that inside the datasource db object provider is set to mysql i.e `provider = "mysql"`

```bash
Your database url in the `.env` file should as follows

DATABASE_URL="mysql://johndoe:randompassword@localhost:3306/mydb?schema=public"

mydb : The name of the databse you created on your machine
johndoe : The username of the database
randompassword : The password of the database
```

- If you are using **PostgreSQL**
  - Navigate into `src/database/prisma/schema.prisma` verify that inside the datasource db object provider is set to mysql i.e `provider = "postgresql"`

````bash
Your database url in the `.env` file should as follows

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

mydb : The name of the databse you created on your machine
johndoe : The username of the database
randompassword : The password of the database
```

- To migrate the database tables from prisma use `npx prisma migrate dev --name init --schema=./src/database/prisma/schema.prisma`
- To view your database on your browser use prisma studio `npx prisma studio --schema=./src/database/prisma/schema.prisma`

 ---

**Note**
If you have discovered a bug or have a feature suggestion, feel free to create an issue on [Github](https://github.com/codewithdiv/nodejs-boilerplate/issues).

## Making contributions

[Checkout the contributions guidelines](https://github.com/codewithdiv/nodejs-boilerplate/blob/main/CONTRIBUTION.md)

Dont forget to star or fork this if you like it

### License

[![license](https://img.shields.io/badge/license-GPL-4dc71f.svg)](https://github.com/codewithdiv/nodejs-boilerplate/blob/main/LICENCE)

This project is licensed under the terms of the [GPL license](/LICENSE).
````
