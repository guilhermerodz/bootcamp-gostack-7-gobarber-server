<h1>
  GoBarber Server
</h1>

<p align="left">
  <a href="https://twitter.com/intent/user?screen_name=guilherme_rodz" target="_blank">
    <img
      src="https://img.shields.io/twitter/follow/guilherme_rodz?label=Follow%20Guilherme%20Rodz&style=social"
      alt="Follow @guilherme_rodz"
    />
  </a>
</p>

Back-end made with Express.js at [Rocketseat GoStack Bootcamp](https://www.rocketseat.com.br/bootcamp).

## Features

This back-end features the latest tools and practices in web development!

- 💹 **Express** — JavaScript back-end Framework
- 🐋 **Docker** — Containers
- ♻️ **Bee Queue** — Task queue for jobs (uses Redis)
- 💌 **Nodemailer** - E-mails
- 🖼️ **Handlebars** - View template (used for e-mails)
- 💖 **PostgreSQL** — For geneeral data (except notifications and jobs)
- 💖 **MongoDB** — For notifications
- 💖 **Redis** — For jobs

I've used other libraries too, like **multer** for file uploads; **youch** and **sentry** for errors; **jsonwebtoken** and **bcrypt** for authentication.

## Getting started

First you need to have `node` or `yarn` installed on your machine.  
You'll also need `docker compose`.  
Then, you can clone this repository and run the following commands inside the project folder:

1. `docker-compose up`;

_Obs: don't forget to create the `.env` (please duplicate `.env.example`).
