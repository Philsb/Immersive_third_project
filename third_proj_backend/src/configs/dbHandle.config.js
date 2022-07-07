var pg = require('pg');

const DB_HOST = process.env.DB_HOST || "postgres://user:password@192.168.0.19:5432/";
const DB_NAME = process.env.DB_NAME || "third_proj_db";
const dbClient = new pg.Client(DB_HOST + DB_NAME);
dbClient.connect();
module.exports = dbClient;