import database from "../config/database.js";

class PinCodeController{

    async getPincodedetails(req,res){

        try {
            
            const pinCode = req?.query?.pincode;

            let result =await database.executeQuery('SELECT * FROM pincodes WHERE Pincode = ?',pinCode);
    
            if(result.length>0){
    
             return res?.status(200)?.json({success:true , data : result , message : "Pincode details retrived Successfully"});
            
            }
            else {

                return res?.status(401)?.json({success : false,message : "No pincode is Present"});

            }
    
        } catch (error) {

            return res?.status(401)?.json({success : false , message : error});
            
        }

       
    }
}

export default new PinCodeController();