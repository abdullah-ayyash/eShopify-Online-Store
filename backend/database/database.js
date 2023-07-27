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
    const { username,fullName, email, password } = userObj;
    const query = 'INSERT INTO users (username,fullName,email,password) VALUES($1,$2,$3,$4) RETURNING*';
    const values = [username,fullName, email, password];
    try{
        const results = await pool.query(query,values);
        return results.rows[0];
    } catch (err){
        console.log('Error while querying the database:', err);
        throw err;
    }
}

const queryProducts = async () =>{
    const query = 'SELECT * FROM products';
    try{
        const results = await pool.query(query);
        return results.rows;
    } catch (err){
        console.log('Error while querying the products:', err);
        throw err;
    }
}

const cartExists = async (user_id,product_id ) => {
    const query = 'SELECT * FROM cart_items WHERE user_id = $1 AND product_id=$2';
    const values = [user_id,product_id];
    try{
        const results = await pool.query(query,values);
        return results.rows;
    } catch (err){
        console.log('Error while querying the database:', err);
        throw err;
    }
}

const pushToCart = async (product_id,quantity,user_id)=>{
    const query1 = "INSERT INTO cart_items (product_id, quantity, user_id) VALUES ($1, $2, $3)"
    const values1 = [product_id,quantity, user_id];

    const query2 = "INSERT INTO users_cart_items (user_id, product_id) VALUES ($1, $2)"
    const values2 = [user_id,product_id];

    try{
        const results1 = await pool.query(query1,values1);
        const results2 = await pool.query(query2,values2);
        return results1.rows;

        
    } catch (err){
        console.log('Error while inserting cart items to database:', err);
        throw err;
    }

}



module.exports = {
    findByUsername,
    userExists,
    addNewUser,
    findUserByUsername,
    findUserById,
    queryProducts,
    pushToCart,
    cartExists
}