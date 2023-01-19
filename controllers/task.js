const express = require('express')
const router = express.Router();
let tasks = require('../models/taskData.js')
const db = require('../infraestructure/db');
const {request} = require('express');


router.get('/', async (req, res, next) => {
    try {
        const results = await db.query('SELECT * FROM tasks')
        res.send(results.rows)        
    } catch (error) {
        res.status(500).send({message:'Ha ocurrido un error'})
        next(error)        
    }
})

router.delete('/:id', (req, res, next) => {
    try {
        let id = req.params.id
        db.query('DELETE from tasks where id = ' + id)
        res.send({message:'deleted'})        
    } catch (error) {
        res.status(500).send({message:'Ha ocurrido un error'})
        next(error)           
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newTask = {
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            timeStamp: req.body.timeStamp,
            order: req.body.order
        }
        const resp = await db.query(
            'INSERT INTO tasks (description, priority, status, timestamp, "order") VALUES ($1, $2, $3, $4, $5)',
                [req.body.description, req.body.priority, req.body.status, req.body.timeStamp, req.body.order]
        );
        res.send({new: newTask})        
    } catch (error) {
        res.status(500).send({message:'Ha ocurrido un error'})
        next(error)          
    }
})

router.patch('/:id', async (req, res, next)=>{
    try {
        let id = req.params.id
        const task = await db.query('SELECT * from tasks where id = '+id)
        db.query(`UPDATE tasks Set status = ${!task.status} where id= `+id)
        res.send({message: 'taskEdited'})        
    } catch (error) {
        res.status(500).send({message:'Ha ocurrido un error'})
        next(error)           
    }
})

module.exports = router
