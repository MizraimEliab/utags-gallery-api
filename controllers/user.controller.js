const {pool} = require('../database');

const userController = {};

userController.getUsers = async(req,res)=>{
    const user = await pool.query('SELECT * FROM users');
    res.json(user.rows);
}

userController.getUser = async(req,res)=>{
    const {username, password} = req.body;
    const user = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2',[username, password])
    if(user.rows.length === 0){
        res.status(404).send('Failed')
    }else{
        res.json({
            status:200,
            data: user.rows
        })
    }
}

userController.postUser = async(req,res)=>{
    const newUser = {firstName,lastName,username,email,password,city} = req.body;
    const users = await pool.query('SELECT * FROM users');
    let repeated = false;
    users.rows.map(value=>{
        if(value.username == req.body.username){
            repeated = true;
        }
    })
    if(repeated){
        res.status(404).send('User repeated');
    }else{
        const addUser = await pool.query('INSERT INTO users (firstName,lastName,username,email,password,city) VALUES ($1,$2,$3,$4,$5,$6)',[firstName,lastName,username,email,password,city]);
        res.json({
            status:'User added',
            data: newUser
        })
    }
}



module.exports = userController;