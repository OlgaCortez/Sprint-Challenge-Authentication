const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require("express-session");
const KnexSessionStorage = require("connect-session-knex")(session);

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const knexConnection = require('../database/dbConfig');

const server = express();

const sessionConfiguration = {
    name: "Beyonce", 
    secret: process.env.COOKIE_SECRET || "Safe House",
    cookie: {
      maxAge: 1000 * 60 * 60, 
      secure: process.env.NODE_ENV === "development" ? false : true, 
      httpOnly: true 
    },
    resave: false, 
    saveUninitialized: true, 
    store: new KnexSessionStorage({
      knex: knexConnection,
      clearInterval: 1000 * 60 * 10, 
      tablename: "user_sessions",
      sidfieldname: "id",
      createtable: true
    })
  };

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfiguration));

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get("/", (req, res) => {
    res.json({ api: "up", session: req.session });
  });

module.exports = server;
