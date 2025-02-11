<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Talentgrowth Purple Box Technical Test Repository, built with [Nest](https://github.com/nestjs/nest)

The Backend API Technical Test I made a replication of a blog post, that will be bound by `user_id`, where every user can post a blog which consists of `{ title, content, visibility }` and where `visibility` can be either `PUBLIC` or `PRIVATE`. 

It also has an admin role where it can see users's posts, be it `PUBLIC` or `PRIVATE`, and can delete a user's post regardless of the ownership.

It is also worth noting that it is recommended for you to install Node.js v18.x.x or later and [Yarn](https://yarnpkg.com/getting-started/install) package manager to run this backend app.

You can easily install Yarn by running the following command:
```bash
$ npm install yarn -g
```

## Installation

Install the packages:

```bash
$ yarn install

# Or simply,
$ yarn
```

## Running the app

**Firstly,** make a copy of the **.env.example** file and rename it to **.env**. Change the database variables (MYSQL_*) to match the ones used in your server/local machine. 

**Secondly,** connect to the database, by running the commands below:

```bash
# Apply migrations 
$ yarn db:migrate

# Seed database (if needed)
$ yarn db:seed
```

This will apply the existing migration in the src/database/migrations folder and populate the db with the seeder data
<br>

To run the backend app, run one of the commands below depending on your needs:

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```


## API Documentation

You can access the API Documentation using the builtin Swagger module when running the app by adding the path /api/docs, for example:

```
http://localhost:3000/api/docs
```
