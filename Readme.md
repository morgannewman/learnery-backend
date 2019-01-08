# Learnery

Learnery shows students computer science flashcards using a spaced repetition algorithm!

[Click here to see a live version!](https://learnery.netlify.com/)


![example](https://i.imgur.com/rjJ367C.png)

This backend exposes a RESTful API. 

It supports:

* User registration and authentication

* Fetching a user's next flashcards

* Flashcard statistics tracking

This app is deployed using a CI/CD setup with Travis-CI and Heroku.

## Technologies

This backend is built using JavaScript, Node, and Express.

- [PassportJS](http://www.passportjs.org/) - User authentication

- [PostgreSQL](https://www.postgresql.org/) - Relational database

- [Sequelize](http://docs.sequelizejs.com/) -
  ORM used to query database
