var mysql = require('mysql');

function Connection() {
this.pool = null;

this.init = function() {
  this.pool = mysql.createPool({
    connectionLimit: 10,
    host: 'den1.mysql2.gear.host',
    user: 'blockchainclone',
    password: 'Eu6Ha2Vwwg~?',
    database: 'blockchainclone'
  });
};

this.acquire = function(callback) {
  this.pool.getConnection(function(err, connection) {
    callback(err, connection);
  });
};
}

module.exports = new Connection();