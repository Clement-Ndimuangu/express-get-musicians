const express = require('express')
const router = express.Router();
const { Musician } = require("../models/index")
const {check, validationResult} = require('express-validator')

router.get('/', async(req,res)=>{
    const musician = await Musician.findAll();
    res.json(musician)
})

router.get('/:id', async(req,res)=>{
    const id = req.params.id
    const musician = await Musician.findByPk(id)
    res.json(musician)
})

router.post('/',[check(["name","instrument"]).not().isEmpty().trim().isLength({min:2, max:20})],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const body = req.body;
        const newMusician = await Musician.create(body)
        res.json(newMusician)
    }
})

router.put('/:id',[check(["name","instrument"]).not().isEmpty().trim().isLength({min:2, max:20})] , async(req,res)=>{
    const id = req.params.id
    const body = req.body
    const musicianToUpdate = await Musician.findByPk(id)
    const updatedMusician = await musicianToUpdate.update(body)
    res.json(updatedMusician)
})

router.delete('/:id', async (req,res)=>{
    const id = req.params.id
    const musicianToDelete = await Musician.findByPk(id)
    const deletedMusician = await musicianToDelete.destroy()
    res.json(deletedMusician)
})

module.exports = router