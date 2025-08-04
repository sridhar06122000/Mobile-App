import database from "../config/database.js";

class PaymentController {

    stepUpController (req, res) {

        try {
            
            const paymentType = req?.body?.paymentType ?? '';

            const deletePaymentId = parseInt(req?.query?.id) ?? '';

            if(paymentType) {
                this.updatePaymentDetails(paymentType, res);
            }
            else if(deletePaymentId){
                this.deletePaymentDetails(deletePaymentId,res);
            }
            else {
                this.getPaymentDetails(res);
            }
        }
        catch (error) {
            return res?.status(401)?.json({success : false , message : error});
        }
    }

    async updatePaymentDetails (paymentType, res) {

        try {
            
            await database?.executeQuery('INSERT INTO payment_details (paymentType) VALUES (?)', [paymentType]);

            return res?.status(200)?.json({success : true , message : 'Payment type added successfully'});
        }
        catch (error) {
            return res?.status(401)?.json({success : false , message : error});
        }
    }

    async getPaymentDetails (res) {

        try {
            
            const paymentDetails = await database?.executeQuery('SELECT id,paymentType FROM payment_details');

            return res?.status(200)?.json({success : true , data : paymentDetails});
        }
        catch (error) {
            return res?.status(401)?.json({success : false , message : error});
        }
    }

    async deletePaymentDetails(id,res){
        try {

            await database.executeQuery('DELETE FROM payment_details WHERE id = ?',id);

            return res?.status(200)?.json({success : true , message : "PaymentDetails deleted successfully"});
            
        } catch (error) {
            return res?.status(401)?.json({success : false , message : error});
        }
    }
}

export default new PaymentController();