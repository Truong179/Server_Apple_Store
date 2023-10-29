let userInfofmtion = require("../models/userInfofmtion");



exports.addUserInfor = async (req, res) => {
    try {
       const information = new userInfofmtion(req.body);
       await information.save() 
       res.status(200).send("success")
    } catch (err) {
        console.log(err);
    }
}

exports.getUserInfor = async (req, res) =>{
    try {
        const userInfor = await userInfofmtion.findById()
    } catch (error) {
        console.log(error)
    }
}