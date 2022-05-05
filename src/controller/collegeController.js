const collegeModel = require("../model/collegeModel")




const createCollege = async(req, res) => {
    try {
        let data = req.body

        let { name, fullName, logoLink, isDeleted } = data



        //  data validation
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, msg: "plz enter some data and name , fullName, logoLink must Required" })
        if (!(data)) return res.status(400).send({ status: false, msg: "plz enter some data" })
            // fname validation
        console.log(typeof name)
        let num = await collegeModel.findOne({ name: name })
        if (num) return res.status(400).send({ status: false, msg: " name of college is Already Present present" });
        if (!name) return res.status(400).send({ status: false, msg: "first name must be present" });

        let nname = /^[a-zA-z]{2,30}$/.test(name)
        if (!nname) return res.status(400).send({ status: false, msg: "enter valid  name With No Space " })
        name = name.trim()


        // fullName validation

        let numm = await collegeModel.findOne({ fullName: fullName })
        if (numm) return res.status(400).send({ status: false, msg: " fullName of college is Already Present present" });
        if (!fullName) return res.status(400).send({ status: false, msg: "fullname must be present" });


        let lame = /^[a-zA-z,-_ ]{2,100}$/.test(fullName)
        if (!lame) return res.status(400).send({ status: false, msg: "enter valid fullName" })

        // logoLink validation
        let logo = await collegeModel.findOne({ logoLink: logoLink })
        if (logo) return res.status(400).send({ status: false, msg: "LogoLink of college is Already Present present" });
        if (!logoLink) return res.status(400).send({ status: false, msg: "logo Link must be present" });

        let regx = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

        let x = regx.test(logoLink)
        if (!x) {
            return res.status(400).send({ status: false, msg: "write the correct format for Url" })
        }

        //  if isdeleted key is present
        if (isDeleted) {
            if (typeof isDeleted !== "boolean") {
                return res.status(400).send({ status: false, msg: "isDeleted is boolean so,it can be either true or false" })
            }
            if (isDeleted === true) {
                return res.status(400).send({ status: false, msg: " Already Deleted " })
            }
        }





        let college = await collegeModel.create({ name: name, fullName: fullName, logoLink: logoLink, isDeleted: false })

        res.status(201).send({ status: true, data: college })
    } catch (err) {
        res.status(500).send({ status: "error", msg: err.message })
    }
}




module.exports.createCollege = createCollege