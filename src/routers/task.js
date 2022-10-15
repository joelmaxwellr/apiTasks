const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send()
    } catch(error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if(!task) {
            return  res.status(404).send()
        }

        res.send(task)
    } catch(error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const keys = Object.keys(req.body)

    const permitidos = ['description', 'completed']

    const isValidOperation = keys.every((key) => {
        return permitidos.includes(key)
    })

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid update!'})
    }

    try {

        const task = await Task.findById(req.params.id)

        keys.forEach((key) => task[key] = req.body[key])
        await task.save()

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    
    } catch(e) {
        res.status(400).send(e)
    }

})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)

    } catch(e) {
        res.status(400).send()
    }
})

module.exports = router