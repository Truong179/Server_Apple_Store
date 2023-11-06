let Address = require("../models/address")

exports.addAddress = async (req, res) => {
    try {
        console.log(req.body)
        const saveAddress = new Address(req.body)
        await saveAddress.save()
        
    } catch (error) {
        console.log(error)
    }
} 