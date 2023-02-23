let mongoose =  require("mongoose")

const Schema = mongoose.Schema;

let userSchema = new mongoose.Schema(
    {
        name:{
            type: String
        },
        mobile: {
            type: String
        },
        email: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        }
    },
    { timestamps: true }
)


const userDetails = mongoose.model('users', userSchema);


module.exports = {
    userDetails :  userDetails
}