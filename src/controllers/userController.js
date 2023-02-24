
require('dotenv').config()
const response = require('../libs/responseLib')

const user = require('../models/userSchema')
const mongoose = require('mongoose');



let addUser = async (req, res) => {
    try {
        let checkUser = await user.userDetails.find({ name: req.body.name })
        console.log(checkUser.length)
        if (checkUser.length == 0) {
            let addUser = await user.userDetails.create({
                name: req.body.name,
                mobile: req.body.mobile,
                email: req.body.email,
                city: req.body.city,
                state: req.body.state
            })
            data = {
                group_id: addUser.id,
                group_name: req.body.name
            }
            let apiResponse = response.generate(false, 'User Added Successfully', data)
            res.status(201).send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User Already Exists', null)
            res.status(200).send(apiResponse)
        }
    } catch (err) {
        console.log(err)
        let apiResponse = response.generate(true, `Error Occured : ${err.message}`, null);
        res.status(412).send(apiResponse)
    }
}



let editUSer = async (req, res) => {
    try {
        let checkExist = await user.userDetails.findById(req.params.id)
        console.log(checkExist.length)
        if (checkExist.length != 0) {
            // await user.userDetails.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, { "$set": { "name": `${req.body.name}`, "mobile": `${req.body.mobile}`, "email": `${req.body.email}`, "city": `${req.body.city}`,"state": `${req.body.state}` } })
            await user.userDetails.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
            let apiResponse = response.generate(false, 'Details Updated Successfully', req.body)
            res.status(201).send(apiResponse)

        } else {

            let apiResponse = response.generate(false, 'No records Exist', null)
            res.status(200).send(apiResponse)
        }
    } catch (err) {
        console.log(err)
        let apiResponse = response.generate(true, `Error Occured : ${err.message}`, null);
        res.status(412).send(apiResponse)
    }
}


let listUsers = async (req, res) => {
    try {
        let userlist = await user.userDetails.find()
        let apiResponse = response.generate(false, 'Users List Generated Successfullly', userlist)
        res.status(200).send(apiResponse)
    } catch (err) {
        console.log(err)
        let apiResponse = response.generate(true, `Error Occured : ${err.message}`, null);
        res.status(412).send(apiResponse)
    }
}


let usersById = async (req, res) => {
    try {
        let userlistbyId = await user.userDetails.find({ _id: mongoose.Types.ObjectId(req.params.id) })
        let apiResponse = response.generate(false, 'Users List Generated Successfullly', userlistbyId)
        res.status(200).send(apiResponse)
    } catch (err) {
        console.log(err)
        let apiResponse = response.generate(true, `Error Occured : ${err.message}`, null);
        res.status(412).send(apiResponse)
    }
}

let deleteUser = async (req, res) => {
    try {
        let findusers = await user.userDetails.findById(req.params.id)
        let apiResponse
        if (findusers != null) {
            let deleteUsers = await user.userDetails.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) })
            deleteUsers.id = req.params.id
            apiResponse = response.generate(false, 'User Deleted Successfullly', deleteUsers)
            res.status(204).send(apiResponse)
            console.log(res)
        } else {
            apiResponse = response.generate(false, 'User not found', null)
            res.status(404).send(apiResponse)
            console.log(res)
        }
       
    } catch (err) {
        console.log(err)
        let apiResponse = response.generate(true, `Error Occured : ${err.message}`, null);
        res.status(412).send(apiResponse)
    }
}



module.exports = {
    addUser: addUser,
    editUSer: editUSer,
    listUsers: listUsers,
    usersById: usersById,
    deleteUser: deleteUser,

}