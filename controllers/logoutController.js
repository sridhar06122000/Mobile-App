import database from "../config/database.js";

class LogoutController {

    async logout (req, res) {

        try {
            
            const authKey = req?.headers?.authorization;

            if (authKey) {

                await database?.executeQuery('UPDATE sigin_details SET authKey = NULL WHERE authKey = ?', [authKey]);

                return res?.status(200)?.json({success : true, message : 'Logout success'});
            }
            else {
                return res?.status(401)?.json({success : false, message : 'Auth key is missing'});
            }
        }
        catch (error) {
            return res?.status(401)?.json({success : false, message : error});
        }
    }
}

export default new LogoutController();