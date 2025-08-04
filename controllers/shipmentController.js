import database from "../config/database.js";

class ShipmentController {

    stepUpController (req, res) {

        try {
            
            const shipmentType = req?.body?.shipmentType ??'';

            let deleteShipmentID = req?.query?.id ?? '';

            if(shipmentType) {
                this.updateShipmentDetails(shipmentType, res);
            }

            else if(deleteShipmentID){
                this.deleteShipmentDetails(deleteShipmentID,res);
            }
            else {
                this.getShipmentDetails(res);
            }
        }
        catch (error) {
            return res?.status(401)?.json({success : false , message : error});
        }
    }

    async updateShipmentDetails (shipmentType, res) {

        try {
            
            await database?.executeQuery('INSERT INTO shipment_details (shipmentType) VALUES (?)', [shipmentType]);

            return res?.status(200)?.json({success : true , message : 'Shipment type added successfully'});
        }
        catch (error) {
            return res?.status(401)?.json({success : false , message : error});
        }
    }

    async getShipmentDetails (res) {

        try {
            
            const shipmentDetails = await database?.executeQuery('SELECT id,shipmentType FROM shipment_details');

            return res?.status(200)?.json({success : true , data : shipmentDetails});
        }
        catch (error) {
            return res?.status(401)?.json({success : false , message : error});
        }
    }

    async deleteShipmentDetails(id,res){
        try {

            await database?.executeQuery('DELETE FROM shipment_details WHERE id = ?',id);

            return res?.status(200)?.json({success : true , message :'ShipmentDetails deleted successfully'});
            
        } catch (error) {
            
            return res?.status(401)?.json({success : false , message : error});
        }
    }
}

export default new ShipmentController();