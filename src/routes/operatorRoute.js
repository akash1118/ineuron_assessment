const operatorController = require('../controllers/operatorController')
const validate = require('../middlewares/validations')
const appConfig = require('../../config/appConfig')

module.exports.setRouter = (app) => {
 
    let baseUrl = `${appConfig.apiVersion}`;

    // Super Admin Routes

    app.post(`${baseUrl}adduser`,validate.validateUser,operatorController.addUser),
    app.get(`${baseUrl}getuser`,operatorController.listUsers),
    app.put(`${baseUrl}edituser/:id`,operatorController.editUSer),
    app.get(`${baseUrl}getusersbyid/:id`,operatorController.usersById),
    app.delete(`${baseUrl}deleteusersbyid/:id`,operatorController.deleteUser)

}
