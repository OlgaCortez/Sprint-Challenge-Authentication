const knex = require('knex');

const knexConfig = require('../knexfile.js');

const development = process.env.NODE_ENV || 'development';

module.exports = knex(knexConfig.development);
