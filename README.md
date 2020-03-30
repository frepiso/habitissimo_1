# Frontend & Backend challenge Habitissimo

**VanillaJS - Single Page Application**
The application is a Budget Request Form.
As a peculiarity, it maintains the persistence of navigation and the state of the budget through a Storage that is also stored on the client side.
A class has been created that allows multi-inheritance to make it easier to read and scalability.

In the validations section, two types of validations are executed. Validations on the client side, to validate the fields in the different steps that make up the process, not allowing advance in case of error, but it's possible to the return to a previous step.
Server-side validations are done this way per challenge requirements.


**ExpressJS - RestAPI**
RestAPI to serve the Budget Request Form.
Some of the request of the challenge have been adapted to use with  Client App.
Instead of use 'categories' when was required in the document I've used 'subcategories, and other menor changes.

The rules of the challenge are handled throw middlewares to maintain a more readable and scalable code.

####  Getting started

> With Docker-compose

1. Clone this repository

2. Run docker compose to install and deploy
```
docker-compose up
```
3. To down the project:
```
docker-compose down --rmi all
```
```
forntend part is running on http://localhost:9000
backend part is running on http://localhost:3000
```

#### Usage

```
forntend part is running on http://localhost:9000
backend part is running on http://localhost:3000
```

#### Contributors

Fernando Repiso <repiso.fernando@gmail.com>
