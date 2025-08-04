import bcrypt from 'bcrypt';
import database from '../config/database.js';

class FetchAndUpdateStaffUserController {

    stepUpController (req, res) {

        try {
            
            const authKey   = req?.headers?.authorization;
            const data      = req?.body?.data;

            if (authKey && data) {
                this.updateStaffUserDetails(authKey, data, res);
            }
            else if (authKey) {
                this.getStaffUserDetails(authKey, res);
            }
        }
        catch (error) {
            return res?.status(401)?.json({success : false, message : error});
        }
    }

    async getStaffUserDetails (authKey, res) {

        try {
            
            const result = await database?.executeQuery('SELECT * FROM sigin_details WHERE authKey = ?', [authKey]);

            if (result?.length > 0) {
                return res?.status(200)?.json({success : true, data : result});
            }
            else {
                return res?.status(401)?.json({success : false, message : 'Invalid auth key'});
            }
        }
        catch (error) {
            return res?.status(401)?.json({success : false, message : error});
        }
    }

    async updateStaffUserDetails (authKey, data, res) {

        try {

            let query = `UPDATE sigin_details SET `;

            for (const [column, value] of Object?.entries(data)) {

                if (column === 'password') {
                    value = await bcrypt?.hash(value, 10);
                }

                query += `${column} = '${value}', `;
            }

            query = query?.slice(0, -2);

            query += ` WHERE authKey = ?`;
            
            await database?.executeQuery(query, [authKey]);
        } 
        catch (error) {
            return res?.status(401)?.json({success : false, message : error});
        }
    }
}

export default new FetchAndUpdateStaffUserController();