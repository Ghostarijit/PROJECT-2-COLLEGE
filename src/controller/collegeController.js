const collegeModel = require("../model/collegeModel")




const createCollege = async(req, res) => {
    try {
        let data = req.body
            //  data validation

        let { name, fullName, logoLink, } = data


        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "plz enter some data" })

        // fname validation
        console.log(typeof name)
        if (!name) return res.status(400).send({ status: false, msg: "first name must be present" });
        // if(typeof fname !== "string"||fname.trim().length ===0) return res.status(400).send({ status:false, msg: "fname should be string" });
        // data.fname = data.fname.trim()
        let nname = /^[a-zA-z]{2,30}$/.test(name)
        if (!nname) return res.status(400).send({ status: false, msg: "enter valid  name " })



        // fullName validation
        if (!fullName) return res.status(400).send({ status: false, msg: "fullname must be present" });
        if (typeof fullName !== "string" || fullName.trim().length === 0) return res.status(400).send({ status: false, msg: "fullName should be string" });
        data.fullName = data.fullName.trim()
        let lame = /^[a-zA-z , ;]{2,100}$/.test(fullName)
        if (!lame) return res.status(400).send({ status: false, msg: "enter valid fullName " })

        // logoLink validation

        if (!logoLink) return res.status(400).send({ status: false, msg: "logo Link must be present" });



        let college = await collegeModel.create(data)

        res.status(201).send({ status: true, data: college })
    } catch (err) {
        res.status(500).send({ status: "error", msg: err.message })
    }
}




module.exports.createCollege = createCollege