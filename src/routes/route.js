const express = require('express');
const router = express.Router();


const College = require("../controller/collegeController")
const Intern = require("../controller/internController")
const get = require("../controller/GetController")



router.post("/functionup/colleges", College.createCollege)

router.post("/functionup/interns", Intern.createIntern)

router.get("/functionup/collegeDetails", get.getColleges)










module.exports = router;