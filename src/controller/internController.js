const mongoose = require('mongoose');
const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")





const createIntern = async function(req, res) {
    try {
        const data = req.body
            //  data validation

        if (!data || Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "plz enter some data" })

        let { collegeId, name, mobile, email, isDeleted } = data

        // authorId validation

        if (!collegeId) {
            return res.status(400).send({ status: false, msg: "College must be present" })
        }
        let idCheck = mongoose.isValidObjectId(collegeId)
        console.log(idCheck)
        if (!idCheck) return res.status(400).send({ status: false, msg: "college is not a type of objectId" })

        const id = await collegeModel.findById(collegeId)
        if (!id) {
            return res.status(404).send({ status: false, msg: "this College is not present." })
        }
        //  accessing the payload authorId from request
        // let token = req["authorId"]

        //  authorization
        //  if (token != authorId) {
        //      return res.status(403).send({ status: false, msg: "You are not authorized to access this data" })
        // }
        // console.log(title)

        // title validation

        if (!name || name === undefined) {
            return res.status(400).send({ status: false, msg: "name is not given" })
        }
        if (typeof name !== "string" || name.trim().length === 0) return res.status(400).send({ status: false, msg: "please enter valid name" });
        name = name.trim()

        // mobile validation

        if (!mobile || mobile === undefined) {
            return res.status(400).send({ status: false, msg: "mobile is not Given" })
        }
        if (typeof mobile !== "number" && mobile.trim().length != 10 && mobile.value == "") return res.status(400).send({ status: false, msg: "please enter valid Mobile Number" });
        data.mobile = data.mobile.trim()
            // email validation

        if (!email) {
            return res.status(400).send({ status: false, msg: "email must be present" });
        }

        let regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z])+\.([a-z]+)(.[a-z])?$/
        rege = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let x = regx.test(email)
        if (!x) {
            return res.status(400).send({ status: false, msg: "write the correct format for email" })
        }
        let mail = await internModel.findOne({ email: email.toLowerCase() })

        if (mail) return res.status(400).send({ status: false, msg: "this email is already present" })
        data.email = data.email.toLowerCase()

        // // if isdeleted key is present
        if (isDeleted) {
            if (typeof isDeleted !== "boolean") {
                return res.status(400).send({ status: false, msg: "isDeleted is boolean so,it can be either true or false" })
            }
            if (isDeleted === true) {
                return res.status(400).send({ status: false, msg: " Already Deleted " })
            }
        }


        console.log(data)

        const check = await internModel.findOne(data)
        console.log(check)
        if (check) return res.status(400).send({ status: false, msg: "this intern already exist" })

        // intern Creation
        const Blog = await internModel.create(data)
        return res.status(201).send({ status: true, data: Blog })
    } catch (err) {
        res.status(500).send({ status: "error", error: err.message })
    }
}



module.exports.createIntern = createIntern