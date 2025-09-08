import pkg from 'pg'
import dotenv from 'dotenv'

const environment = process.env.NODE_ENV || 'development'
//dotenv.config({ path: environment === 'test' ? '.env.test' : '.env' })
dotenv.config() // Load .env file


const { Pool } = pkg


const openDb = () => {
    const pool = new Pool({

        //take the stuff from the .env file and use that here
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: environment === 'development' ? process.env.DB_NAME : process.env.TEST_DB_NAME,
        password: process.env.DB_PASSWORD,
        port : process.env.DB_PORT
    })

    return pool
}

const pool = openDb()

export { pool }