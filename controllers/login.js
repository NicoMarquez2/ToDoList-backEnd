const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router();
const { TOKEN_SECRET, verifyToken } = require('../middlewares/validate-jsw');

users = []

router.post('/register', async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)

        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: password
        }

        users.push(newUser)
        res.send({message:'Usuario creado exitosamente'})
    } catch (error) {
        res.status(500).send({message:'Ha ocurrido un error'})
        next(error)
    }
    
})

router.post('/login', async (req, res) => {
    try {
        const user = users.find((u) => u.email == req.body.email);
        const validPassword = await bcrypt.compare(req.body.password, user.password)
    
        if(!validPassword){
            res.status(401).send({message: 'El usuario no es valido'})
        }
        else{
            const token = jwt.sign({
                name: user.name,
                id: user.email
            }, TOKEN_SECRET)
    
            res.send({message:'Login exitoso',token})
        }          
    } catch (error) {
        res.status(500).send({message:'Ha ocurrido un error'})
        next(error)
    }
  
})

module.exports = router