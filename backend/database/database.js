const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_POST,
});

const findByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error while querying the database:', err);
        throw err;
    }
}

const userExists = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    try{
        const results = await pool.query(query,values);
        return results.rows[0];
    } catch (err){
        console.log('Error while querying the database:', err);
        throw err;
    }
}

const findUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];
    try{
        const results = await pool.query(query,values);
        return results.rows[0];
    } catch (err){
        console.log('Error while querying the database:', err);
        throw err;
    }
}

const findUserById = async (userId) => {
    const query = 'SELECT * FROM users WHERE user_id = $1';
    const values = [userId];
    try{
        const results = await pool.query(query,values);
        return results.rows[0];
    } catch (err){
        console.log('Error while querying the database:', err);
        throw err;
    }
}

const addNewUser = async (userObj) => {
    const { username, email, password } = userObj;
    const query = 'INSERT INTO users (username,email,password) VALUES($1,$2,$3) RETURNING*';
    const values = [username, email, password];
    try{
        const results = await pool.query(query,values);
        return results.rows[0];
    } catch (err){
        console.log('Error while querying the database:', err);
        throw err;
    }
}

module.exports = {
    findByUsername,
    userExists,
    addNewUser,
    findUserByUsername,
    findUserById
}