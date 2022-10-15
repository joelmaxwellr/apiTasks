const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    console.log(user)

    try {
        await user.save()
        res.status(201).send()
    } catch(error) {
        res.status(400).send(error)
    }
})
router.post('/users/login', async (req, res) => {
    try{   
        const user = await User.findByCredencials(req.body.email, req.body.password)
       const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send(e)
    }

})

router.get('/users', async (req, res) => {

    try {
        const user = await User.find({})
        res.send(user)
    } catch(error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if(!user) {
            return  res.status(404).send()
        }

        res.send(user)
    } catch(error) {
        res.status(500).send()
    }
})

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findByIdAndRemove(_id)

        if(!user) {
            return  res.status(404).send()
        }

        res.send(user)
    } catch(error) {
        res.status(500).send()
    }
})


router.patch('/users/:id', async (req, res) => {
    const keys = Object.values(req.body)
    const permitidos = ['name','password','email']
    console.log(keys)

    const isValidOperation = keys.every((key) => {
        return permitidos.includes(key)
    })

    if(!isValidOperation) {
        
        return res.status(400).send({error: 'Invalid update!'})
    }

    try {

        const users = await Task.findById(req.params.id)

        keys.forEach((key) => users[key] = req.body[key])
        await users.save()

        if(!users) {
            return res.status(404).send()
        }

        res.send(users)
    
    } catch(e) {
        res.status(400).send(e)
    }

})



/* router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const{name, password,email} = req.body


    try {
        const user = await User.findByIdAndUpdate(_id,{"name":name,  "password":password,"email":email})
       // const user = await User.findByIdAndUpdate(_id,req.body,{new: true, runValidators:true})

        if(!user) {
            return  res.status(404).send()
        }

        res.send(user)
    } catch(error) {
        res.status(500).send()
    }
}) */




module.exports = router