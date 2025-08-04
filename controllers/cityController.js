import database from '../config/database.js';

class CityController{

    async postCity (req,res){

        try {
            const {cityName , cityCode}= req?.body;

            if(cityName,cityCode){

                const existingCity = await database?.executeQuery('SELECT * FROM city_details WHERE cityCode = ?', [cityCode]);

                if(existingCity?.length>0){
                    return res?.status(401)?.json({success : false, message : `station ${cityCode} already exist`});
                }
                else{

                    let newCity = {cityName,cityCode};

                    await database?.executeQuery('INSERT INTO city_details SET ?', newCity);

                    return res?.status(200)?.json({success : true, message : "station uploaded success"});
                }
            }
            
        } catch (error) {
            return res?.status(401)?.json({success : false, message : error});
            
        }
    }
    async getCity(req,res){

        try {
            
            const results = await database?.executeQuery('SELECT id,cityName,cityCode FROM city_details');

            return res?.status(200)?.json({success : true, data : results });


        } catch (error) {
            return res?.status(401)?.json({success : false, message : error});
            
        }

    }

    async deleteCity(req,res){
        try {

            let id = parseInt(req.query.id);
            
            await database?.executeQuery('DELETE FROM city_details WHERE id = ?',id);

            return res?.status(200)?.json({success :true ,message:"city deleted successfully"});

        } catch (error) {
            return res?.status(401)?.json({success : false, message : error});
            
        }
    }
}
export default new CityController();