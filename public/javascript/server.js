var express = require('express');
var app = express();
var pg = require("pg"); // This is the postgres database connection module.
const connectionString = "postgres://ta_user:ta_pass@localhost:5432/familyhistory";