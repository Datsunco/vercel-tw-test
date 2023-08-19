const { Pool } = require('pg')

module.exports = new Pool(
    {
        connectionString: process.env.POSTGRES_URL + "?sslmode=require",
    }
)