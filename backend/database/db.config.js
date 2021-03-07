require('dotenv').config()

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE} = process.env

module.exports = {
    HOST: DB_HOST,
    PORT: DB_PORT,
    USERNAME: DB_USERNAME,
    PASSWORD: DB_PASSWORD,
    DATABASE: DB_DATABASE,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}