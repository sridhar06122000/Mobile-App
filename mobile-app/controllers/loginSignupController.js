import bcrypt from 'bcrypt';
import authKeyController from "./generateJWTAuthKeyController.js";
import database from '../config/database.js';

class LoginSignupController {
    
    async login (req, res) {

        try {
            
            const {email, password} = req?.body;

            if (email && password) {

                const user = await database?.executeQuery('SELECT * FROM sigin_details WHERE email = ?', [email]);

                if (user?.length > 0) {

                    for (const data of user) {

                        if(data?.status === 1) {

                            const isVaildUser = await bcrypt?.compare(password, data?.password);

                            if(isVaildUser) {

                                const authKey = authKeyController?.generateAuthKey(data?.userId);

                                const resData = {
                                    token       : authKey,
                                    token_type  : "Bearer",
                                    id          : data?.userId,
                                    name        : data?.name
                                }

                                await database?.executeQuery('UPDATE sigin_details SET authKey = ? WHERE email = ?', [authKey, email]);

                                return res?.status(200)?.json({success : true, data : resData, message : "Login successful"});
                            }
                            else {
                                return res?.status(401)?.json({success : false, message : "Invalid password"});
                            }
                        }
                        else {
                            return res?.status(401)?.json({success : false, message : "Account is in-active"});
                        }
                    }
                }
                else {
                    return res?.status(401)?.json({success : false, message : "Invalid mail id"});
                }
            }
            else {
                return res?.status(401)?.json({success : false, message : "Mail id is not received"});
            }
        }
        catch (error) {
            return res?.status(401)?.json({success : false, message : error});
        }
    }

    async signup (req, res) {

        try {
            
            let {name, email, phoneNumber, gstNumber, aadharNumber, panNumber, address, shipmentType, paymentType, password, status, role,staffAccess,city} = req?.body;

            status = status ?? 0;

            const requiredFields = {name, email, phoneNumber, gstNumber, aadharNumber, panNumber, address, shipmentType, paymentType, password, status};

            const emptyFields = Object?.keys(requiredFields)?.filter(key => (requiredFields?.[key] === 'null' && requiredFields?.[key] === 'undefined' && requiredFields?.[key] === ''));

            if(emptyFields?.length > 0) {
                return res?.status(401)?.json({success : false, message : `Following fields are missing - ${emptyFields}`});
            }
            
            const existingUser = await database?.executeQuery('SELECT * FROM sigin_details WHERE email = ?', [email]);

            if (existingUser?.length > 0){
                return res?.status(401)?.json({success : false, message : "mail id already exists"});
            }

            const hashedPassword = await bcrypt?.hash(password, 10);

            const newUser = { name, email, phoneNumber, gstNumber, aadharNumber, panNumber, address, shipmentType, paymentType, password: hashedPassword, role, status,staffAccess,city};

            await database?.executeQuery('INSERT INTO sigin_details SET ?', newUser);
            
            return res?.status(200)?.json({success : true, message : "registration success"});
        }
        catch (error) {
            return res?.status(401)?.json({success : false, message : error});
        }
    }
}

export default new LoginSignupController();