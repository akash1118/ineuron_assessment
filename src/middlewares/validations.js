const Joi = require('joi')
const response = require('../libs/responseLib')

const userSchema = Joi.object({
    name: Joi.string().required(),
    mobile: Joi.string().required(),
    email: Joi.string().required(),
    city: Joi.string().allow(null),
    state: Joi.string().required()
});

let validateUser = async (req, res, next) =>{
    try {
        const value = await userSchema.validate(req.body);
        if (value.hasOwnProperty('error')) {
            throw new Error(value.error);
        } else {
            next();
        }
    } catch (err) {
        let apiResponse = response.generate(1, ` ERROR : ${err.message}`, {});
        res.status(410);
        res.send(apiResponse)
    }
}

module.exports = {
    validateUser : validateUser
}