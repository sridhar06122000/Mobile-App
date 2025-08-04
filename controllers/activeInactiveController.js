import database from "../config/database.js";
import config from "../config/config.js";

class ActiveInactiveController {

    stepUpController (req, res) {

        try {

            const email = req?.body?.email ;
            const status  = req?.body?.status ;
            const idtoUserStaffdelete = parseInt(req?.query?.id)?? '';
            
            if((status != null && status != undefined) && email) {
                this.updateStatusDetails(status, email, res);
            }
            else if(status != null && status != undefined) {
                this.getStatusDetails(status, res);
            }
            else if(idtoUserStaffdelete){
                this.deleteUserStaffDetails(idtoUserStaffdelete,res);
            }
            else {
                return res?.status(401)?.json({success : false, message : 'Invalid Request Status/Authorization is unavailable'});
            }
        }
        catch (error) {
            return res?.status(401)?.json({success : false, message : error});
        }
    }

    async getStatusDetails (status, res) {
        
        try {

            const result = await database?.executeQuery('SELECT * FROM sigin_details WHERE status = ?', [status]);

            if(result?.length > 0) {
                return res?.status(200)?.json({success : true, data : result});
            }
            else {
                return res?.status(401)?.json({success : false, message : `Status ${status} is not present`});
            }
        } 
        catch (error) {
            return res?.status(401)?.json({success : false, message : error});
        }        
    }

    async updateStatusDetails (status, email, res) {

        try {

            const mailId = await database?.executeQuery('SELECT email FROM sigin_details WHERE email = ?', [email]);

            if(mailId?.length > 0) {

                await database?.executeQuery('UPDATE sigin_details SET status = ? WHERE email = ?', [status, email]);

                // let mailOptions = {};

                // mailOptions.to = mailId[0]?.email;

                // if(status === 0) {

                //     mailOptions.subject = 'ACCOUNT IN-ACTIVATED';
                //     mailOptions.text    = 'Account In-Activated';

                //     this.sendMail(mailOptions);
                // }
                // else if(status === 1) {

                //     mailOptions.subject = 'ACCOUNT ACTIVATED';
                //     mailOptions.text    = 'Account Activated';

                //     this.sendMail(mailOptions);
                // }

                return res?.status(200)?.json({success : true, message : 'Status updated successfully'});
            }
            else {
                return res?.status(401)?.json({success : false, message : 'Invalid Authkey'});
            }
        }
        catch (error) {
            return res?.status(401)?.json({success : false, message : error});
        }
    }

    async deleteUserStaffDetails(id,res){

        try {

            await database.executeQuery('DELETE FROM sigin_details WHERE id = ?',id);

            return res?.status(200)?.json({success : true , message : "Values  deleted successfully"});

            
        } catch (error) {

            return res?.status(401)?.json({success : false , message : error});

            
        }

    }

    // async sendMail (mailOptions) {

    //     try {
            
    //         config?.transporter?.sendMail(mailOptions);
    //     }
    //     catch (error) {
    //         return res?.status(401)?.json({success : false, message : error});
    //     }
    // }
}

export default new ActiveInactiveController();