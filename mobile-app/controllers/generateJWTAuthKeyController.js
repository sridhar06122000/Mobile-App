import jwt from "jsonwebtoken"
import config from "../config/config.js"

class AuthKeyController {

    generateAuthKey(userId) {
        return jwt.sign({ id: userId }, config?.secretKey, { expiresIn: '1h' });
    }

}

export default new AuthKeyController();